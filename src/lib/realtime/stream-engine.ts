/**
 * Motor de tiempo real — Back 1.
 *
 * Emite un `RealtimeTelemetryFrame` por segundo y por tripulante. No importa
 * Dexie, ni reglas, ni red: recibe el evaluador y el baseline por inyección.
 *
 * Invariantes:
 * 1. Un fallo de un suscriptor no detiene el bucle.
 * 2. `tick()` es determinista si la fuente y el reloj lo son (testeable).
 * 3. El motor nunca escribe en la base de datos; publica el frame y Back 2
 *    decide si lo persiste.
 */

import type {
  CrewId,
  EstadoNodo3D,
  Evaluacion,
  LecturaEvaluable,
  LecturaFrame,
  MeshNodeId,
  Nivel,
  ParameterDefinition,
  RealtimeTelemetryFrame,
} from '@/types';

import { getOrThrow, validateRegistry } from './registry';

// ---------------------------------------------------------------------------
// Contratos inyectables
// ---------------------------------------------------------------------------

/** Cualquier fuente de lecturas: simulador, BLE, serie o bus de la nave. */
export interface SensorSource {
  leer(ahora: number): LecturaEvaluable[];
  /** Opcional: inicio controlado (para replay, etc.). */
  start?(): void;
  /** Opcional: parada controlada. */
  stop?(): void;
}

/** Lo que Back 2 entrega como `evaluar()` de `rules/triage.ts`. */
export type EvaluadorFrame = (
  lectura: LecturaEvaluable,
  definicion: ParameterDefinition,
  baseline: number | null,
) => Evaluacion;

/** Lo que Back 2 entrega como `baselinePreVuelo()` de `osdr/client.ts`. */
export type BaselineProvider = (crewId: CrewId, parametroId: string) => number | null;

// ---------------------------------------------------------------------------
// Configuración
// ---------------------------------------------------------------------------

export interface OpcionesStreamEngine {
  crewId: CrewId;
  fuente: SensorSource;
  evaluador: EvaluadorFrame;
  baseline?: BaselineProvider;
  /** Periodo del bucle. Por defecto 1 000 ms. */
  intervaloMs?: number;
  /** Reloj inyectable para pruebas. */
  ahora?: () => number;
  /** Segundo de misión con el que arranca el reloj. */
  metInicialSegundos?: number;
  /**
   * Si es `true`, respeta `ParameterDefinition.intervaloMs` (las analíticas
   * salen cada 24 h). La demo lo pone en `false` para poblar la sala rápido.
   */
  respetarIntervalos?: boolean;
}

export interface AnomaliaForzada {
  nivel: Exclude<Nivel, 'NOMINAL'>;
  hasta: number;
}

const ORDEN_NIVEL = { NOMINAL: 0, ATENCION: 1, CRITICO: 2 } as const satisfies Record<Nivel, number>;

function nivelMasGrave(a: Nivel, b: Nivel): Nivel {
  return ORDEN_NIVEL[a] >= ORDEN_NIVEL[b] ? a : b;
}

/**
 * Calcula un valor que cae fuera del umbral pedido. Si el parámetro no tiene
 * umbrales (CO₂, radiación, presión intracraneal), no se puede simular.
 */
function valorAnomalo(definicion: ParameterDefinition, nivel: AnomaliaForzada['nivel']): number {
  const { min, max, criticoMin, criticoMax } = definicion.rangoReferencia;

  if (nivel === 'CRITICO') {
    if (criticoMax !== null) {
      return Number((criticoMax * 1.08 + 0.1).toFixed(4));
    }
    if (criticoMin !== null) {
      return Number((criticoMin * 0.92 - 0.1).toFixed(4));
    }
    if (max !== null) {
      return Number((max * 1.3).toFixed(4));
    }
    if (min !== null) {
      return Number((min * 0.7).toFixed(4));
    }
  } else {
    if (max !== null) {
      return Number((max * 1.05 + 0.01).toFixed(4));
    }
    if (min !== null) {
      return Number((min * 0.95 - 0.01).toFixed(4));
    }
  }

  throw new Error(
    `No se puede simular una anomalía en «${definicion.id}»: no tiene umbrales definidos en registry.ts.`,
  );
}

// ---------------------------------------------------------------------------
// Motor
// ---------------------------------------------------------------------------

export class StreamEngine {
  readonly crewId: CrewId;

  private readonly fuente: SensorSource;
  private readonly evaluador: EvaluadorFrame;
  private readonly baseline: BaselineProvider;
  private readonly intervaloMs: number;
  private readonly ahora: () => number;
  private readonly metInicialSegundos: number;
  private readonly respetarIntervalos: boolean;

  private readonly suscriptores = new Set<(frame: RealtimeTelemetryFrame) => void>();
  private readonly anomalias = new Map<string, AnomaliaForzada>();
  private readonly ultimoEnvio = new Map<string, number>();

  private temporizador: ReturnType<typeof setInterval> | null = null;
  private inicioMs: number;

  constructor(opciones: OpcionesStreamEngine) {
    validateRegistry();

    this.crewId = opciones.crewId;
    this.fuente = opciones.fuente;
    this.evaluador = opciones.evaluador;
    this.baseline = opciones.baseline ?? (() => null);
    this.intervaloMs = opciones.intervaloMs ?? 1_000;
    this.ahora = opciones.ahora ?? Date.now;
    this.metInicialSegundos = opciones.metInicialSegundos ?? 0;
    this.respetarIntervalos = opciones.respetarIntervalos ?? true;
    this.inicioMs = this.ahora();
  }

  /** Emite un frame inmediatamente. Es la unidad de prueba del motor. */
  tick(): RealtimeTelemetryFrame {
    const ahora = this.ahora();
    const lecturas: Record<string, LecturaFrame> = {};
    const estadoNodos3D: Partial<Record<MeshNodeId, EstadoNodo3D>> = {};

    for (const lectura of this.fuente.leer(ahora)) {
      const definicion = getOrThrow(lectura.parametroId);

      if (
        this.respetarIntervalos &&
        definicion.intervaloMs !== undefined &&
        ahora - (this.ultimoEnvio.get(definicion.id) ?? Number.NEGATIVE_INFINITY) <
          definicion.intervaloMs
      ) {
        continue;
      }

      this.ultimoEnvio.set(definicion.id, ahora);

      const anomalia = this.anomalias.get(definicion.id);

      if (anomalia && ahora >= anomalia.hasta) {
        this.anomalias.delete(definicion.id);
      }

      const activa = this.anomalias.get(definicion.id);
      const valor = activa ? valorAnomalo(definicion, activa.nivel) : lectura.valor;
      const lecturaFinal: LecturaEvaluable = { ...lectura, valor, timestamp: ahora };
      const baseline = this.baseline(this.crewId, definicion.id);
      const evaluacion = this.evaluador(lecturaFinal, definicion, baseline);

      lecturas[definicion.id] = {
        valor,
        unidad: definicion.unidad,
        baselinePersonal: baseline,
        desviacion: evaluacion.desviacion,
        nivel: evaluacion.nivel,
        meshNodeId: definicion.meshNodeId,
        toolAnimationId: definicion.toolAnimationId,
        calidad: lecturaFinal.calidad,
        razon: evaluacion.razon,
        accion: evaluacion.accion,
        reglaDisparada: evaluacion.reglaDisparada,
        fuente: evaluacion.fuente,
      };

      if (definicion.meshNodeId !== null) {
        acumularNodo(estadoNodos3D, definicion, evaluacion.nivel);
      }
    }

    const frame: RealtimeTelemetryFrame = {
      timestamp: ahora,
      crewId: this.crewId,
      metSegundos: this.metInicialSegundos + Math.max(0, Math.floor((ahora - this.inicioMs) / 1_000)),
      lecturas,
      estadoNodos3D,
    };

    for (const suscriptor of this.suscriptores) {
      try {
        suscriptor(frame);
      } catch {
        // Un suscriptor roto no puede tumbar el bucle de 1 Hz.
      }
    }

    return frame;
  }

  start(): void {
    if (this.temporizador !== null) {
      return;
    }

    this.inicioMs = this.ahora();
    this.tick();
    this.temporizador = setInterval(() => this.tick(), this.intervaloMs);
  }

  stop(): void {
    if (this.temporizador !== null) {
      clearInterval(this.temporizador);
      this.temporizador = null;
    }
  }

  subscribe(suscriptor: (frame: RealtimeTelemetryFrame) => void): () => void {
    this.suscriptores.add(suscriptor);
    return () => this.suscriptores.delete(suscriptor);
  }

  /**
   * Fuerza una anomalía durante `duracionMs`. Lanza si el parámetro no existe
   * o si no tiene umbrales con los que simular.
   */
  forzarAnomalia(
    parametroId: string,
    nivel: AnomaliaForzada['nivel'],
    duracionMs = 20_000,
  ): void {
    const definicion = getOrThrow(parametroId);
    valorAnomalo(definicion, nivel);
    this.anomalias.set(parametroId, { nivel, hasta: this.ahora() + duracionMs });
  }

  limpiarAnomalia(parametroId: string): void {
    this.anomalias.delete(parametroId);
  }

  limpiarAnomalias(): void {
    this.anomalias.clear();
  }

  anomaliasActivas(): Array<{ parametroId: string; nivel: AnomaliaForzada['nivel']; hasta: number }> {
    const ahora = this.ahora();
    return [...this.anomalias.entries()]
      .filter(([, anomalia]) => anomalia.hasta > ahora)
      .map(([parametroId, anomalia]) => ({
        parametroId,
        nivel: anomalia.nivel,
        hasta: anomalia.hasta,
      }));
  }
}

function acumularNodo(
  estado: Partial<Record<MeshNodeId, EstadoNodo3D>>,
  definicion: ParameterDefinition,
  nivel: Nivel,
): void {
  const nodoId = definicion.meshNodeId;

  if (nodoId === null) {
    return;
  }

  const actual = estado[nodoId];
  const nivelMaximo = actual ? nivelMasGrave(actual.nivelMaximo, nivel) : nivel;
  const animacion =
    nivel !== 'NOMINAL' && definicion.toolAnimationId !== 'anim_none'
      ? definicion.toolAnimationId
      : null;

  estado[nodoId] = {
    nivelMaximo,
    parametroPrincipalId: actual?.parametroPrincipalId ?? definicion.id,
    animacionActiva: animacion ?? actual?.animacionActiva ?? null,
  };
}

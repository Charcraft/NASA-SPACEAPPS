/**
 * Contratos compartidos entre Back 1, Back 2, el Modelo 3D y el módulo de IA.
 *
 * Regla: este archivo es append-only. No se renombran ni se eliminan campos
 * existentes; cualquier cambio va por PR y se avisa al otro dueño.
 *
 * Congelado a H2 (2026-11-14). Ver `docs/03-plan/11-arquitectura-backend.md`.
 */

// ---------------------------------------------------------------------------
// Identificadores
// ---------------------------------------------------------------------------

export type CrewId = 'C001' | 'C002' | 'C003' | 'C004';

export type Nivel = 'NOMINAL' | 'ATENCION' | 'CRITICO';

export type TipoDato = 'escalar' | 'onda' | 'evento';

export type TipoDesviacion = 'z-score' | 'delta-absoluto';

export type TipoFrecuenciaParametro =
  | 'tiempo-real-continuo'
  | 'muestra-discreta'
  | 'ambiental-cabina';

export type CategoriaParametro =
  | 'biologico-fisico'
  | 'bioquimico-osdr'
  | 'ambiental';

export type MeshNodeId =
  | 'head_neuro_ocular'
  | 'thorax_heart'
  | 'thorax_lungs'
  | 'abdomen_hepatic_renal'
  | 'limbs_musculoskeletal'
  | 'systemic_immune_radiation';

export type ToolAnimationId =
  | 'anim_none'
  | 'anim_capillary_analyzer'
  | 'anim_bp_cuff'
  | 'anim_pulse_oximeter'
  | 'anim_ocular_fundoscope'
  | 'anim_cpr_cmrs_restraint'
  | 'anim_pba_oxygen_mask';

// ---------------------------------------------------------------------------
// Catálogo de parámetros (Plug & Play)
// ---------------------------------------------------------------------------

export interface RangoReferencia {
  min: number | null;
  max: number | null;
  criticoMin: number | null;
  criticoMax: number | null;
}

export interface ParameterDefinition {
  id: string;
  nombre: string;
  unidad: string;
  unidadCanonica: string;
  categoria: CategoriaParametro;
  frecuencia: TipoFrecuenciaParametro;
  intervaloMs?: number;

  tipoDato: TipoDato;
  esDerivado: boolean;
  metodo?: string;
  requiereContexto: boolean;
  tipoDesviacion: TipoDesviacion;

  rangoReferencia: RangoReferencia;
  referenciaPoblacional: { min: number | null; max: number | null };

  /** Obligatorio: "OSD-575", "[SUPUESTO]" o "[POR VALIDAR]". */
  fuenteUmbral: string;

  // Contrato con el Modelo 3D y las animaciones.
  // `null` para parámetros ambientales: CO2 no tiene malla corporal.
  meshNodeId: MeshNodeId | null;
  toolAnimationId: ToolAnimationId;

  fuenteTrazable: string;
  esDatoRealOSDR: boolean;
}

// ---------------------------------------------------------------------------
// Lectura y evaluación
// ---------------------------------------------------------------------------

export interface LecturaEvaluable {
  parametroId: string;
  valor: number;
  unidad: string;
  /** epoch ms, tomado en el origen, nunca en el gateway. */
  timestamp: number;
  /** 0..1. Calidad de señal del sensor. */
  calidad: number;
  contexto?: {
    postura?: string;
    actividad?: string;
  };
}

export interface Evaluacion {
  nivel: Nivel;
  razon: string;
  accion: string;
  fuente: string;
  reglaDisparada: string;
  valor: number;
  baseline: number | null;
  desviacion: { tipo: TipoDesviacion; valor: number };
  degradado: boolean;
}

// ---------------------------------------------------------------------------
// Frame de tiempo real (Back 1 -> UI / Modelo 3D / Back 2)
// ---------------------------------------------------------------------------

export interface LecturaFrame {
  valor: number;
  unidad: string;
  baselinePersonal: number | null;
  desviacion: { tipo: TipoDesviacion; valor: number };
  nivel: Nivel;
  meshNodeId: MeshNodeId | null;
  toolAnimationId: ToolAnimationId;
  calidad: number;
  /**
   * Explicación ya redactada por el evaluador. Viaja con la lectura para que la
   * sala de tripulación pueda mostrar una alerta sin recalcular reglas.
   */
  razon: string;
  accion: string;
  reglaDisparada: string;
  fuente: string;
}

export interface EstadoNodo3D {
  nivelMaximo: Nivel;
  parametroPrincipalId: string;
  animacionActiva: ToolAnimationId | null;
}

export interface RealtimeTelemetryFrame {
  timestamp: number;
  crewId: CrewId;
  /** Tiempo de misión en segundos. Sustituye al enum cerrado de timepoints. */
  metSegundos: number;
  lecturas: Record<string, LecturaFrame>;
  estadoNodos3D: Partial<Record<MeshNodeId, EstadoNodo3D>>;
}

// ---------------------------------------------------------------------------
// Persistencia y sincronización
// ---------------------------------------------------------------------------

export interface ResultadoPersistencia {
  ok: boolean;
  guardadas: number;
  codigo?: string;
  motivo?: string;
}

export interface TelemetrySink {
  onLectura(lectura: LecturaEvaluable, crewId: CrewId): void;
  onFrame(frame: RealtimeTelemetryFrame): void;
}

// ---------------------------------------------------------------------------
// Sala de tripulación (sincronización entre astronautas)
// ---------------------------------------------------------------------------

export type EstadoEnlace = 'conectado' | 'degradado' | 'sin-enlace';

/** Una lectura fuera de rango, ya evaluada y lista para mostrarse a otro tripulante. */
export interface AlertaTripulacion {
  /** Estable por tripulante + parámetro + timestamp; idempotente al reintentar. */
  id: string;
  crewId: CrewId;
  parametroId: string;
  nombreParametro: string;
  nivel: Exclude<Nivel, 'NOMINAL'>;
  valor: number;
  unidad: string;
  baseline: number | null;
  razon: string;
  accion: string;
  reglaDisparada: string;
  fuente: string;
  timestamp: number;
}

/** Estado agregado de un tripulante tal como lo ve la sala. */
export interface EstadoTripulante {
  crewId: CrewId;
  nivel: Nivel;
  alertasActivas: AlertaTripulacion[];
  ultimaActualizacion: number;
  /** Segundos sin recibir un frame. `null` si nunca se recibió. */
  silencioSegundos: number | null;
  estadoEnlace: EstadoEnlace;
}

/** Eventos que viajan por `GET /api/telemetry` (SSE). */
export type EventoSala =
  | { tipo: 'snapshot'; timestamp: number; tripulantes: EstadoTripulante[] }
  | { tipo: 'alerta'; timestamp: number; alerta: AlertaTripulacion }
  | { tipo: 'resuelta'; timestamp: number; crewId: CrewId; parametroId: string }
  | {
      tipo: 'latido';
      timestamp: number;
      tripulantes: Array<{ crewId: CrewId; nivel: Nivel; estadoEnlace: EstadoEnlace }>;
    };

// ---------------------------------------------------------------------------
// Módulo de IA (contrato únicamente; la implementación es de otro integrante)
// ---------------------------------------------------------------------------

export interface AIAssistantContextSnapshot {
  crewId: string;
  modoOperacion: 'rutina' | 'emergencia';
  parametrosFueraDeRango: Array<{
    id: string;
    nombre: string;
    valorActual: number;
    baselinePreVuelo: number | null;
    rangoReferencia: { min: number | null; max: number | null };
    nivelDeterminista: Nivel;
    reglaDisparada: string;
  }>;
  ambienteCabina: {
    radiacionMsv: number | null;
    co2MmHg: number | null;
    retardoTierraSegundos: number;
  };
  fallbackDeterminista: {
    mensajeResumen: string;
    pasosAccion: string[];
  };
}

export interface AIProvider {
  generate(
    ctx: AIAssistantContextSnapshot,
    signal: AbortSignal,
  ): Promise<{ ok: boolean; texto?: string; usaFallback: boolean }>;
}

// ---------------------------------------------------------------------------
// Entorno de cabina (añadido 2026-11-14 · Back 2)
// ---------------------------------------------------------------------------

/**
 * Ambiente de la cabina que `evaluar` recibe como contexto para parámetros
 * ambientales (CO₂, radiación) o que dependen del entorno de vuelo.
 * Los valores ausentes van en `null`, nunca en `0`.
 */
export interface EntornoCabina {
  co2MmHg: number | null;
  radiacionMsv: number | null;
  retardoTierraSegundos: number;
}

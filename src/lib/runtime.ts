/**
 * Composition root — Back 1.
 *
 * Cablea todas las piezas: fuente → motor → evaluador/baseline → sink (DB + sync + 3D + UI).
 * Un solo punto de arranque: `runtime.start()` / `runtime.stop()`.
 */

import { StreamEngine, type SensorSource, type OpcionesStreamEngine } from '@/lib/realtime/stream-engine';
import { evaluar } from '@/lib/rules/triage';
import { baselinePreVuelo } from '@/lib/osdr/client';
import { sexoDe } from '@/lib/knowledge/tripulacion';
import { guardarFrame, purgarVentana, registrarEvento } from '@/lib/db/repositories';
import { encolarFrame } from '@/lib/sync/queue';
import { agregarFrame, persistirSeries, podarSeries } from '@/lib/sync/aggregate';
import { obtenerSyncTransport, flushCola, iniciarFlushPeriodico } from '@/lib/sync/transport';
import { OsdrReplaySource } from '@/lib/realtime/osdr-replay-source';
import { SimulatedSource } from '@/lib/realtime/demo/sensor-source';

import type { CrewId, RealtimeTelemetryFrame, Nivel } from '@/types';

// ---------------------------------------------------------------------------
// Estado global del runtime
// ---------------------------------------------------------------------------

interface EstadoRuntime {
  motor: StreamEngine | null;
  fuente: SensorSource | null;
  desuscribirSink: (() => void) | null;
  detenerFlush: (() => void) | null;
  detenerPoda: ReturnType<typeof setInterval> | null;
  crewId: CrewId;
  modo: 'simulado' | 'replay-osdr';
  iniciado: boolean;
}

const _estado: EstadoRuntime = {
  motor: null,
  fuente: null,
  desuscribirSink: null,
  detenerFlush: null,
  detenerPoda: null,
  crewId: 'C001',
  modo: 'simulado',
  iniciado: false,
};

// ---------------------------------------------------------------------------
// Detección de emergencias (transición a CRITICO → registrarEvento)
// ---------------------------------------------------------------------------

/** Último nivel visto por `crewId:parametroId`, para detectar transiciones. */
const _ultimoNivel = new Map<string, Nivel>();

/**
 * Registra un `EventoEmergencia` (Back 2) cuando un parámetro pasa a CRITICO.
 * Solo en la transición (no en cada frame) para no duplicar eventos.
 */
async function detectarEmergencia(frame: RealtimeTelemetryFrame): Promise<void> {
  for (const [parametroId, lectura] of Object.entries(frame.lecturas)) {
    const clave = `${frame.crewId}:${parametroId}`;
    const anterior = _ultimoNivel.get(clave);

    if (lectura.nivel === 'CRITICO' && anterior !== 'CRITICO') {
      await registrarEvento({
        crewId: frame.crewId,
        timestamp: frame.timestamp,
        severidad: 'CRITICO',
        detalle: `${parametroId}: ${lectura.razon}`,
      });
    }

    _ultimoNivel.set(clave, lectura.nivel);
  }
}

// ---------------------------------------------------------------------------
// Sink principal: persistencia + sync + agregación
// ---------------------------------------------------------------------------

async function sinkPrincipal(frame: RealtimeTelemetryFrame): Promise<void> {
  // 1. Persistir en IndexedDB (Back 2)
  const resultado = await guardarFrame(frame);
  if (!resultado.ok) {
    console.error('[runtime] Error guardando frame:', resultado.codigo, resultado.motivo);
    // No lanzamos: el motor sigue
  }

  // 2. Encolar para sync hacia Tierra
  await encolarFrame(frame);

  // 3. Agregar a series 1min/1h
  const series = await agregarFrame(frame);
  if (series.length > 0) {
    await persistirSeries(series);
  }

  // 4. Registrar emergencia si hay transición a CRITICO (Back 2)
  await detectarEmergencia(frame);

  // 5. El crew-hub (SSE) se suscribe aparte vía `motor.subscribe()`
  // 6. El modelo 3D consume `frame.estadoNodos3D` vía suscripción UI
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

export interface OpcionesRuntime {
  /** Tripulante a monitorear. */
  crewId?: CrewId;
  /** Modo de fuente: 'simulado' (default) o 'replay-osdr'. */
  modo?: 'simulado' | 'replay-osdr';
  /** Opciones extra para la fuente simulada. */
  fuenteSimulada?: ConstructorParameters<typeof SimulatedSource>[0];
  /** Opciones extra para replay OSDR. */
  replayOSDR?: ConstructorParameters<typeof OsdrReplaySource>[0];
  /** Intervalo del motor en ms (default 1000). */
  intervaloMs?: number;
  /** Si true, respeta intervalos de muestreo del catálogo (default false para demo). */
  respetarIntervalos?: boolean;
}

/**
 * Inicia el pipeline completo.
 * Idempotente: si ya está iniciado, no hace nada.
 */
export async function start(opciones: OpcionesRuntime = {}): Promise<void> {
  if (_estado.iniciado) return;

  const crewId = opciones.crewId ?? 'C001';
  const modo = opciones.modo ?? 'simulado';
  const intervaloMs = opciones.intervaloMs ?? 1_000;

  _estado.crewId = crewId;
  _estado.modo = modo;

  // 1. Crear fuente
  let fuente: SensorSource;
  if (modo === 'replay-osdr') {
    fuente = new OsdrReplaySource({
      crewId,
      duracionTotalMs: 60_000,
      soloOSDR: true,
      ...opciones.replayOSDR,
    });
    fuente.start?.();
  } else {
    fuente = new SimulatedSource(opciones.fuenteSimulada ?? { crewId, baseline: () => null, semilla: 20_261_114 });
  }
  _estado.fuente = fuente;

  // 2. Crear motor con inyección de dependencias reales (Back 2)
  const motor = new StreamEngine({
    crewId,
    fuente,
    evaluador: (lectura, def, baseline) =>
      evaluar(lectura.parametroId, lectura.valor, baseline, undefined, lectura.calidad, sexoDe(crewId)),
    baseline: (cid, paramId) => baselinePreVuelo(cid, paramId)?.media ?? null,
    intervaloMs,
    respetarIntervalos: opciones.respetarIntervalos ?? true,
  });
  _estado.motor = motor;

  // 3. Suscribir sink principal
  _estado.desuscribirSink = motor.subscribe(sinkPrincipal);

  // 4. Iniciar flush periódico de sync
  _estado.detenerFlush = iniciarFlushPeriodico(10_000);

  // 5. Poda automática (cada hora): el crudo de `mediciones` y las `series`
  //    viejas se purgan para no llenar IndexedDB. Nunca toca eventos ni bitácora.
  void podarAhora();
  _estado.detenerPoda = setInterval(() => void podarAhora(), 60 * 60 * 1000);

  // 6. Arrancar motor
  motor.start();
  _estado.iniciado = true;

  console.log('[runtime] Iniciado:', { crewId, modo, intervaloMs });
}

/** Purga el crudo y las series viejas (delegado en Back 1 y Back 2). */
async function podarAhora(): Promise<void> {
  try {
    const borradas = await purgarVentana(30);
    const podadas = await podarSeries(30);
    if (borradas > 0 || podadas > 0) {
      console.log(`[runtime] Poda: ${borradas} mediciones, ${podadas} series.`);
    }
  } catch (error) {
    console.warn('[runtime] Poda falló:', error);
  }
}

/**
 * Detiene el pipeline completo.
 * Idempotente: si no está iniciado, no hace nada.
 */
export async function stop(): Promise<void> {
  if (!_estado.iniciado) return;

  _estado.motor?.stop();
  _estado.fuente?.stop?.();
  _estado.desuscribirSink?.();
  _estado.detenerFlush?.();
  if (_estado.detenerPoda !== null) {
    clearInterval(_estado.detenerPoda);
  }

  _estado.motor = null;
  _estado.fuente = null;
  _estado.desuscribirSink = null;
  _estado.detenerFlush = null;
  _estado.detenerPoda = null;
  _estado.iniciado = false;

  console.log('[runtime] Detenido');
}

/** Reinicia con nuevas opciones. */
export async function reiniciar(opciones: OpcionesRuntime): Promise<void> {
  await stop();
  await start(opciones);
}

/** Devuelve el estado actual. */
export function getEstado(): Readonly<EstadoRuntime> {
  return { ..._estado };
}

/** Fuerza una anomalía en el motor activo. */
export function forzarAnomalia(parametroId: string, nivel: Exclude<Nivel, 'NOMINAL'>, duracionMs = 20_000): void {
  _estado.motor?.forzarAnomalia(parametroId, nivel, duracionMs);
}

/** Limpia anomalías. */
export function limpiarAnomalias(): void {
  _estado.motor?.limpiarAnomalias();
}

/** Suscribe un consumidor adicional al motor (UI, 3D, crew-hub). */
export function subscribe(suscriptor: (frame: RealtimeTelemetryFrame) => void): () => void {
  return _estado.motor?.subscribe(suscriptor) ?? (() => {});
}

/** Obtiene el motor para acceso avanzado (tests, debugging). */
export function getMotor(): StreamEngine | null {
  return _estado.motor;
}

/** Obtiene la fuente para acceso avanzado. */
export function getFuente(): SensorSource | null {
  return _estado.fuente;
}

// ---------------------------------------------------------------------------
// Limpieza al descargar página (HMR, navegación)
// ---------------------------------------------------------------------------

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    stop().catch(console.error);
  });

  // Exponer para debugging en consola
  (window as any).__AEGIS_RUNTIME__ = {
    start,
    stop,
    reiniciar,
    getEstado,
    forzarAnomalia,
    limpiarAnomalias,
    subscribe,
    getMotor,
    getFuente,
  };
}
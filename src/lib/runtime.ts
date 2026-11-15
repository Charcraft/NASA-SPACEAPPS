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
import { guardarFrame } from '@/lib/db/repositories';
import { encolarFrame } from '@/lib/sync/queue';
import { agregarFrame, persistirSeries } from '@/lib/sync/aggregate';
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
  crewId: CrewId;
  modo: 'simulado' | 'replay-osdr';
  iniciado: boolean;
}

const _estado: EstadoRuntime = {
  motor: null,
  fuente: null,
  desuscribirSink: null,
  detenerFlush: null,
  crewId: 'C001',
  modo: 'simulado',
  iniciado: false,
};

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

  // 4. El crew-hub (SSE) se suscribe aparte vía `motor.subscribe()`
  // 5. El modelo 3D consume `frame.estadoNodos3D` vía suscripción UI
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
    respetarIntervalos: opciones.respetarIntervalos ?? false,
  });
  _estado.motor = motor;

  // 3. Suscribir sink principal
  _estado.desuscribirSink = motor.subscribe(sinkPrincipal);

  // 4. Iniciar flush periódico de sync
  _estado.detenerFlush = iniciarFlushPeriodico(10_000);

  // 5. Arrancar motor
  motor.start();
  _estado.iniciado = true;

  console.log('[runtime] Iniciado:', { crewId, modo, intervaloMs });
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

  _estado.motor = null;
  _estado.fuente = null;
  _estado.desuscribirSink = null;
  _estado.detenerFlush = null;
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
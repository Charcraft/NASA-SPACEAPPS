/**
 * Cola de sincronización hacia Tierra — Back 1.
 *
 * Gestiona la cola de lotes pendientes con prioridad, hash encadenado y
 * reintentos. No escribe en Dexie: consume `repositories.ts` (Back 2).
 *
 * Prioridades: A=crítico, B=alerta, C=medición, D=bitácora.
 * Hash: djb2 encadenado (hash_i = djb2(hash_{i-1} + payload_i)).
 */

import type {
  CrewId,
  Nivel,
  RealtimeTelemetryFrame,
  ResultadoPersistencia,
} from '@/types';

import { db } from '@/lib/db/dexie';
import type { EntradaColaSync, PrioridadSync, EstadoSync } from '@/lib/db/types';

// Re-exportar para consumidores
export type { PrioridadSync, EstadoSync };

// ---------------------------------------------------------------------------
// Tipos locales
// ---------------------------------------------------------------------------

export interface LoteSync {
  id: number;
  prioridad: PrioridadSync;
  tipo: EntradaColaSync['tipo'];
  payload: RealtimeTelemetryFrame | { eventoId: number } | { bitacoraId: number };
  hash: string;
  hashPrevio: string | null;
  creadoEn: number;
  intentos: number;
  estado: EstadoSync;
}

export interface ColaStats {
  pendientes: number;
  porPrioridad: Record<PrioridadSync, number>;
  masAntigua: number | null;
}

// ---------------------------------------------------------------------------
// Utilidades de hash (djb2, demo, no criptográfico)
// ---------------------------------------------------------------------------

const HASH_SEMILLA = 5381;

function djb2(str: string): string {
  let h = HASH_SEMILLA;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return `h${h.toString(16)}`;
}

function serializarParaHash(payload: LoteSync['payload']): string {
  if ('timestamp' in payload) {
    // RealtimeTelemetryFrame
    return JSON.stringify({
      t: payload.timestamp,
      c: payload.crewId,
      l: Object.fromEntries(
        Object.entries(payload.lecturas).map(([k, v]) => [k, [v.valor, v.nivel]]),
      ),
    });
  }
  if ('eventoId' in payload) {
    return `evt:${payload.eventoId}`;
  }
  if ('bitacoraId' in payload) {
    return `log:${payload.bitacoraId}`;
  }
  return '{}';
}

function calcularHash(payload: LoteSync['payload'], hashPrevio: string | null): string {
  const base = (hashPrevio ?? '') + serializarParaHash(payload);
  return djb2(base);
}

// ---------------------------------------------------------------------------
// Prioridad a partir de un frame
// ---------------------------------------------------------------------------

function prioridadDeFrame(frame: RealtimeTelemetryFrame): PrioridadSync {
  const niveles = Object.values(frame.lecturas).map((l) => l.nivel);
  if (niveles.includes('CRITICO')) return 'A';
  if (niveles.includes('ATENCION')) return 'B';
  return 'C';
}

// ---------------------------------------------------------------------------
// API de la cola
// ---------------------------------------------------------------------------

/** Obtiene el último hash confirmado (del último lote con estado !== 'pendiente'). */
async function obtenerUltimoHashConfirmado(): Promise<string | null> {
  const ultimo = await db.colaSync
    .orderBy('creadoEn')
    .reverse()
    .filter((l) => l.estado !== 'pendiente')
    .first();
  return ultimo?.hash ?? null;
}

/** Añade un frame a la cola con prioridad y hash encadenado. */
export async function encolarFrame(frame: RealtimeTelemetryFrame): Promise<number> {
  const hashPrevio = await obtenerUltimoHashConfirmado();
  const prioridad = prioridadDeFrame(frame);
  const hash = calcularHash(frame, hashPrevio);

  const id = await db.colaSync.add({
    prioridad,
    tipo: 'frame',
    payloadId: frame.timestamp, // se usa como referencia; el payload real viaja en `payload` del lote
    hash,
    estado: 'pendiente',
    creadoEn: Date.now(),
    intentos: 0,
  });

  // Guardamos el payload completo en una tabla auxiliar (memoria) para el flush
  // En la demo usamos una Map en memoria; en producción iría en IndexedDB.
  _payloadCache.set(id, frame);

  return id;
}

/** Añade un evento de emergencia a la cola. */
export async function encolarEvento(eventoId: number, severidad: Nivel): Promise<number> {
  const hashPrevio = await obtenerUltimoHashConfirmado();
  const prioridad: PrioridadSync = severidad === 'CRITICO' ? 'A' : 'B';
  const hash = calcularHash({ eventoId }, hashPrevio);

  const id = await db.colaSync.add({
    prioridad,
    tipo: 'evento',
    payloadId: eventoId,
    hash,
    estado: 'pendiente',
    creadoEn: Date.now(),
    intentos: 0,
  });

  _payloadCache.set(id, { eventoId });
  return id;
}

/** Añade una entrada de bitácora a la cola. */
export async function encolarBitacora(bitacoraId: number): Promise<number> {
  const hashPrevio = await obtenerUltimoHashConfirmado();
  const hash = calcularHash({ bitacoraId }, hashPrevio);

  const id = await db.colaSync.add({
    prioridad: 'D',
    tipo: 'bitacora',
    payloadId: bitacoraId,
    hash,
    estado: 'pendiente',
    creadoEn: Date.now(),
    intentos: 0,
  });

  _payloadCache.set(id, { bitacoraId });
  return id;
}

/** Obtiene el siguiente lote pendiente ordenado por prioridad (A>B>C>D) y antigüedad. */
export async function tomarSiguienteLote(): Promise<LoteSync | null> {
  const ordenPrioridad: PrioridadSync[] = ['A', 'B', 'C', 'D'];

  for (const prioridad of ordenPrioridad) {
    const entrada = await db.colaSync
      .where('prioridad')
      .equals(prioridad)
      .and((l) => l.estado === 'pendiente')
      .sortBy('creadoEn');

    if (entrada.length > 0) {
      const e = entrada[0]!; // length > 0 garantizado
      // `id` es `number | undefined` por el tipo Dexie; lo coersamos con fallback
      const id = e.id ?? 0;
      const payload = _payloadCache.get(id);
      if (!payload) {
        // Payload perdido: marcar como error para no bloquear la cola
        await db.colaSync.update(id, { estado: 'rechazado', intentos: (e.intentos ?? 0) + 1 });
        continue;
      }
      return {
        id,
        prioridad: e.prioridad,
        tipo: e.tipo,
        payload,
        hash: e.hash ?? '',
        hashPrevio: await _calcularHashPrevio(id),
        creadoEn: e.creadoEn ?? 0,
        intentos: e.intentos ?? 0,
        estado: e.estado,
      };
    }
  }
  return null;
}

async function _calcularHashPrevio(idActual: number): Promise<string | null> {
  const anterior = await db.colaSync
    .where('id')
    .below(idActual)
    .reverse()
    .filter((l) => l.estado !== 'pendiente')
    .first();
  return anterior?.hash ?? null;
}

/** Marca un lote como enviado (ACK de Tierra). */
export async function marcarEnviado(id: number): Promise<void> {
  await db.colaSync.update(id, { estado: 'enviado' });
  _payloadCache.delete(id);
}

/** Marca un lote como rechazado (error de integridad, servidor no acepta). */
export async function marcarRechazado(id: number, motivo?: string): Promise<void> {
  const actual = await db.colaSync.get(id);
  const intentosActuales = actual?.intentos ?? 0;
  await db.colaSync.update(id, { estado: 'rechazado', intentos: intentosActuales + 1 });
  if (motivo) {
    console.warn('[sync] Lote rechazado:', id, motivo);
  }
}

/** Reintenta lotes rechazados (máx 3 intentos). */
export async function reintentarRechazados(): Promise<number> {
  const rechazados = await db.colaSync.where('estado').equals('rechazado').toArray();
  let reintentados = 0;
  for (const r of rechazados) {
    const id = r.id != null ? r.id : 0;
    const intentos = r.intentos != null ? Number(r.intentos) : 0;
    if (intentos < 3) {
      await db.colaSync.update(id, { estado: 'pendiente' });
      reintentados++;
    }
  }
  return reintentados;
}

/** Estadísticas de la cola. */
export async function statsCola(): Promise<ColaStats> {
  const todas = await db.colaSync.where('estado').equals('pendiente').toArray();
  const porPrioridad: Record<PrioridadSync, number> = { A: 0, B: 0, C: 0, D: 0 };
  let masAntigua: number | null = null;
  for (const e of todas) {
    porPrioridad[e.prioridad]++;
    if (masAntigua === null || e.creadoEn < masAntigua) masAntigua = e.creadoEn;
  }
  return { pendientes: todas.length, porPrioridad, masAntigua };
}

// ---------------------------------------------------------------------------
// Caché de payloads en memoria (demo)
// En producción: tabla `payloadsSync` en IndexedDB con blob serializado
// ---------------------------------------------------------------------------

const _payloadCache = new Map<number, LoteSync['payload']>();

// Limpieza periódica de payloads huérfanos (opcional)
if (typeof window !== 'undefined') {
  setInterval(() => {
    const ahora = Date.now();
    for (const [id, _] of _payloadCache) {
      // Si el lote ya no está pendiente en DB, limpiar
      db.colaSync.get(id).then((e) => {
        if (!e || e.estado !== 'pendiente') _payloadCache.delete(id);
      });
    }
  }, 60_000);
}
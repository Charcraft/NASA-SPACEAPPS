import Dexie from 'dexie';

import { db } from '@/lib/db/dexie';
import { Back2Error, type CodigoError } from '@/lib/db/errors';

import type { CrewId, ResultadoPersistencia, RealtimeTelemetryFrame } from '@/types';

import type {
  EventoEmergencia,
  RegistroBitacora,
  RegistroMedicionLocal,
} from './types';

/**
 * ÚNICO punto de escritura en IndexedDB (invariante de arquitectura).
 *
 * Nadie más importa `db` para escribir: Back 1 emite por `TelemetrySink` y
 * aquí se persiste. Todas las funciones de escritura son no-bloqueantes para
 * el hilo de renderizado y nunca lanzan hacia el caller: devuelven
 * `ResultadoPersistencia` o un `Back2Error` capturado en el resultado.
 */

const SEGUNDOS = 1000;
const MINUTO = 60 * SEGUNDOS;
const DIA = 24 * 60 * MINUTO;

function mapearError(error: unknown): { codigo: CodigoError; message: string } {
  if (error instanceof Dexie.QuotaExceededError) {
    return { codigo: 'E-DB-001', message: 'Cuota de IndexedDB agotada.' };
  }
  if (error instanceof Dexie.VersionError) {
    return { codigo: 'E-DB-003', message: 'Esquema de base de datos incompatible.' };
  }
  if (error instanceof Dexie.DatabaseClosedError) {
    return { codigo: 'E-DB-002', message: 'Base de datos cerrada o bloqueada.' };
  }
  const message = error instanceof Error ? error.message : String(error);
  return { codigo: 'E-DB-001', message };
}

/**
 * Persiste un frame de telemetría: una fila de `mediciones` por lectura.
 * No encola en `colaSync`: de eso se encarga `sync/queue.encolarFrame` (Back 1),
 * evitando escrituras duplicadas. Nunca lanza.
 */
export async function guardarFrame(
  frame: RealtimeTelemetryFrame,
): Promise<ResultadoPersistencia> {
  const lecturas = Object.entries(frame.lecturas);

  if (lecturas.length === 0) {
    return { ok: true, guardadas: 0 };
  }

  try {
    await db.transaction('rw', db.mediciones, async () => {
      for (const [parametroId, lectura] of lecturas) {
        await db.mediciones.add({
          crewId: frame.crewId,
          parametroId,
          valor: lectura.valor,
          unidad: lectura.unidad,
          nivel: lectura.nivel,
          sincronizadoTierra: false,
          timestamp: frame.timestamp,
        });
      }
    });

    return { ok: true, guardadas: lecturas.length };
  } catch (error) {
    const { codigo, message } = mapearError(error);
    return { ok: false, guardadas: 0, codigo, motivo: message };
  }
}

/** Lecturas de un tripulante en la ventana deslizante (por defecto 15 min). */
export async function ventanaReciente(
  crewId: RealtimeTelemetryFrame['crewId'],
  minutos = 15,
): Promise<RegistroMedicionLocal[]> {
  const corte = Date.now() - minutos * MINUTO;
  return db.mediciones
    .where('crewId')
    .equals(crewId)
    .filter((m) => m.timestamp >= corte)
    .toArray();
}

/** Borra mediciones más antiguas que `dias` (por defecto 30). Devuelve cuántas. */
export async function purgarVentana(dias = 30): Promise<number> {
  const corte = Date.now() - dias * DIA;
  const viejas = await db.mediciones.where('timestamp').below(corte).toArray();
  await db.mediciones.bulkDelete(viejas.map((m) => m.id as number));
  return viejas.length;
}

/** Lecturas pendientes de sincronizar hacia Tierra. */
export async function pendientesSincronizar(): Promise<RegistroMedicionLocal[]> {
  return db.mediciones.toCollection().filter((m) => !m.sincronizadoTierra).toArray();
}

/** Marca lecturas como sincronizadas. Devuelve cuántas se actualizaron. */
export async function marcarSincronizado(ids: number[]): Promise<number> {
  await db.transaction('rw', db.mediciones, async () => {
    for (const id of ids) {
      await db.mediciones.update(id, { sincronizadoTierra: true });
    }
  });
  return ids.length;
}

/**
 * Marca como sincronizadas todas las mediciones de un frame (crewId + timestamp).
 * Conecta la marca de la cola (`colaSync.estado`) con la de las mediciones
 * (`sincronizadoTierra`): la llama `flushCola` cuando un lote se envía a Tierra.
 *
 * Idempotente y no-lanza:
 * - La 2ª llamada encuentra 0 pendientes y devuelve 0.
 * - Un error de IndexedDB devuelve 0 sin romper el flush.
 * - La lectura y la escritura van en una misma transacción `rw`, de modo que
 *   llamadas concurrentes (flush periódico + flush al reconectar) se serializan.
 */
export async function marcarSincronizadoPorFrame(
  crewId: CrewId,
  timestamp: number,
): Promise<number> {
  try {
    return await db.transaction('rw', db.mediciones, async () => {
      const pendientes = await db.mediciones
        .where('crewId')
        .equals(crewId)
        .filter((m) => m.timestamp === timestamp && !m.sincronizadoTierra)
        .toArray();

      for (const medicion of pendientes) {
        await db.mediciones.update(medicion.id as number, { sincronizadoTierra: true });
      }

      return pendientes.length;
    });
  } catch {
    return 0;
  }
}

export async function registrarEvento(
  evento: Omit<EventoEmergencia, 'id' | 'sincronizadoTierra'>,
): Promise<number> {
  return db.eventos.add({ ...evento, sincronizadoTierra: false });
}

export async function registrarBitacora(
  registro: Omit<RegistroBitacora, 'id'>,
): Promise<number> {
  return db.bitacora.add(registro);
}

export { Back2Error };

import Dexie from 'dexie';

import { db } from '@/lib/db/dexie';
import { Back2Error, type CodigoError } from '@/lib/db/errors';
import { GENESIS, contenidoEntrada, hashEncadenado } from '@/lib/sync/hash';

import type { Nivel, ResultadoPersistencia, RealtimeTelemetryFrame } from '@/types';

import type {
  EntradaColaSync,
  EstadoSync,
  EventoEmergencia,
  RegistroBitacora,
  RegistroMedicionLocal,
  SerieAgregada,
} from './types';

/**
 * ÚNICO punto de escritura en IndexedDB (invariante de arquitectura).
 *
 * Nadie más importa `db` para escribir: Back 1 emite por `TelemetrySink` y
 * aquí se persiste. Las escrituras son no-bloqueantes para el renderizado y
 * `guardarFrame` nunca lanza: devuelve `ResultadoPersistencia`.
 */

const SEGUNDOS = 1000;
const MINUTO = 60 * SEGUNDOS;
const DIA = 24 * 60 * MINUTO;

const ORDEN_PRIORIDAD: Record<EntradaColaSync['prioridad'], number> = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

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

function prioridadParaNiveles(niveles: Nivel[]): EntradaColaSync['prioridad'] {
  if (niveles.includes('CRITICO')) return 'A';
  if (niveles.includes('ATENCION')) return 'B';
  return 'C';
}

/**
 * Persiste un frame de telemetría: una fila de `mediciones` por lectura + una
 * entrada en `colaSync` con hash encadenado al anterior. Nunca lanza.
 */
export async function guardarFrame(
  frame: RealtimeTelemetryFrame,
): Promise<ResultadoPersistencia> {
  const lecturas = Object.entries(frame.lecturas);

  if (lecturas.length === 0) {
    return { ok: true, guardadas: 0 };
  }

  try {
    const prioridad = prioridadParaNiveles(lecturas.map(([, l]) => l.nivel));
    const creadoEn = Date.now();

    await db.transaction('rw', db.mediciones, db.colaSync, async () => {
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

      const previa = await db.colaSync.toCollection().last();
      const hash = hashEncadenado(
        previa?.hash ?? GENESIS,
        contenidoEntrada(prioridad, 'frame', frame.timestamp, creadoEn),
      );

      await db.colaSync.add({
        prioridad,
        tipo: 'frame',
        payloadId: frame.timestamp,
        hash,
        estado: 'pendiente',
        creadoEn,
        intentos: 0,
      });
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

// ---------------------------------------------------------------------------
// Cola de sincronización (escrituras/lecturas para `sync/queue.ts`)
// ---------------------------------------------------------------------------

export async function encolarSync(entrada: Omit<EntradaColaSync, 'id'>): Promise<number> {
  return db.colaSync.add(entrada);
}

export async function ultimaEntradaSync(): Promise<EntradaColaSync | undefined> {
  return db.colaSync.toCollection().last();
}

export async function todasEntradasSync(): Promise<EntradaColaSync[]> {
  return db.colaSync.toCollection().toArray();
}

export async function pendientesSync(): Promise<EntradaColaSync[]> {
  const pendientes = await db.colaSync.where('estado').equals('pendiente').toArray();
  return pendientes.sort(
    (a, b) =>
      ORDEN_PRIORIDAD[a.prioridad] - ORDEN_PRIORIDAD[b.prioridad] || a.creadoEn - b.creadoEn,
  );
}

export async function marcarColaSync(ids: number[], estado: EstadoSync): Promise<number> {
  await db.transaction('rw', db.colaSync, async () => {
    for (const id of ids) {
      await db.colaSync.update(id, { estado });
    }
  });
  return ids.length;
}

// ---------------------------------------------------------------------------
// Series agregadas
// ---------------------------------------------------------------------------

export async function guardarSerie(serie: Omit<SerieAgregada, 'id'>): Promise<number> {
  return db.series.add(serie);
}

export { Back2Error };

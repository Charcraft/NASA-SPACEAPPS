import { db } from '@/lib/db/dexie';
import { guardarSerie } from '@/lib/db/repositories';

import type { CrewId } from '@/types';

/**
 * Agregación de series (Back 2): reduce lecturas de 1 Hz a cubos de 1 min o
 * 1 h (`serie`), para no guardar un año de muestras crudas.
 */

export type ResolucionAgregado = '1min' | '1h';

const BUCKETS_MS: Record<ResolucionAgregado, number> = {
  '1min': 60_000,
  '1h': 3_600_000,
};

function pisoBucket(bucketMs: number, timestamp: number): number {
  return Math.floor(timestamp / bucketMs) * bucketMs;
}

/**
 * Agrupa las mediciones de un tripulante + parámetro en cubos y guarda una fila
 * de `series` por cubo (min, max, media, n). Devuelve cuántos cubos guardó.
 */
export async function agregarVentana(
  crewId: CrewId,
  parametroId: string,
  resolucion: ResolucionAgregado,
): Promise<number> {
  const bucketMs = BUCKETS_MS[resolucion];

  const mediciones = await db.mediciones
    .where('crewId')
    .equals(crewId)
    .filter((m) => m.parametroId === parametroId)
    .toArray();

  if (mediciones.length === 0) return 0;

  const grupos = new Map<number, number[]>();
  for (const m of mediciones) {
    const inicio = pisoBucket(bucketMs, m.timestamp);
    const valores = grupos.get(inicio) ?? [];
    valores.push(m.valor);
    grupos.set(inicio, valores);
  }

  let guardados = 0;
  for (const [inicio, valores] of grupos) {
    await guardarSerie({
      crewId,
      parametroId,
      resolucion,
      inicio,
      fin: inicio + bucketMs,
      min: Math.min(...valores),
      max: Math.max(...valores),
      media: Number((valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(2)),
      n: valores.length,
    });
    guardados += 1;
  }

  return guardados;
}

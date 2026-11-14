import { Back2Error } from '@/lib/db/errors';
import {
  marcarColaSync,
  pendientesSync,
  todasEntradasSync,
} from '@/lib/db/repositories';

import type { EntradaColaSync } from '@/lib/db/types';

import { GENESIS, contenidoEntrada, hashEncadenado } from './hash';

/**
 * Cola de sincronización diferida (Back 2).
 *
 * Lógica sobre la tabla `colaSync`: orden por prioridad (A crítico > B alerta
 * > C medición > D bitácora), verificación de la cadena de hash y liberación
 * por ACK. No escribe directamente en Dexie: usa `repositories` (único punto
 * de escritura).
 */

export interface ResultadoVerificacion {
  integro: boolean;
  /** IDs de las entradas cuyo hash no coincide con la cadena. */
  corruptas: number[];
}

/** Próximas entradas pendientes, ordenadas por prioridad y antigüedad. */
export async function siguienteLote(max = 50): Promise<EntradaColaSync[]> {
  const pendientes = await pendientesSync();
  return pendientes.slice(0, max);
}

/** Marca un lote como enviado (liberación por ACK). Devuelve cuántas. */
export async function enviarLote(ids: number[]): Promise<number> {
  return marcarColaSync(ids, 'enviado');
}

/** Marca un lote como rechazado (por ejemplo tras E-SYN-001). */
export async function rechazarLote(ids: number[]): Promise<number> {
  return marcarColaSync(ids, 'rechazado');
}

/**
 * Verifica la integridad de la cadena de hash. Una entrada corrupta invalida
 * todas las posteriores (por eso se reportan las que rompen la cadena).
 */
export async function verificarCadena(): Promise<ResultadoVerificacion> {
  const todas = await todasEntradasSync();
  const corruptas: number[] = [];
  let previo = GENESIS;

  for (const entrada of todas) {
    const esperado = hashEncadenado(
      previo,
      contenidoEntrada(entrada.prioridad, entrada.tipo, entrada.payloadId, entrada.creadoEn),
    );
    if (esperado !== entrada.hash) {
      corruptas.push(entrada.id as number);
    }
    previo = entrada.hash;
  }

  return { integro: corruptas.length === 0, corruptas };
}

/**
 * Devuelve el siguiente lote listo para enviar, o lanza `E-SYN-001` si la
 * cadena de hash está corrupta (no se reintenta automáticamente).
 */
export async function loteSeguro(max = 50): Promise<EntradaColaSync[]> {
  const { integro, corruptas } = await verificarCadena();
  if (!integro) {
    throw new Back2Error('E-SYN-001', {
      id: corruptas[0] ?? -1,
      esperado: 'cadena',
      recibido: 'corrupta',
    });
  }
  return siguienteLote(max);
}

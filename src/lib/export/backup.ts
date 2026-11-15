/**
 * Exportación de respaldo — Back 1.
 *
 * Lee el estado local (IndexedDB) y lo descarga como JSON, sin red ni backend.
 * Sirve para que el astronauta lleve su histórico a Tierra o tenga un respaldo
 * ante pérdida del dispositivo.
 *
 * No escribe en Dexie: solo lectura.
 */

import { db } from '@/lib/db/dexie';

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface RespaldoAegis {
  version: 1;
  exportadoEn: number;
  tripulante: string | null;
  mediciones: unknown[];
  series: unknown[];
  eventos: unknown[];
  bitacora: unknown[];
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/**
 * Lee todo el estado local y lo devuelve serializado.
 * No lanza: ante un fallo devuelve un respaldo con los arrays vacíos.
 */
export async function exportarRespaldo(): Promise<RespaldoAegis> {
  const [mediciones, series, eventos, bitacora] = await Promise.all([
    db.mediciones.toArray().catch(() => []),
    db.series.toArray().catch(() => []),
    db.eventos.toArray().catch(() => []),
    db.bitacora.toArray().catch(() => []),
  ]);

  return {
    version: 1,
    exportadoEn: Date.now(),
    tripulante: typeof localStorage !== 'undefined' ? localStorage.getItem('aegis:crew') : null,
    mediciones,
    series,
    eventos,
    bitacora,
  };
}

/** Serializa el respaldo a una cadena JSON legible (2 espacios). */
export async function respaldoAJson(): Promise<string> {
  const respaldo = await exportarRespaldo();
  return JSON.stringify(respaldo, null, 2);
}

/**
 * Descarga el respaldo como archivo JSON. Solo en cliente (usa DOM).
 * El nombre lleva la fecha para no sobrescribir respaldos previos.
 */
export async function descargarRespaldo(): Promise<void> {
  const json = await respaldoAJson();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `aegis-respaldo-${Date.now()}.json`;
  enlace.click();

  URL.revokeObjectURL(url);
}

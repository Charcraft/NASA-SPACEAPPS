import osdrRaw from '@/data/seed/osdr-inspiration4-cmp.json';

import type { CrewId } from '@/types';

/**
 * Cliente O(1) de NASA OSDR OSD-575 (Back 2).
 *
 * Pre-indexa en memoria las 475 lecturas reales (17 indicadores × 4 tripulantes
 * × 7 timepoints, con una celda ausente) para que `baselinePreVuelo` y las
 * consultas del catálogo respondan en < 1 ms sin red ni acceso a disco.
 *
 * Dueño: Back 2. Consumidores: `rules/thresholds.ts` y `rules/triage.ts`.
 */

// ---------------------------------------------------------------------------
// Tipos del dataset (específicos de OSDR; no van en types/index.ts porque solo
// los usa este cliente y sus consumidores de Back 2).
// ---------------------------------------------------------------------------

export type TimepointId =
  | 'L-92'
  | 'L-44'
  | 'L-3'
  | 'R+1'
  | 'R+45'
  | 'R+82'
  | 'R+194';

export type FaseTimepoint = 'pre-vuelo' | 'post-vuelo';

export interface PuntoSerieOSDR {
  timepoint: TimepointId;
  valor: number | null;
}

export interface IndicadorOSDR {
  id: string;
  nombre: string;
  sistema: string;
  unidad: string;
  rangoReferencia: { min: number | null; max: number | null };
  fuente: string;
  serie: Record<CrewId, PuntoSerieOSDR[]>;
}

export interface DatasetOSDR {
  meta: {
    fuente: string;
    accesion: string;
    titulo: string;
    archivo: string;
    url: string;
    paginaDataset: string;
    obtenido: string;
    tripulantes: CrewId[];
    puntosTemporales: number;
    nota: string;
    licencia: string;
    generadoPor: string;
  };
  timepoints: {
    id: TimepointId;
    diasRelativosAlLanzamiento: number;
    fase: FaseTimepoint;
  }[];
  indicadores: IndicadorOSDR[];
}

/**
 * Estadística de la línea base personal pre-vuelo (L-92, L-44, L-3).
 * `triage` usa `media` para el delta y `desviacionEstandar` para el z-score.
 */
export interface EstadisticaBaselinePersonal {
  crewId: CrewId;
  indicadorId: string;
  media: number;
  desviacionEstandar: number;
  min: number;
  max: number;
  n: number;
}

// ---------------------------------------------------------------------------
// Índice y caché
// ---------------------------------------------------------------------------

const dataset = osdrRaw as unknown as DatasetOSDR;

const INDICE = new Map<string, IndicadorOSDR>();
for (const indicador of dataset.indicadores) {
  INDICE.set(indicador.id, indicador);
}

const BASELINE_CACHE = new Map<string, EstadisticaBaselinePersonal>();

const PRE_FLIGHT: readonly TimepointId[] = ['L-92', 'L-44', 'L-3'];

function redondear2(valor: number): number {
  return Number(valor.toFixed(2));
}

// ---------------------------------------------------------------------------
// Catálogo
// ---------------------------------------------------------------------------

export function obtenerDatasetOSDR(): DatasetOSDR {
  return dataset;
}

export function listarIndicadoresOSDR(): IndicadorOSDR[] {
  return dataset.indicadores;
}

export function obtenerIndicadorOSDR(id: string): IndicadorOSDR | undefined {
  return INDICE.get(id);
}

// ---------------------------------------------------------------------------
// Línea base personal
// ---------------------------------------------------------------------------

/**
 * Calcula y cachea la línea base personal pre-vuelo (L-92, L-44, L-3) de un
 * tripulante para un indicador OSDR.
 *
 * Devuelve `null` si el indicador no existe, el tripulante no existe, o no hay
 * valores pre-vuelo. Nunca devuelve un objeto con `n: 0`.
 */
export function baselinePreVuelo(
  crewId: CrewId,
  indicadorId: string,
): EstadisticaBaselinePersonal | null {
  const key = `${crewId}:${indicadorId}`;
  const cacheado = BASELINE_CACHE.get(key);
  if (cacheado) return cacheado;

  const indicador = INDICE.get(indicadorId);
  if (!indicador) return null;

  const serie = indicador.serie[crewId];
  if (!serie) return null;

  const valores = serie
    .filter((p) => PRE_FLIGHT.includes(p.timepoint) && p.valor !== null)
    .map((p) => p.valor as number);

  if (valores.length === 0) return null;

  const n = valores.length;
  const media = valores.reduce((a, b) => a + b, 0) / n;
  const varianza =
    valores.reduce((acc, v) => acc + (v - media) ** 2, 0) / n;

  const estadistica: EstadisticaBaselinePersonal = {
    crewId,
    indicadorId,
    media: redondear2(media),
    desviacionEstandar: redondear2(Math.sqrt(varianza)),
    min: Math.min(...valores),
    max: Math.max(...valores),
    n,
  };

  BASELINE_CACHE.set(key, estadistica);
  return estadistica;
}

// ---------------------------------------------------------------------------
// Consulta puntual
// ---------------------------------------------------------------------------

/**
 * Valor de un indicador para un tripulante en un timepoint dado (por defecto
 * `R+1`). Devuelve `null` si no existe la celda o el valor es nulo.
 */
export function obtenerValorEnTimepoint(
  crewId: CrewId,
  indicadorId: string,
  timepoint: TimepointId = 'R+1',
): number | null {
  const indicador = INDICE.get(indicadorId);
  if (!indicador) return null;
  const punto = indicador.serie[crewId]?.find((p) => p.timepoint === timepoint);
  return punto?.valor ?? null;
}

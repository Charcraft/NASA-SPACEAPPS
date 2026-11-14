import osdrRaw from "@/data/seed/osdr-inspiration4-cmp.json";
import type {
  CrewId,
  DatasetOSDR,
  EstadisticaBaselinePersonal,
  IndicadorOSDR,
  TimepointId,
} from "@/types";

/**
 * Cliente O(1) de alto rendimiento para NASA OSDR OSD-575.
 * Pre-indexa en memoria las 475 muestras reales (19 analitos × 4 tripulantes × 7 puntos temporales)
 * en < 1 ms sin bloquear el hilo principal ni requerir red.
 */
const dataset = osdrRaw as unknown as DatasetOSDR;

const INDICADORES_MAP = new Map<string, IndicadorOSDR>();
const BASELINE_CACHE = new Map<string, EstadisticaBaselinePersonal>();

for (const ind of dataset.indicadores) {
  INDICADORES_MAP.set(ind.id, ind);
}

const PRE_FLIGHT_TPS: TimepointId[] = ["L-92", "L-44", "L-3"];

export function obtenerDatasetOSDR(): DatasetOSDR {
  return dataset;
}

export function listarIndicadoresOSDR(): IndicadorOSDR[] {
  return dataset.indicadores;
}

export function obtenerIndicadorOSDR(id: string): IndicadorOSDR | undefined {
  return INDICADORES_MAP.get(id);
}

/**
 * Calcula y cachea en O(1) la línea base personal pre-vuelo (L-92, L-44, L-3)
 * de un tripulante (C001-C004) para cualquier analito de OSD-575.
 */
export function calcularBaselinePersonal(
  crewId: CrewId,
  indicadorId: string
): EstadisticaBaselinePersonal {
  const key = `${crewId}:${indicadorId}`;
  const cached = BASELINE_CACHE.get(key);
  if (cached) return cached;

  const ind = INDICADORES_MAP.get(indicadorId);
  const serieCrew = ind?.serie?.[crewId] ?? [];
  const valoresPre = serieCrew
    .filter((p) => PRE_FLIGHT_TPS.includes(p.timepoint) && p.valor !== null)
    .map((p) => p.valor as number);

  if (valoresPre.length === 0) {
    const fallback: EstadisticaBaselinePersonal = {
      crewId,
      indicadorId,
      mediaPreVuelo: 0,
      desviacionPreVuelo: 0,
      minPreVuelo: 0,
      maxPreVuelo: 0,
      muestrasPreVuelo: 0,
    };
    BASELINE_CACHE.set(key, fallback);
    return fallback;
  }

  const sum = valoresPre.reduce((a, b) => a + b, 0);
  const media = Number((sum / valoresPre.length).toFixed(2));
  const variance =
    valoresPre.reduce((acc, v) => acc + Math.pow(v - media, 2), 0) /
    valoresPre.length;
  const std = Number(Math.sqrt(variance).toFixed(2));

  const stat: EstadisticaBaselinePersonal = {
    crewId,
    indicadorId,
    mediaPreVuelo: media,
    desviacionPreVuelo: std,
    minPreVuelo: Math.min(...valoresPre),
    maxPreVuelo: Math.max(...valoresPre),
    muestrasPreVuelo: valoresPre.length,
  };

  BASELINE_CACHE.set(key, stat);
  return stat;
}

/**
 * Devuelve el valor de un indicador para un tripulante en un punto temporal dado (por defecto R+1).
 */
export function obtenerValorEnTimepoint(
  crewId: CrewId,
  indicadorId: string,
  timepoint: TimepointId = "R+1"
): number | null {
  const ind = INDICADORES_MAP.get(indicadorId);
  if (!ind) return null;
  const punto = ind.serie[crewId]?.find((p) => p.timepoint === timepoint);
  return punto?.valor ?? null;
}

/**
 * Identifica todas las lecturas fuera del rango de referencia oficial de OSD-575
 * para un tripulante (o en todo el dataset: 24 de 475 valores).
 */
export function listarValoresFueraDeRango(crewId?: CrewId) {
  const hallazgos: {
    crewId: CrewId;
    indicadorId: string;
    nombre: string;
    unidad: string;
    timepoint: TimepointId;
    valor: number;
    rangoMin: number | null;
    rangoMax: number | null;
    mediaBaseline: number;
  }[] = [];

  const crews: CrewId[] = crewId
    ? [crewId]
    : ["C001", "C002", "C003", "C004"];

  for (const ind of dataset.indicadores) {
    const { min, max } = ind.rangoReferencia;
    for (const c of crews) {
      const base = calcularBaselinePersonal(c, ind.id);
      for (const p of ind.serie[c] ?? []) {
        if (p.valor === null) continue;
        const bajo = min !== null && p.valor < min;
        const alto = max !== null && p.valor > max;
        if (bajo || alto) {
          hallazgos.push({
            crewId: c,
            indicadorId: ind.id,
            nombre: ind.nombre,
            unidad: ind.unidad,
            timepoint: p.timepoint,
            valor: p.valor,
            rangoMin: min,
            rangoMax: max,
            mediaBaseline: base.mediaPreVuelo,
          });
        }
      }
    }
  }
  return hallazgos;
}

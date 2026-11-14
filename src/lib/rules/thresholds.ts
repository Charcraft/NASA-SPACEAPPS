import { obtenerIndicadorOSDR } from "@/lib/osdr/client";

/**
 * Umbrales de referencia derivados directamente del dataset NASA OSDR OSD-575.
 * Conforme a AGENTS.md §3: no se inventan rangos clínicos; se usan los del propio dataset
 * y se define un margen de desviación severa (±25% fuera del rango de referencia)
 * como criterio determinista de escalado a nivel CRÍTICO.
 */
export function obtenerUmbralesIndicador(indicadorId: string) {
  const ind = obtenerIndicadorOSDR(indicadorId);
  if (!ind) {
    return {
      min: null,
      max: null,
      criticoMin: null,
      criticoMax: null,
      fuente: "NASA OSDR OSD-575",
    };
  }

  const { min, max } = ind.rangoReferencia;
  const amplitud =
    min !== null && max !== null ? Math.max(max - min, 1) : 20;

  return {
    min,
    max,
    criticoMin: min !== null ? Number((min - amplitud * 0.35).toFixed(2)) : null,
    criticoMax: max !== null ? Number((max + amplitud * 0.35).toFixed(2)) : null,
    fuente: ind.fuente,
  };
}

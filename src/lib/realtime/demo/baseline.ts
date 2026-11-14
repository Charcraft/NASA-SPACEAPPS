/**
 * Baseline pre-vuelo — implementación [DEMO] de Back 1.
 *
 * Dueño definitivo: Back 2 (`src/lib/osdr/client.ts` → `baselinePreVuelo()`).
 * Mientras ese archivo no exista, el motor usa este proveedor para que la sala
 * de tripulación muestre desviaciones reales en vez de `null`.
 *
 * Cálculo: media de los tres puntos pre-vuelo (`L-92`, `L-44`, `L-3`) del
 * dataset OSD-575. Si el tripulante no tiene los tres puntos, devuelve `null`
 * y la evaluación queda marcada como degradada.
 *
 * Se sustituye inyectando otro `BaselineProvider` en `crearStreamEngine`.
 * No importa Dexie, ni reglas, ni red.
 */

import type { CrewId } from '@/types';

import seed from '@/data/seed/osdr-inspiration4-cmp.json';

import type { BaselineProvider } from '../stream-engine';

interface PuntoSeed {
  timepoint: string;
  valor: number;
}

interface IndicadorSeed {
  id: string;
  serie: Record<string, PuntoSeed[]>;
}

interface Seed {
  timepoints: Array<{ id: string; fase: string }>;
  indicadores: IndicadorSeed[];
}

const datos = seed as unknown as Seed;

const PUNTOS_PRE_VUELO: ReadonlySet<string> = new Set(
  datos.timepoints.filter((punto) => punto.fase === 'pre-vuelo').map((punto) => punto.id),
);

/** Índice `parametroId → crewId → media pre-vuelo`. Se construye una sola vez. */
const BASELINES: ReadonlyMap<string, ReadonlyMap<string, number>> = (() => {
  const indice = new Map<string, Map<string, number>>();

  for (const indicador of datos.indicadores) {
    const porTripulante = new Map<string, number>();

    for (const [crewId, serie] of Object.entries(indicador.serie)) {
      const preVuelo = serie.filter((punto) => PUNTOS_PRE_VUELO.has(punto.timepoint));

      if (preVuelo.length !== 3) {
        continue;
      }

      const suma = preVuelo.reduce((total, punto) => total + punto.valor, 0);
      porTripulante.set(crewId, suma / preVuelo.length);
    }

    indice.set(indicador.id, porTripulante);
  }

  return indice;
})();

export function crearBaselineDemo(): BaselineProvider {
  return (crewId, parametroId) => {
    const valor = BASELINES.get(parametroId)?.get(crewId);
    return valor === undefined ? null : valor;
  };
}

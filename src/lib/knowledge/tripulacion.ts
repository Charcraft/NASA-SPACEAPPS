import tripulacionRaw from '@/data/knowledge/tripulacion.json';

import type { CrewId, Sexo } from '@/types';

/**
 * Perfil de tripulación: sexo biológico por tripulante (Back 2).
 *
 * Fuente de la asignación: `src/data/knowledge/tripulacion.json` [SUPUESTO],
 * porque el dataset OSDR OSD-575 está desidentificado (C001–C004) y no revela
 * sexo. Se usa únicamente para resolver rangos de referencia sexo-específicos.
 */

const ASIGNACION = tripulacionRaw as unknown as {
  tripulantes: Partial<Record<CrewId, Sexo>>;
};

/** Devuelve el sexo del tripulante, o `undefined` si no está asignado. */
export function sexoDe(crewId: CrewId): Sexo | undefined {
  return ASIGNACION.tripulantes[crewId];
}

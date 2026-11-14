/**
 * Puente con el modelo 3D — Back 1.
 *
 * Traduce `estadoNodos3D` a lo que la UI necesita: color, etiqueta, animación y
 * texto accesible. No dibuja nada y no importa React.
 */

import type {
  EstadoNodo3D,
  MeshNodeId,
  Nivel,
  RealtimeTelemetryFrame,
  ToolAnimationId,
} from '@/types';

export const NODOS_3D: readonly MeshNodeId[] = [
  'head_neuro_ocular',
  'thorax_heart',
  'thorax_lungs',
  'abdomen_hepatic_renal',
  'limbs_musculoskeletal',
  'systemic_immune_radiation',
];

export const ETIQUETA_NODO: Readonly<Record<MeshNodeId, string>> = {
  head_neuro_ocular: 'Cabeza y sistema neuro-ocular',
  thorax_heart: 'Tórax · corazón',
  thorax_lungs: 'Tórax · pulmones',
  abdomen_hepatic_renal: 'Abdomen · hígado y riñón',
  limbs_musculoskeletal: 'Extremidades · músculo y hueso',
  systemic_immune_radiation: 'Sistémico · inmune y radiación',
};

export const COLOR_NIVEL: Readonly<Record<Nivel, string>> = {
  NOMINAL: '#22c55e',
  ATENCION: '#f59e0b',
  CRITICO: '#ef4444',
};

export const ETIQUETA_NIVEL: Readonly<Record<Nivel, string>> = {
  NOMINAL: 'Nominal',
  ATENCION: 'Atención',
  CRITICO: 'Crítico',
};

export const ORDEN_NIVEL: Readonly<Record<Nivel, number>> = {
  NOMINAL: 0,
  ATENCION: 1,
  CRITICO: 2,
};

export function esMasGrave(a: Nivel, b: Nivel): boolean {
  return ORDEN_NIVEL[a] > ORDEN_NIVEL[b];
}

export function estadoDeNodo(
  frame: RealtimeTelemetryFrame,
  nodo: MeshNodeId,
): EstadoNodo3D | null {
  return frame.estadoNodos3D[nodo] ?? null;
}

export function nodosEnAlerta(
  frame: RealtimeTelemetryFrame,
): Array<{ nodo: MeshNodeId; estado: EstadoNodo3D }> {
  return NODOS_3D.flatMap((nodo) => {
    const estado = frame.estadoNodos3D[nodo];

    return estado && estado.nivelMaximo !== 'NOMINAL' ? [{ nodo, estado }] : [];
  });
}

export function animacionActiva(
  frame: RealtimeTelemetryFrame,
  nodo: MeshNodeId,
): ToolAnimationId | null {
  return frame.estadoNodos3D[nodo]?.animacionActiva ?? null;
}

/** Texto para `aria-live`: una sola frase con lo que está fuera de rango. */
export function resumenParaAccesibilidad(frame: RealtimeTelemetryFrame): string {
  const alertas = nodosEnAlerta(frame);

  if (alertas.length === 0) {
    return `Tripulante ${frame.crewId}: todos los nodos en estado nominal.`;
  }

  const detalle = alertas
    .map(({ nodo, estado }) => `${ETIQUETA_NODO[nodo]} en ${ETIQUETA_NIVEL[estado.nivelMaximo].toLowerCase()}`)
    .join('; ');

  return `Tripulante ${frame.crewId}: ${detalle}.`;
}

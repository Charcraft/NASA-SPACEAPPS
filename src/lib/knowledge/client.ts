import protocolosRaw from '@/data/knowledge/protocolos.json';

import type { Nivel } from '@/types';

/**
 * Cliente O(1) de protocolos médicos (Back 2).
 *
 * Índice en memoria sobre `src/data/knowledge/protocolos.json` (append-only).
 * `protocoloPara(parametroId, nivel)` resuelve el protocolo concreto que
 * dispara el triage; si no hay protocolo para ese parámetro, devuelve `null`
 * y la UI cae al `accion` genérico de `Evaluacion`.
 *
 * Regla de honestidad (AGENTS.md §3): los pasos están redactados en lenguaje
 * simple para tripulación NO médica y cada protocolo lleva `fuente` +
 * `fuenteUrl`. Los pasos adaptados (no verbatim de NASA) llevan `validado:
 * false` y `[POR VALIDAR]` en la fuente.
 */

export interface DisparadorProtocolo {
  parametroId: string;
  nivel: Nivel;
  regla: string;
}

export interface PasoProtocolo {
  orden: number;
  texto: string;
}

export interface Protocolo {
  id: string;
  nombre: string;
  disparadores: DisparadorProtocolo[];
  pasos: PasoProtocolo[];
  escalarA: 'cmo' | 'cirujano-de-vuelo' | 'protocolo-emergencia';
  fuente: string;
  fuenteUrl?: string;
  validado: boolean;
}

const PROTOCOLOS = protocolosRaw as unknown as Protocolo[];

const INDICE = new Map<string, Protocolo>(PROTOCOLOS.map((p) => [p.id, p]));

const POR_PARAMETRO = new Map<string, Protocolo[]>();
for (const protocolo of PROTOCOLOS) {
  for (const disparador of protocolo.disparadores) {
    const existentes = POR_PARAMETRO.get(disparador.parametroId) ?? [];
    existentes.push(protocolo);
    POR_PARAMETRO.set(disparador.parametroId, existentes);
  }
}

export function listarProtocolos(): Protocolo[] {
  return PROTOCOLOS;
}

export function obtenerProtocolo(id: string): Protocolo | undefined {
  return INDICE.get(id);
}

/**
 * Devuelve el protocolo que dispara un parámetro + nivel, o `null` si no hay.
 */
export function protocoloPara(parametroId: string, nivel: Nivel): Protocolo | null {
  const candidatos = POR_PARAMETRO.get(parametroId);
  if (!candidatos) return null;

  return (
    candidatos.find((p) =>
      p.disparadores.some((d) => d.parametroId === parametroId && d.nivel === nivel),
    ) ?? null
  );
}

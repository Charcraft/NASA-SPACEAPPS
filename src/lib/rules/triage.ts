import { getOrThrow } from '@/lib/realtime/registry';
import { obtenerUmbralesOrThrow } from '@/lib/rules/thresholds';

import type { EntornoCabina, Evaluacion, Nivel, Sexo, TipoDesviacion } from '@/types';

/**
 * Motor determinista puro de triage (Back 2).
 *
 * Sin red, sin base de datos, sin IA y sin efectos secundarios: dado un valor y
 * su línea base, devuelve el nivel (NOMINAL | ATENCION | CRITICO), la regla
 * disparada, la acción recomendada y la fuente del umbral.
 *
 * Reglas de honestidad (AGENTS.md §3):
 * - NO se inventan umbrales: los rangos vienen de `registry.ts`.
 * - Si la fuente del umbral es [SUPUESTO]/[POR VALIDAR], `degradado` queda en
 *   `true`.
 * - Si no hay línea base personal, la evaluación se marca degradada (se usó el
 *   rango poblacional como única referencia).
 */

type Regla =
  | 'CRITICO_ALTO'
  | 'CRITICO_BAJO'
  | 'ATENCION_ALTO'
  | 'ATENCION_BAJO'
  | 'NOMINAL'
  | 'SIN_UMBRAL';

/** [SUPUESTO] señal por debajo de esta calidad no es confiable para escalar. */
const CALIDAD_MINIMA = 0.5;

function redondear1(valor: number): number {
  return Number(valor.toFixed(1));
}

function formatearRango(min: number | null, max: number | null): string {
  return `${min ?? '–'}–${max ?? '–'}`;
}

function accionPara(nivel: Nivel, regla: Regla): string {
  if (regla === 'SIN_UMBRAL') {
    return 'Sin umbral de referencia validado: registrar la lectura y marcarla para validación clínica.';
  }
  if (nivel === 'CRITICO') {
    return 'Notificar al Oficial Médico de Tripulación (CMO) y activar el protocolo de emergencia correspondiente.';
  }
  if (nivel === 'ATENCION') {
    return 'Repetir la medición y vigilar la evolución en la siguiente lectura programada.';
  }
  return 'Mantener la rutina de monitoreo programada.';
}

export function evaluar(
  paramId: string,
  valor: number,
  baseline: number | null,
  entorno?: EntornoCabina,
  calidad?: number,
  sexo?: Sexo,
): Evaluacion {
  const def = getOrThrow(paramId);
  const umbrales = obtenerUmbralesOrThrow(paramId, sexo);

  const { min, max, criticoMin, criticoMax, fuente, fuenteValidada } = umbrales;
  const unidad = def.unidad;

  const tieneUmbral =
    min !== null || max !== null || criticoMin !== null || criticoMax !== null;

  // ---- Nivel y regla (determinista, por rangos) ----
  let nivel: Nivel = 'NOMINAL';
  let regla: Regla = 'NOMINAL';

  if (criticoMin !== null && valor <= criticoMin) {
    nivel = 'CRITICO';
    regla = 'CRITICO_BAJO';
  } else if (criticoMax !== null && valor >= criticoMax) {
    nivel = 'CRITICO';
    regla = 'CRITICO_ALTO';
  } else if (min !== null && valor < min) {
    nivel = 'ATENCION';
    regla = 'ATENCION_BAJO';
  } else if (max !== null && valor > max) {
    nivel = 'ATENCION';
    regla = 'ATENCION_ALTO';
  } else if (!tieneUmbral) {
    regla = 'SIN_UMBRAL';
  }

  // ---- Degradación ----
  const senalBaja = calidad !== undefined && calidad < CALIDAD_MINIMA;
  const degradado = !fuenteValidada || baseline === null || senalBaja;

  // ---- Calidad de señal insuficiente: no escalar a CRITICO ----
  if (senalBaja && nivel === 'CRITICO') {
    nivel = 'ATENCION';
    regla = regla === 'CRITICO_BAJO' ? 'ATENCION_BAJO' : 'ATENCION_ALTO';
  }

  // ---- Desviación respecto a la línea base ----
  const tipoDesviacion: TipoDesviacion = def.tipoDesviacion;
  let desviacionValor: number;
  if (baseline === null) {
    desviacionValor = 0;
  } else if (tipoDesviacion === 'delta-absoluto') {
    desviacionValor = redondear1(valor - baseline);
  } else {
    // z-score real requiere la desviación estándar, que no llega en esta firma;
    // se usa el % de la línea base como proxy (documentado).
    desviacionValor = baseline !== 0 ? redondear1(((valor - baseline) / baseline) * 100) : 0;
  }

  // ---- Razón legible ----
  const rango = formatearRango(min, max);
  let razon: string;
  switch (regla) {
    case 'CRITICO_BAJO':
      razon = `${valor} ${unidad} rebasa el umbral crítico inferior (${criticoMin} ${unidad}) con rango de referencia ${rango} ${unidad}.`;
      break;
    case 'CRITICO_ALTO':
      razon = `${valor} ${unidad} rebasa el umbral crítico superior (${criticoMax} ${unidad}) con rango de referencia ${rango} ${unidad}.`;
      break;
    case 'ATENCION_BAJO':
      razon = `${valor} ${unidad} está por debajo del límite inferior de referencia (${min} ${unidad}).`;
      break;
    case 'ATENCION_ALTO':
      razon = `${valor} ${unidad} está por encima del límite superior de referencia (${max} ${unidad}).`;
      break;
    case 'SIN_UMBRAL':
      razon = `No hay rango de referencia para «${paramId}»: lectura registrada sin evaluación de nivel.`;
      break;
    default:
      razon = `${valor} ${unidad} dentro del rango de referencia (${rango} ${unidad}).`;
  }

  if (baseline === null) {
    razon += ' Línea base personal no disponible: evaluación degradada a referencia poblacional.';
  }
  if (senalBaja) {
    razon += ' Calidad de señal insuficiente: repetir la medición.';
  }

  return {
    nivel,
    razon,
    accion: accionPara(nivel, regla),
    fuente,
    reglaDisparada: regla,
    valor,
    baseline,
    desviacion: { tipo: tipoDesviacion, valor: desviacionValor },
    degradado,
  };
}

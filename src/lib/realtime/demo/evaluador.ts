/**
 * Evaluador determinista — implementación [DEMO] de Back 1.
 *
 * Dueño definitivo: Back 2 (`src/lib/rules/triage.ts` → `evaluar()`).
 * El motor recibe el evaluador por inyección; cuando Back 2 entregue el suyo,
 * se cambia una línea en el arranque y este archivo se borra.
 *
 * Reglas de esta demo:
 * 1. Un valor fuera de `criticoMin`/`criticoMax` es CRITICO.
 * 2. Un valor fuera de `rangoReferencia` es ATENCION.
 * 3. Sin umbrales (`null`) el valor es informativo: NOMINAL y `degradado`.
 * 4. Calidad < 0.5 rebaja un CRITICO a ATENCION y marca `degradado`.
 *
 * La desviación es una aproximación de demo: no sustituye al z-score real.
 */

import type { Evaluacion, LecturaEvaluable, Nivel, ParameterDefinition } from '@/types';

import type { EvaluadorFrame } from '../stream-engine';

function numero(valor: number): string {
  return Number.isInteger(valor) ? String(valor) : valor.toFixed(1);
}

function evaluarRango(
  definicion: ParameterDefinition,
  valor: number,
): { nivel: Nivel; regla: string } {
  const { min, max, criticoMin, criticoMax } = definicion.rangoReferencia;

  if (criticoMax !== null && valor > criticoMax) {
    return { nivel: 'CRITICO', regla: `demo:critico-max:${definicion.id}` };
  }

  if (criticoMin !== null && valor < criticoMin) {
    return { nivel: 'CRITICO', regla: `demo:critico-min:${definicion.id}` };
  }

  if (max !== null && valor > max) {
    return { nivel: 'ATENCION', regla: `demo:atencion-max:${definicion.id}` };
  }

  if (min !== null && valor < min) {
    return { nivel: 'ATENCION', regla: `demo:atencion-min:${definicion.id}` };
  }

  if (min === null && max === null) {
    return { nivel: 'NOMINAL', regla: `demo:sin-umbral:${definicion.id}` };
  }

  return { nivel: 'NOMINAL', regla: `demo:dentro-de-rango:${definicion.id}` };
}

function desviacionDemo(
  definicion: ParameterDefinition,
  valor: number,
  baseline: number | null,
): { tipo: ParameterDefinition['tipoDesviacion']; valor: number } {
  const referencia =
    baseline ??
    (definicion.referenciaPoblacional.min !== null &&
    definicion.referenciaPoblacional.max !== null
      ? (definicion.referenciaPoblacional.min + definicion.referenciaPoblacional.max) / 2
      : null);

  if (referencia === null) {
    return { tipo: definicion.tipoDesviacion, valor: 0 };
  }

  if (definicion.tipoDesviacion === 'z-score') {
    // Aproximación: 10 % de la referencia como sigma. No es un z-score clínico.
    const sigma = Math.max(Math.abs(referencia) * 0.1, 0.5);
    return { tipo: 'z-score', valor: (valor - referencia) / sigma };
  }

  return { tipo: 'delta-absoluto', valor: valor - referencia };
}

function redactar(
  definicion: ParameterDefinition,
  valor: number,
  nivel: Nivel,
): { razon: string; accion: string } {
  const etiqueta = `${numero(valor)} ${definicion.unidad}`;
  const { min, max, criticoMin, criticoMax } = definicion.rangoReferencia;

  if (nivel === 'CRITICO') {
    const limite =
      criticoMax !== null && valor > criticoMax
        ? `por encima del límite crítico (${numero(criticoMax)} ${definicion.unidad})`
        : `por debajo del límite crítico (${criticoMin === null ? '—' : numero(criticoMin)} ${definicion.unidad})`;

    return {
      razon: `«${definicion.nombre}» en ${etiqueta} está ${limite}.`,
      accion: `Aplicar el protocolo de «${definicion.nombre}», confirmar la lectura y avisar al CMO.`,
    };
  }

  if (nivel === 'ATENCION') {
    const rango =
      min !== null && max !== null
        ? `${numero(min)}–${numero(max)} ${definicion.unidad}`
        : 'el rango validado';

    return {
      razon: `«${definicion.nombre}» en ${etiqueta} está fuera de ${rango}.`,
      accion: `Repetir la medición de «${definicion.nombre}» y registrar la tendencia.`,
    };
  }

  if (min === null && max === null) {
    return {
      razon: `«${definicion.nombre}» en ${etiqueta}. Sin umbral clínico validado.`,
      accion: 'Valor solo informativo. No genera alarma hasta validar el umbral.',
    };
  }

  return {
    razon: `«${definicion.nombre}» en ${etiqueta} dentro del rango de referencia.`,
    accion: 'Sin acción. Continúa el monitoreo.',
  };
}

export const evaluarDemo: EvaluadorFrame = (lectura, definicion, baseline) => {
  const rango = evaluarRango(definicion, lectura.valor);
  let nivel = rango.nivel;
  let degradado = baseline === null;

  if (lectura.calidad < 0.5) {
    if (nivel === 'CRITICO') {
      nivel = 'ATENCION';
    }
    degradado = true;
  }

  const texto = redactar(definicion, lectura.valor, nivel);

  const evaluacion: Evaluacion = {
    nivel,
    razon:
      lectura.calidad < 0.5
        ? `${texto.razon} Señal de baja calidad (${numero(lectura.calidad * 100)} %): confirmar con otra toma.`
        : texto.razon,
    accion: texto.accion,
    fuente: definicion.fuenteUmbral,
    reglaDisparada: rango.regla,
    valor: lectura.valor,
    baseline,
    desviacion: desviacionDemo(definicion, lectura.valor, baseline),
    degradado,
  };

  return evaluacion;
};

export function crearEvaluadorDemo(): EvaluadorFrame {
  return evaluarDemo;
}

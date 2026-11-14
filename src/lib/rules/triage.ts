import {
  calcularBaselinePersonal,
  obtenerIndicadorOSDR,
} from "@/lib/osdr/client";
import { obtenerUmbralesIndicador } from "@/lib/rules/thresholds";
import type { CrewId, NivelTriage, ResultadoTriage } from "@/types";

/**
 * Motor determinista puro de evaluación fisiológica (TECH-STACK.md §3.1).
 * Sin red, sin efectos secundarios: compara el valor contra el rango de referencia
 * de NASA OSDR OSD-575 y contra la línea base pre-vuelo personal (L-92, L-44, L-3).
 */
export function evaluarLecturaDeterminista(params: {
  crewId: CrewId;
  indicadorId: string;
  valor: number;
}): ResultadoTriage {
  const { crewId, indicadorId, valor } = params;
  const ind = obtenerIndicadorOSDR(indicadorId);
  const baseline = calcularBaselinePersonal(crewId, indicadorId);
  const umbrales = obtenerUmbralesIndicador(indicadorId);

  const nombreIndicador = ind?.nombre ?? indicadorId;
  const unidad = ind?.unidad ?? "";
  const mediaBase = baseline.mediaPreVuelo || valor;
  const desviacionPct =
    mediaBase !== 0
      ? Number((((valor - mediaBase) / mediaBase) * 100).toFixed(1))
      : 0;

  let nivel: NivelTriage = "NOMINAL";
  let razonDeterminista = `Valor dentro del rango de referencia (${umbrales.min ?? "–"} a ${umbrales.max ?? "–"} ${unidad}) y consistente con tu media pre-vuelo (${baseline.mediaPreVuelo} ${unidad}).`;
  let pasosRecomendados: string[] = [
    "Mantener rutina programada de hidratación y contramedidas ARED.",
    "Registrar la lectura en la bitácora local para seguimiento longitudinal.",
  ];

  const fueraCriticoBajo =
    umbrales.criticoMin !== null && valor <= umbrales.criticoMin;
  const fueraCriticoAlto =
    umbrales.criticoMax !== null && valor >= umbrales.criticoMax;
  const fueraRefBajo = umbrales.min !== null && valor < umbrales.min;
  const fueraRefAlto = umbrales.max !== null && valor > umbrales.max;
  const desvioPersonalFuerte = Math.abs(desviacionPct) >= 18;

  if (fueraCriticoBajo || fueraCriticoAlto) {
    nivel = "CRITICO";
    razonDeterminista = `${valor} ${unidad} rebasa el umbral crítico de seguridad (${umbrales.min}–${umbrales.max} ${unidad}) con una desviación de ${desviacionPct > 0 ? "+" : ""}${desviacionPct}% respecto a tu línea base pre-vuelo (${baseline.mediaPreVuelo} ${unidad}).`;
    pasosRecomendados = [
      "Notificar de inmediato al Oficial Médico de Tripulación (CMO) a bordo.",
      "Verificar síntomas agudos (mareo, dolor torácico, alteración visual o confusión) y activar protocolo de emergencia si están presentes.",
      "Descartar error de llenado capilar en microgravedad repitiendo la muestra en un cartucho nuevo.",
    ];
  } else if (fueraRefBajo || fueraRefAlto || desvioPersonalFuerte) {
    nivel = "ATENCION";
    if (fueraRefAlto) {
      razonDeterminista = `${valor} ${unidad} supera el límite superior del rango de referencia de OSD-575 (${umbrales.max} ${unidad}) y se desvía ${desviacionPct > 0 ? "+" : ""}${desviacionPct}% respecto a tu media pre-vuelo (${baseline.mediaPreVuelo} ${unidad}).`;
    } else if (fueraRefBajo) {
      razonDeterminista = `${valor} ${unidad} está por debajo del límite inferior de referencia de OSD-575 (${umbrales.min} ${unidad}) y se desvía ${desviacionPct}% respecto a tu media pre-vuelo (${baseline.mediaPreVuelo} ${unidad}).`;
    } else {
      razonDeterminista = `${valor} ${unidad} permanece dentro del rango poblacional pero muestra una variación de ${desviacionPct > 0 ? "+" : ""}${desviacionPct}% frente a tu línea base personal (${baseline.mediaPreVuelo} ${unidad}).`;
    }
    pasosRecomendados = [
      "Iniciar hidratación oral (250 mL de agua) para descartar hemoconcentración por desplazamiento de fluidos en 0G.",
      "Programar una segunda medición capilar de control en 120 minutos.",
      "Empaquetar la lectura en la cola de sincronización diferida para el Flight Surgeon en Tierra.",
    ];
  }

  return {
    id: `TRG-${crewId}-${indicadorId.toUpperCase()}-${Date.now()}`,
    crewId,
    indicadorId,
    nombreIndicador,
    valor,
    unidad,
    nivel,
    baselinePersonal: baseline,
    rangoReferencia: { min: umbrales.min, max: umbrales.max },
    desviacionPorcentualVsBaseline: desviacionPct,
    razonDeterminista,
    pasosRecomendados,
    criterioEscalado:
      "Si aparece dolor torácico, síncope, disnea o pérdida visual aguda, pasar de inmediato a Modo Emergencia.",
    fuenteCitada: `${umbrales.fuente} · Línea base calculada sobre L-92, L-44 y L-3`,
    timestamp: new Date().toISOString(),
  };
}

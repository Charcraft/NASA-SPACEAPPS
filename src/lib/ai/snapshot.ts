import {
  baselinePreVuelo,
  listarIndicadoresOSDR,
  obtenerValorEnTimepoint,
} from '@/lib/osdr/client';
import { evaluar } from '@/lib/rules/triage';

import type { AIAssistantContextSnapshot, CrewId, Nivel } from '@/types';

/**
 * Construcción determinista del snapshot para el módulo opcional de IA (Back 2).
 *
 * Evalúa los 17 analitos OSDR de un tripulante en `R+1` con el triage puro y
 * devuelve los que están fuera de rango, junto con un resumen y pasos
 * deterministas (`fallbackDeterminista`). No depende de la IA: la IA es un
 * añadido opcional y este fallback garantiza que la UI siempre tiene algo.
 */

const TIMEPOINT = 'R+1';

function pasosPara(nivel: Nivel): string[] {
  if (nivel === 'CRITICO') {
    return [
      'Notificar al Oficial Médico de Tripulación (CMO) y activar el protocolo de emergencia.',
      'Verificar síntomas agudos y descartar error de medición.',
    ];
  }
  if (nivel === 'ATENCION') {
    return [
      'Repetir la medición de control y vigilar la evolución.',
      'Registrar la lectura en la cola de sincronización para el Flight Surgeon.',
    ];
  }
  return ['Mantener la rutina de monitoreo programada.'];
}

export function construirSnapshotOSDR(
  crewId: CrewId,
  modoOperacion: AIAssistantContextSnapshot['modoOperacion'],
  ambienteCabina?: AIAssistantContextSnapshot['ambienteCabina'],
): AIAssistantContextSnapshot {
  const parametrosFueraDeRango: AIAssistantContextSnapshot['parametrosFueraDeRango'] = [];

  for (const indicador of listarIndicadoresOSDR()) {
    const valor = obtenerValorEnTimepoint(crewId, indicador.id, TIMEPOINT);
    if (valor === null) continue;

    const baseline = baselinePreVuelo(crewId, indicador.id)?.media ?? null;
    const resultado = evaluar(indicador.id, valor, baseline);

    if (resultado.nivel === 'NOMINAL') continue;

    parametrosFueraDeRango.push({
      id: indicador.id,
      nombre: indicador.nombre,
      valorActual: valor,
      baselinePreVuelo: baseline,
      rangoReferencia: indicador.rangoReferencia,
      nivelDeterminista: resultado.nivel,
      reglaDisparada: resultado.reglaDisparada,
    });
  }

  const niveles = parametrosFueraDeRango.map((p) => p.nivelDeterminista);
  const nivelMaximo: Nivel = niveles.includes('CRITICO')
    ? 'CRITICO'
    : niveles.includes('ATENCION')
      ? 'ATENCION'
      : 'NOMINAL';

  return {
    crewId,
    modoOperacion,
    parametrosFueraDeRango,
    ambienteCabina: ambienteCabina ?? {
      radiacionMsv: null,
      co2MmHg: null,
      retardoTierraSegundos: 0,
    },
    fallbackDeterminista: {
      mensajeResumen:
        parametrosFueraDeRango.length === 0
          ? `Sin parámetros fuera de rango para ${crewId} en ${TIMEPOINT}.`
          : `${parametrosFueraDeRango.length} parámetro(s) fuera de rango. Nivel máximo: ${nivelMaximo}.`,
      pasosAccion: pasosPara(nivelMaximo),
    },
  };
}

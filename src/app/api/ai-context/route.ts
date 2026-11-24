import { NextResponse } from 'next/server';

import { construirSnapshotOSDR } from '@/lib/ai/snapshot';

import type { AIAssistantContextSnapshot, CrewId } from '@/types';

/**
 * Endpoint para el módulo opcional de IA (Back 2).
 *
 * Devuelve siempre un `AIAssistantContextSnapshot` con `fallbackDeterminista`
 * poblado, de modo que la UI funciona igual con la IA conectada o apagada.
 *
 * Params opcionales:
 * - `crewId` (C001–C004, por defecto C001)
 * - `modo` (`rutina` | `emergencia`, por defecto rutina)
 * - `radiacionMsv`, `co2MmHg`, `retardoTierraSegundos` (ambiente de cabina)
 */

function esCrewId(valor: string | null): valor is CrewId {
  return valor === 'C001' || valor === 'C002' || valor === 'C003' || valor === 'C004';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const crewId: CrewId = esCrewId(searchParams.get('crewId'))
    ? (searchParams.get('crewId') as CrewId)
    : 'C001';

  const modoOperacion: AIAssistantContextSnapshot['modoOperacion'] =
    searchParams.get('modo') === 'emergencia' ? 'emergencia' : 'rutina';

  const radiacion = searchParams.get('radiacionMsv');
  const co2 = searchParams.get('co2MmHg');
  const retardo = searchParams.get('retardoTierraSegundos');

  const snapshot = construirSnapshotOSDR(crewId, modoOperacion, {
    radiacionMsv: radiacion !== null ? Number(radiacion) : null,
    co2MmHg: co2 !== null ? Number(co2) : null,
    retardoTierraSegundos: retardo !== null ? Number(retardo) : 0,
  });

  return NextResponse.json(snapshot);
}

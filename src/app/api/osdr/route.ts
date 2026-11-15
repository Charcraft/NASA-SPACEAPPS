import { NextResponse } from 'next/server';

import {
  listarIndicadoresOSDR,
  listarValoresFueraDeRango,
  obtenerDatasetOSDR,
} from '@/lib/osdr/client';

/**
 * Endpoint híbrido Offline-First para NASA OSDR (OSD-575).
 *
 * 1. Sirve el seed local en < 1 ms (sin red).
 * 2. Con `?verifyRemote=1`, intenta verificar contra la API oficial de NASA
 *    OSDR con timeout de 2.5 s; si no responde, sigue sirviendo el seed local.
 * 3. Con `?fueraDeRango=1`, incluye la lista completa de lecturas fuera del
 *    rango de referencia oficial (24 de 475 en el dataset completo).
 */

const NASA_API_URL =
  'https://visualization.osdr.nasa.gov/biodata/api/v2/dataset/OSD-575/?format=json';
const TIMEOUT_MS = 2500;

type EstadoRemoto = 'offline-seed' | 'online-verificado';

async function verificarRemoto(): Promise<EstadoRemoto> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(NASA_API_URL, { signal: controller.signal, cache: 'no-store' });
    return res.ok ? 'online-verificado' : 'offline-seed';
  } catch {
    return 'offline-seed';
  } finally {
    clearTimeout(timer);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verifyRemote = searchParams.get('verifyRemote') === '1';
  const detalle = searchParams.get('fueraDeRango') === '1';

  const dataset = obtenerDatasetOSDR();
  const indicadores = listarIndicadoresOSDR();
  const fueraDeRango = listarValoresFueraDeRango();

  const estado: EstadoRemoto = verifyRemote ? await verificarRemoto() : 'offline-seed';

  return NextResponse.json({
    estado,
    meta: dataset.meta,
    totalAnalitos: indicadores.length,
    totalFueraDeRango: fueraDeRango.length,
    timepoints: dataset.timepoints,
    ...(detalle ? { fueraDeRango } : {}),
  });
}

import { NextResponse } from 'next/server';

import {
  listarProtocolos,
  obtenerProtocolo,
  protocoloPara,
} from '@/lib/knowledge/client';

import type { Protocolo } from '@/lib/knowledge/client';

/**
 * Endpoint local de protocolos médicos (Back 2).
 *
 * Responde siempre con JSON local (< 50 ms, sin red), igual que `api/osdr`.
 * El service worker de Back 1 lo cachea con network-first.
 *
 * Params opcionales:
 * - `id`: un solo protocolo.
 * - `parametroId`: protocolos que dispara ese parámetro.
 * - `nivel` (`ATENCION` | `CRITICO`): filtra por severidad.
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const parametroId = searchParams.get('parametroId');
  const nivel = searchParams.get('nivel');

  let protocolos: Protocolo[];

  if (id !== null) {
    const protocolo = obtenerProtocolo(id);
    protocolos = protocolo ? [protocolo] : [];
  } else if (parametroId !== null && (nivel === 'ATENCION' || nivel === 'CRITICO')) {
    const protocolo = protocoloPara(parametroId, nivel);
    protocolos = protocolo ? [protocolo] : [];
  } else if (parametroId !== null) {
    protocolos = listarProtocolos().filter((p) =>
      p.disparadores.some((d) => d.parametroId === parametroId),
    );
  } else {
    protocolos = listarProtocolos();
  }

  return NextResponse.json({
    estado: 'local',
    total: protocolos.length,
    protocolos,
  });
}

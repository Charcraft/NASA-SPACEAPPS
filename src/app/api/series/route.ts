import { NextResponse } from 'next/server';

import { listarSeries } from '@/lib/db/repositories';

/**
 * Endpoint de solo lectura para gráficas (Back 2).
 *
 * `GET /api/series?crewId=C001&parametroId=heart_rate&resolucion=1h&desde=&hasta=`
 * Lee la tabla `series` (agregados media/min/max), no el crudo `mediciones`.
 * Contrato: `docs/03-plan/15-graficas-backend.md`.
 */

const CREWS = ['C001', 'C002', 'C003', 'C004'] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crewId = searchParams.get('crewId');
  const parametroId = searchParams.get('parametroId');
  const resolucion = searchParams.get('resolucion');
  const desde = searchParams.get('desde');
  const hasta = searchParams.get('hasta');

  if (!crewId || !(CREWS as readonly string[]).includes(crewId)) {
    return NextResponse.json({ error: 'crewId inválido' }, { status: 400 });
  }

  const series = await listarSeries({
    crewId: crewId as (typeof CREWS)[number],
    parametroId: parametroId ?? undefined,
    resolucion: resolucion === '1min' || resolucion === '1h' ? resolucion : '1h',
    desde: desde !== null ? Number(desde) : undefined,
    hasta: hasta !== null ? Number(hasta) : undefined,
  });

  return NextResponse.json({ crewId, total: series.length, series });
}

import { NextResponse } from 'next/server';

import { z } from 'zod';

import { guardarMedicion } from '@/lib/db/repositories';
import { sexoDe } from '@/lib/knowledge/tripulacion';
import { baselinePreVuelo } from '@/lib/osdr/client';
import { getOrThrow } from '@/lib/realtime/registry';
import { evaluar } from '@/lib/rules/triage';

/**
 * Entrada manual de una medición (Back 2).
 *
 * `POST /api/mediciones` — un astronauta registra un valor a mano (o corrige
 * una lectura). Valida con Zod, evalúa el nivel con el triage determinista y
 * persiste vía `repositories` (único punto de escritura). Sin red.
 */

const EsquemaMedicion = z.object({
  crewId: z.enum(['C001', 'C002', 'C003', 'C004']),
  parametroId: z.string().min(1),
  valor: z.number().finite(),
  unidad: z.string().optional(),
  timestamp: z.number().int().nonnegative().optional(),
});

export async function POST(request: Request) {
  let cuerpo: unknown;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo JSON inválido' }, { status: 400 });
  }

  const parseado = EsquemaMedicion.safeParse(cuerpo);
  if (!parseado.success) {
    return NextResponse.json(
      { error: 'Entrada inválida', detalle: parseado.error.flatten() },
      { status: 400 },
    );
  }

  const { crewId, parametroId, valor, unidad, timestamp } = parseado.data;

  let definicion;
  try {
    definicion = getOrThrow(parametroId);
  } catch {
    return NextResponse.json({ error: 'Parámetro no registrado' }, { status: 400 });
  }

  const baseline = baselinePreVuelo(crewId, parametroId)?.media ?? null;
  const resultado = evaluar(parametroId, valor, baseline, undefined, undefined, sexoDe(crewId));

  const guardado = await guardarMedicion({
    crewId,
    parametroId,
    valor,
    unidad: unidad ?? definicion.unidadCanonica,
    nivel: resultado.nivel,
    timestamp,
  });

  if (!guardado.ok) {
    return NextResponse.json(
      { error: guardado.motivo ?? 'No se pudo guardar la medición' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    medicion: {
      crewId,
      parametroId,
      valor,
      nivel: resultado.nivel,
      regla: resultado.reglaDisparada,
      fuente: resultado.fuente,
      degradado: resultado.degradado,
    },
  });
}

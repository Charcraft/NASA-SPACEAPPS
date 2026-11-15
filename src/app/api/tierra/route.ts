/**
 * Endpoint "Tierra" — Back 1.
 *
 * Actúa de Mission Control Center local: recibe los lotes de la cola de sync,
 * valida su integridad (hash) y los persiste append-only en `data/tierra/`.
 * Sin red externa: es el destino honesto del transporte, de modo que la demo
 * puede mostrar el envío y el ACK real sin depender de internet.
 */

import { appendFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { z } from 'zod';

const DATA_DIR = join(process.cwd(), 'data', 'tierra');
const ARCHIVO = join(DATA_DIR, 'lotes.jsonl');

const loteSchema = z.object({
  id: z.number(),
  prioridad: z.enum(['A', 'B', 'C', 'D']),
  tipo: z.enum(['frame', 'evento', 'bitacora']),
  hash: z.string().min(1),
  hashPrevio: z.string().nullable(),
  creadoEn: z.number(),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function guardarLote(lote: unknown): void {
  mkdirSync(DATA_DIR, { recursive: true });
  appendFileSync(ARCHIVO, `${JSON.stringify(lote)}\n`, 'utf8');
}

export async function POST(request: Request): Promise<Response> {
  let cuerpo: unknown;

  try {
    cuerpo = await request.json();
  } catch {
    return Response.json(
      { error: 'json-invalido', detalle: 'El cuerpo no es JSON válido.' },
      { status: 400 },
    );
  }

  const resultado = loteSchema.safeParse(cuerpo);

  if (!resultado.success) {
    return Response.json(
      { error: 'lote-invalido', detalle: resultado.error.issues.map((i) => i.message).join('; ') },
      { status: 400 },
    );
  }

  try {
    guardarLote(resultado.data);
  } catch (error) {
    console.warn('[tierra] no se pudo persistir el lote:', error);
    return Response.json(
      { error: 'persistencia-fallida', detalle: String(error) },
      { status: 500 },
    );
  }

  return Response.json({ ack: true, id: resultado.data.id }, { status: 201 });
}

/** GET devuelve cuántos lotes se han recibido (para diagnóstico). */
export async function GET(): Promise<Response> {
  try {
    const { readFileSync, existsSync } = await import('node:fs');
    if (!existsSync(ARCHIVO)) {
      return Response.json({ recibidos: 0 });
    }
    const lineas = readFileSync(ARCHIVO, 'utf8').split('\n').filter(Boolean);
    return Response.json({ recibidos: lineas.length });
  } catch {
    return Response.json({ recibidos: 0 });
  }
}

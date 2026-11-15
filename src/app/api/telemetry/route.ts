/**
 * API de telemetría — Back 1.
 *
 * POST: una estación publica el frame de su tripulante.
 * GET : SSE con snapshot, alertas, resoluciones y latido de la sala.
 *
 * El hub vive en memoria del proceso. No sustituye a la cola durable de Back 2.
 */

import { z } from 'zod';

import type { EventoSala, RealtimeTelemetryFrame } from '@/types';

import { latido, publicarFrame, snapshot, suscribir } from '@/lib/realtime/crew-hub';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MESH_NODES = [
  'head_neuro_ocular',
  'thorax_heart',
  'thorax_lungs',
  'abdomen_hepatic_renal',
  'limbs_musculoskeletal',
  'systemic_immune_radiation',
] as const;

const ANIMACIONES = [
  'anim_none',
  'anim_capillary_analyzer',
  'anim_bp_cuff',
  'anim_pulse_oximeter',
  'anim_ocular_fundoscope',
  'anim_cpr_cmrs_restraint',
  'anim_pba_oxygen_mask',
] as const;

const lecturaSchema = z.object({
  valor: z.number(),
  unidad: z.string().min(1),
  baselinePersonal: z.number().nullable(),
  desviacion: z.object({
    tipo: z.enum(['z-score', 'delta-absoluto']),
    valor: z.number(),
  }),
  nivel: z.enum(['NOMINAL', 'ATENCION', 'CRITICO']),
  meshNodeId: z.enum(MESH_NODES).nullable(),
  toolAnimationId: z.enum(ANIMACIONES),
  calidad: z.number().min(0).max(1),
  razon: z.string().min(1),
  accion: z.string().min(1),
  reglaDisparada: z.string().min(1),
  fuente: z.string().min(1),
});

const nodoSchema = z.object({
  nivelMaximo: z.enum(['NOMINAL', 'ATENCION', 'CRITICO']),
  parametroPrincipalId: z.string().min(1),
  animacionActiva: z.enum(ANIMACIONES).nullable(),
});

const frameSchema = z.object({
  timestamp: z.number().int().nonnegative(),
  crewId: z.enum(['C001', 'C002', 'C003', 'C004']),
  metSegundos: z.number().nonnegative(),
  lecturas: z.record(z.string(), lecturaSchema),
  estadoNodos3D: z.record(z.string(), nodoSchema),
});

const CABECERAS_SSE = {
  'Content-Type': 'text/event-stream; charset=utf-8',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
} as const;

export async function POST(request: Request): Promise<Response> {
  let cuerpo: unknown;

  try {
    cuerpo = await request.json();
  } catch {
    return Response.json(
      { error: 'json-invalido', detalle: 'El cuerpo de la petición no es JSON válido.' },
      { status: 400 },
    );
  }

  const resultado = frameSchema.safeParse(cuerpo);

  if (!resultado.success) {
    const detalle = resultado.error.issues
      .slice(0, 5)
      .map((problema) => `${problema.path.join('.') || '(raíz)'}: ${problema.message}`)
      .join('; ');

    return Response.json(
      { error: 'frame-invalido', detalle: `Respuesta inválida en /api/telemetry: ${detalle}` },
      { status: 400 },
    );
  }

  const alertas = publicarFrame(resultado.data as RealtimeTelemetryFrame);

  return Response.json({ aceptado: true, alertas: alertas.length }, { status: 202 });
}

export async function GET(request: Request): Promise<Response> {
  const codificador = new TextEncoder();

  let cerrar: (() => void) | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controlador) {
      let activo = true;
      let baja: (() => void) | null = null;
      let temporizador: ReturnType<typeof setInterval> | null = null;

      const enviar = (evento: EventoSala): void => {
        if (!activo) {
          return;
        }

        try {
          controlador.enqueue(codificador.encode(`data: ${JSON.stringify(evento)}\n\n`));
        } catch {
          activo = false;
        }
      };

      const terminar = (): void => {
        if (!activo) {
          return;
        }

        activo = false;

        if (temporizador !== null) {
          clearInterval(temporizador);
        }

        baja?.();

        try {
          controlador.close();
        } catch {
          // El cliente ya cerró la conexión.
        }
      };

      controlador.enqueue(codificador.encode('retry: 3000\n\n'));
      enviar({ tipo: 'snapshot', timestamp: Date.now(), tripulantes: snapshot() });

      baja = suscribir(enviar);

      temporizador = setInterval(() => {
        enviar({ tipo: 'latido', timestamp: Date.now(), tripulantes: latido() });
      }, 5_000);

      cerrar = terminar;

      if (request.signal.aborted) {
        terminar();
      } else {
        request.signal.addEventListener('abort', terminar, { once: true });
      }
    },
    cancel() {
      cerrar?.();
    },
  });

  return new Response(stream, { headers: CABECERAS_SSE });
}

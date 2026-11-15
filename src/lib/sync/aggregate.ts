/**
 * Agregación temporal — Back 1.
 *
 * Convierte frames a 1 Hz en series de 1 min y 1 h para reducir volumen
 * y preparar datos para la sincronización hacia Tierra.
 *
 * No escribe en Dexie: devuelve objetos listos para `repositories.ts`.
 */

import type { CrewId, RealtimeTelemetryFrame, LecturaFrame } from '@/types';

import { db } from '@/lib/db/dexie';
import type { SerieAgregada } from '@/lib/db/types';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

const MS_POR_MINUTO = 60_000;
const MS_POR_HORA = 3_600_000;

type Resolucion = '1min' | '1h';

function inicioDeVentana(ts: number, resolucion: Resolucion): number {
  const base = resolucion === '1min' ? MS_POR_MINUTO : MS_POR_HORA;
  return Math.floor(ts / base) * base;
}

function finDeVentana(ts: number, resolucion: Resolucion): number {
  return inicioDeVentana(ts, resolucion) + (resolucion === '1min' ? MS_POR_MINUTO : MS_POR_HORA);
}

// ---------------------------------------------------------------------------
// Tipos internos
// ---------------------------------------------------------------------------

interface AcumuladorParametro {
  valores: number[];
  calidades: number[];
  unidad: string;
  meshNodeId: string | null;
  toolAnimationId: string;
}

// ---------------------------------------------------------------------------
// API pública
// ---------------------------------------------------------------------------

/**
 * Procesa un frame y actualiza las agregaciones de 1 min y 1 h.
 * Devuelve las series nuevas o actualizadas para persistir.
 */
export async function agregarFrame(
  frame: RealtimeTelemetryFrame,
): Promise<SerieAgregada[]> {
  const resultados: SerieAgregada[] = [];

  for (const [parametroId, lectura] of Object.entries(frame.lecturas)) {
    // Agregar a 1 min
    const serie1min = await _agregarALectura(
      frame.crewId,
      parametroId,
      lectura,
      frame.timestamp,
      '1min',
    );
    if (serie1min) resultados.push(serie1min);

    // Agregar a 1 h
    const serie1h = await _agregarALectura(
      frame.crewId,
      parametroId,
      lectura,
      frame.timestamp,
      '1h',
    );
    if (serie1h) resultados.push(serie1h);
  }

  return resultados;
}

/**
 * Calcula agregaciones retroactivas sobre una ventana de tiempo (útil al
 * reconectar o al importar histórico).
 */
export async function agregarVentana(
  crewId: CrewId,
  desde: number,
  hasta: number,
): Promise<SerieAgregada[]> {
  const frames = await db.mediciones
    .where('crewId')
    .equals(crewId)
    .and((m) => m.timestamp >= desde && m.timestamp <= hasta)
    .toArray();

  if (frames.length === 0) return [];

  // Agrupar por parámetro y ventana
  const mapa = new Map<string, AcumuladorParametro>();

  for (const m of frames) {
    const clave1min = `${m.parametroId}|1min|${inicioDeVentana(m.timestamp, '1min')}`;
    const clave1h = `${m.parametroId}|1h|${inicioDeVentana(m.timestamp, '1h')}`;

    for (const clave of [clave1min, clave1h]) {
      const [pid, resolucion, inicioStr] = clave.split('|');
      const inicio = Number(inicioStr);
      const acc = mapa.get(clave) ?? {
        valores: [],
        calidades: [],
        unidad: m.unidad,
        meshNodeId: null,
        toolAnimationId: 'anim_none',
      };
      acc.valores.push(m.valor);
      // calidad no se guarda en mediciones; asumimos 1 para histórico
      acc.calidades.push(1);
      mapa.set(clave, acc);
    }
  }

  const resultados: SerieAgregada[] = [];
  for (const [clave, acc] of mapa) {
    const partes = clave.split('|');
    if (partes.length < 3) continue;
    const [parametroId, resolucionStr, inicioStr] = partes;
    const resolucion: Resolucion = resolucionStr === '1min' || resolucionStr === '1h' ? resolucionStr : '1min';
    // type guard: assure string after length check
    const pid: string = parametroId!;
    const inicio = Number(inicioStr);
    if (Number.isNaN(inicio)) continue;
    const fin = finDeVentana(inicio, resolucion);
    const n = acc.valores.length;
    if (n === 0) continue;

    const media = acc.valores.reduce((a, b) => a + b, 0) / n;
    const min = Math.min(...acc.valores);
    const max = Math.max(...acc.valores);
    const calidadMedia = acc.calidades.reduce((a, b) => a + b, 0) / n;

    resultados.push({
      crewId,
      parametroId: pid!,
      resolucion,
      inicio,
      fin,
      min,
      max,
      media,
      n,
    });
  }

  return resultados;
}

// ---------------------------------------------------------------------------
// Internos
// ---------------------------------------------------------------------------

async function _agregarALectura(
  crewId: CrewId,
  parametroId: string,
  lectura: LecturaFrame,
  timestamp: number,
  resolucion: Resolucion,
): Promise<SerieAgregada | null> {
  const inicio = inicioDeVentana(timestamp, resolucion);
  const fin = finDeVentana(timestamp, resolucion);

  // Buscar serie existente en esta ventana
  const existente = await db.series
    .where('[crewId+parametroId+resolucion+inicio]')
    .equals([crewId, parametroId, resolucion, inicio])
    .first();

  const nNuevo = (existente?.n ?? 0) + 1;
  const mediaNueva =
    ((existente?.media ?? 0) * (existente?.n ?? 0) + lectura.valor) / nNuevo;
  const minNuevo = Math.min(existente?.min ?? lectura.valor, lectura.valor);
  const maxNuevo = Math.max(existente?.max ?? lectura.valor, lectura.valor);

  const calidadMediaNueva =
    ((existente?.media ?? 0) * (existente?.n ?? 0) + lectura.calidad) / nNuevo; // reusa media para calidad (aprox)

  const serie: SerieAgregada = {
    id: existente?.id,
    crewId,
    parametroId,
    resolucion,
    inicio,
    fin,
    min: minNuevo,
    max: maxNuevo,
    media: mediaNueva,
    n: nNuevo,
  };

  return serie;
}

/**
 * Persiste las series agregadas (upsert).
 * Se llama desde el sink después de `agregarFrame`.
 */
export async function persistirSeries(series: SerieAgregada[]): Promise<number> {
  if (series.length === 0) return 0;

  let guardadas = 0;
  await db.transaction('rw', db.series, async () => {
    for (const s of series) {
      if (s.id !== undefined) {
        await db.series.update(s.id, s);
      } else {
        await db.series.add(s);
      }
      guardadas++;
    }
  });
  return guardadas;
}

/** Poda series antiguas (por defecto > 30 días). */
export async function podarSeries(dias = 30): Promise<number> {
  const corte = Date.now() - dias * 24 * MS_POR_HORA;
  const viejas = await db.series.where('inicio').below(corte).toArray();
  await db.series.bulkDelete(viejas.map((s) => s.id as number));
  return viejas.length;
}
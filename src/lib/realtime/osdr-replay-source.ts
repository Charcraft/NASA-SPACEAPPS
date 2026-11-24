/**
 * Fuente de replay OSDR — Back 1.
 *
 * Reproduce la serie real de OSDR OSD-575 (R+1 → R+194) comprimida en ~60 s.
 * Implementa `SensorSource` para que el `StreamEngine` la consuma igual que
 * el simulador. Etiquetado como "replay histórico" en la UI.
 */

import type { SensorSource } from './stream-engine';
import type { LecturaEvaluable, CrewId } from '@/types';
import { list, get } from './registry';

import osdrRaw from '@/data/seed/osdr-inspiration4-cmp.json';

// ---------------------------------------------------------------------------
// Tipos del dataset (mismos que osdr/client.ts)
// ---------------------------------------------------------------------------

type TimepointId =
  | 'L-92'
  | 'L-44'
  | 'L-3'
  | 'R+1'
  | 'R+45'
  | 'R+82'
  | 'R+194';

interface PuntoSerieOSDR {
  timepoint: TimepointId;
  valor: number | null;
}

interface IndicadorOSDR {
  id: string;
  nombre: string;
  sistema: string;
  unidad: string;
  rangoReferencia: { min: number | null; max: number | null };
  fuente: string;
  serie: Record<CrewId, PuntoSerieOSDR[]>;
}

interface DatasetOSDR {
  meta: {
    tripulantes: CrewId[];
    puntosTemporales: number;
  };
  timepoints: {
    id: TimepointId;
    diasRelativosAlLanzamiento: number;
    fase: 'pre-vuelo' | 'post-vuelo';
  }[];
  indicadores: IndicadorOSDR[];
}

const dataset = osdrRaw as unknown as DatasetOSDR;

// Solo timepoints post-vuelo para el replay
const TIMEPOINTS_POST_VUELO: readonly TimepointId[] = ['R+1', 'R+45', 'R+82', 'R+194'];
const DIAS_POR_TIMEPOINT = [1, 45, 82, 194]; // días relativos al lanzamiento

// ---------------------------------------------------------------------------
// Configuración del replay
// ---------------------------------------------------------------------------

export interface OpcionesReplayOSDR {
  /** Tripulante a reproducir. */
  crewId: CrewId;
  /** Duración total del replay en ms (por defecto 60 000 = 60 s). */
  duracionTotalMs?: number;
  /** Si true, emite solo parámetros OSDR (17). Si false, incluye simulados. */
  soloOSDR?: boolean;
  /** Reloj inyectable (para tests). */
  ahora?: () => number;
  /** Callback al cambiar de timepoint (para UI). */
  onCambioTimepoint?: (timepoint: TimepointId, dia: number) => void;
}

// ---------------------------------------------------------------------------
// Implementación
// ---------------------------------------------------------------------------

export class OsdrReplaySource implements SensorSource {
  private readonly crewId: CrewId;
  private readonly duracionTotalMs: number;
  private readonly soloOSDR: boolean;
  private readonly ahora: () => number;
  private readonly onCambioTimepoint?: (tp: TimepointId, dia: number) => void;

  private readonly indicadores: IndicadorOSDR[];
  private readonly valoresPorTimepoint: Map<TimepointId, Map<string, number>>;
  private timepointActualIdx = 0;
  private inicioReplay = 0;
  private ultimoTimepointEmitido: TimepointId | null = null;

  constructor(opciones: OpcionesReplayOSDR) {
    this.crewId = opciones.crewId;
    this.duracionTotalMs = opciones.duracionTotalMs ?? 60_000;
    this.soloOSDR = opciones.soloOSDR ?? true;
    this.ahora = opciones.ahora ?? Date.now;
    this.onCambioTimepoint = opciones.onCambioTimepoint;

    // Filtrar indicadores
    const todos = dataset.indicadores;
    this.indicadores = this.soloOSDR
      ? todos.filter((i) => i.id !== 'heart_rate' && !i.id.includes('bp') && i.id !== 'spo2' && i.id !== 'respiratory_rate' && i.id !== 'core_temperature' && i.id !== 'intracranial_pressure_est' && i.id !== 'cabin_co2' && i.id !== 'radiation_dose')
      : todos;

    // Pre-calcular valores por timepoint para acceso O(1)
    this.valoresPorTimepoint = new Map();
    for (const tp of TIMEPOINTS_POST_VUELO) {
      const mapa = new Map<string, number>();
      for (const ind of this.indicadores) {
        const serie = ind.serie[this.crewId];
        if (!serie) continue;
        const punto = serie.find((p) => p.timepoint === tp);
        if (punto && punto.valor !== null) {
          mapa.set(ind.id, punto.valor as number);
        }
      }
      this.valoresPorTimepoint.set(tp, mapa);
    }
  }

  /** Inicia el reloj del replay. */
  start(): void {
    this.inicioReplay = this.ahora();
    this.timepointActualIdx = 0;
  }

  /** Detiene el replay. */
  stop(): void {
    this.inicioReplay = 0;
  }

  /** Implementación de SensorSource. */
  leer(ahora: number): LecturaEvaluable[] {
    if (this.inicioReplay === 0) return [];

    const transcurrido = ahora - this.inicioReplay;
    if (transcurrido >= this.duracionTotalMs) {
      // Replay terminado: mantener último timepoint
      const ultimo = TIMEPOINTS_POST_VUELO.at(-1);
      if (!ultimo) return [];
      return this._leerTimepoint(ultimo, ahora);
    }

    // Calcular qué timepoint corresponde
    const proporcion = transcurrido / this.duracionTotalMs;
    const idx = Math.min(
      Math.floor(proporcion * TIMEPOINTS_POST_VUELO.length),
      TIMEPOINTS_POST_VUELO.length - 1,
    );

    const timepoint = idx >= 0 && idx < TIMEPOINTS_POST_VUELO.length
      ? TIMEPOINTS_POST_VUELO[idx] as TimepointId
      : null;

    // Notificar cambio de timepoint
    if (timepoint && this.onCambioTimepoint) {
      const dia = DIAS_POR_TIMEPOINT[idx] ?? 0;
      this.onCambioTimepoint(timepoint, dia);
      this.ultimoTimepointEmitido = timepoint;
    }

    return timepoint ? this._leerTimepoint(timepoint, ahora) : [];
  }

  private _leerTimepoint(timepoint: TimepointId, timestamp: number): LecturaEvaluable[] {
    const valores = this.valoresPorTimepoint.get(timepoint);
    if (!valores) return [];

    const lecturas: LecturaEvaluable[] = [];

    for (const [paramId, valor] of valores) {
      const def = get(paramId);
      if (!def) continue;

      lecturas.push({
        parametroId: paramId,
        valor,
        unidad: def.unidad,
        timestamp,
        calidad: 1, // datos de laboratorio = calidad máxima
        contexto: { actividad: 'replay-historico' },
      });
    }

    return lecturas;
  }

  /** Devuelve el timepoint actual para UI. */
  getTimepointActual(): TimepointId | null {
    if (this.inicioReplay === 0) return null;
    const transcurrido = this.ahora() - this.inicioReplay;
    if (transcurrido >= this.duracionTotalMs) {
      return TIMEPOINTS_POST_VUELO[TIMEPOINTS_POST_VUELO.length - 1] as TimepointId;
    }
    const idx = Math.min(
      Math.floor((transcurrido / this.duracionTotalMs) * TIMEPOINTS_POST_VUELO.length),
      TIMEPOINTS_POST_VUELO.length - 1,
    );
    return TIMEPOINTS_POST_VUELO[idx] as TimepointId;
  }

  /** Devuelve el día de misión actual. */
  getDiaMision(): number | null {
    const tp = this.getTimepointActual();
    if (!tp) return null;
    const idx = TIMEPOINTS_POST_VUELO.indexOf(tp);
    return DIAS_POR_TIMEPOINT[idx] ?? null;
  }

  /** Lista de indicadores que reproduce esta fuente. */
  getIndicadores(): string[] {
    return this.indicadores.map((i) => i.id);
  }
}

// ---------------------------------------------------------------------------
// Fábrica conveniente
// ---------------------------------------------------------------------------

export function crearReplayOSDR(
  crewId: CrewId,
  opciones: Partial<OpcionesReplayOSDR> = {},
): OsdrReplaySource {
  return new OsdrReplaySource({ crewId, ...opciones });
}
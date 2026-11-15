/**
 * Hub de la sala de tripulación — Back 1.
 *
 * Mantiene el último frame de cada tripulante y difunde las alertas al resto
 * por SSE. Persiste un snapshot del estado consolidado a disco (`data/central/`)
 * para que el central sobreviva a un reinicio; el histórico completo de cada
 * estación vive en su IndexedDB y la cola hacia Tierra es de Back 2.
 *
 * No importar desde componentes cliente: usa estado de módulo del servidor.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  AlertaTripulacion,
  CrewId,
  EstadoEnlace,
  EstadoTripulante,
  EventoSala,
  Nivel,
  RealtimeTelemetryFrame,
} from '@/types';

import { get } from './registry';

/** Sin frame durante 5 s → degradado; 15 s → sin enlace. */
const VENTANA_DEGRADADO_MS = 5_000;
const VENTANA_SIN_ENLACE_MS = 15_000;

/** Directorio y archivo del snapshot durable del central. */
const DATA_DIR = join(process.cwd(), 'data', 'central');
const SNAPSHOT_FILE = join(DATA_DIR, 'snapshot.json');

const ORDEN_NIVEL = { NOMINAL: 0, ATENCION: 1, CRITICO: 2 } as const satisfies Record<Nivel, number>;

interface RegistroTripulante {
  frame: RealtimeTelemetryFrame;
  recibidoEn: number;
  alertas: Map<string, AlertaTripulacion>;
}

const registro = new Map<CrewId, RegistroTripulante>();
const suscriptores = new Set<(evento: EventoSala) => void>();

// ---------------------------------------------------------------------------
// Persistencia del central (snapshot durable en disco)
// ---------------------------------------------------------------------------

type SnapshotEnDisco = Array<{
  crewId: CrewId;
  frame: RealtimeTelemetryFrame;
  recibidoEn: number;
}>;

function persistirSnapshot(): void {
  try {
    mkdirSync(DATA_DIR, { recursive: true });
    const data: SnapshotEnDisco = [...registro.entries()].map(([crewId, item]) => ({
      crewId,
      frame: item.frame,
      recibidoEn: item.recibidoEn,
    }));
    writeFileSync(SNAPSHOT_FILE, JSON.stringify(data));
  } catch (error) {
    // Un fallo de disco no puede tumbar la sala en vivo.
    console.warn('[crew-hub] no se pudo persistir el snapshot:', error);
  }
}

function restaurarSnapshot(): void {
  try {
    if (!existsSync(SNAPSHOT_FILE)) return;

    const data = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8')) as SnapshotEnDisco;
    for (const item of data) {
      publicarFrame(item.frame, item.recibidoEn);
    }
    console.log(`[crew-hub] snapshot restaurado: ${data.length} tripulante(s).`);
  } catch (error) {
    console.warn('[crew-hub] no se pudo restaurar el snapshot:', error);
  }
}

// Se restaura una sola vez al cargar el módulo (arranque del servidor).
restaurarSnapshot();

function emitir(evento: EventoSala): void {
  for (const suscriptor of suscriptores) {
    try {
      suscriptor(evento);
    } catch {
      // Un cliente desconectado no puede tumbar el hub.
    }
  }
}

function nivelMasGrave(a: Nivel, b: Nivel): Nivel {
  return ORDEN_NIVEL[a] >= ORDEN_NIVEL[b] ? a : b;
}

function estadoEnlace(recibidoEn: number, ahora: number): EstadoEnlace {
  const silencio = ahora - recibidoEn;

  if (silencio > VENTANA_SIN_ENLACE_MS) {
    return 'sin-enlace';
  }

  if (silencio > VENTANA_DEGRADADO_MS) {
    return 'degradado';
  }

  return 'conectado';
}

function nivelGlobal(alertas: Iterable<AlertaTripulacion>): Nivel {
  let nivel: Nivel = 'NOMINAL';

  for (const alerta of alertas) {
    nivel = nivelMasGrave(nivel, alerta.nivel);
  }

  return nivel;
}

/**
 * Publica el frame de un tripulante. Devuelve las alertas activas y emite por
 * SSE solo lo que cambió: alerta nueva, cambio de nivel o alerta resuelta.
 */
export function publicarFrame(
  frame: RealtimeTelemetryFrame,
  ahora: number = Date.now(),
): AlertaTripulacion[] {
  const anterior = registro.get(frame.crewId);
  const alertas = new Map<string, AlertaTripulacion>();

  for (const [parametroId, lectura] of Object.entries(frame.lecturas)) {
    if (lectura.nivel === 'NOMINAL') {
      continue;
    }

    const definicion = get(parametroId);
    const previa = anterior?.alertas.get(parametroId);

    const alerta: AlertaTripulacion = {
      id: `${frame.crewId}:${parametroId}`,
      crewId: frame.crewId,
      parametroId,
      nombreParametro: definicion?.nombre ?? parametroId,
      nivel: lectura.nivel,
      valor: lectura.valor,
      unidad: lectura.unidad,
      baseline: lectura.baselinePersonal,
      razon: lectura.razon,
      accion: lectura.accion,
      reglaDisparada: lectura.reglaDisparada,
      fuente: lectura.fuente,
      timestamp: previa?.timestamp ?? frame.timestamp,
    };

    alertas.set(parametroId, alerta);

    const esNueva = previa === undefined;
    const cambioNivel = previa !== undefined && previa.nivel !== alerta.nivel;

    if (esNueva || cambioNivel) {
      emitir({ tipo: 'alerta', timestamp: ahora, alerta });
    }
  }

  for (const parametroId of anterior?.alertas.keys() ?? []) {
    if (!alertas.has(parametroId)) {
      emitir({ tipo: 'resuelta', timestamp: ahora, crewId: frame.crewId, parametroId });
    }
  }

  registro.set(frame.crewId, { frame, recibidoEn: ahora, alertas });

  persistirSnapshot();

  return [...alertas.values()];
}

/** Estado completo para el `snapshot` inicial de una conexión SSE. */
export function snapshot(ahora: number = Date.now()): EstadoTripulante[] {
  return [...registro.entries()]
    .map(([crewId, item]) => {
      const alertas = [...item.alertas.values()].sort(
        (a, b) => ORDEN_NIVEL[b.nivel] - ORDEN_NIVEL[a.nivel] || a.timestamp - b.timestamp,
      );

      return {
        crewId,
        nivel: nivelGlobal(alertas),
        alertasActivas: alertas,
        ultimaActualizacion: item.recibidoEn,
        silencioSegundos: Math.max(0, Math.round((ahora - item.recibidoEn) / 1_000)),
        estadoEnlace: estadoEnlace(item.recibidoEn, ahora),
      } satisfies EstadoTripulante;
    })
    .sort((a, b) => a.crewId.localeCompare(b.crewId));
}

/** Resumen mínimo para el latido de 5 s. */
export function latido(
  ahora: number = Date.now(),
): Array<{ crewId: CrewId; nivel: Nivel; estadoEnlace: EstadoEnlace }> {
  return [...registro.entries()].map(([crewId, item]) => ({
    crewId,
    nivel: nivelGlobal(item.alertas.values()),
    estadoEnlace: estadoEnlace(item.recibidoEn, ahora),
  }));
}

export function suscribir(suscriptor: (evento: EventoSala) => void): () => void {
  suscriptores.add(suscriptor);
  return () => suscriptores.delete(suscriptor);
}

/** Solo para pruebas y diagnóstico. */
export function limpiarHub(): void {
  registro.clear();
  suscriptores.clear();
}

export function numeroDeSuscriptores(): number {
  return suscriptores.size;
}

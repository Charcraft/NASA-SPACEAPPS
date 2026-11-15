/**
 * Transporte de sincronización hacia Tierra — Back 1.
 *
 * Interfaz `SyncTransport` + implementación real (`HttpSyncTransport`) que
 * envía los lotes al endpoint local `/api/tierra` (que actúa de Mission
 * Control Center en la demo). Se puede registrar otra implementación con
 * `registrarSyncTransport` sin tocar la cola ni la agregación.
 */

import type { LoteSync, PrioridadSync } from './queue';

import { marcarSincronizadoPorFrame } from '@/lib/db/repositories';

import type { RealtimeTelemetryFrame } from '@/types';

// ---------------------------------------------------------------------------
// Contrato
// ---------------------------------------------------------------------------

/** Estado de red visible para la UI y el orquestador de flush. */
export type EstadoRed = 'online' | 'offline' | 'degradado';

export interface SyncTransport {
  /** Envía un lote y devuelve true si el ACK fue exitoso. */
  enviar(lote: LoteSync): Promise<boolean>;
  /** Indica si hay conectividad aparente. */
  estaConectado(): Promise<boolean>;
  /** Cierra conexiones pendientes. */
  cerrar(): Promise<void>;
  /** Estado actual de la red (síncrono, para la UI). */
  estadoRed(): EstadoRed;
  /** Suscribe a cambios de red. Devuelve función para desuscribir. */
  onCambioRed(listener: (estado: EstadoRed) => void): () => void;
}

// ---------------------------------------------------------------------------
// Transporte HTTP real (POST a /api/tierra)
// ---------------------------------------------------------------------------

class HttpSyncTransport implements SyncTransport {
  private estado: EstadoRed = 'online';
  private readonly endpoint: string;
  private readonly listeners = new Set<(estado: EstadoRed) => void>();

  constructor(endpoint = '/api/tierra') {
    this.endpoint = endpoint;
    if (typeof window !== 'undefined') {
      // El estado real lo marcan los eventos del navegador: al apagar WiFi se
      // dispara `offline`; al reconectar, `online`.
      window.addEventListener('online', () => this._setEstado('online'));
      window.addEventListener('offline', () => this._setEstado('offline'));
    }
  }

  private _setEstado(nuevo: EstadoRed): void {
    if (this.estado !== nuevo) {
      this.estado = nuevo;
      for (const l of this.listeners) l(nuevo);
    }
  }

  estadoRed(): EstadoRed {
    return this.estado;
  }

  onCambioRed(listener: (estado: EstadoRed) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async estaConectado(): Promise<boolean> {
    return this.estado !== 'offline';
  }

  async enviar(lote: LoteSync): Promise<boolean> {
    if (this.estado === 'offline') return false;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lote),
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async cerrar(): Promise<void> {
    // No hay conexión persistente que cerrar.
  }
}

// ---------------------------------------------------------------------------
// Fábrica y singleton
// ---------------------------------------------------------------------------

let _instancia: SyncTransport | null = null;

export function obtenerSyncTransport(): SyncTransport {
  if (!_instancia) {
    _instancia = new HttpSyncTransport();
  }
  return _instancia;
}

export function registrarSyncTransport(transporte: SyncTransport): void {
  _instancia = transporte;
}

// ---------------------------------------------------------------------------
// Orquestador de flush (llama cola → transporte → marca ACK/rechazo)
// ---------------------------------------------------------------------------

import { tomarSiguienteLote, marcarEnviado, marcarRechazado, statsCola } from './queue';

export interface ResultadoFlush {
  procesados: number;
  exitosos: number;
  fallidos: number;
  duracionMs: number;
}

/**
 * Intenta vaciar la cola hacia Tierra.
 * Se llama periódicamente o al detectar conectividad.
 */
export async function flushCola(transport?: SyncTransport): Promise<ResultadoFlush> {
  const tx = transport ?? obtenerSyncTransport();
  const inicio = Date.now();
  let procesados = 0;
  let exitosos = 0;
  let fallidos = 0;

  const conectado = await tx.estaConectado();
  if (!conectado) {
    return { procesados: 0, exitosos: 0, fallidos: 0, duracionMs: Date.now() - inicio };
  }

  // Procesar en lotes de máx 50 para no bloquear
  for (let i = 0; i < 50; i++) {
    const lote = await tomarSiguienteLote();
    if (!lote) break;

    procesados++;
    const ok = await tx.enviar(lote);
    if (ok) {
      await marcarEnviado(lote.id);
      exitosos++;
      // Reconcilia la marca de la cola con la de las mediciones: si el lote es
      // un frame, sus mediciones quedan `sincronizadoTierra = true`.
      if (lote.tipo === 'frame' && 'crewId' in lote.payload) {
        await marcarSincronizadoPorFrame(lote.payload.crewId, lote.payload.timestamp);
      }
    } else {
      await marcarRechazado(lote.id, 'Transporte falló o hash inválido');
      fallidos++;
      // Si falla uno, paramos para no saturar (reintentará en siguiente flush)
      break;
    }
  }

  return { procesados, exitosos, fallidos, duracionMs: Date.now() - inicio };
}

/** Inicia flush periódico (cada 10s si online) + flush inmediato al reconectar. */
export function iniciarFlushPeriodico(intervaloMs = 10_000): () => void {
  let timer: ReturnType<typeof setInterval> | null = null;
  const transport = obtenerSyncTransport();

  const tick = async () => {
    const conectado = await transport.estaConectado();
    if (conectado) {
      await flushCola(transport);
    }
  };

  timer = setInterval(tick, intervaloMs);
  tick(); // ejecución inmediata al arrancar

  // Al reconectar, drena la cola sin esperar al siguiente tick: así los datos
  // registrados offline se re-envían en cuanto vuelve la red.
  const desuscribir = transport.onCambioRed((estado) => {
    if (estado === 'online') {
      void tick();
    }
  });

  return () => {
    if (timer) clearInterval(timer);
    desuscribir();
  };
}

/** Stats combinadas de cola + red. */
export async function statsSync(): Promise<{
  cola: Awaited<ReturnType<typeof statsCola>>;
  red: EstadoRed;
}> {
  const transport = obtenerSyncTransport();
  return {
    cola: await statsCola(),
    red: transport.estadoRed(),
  };
}
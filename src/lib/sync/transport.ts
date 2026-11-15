/**
 * Transporte de sincronización hacia Tierra — Back 1.
 *
 * Interfaz `SyncTransport` + implementación stub local (`LocalSyncTransport`).
 * Cuando exista el nodo central, se implementa `HttpSyncTransport` sin tocar
 * la cola ni la agregación.
 */

import type { LoteSync, PrioridadSync } from './queue';

import type { RealtimeTelemetryFrame } from '@/types';

// ---------------------------------------------------------------------------
// Contrato
// ---------------------------------------------------------------------------

export interface SyncTransport {
  /** Envía un lote y devuelve true si el ACK fue exitoso. */
  enviar(lote: LoteSync): Promise<boolean>;
  /** Indica si hay conectividad aparente. */
  estaConectado(): Promise<boolean>;
  /** Cierra conexiones pendientes. */
  cerrar(): Promise<void>;
}

// ---------------------------------------------------------------------------
// Stub local (demo): simula latencia, fallos intermitentes y ACK
// ---------------------------------------------------------------------------

type EstadoRed = 'online' | 'offline' | 'degradado';

class LocalSyncTransport implements SyncTransport {
  private estado: EstadoRed = 'online';
  private readonly latenciaBaseMs = 150;
  private readonly probabilidadFallo = 0.05; // 5%
  private readonly listeners = new Set<(estado: EstadoRed) => void>();

  constructor() {
    if (typeof window !== 'undefined') {
      // Simular cambios de red cada 30-120s en demo
      setInterval(() => this._simularCambioRed(), 30_000 + Math.random() * 90_000);
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

  private _simularCambioRed(): void {
    const r = Math.random();
    if (r < 0.1) this._setEstado('offline');
    else if (r < 0.2) this._setEstado('degradado');
    else this._setEstado('online');
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

    // Simular latencia
    const latencia = this.latenciaBaseMs + Math.random() * 300;
    await new Promise((r) => setTimeout(r, latencia));

    // Simular fallo aleatorio
    if (Math.random() < this.probabilidadFallo) {
      return false;
    }

    // En stub local: validar hash encadenado
    const valido = this._validarHash(lote);
    if (!valido) {
      console.warn('[sync] Hash inválido en lote', lote.id);
      return false;
    }

    // ACK simulado
    return true;
  }

  private _validarHash(lote: LoteSync): boolean {
    // En implementación real, el servidor recalcula y compara
    return lote.hash.length > 0;
  }

  async cerrar(): Promise<void> {
    // No-op en stub
  }

  // Para pruebas: forzar estado
  __forzarEstado(estado: EstadoRed): void {
    this._setEstado(estado);
  }
}

// ---------------------------------------------------------------------------
// Fábrica y singleton
// ---------------------------------------------------------------------------

let _instancia: SyncTransport | null = null;

export function obtenerSyncTransport(): SyncTransport {
  if (!_instancia) {
    _instancia = new LocalSyncTransport();
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
    } else {
      await marcarRechazado(lote.id, 'Transporte falló o hash inválido');
      fallidos++;
      // Si falla uno, paramos para no saturar (reintentará en siguiente flush)
      break;
    }
  }

  return { procesados, exitosos, fallidos, duracionMs: Date.now() - inicio };
}

/** Inicia flush periódico (cada 10s si online). */
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
  tick(); // ejecución inmediata

  return () => {
    if (timer) clearInterval(timer);
  };
}

/** Stats combinadas de cola + red. */
export async function statsSync(): Promise<{
  cola: Awaited<ReturnType<typeof statsCola>>;
  red: EstadoRed;
}> {
  const transport = obtenerSyncTransport() as LocalSyncTransport;
  return {
    cola: await statsCola(),
    red: transport['estado'] ?? 'online',
  };
}
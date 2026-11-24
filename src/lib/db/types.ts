/**
 * Entidades de la capa de persistencia (Back 2).
 *
 * Viven aquí, y no en `types/index.ts`, porque son del dominio de Back 2
 * (IndexedDB / Dexie). `types/index.ts` es de Back 1 y está congelado.
 */

import type { CrewId, Nivel } from '@/types';

export interface RegistroMedicionLocal {
  id?: number;
  crewId: CrewId;
  parametroId: string;
  valor: number;
  unidad: string;
  nivel: Nivel;
  sincronizadoTierra: boolean;
  /** epoch ms, tomado en el origen. */
  timestamp: number;
  /** Corrección: apunta a la fila original. Nunca se borra un valor clínico. */
  amendsId?: number;
}

export interface SerieAgregada {
  id?: number;
  crewId: CrewId;
  parametroId: string;
  /** '1min' | '1h'. */
  resolucion: string;
  inicio: number;
  fin: number;
  min: number;
  max: number;
  media: number;
  n: number;
}

export interface Episodio {
  id?: number;
  crewId: CrewId;
  parametroId: string;
  inicio: number;
  fin: number | null;
  abierto: boolean;
  nivelMaximo: Nivel;
}

export interface BaselineCache {
  id?: number;
  crewId: CrewId;
  parametroId: string;
  epoca: string;
  media: number;
  desviacionEstandar: number;
  n: number;
}

export interface EventoEmergencia {
  id?: number;
  crewId: CrewId;
  timestamp: number;
  severidad: Nivel;
  protocoloId?: string;
  detalle: string;
  sincronizadoTierra: boolean;
}

export type PrioridadSync = 'A' | 'B' | 'C' | 'D';
export type EstadoSync = 'pendiente' | 'enviado' | 'rechazado';

export interface EntradaColaSync {
  id?: number;
  prioridad: PrioridadSync;
  tipo: 'frame' | 'evento' | 'bitacora';
  payloadId: number;
  /** Hash de integridad (demo). El encadenado verificable lo hace `sync/queue.ts`. */
  hash: string;
  estado: EstadoSync;
  creadoEn: number;
  intentos: number;
}

export interface RegistroBitacora {
  id?: number;
  timestamp: number;
  actor: string;
  tipo: 'medicion' | 'correccion' | 'alerta' | 'protocolo' | 'sistema';
  detalle: string;
}

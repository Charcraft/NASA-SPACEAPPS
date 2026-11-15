/**
 * Fuente de datos simulada — [DEMO] de Back 1.
 *
 * Sustituible por un adaptador BLE (Web Bluetooth), serie (Web Serial) o el bus
 * de la nave. El motor solo conoce la interfaz `SensorSource`.
 *
 * Los valores parten del baseline pre-vuelo cuando existe (parámetros OSDR) y
 * del centro del rango de referencia cuando no (signos vitales). Los tres
 * parámetros sin umbral (`cabin_co2`, `radiation_dose`,
 * `intracranial_pressure_est`) usan constantes de demo marcadas `[SUPUESTO]`.
 */

import type { CrewId, LecturaEvaluable, ParameterDefinition } from '@/types';

import { list, get } from '../registry';
import type { BaselineProvider, SensorSource } from '../stream-engine';

/** [SUPUESTO] Valores de arranque solo para la demo; no son umbrales clínicos. */
const ARRANQUE_SUPUESTO: Readonly<Record<string, number>> = {
  cabin_co2: 2.5,
  radiation_dose: 0.4,
  intracranial_pressure_est: 11,
};

export interface OpcionesFuenteDemo {
  crewId: CrewId;
  baseline: BaselineProvider;
  semilla?: number;
}

/** PRNG determinista: misma semilla → misma secuencia (reproducible en demo). */
function mulberry32(semilla: number): () => number {
  let estado = semilla >>> 0;

  return () => {
    estado = (estado + 0x6d2b79f5) >>> 0;
    let t = estado;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function centro(definicion: ParameterDefinition): number | null {
  const { min, max } = definicion.rangoReferencia;

  if (min !== null && max !== null) {
    return (min + max) / 2;
  }

  if (max !== null) {
    return max * 0.9;
  }

  if (min !== null) {
    return min * 1.1;
  }

  return null;
}

function amplitud(definicion: ParameterDefinition, base: number): number {
  const { min, max } = definicion.rangoReferencia;
  const porRango = min !== null && max !== null ? (max - min) * 0.015 : 0;
  return Math.max(porRango, Math.abs(base) * 0.008, 0.01);
}

function crearFuenteDemoInterna(opciones: OpcionesFuenteDemo): SensorSource {
  const { crewId, baseline } = opciones;
  const aleatorio = mulberry32(opciones.semilla ?? 20_261_114);

  const valores = new Map<string, number>();

  for (const definicion of list()) {
    const inicial =
      baseline(crewId, definicion.id) ??
      centro(definicion) ??
      ARRANQUE_SUPUESTO[definicion.id] ??
      0;

    valores.set(definicion.id, inicial);
  }

  return {
    leer(ahora: number): LecturaEvaluable[] {
      const lecturas: LecturaEvaluable[] = [];

      for (const definicion of list()) {
        const actual = valores.get(definicion.id) ?? 0;
        const paso = amplitud(definicion, actual);
        const factor = definicion.frecuencia === 'muestra-discreta' ? 0.2 : 1;
        let siguiente = actual + (aleatorio() - 0.5) * 2 * paso * factor;

        const { min, max } = definicion.rangoReferencia;

        if (min !== null && max !== null) {
          siguiente = Math.min(max + 2 * paso, Math.max(min - 2 * paso, siguiente));
        } else if (Math.abs(actual) > 0) {
          siguiente = Math.min(Math.abs(actual) * 1.1, Math.max(Math.abs(actual) * 0.9, siguiente));
        }

        // La dosis acumulada solo sube.
        if (definicion.id === 'radiation_dose') {
          siguiente = Math.max(actual, siguiente);
        }

        valores.set(definicion.id, siguiente);

        lecturas.push({
          parametroId: definicion.id,
          valor: Number(siguiente.toFixed(4)),
          unidad: definicion.unidad,
          timestamp: ahora,
          calidad: Number((0.94 + aleatorio() * 0.06).toFixed(3)),
        });
      }

      return lecturas;
    },
  };
}

/** Clase wrapper para uso en runtime (implementa SensorSource). */
export class SimulatedSource implements SensorSource {
  private readonly inner: SensorSource;

  constructor(opciones: OpcionesFuenteDemo) {
    this.inner = crearFuenteDemoInterna(opciones);
  }

  leer(ahora: number): LecturaEvaluable[] {
    return this.inner.leer(ahora);
  }

  start(): void {
    // Sin-op para fuente simulada
  }

  stop(): void {
    // Sin-op para fuente simulada
  }
}

/** Función factory retrocompatible. */
export function crearFuenteDemo(opciones: OpcionesFuenteDemo): SensorSource {
  return new SimulatedSource(opciones);
}

/** Comprueba que un ID exista antes de forzar una anomalía. */
export function existeParametro(parametroId: string): boolean {
  return get(parametroId) !== undefined;
}

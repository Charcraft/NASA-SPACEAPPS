import { describe, expect, it } from 'vitest';

import {
  esFuenteValidada,
  obtenerUmbrales,
  obtenerUmbralesOrThrow,
  validarUmbrales,
} from '@/lib/rules/thresholds';
import { list } from '@/lib/realtime/registry';

describe('rules/thresholds · resolución', () => {
  it('resuelve un umbral OSDR validado (glucosa) sin crítico inventado', () => {
    const u = obtenerUmbrales('glucose');

    expect(u).not.toBeNull();
    expect(u?.min).toBe(65);
    expect(u?.max).toBe(99);
    expect(u?.criticoMin).toBeNull();
    expect(u?.criticoMax).toBeNull();
    expect(u?.fuenteValidada).toBe(true);
  });

  it('marca como no validada una fuente [POR VALIDAR] (heart_rate)', () => {
    const u = obtenerUmbrales('heart_rate');

    expect(u?.min).toBe(50);
    expect(u?.max).toBe(90);
    expect(u?.criticoMin).toBe(40);
    expect(u?.criticoMax).toBe(110);
    expect(u?.fuenteValidada).toBe(false);
  });

  it('parámetro ambiental sin umbral clínico (cabin_co2) queda todo en null', () => {
    const u = obtenerUmbrales('cabin_co2');

    expect(u?.min).toBeNull();
    expect(u?.max).toBeNull();
    expect(u?.criticoMin).toBeNull();
    expect(u?.criticoMax).toBeNull();
    expect(u?.fuenteValidada).toBe(false);
  });

  it('devuelve null para un ID que no existe', () => {
    expect(obtenerUmbrales('no-existe')).toBeNull();
  });

  it('obtenerUmbralesOrThrow lanza para un ID que no existe', () => {
    expect(() => obtenerUmbralesOrThrow('no-existe')).toThrow(/no existe en el catálogo/);
  });
});

describe('rules/thresholds · integridad del catálogo', () => {
  it('ningún parámetro del catálogo queda sin umbrales resolubles', () => {
    for (const def of list()) {
      expect(obtenerUmbrales(def.id)).not.toBeNull();
    }
  });

  it('validarUmbrales no encuentra violaciones', () => {
    expect(validarUmbrales()).toEqual([]);
  });
});

describe('rules/thresholds · etiquetas de honestidad', () => {
  it('detecta [SUPUESTO] y [POR VALIDAR] como no validados', () => {
    expect(esFuenteValidada('[SUPUESTO] Pendiente de validación clínica')).toBe(false);
    expect(esFuenteValidada('docs/… §1 [POR VALIDAR]')).toBe(false);
    expect(esFuenteValidada('OSDR OSD-575 (rango de referencia incluido en el dataset)')).toBe(true);
  });
});

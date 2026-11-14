import { describe, expect, it } from 'vitest';

import {
  baselinePreVuelo,
  listarIndicadoresOSDR,
  obtenerIndicadorOSDR,
  obtenerValorEnTimepoint,
} from '@/lib/osdr/client';

import type { CrewId } from '@/types';

describe('osdr/client · catálogo', () => {
  it('expone los 17 indicadores reales de OSD-575', () => {
    expect(listarIndicadoresOSDR()).toHaveLength(17);
  });

  it('resuelve cualquier ID del catálogo en O(1)', () => {
    for (const ind of listarIndicadoresOSDR()) {
      expect(obtenerIndicadorOSDR(ind.id)?.id).toBe(ind.id);
    }
  });

  it('devuelve undefined para un ID desconocido', () => {
    expect(obtenerIndicadorOSDR('no-existe')).toBeUndefined();
  });

  it('glucosa conserva su rango de referencia del dataset', () => {
    expect(obtenerIndicadorOSDR('glucose')?.rangoReferencia).toEqual({
      min: 65,
      max: 99,
    });
  });
});

describe('osdr/client · baselinePreVuelo', () => {
  it('calcula la línea base pre-vuelo de C001 · albumin (L-92, L-44, L-3)', () => {
    const base = baselinePreVuelo('C001', 'albumin');

    expect(base).not.toBeNull();
    // 5.0, 5.0, 4.9 -> media 4.97, n 3
    expect(base?.media).toBeCloseTo(4.97, 2);
    expect(base?.n).toBe(3);
    expect(base?.min).toBe(4.9);
    expect(base?.max).toBe(5.0);
    expect(base?.desviacionEstandar).toBeCloseTo(0.05, 2);
  });

  it('devuelve null para un indicador que no existe', () => {
    expect(baselinePreVuelo('C001', 'no-existe')).toBeNull();
  });

  it('devuelve null para un tripulante que no existe', () => {
    expect(baselinePreVuelo('C999' as CrewId, 'albumin')).toBeNull();
  });

  it('cachea el resultado y devuelve la misma referencia', () => {
    const primera = baselinePreVuelo('C001', 'albumin');
    const segunda = baselinePreVuelo('C001', 'albumin');
    expect(primera).toBe(segunda);
  });
});

describe('osdr/client · obtenerValorEnTimepoint', () => {
  it('devuelve el valor de un timepoint dado', () => {
    expect(obtenerValorEnTimepoint('C001', 'albumin', 'R+1')).toBe(4.9);
    expect(obtenerValorEnTimepoint('C001', 'albumin', 'L-92')).toBe(5.0);
  });

  it('devuelve null si la celda no existe', () => {
    expect(obtenerValorEnTimepoint('C001', 'no-existe')).toBeNull();
  });
});

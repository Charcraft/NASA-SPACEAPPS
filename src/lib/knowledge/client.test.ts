import { describe, expect, it } from 'vitest';

import {
  listarProtocolos,
  obtenerProtocolo,
  protocoloPara,
} from '@/lib/knowledge/client';

describe('knowledge/client · catálogo', () => {
  it('expone al menos un protocolo por categoría (4)', () => {
    expect(listarProtocolos().length).toBeGreaterThanOrEqual(4);
  });

  it('cada protocolo tiene fuente, pasos y disparadores', () => {
    for (const p of listarProtocolos()) {
      expect(p.fuente.trim().length).toBeGreaterThan(0);
      expect(p.pasos.length).toBeGreaterThan(0);
      expect(p.disparadores.length).toBeGreaterThan(0);
      expect(p.pasos.map((paso) => paso.orden)).toEqual(
        p.pasos.map((_, i) => i + 1),
      );
    }
  });

  it('obtenerProtocolo resuelve por id', () => {
    expect(obtenerProtocolo('hipercapnia-cabina')?.nombre).toContain('CO₂');
    expect(obtenerProtocolo('no-existe')).toBeUndefined();
  });
});

describe('knowledge/client · protocoloPara', () => {
  it('resuelve la emergencia cardiorrespiratoria por heart_rate CRITICO', () => {
    const p = protocoloPara('heart_rate', 'CRITICO');
    expect(p?.id).toBe('emergencia-cardiorrespiratoria');
  });

  it('resuelve hipercapnia por cabin_co2 CRITICO', () => {
    expect(protocoloPara('cabin_co2', 'CRITICO')?.id).toBe('hipercapnia-cabina');
  });

  it('resuelve la alteración metabólica por glucose ATENCION', () => {
    expect(protocoloPara('glucose', 'ATENCION')?.id).toBe('alteracion-metabolica');
  });

  it('devuelve null para un nivel que no dispara protocolo', () => {
    expect(protocoloPara('heart_rate', 'NOMINAL')).toBeNull();
  });

  it('devuelve null para un parámetro sin protocolo', () => {
    expect(protocoloPara('albumin', 'ATENCION')).toBeNull();
  });
});

import { describe, expect, it } from 'vitest';

import { construirSnapshotOSDR } from '@/lib/ai/snapshot';

describe('ai/snapshot · construcción determinista', () => {
  it('devuelve vacío para C001 en R+1 (sin fuera de rango)', () => {
    const snapshot = construirSnapshotOSDR('C001', 'rutina');

    expect(snapshot.crewId).toBe('C001');
    expect(snapshot.modoOperacion).toBe('rutina');
    expect(snapshot.parametrosFueraDeRango).toHaveLength(0);
    expect(snapshot.fallbackDeterminista.mensajeResumen).toContain('Sin parámetros');
  });

  it('encuentra los 2 parámetros fuera de rango de C003 en R+1', () => {
    const snapshot = construirSnapshotOSDR('C003', 'rutina');

    expect(snapshot.parametrosFueraDeRango).toHaveLength(2);
    for (const p of snapshot.parametrosFueraDeRango) {
      expect(p.nivelDeterminista).toBe('ATENCION');
      expect(p.reglaDisparada).toMatch(/^ATENCION_/);
      expect(p.rangoReferencia).toBeDefined();
    }
    expect(snapshot.fallbackDeterminista.mensajeResumen).toContain('2 parámetro(s)');
  });

  it('detecta glucosa alta en C003 como ATENCION_ALTO', () => {
    const snapshot = construirSnapshotOSDR('C003', 'rutina');
    const glucosa = snapshot.parametrosFueraDeRango.find((p) => p.id === 'glucose');
    expect(glucosa).toBeDefined();
    expect(glucosa?.valorActual).toBe(103);
    expect(glucosa?.reglaDisparada).toBe('ATENCION_ALTO');
  });

  it('siempre incluye pasos de acción deterministas', () => {
    const snapshot = construirSnapshotOSDR('C003', 'rutina');
    expect(snapshot.fallbackDeterminista.pasosAccion.length).toBeGreaterThan(0);
  });

  it('respeta el modo operación y el ambiente de cabina', () => {
    const snapshot = construirSnapshotOSDR('C001', 'emergencia', {
      radiacionMsv: 0.4,
      co2MmHg: 2.8,
      retardoTierraSegundos: 860,
    });

    expect(snapshot.modoOperacion).toBe('emergencia');
    expect(snapshot.ambienteCabina.radiacionMsv).toBe(0.4);
    expect(snapshot.ambienteCabina.retardoTierraSegundos).toBe(860);
  });

  it('por defecto el ambiente de cabina queda en null', () => {
    const snapshot = construirSnapshotOSDR('C001', 'rutina');
    expect(snapshot.ambienteCabina.radiacionMsv).toBeNull();
    expect(snapshot.ambienteCabina.co2MmHg).toBeNull();
  });
});

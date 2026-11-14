import { describe, expect, it } from 'vitest';

import { evaluar } from '@/lib/rules/triage';

describe('rules/triage · signos vitales (heart_rate, [POR VALIDAR])', () => {
  it('clasifica NOMINAL dentro del rango de referencia', () => {
    const r = evaluar('heart_rate', 72, 68);
    expect(r.nivel).toBe('NOMINAL');
    expect(r.reglaDisparada).toBe('NOMINAL');
    expect(r.desviacion.tipo).toBe('delta-absoluto');
    expect(r.desviacion.valor).toBe(4); // 72 - 68
  });

  it('clasifica ATENCION por debajo del mínimo (sin llegar al crítico)', () => {
    const r = evaluar('heart_rate', 45, 68);
    expect(r.nivel).toBe('ATENCION');
    expect(r.reglaDisparada).toBe('ATENCION_BAJO');
  });

  it('clasifica CRITICO en el umbral crítico inferior', () => {
    expect(evaluar('heart_rate', 40, 68).nivel).toBe('CRITICO');
    expect(evaluar('heart_rate', 40, 68).reglaDisparada).toBe('CRITICO_BAJO');
  });

  it('clasifica ATENCION por encima del máximo (sin llegar al crítico)', () => {
    const r = evaluar('heart_rate', 100, 68);
    expect(r.nivel).toBe('ATENCION');
    expect(r.reglaDisparada).toBe('ATENCION_ALTO');
  });

  it('clasifica CRITICO en el umbral crítico superior', () => {
    expect(evaluar('heart_rate', 110, 68).nivel).toBe('CRITICO');
  });

  it('marca degradado porque la fuente es [POR VALIDAR]', () => {
    expect(evaluar('heart_rate', 72, 68).degradado).toBe(true);
  });
});

describe('rules/triage · analito OSDR (glucose, sin umbral crítico)', () => {
  it('clasifica NOMINAL dentro del rango y NO degrada con baseline presente', () => {
    const r = evaluar('glucose', 90, 80);
    expect(r.nivel).toBe('NOMINAL');
    expect(r.degradado).toBe(false);
  });

  it('clasifica ATENCION_BAJO', () => {
    expect(evaluar('glucose', 60, 80).reglaDisparada).toBe('ATENCION_BAJO');
  });

  it('clasifica ATENCION_ALTO y nunca CRITICO (no hay umbral crítico OSDR)', () => {
    const r = evaluar('glucose', 120, 80);
    expect(r.nivel).toBe('ATENCION');
    expect(r.reglaDisparada).toBe('ATENCION_ALTO');
  });

  it('degrada si no hay línea base personal', () => {
    expect(evaluar('glucose', 90, null).degradado).toBe(true);
  });

  it('usa z-score como tipo declarado y % como proxy de desviación', () => {
    const r = evaluar('glucose', 90, 80);
    expect(r.desviacion.tipo).toBe('z-score');
    expect(r.desviacion.valor).toBe(12.5); // (90-80)/80*100
  });
});

describe('rules/triage · parámetro ambiental sin umbral (cabin_co2)', () => {
  it('devuelve SIN_UMBRAL sin nivel y degradado', () => {
    const r = evaluar('cabin_co2', 5, null);
    expect(r.reglaDisparada).toBe('SIN_UMBRAL');
    expect(r.nivel).toBe('NOMINAL');
    expect(r.degradado).toBe(true);
  });
});

describe('rules/triage · calidad de señal', () => {
  it('no escala a CRITICO con señal insuficiente', () => {
    const r = evaluar('heart_rate', 110, 68, undefined, 0.3);
    expect(r.nivel).toBe('ATENCION');
    expect(r.degradado).toBe(true);
    expect(r.razon).toContain('Calidad de señal insuficiente');
  });
});

describe('rules/triage · errores', () => {
  it('lanza para un parámetro no registrado', () => {
    expect(() => evaluar('no-existe', 1, 1)).toThrow(/no existe en el catálogo/);
  });
});

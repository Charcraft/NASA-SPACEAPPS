import { describe, expect, it } from 'vitest';

import { GENESIS, contenidoEntrada, hashEncadenado } from '@/lib/sync/hash';

describe('sync/hash', () => {
  it('es determinista', () => {
    expect(hashEncadenado(GENESIS, 'abc')).toBe(hashEncadenado(GENESIS, 'abc'));
  });

  it('cambia si cambia el hash previo (encadenamiento)', () => {
    expect(hashEncadenado('a', 'x')).not.toBe(hashEncadenado('b', 'x'));
  });

  it('cambia si cambia el contenido', () => {
    expect(hashEncadenado(GENESIS, 'x')).not.toBe(hashEncadenado(GENESIS, 'y'));
  });

  it('contenidoEntrada serializa los campos inmutables', () => {
    expect(contenidoEntrada('A', 'frame', 123, 1000)).toBe('["A","frame",123,1000]');
  });
});

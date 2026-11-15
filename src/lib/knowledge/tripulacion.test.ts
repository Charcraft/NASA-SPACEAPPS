import { describe, expect, it } from 'vitest';

import { sexoDe } from '@/lib/knowledge/tripulacion';

describe('knowledge/tripulacion · sexoDe', () => {
  it('resuelve el sexo asignado de cada tripulante (demo [SUPUESTO])', () => {
    expect(sexoDe('C001')).toBe('M');
    expect(sexoDe('C002')).toBe('F');
    expect(sexoDe('C003')).toBe('F');
    expect(sexoDe('C004')).toBe('M');
  });
});

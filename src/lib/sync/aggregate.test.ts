import 'fake-indexeddb/auto';

import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/lib/db/dexie';
import { agregarVentana } from '@/lib/sync/aggregate';

const MIN = 60_000;

beforeEach(async () => {
  await Promise.all([db.mediciones.clear(), db.series.clear()]);
});

afterAll(() => {
  db.close();
});

async function insertarMedicion(timestamp: number, valor: number): Promise<void> {
  await db.mediciones.add({
    crewId: 'C001',
    parametroId: 'heart_rate',
    valor,
    unidad: 'bpm',
    nivel: 'NOMINAL',
    sincronizadoTierra: false,
    timestamp,
  });
}

describe('sync/aggregate', () => {
  it('agrupa por cubo de 1 min con min/max/media/n', async () => {
    const base = Math.floor(Date.now() / MIN) * MIN;
    await insertarMedicion(base, 70);
    await insertarMedicion(base + 10_000, 80);
    await insertarMedicion(base + 2 * MIN, 90);

    const cubos = await agregarVentana('C001', 'heart_rate', '1min');
    expect(cubos).toBe(2);

    const series = await db.series.toArray();
    expect(series).toHaveLength(2);

    const primer = series.find((s) => s.inicio === base);
    expect(primer?.min).toBe(70);
    expect(primer?.max).toBe(80);
    expect(primer?.media).toBe(75);
    expect(primer?.n).toBe(2);
  });

  it('no guarda nada si no hay mediciones', async () => {
    expect(await agregarVentana('C001', 'heart_rate', '1h')).toBe(0);
    expect(await db.series.count()).toBe(0);
  });
});

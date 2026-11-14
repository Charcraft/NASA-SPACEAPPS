import 'fake-indexeddb/auto';

import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/lib/db/dexie';
import { guardarFrame } from '@/lib/db/repositories';
import {
  enviarLote,
  loteSeguro,
  siguienteLote,
  verificarCadena,
} from '@/lib/sync/queue';

import type { Nivel, RealtimeTelemetryFrame } from '@/types';

function frame(timestamp: number, nivel: Nivel = 'NOMINAL'): RealtimeTelemetryFrame {
  return {
    timestamp,
    crewId: 'C001',
    metSegundos: 1,
    lecturas: {
      heart_rate: {
        valor: 72,
        unidad: 'bpm',
        baselinePersonal: 68,
        desviacion: { tipo: 'delta-absoluto', valor: 4 },
        nivel,
        meshNodeId: 'thorax_heart',
        toolAnimationId: 'anim_none',
        calidad: 1,
      },
    },
    estadoNodos3D: {},
  };
}

beforeEach(async () => {
  await Promise.all([db.mediciones.clear(), db.colaSync.clear()]);
});

afterAll(() => {
  db.close();
});

describe('sync/queue · orden y prioridad', () => {
  it('ordena pendientes por prioridad (A antes que C)', async () => {
    await guardarFrame(frame(Date.now(), 'NOMINAL'));
    await guardarFrame(frame(Date.now() + 1000, 'CRITICO'));

    const lote = await siguienteLote();
    expect(lote).toHaveLength(2);
    expect(lote[0]?.prioridad).toBe('A');
    expect(lote[1]?.prioridad).toBe('C');
  });
});

describe('sync/queue · cadena de hash', () => {
  it('está íntegra tras encolar', async () => {
    await guardarFrame(frame(Date.now()));
    await guardarFrame(frame(Date.now() + 1000));

    const { integro, corruptas } = await verificarCadena();
    expect(integro).toBe(true);
    expect(corruptas).toEqual([]);
  });

  it('detecta una entrada alterada', async () => {
    await guardarFrame(frame(Date.now()));
    await guardarFrame(frame(Date.now() + 1000));

    const primera = await db.colaSync.toCollection().first();
    await db.colaSync.update(primera!.id!, { hash: 'h0' });

    const { integro, corruptas } = await verificarCadena();
    expect(integro).toBe(false);
    expect(corruptas).toContain(primera!.id);
  });

  it('loteSeguro lanza E-SYN-001 con cadena corrupta', async () => {
    await guardarFrame(frame(Date.now()));
    const primera = await db.colaSync.toCollection().first();
    await db.colaSync.update(primera!.id!, { hash: 'h0' });

    await expect(loteSeguro()).rejects.toThrow(/hash/);
  });
});

describe('sync/queue · liberación', () => {
  it('enviarLote marca como enviado', async () => {
    await guardarFrame(frame(Date.now()));
    const lote = await siguienteLote();

    const n = await enviarLote(lote.map((e) => e.id as number));
    expect(n).toBe(1);
    expect(await db.colaSync.where('estado').equals('enviado').count()).toBe(1);
  });
});

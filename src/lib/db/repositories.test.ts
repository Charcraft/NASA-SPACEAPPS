import 'fake-indexeddb/auto';

import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/lib/db/dexie';
import { Back2Error } from '@/lib/db/errors';
import {
  guardarFrame,
  marcarSincronizado,
  pendientesSincronizar,
  purgarVentana,
  registrarBitacora,
  ventanaReciente,
} from '@/lib/db/repositories';

import type { Nivel, RealtimeTelemetryFrame } from '@/types';

function frameCon(timestamp: number, niveles: Nivel[] = ['NOMINAL']): RealtimeTelemetryFrame {
  return {
    timestamp,
    crewId: 'C001',
    metSegundos: 100,
    lecturas: {
      heart_rate: {
        valor: 72,
        unidad: 'bpm',
        baselinePersonal: 68,
        desviacion: { tipo: 'delta-absoluto', valor: 4 },
        nivel: niveles[0] ?? 'NOMINAL',
        meshNodeId: 'thorax_heart',
        toolAnimationId: 'anim_none',
        calidad: 1,
        razon: 'Test: valor dentro de rango',
        accion: 'Mantener rutina',
        reglaDisparada: 'NOMINAL',
        fuente: 'OSDR OSD-575',
      },
    },
    estadoNodos3D: {},
  };
}

beforeEach(async () => {
  await Promise.all([
    db.mediciones.clear(),
    db.colaSync.clear(),
    db.eventos.clear(),
    db.bitacora.clear(),
  ]);
});

afterAll(async () => {
  db.close();
});

describe('db/repositories · guardarFrame', () => {
  it('persiste una fila por lectura y encola sync', async () => {
    const resultado = await guardarFrame(frameCon(Date.now()));

    expect(resultado.ok).toBe(true);
    expect(resultado.guardadas).toBe(1);
    expect(await db.mediciones.count()).toBe(1);
    expect(await db.colaSync.count()).toBe(1);
  });

  it('devuelve guardadas=0 para un frame sin lecturas', async () => {
    const frame: RealtimeTelemetryFrame = {
      timestamp: Date.now(),
      crewId: 'C001',
      metSegundos: 1,
      lecturas: {},
      estadoNodos3D: {},
    };
    const resultado = await guardarFrame(frame);
    expect(resultado.ok).toBe(true);
    expect(resultado.guardadas).toBe(0);
    expect(await db.mediciones.count()).toBe(0);
  });

  it('asigna prioridad A cuando hay una lectura CRITICO', async () => {
    await guardarFrame(frameCon(Date.now(), ['CRITICO']));
    const cola = await db.colaSync.toArray();
    expect(cola[0]?.prioridad).toBe('A');
  });

  it('deja las mediciones sin sincronizar', async () => {
    await guardarFrame(frameCon(Date.now()));
    const pendientes = await pendientesSincronizar();
    expect(pendientes).toHaveLength(1);
    expect(pendientes[0]?.sincronizadoTierra).toBe(false);
  });
});

describe('db/repositories · ventana y purga', () => {
  it('devuelve solo lecturas dentro de la ventana deslizante', async () => {
    const ahora = Date.now();
    await guardarFrame(frameCon(ahora));
    await guardarFrame(frameCon(ahora - 20 * 60_000)); // 20 min atrás

    const recientes = await ventanaReciente('C001', 15);
    expect(recientes).toHaveLength(1);
    expect(recientes[0]?.timestamp).toBe(ahora);
  });

  it('purga lecturas más antiguas que el umbral de días', async () => {
    const ahora = Date.now();
    await guardarFrame(frameCon(ahora));
    await guardarFrame(frameCon(ahora - 40 * 24 * 60 * 60_000)); // 40 días atrás

    const borradas = await purgarVentana(30);
    expect(borradas).toBe(1);
    expect(await db.mediciones.count()).toBe(1);
  });
});

describe('db/repositories · sincronización', () => {
  it('marca como sincronizadas las lecturas indicadas', async () => {
    await guardarFrame(frameCon(Date.now()));
    const pendientes = await pendientesSincronizar();
    const ids = pendientes.map((m) => m.id as number);

    const actualizadas = await marcarSincronizado(ids);
    expect(actualizadas).toBe(1);
    expect(await pendientesSincronizar()).toHaveLength(0);
  });
});

describe('db/repositories · bitácora y errores', () => {
  it('registra una entrada de bitácora', async () => {
    const id = await registrarBitacora({
      timestamp: Date.now(),
      actor: 'C001',
      tipo: 'medicion',
      detalle: 'Lectura registrada',
    });
    expect(id).toBeGreaterThan(0);
    expect(await db.bitacora.count()).toBe(1);
  });

  it('expone Back2Error con código', () => {
    const error = new Back2Error('E-DB-001', { usadoMb: 128 });
    expect(error.codigo).toBe('E-DB-001');
    expect(error.message).toContain('128');
  });
});

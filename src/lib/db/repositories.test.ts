import 'fake-indexeddb/auto';

import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { db } from '@/lib/db/dexie';
import { Back2Error } from '@/lib/db/errors';
import {
  abrirEpisodio,
  cerrarEpisodio,
  episodioAbierto,
  guardarFrame,
  listarSeries,
  marcarSincronizado,
  marcarSincronizadoPorFrame,
  pendientesSincronizar,
  purgarVentana,
  registrarBitacora,
  registrarEvento,
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
    db.episodios.clear(),
    db.series.clear(),
    db.baselines.clear(),
  ]);
});

afterAll(async () => {
  db.close();
});

describe('db/repositories · guardarFrame', () => {
  it('persiste una fila por lectura (sin encolar sync)', async () => {
    const resultado = await guardarFrame(frameCon(Date.now()));

    expect(resultado.ok).toBe(true);
    expect(resultado.guardadas).toBe(1);
    expect(await db.mediciones.count()).toBe(1);
    expect(await db.colaSync.count()).toBe(0);
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

describe('db/repositories · marcarSincronizadoPorFrame', () => {
  it('marca solo las mediciones del frame correcto (crewId + timestamp)', async () => {
    const t1 = Date.now();
    const t2 = t1 + 1000;

    await guardarFrame(frameCon(t1));
    await guardarFrame(frameCon(t2));
    await guardarFrame({ ...frameCon(t1), crewId: 'C002' });

    const marcadas = await marcarSincronizadoPorFrame('C001', t1);
    expect(marcadas).toBe(1);

    const pendientes = await pendientesSincronizar();
    expect(pendientes).toHaveLength(2);
    expect(pendientes.every((m) => m.sincronizadoTierra === false)).toBe(true);
  });

  it('devuelve el número de mediciones marcadas (no de frames)', async () => {
    const t = Date.now();
    const lectura = frameCon(t).lecturas.heart_rate!;
    const frame: RealtimeTelemetryFrame = {
      timestamp: t,
      crewId: 'C001',
      metSegundos: 100,
      lecturas: {
        heart_rate: lectura,
        spo2: { ...lectura, valor: 98 },
      },
      estadoNodos3D: {},
    };
    await guardarFrame(frame);

    expect(await marcarSincronizadoPorFrame('C001', t)).toBe(2);
  });

  it('es idempotente: la 2ª llamada devuelve 0', async () => {
    const t = Date.now();
    await guardarFrame(frameCon(t));

    expect(await marcarSincronizadoPorFrame('C001', t)).toBe(1);
    expect(await marcarSincronizadoPorFrame('C001', t)).toBe(0);
  });

  it('devuelve 0 sin lanzar para un frame inexistente', async () => {
    await expect(marcarSincronizadoPorFrame('C001', 123456789)).resolves.toBe(0);
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

describe('db/repositories · purgarVentana (solo mediciones)', () => {
  it('no borra series, eventos ni bitácora', async () => {
    await db.series.add({
      crewId: 'C001',
      parametroId: 'heart_rate',
      resolucion: '1min',
      inicio: 1,
      fin: 2,
      min: 70,
      max: 80,
      media: 75,
      n: 2,
    });
    await registrarEvento({
      crewId: 'C001',
      timestamp: Date.now(),
      severidad: 'CRITICO',
      detalle: 'Test',
    });
    await registrarBitacora({
      timestamp: Date.now(),
      actor: 'C001',
      tipo: 'sistema',
      detalle: 'Test',
    });
    await guardarFrame(frameCon(Date.now() - 40 * 24 * 60 * 60_000));

    const borradas = await purgarVentana(30);

    expect(borradas).toBe(1);
    expect(await db.mediciones.count()).toBe(0);
    expect(await db.series.count()).toBe(1);
    expect(await db.eventos.count()).toBe(1);
    expect(await db.bitacora.count()).toBe(1);
  });
});

describe('db/repositories · episodios', () => {
  it('abre, sube nivelMaximo y cierra un episodio', async () => {
    const id = await abrirEpisodio('C001', 'heart_rate', 'ATENCION');
    expect(id).toBeGreaterThan(0);

    const id2 = await abrirEpisodio('C001', 'heart_rate', 'CRITICO');
    expect(id2).toBe(id);

    const abierto = await episodioAbierto('C001', 'heart_rate');
    expect(abierto?.nivelMaximo).toBe('CRITICO');
    expect(abierto?.abierto).toBe(true);

    const cerrado = await cerrarEpisodio('C001', 'heart_rate');
    expect(cerrado).toBe(id);
    expect(await episodioAbierto('C001', 'heart_rate')).toBeNull();
  });

  it('no mezcla episodios de distintos parámetros ni tripulantes', async () => {
    await abrirEpisodio('C001', 'heart_rate', 'ATENCION');
    await abrirEpisodio('C001', 'spo2', 'CRITICO');
    await abrirEpisodio('C002', 'heart_rate', 'ATENCION');

    expect(await episodioAbierto('C001', 'heart_rate')).not.toBeNull();
    expect(await episodioAbierto('C001', 'spo2')).not.toBeNull();
    expect(await episodioAbierto('C002', 'heart_rate')).not.toBeNull();
  });

  it('cerrar sin episodio abierto devuelve null', async () => {
    expect(await cerrarEpisodio('C001', 'heart_rate')).toBeNull();
  });
});

describe('db/repositories · listarSeries', () => {
  const BASE = 1_760_000_000_000;

  async function sembrar(): Promise<void> {
    await db.series.bulkAdd([
      { crewId: 'C001', parametroId: 'heart_rate', resolucion: '1h', inicio: BASE, fin: BASE + 3_600_000, min: 58, max: 84, media: 71, n: 3600 },
      { crewId: 'C001', parametroId: 'heart_rate', resolucion: '1h', inicio: BASE + 7_200_000, fin: BASE + 10_800_000, min: 60, max: 88, media: 72, n: 3600 },
      { crewId: 'C001', parametroId: 'spo2', resolucion: '1h', inicio: BASE, fin: BASE + 3_600_000, min: 96, max: 99, media: 98, n: 3600 },
      { crewId: 'C002', parametroId: 'heart_rate', resolucion: '1h', inicio: BASE, fin: BASE + 3_600_000, min: 60, max: 80, media: 70, n: 3600 },
    ]);
  }

  it('devuelve solo el tripulante y ordenado por inicio', async () => {
    await sembrar();
    const series = await listarSeries({ crewId: 'C001' });
    expect(series).toHaveLength(3);
    expect(series.every((s) => s.crewId === 'C001')).toBe(true);
    expect(series[0]!.inicio).toBeLessThanOrEqual(series[1]!.inicio);
  });

  it('filtra por parámetro', async () => {
    await sembrar();
    const series = await listarSeries({ crewId: 'C001', parametroId: 'spo2' });
    expect(series).toHaveLength(1);
    expect(series[0]!.parametroId).toBe('spo2');
  });

  it('filtra por resolución y rango desde/hasta', async () => {
    await sembrar();
    const series = await listarSeries({
      crewId: 'C001',
      parametroId: 'heart_rate',
      resolucion: '1h',
      desde: BASE + 3_600_000,
      hasta: BASE + 10_800_000,
    });
    expect(series).toHaveLength(1);
    expect(series[0]!.inicio).toBe(BASE + 7_200_000);
  });

  it('devuelve [] si no hay datos en el rango', async () => {
    await sembrar();
    const series = await listarSeries({ crewId: 'C001', parametroId: 'no-existe' });
    expect(series).toEqual([]);
  });
});

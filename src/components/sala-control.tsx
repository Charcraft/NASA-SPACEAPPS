'use client';

/**
 * Sala de tripulación — shell de demostración de Back 1.
 *
 * Una pestaña = una estación = un tripulante (`?crew=C002`). Cada estación
 * publica su frame en `/api/telemetry` y escucha las alertas de las demás por
 * SSE. Si el hub no responde, la estación sigue mostrando sus propios datos.
 *
 * La UI definitiva es de Frontend; esto demuestra que el contrato funciona.
 */

import { useEffect, useMemo, useRef, useState } from 'react';

import type {
  AlertaTripulacion,
  CrewId,
  EstadoTripulante,
  EventoSala,
  Nivel,
  RealtimeTelemetryFrame,
} from '@/types';

import {
  COLOR_NIVEL,
  ETIQUETA_NIVEL,
  ETIQUETA_NODO,
  NODOS_3D,
  estadoDeNodo,
} from '@/lib/model3d-bridge/contracts';
import { crearBaselineDemo } from '@/lib/realtime/demo/baseline';
import { crearEvaluadorDemo } from '@/lib/realtime/demo/evaluador';
import { crearFuenteDemo } from '@/lib/realtime/demo/sensor-source';
import { list } from '@/lib/realtime/registry';
import { StreamEngine } from '@/lib/realtime/stream-engine';

const TRIPULANTES: readonly CrewId[] = ['C001', 'C002', 'C003', 'C004'];
const VITALES = [
  'heart_rate',
  'spo2',
  'systolic_bp',
  'diastolic_bp',
  'respiratory_rate',
  'core_temperature',
  'intracranial_pressure_est',
  'cabin_co2',
  'radiation_dose',
] as const;

const CATALOGO = list();
const NOMBRE_PARAMETRO = new Map(CATALOGO.map((parametro) => [parametro.id, parametro.nombre]));
const SIMULABLES = CATALOGO.filter(
  (parametro) =>
    parametro.rangoReferencia.min !== null ||
    parametro.rangoReferencia.max !== null ||
    parametro.rangoReferencia.criticoMin !== null ||
    parametro.rangoReferencia.criticoMax !== null,
);

function esCrewId(valor: string | null): valor is CrewId {
  return valor !== null && (TRIPULANTES as readonly string[]).includes(valor);
}

function nivelDeAlertas(alertas: readonly AlertaTripulacion[]): Nivel {
  if (alertas.some((alerta) => alerta.nivel === 'CRITICO')) {
    return 'CRITICO';
  }

  if (alertas.length > 0) {
    return 'ATENCION';
  }

  return 'NOMINAL';
}

function formatear(valor: number, unidad: string): string {
  const absoluto = Math.abs(valor);
  const decimales = absoluto >= 100 ? 0 : absoluto >= 10 ? 1 : 2;
  return `${valor.toFixed(decimales)} ${unidad}`;
}

function selloDeTiempo(timestamp: number, ahora: number): string {
  if (ahora === 0) {
    return '—';
  }

  const segundos = Math.max(0, Math.round((ahora - timestamp) / 1_000));
  return segundos <= 1 ? 'ahora' : `hace ${segundos} s`;
}

export default function SalaControl() {
  const [montado, setMontado] = useState(false);
  const [crewId, setCrewId] = useState<CrewId>('C001');
  const [frame, setFrame] = useState<RealtimeTelemetryFrame | null>(null);
  const [sala, setSala] = useState<EstadoTripulante[]>([]);
  const [alertas, setAlertas] = useState<AlertaTripulacion[]>([]);
  const [enlaceSala, setEnlaceSala] = useState<'conectado' | 'degradado' | 'sin-enlace'>(
    'sin-enlace',
  );
  const [enlacePublicacion, setEnlacePublicacion] = useState<'conectado' | 'degradado'>(
    'degradado',
  );
  const [ahora, setAhora] = useState(0);
  const [parametroSimulado, setParametroSimulado] = useState('heart_rate');
  const [nivelSimulado, setNivelSimulado] = useState<'ATENCION' | 'CRITICO'>('CRITICO');

  const engineRef = useRef<StreamEngine | null>(null);
  const ultimoFrameRef = useRef<RealtimeTelemetryFrame | null>(null);

  // Reloj de la UI, solo en cliente para evitar desajustes de hidratación.
  useEffect(() => {
    setMontado(true);
    setAhora(Date.now());

    const intervalo = setInterval(() => setAhora(Date.now()), 1_000);
    return () => clearInterval(intervalo);
  }, []);

  // Tripulante inicial desde `?crew=` o localStorage.
  useEffect(() => {
    const desdeUrl = new URLSearchParams(window.location.search).get('crew');
    const guardado = window.localStorage.getItem('aegis:crew');

    if (esCrewId(desdeUrl)) {
      setCrewId(desdeUrl);
    } else if (esCrewId(guardado)) {
      setCrewId(guardado);
    }
  }, []);

  // Motor local de la estación.
  useEffect(() => {
    const baseline = crearBaselineDemo();
    const engine = new StreamEngine({
      crewId,
      fuente: crearFuenteDemo({
        crewId,
        baseline,
        semilla: 7_919 * Number(crewId.slice(1)),
      }),
      evaluador: crearEvaluadorDemo(),
      baseline,
      respetarIntervalos: false,
    });

    engineRef.current = engine;
    ultimoFrameRef.current = null;

    const baja = engine.subscribe((nuevoFrame) => {
      ultimoFrameRef.current = nuevoFrame;
      setFrame(nuevoFrame);
    });

    engine.start();

    return () => {
      baja();
      engine.stop();
      engineRef.current = null;
    };
  }, [crewId]);

  // Publicación del frame propio cada 2 s.
  useEffect(() => {
    let cancelado = false;

    const publicar = async (): Promise<void> => {
      const actual = ultimoFrameRef.current;

      if (!actual) {
        return;
      }

      try {
        const respuesta = await fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(actual),
        });

        if (!cancelado) {
          setEnlacePublicacion(respuesta.ok ? 'conectado' : 'degradado');
        }
      } catch {
        if (!cancelado) {
          setEnlacePublicacion('degradado');
        }
      }
    };

    void publicar();
    const intervalo = setInterval(() => void publicar(), 2_000);

    return () => {
      cancelado = true;
      clearInterval(intervalo);
    };
  }, [crewId]);

  // Sala compartida por SSE. `EventSource` reintenta solo.
  useEffect(() => {
    const fuente = new EventSource('/api/telemetry');

    fuente.onopen = () => setEnlaceSala('conectado');
    fuente.onerror = () => setEnlaceSala('degradado');

    fuente.onmessage = (mensaje) => {
      let evento: EventoSala;

      try {
        evento = JSON.parse(mensaje.data) as EventoSala;
      } catch {
        return;
      }

      if (evento.tipo === 'snapshot') {
        setSala(evento.tripulantes);
        setAlertas(evento.tripulantes.flatMap((tripulante) => tripulante.alertasActivas));
        return;
      }

      if (evento.tipo === 'alerta') {
        setAlertas((previas) => {
          const resto = previas.filter((alerta) => alerta.id !== evento.alerta.id);
          return [evento.alerta, ...resto].sort(
            (a, b) => (a.nivel === 'CRITICO' ? -1 : 1) - (b.nivel === 'CRITICO' ? -1 : 1),
          );
        });
        return;
      }

      if (evento.tipo === 'resuelta') {
        setAlertas((previas) =>
          previas.filter(
            (alerta) =>
              !(alerta.crewId === evento.crewId && alerta.parametroId === evento.parametroId),
          ),
        );
        return;
      }

      setSala((previos) => {
        const porCrew = new Map(previos.map((tripulante) => [tripulante.crewId, tripulante]));

        for (const resumen of evento.tripulantes) {
          const existente = porCrew.get(resumen.crewId);

          porCrew.set(resumen.crewId, {
            crewId: resumen.crewId,
            nivel: existente?.nivel ?? resumen.nivel,
            alertasActivas: existente?.alertasActivas ?? [],
            ultimaActualizacion: existente?.ultimaActualizacion ?? 0,
            silencioSegundos: existente?.silencioSegundos ?? null,
            estadoEnlace: resumen.estadoEnlace,
          });
        }

        return [...porCrew.values()].sort((a, b) => a.crewId.localeCompare(b.crewId));
      });
    };

    return () => fuente.close();
  }, []);

  const alertasPorCrew = useMemo(() => {
    const mapa = new Map<CrewId, AlertaTripulacion[]>();

    for (const tripulante of TRIPULANTES) {
      mapa.set(
        tripulante,
        alertas.filter((alerta) => alerta.crewId === tripulante),
      );
    }

    return mapa;
  }, [alertas]);

  const emergencias = alertas.filter((alerta) => alerta.nivel === 'CRITICO');
  const propias = alertasPorCrew.get(crewId) ?? [];
  const estadoSala = sala.find((tripulante) => tripulante.crewId === crewId);

  const lecturasVisibles = VITALES.flatMap((id) => {
    const lectura = frame?.lecturas[id];
    return lectura ? [{ id, lectura }] : [];
  });

  const analiticas = Object.entries(frame?.lecturas ?? {})
    .filter(([id]) => !(VITALES as readonly string[]).includes(id))
    .sort(([a], [b]) => a.localeCompare(b));

  const elegirCrew = (siguiente: CrewId): void => {
    setCrewId(siguiente);
    window.localStorage.setItem('aegis:crew', siguiente);
    const url = new URL(window.location.href);
    url.searchParams.set('crew', siguiente);
    window.history.replaceState(null, '', url.toString());
  };

  const simular = (nivel: 'ATENCION' | 'CRITICO'): void => {
    engineRef.current?.forzarAnomalia(parametroSimulado, nivel, 30_000);
  };

  const limpiar = (): void => {
    engineRef.current?.limpiarAnomalias();
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 text-neutral-200">
      <header className="flex flex-col gap-3 border-b border-neutral-800 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              AEGIS · Sala de tripulación
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-100">
              Monitoreo en vuelo
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span
              className="rounded-full border px-3 py-1"
              style={{
                borderColor: COLOR_NIVEL[enlaceSala === 'conectado' ? 'NOMINAL' : 'ATENCION'],
                color: COLOR_NIVEL[enlaceSala === 'conectado' ? 'NOMINAL' : 'ATENCION'],
              }}
            >
              Sala: {enlaceSala}
            </span>
            <span
              className="rounded-full border px-3 py-1"
              style={{
                borderColor:
                  COLOR_NIVEL[enlacePublicacion === 'conectado' ? 'NOMINAL' : 'ATENCION'],
                color: COLOR_NIVEL[enlacePublicacion === 'conectado' ? 'NOMINAL' : 'ATENCION'],
              }}
            >
              Envío: {enlacePublicacion}
            </span>
          </div>
        </div>

        <p className="max-w-3xl text-sm text-neutral-400">
          Esta pestaña es la estación de <strong className="text-neutral-200">{crewId}</strong>.
          Abre otra pestaña con <code className="text-neutral-300">?crew=C002</code> para ver la
          sincronización. Los datos son simulados; las 17 analíticas vienen de OSDR OSD-575.
        </p>
      </header>

      {emergencias.length > 0 ? (
        <div
          role="alert"
          className="rounded-lg border border-red-500/50 bg-red-950/40 px-4 py-3 text-sm"
        >
          <p className="font-semibold text-red-300">Emergencia en la tripulación</p>
          <ul className="mt-1 space-y-1 text-red-200">
            {emergencias.slice(0, 4).map((alerta) => (
              <li key={alerta.id}>
                {alerta.crewId} · {alerta.nombreParametro}: {alerta.razon} {alerta.accion}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <section aria-label="Tripulantes" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TRIPULANTES.map((tripulante) => {
          const alertasTripulante = alertasPorCrew.get(tripulante) ?? [];
          const nivel = nivelDeAlertas(alertasTripulante);
          const estado = sala.find((item) => item.crewId === tripulante);
          const seleccionado = tripulante === crewId;

          return (
            <button
              key={tripulante}
              type="button"
              onClick={() => elegirCrew(tripulante)}
              aria-pressed={seleccionado}
              className={`rounded-lg border p-4 text-left transition ${
                seleccionado ? 'bg-neutral-900' : 'bg-neutral-950 hover:bg-neutral-900'
              }`}
              style={{ borderColor: COLOR_NIVEL[nivel] }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-neutral-100">{tripulante}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                  style={{ backgroundColor: `${COLOR_NIVEL[nivel]}22`, color: COLOR_NIVEL[nivel] }}
                >
                  {ETIQUETA_NIVEL[nivel]}
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-400">
                {alertasTripulante.length === 0
                  ? 'Sin alertas activas'
                  : `${alertasTripulante.length} alerta(s) activa(s)`}
              </p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Enlace: {estado?.estadoEnlace ?? 'sin-enlace'}
                {seleccionado ? ' · tu estación' : ''}
              </p>
            </button>
          );
        })}
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <section aria-label="Signos del tripulante" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              Signos y ambiente · {crewId}
            </h2>
            <span className="text-xs text-neutral-500">
              MET {frame ? `${Math.floor(frame.metSegundos / 60)} min` : '—'}
            </span>
          </div>

          {!montado || !frame ? (
            <p className="rounded-lg border border-neutral-800 p-6 text-sm text-neutral-500">
              Iniciando motor de telemetría…
            </p>
          ) : (
            <>
              <div className="grid gap-2 sm:grid-cols-3">
                {lecturasVisibles.map(({ id, lectura }) => (
                  <article
                    key={id}
                    className="rounded-lg border border-neutral-800 bg-neutral-950 p-3"
                    style={{ borderLeftColor: COLOR_NIVEL[lectura.nivel], borderLeftWidth: 3 }}
                  >
                    <p className="text-[11px] leading-tight text-neutral-400">
                      {NOMBRE_PARAMETRO.get(id) ?? id}
                    </p>
                    <p className="mt-1 text-lg font-semibold tabular-nums text-neutral-100">
                      {formatear(lectura.valor, lectura.unidad)}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500">
                      {ETIQUETA_NIVEL[lectura.nivel]}
                      {lectura.baselinePersonal !== null
                        ? ` · base ${formatear(lectura.baselinePersonal, lectura.unidad)}`
                        : ' · sin baseline'}
                    </p>
                  </article>
                ))}
              </div>

              <details className="rounded-lg border border-neutral-800 bg-neutral-950 p-3">
                <summary className="cursor-pointer text-xs font-medium text-neutral-300">
                  Analíticas OSDR ({analiticas.length}) y trazabilidad
                </summary>
                <div className="mt-3 max-h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="text-neutral-500">
                      <tr>
                        <th className="py-1 pr-2 font-medium">Parámetro</th>
                        <th className="py-1 pr-2 font-medium">Valor</th>
                        <th className="py-1 font-medium">Nivel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analiticas.map(([id, lectura]) => (
                        <tr key={id} className="border-t border-neutral-900">
                          <td className="py-1 pr-2 text-neutral-300">
                            {NOMBRE_PARAMETRO.get(id) ?? id}
                          </td>
                          <td className="py-1 pr-2 tabular-nums text-neutral-200">
                            {formatear(lectura.valor, lectura.unidad)}
                          </td>
                          <td className="py-1" style={{ color: COLOR_NIVEL[lectura.nivel] }}>
                            {ETIQUETA_NIVEL[lectura.nivel]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            </>
          )}
        </section>

        <div className="flex flex-col gap-6">
          <section
            aria-label="Simulador de anomalías"
            className="rounded-lg border border-neutral-800 bg-neutral-950 p-4"
          >
            <h2 className="text-sm font-semibold text-neutral-200">Provocar una alerta</h2>
            <p className="mt-1 text-xs text-neutral-500">
              La alerta viaja a las demás estaciones en menos de 2 s. Dura 30 s.
            </p>

            <div className="mt-3 flex flex-col gap-2">
              <select
                value={parametroSimulado}
                onChange={(evento) => setParametroSimulado(evento.target.value)}
                className="rounded border border-neutral-700 bg-neutral-900 px-2 py-1.5 text-sm text-neutral-200"
                aria-label="Parámetro a alterar"
              >
                {SIMULABLES.map((parametro) => (
                  <option key={parametro.id} value={parametro.id}>
                    {parametro.nombre}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setNivelSimulado('ATENCION');
                    simular('ATENCION');
                  }}
                  className={`rounded border px-3 py-1.5 text-xs font-medium ${
                    nivelSimulado === 'ATENCION'
                      ? 'border-amber-500 text-amber-300'
                      : 'border-neutral-700 text-neutral-300'
                  }`}
                >
                  Atención
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNivelSimulado('CRITICO');
                    simular('CRITICO');
                  }}
                  className={`rounded border px-3 py-1.5 text-xs font-medium ${
                    nivelSimulado === 'CRITICO'
                      ? 'border-red-500 text-red-300'
                      : 'border-neutral-700 text-neutral-300'
                  }`}
                >
                  Crítico
                </button>
                <button
                  type="button"
                  onClick={limpiar}
                  className="rounded border border-neutral-700 px-3 py-1.5 text-xs font-medium text-neutral-300"
                >
                  Restablecer
                </button>
              </div>
            </div>
          </section>

          <section aria-label="Modelo 3D" className="rounded-lg border border-neutral-800 p-4">
            <h2 className="text-sm font-semibold text-neutral-200">Nodos del modelo 3D</h2>
            <ul className="mt-3 space-y-2">
              {NODOS_3D.map((nodo) => {
                const estado = frame ? estadoDeNodo(frame, nodo) : null;
                const nivel = estado?.nivelMaximo ?? 'NOMINAL';

                return (
                  <li key={nodo} className="flex items-center justify-between gap-3 text-xs">
                    <span className="flex items-center gap-2 text-neutral-300">
                      <span
                        aria-hidden
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: COLOR_NIVEL[nivel] }}
                      />
                      {ETIQUETA_NODO[nodo]}
                    </span>
                    <span className="text-neutral-500">
                      {estado?.animacionActiva ?? 'sin animación'}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-label="Alertas de la tripulación" className="rounded-lg border p-4">
            <h2 className="text-sm font-semibold text-neutral-200">Alertas de la tripulación</h2>
            <div aria-live="polite" className="mt-3 flex max-h-72 flex-col gap-2 overflow-y-auto">
              {alertas.length === 0 ? (
                <p className="text-xs text-neutral-500">Sin alertas activas en la sala.</p>
              ) : (
                alertas.map((alerta) => (
                  <article
                    key={alerta.id}
                    className="rounded border border-neutral-800 bg-neutral-950 p-3 text-xs"
                    style={{ borderLeftColor: COLOR_NIVEL[alerta.nivel], borderLeftWidth: 3 }}
                  >
                    <p className="font-medium text-neutral-200">
                      {alerta.crewId} · {alerta.nombreParametro}
                    </p>
                    <p className="mt-1 text-neutral-400">{alerta.razon}</p>
                    <p className="mt-1 text-neutral-500">{alerta.accion}</p>
                    <p className="mt-1 text-[11px] text-neutral-600">
                      {formatear(alerta.valor, alerta.unidad)}
                      {alerta.baseline !== null
                        ? ` · baseline ${formatear(alerta.baseline, alerta.unidad)}`
                        : ''}
                      {montado ? ` · ${selloDeTiempo(alerta.timestamp, ahora)}` : ''}
                    </p>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        <p>
          Estación {crewId} · {estadoSala ? `sala ${estadoSala.estadoEnlace}` : 'sala sin enlace'} ·
          alertas propias: {propias.length}
        </p>
        <p className="mt-1">
          Prototipo de hackathon. Datos simulados y dataset público OSD-575. No es un
          dispositivo médico.
        </p>
      </footer>
    </main>
  );
}

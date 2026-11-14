"use client";

import Link from "next/link";
import { use, useState } from "react";
import { TrafficLight } from "@/components/TrafficLight";
import guiasRaw from "@/data/knowledge/indicadores-guia.json";
import { db } from "@/lib/db/dexie";
import {
  calcularBaselinePersonal,
  listarIndicadoresOSDR,
  obtenerIndicadorOSDR,
  obtenerValorEnTimepoint,
} from "@/lib/osdr/client";
import { evaluarLecturaDeterminista } from "@/lib/rules/triage";
import { useAegisStore } from "@/lib/store/useAegisStore";
import type { ResultadoTriage } from "@/types";

export default function MedirIndicadorPage({
  params,
}: {
  params: Promise<{ indicador: string }>;
}) {
  const { indicador: indicadorParam } = use(params);
  const { crewId, timepoint } = useAegisStore();

  const todos = listarIndicadoresOSDR();
  const ind =
    obtenerIndicadorOSDR(indicadorParam) ??
    obtenerIndicadorOSDR("glucose") ??
    todos[0];

  const base = calcularBaselinePersonal(crewId, ind.id);
  const valorInicial =
    obtenerValorEnTimepoint(crewId, ind.id, timepoint) ??
    base.mediaPreVuelo ??
    90;

  const [valorInput, setValorInput] = useState<string>(String(valorInicial));
  const [condicion, setCondicion] = useState<
    "ayunas" | "post-prandial" | "post-eva"
  >("ayunas");
  const [pasoGuia, setPasoGuia] = useState<number>(1);
  const [resultado, setResultado] = useState<ResultadoTriage | null>(null);
  const [guardadoLocal, setGuardadoLocal] = useState(false);

  const guias = guiasRaw as Record<
    string,
    {
      tituloDispositivo: string;
      pasos: { orden: number; titulo: string; descripcion: string }[];
      modoFallo0G: { titulo: string; detalle: string };
      fuente: string;
    }
  >;
  const guia = guias[ind.id] ?? guias["glucose"];
  const pasoActualObj =
    guia.pasos.find((p) => p.orden === pasoGuia) ?? guia.pasos[1];

  const handleEvaluar = async () => {
    const num = Number.parseFloat(valorInput);
    if (Number.isNaN(num)) return;

    const evalRes = evaluarLecturaDeterminista({
      crewId,
      indicadorId: ind.id,
      valor: num,
    });
    setResultado(evalRes);

    try {
      await db.mediciones.add({
        hash: `OSD575-${crewId}-${ind.id.toUpperCase()}-${num}-${Date.now()}`,
        crewId,
        indicadorId: ind.id,
        nombreIndicador: ind.nombre,
        valor: num,
        unidad: ind.unidad,
        condicion,
        nivel: evalRes.nivel,
        razon: evalRes.razonDeterminista,
        sincronizadoTierra: false,
        timestamp: evalRes.timestamp,
      });
      setGuardadoLocal(true);
    } catch {
      setGuardadoLocal(false);
    }
  };

  if (resultado) {
    /* Vista 04 · Evaluación y Recomendación Autónoma (Minimalista Monocromática) */
    return (
      <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
        <section className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#7D8594]">
              Resultado de evaluación · {crewId} · {ind.nombre}
            </span>
            <TrafficLight nivel={resultado.nivel} />
          </div>

          <h1 className="mt-3 text-[36px] font-normal tracking-[-0.02em] text-[#ECEFF4]">
            {resultado.nivel === "CRITICO"
              ? "Atención prioritaria requerida"
              : resultado.nivel === "ATENCION"
                ? "Atención moderada"
                : "Dentro de tu línea base"}
          </h1>

          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#7D8594]">
            {resultado.razonDeterminista}
          </p>

          <div className="mt-8 border-t border-[#181B22] pt-7">
            <h2 className="text-sm font-medium text-[#ECEFF4]">
              Pasos recomendados
            </h2>
            <ol className="mt-4 space-y-3.5 text-[15px] text-[#7D8594]">
              {resultado.pasosRecomendados.map((paso, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-[#ECEFF4]">{i + 1}.</span>
                  <span>{paso}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 flex flex-wrap gap-3.5">
            <button
              type="button"
              onClick={() => setResultado(null)}
              className="h-11 rounded-xl bg-[#ECEFF4] px-6 text-[13px] font-semibold text-[#0A0B0E] transition-opacity hover:opacity-90"
            >
              Registrar otra lectura
            </button>
            <Link
              href="/emergencia"
              className="flex h-11 items-center rounded-xl border border-[#1C2029] bg-[#101217] px-6 text-[13px] text-[#ECEFF4] transition-colors hover:border-[#ECEFF4]"
            >
              Reportar síntomas agudos
            </Link>
          </div>
        </section>

        {/* Tarjeta Derecha: Sincronización Diferida con Tierra */}
        <section className="lg:col-span-5">
          <div className="rounded-2xl border border-[#1C2029] bg-[#101217] p-8">
            <h2 className="text-[15px] font-medium text-[#ECEFF4]">
              Sincronización diferida con Tierra
            </h2>
            <p className="mt-3 text-[13px] leading-relaxed text-[#7D8594]">
              {guardadoLocal
                ? "La lectura quedó almacenada localmente en IndexedDB y se enviará al Flight Surgeon en la próxima ventana de enlace disponible."
                : "Lectura evaluada en memoria local sin conexión."}
            </p>

            <div className="mt-6 space-y-3 border-t border-[#1C2029] pt-5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#484F5C]">Valor medido</span>
                <span className="text-[#ECEFF4]">
                  {resultado.valor} {resultado.unidad}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#484F5C]">Media pre-vuelo ({crewId})</span>
                <span className="text-[#ECEFF4]">
                  {resultado.baselinePersonal.mediaPreVuelo} {resultado.unidad}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#484F5C]">Rango OSD-575</span>
                <span className="text-[#7D8594]">
                  {resultado.rangoReferencia.min ?? "–"} –{" "}
                  {resultado.rangoReferencia.max ?? "–"} {resultado.unidad}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#484F5C]">Fuente verificada</span>
                <span className="text-[#7D8594]">NASA OSDR OSD-575</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* Vista 03 · Asistente de Medición Guiado en 0G */
  return (
    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
      {/* Izquierda: Guía paso a paso sobria y sin ruido */}
      <section className="lg:col-span-6">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#7D8594]">
            Paso {pasoGuia} de 3 · Toma en microgravedad
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPasoGuia(n)}
                className={`h-1.5 w-8 rounded-full transition-colors ${
                  pasoGuia === n ? "bg-[#ECEFF4]" : "bg-[#1C2029]"
                }`}
                aria-label={`Ir al paso ${n}`}
              />
            ))}
          </div>
        </div>

        <h1 className="mt-4 text-[32px] font-normal leading-tight tracking-[-0.02em] text-[#ECEFF4]">
          {pasoActualObj.titulo}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[#7D8594]">
          {pasoActualObj.descripcion}
        </p>

        {/* Selector rápido de otro analito de OSD-575 */}
        <div className="mt-8">
          <label
            htmlFor="select-analito"
            className="block text-xs text-[#484F5C]"
          >
            Analito del panel sanguíneo (NASA OSDR OSD-575)
          </label>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {["glucose", "calcium", "creatinine", "ast", "potassium", "sodium"].map(
              (id) => {
                const item = obtenerIndicadorOSDR(id);
                if (!item) return null;
                const active = item.id === ind.id;
                return (
                  <Link
                    key={id}
                    href={`/medir/${id}`}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      active
                        ? "border-[#ECEFF4] bg-[#161922] font-medium text-[#ECEFF4]"
                        : "border-[#1C2029] bg-[#101217] text-[#7D8594] hover:text-[#ECEFF4]"
                    }`}
                  >
                    {item.nombre}
                  </Link>
                );
              }
            )}
          </div>
        </div>

        {/* Nota de modo de fallo en microgravedad */}
        <div className="mt-8 rounded-xl border border-[#1C2029] bg-[#101217] p-6">
          <p className="text-xs font-medium text-[#ECEFF4]">
            {guia.modoFallo0G.titulo}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[#7D8594]">
            {guia.modoFallo0G.detalle}
          </p>
        </div>
      </section>

      {/* Derecha: Ingreso limpio de lectura */}
      <section className="lg:col-span-6">
        <div className="rounded-2xl border border-[#1C2029] bg-[#101217] p-8 lg:p-10">
          <p className="text-xs text-[#7D8594]">
            Lectura del analizador portátil ({ind.nombre})
          </p>

          <div className="mt-6 flex items-baseline gap-3">
            <input
              type="number"
              step="any"
              value={valorInput}
              onChange={(e) => setValorInput(e.target.value)}
              className="w-48 bg-transparent text-[64px] font-light leading-none tracking-[-0.03em] text-[#ECEFF4] focus:outline-none"
              aria-label={`Valor de ${ind.nombre}`}
            />
            <span className="text-xl text-[#484F5C]">{ind.unidad}</span>
          </div>

          <div className="mt-6 flex gap-2">
            {(["ayunas", "post-prandial", "post-eva"] as const).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCondicion(c)}
                className={`rounded-lg border px-3 py-1.5 text-xs capitalize transition-colors ${
                  condicion === c
                    ? "border-[#ECEFF4] bg-[#161922] text-[#ECEFF4]"
                    : "border-[#1C2029] text-[#7D8594] hover:text-[#ECEFF4]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t border-[#1C2029] pt-6 text-[13px]">
            <div className="flex justify-between">
              <span className="text-[#7D8594]">
                Tu media pre-vuelo ({crewId})
              </span>
              <span className="text-[#ECEFF4]">
                {base.mediaPreVuelo} {ind.unidad}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#7D8594]">
                Rango de referencia (OSD-575)
              </span>
              <span className="text-[#7D8594]">
                {ind.rangoReferencia.min ?? "–"} –{" "}
                {ind.rangoReferencia.max ?? "–"} {ind.unidad}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEvaluar}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[#ECEFF4] text-sm font-semibold text-[#0A0B0E] transition-opacity hover:opacity-90"
          >
            Evaluar lectura
          </button>
        </div>
      </section>
    </div>
  );
}

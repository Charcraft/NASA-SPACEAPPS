"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/db/dexie";
import {
  calcularBaselinePersonal,
  listarIndicadoresOSDR,
  listarValoresFueraDeRango,
  obtenerDatasetOSDR,
  obtenerValorEnTimepoint,
} from "@/lib/osdr/client";
import { useAegisStore } from "@/lib/store/useAegisStore";
import type { RegistroMedicionLocal } from "@/types";

export default function RutinaOSDRPage() {
  const { crewId, timepoint } = useAegisStore();
  const dataset = obtenerDatasetOSDR();
  const indicadores = listarIndicadoresOSDR();
  const fueraDeRangoTodos = listarValoresFueraDeRango();
  const [medicionesLocales, setMedicionesLocales] = useState<
    RegistroMedicionLocal[]
  >([]);

  useEffect(() => {
    db.mediciones
      .orderBy("timestamp")
      .reverse()
      .limit(10)
      .toArray()
      .then(setMedicionesLocales)
      .catch(() => setMedicionesLocales([]));
  }, []);

  return (
    <div className="space-y-12">
      {/* Cabecera del explorador de NASA OSDR OSD-575 */}
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[#181B22] pb-8">
        <div>
          <p className="text-xs text-[#7D8594]">
            Fuente primaria verificada · {dataset.meta.accesion}
          </p>
          <h1 className="mt-2 text-[30px] font-normal tracking-[-0.02em] text-[#ECEFF4]">
            {dataset.meta.titulo}
          </h1>
          <p className="mt-2 max-w-2xl text-[13px] text-[#7D8594]">
            {indicadores.length} analitos sanguíneos × 4 tripulantes (C001–C004)
            × 7 puntos temporales (475 muestras en total, con{" "}
            {fueraDeRangoTodos.length} valores reales fuera del rango de
            referencia propio del dataset).
          </p>
        </div>

        <div className="flex gap-3 text-xs">
          <a
            href={dataset.meta.paginaDataset}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-[#1C2029] bg-[#101217] px-4 py-2 text-[#ECEFF4] hover:border-[#484F5C]"
          >
            Fuente NASA OSDR ↗
          </a>
        </div>
      </div>

      {/* Tabla minimalista de los 19 analitos para el tripulante y punto temporal activos */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-[#ECEFF4]">
            Panel metabólico de {crewId} en {timepoint}
          </h2>
          <span className="text-xs text-[#7D8594]">
            Clic en cualquier analito para abrir medición guiada
          </span>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-[#1C2029] bg-[#101217]">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#1C2029] text-xs text-[#484F5C]">
                <th className="px-6 py-3.5 font-normal">Analito</th>
                <th className="px-6 py-3.5 font-normal">Sistema</th>
                <th className="px-6 py-3.5 font-normal">
                  Media pre-vuelo (L-92 a L-3)
                </th>
                <th className="px-6 py-3.5 font-normal">Valor ({timepoint})</th>
                <th className="px-6 py-3.5 font-normal">Rango OSD-575</th>
                <th className="px-6 py-3.5 font-normal">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181B22]">
              {indicadores.map((ind) => {
                const base = calcularBaselinePersonal(crewId, ind.id);
                const val = obtenerValorEnTimepoint(crewId, ind.id, timepoint);
                const fuera =
                  val !== null &&
                  ((ind.rangoReferencia.min !== null &&
                    val < ind.rangoReferencia.min) ||
                    (ind.rangoReferencia.max !== null &&
                      val > ind.rangoReferencia.max));

                return (
                  <tr
                    key={ind.id}
                    className="transition-colors hover:bg-[#14171F]"
                  >
                    <td className="px-6 py-3.5 font-medium text-[#ECEFF4]">
                      {ind.nombre}
                    </td>
                    <td className="px-6 py-3.5 capitalize text-[#7D8594]">
                      {ind.sistema}
                    </td>
                    <td className="px-6 py-3.5 text-[#7D8594]">
                      {base.mediaPreVuelo} {ind.unidad}
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="inline-flex items-center gap-2 font-medium text-[#ECEFF4]">
                        {fuera && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#ECEFF4]" />
                        )}
                        {val ?? "–"} {ind.unidad}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-[#7D8594]">
                      {ind.rangoReferencia.min ?? "–"} –{" "}
                      {ind.rangoReferencia.max ?? "–"} {ind.unidad}
                    </td>
                    <td className="px-6 py-3.5">
                      <Link
                        href={`/medir/${ind.id}`}
                        className="text-xs text-[#7D8594] hover:text-[#ECEFF4]"
                      >
                        Evaluar →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Cola local de sincronización diferida (IndexedDB) */}
      <section>
        <h2 className="text-sm font-medium text-[#ECEFF4]">
          Cola local de telemetría diferida (IndexedDB)
        </h2>
        <p className="mt-1 text-xs text-[#7D8594]">
          Mediciones registradas a bordo pendientes de sincronización con el
          Flight Surgeon en Tierra.
        </p>

        {medicionesLocales.length === 0 ? (
          <div className="mt-4 rounded-xl border border-[#1C2029] bg-[#101217] p-6 text-xs text-[#7D8594]">
            Aún no has registrado mediciones manuales en esta sesión. Usa{" "}
            <Link href="/medir/glucose" className="text-[#ECEFF4] underline">
              Medición guiada
            </Link>{" "}
            para almacenar una lectura local.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-[#181B22] rounded-xl border border-[#1C2029] bg-[#101217]">
            {medicionesLocales.map((m) => (
              <div
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs"
              >
                <div>
                  <span className="font-medium text-[#ECEFF4]">
                    {m.crewId} · {m.nombreIndicador}: {m.valor} {m.unidad}
                  </span>
                  <span className="ml-3 text-[#7D8594]">{m.razon}</span>
                </div>
                <span className="font-mono text-[11px] text-[#484F5C]">
                  {m.hash}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

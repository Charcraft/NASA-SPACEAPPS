"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BodyMap } from "@/components/BodyMap";
import { IndicatorCard } from "@/components/IndicatorCard";
import { TrendChart } from "@/components/TrendChart";
import signosMock from "@/data/mock/signos-vitales-cabina.json";
import {
  calcularBaselinePersonal,
  listarValoresFueraDeRango,
  obtenerIndicadorOSDR,
  obtenerValorEnTimepoint,
} from "@/lib/osdr/client";
import { evaluarLecturaDeterminista } from "@/lib/rules/triage";
import { useAegisStore } from "@/lib/store/useAegisStore";

export default function DashboardPage() {
  const router = useRouter();
  const { crewId, timepoint, setTimepoint } = useAegisStore();

  const signosCrew = signosMock.tripulantes[crewId];
  const indGlucosa = obtenerIndicadorOSDR("glucose");
  const baseGlucosa = calcularBaselinePersonal(crewId, "glucose");
  const valorGlucosaActual =
    obtenerValorEnTimepoint(crewId, "glucose", timepoint) ??
    baseGlucosa.mediaPreVuelo;

  const triageGlucosa = evaluarLecturaDeterminista({
    crewId,
    indicadorId: "glucose",
    valor: valorGlucosaActual,
  });

  const anomaliasCrew = listarValoresFueraDeRango(crewId);
  const anomaliaDestacada = anomaliasCrew[0];

  const focoIndicadorId =
    triageGlucosa.nivel !== "NOMINAL"
      ? "glucose"
      : anomaliaDestacada?.indicadorId ?? "glucose";

  const indFoco = obtenerIndicadorOSDR(focoIndicadorId) ?? indGlucosa!;
  const baseFoco = calcularBaselinePersonal(crewId, focoIndicadorId);
  const tpFoco =
    triageGlucosa.nivel !== "NOMINAL"
      ? timepoint
      : anomaliaDestacada?.timepoint ?? timepoint;
  const valFoco =
    obtenerValorEnTimepoint(crewId, focoIndicadorId, tpFoco) ??
    baseFoco.mediaPreVuelo;

  const desvioPct =
    baseFoco.mediaPreVuelo > 0
      ? Number(
          (
            ((valFoco - baseFoco.mediaPreVuelo) / baseFoco.mediaPreVuelo) *
            100
          ).toFixed(1)
        )
      : 0;

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
      {/* Columna Izquierda: Estado General y 3 Signos Vitales Primarios */}
      <section className="lg:col-span-4">
        <p className="text-xs text-[#7D8594]">
          Estado fisiológico · {signosCrew.rol}
        </p>
        <h1 className="mt-2 text-[28px] font-medium tracking-[-0.02em] text-[#ECEFF4]">
          {anomaliasCrew.length > 0
            ? `Estable, ${anomaliasCrew.length} variación en serie`
            : "Parámetros en equilibrio"}
        </h1>
        <p className="mt-1.5 text-[13px] text-[#7D8594]">
          Comparado contra tu línea base pre-vuelo (L-92, L-44, L-3)
        </p>

        <div className="mt-6 border-t border-[#181B22] pt-2">
          <IndicatorCard
            label="Frecuencia cardíaca [SUPUESTO cabina]"
            value={signosCrew.frecuenciaCardiacaLpm}
            unit="lpm"
            baselineText={`Base ${signosCrew.baseFrecuenciaCardiacaLpm} lpm`}
          />
          <IndicatorCard
            label="Saturación de oxígeno [SUPUESTO cabina]"
            value={signosCrew.spo2Porcentaje}
            unit="%"
            baselineText={`Base ${signosCrew.baseSpo2Porcentaje}%`}
          />
          <IndicatorCard
            label="Presión arterial [SUPUESTO cabina]"
            value={signosCrew.presionArterial}
            unit="mmHg"
            baselineText="Nominal"
          />
        </div>

        {/* Selector de punto temporal de la misión (OSD-575) */}
        <div className="mt-8">
          <p className="text-xs text-[#484F5C]">
            Punto temporal de misión (NASA OSDR OSD-575)
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(
              ["L-92", "L-44", "L-3", "R+1", "R+45", "R+82", "R+194"] as const
            ).map((tp) => {
              const active = timepoint === tp;
              return (
                <button
                  key={tp}
                  type="button"
                  onClick={() => setTimepoint(tp)}
                  className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
                    active
                      ? "border-[#ECEFF4] bg-[#161922] font-medium text-[#ECEFF4]"
                      : "border-[#1C2029] bg-[#101217] text-[#7D8594] hover:text-[#ECEFF4]"
                  }`}
                >
                  {tp}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Escenario Central: Modelo Volumétrico 3D */}
      <section className="flex flex-col items-center justify-center lg:col-span-4">
        <BodyMap onSelectSistema={() => router.push("/cuerpo")} />
      </section>

      {/* Columna Derecha: Foco Único de Observación (OSD-575) + Ambiente */}
      <section className="lg:col-span-4">
        <div className="rounded-2xl border border-[#1C2029] bg-[#101217] p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#ECEFF4]" />
              <span className="text-xs font-medium text-[#ECEFF4]">
                Observación activa · {indFoco.nombre} ({tpFoco})
              </span>
            </div>
            <span className="text-[11px] text-[#484F5C]">OSD-575</span>
          </div>

          <div className="mt-6 flex items-baseline gap-2.5">
            <span className="text-[44px] font-light leading-none tracking-[-0.03em] text-[#ECEFF4]">
              {valFoco}
            </span>
            <span className="text-[15px] text-[#7D8594]">{indFoco.unidad}</span>
          </div>

          <p className="mt-2.5 text-[13px] leading-relaxed text-[#7D8594]">
            {desvioPct >= 0 ? `+${desvioPct}%` : `${desvioPct}%`} frente a tu
            media pre-vuelo ({baseFoco.mediaPreVuelo} {indFoco.unidad}) · Rango
            de referencia {indFoco.rangoReferencia.min ?? "–"}–
            {indFoco.rangoReferencia.max ?? "–"} {indFoco.unidad}.
          </p>

          <div className="mt-6">
            <TrendChart
              serie={indFoco.serie[crewId] ?? []}
              rangoMin={indFoco.rangoReferencia.min}
              rangoMax={indFoco.rangoReferencia.max}
              activeTimepoint={tpFoco}
            />
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Link
              href={`/medir/${indFoco.id}`}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#ECEFF4] text-[13px] font-semibold text-[#0A0B0E] transition-opacity hover:opacity-90"
            >
              Iniciar medición guiada
            </Link>
            <Link
              href="/rutina"
              className="flex h-10 w-full items-center justify-center rounded-xl border border-[#1C2029] text-xs text-[#7D8594] transition-colors hover:border-[#484F5C] hover:text-[#ECEFF4]"
            >
              Explorar los 19 analitos de OSD-575
            </Link>
          </div>
        </div>

        {/* Contexto Ambiental Discreto */}
        <div className="mt-9">
          <p className="text-xs text-[#484F5C]">Ambiente de cabina</p>
          <div className="mt-3 divide-y divide-[#181B22] border-t border-[#181B22] text-[13px]">
            <div className="flex justify-between py-3">
              <span className="text-[#7D8594]">Radiación acumulada</span>
              <span className="text-[#ECEFF4]">
                {signosMock.cabina.radiacionAcumuladaMsv} mSv
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-[#7D8594]">Presión parcial CO₂</span>
              <span className="text-[#ECEFF4]">
                {signosMock.cabina.presionParcialCo2MmHg} mmHg
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-[#7D8594]">Retardo con Tierra</span>
              <span className="text-[#ECEFF4]">
                {signosMock.cabina.retardoTierraTexto}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

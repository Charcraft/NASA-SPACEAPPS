"use client";

import Link from "next/link";
import { BodyMap } from "@/components/BodyMap";
import signosMock from "@/data/mock/signos-vitales-cabina.json";
import {
  calcularBaselinePersonal,
  listarIndicadoresOSDR,
  obtenerValorEnTimepoint,
} from "@/lib/osdr/client";
import { useAegisStore } from "@/lib/store/useAegisStore";
import type { SistemaFisiologico } from "@/types";

const SISTEMAS_META: Record<
  SistemaFisiologico,
  {
    titulo: string;
    subtitulo: string;
    explicacion0G: string;
    analitosOSDR: string[];
  }
> = {
  "neuro-ocular": {
    titulo: "Sistema Neuro-ocular (SANS)",
    subtitulo: "Adaptación cefálica a microgravedad",
    explicacion0G:
      "El desplazamiento cefálico de fluidos en microgravedad incrementa la presión intracraneal y aplana el globo ocular.",
    analitosOSDR: ["sodium", "potassium", "carbon_dioxide"],
  },
  cardiovascular: {
    titulo: "Sistema Cardiovascular",
    subtitulo: "Regulación hemodinámica y electrolítica",
    explicacion0G:
      "En órbita disminuye el volumen plasmático efectivo y se modifica la respuesta barorrefleja ortostática.",
    analitosOSDR: ["potassium", "sodium", "calcium"],
  },
  respiratorio: {
    titulo: "Sistema Respiratorio",
    subtitulo: "Ventilación y equilibrio ácido-base",
    explicacion0G:
      "La ausencia de convección natural en 0G exige vigilar bolsillos locales de CO₂ y bicarbonato sérico.",
    analitosOSDR: ["carbon_dioxide", "chloride", "total_protein"],
  },
  metabolico: {
    titulo: "Metabólico, Hepático y Renal",
    subtitulo: "Panel bioquímico completo OSD-575",
    explicacion0G:
      "El estrés de vuelo espacial modifica sensibilidad a la insulina, transaminasas hepáticas y tasa de filtración renal.",
    analitosOSDR: ["glucose", "ast", "alt", "creatinine", "urea_nitrogen_bun"],
  },
  musculoesqueletico: {
    titulo: "Sistema Musculoesquelético",
    subtitulo: "Remodelado óseo y recambio mineral",
    explicacion0G:
      "La descarga mecánica en 0G acelera la resorción ósea liberando calcio y fosfatasa alcalina al torrente sanguíneo.",
    analitosOSDR: ["calcium", "alkaline_phosphatase", "albumin"],
  },
  "inmune-radiacion": {
    titulo: "Inmune y Proteínas Plasmáticas",
    subtitulo: "Estado oncótico y respuesta inflamatoria",
    explicacion0G:
      "El confinamiento y la radiación espacial alteran la relación albúmina/globulina y las proteínas totales.",
    analitosOSDR: ["albumin", "globulin", "albumin_to_globulin_ratio", "total_bilirubin"],
  },
};

export default function CuerpoPage() {
  const { crewId, timepoint, sistemaActivo, setSistemaActivo } =
    useAegisStore();
  const todosIndicadores = listarIndicadoresOSDR();
  const meta = SISTEMAS_META[sistemaActivo];
  const signosCrew = signosMock.tripulantes[crewId];

  const analitosDelSistema = todosIndicadores.filter((ind) =>
    meta.analitosOSDR.includes(ind.id)
  );

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
      {/* Izquierda: Índice limpio de sistemas */}
      <section className="lg:col-span-4">
        <p className="text-xs text-[#484F5C]">Sistemas corporales</p>
        <div className="mt-4 divide-y divide-[#181B22]">
          {(Object.keys(SISTEMAS_META) as SistemaFisiologico[]).map((key) => {
            const item = SISTEMAS_META[key];
            const active = sistemaActivo === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSistemaActivo(key)}
                className="flex w-full items-baseline justify-between py-5 text-left transition-colors"
              >
                <div>
                  <p
                    className={`text-[17px] transition-colors ${
                      active
                        ? "font-medium text-[#ECEFF4]"
                        : "text-[#7D8594] hover:text-[#ECEFF4]"
                    }`}
                  >
                    {item.titulo}
                  </p>
                  {active && (
                    <p className="mt-1 text-xs text-[#7D8594]">
                      {item.subtitulo}
                    </p>
                  )}
                </div>
                <span
                  className={`text-xs ${
                    active ? "text-[#ECEFF4]" : "text-[#484F5C]"
                  }`}
                >
                  {active ? "Activo" : "Ver"}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Centro: Modelo 3D Interactivo */}
      <section className="flex flex-col items-center justify-center lg:col-span-4">
        <BodyMap />
      </section>

      {/* Derecha: Ficha limpia de la región seleccionada con datos reales OSD-575 */}
      <section className="lg:col-span-4">
        <div className="rounded-2xl border border-[#1C2029] bg-[#101217] p-7">
          <p className="text-xs text-[#7D8594]">
            Región seleccionada · {crewId} ({timepoint})
          </p>
          <h1 className="mt-2 text-[22px] font-medium text-[#ECEFF4]">
            {meta.titulo}
          </h1>
          <p className="mt-3 text-[13px] leading-relaxed text-[#7D8594]">
            {meta.explicacion0G}
          </p>

          <div className="mt-6 divide-y divide-[#1C2029] border-t border-[#1C2029]">
            {sistemaActivo === "neuro-ocular" && (
              <>
                <div className="flex justify-between py-3.5 text-[13px]">
                  <span className="text-[#7D8594]">Agudeza visual cercana</span>
                  <span className="text-[#ECEFF4]">
                    {signosCrew.agudezaVisual}
                  </span>
                </div>
                <div className="flex justify-between py-3.5 text-[13px]">
                  <span className="text-[#7D8594]">Rejilla de Amsler</span>
                  <span className="text-[#ECEFF4]">{signosCrew.amsler}</span>
                </div>
              </>
            )}

            {analitosDelSistema.map((ind) => {
              const val = obtenerValorEnTimepoint(crewId, ind.id, timepoint);
              const base = calcularBaselinePersonal(crewId, ind.id);
              const fuera =
                val !== null &&
                ((ind.rangoReferencia.min !== null &&
                  val < ind.rangoReferencia.min) ||
                  (ind.rangoReferencia.max !== null &&
                    val > ind.rangoReferencia.max));

              return (
                <div
                  key={ind.id}
                  className="flex items-center justify-between py-3.5 text-[13px]"
                >
                  <div>
                    <span className="text-[#7D8594]">{ind.nombre}</span>
                    <span className="ml-2 text-[11px] text-[#484F5C]">
                      (Base {base.mediaPreVuelo})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {fuera && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ECEFF4]" />
                    )}
                    <span className="font-medium text-[#ECEFF4]">
                      {val ?? "–"} {ind.unidad}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <Link
              href={`/medir/${analitosDelSistema[0]?.id ?? "glucose"}`}
              className="flex h-11 w-full items-center justify-center rounded-xl border border-[#262B36] bg-[#161922] text-[13px] font-medium text-[#ECEFF4] transition-colors hover:border-[#ECEFF4]"
            >
              Evaluar este sistema
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

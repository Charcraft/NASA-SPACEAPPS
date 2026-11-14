"use client";

import { useAegisStore } from "@/lib/store/useAegisStore";
import type { SistemaFisiologico } from "@/types";

interface BodyMapProps {
  onSelectSistema?: (sistema: SistemaFisiologico) => void;
  interactiveLabels?: boolean;
}

const NODOS: {
  id: SistemaFisiologico;
  etiqueta: string;
  subtitulo: string;
  cxFrontal: number;
  cyFrontal: number;
  cxLateral: number;
  cyLateral: number;
  destacado?: boolean;
}[] = [
  {
    id: "neuro-ocular",
    etiqueta: "Neuro-ocular (SANS)",
    subtitulo: "Presión intracraneal y visión",
    cxFrontal: 240,
    cyFrontal: 122,
    cxLateral: 246,
    cyLateral: 122,
  },
  {
    id: "respiratorio",
    etiqueta: "Respiratorio",
    subtitulo: "Intercambio gaseoso y CO₂",
    cxFrontal: 218,
    cyFrontal: 218,
    cxLateral: 244,
    cyLateral: 218,
  },
  {
    id: "cardiovascular",
    etiqueta: "Cardiovascular",
    subtitulo: "Redistribución cefálica 0G",
    cxFrontal: 254,
    cyFrontal: 234,
    cxLateral: 256,
    cyLateral: 234,
  },
  {
    id: "metabolico",
    etiqueta: "Metabólico y hepático",
    subtitulo: "Panel sanguíneo OSD-575",
    cxFrontal: 228,
    cyFrontal: 296,
    cxLateral: 252,
    cyLateral: 296,
    destacado: true,
  },
  {
    id: "musculoesqueletico",
    etiqueta: "Musculoesquelético",
    subtitulo: "Densidad ósea y calcio",
    cxFrontal: 268,
    cyFrontal: 420,
    cxLateral: 242,
    cyLateral: 420,
  },
  {
    id: "inmune-radiacion",
    etiqueta: "Inmune y radiación",
    subtitulo: "Dosimetría y proteínas",
    cxFrontal: 212,
    cyFrontal: 356,
    cxLateral: 234,
    cyLateral: 356,
  },
];

export function BodyMap({ onSelectSistema }: BodyMapProps) {
  const {
    sistemaActivo,
    setSistemaActivo,
    vistaCamara3D,
    setVistaCamara3D,
  } = useAegisStore();

  const handleSelect = (id: SistemaFisiologico) => {
    setSistemaActivo(id);
    onSelectSistema?.(id);
  };

  const isLateral = vistaCamara3D === "lateral";
  const showLayers = vistaCamara3D === "capas";

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <svg
        viewBox="0 0 480 680"
        className="h-[540px] w-full max-w-[460px] overflow-visible"
        aria-label="Modelo volumétrico 3D del astronauta"
      >
        <defs>
          <radialGradient id="sculptGlow" cx="50%" cy="46%" r="48%">
            <stop offset="0%" stopColor="#ECEFF4" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#0A0B0E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo arquitectónico sutil */}
        <circle cx="240" cy="320" r="220" fill="url(#sculptGlow)" />
        <circle
          cx="240"
          cy="320"
          r="195"
          stroke="#151820"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx="240"
          cy="320"
          r="135"
          stroke="#14171E"
          strokeWidth="1"
          strokeDasharray="2 6"
          fill="none"
        />

        {/* Ejes de telemetría 3D */}
        <line
          x1="240"
          y1="44"
          x2="240"
          y2="590"
          stroke="#14171E"
          strokeWidth="1"
        />
        <ellipse
          cx="240"
          cy="560"
          rx="104"
          ry="20"
          stroke="#1C2029"
          strokeWidth="1"
          fill="none"
        />
        <ellipse
          cx="240"
          cy="560"
          rx="64"
          ry="11"
          stroke="#151820"
          strokeWidth="1"
          strokeDasharray="3 5"
          fill="none"
        />

        {/* Geometría Volumétrica del Astronauta (Frontal vs Lateral vs Capas) */}
        {!isLateral ? (
          <g className="transition-all duration-300">
            {/* Casco / Cabeza */}
            <circle
              cx="240"
              cy="126"
              r="34"
              fill="#0E1015"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <ellipse
              cx="240"
              cy="126"
              rx="23"
              ry="17"
              fill="#131720"
              stroke="#484F5C"
              strokeWidth="1"
            />

            {/* Cuello y Hombros */}
            <path
              d="M222 160 L258 160 L298 188 L182 188 Z"
              fill="#0E1015"
              stroke="#484F5C"
              strokeWidth="1.2"
            />

            {/* Torso */}
            <path
              d="M182 188 L298 188 L284 348 L196 348 Z"
              fill="#0E1015"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />

            {/* Malla de topología 3D interna */}
            <path
              d="M190 235 Q240 248 290 235"
              stroke="#1E232D"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M194 290 Q240 302 286 290"
              stroke="#1E232D"
              strokeWidth="1"
              fill="none"
            />
            {showLayers && (
              <>
                <ellipse
                  cx="240"
                  cy="235"
                  rx="48"
                  ry="14"
                  stroke="#484F5C"
                  strokeWidth="0.9"
                  strokeDasharray="2 3"
                  fill="none"
                />
                <ellipse
                  cx="240"
                  cy="290"
                  rx="44"
                  ry="12"
                  stroke="#484F5C"
                  strokeWidth="0.9"
                  strokeDasharray="2 3"
                  fill="none"
                />
                <path
                  d="M240 160 L240 348"
                  stroke="#484F5C"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              </>
            )}

            {/* Brazos */}
            <path
              d="M182 188 L148 326 L172 332 L194 228"
              fill="#0E1015"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <path
              d="M298 188 L332 326 L308 332 L286 228"
              fill="#0E1015"
              stroke="#64748B"
              strokeWidth="1.2"
            />

            {/* Piernas */}
            <path
              d="M198 348 L188 528 L222 528 L232 348"
              fill="#0E1015"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <path
              d="M248 348 L258 528 L292 528 L282 348"
              fill="#0E1015"
              stroke="#64748B"
              strokeWidth="1.2"
            />
          </g>
        ) : (
          <g className="transition-all duration-300">
            {/* Vista Lateral Volumétrica */}
            <circle
              cx="244"
              cy="126"
              r="33"
              fill="#0E1015"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <path
              d="M252 112 C268 112 272 136 252 138 Z"
              fill="#131720"
              stroke="#484F5C"
              strokeWidth="1"
            />
            <path
              d="M220 162 L264 162 L274 346 L214 346 Z"
              fill="#0E1015"
              stroke="#94A3B8"
              strokeWidth="1.4"
            />
            <path
              d="M236 196 L218 328 L242 332 L254 206"
              fill="#101217"
              stroke="#64748B"
              strokeWidth="1.2"
            />
            <path
              d="M222 346 L218 528 L256 528 L264 346"
              fill="#0E1015"
              stroke="#64748B"
              strokeWidth="1.2"
            />
          </g>
        )}

        {/* Nodos Anatómicos Interactivos */}
        {NODOS.map((nodo) => {
          const active = sistemaActivo === nodo.id;
          const cx = isLateral ? nodo.cxLateral : nodo.cxFrontal;
          const cy = isLateral ? nodo.cyLateral : nodo.cyFrontal;

          return (
            <g
              key={nodo.id}
              onClick={() => handleSelect(nodo.id)}
              className="cursor-pointer"
            >
              {(active || nodo.destacado) && (
                <circle
                  cx={cx}
                  cy={cy}
                  r={active ? 14 : 10}
                  fill="#ECEFF4"
                  fillOpacity={active ? 0.16 : 0.08}
                />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={active ? 5.5 : 4}
                fill={active || nodo.destacado ? "#ECEFF4" : "#64748B"}
                stroke="#0A0B0E"
                strokeWidth="1.5"
              />
            </g>
          );
        })}
      </svg>

      {/* Selector minimalista de cámara 3D */}
      <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-[#1C2029] bg-[#101217] p-1">
        {(["frontal", "lateral", "capas"] as const).map((modo) => {
          const active = vistaCamara3D === modo;
          return (
            <button
              key={modo}
              type="button"
              onClick={() => setVistaCamara3D(modo)}
              className={`rounded-full px-3.5 py-1 text-[11px] capitalize transition-colors ${
                active
                  ? "bg-[#1A1E26] font-medium text-[#ECEFF4]"
                  : "text-[#7D8594] hover:text-[#ECEFF4]"
              }`}
            >
              {modo}
            </button>
          );
        })}
      </div>
    </div>
  );
}

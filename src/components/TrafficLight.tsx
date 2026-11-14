import type { NivelTriage } from "@/types";

export function TrafficLight({
  nivel,
  etiqueta,
}: {
  nivel: NivelTriage;
  etiqueta?: string;
}) {
  const textos: Record<NivelTriage, string> = {
    NOMINAL: etiqueta ?? "Nominal",
    ATENCION: etiqueta ?? "Variación leve",
    CRITICO: etiqueta ?? "Prioridad inmediata",
  };

  return (
    <span className="inline-flex items-center gap-2 text-xs text-[#ECEFF4]">
      <span
        className={`h-2 w-2 rounded-full ${
          nivel === "CRITICO"
            ? "bg-[#E5484D]"
            : nivel === "ATENCION"
              ? "bg-[#ECEFF4]"
              : "bg-[#484F5C]"
        }`}
      />
      <span
        className={
          nivel === "NOMINAL" ? "text-[#7D8594]" : "font-medium text-[#ECEFF4]"
        }
      >
        {textos[nivel]}
      </span>
    </span>
  );
}

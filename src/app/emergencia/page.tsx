import Link from "next/link";
import protocolosRaw from "@/data/knowledge/protocolos-emergencia.json";

export default function EmergenciaSelectorPage() {
  const { protocolos } = protocolosRaw;

  return (
    <div>
      <p className="text-xs text-[#7D8594]">
        Respuesta autónoma sin enlace a Tierra
      </p>
      <h1 className="mt-2 text-[34px] font-normal tracking-[-0.02em] text-[#ECEFF4]">
        Selecciona el evento clínico
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {protocolos.map((prot, idx) => {
          const isPrimary = idx === 0;
          return (
            <Link
              key={prot.id}
              href={`/emergencia/${prot.id}`}
              className={`group flex flex-col justify-between rounded-2xl border bg-[#101217] p-8 transition-colors ${
                isPrimary
                  ? "border-[#ECEFF4] hover:bg-[#14171F]"
                  : "border-[#1C2029] hover:border-[#484F5C]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={
                      isPrimary
                        ? "font-medium text-[#ECEFF4]"
                        : "text-[#7D8594]"
                    }
                  >
                    {prot.prioridad}
                  </span>
                  <span className="text-[#484F5C]">{prot.codigo}</span>
                </div>

                <h2 className="mt-4 text-2xl font-normal text-[#ECEFF4]">
                  {prot.titulo}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[#7D8594]">
                  {prot.resumen}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#1C2029] pt-4 text-xs">
                <span
                  className={
                    isPrimary
                      ? "font-medium text-[#ECEFF4]"
                      : "text-[#7D8594] group-hover:text-[#ECEFF4]"
                  }
                >
                  Abrir protocolo paso a paso
                </span>
                <span className="text-[#484F5C]">
                  {prot.pasos.length} pasos
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

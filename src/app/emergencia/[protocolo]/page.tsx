"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { EmergencyTimer } from "@/components/EmergencyTimer";
import protocolosRaw from "@/data/knowledge/protocolos-emergencia.json";
import { db } from "@/lib/db/dexie";
import { useAegisStore } from "@/lib/store/useAegisStore";

export default function ProtocoloActivoPage({
  params,
}: {
  params: Promise<{ protocolo: string }>;
}) {
  const { protocolo: protocoloParam } = use(params);
  const { crewId } = useAegisStore();

  const protocolo =
    protocolosRaw.protocolos.find((p) => p.id === protocoloParam) ??
    protocolosRaw.protocolos[0];

  const [pasoIdx, setPasoIdx] = useState(0);
  const [eventosLog, setEventosLog] = useState<
    { hora: string; texto: string }[]
  >([]);
  const [exportadoMsg, setExportadoMsg] = useState(false);

  const pasoActual = protocolo.pasos[pasoIdx] ?? protocolo.pasos[0];

  const registrarEvento = async (texto: string, idx: number) => {
    const ahora = new Date();
    const hora = ahora.toISOString().slice(11, 19);
    setEventosLog((prev) => [...prev, { hora, texto }]);
    try {
      await db.bitacoraEmergencia.add({
        protocoloId: protocolo.id,
        crewIdAfectado: crewId,
        pasoIndex: idx + 1,
        accion: texto,
        timestamp: ahora.toISOString(),
      });
    } catch {
      // Fallback en memoria si el navegador restringe IndexedDB
    }
  };

  useEffect(() => {
    registrarEvento(
      `Inicio de ${protocolo.titulo} (${crewId})`,
      0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocolo.id, crewId]);

  const avanzarPaso = () => {
    registrarEvento(`Completado: ${pasoActual.titulo}`, pasoIdx);
    if (pasoIdx + 1 < protocolo.pasos.length) {
      setPasoIdx(pasoIdx + 1);
    }
  };

  const exportarPaquete = () => {
    const payload = {
      mision: "AEGIS-SPACEAPPS-2026",
      tripulanteAfectado: crewId,
      protocolo: protocolo.codigo,
      titulo: protocolo.titulo,
      eventos: eventosLog,
      generadoEn: new Date().toISOString(),
    };
    navigator.clipboard?.writeText(JSON.stringify(payload, null, 2));
    setExportadoMsg(true);
    setTimeout(() => setExportadoMsg(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12">
      {/* Izquierda: Una sola instrucción en foco de alto contraste */}
      <section className="lg:col-span-7">
        <div className="flex items-center justify-between text-xs text-[#7D8594]">
          <span>
            {protocolo.titulo} · Paso {pasoIdx + 1} de {protocolo.pasos.length}
          </span>
          <span>{protocolo.codigo}</span>
        </div>

        <h1 className="mt-4 text-[38px] font-normal leading-tight tracking-[-0.02em] text-[#ECEFF4]">
          {pasoActual.titulo}
        </h1>

        <p className="mt-5 text-[16px] leading-relaxed text-[#7D8594]">
          {pasoActual.instruccion}
        </p>

        <div className="mt-6 rounded-xl border border-[#1C2029] bg-[#101217] p-5">
          <p className="text-xs font-medium text-[#ECEFF4]">
            Consideración en microgravedad (0G)
          </p>
          <p className="mt-1.5 text-[13px] text-[#7D8594]">
            {pasoActual.nota0G}
          </p>
        </div>

        {/* Metrónomo y Cronómetro Activo */}
        <div className="mt-6">
          <EmergencyTimer />
        </div>

        {/* Botones de control de paso */}
        <div className="mt-8 flex flex-wrap gap-3.5">
          <button
            type="button"
            onClick={avanzarPaso}
            className="h-12 rounded-xl bg-[#ECEFF4] px-7 text-sm font-semibold text-[#0A0B0E] transition-opacity hover:opacity-90"
          >
            {pasoIdx + 1 < protocolo.pasos.length
              ? "Siguiente paso"
              : "Registrar ciclo completado"}
          </button>

          {pasoIdx > 0 && (
            <button
              type="button"
              onClick={() => setPasoIdx((i) => Math.max(0, i - 1))}
              className="h-12 rounded-xl border border-[#1C2029] bg-[#101217] px-6 text-sm text-[#ECEFF4] hover:border-[#484F5C]"
            >
              Paso anterior
            </button>
          )}

          <Link
            href="/emergencia"
            className="flex h-12 items-center rounded-xl border border-[#1C2029] px-5 text-xs text-[#7D8594] hover:text-[#ECEFF4]"
          >
            Cambiar protocolo
          </Link>
        </div>
      </section>

      {/* Derecha: Bitácora silenciosa para el Flight Surgeon */}
      <section className="lg:col-span-5">
        <div className="rounded-2xl border border-[#1C2029] bg-[#101217] p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[#ECEFF4]">
              Registro automático para Flight Surgeon
            </h2>
            <span className="text-[11px] text-[#7D8594]">Grabando</span>
          </div>

          <p className="mt-2 text-xs text-[#484F5C]">
            {protocolo.equipoUbicacion}
          </p>

          <div className="mt-5 max-h-64 space-y-3 overflow-y-auto border-t border-[#1C2029] pt-5 text-[13px]">
            {eventosLog.map((ev, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-mono text-xs text-[#484F5C]">
                  {ev.hora}
                </span>
                <span className="text-[#ECEFF4]">{ev.texto}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={exportarPaquete}
            className="mt-7 flex h-11 w-full items-center justify-center rounded-xl border border-[#262B36] bg-[#161922] text-xs font-medium text-[#ECEFF4] transition-colors hover:border-[#ECEFF4]"
          >
            {exportadoMsg
              ? "Paquete JSON copiado al portapapeles"
              : "Exportar paquete de telemetría (JSON)"}
          </button>
        </div>
      </section>
    </div>
  );
}

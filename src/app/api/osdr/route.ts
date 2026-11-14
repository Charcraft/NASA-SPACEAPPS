import { NextResponse } from "next/server";
import {
  listarValoresFueraDeRango,
  obtenerDatasetOSDR,
} from "@/lib/osdr/client";

/**
 * Endpoint híbrido Offline-First para NASA OSDR (OSD-575).
 * 1. Sirve en <1ms el dataset local normalizado + los 24 hallazgos fuera de rango.
 * 2. Si se pasa ?verifyRemote=1 y hay red, consulta con timeout corto (2.5s) la API oficial
 *    de NASA OSDR (https://visualization.osdr.nasa.gov/biodata/api/v2/dataset/OSD-575/?format=json)
 *    sin bloquear jamás la respuesta si el WiFi del venue falla.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verifyRemote = searchParams.get("verifyRemote") === "1";
  const dataset = obtenerDatasetOSDR();
  const fueraDeRango = listarValoresFueraDeRango();

  let estadoApiRemota: "offline-seed" | "online-verificado" = "offline-seed";

  if (verifyRemote) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(
        "https://visualization.osdr.nasa.gov/biodata/api/v2/dataset/OSD-575/?format=json",
        { signal: controller.signal, next: { revalidate: 3600 } }
      );
      clearTimeout(timer);
      if (res.ok) {
        estadoApiRemota = "online-verificado";
      }
    } catch {
      estadoApiRemota = "offline-seed";
    }
  }

  return NextResponse.json({
    estado: estadoApiRemota,
    meta: dataset.meta,
    totalAnalitos: dataset.indicadores.length,
    totalMuestras: 475,
    totalFueraDeRango: fueraDeRango.length,
    fueraDeRango,
  });
}

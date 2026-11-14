import type { Metadata } from "next";
import { TopNav } from "@/components/TopNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "AEGIS · Autonomía de Salud Espacial (NASA Space Apps 2026)",
  description:
    "Herramienta visual offline-first de monitoreo y evaluación autónoma de salud para astronautas basada en NASA OSDR OSD-575.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#0A0B0E] text-[#ECEFF4] flex flex-col">
        <TopNav />
        <main className="mx-auto w-full max-w-[1440px] flex-1 px-8 py-10 lg:px-14">
          {children}
        </main>
        <footer className="mx-auto w-full max-w-[1440px] border-t border-[#14171E] px-8 py-5 lg:px-14 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#484F5C]">
          <span>
            Prototipo informativo basado en NASA OSDR OSD-575 (SpaceX
            Inspiration4 CMP). No es un dispositivo médico. No diagnostica ni
            prescribe.
          </span>
          <span>Equipo ROCKET · NASA Space Apps Challenge 2026</span>
        </footer>
      </body>
    </html>
  );
}

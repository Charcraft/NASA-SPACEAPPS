"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAegisStore } from "@/lib/store/useAegisStore";
import type { CrewId } from "@/types";

const CREW_LIST: CrewId[] = ["C001", "C002", "C003", "C004"];

export function TopNav() {
  const pathname = usePathname();
  const { crewId, setCrewId } = useAegisStore();
  const isEmergency = pathname.startsWith("/emergencia");

  const links = [
    { href: "/", label: "Vista general" },
    { href: "/cuerpo", label: "Modelo 3D" },
    { href: "/medir/glucose", label: "Medición" },
    { href: "/rutina", label: "Base OSD-575" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#181B22] bg-[#0A0B0E]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-8 lg:px-14">
        {/* Marca + Selector discreto de tripulante */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.04em] text-[#ECEFF4]"
          >
            AEGIS
          </Link>
          <div className="h-3.5 w-[1px] bg-[#1C2029]" />
          <div className="flex items-center gap-1.5" role="group" aria-label="Seleccionar tripulante">
            {CREW_LIST.map((id) => {
              const active = crewId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCrewId(id)}
                  className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
                    active
                      ? "bg-[#161922] font-medium text-[#ECEFF4] ring-1 ring-[#ECEFF4]/40"
                      : "text-[#7D8594] hover:text-[#ECEFF4]"
                  }`}
                >
                  {id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navegación principal limpia */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("/")[1] ? `/${item.href.split("/")[1]}` : item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] transition-colors ${
                  active
                    ? "font-medium text-[#ECEFF4]"
                    : "text-[#7D8594] hover:text-[#ECEFF4]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Estado Autónomo + Conmutador Rutina / Emergencia */}
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ECEFF4]" />
            <span className="text-xs text-[#7D8594]">Autónomo · Sin red</span>
          </div>

          {isEmergency ? (
            <Link
              href="/"
              className="rounded-full border border-[#262B36] bg-[#101217] px-4 py-1.5 text-xs font-medium text-[#ECEFF4] transition-colors hover:border-[#ECEFF4]"
            >
              Volver a rutina
            </Link>
          ) : (
            <Link
              href="/emergencia"
              className="rounded-full bg-[#ECEFF4] px-4 py-1.5 text-xs font-semibold text-[#0A0B0E] transition-opacity hover:opacity-90"
            >
              Emergencia
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

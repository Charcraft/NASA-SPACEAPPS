"use client";

import { create } from "zustand";
import type { CrewId, SistemaFisiologico, TimepointId } from "@/types";

interface AegisState {
  crewId: CrewId;
  timepoint: TimepointId;
  sistemaActivo: SistemaFisiologico;
  vistaCamara3D: "frontal" | "lateral" | "capas";
  setCrewId: (crewId: CrewId) => void;
  setTimepoint: (tp: TimepointId) => void;
  setSistemaActivo: (s: SistemaFisiologico) => void;
  setVistaCamara3D: (v: "frontal" | "lateral" | "capas") => void;
}

export const useAegisStore = create<AegisState>((set) => ({
  crewId: "C003",
  timepoint: "R+1",
  sistemaActivo: "neuro-ocular",
  vistaCamara3D: "frontal",
  setCrewId: (crewId) => set({ crewId }),
  setTimepoint: (timepoint) => set({ timepoint }),
  setSistemaActivo: (sistemaActivo) => set({ sistemaActivo }),
  setVistaCamara3D: (vistaCamara3D) => set({ vistaCamara3D }),
}));

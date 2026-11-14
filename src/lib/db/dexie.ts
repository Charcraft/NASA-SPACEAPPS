import Dexie, { type EntityTable } from "dexie";
import type {
  EventoBitacoraEmergencia,
  RegistroMedicionLocal,
} from "@/types";

class AegisOfflineDB extends Dexie {
  mediciones!: EntityTable<RegistroMedicionLocal, "id">;
  bitacoraEmergencia!: EntityTable<EventoBitacoraEmergencia, "id">;

  constructor() {
    super("AegisCrewHealthDB");
    this.version(1).stores({
      mediciones:
        "++id, hash, crewId, indicadorId, nivel, sincronizadoTierra, timestamp",
      bitacoraEmergencia:
        "++id, protocoloId, crewIdAfectado, pasoIndex, timestamp",
    });
  }
}

export const db = new AegisOfflineDB();

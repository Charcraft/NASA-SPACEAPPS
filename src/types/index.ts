export type CrewId = "C001" | "C002" | "C003" | "C004";

export type TimepointId =
  | "L-92"
  | "L-44"
  | "L-3"
  | "R+1"
  | "R+45"
  | "R+82"
  | "R+194";

export type SistemaFisiologico =
  | "neuro-ocular"
  | "cardiovascular"
  | "respiratorio"
  | "metabolico"
  | "musculoesqueletico"
  | "inmune-radiacion";

export type NivelTriage = "NOMINAL" | "ATENCION" | "CRITICO";

export interface PuntoSerieOSDR {
  timepoint: TimepointId;
  valor: number | null;
}

export interface IndicadorOSDR {
  id: string;
  nombre: string;
  sistema: string;
  unidad: string;
  rangoReferencia: {
    min: number | null;
    max: number | null;
  };
  fuente: string;
  serie: Record<CrewId, PuntoSerieOSDR[]>;
}

export interface DatasetOSDR {
  meta: {
    fuente: string;
    accesion: string;
    titulo: string;
    archivo: string;
    url: string;
    paginaDataset: string;
    obtenido: string;
    tripulantes: CrewId[];
    puntosTemporales: number;
    nota: string;
    licencia: string;
    generadoPor: string;
  };
  timepoints: {
    id: TimepointId;
    diasRelativosAlLanzamiento: number;
    fase: "pre-vuelo" | "post-vuelo";
  }[];
  indicadores: IndicadorOSDR[];
}

export interface EstadisticaBaselinePersonal {
  crewId: CrewId;
  indicadorId: string;
  mediaPreVuelo: number;
  desviacionPreVuelo: number;
  minPreVuelo: number;
  maxPreVuelo: number;
  muestrasPreVuelo: number;
}

export interface ResultadoTriage {
  id: string;
  crewId: CrewId;
  indicadorId: string;
  nombreIndicador: string;
  valor: number;
  unidad: string;
  nivel: NivelTriage;
  baselinePersonal: EstadisticaBaselinePersonal;
  rangoReferencia: { min: number | null; max: number | null };
  desviacionPorcentualVsBaseline: number;
  razonDeterminista: string;
  pasosRecomendados: string[];
  criterioEscalado: string;
  fuenteCitada: string;
  timestamp: string;
}

export interface RegistroMedicionLocal {
  id?: number;
  hash: string;
  crewId: CrewId;
  indicadorId: string;
  nombreIndicador: string;
  valor: number;
  unidad: string;
  condicion: "ayunas" | "post-prandial" | "post-eva";
  nivel: NivelTriage;
  razon: string;
  sincronizadoTierra: boolean;
  timestamp: string;
}

export interface EventoBitacoraEmergencia {
  id?: number;
  protocoloId: string;
  crewIdAfectado: CrewId;
  pasoIndex: number;
  accion: string;
  timestamp: string;
}

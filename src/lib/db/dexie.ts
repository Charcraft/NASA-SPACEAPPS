import Dexie, { type Table } from 'dexie';

import type {
  BaselineCache,
  EntradaColaSync,
  Episodio,
  EventoEmergencia,
  RegistroBitacora,
  RegistroMedicionLocal,
  SerieAgregada,
} from './types';

/**
 * Base de datos local (IndexedDB vía Dexie) de AEGIS.
 *
 * Esquema v1 (congelado): ver `team/angel_marco/plan-backend-2.md` §5.2.
 * Desviación menor respecto a la propuesta: `series` y `baselines` usan
 * `++id` como clave primaria y conservan el índice compuesto como índice
 * (no como clave primaria), para simplificar el tipado sin perder consultas.
 */

interface ParametroCache {
  id: string;
  categoria: string;
  meshNodeId: string | null;
  tipoDato: string;
}

class AegisOfflineDB extends Dexie {
  parametros!: Table<ParametroCache, string>;
  mediciones!: Table<RegistroMedicionLocal, number>;
  series!: Table<SerieAgregada, number>;
  episodios!: Table<Episodio, number>;
  baselines!: Table<BaselineCache, number>;
  eventos!: Table<EventoEmergencia, number>;
  colaSync!: Table<EntradaColaSync, number>;
  bitacora!: Table<RegistroBitacora, number>;

  constructor() {
    super('AegisCrewHealthDB');

    this.version(1).stores({
      parametros: 'id, categoria, meshNodeId, tipoDato',
      mediciones:
        '++id, crewId, timestamp, [crewId+parametroId+timestamp], nivel',
      series: '++id, [crewId+parametroId+resolucion+inicio], parametroId',
      episodios: '++id, [crewId+parametroId+inicio]',
      baselines: '++id, [crewId+parametroId+epoca]',
      eventos: '++id, crewId, timestamp, severidad',
      colaSync: '++id, prioridad, creadoEn, estado',
      bitacora: '++id, timestamp, actor',
    });
  }
}

export const db = new AegisOfflineDB();

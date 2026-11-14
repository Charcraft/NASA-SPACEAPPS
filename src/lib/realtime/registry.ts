/**
 * Catálogo de parámetros de AEGIS.
 *
 * Dueño: Back 1.
 * Consumidores: `stream-engine.ts` (Back 1), `rules/thresholds.ts` y
 * `db/repositories.ts` (Back 2). Nadie más escribe aquí.
 *
 * Reglas de este archivo:
 * 1. Ningún parámetro sin `fuenteTrazable`.
 * 2. Ningún umbral inventado: si no hay fuente, los límites van en `null` y la
 *    fuente dice `[SUPUESTO]` o `[POR VALIDAR]`.
 * 3. `meshNodeId` es obligatorio, pero puede ser `null` para parámetros
 *    ambientales (CO₂ no tiene malla corporal).
 * 4. Los IDs OSDR se copian tal cual del seed; los simulados van en snake_case.
 */

import type {
  CategoriaParametro,
  MeshNodeId,
  ParameterDefinition,
  TipoDesviacion,
  TipoFrecuenciaParametro,
  ToolAnimationId,
} from '@/types';

// ---------------------------------------------------------------------------
// Fuentes citables
// ---------------------------------------------------------------------------

const FUENTE_OSDR = 'OSDR OSD-575 (rango de referencia incluido en el dataset)';
const FUENTE_FISIO = 'docs/02-investigacion/02-indicadores-fisiologicos.md';
const FUENTE_SUPUESTO = '[SUPUESTO] Pendiente de validación clínica';

/** Intervalo de una muestra de laboratorio: cada 24 h en misión. */
const INTERVALO_LAB_MS = 24 * 60 * 60 * 1000;

/** Intervalo de los signos vitales continuos. */
const INTERVALO_VITAL_MS = 1_000;

interface DefinicionBase {
  categoria: CategoriaParametro;
  frecuencia: TipoFrecuenciaParametro;
  intervaloMs?: number;
  tipoDesviacion: TipoDesviacion;
  meshNodeId: MeshNodeId | null;
  toolAnimationId: ToolAnimationId;
}

function laboratorio(overrides: Pick<ParameterDefinition, 'id' | 'nombre' | 'unidad' | 'rangoReferencia' | 'esDerivado'> & {
  metodo?: string;
}): ParameterDefinition {
  const base: DefinicionBase = {
    categoria: 'bioquimico-osdr',
    frecuencia: 'muestra-discreta',
    intervaloMs: INTERVALO_LAB_MS,
    tipoDesviacion: 'z-score',
    meshNodeId: 'abdomen_hepatic_renal',
    toolAnimationId: 'anim_capillary_analyzer',
  };

  return {
    ...base,
    id: overrides.id,
    nombre: overrides.nombre,
    unidad: overrides.unidad,
    unidadCanonica: overrides.unidad,
    tipoDato: 'escalar',
    esDerivado: overrides.esDerivado,
    metodo: overrides.metodo,
    requiereContexto: false,
    rangoReferencia: overrides.rangoReferencia,
    referenciaPoblacional: {
      min: overrides.rangoReferencia.min,
      max: overrides.rangoReferencia.max,
    },
    fuenteUmbral: FUENTE_OSDR,
    fuenteTrazable: `${FUENTE_OSDR} · src/data/seed/osdr-inspiration4-cmp.json`,
    esDatoRealOSDR: true,
  };
}

// ---------------------------------------------------------------------------
// 17 indicadores reales de OSDR (OSD-575)
// ---------------------------------------------------------------------------

const PARAMETROS_OSDR: readonly ParameterDefinition[] = [
  laboratorio({
    id: 'albumin',
    nombre: 'Albúmina',
    unidad: 'g/dL',
    esDerivado: false,
    rangoReferencia: { min: 3.6, max: 5.1, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'alkaline_phosphatase',
    nombre: 'Fosfatasa alcalina',
    unidad: 'U/L',
    esDerivado: false,
    rangoReferencia: { min: 36.0, max: 130.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'alt',
    nombre: 'ALT (alanina aminotransferasa)',
    unidad: 'U/L',
    esDerivado: false,
    rangoReferencia: { min: 9.0, max: 46.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'ast',
    nombre: 'AST (aspartato aminotransferasa)',
    unidad: 'U/L',
    esDerivado: false,
    rangoReferencia: { min: 10.0, max: 40.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'total_bilirubin',
    nombre: 'Bilirrubina total',
    unidad: 'mg/dL',
    esDerivado: false,
    rangoReferencia: { min: 0.2, max: 1.2, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'calcium',
    nombre: 'Calcio',
    unidad: 'mg/dL',
    esDerivado: false,
    rangoReferencia: { min: 8.6, max: 10.3, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'carbon_dioxide',
    nombre: 'CO₂ total',
    unidad: 'mmol/L',
    esDerivado: false,
    rangoReferencia: { min: 20.0, max: 32.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'chloride',
    nombre: 'Cloruro',
    unidad: 'mmol/L',
    esDerivado: false,
    rangoReferencia: { min: 98.0, max: 110.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'creatinine',
    nombre: 'Creatinina',
    unidad: 'mg/dL',
    esDerivado: false,
    rangoReferencia: { min: 0.6, max: 1.35, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'egfr_african_american',
    nombre: 'eGFR (ajuste afroamericano)',
    unidad: 'mL/min/1.73m²',
    esDerivado: true,
    metodo: 'Ecuación CKD-EPI, ajuste afroamericano',
    rangoReferencia: { min: 60.0, max: null, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'egfr_non_african_american',
    nombre: 'eGFR',
    unidad: 'mL/min/1.73m²',
    esDerivado: true,
    metodo: 'Ecuación CKD-EPI',
    rangoReferencia: { min: 60.0, max: null, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'globulin',
    nombre: 'Globulina',
    unidad: 'g/dL',
    esDerivado: true,
    metodo: 'Proteína total − albúmina',
    rangoReferencia: { min: 1.9, max: 3.7, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'glucose',
    nombre: 'Glucosa',
    unidad: 'mg/dL',
    esDerivado: false,
    rangoReferencia: { min: 65.0, max: 99.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'potassium',
    nombre: 'Potasio',
    unidad: 'mmol/L',
    esDerivado: false,
    rangoReferencia: { min: 3.5, max: 5.3, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'total_protein',
    nombre: 'Proteína total',
    unidad: 'g/dL',
    esDerivado: false,
    rangoReferencia: { min: 6.1, max: 8.1, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'sodium',
    nombre: 'Sodio',
    unidad: 'mmol/L',
    esDerivado: false,
    rangoReferencia: { min: 135.0, max: 146.0, criticoMin: null, criticoMax: null },
  }),
  laboratorio({
    id: 'urea_nitrogen_bun',
    nombre: 'Nitrógeno ureico (BUN)',
    unidad: 'mg/dL',
    esDerivado: false,
    rangoReferencia: { min: 7.0, max: 25.0, criticoMin: null, criticoMax: null },
  }),
];

// ---------------------------------------------------------------------------
// 9 parámetros simulados de tiempo real
// ---------------------------------------------------------------------------

/**
 * Rangos tomados de `docs/02-investigacion/02-indicadores-fisiologicos.md`.
 * El ajuste en vuelo está marcado `[POR VALIDAR]` en ese documento.
 */
const PARAMETROS_SIMULADOS: readonly ParameterDefinition[] = [
  {
    id: 'heart_rate',
    nombre: 'Frecuencia cardíaca',
    unidad: 'bpm',
    unidadCanonica: 'bpm',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: INTERVALO_VITAL_MS,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 50, max: 90, criticoMin: 40, criticoMax: 110 },
    referenciaPoblacional: { min: 60, max: 100 },
    fuenteUmbral: `${FUENTE_FISIO} §1 [POR VALIDAR]`,
    meshNodeId: 'thorax_heart',
    toolAnimationId: 'anim_none',
    fuenteTrazable: `${FUENTE_FISIO} §1`,
    esDatoRealOSDR: false,
  },
  {
    id: 'spo2',
    nombre: 'Saturación de oxígeno (SpO₂)',
    unidad: '%',
    unidadCanonica: '%',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: INTERVALO_VITAL_MS,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 95, max: 100, criticoMin: 90, criticoMax: null },
    referenciaPoblacional: { min: 95, max: 100 },
    fuenteUmbral: `${FUENTE_FISIO} §3`,
    meshNodeId: 'thorax_lungs',
    toolAnimationId: 'anim_pulse_oximeter',
    fuenteTrazable: `${FUENTE_FISIO} §3`,
    esDatoRealOSDR: false,
  },
  {
    id: 'systolic_bp',
    nombre: 'Presión arterial sistólica',
    unidad: 'mmHg',
    unidadCanonica: 'mmHg',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: 60_000,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 90, max: 139, criticoMin: 90, criticoMax: 180 },
    referenciaPoblacional: { min: 90, max: 120 },
    fuenteUmbral: `${FUENTE_FISIO} §2 [POR VALIDAR]`,
    meshNodeId: 'thorax_heart',
    toolAnimationId: 'anim_bp_cuff',
    fuenteTrazable: `${FUENTE_FISIO} §2`,
    esDatoRealOSDR: false,
  },
  {
    id: 'diastolic_bp',
    nombre: 'Presión arterial diastólica',
    unidad: 'mmHg',
    unidadCanonica: 'mmHg',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: 60_000,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 60, max: 89, criticoMin: 60, criticoMax: 120 },
    referenciaPoblacional: { min: 60, max: 80 },
    fuenteUmbral: `${FUENTE_FISIO} §2 [POR VALIDAR]`,
    meshNodeId: 'thorax_heart',
    toolAnimationId: 'anim_bp_cuff',
    fuenteTrazable: `${FUENTE_FISIO} §2`,
    esDatoRealOSDR: false,
  },
  {
    id: 'respiratory_rate',
    nombre: 'Frecuencia respiratoria',
    unidad: 'rpm',
    unidadCanonica: 'rpm',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: INTERVALO_VITAL_MS,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 12, max: 20, criticoMin: 10, criticoMax: 24 },
    referenciaPoblacional: { min: 12, max: 20 },
    fuenteUmbral: `${FUENTE_FISIO} §4`,
    meshNodeId: 'thorax_lungs',
    toolAnimationId: 'anim_none',
    fuenteTrazable: `${FUENTE_FISIO} §4`,
    esDatoRealOSDR: false,
  },
  {
    id: 'core_temperature',
    nombre: 'Temperatura corporal',
    unidad: '°C',
    unidadCanonica: '°C',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: 60_000,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: 36.0, max: 37.3, criticoMin: 35.0, criticoMax: 38.0 },
    referenciaPoblacional: { min: 36.1, max: 37.2 },
    fuenteUmbral: `${FUENTE_FISIO} §5 [POR VALIDAR]`,
    meshNodeId: 'systemic_immune_radiation',
    toolAnimationId: 'anim_none',
    fuenteTrazable: `${FUENTE_FISIO} §5`,
    esDatoRealOSDR: false,
  },
  {
    id: 'intracranial_pressure_est',
    nombre: 'Presión intracraneal estimada',
    unidad: 'mmHg',
    unidadCanonica: 'mmHg',
    categoria: 'biologico-fisico',
    frecuencia: 'tiempo-real-continuo',
    intervaloMs: 5_000,
    tipoDato: 'escalar',
    esDerivado: true,
    metodo: 'Estimación indirecta (ocular/ótica), no invasiva',
    requiereContexto: true,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: null, max: null, criticoMin: null, criticoMax: null },
    referenciaPoblacional: { min: null, max: null },
    fuenteUmbral: FUENTE_SUPUESTO,
    meshNodeId: 'head_neuro_ocular',
    toolAnimationId: 'anim_ocular_fundoscope',
    fuenteTrazable: FUENTE_SUPUESTO,
    esDatoRealOSDR: false,
  },
  {
    id: 'cabin_co2',
    nombre: 'CO₂ parcial en cabina',
    unidad: 'mmHg',
    unidadCanonica: 'mmHg',
    categoria: 'ambiental',
    frecuencia: 'ambiental-cabina',
    intervaloMs: 5_000,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: false,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: null, max: null, criticoMin: null, criticoMax: null },
    referenciaPoblacional: { min: null, max: null },
    fuenteUmbral: FUENTE_SUPUESTO,
    meshNodeId: null,
    toolAnimationId: 'anim_none',
    fuenteTrazable: FUENTE_SUPUESTO,
    esDatoRealOSDR: false,
  },
  {
    id: 'radiation_dose',
    nombre: 'Dosis de radiación acumulada',
    unidad: 'mSv',
    unidadCanonica: 'mSv',
    categoria: 'ambiental',
    frecuencia: 'ambiental-cabina',
    intervaloMs: 60_000,
    tipoDato: 'escalar',
    esDerivado: false,
    requiereContexto: false,
    tipoDesviacion: 'delta-absoluto',
    rangoReferencia: { min: null, max: null, criticoMin: null, criticoMax: null },
    referenciaPoblacional: { min: null, max: null },
    fuenteUmbral: FUENTE_SUPUESTO,
    meshNodeId: 'systemic_immune_radiation',
    toolAnimationId: 'anim_none',
    fuenteTrazable: FUENTE_SUPUESTO,
    esDatoRealOSDR: false,
  },
];

// ---------------------------------------------------------------------------
// Índice
// ---------------------------------------------------------------------------

const TODOS: readonly ParameterDefinition[] = [...PARAMETROS_OSDR, ...PARAMETROS_SIMULADOS];

const INDICE: ReadonlyMap<string, ParameterDefinition> = new Map(
  TODOS.map((parametro) => [parametro.id, parametro]),
);

/** IDs canónicos, en orden de catálogo. */
export const PARAMETER_IDS: readonly string[] = TODOS.map((parametro) => parametro.id);

/** Catálogo completo, inmutable. */
export function list(): readonly ParameterDefinition[] {
  return TODOS;
}

/** Devuelve `undefined` si el ID no existe. */
export function get(id: string): ParameterDefinition | undefined {
  return INDICE.get(id);
}

/**
 * Versión estricta de `get()`. Falla con el mismo mensaje que el catálogo de
 * errores de Back 2 (`E-VAL-002`) para que la UI no tenga dos redacciones.
 */
export function getOrThrow(id: string): ParameterDefinition {
  const parametro = INDICE.get(id);

  if (!parametro) {
    throw new Error(
      `Parámetro «${id}» no existe en el catálogo. Añádelo en registry.ts antes de registrar.`,
    );
  }

  return parametro;
}

export function idsPorCategoria(categoria: CategoriaParametro): readonly string[] {
  return TODOS.filter((parametro) => parametro.categoria === categoria).map(
    (parametro) => parametro.id,
  );
}

/**
 * Verifica las invariantes del catálogo. Se ejecuta en tests y en el arranque
 * del stream-engine, no en cada lectura.
 */
export function validateRegistry(): void {
  if (TODOS.length !== INDICE.size) {
    throw new Error('Catálogo inválido: hay IDs duplicados en registry.ts.');
  }

  for (const parametro of TODOS) {
    if (parametro.fuenteTrazable.trim().length === 0) {
      throw new Error(`Parámetro «${parametro.id}» sin fuenteTrazable.`);
    }

    if (parametro.fuenteUmbral.trim().length === 0) {
      throw new Error(`Parámetro «${parametro.id}» sin fuenteUmbral.`);
    }

    if (parametro.unidad !== parametro.unidadCanonica) {
      throw new Error(
        `Unidad no canónica en «${parametro.id}»: «${parametro.unidad}» ≠ «${parametro.unidadCanonica}».`,
      );
    }

    if (parametro.categoria === 'ambiental' && parametro.requiereContexto) {
      throw new Error(
        `Parámetro ambiental «${parametro.id}» no debe requerir contexto del tripulante.`,
      );
    }

    const { min, max, criticoMin, criticoMax } = parametro.rangoReferencia;

    if (min !== null && max !== null && min > max) {
      throw new Error(
        `Rango invertido en «${parametro.id}»: min ${min} > max ${max}.`,
      );
    }

    if (criticoMin !== null && criticoMax !== null && criticoMin > criticoMax) {
      throw new Error(
        `Rango crítico invertido en «${parametro.id}»: ${criticoMin} > ${criticoMax}.`,
      );
    }
  }
}

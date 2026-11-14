import { get, list } from '@/lib/realtime/registry';

/**
 * Umbrales de evaluación con trazabilidad (Back 2).
 *
 * Este archivo NO inventa cifras: resuelve los umbrales ya declarados en
 * `realtime/registry.ts` (catálogo de Back 1) y expone su procedencia para que
 * `triage.ts` distinga entre umbrales validados y umbrales marcados
 * `[SUPUESTO]` / `[POR VALIDAR]`.
 *
 * Regla de honestidad (AGENTS.md §3): si la fuente no está validada, el campo
 * `fuenteValidada` queda en `false` y `triage` debe tratarlo como degradado.
 */

const ETIQUETAS_NO_VALIDADAS = ['[SUPUESTO]', '[POR VALIDAR]'];

export interface UmbralesEfectivos {
  paramId: string;
  min: number | null;
  max: number | null;
  criticoMin: number | null;
  criticoMax: number | null;
  referenciaPoblacional: { min: number | null; max: number | null };
  fuente: string;
  /** true = fuente validada (OSDR o fuente primaria); false = [SUPUESTO]/[POR VALIDAR]. */
  fuenteValidada: boolean;
}

export function esFuenteValidada(fuente: string): boolean {
  return !ETIQUETAS_NO_VALIDADAS.some((etiqueta) => fuente.includes(etiqueta));
}

/**
 * Resuelve los umbrales efectivos de un parámetro. Devuelve `null` si el ID no
 * existe en el catálogo.
 */
export function obtenerUmbrales(paramId: string): UmbralesEfectivos | null {
  const def = get(paramId);
  if (!def) return null;

  const { min, max, criticoMin, criticoMax } = def.rangoReferencia;

  return {
    paramId: def.id,
    min,
    max,
    criticoMin,
    criticoMax,
    referenciaPoblacional: def.referenciaPoblacional,
    fuente: def.fuenteUmbral,
    fuenteValidada: esFuenteValidada(def.fuenteUmbral),
  };
}

/**
 * Versión estricta: falla si el parámetro no está registrado. Usa el mismo
 * espíritu que `registry.getOrThrow` (E-VAL-002).
 */
export function obtenerUmbralesOrThrow(paramId: string): UmbralesEfectivos {
  const umbrales = obtenerUmbrales(paramId);
  if (!umbrales) {
    throw new Error(
      `Parámetro «${paramId}» no existe en el catálogo. Añádelo en registry.ts antes de registrar.`,
    );
  }
  return umbrales;
}

/**
 * Verifica las invariantes de umbrales en todo el catálogo:
 * - rango de referencia no invertido
 * - rango crítico no invertido
 * - ningún parámetro sin `fuente` (el registry ya lo garantiza, pero se
 *   re-verifica aquí como segunda barrera)
 *
 * Devuelve la lista de violaciones; vacío = catálogo de umbrales íntegro.
 */
export function validarUmbrales(): string[] {
  const errores: string[] = [];

  for (const def of list()) {
    const umbrales = obtenerUmbrales(def.id);
    if (!umbrales) continue;

    const { min, max, criticoMin, criticoMax } = umbrales;

    if (min !== null && max !== null && min > max) {
      errores.push(`${def.id}: rango de referencia invertido (${min} > ${max})`);
    }

    if (criticoMin !== null && criticoMax !== null && criticoMin > criticoMax) {
      errores.push(`${def.id}: rango crítico invertido (${criticoMin} > ${criticoMax})`);
    }

    if (!umbrales.fuente.trim()) {
      errores.push(`${def.id}: umbral sin fuente trazable`);
    }
  }

  return errores;
}

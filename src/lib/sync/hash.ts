/**
 * Hash de integridad para la cola de sincronización diferida (Back 2).
 *
 * NO es criptográfico: es un hash determinista (djb2) encadenado para detectar
 * corrupción o manipulación en la cola. El encadenamiento es `hash(previo | contenido)`,
 * de modo que alterar una entrada invalida todas las posteriores.
 *
 * `contenidoEntrada` serializa solo los campos inmutables de una entrada:
 * `estado` e `intentos` cambian con el tiempo y NO forman parte del hash.
 */

export const GENESIS = 'genesis';

export function contenidoEntrada(
  prioridad: string,
  tipo: string,
  payloadId: number,
  creadoEn: number,
): string {
  return JSON.stringify([prioridad, tipo, payloadId, creadoEn]);
}

export function hashEncadenado(previo: string, contenido: string): string {
  const entrada = `${previo}|${contenido}`;
  let h = 5381;
  for (let i = 0; i < entrada.length; i++) {
    h = ((h << 5) + h + entrada.charCodeAt(i)) >>> 0;
  }
  return `h${h.toString(16)}`;
}

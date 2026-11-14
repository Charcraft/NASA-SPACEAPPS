/**
 * Catálogo de errores de Back 2 (contrato con la UI).
 *
 * Toda falla del backend se lanza como `Back2Error` con un código `E-*` y un
 * mensaje ya redactado para mostrar. La UI no vuelve a redactar: muestra
 * `error.message` tal cual.
 *
 * Fuente: `team/angel_marco/plan-backend-2.md` §5.1.
 */

export type CodigoError =
  | 'E-DB-001'
  | 'E-DB-002'
  | 'E-DB-003'
  | 'E-VAL-001'
  | 'E-VAL-002'
  | 'E-VAL-003'
  | 'E-TRI-001'
  | 'E-TRI-002'
  | 'E-SYN-001'
  | 'E-SYN-002'
  | 'E-API-001'
  | 'E-API-002';

const MENSAJES: Record<CodigoError, string> = {
  'E-DB-001':
    'No se pudo guardar: cuota de IndexedDB llena ({usadoMb} MB). Ejecuta purgarVentana() y reintenta.',
  'E-DB-002':
    'Base de datos bloqueada por otra pestaña. Cierra las demás pestañas de AEGIS y reintenta.',
  'E-DB-003':
    'Esquema incompatible (v{actual} vs v{esperada}). Borra los datos locales desde Ajustes.',
  'E-VAL-001':
    'Medición rechazada para «{parametroId}»: valor {valor} fuera de [{min}, {max}]. Revisa el sensor o corrige la entrada.',
  'E-VAL-002':
    'Parámetro «{parametroId}» no existe en el catálogo. Añádelo en registry.ts antes de registrar.',
  'E-VAL-003':
    'Unidad «{unidad}» no es la canónica de «{parametroId}» (esperada: {unidadCanonica}). Convierte antes de guardar.',
  'E-TRI-001':
    'Umbral de «{parametroId}» sin fuente trazable. Añade fuenteTrazable o marca [SUPUESTO].',
  'E-TRI-002':
    'Sin baseline de «{parametroId}» en época «{epoca}». Se evaluó con referencia poblacional (degradado).',
  'E-SYN-001':
    'Lote {id} rechazado: hash esperado {esperado}, recibido {recibido}. No se reintenta automáticamente.',
  'E-SYN-002':
    'Cola de sincronización corrupta en el ítem {id}. Exporta la cola y reinicia el estado a pendiente.',
  'E-API-001':
    'Respuesta inválida en {ruta}: {detalle}. Se sirvió el fallback local.',
  'E-API-002':
    'Tiempo de espera agotado en {ruta} ({ms} ms). Se sirvió el fallback determinista.',
};

export function mensajeDe(
  codigo: CodigoError,
  detalle: Record<string, string | number> = {},
): string {
  let mensaje = MENSAJES[codigo];
  for (const [clave, valor] of Object.entries(detalle)) {
    mensaje = mensaje.replaceAll(`{${clave}}`, String(valor));
  }
  return mensaje;
}

export class Back2Error extends Error {
  constructor(
    public readonly codigo: CodigoError,
    public readonly detalle: Record<string, string | number> = {},
    public readonly causa?: unknown,
  ) {
    super(mensajeDe(codigo, detalle));
    this.name = 'Back2Error';
  }
}

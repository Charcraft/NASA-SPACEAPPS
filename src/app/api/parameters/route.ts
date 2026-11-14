/**
 * Catálogo de parámetros — Back 1.
 *
 * Única fuente de verdad para la UI y para Back 2. Si el catálogo está roto,
 * el build falla aquí y no en la demo.
 */

import { list, validateRegistry } from '@/lib/realtime/registry';

export const dynamic = 'force-static';
export const revalidate = 3_600;

validateRegistry();

export function GET(): Response {
  const parametros = list();

  return Response.json(
    {
      total: parametros.length,
      osdr: parametros.filter((parametro) => parametro.esDatoRealOSDR).length,
      simulados: parametros.filter((parametro) => !parametro.esDatoRealOSDR).length,
      parametros,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=3600',
      },
    },
  );
}

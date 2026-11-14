## Objetivo

Implementar la capa de datos, las reglas deterministas y las APIs de respaldo.

## Entregables

- [ ] `src/lib/osdr/client.ts`: índice O(1) y `baselinePreVuelo()` sobre `L-92`, `L-44`, `L-3`
- [ ] `src/lib/rules/thresholds.ts`: umbrales con `fuenteTrazable` obligatoria
- [ ] `src/lib/rules/triage.ts`: función pura `evaluar()` con `calidad` y `degradado`
- [ ] `src/lib/db/dexie.ts` + `src/lib/db/repositories.ts`: único punto de escritura
- [ ] `src/lib/db/errors.ts`: catálogo `E-*` con mensajes exactos
- [ ] `src/app/api/osdr/route.ts` y `src/app/api/ai-context/route.ts` con fallback
- [ ] `src/lib/sync/queue.ts`: cola A/B/C/D con hash
- [ ] Tests con Vitest para `rules/`, `db/` y `osdr/`

## Criterio de aceptación

- 17 IDs resueltos sin adaptador; baseline o `null`, nunca `NaN`.
- Cero umbrales sin fuente o etiqueta de honestidad.
- 1.000 frames evaluados sin excepciones y con resultado estable.
- 10.000 inserciones en menos de 500 ms.
- `api/ai-context` responde en menos de 250 ms con `AI_ENABLED=false`.

## Dependencias

- Bloqueado por el scaffold de Back 1 hasta G-B0.
- Requiere contratos congelados (G-B1).
- Revisión de Pineda antes de mergear `rules/`.

## Referencias

- `docs/03-plan/11-arquitectura-backend.md`
- `team/angel_marco/plan-backend-2.md`

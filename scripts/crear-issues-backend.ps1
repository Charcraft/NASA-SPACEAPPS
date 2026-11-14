# crear-issues-backend.ps1
# Crea los dos issues de backend del hackathon.
# Requiere: gh autenticado (gh auth login) y permisos de escritura en el repo.
# Uso:  .\scripts\crear-issues-backend.ps1

$ErrorActionPreference = "Stop"

function Test-Gh {
    try {
        gh auth status 2>$null | Out-Null
    } catch {
        Write-Host "gh no esta autenticado. Ejecuta: gh auth login" -ForegroundColor Red
        exit 1
    }
}

Test-Gh

$back1 = @'
## Objetivo

Dejar el esqueleto del backend listo para que Back 2 trabaje en paralelo: scaffold, contratos compartidos y motor de tiempo real.

## Entregables

- [ ] Scaffold Next 15 + TypeScript estricto + Tailwind v4 (`package.json`, `tsconfig.json`, `next.config.mjs`)
- [ ] `src/types/index.ts` con los 4 contratos congelados (`LecturaEvaluable`, `Evaluacion`, `TelemetrySink`, `ResultadoPersistencia`)
- [ ] `src/lib/realtime/registry.ts` con 17 indicadores OSDR + 9 simulados
- [ ] `src/lib/realtime/stream-engine.ts` a 1 Hz con inyección de anomalías
- [ ] `src/lib/model3d-bridge/contracts.ts`
- [ ] `src/app/api/telemetry/route.ts` (SSE) y `src/app/api/parameters/route.ts`

## Criterio de aceptación

- `pnpm dev` levanta en menos de 5 minutos desde cero.
- `pnpm typecheck` sin errores.
- 60 segundos de stream sin caídas ni frames perdidos.
- Back 2 consume `list()` y `get(id)` sin adaptador.

## Dependencias

- Bloquea a Back 2 hasta que exista el scaffold (G-B0, H0:45).
- Contratos congelados a H2 (G-B1).

## Referencias

- `docs/03-plan/11-arquitectura-backend.md`
- `docs/03-plan/10-reparto-backend.md`
'@

$back2 = @'
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
'@

gh issue create `
    --title "[backend] Scaffold, contratos y motor de tiempo real (Back 1)" `
    --body $back1 `
    --label "area:plataforma" --label "tipo:tarea" --label "prio:crítica" --label "hackathon" `
    --assignee "@me"

gh issue create `
    --title "[backend] Datos, triage y persistencia (Back 2)" `
    --body $back2 `
    --label "area:datos" --label "area:reglas" --label "tipo:tarea" --label "prio:crítica" --label "hackathon"

Write-Host ""
Write-Host "Issues creados. Verifica en GitHub Projects." -ForegroundColor Green

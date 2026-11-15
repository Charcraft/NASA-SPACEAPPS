## Objetivo

Dejar el esqueleto del backend listo para que Back 2 trabaje en paralelo: scaffold, contratos compartidos, motor de tiempo real y sala de tripulación compartida.

## Entregables

- [x] Scaffold Next 15 + TypeScript estricto + Tailwind v4 (`package.json`, `tsconfig.json`, `next.config.mjs`)
- [x] `src/types/index.ts` con los contratos congelados (`LecturaEvaluable`, `Evaluacion`, `TelemetrySink`, `ResultadoPersistencia`)
- [x] `src/lib/realtime/registry.ts` con 17 indicadores OSDR + 9 simulados
- [x] `src/lib/realtime/stream-engine.ts` a 1 Hz con inyección de anomalías
- [x] `src/lib/model3d-bridge/contracts.ts`
- [x] `src/lib/realtime/crew-hub.ts` + `api/telemetry` (SSE de alertas de tripulación)
- [x] `src/app/api/parameters/route.ts`

## Criterio de aceptación

- `pnpm dev` levanta en menos de 5 minutos desde cero.
- `pnpm typecheck` y `pnpm build` sin errores.
- 60 segundos de stream sin caídas ni frames perdidos.
- Una alerta de un tripulante aparece en la sala de los demás en menos de 2 s.
- Back 2 consume `list()` y `get(id)` sin adaptador.

## Dependencias

- Bloquea a Back 2 hasta que exista el scaffold (G-B0, H0:45).
- Contratos congelados a H2 (G-B1).

## Referencias

- `docs/03-plan/11-arquitectura-backend.md`
- `docs/03-plan/10-reparto-backend.md`

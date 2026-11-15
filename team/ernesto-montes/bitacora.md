# Bitácora de Ernesto Montes García

> **Append-only.** Solo tú escribes aquí. Añade un bloque al final cada vez que cierras una sesión de trabajo.
> Sirve para tres cosas: que no pierdas el hilo, que el equipo sepa en qué vas, y que el domingo puedas reconstruir qué pasó.

---

## Formato

```
## YYYY-MM-DD · HH:MM — Título corto

**Hice:** ...
**Siguiente:** ...
**Bloqueos:** ... (o "ninguno")
**Issue(s):** #12, #15
**Rama:** feat/usuario/nombre
```

---

## Ejemplo (bórralo cuando escribas el tuyo)

```
## 2026-11-10 · 18:30 — Primer dataset normalizado

**Hice:** Descargué la serie de glucosa de OSDR y la dejé en src/data/seed/glucosa.json
**Siguiente:** Escribir el script de normalización para que sea reproducible
**Bloqueos:** ninguna
**Issue(s):** #8
**Rama:** data/cxrlosmp/osdr-glucosa
```

---

## Registro

## 2026-11-14 · 18:20 — Merge Back 1 + Back 2, sync layer y runtime

**Hice:**
- Merge de `feat/back2-osdr-baseline` en `feat/back1-realtime-architecture` (sin conflictos de archivos; `types/index.ts` fusionado con la versión extendida de Angel).
- Corregí la invariante en `docs/03-plan/11-arquitectura-backend.md` §3: `rules/` sí importa `registry.ts` y `osdr/client.ts`.
- Renombré la rama a `feat/back1-realtime-architecture`.
- Implementé la capa de sync: `src/lib/sync/queue.ts` (cola A/B/C/D, hash encadenado, ACK/rechazo, reintentos), `aggregate.ts` (1 Hz → 1 min → 1 h) y `transport.ts` (`SyncTransport` + stub local).
- Implementé `src/lib/runtime.ts` (composition root: motor + evaluar + baseline + sink) y `src/lib/realtime/osdr-replay-source.ts` (replay real R+1→R+194 en 60 s).
- Migré `sala-control.tsx` al runtime y añadí panel de estado de sync.
- Corregí `repositories.test.ts` para la `LecturaFrame` extendida.

**Siguiente:** cablear `api/osdr` y `api/ai-context` (Back 2); demo de 3 min con WiFi apagado.

**Bloqueos:** ninguno (push a GitHub falló temporalmente por red; resuelto al reintentar).

**Issue(s):** #2 (Back 1), #3 (Back 2)

**Rama:** feat/back1-realtime-architecture

## 2026-11-14 · 19:40 — Fix SyncStatus y limpieza de demo muerto (pedido de Angel)

**Hice:**
- `transport.ts`: expuse `EstadoRed`, `estadoRed()` y `onCambioRed()` en la interfaz `SyncTransport`; quité el simulador aleatorio de red (interfería con la demo offline real).
- `sala-control.tsx`: `SyncStatus` ahora se suscribe a `onCambioRed` y lee `estadoRed()` en vez de acceder al campo privado `transport['estado']`.
- Eliminé `demo/baseline.ts` y `demo/evaluador.ts` (código muerto; el runtime ya usa `evaluar` y `baselinePreVuelo` reales de Back 2).

**Siguiente:** PWA (manifest + service worker + iconos) y decidir arquitectura de la BD central.

**Bloqueos:** ninguno.

**Issue(s):** #2 (Back 1)

**Rama:** feat/integracion-back

## 2026-11-14 · 19:58 — PWA oficial y traspaso de protocolos a Back 2

**Hice:**
- PWA completa: `public/manifest.webmanifest`, `public/sw.js` (app-shell cache-first, `/api/*` network-first, SSE sin cache), iconos `public/icons/icon-192.png` + `icon-512.png`.
- `scripts/generar-iconos-pwa.py` genera los PNG desde el diseño de `proyecto.ico`.
- `src/app/layout.tsx`: metadatos PWA + registro del SW solo en producción + corregí el mojibake.
- `next.config.mjs`: headers para `sw.js` y `manifest.webmanifest`.
- Traspaso a Angel: `docs/03-plan/12-protocolos-medicos.md` (contrato de `/api/protocolos`).

**Siguiente:** BD central + sync tripulación/Tierra (decisión de arquitectura pendiente); que Angel implemente los protocolos.

**Bloqueos:** ninguno.

**Issue(s):** #2 (Back 1)

**Rama:** feat/integracion-back

## 2026-11-14 · 21:05 — Entornos de misión, central persistente y transporte real

**Hice:**
- Tres entornos (`nave`, `estacion`, `base-lunar`): `EntornoMision` + campo `entornos` + `listarPorEntorno()`.
- `docs/02-investigacion/06-entornos-mision.md` (trazabilidad HRP/OSDR).
- Central persistente: snapshot en `data/central/` con restauración al arrancar.
- Transporte real: `HttpSyncTransport` → `POST /api/tierra` (MCC local).
- Replay al reconectar: flush inmediato al evento `online`.
- Eliminé la incoherencia §8.1/§8.2/§9 vs D31.

**Siguiente:** que Angel implemente protocolos; reconciliación de `sincronizadoTierra` (Back 2); front real (Pineda).

**Bloqueos:** ninguno.

**Issue(s):** #2 (Back 1)

**Rama:** feat/integracion-back

## 2026-11-14 · 21:48 — Revisión e incorporación de Back 2 (reconciliación + sexo)

**Hice:**
- Revisé los 4 commits de Angel y aprobé: `marcarSincronizadoPorFrame` (reconciliación) + rangos por sexo (creatinina).
- Merge limpio en `feat/integracion-back` sin conflictos.

**Verifiqué:** `pnpm typecheck` (0), `pnpm test` (70/70), `pnpm build` (8 rutas).

**Siguiente:** front real (Pineda): semáforo, 3D, IA, emergencia. Contrato en `.opencode/plan/14-contrato-integracion-front.md`.

**Bloqueos:** ninguno.

**Issue(s):** #2 (Back 1)

**Rama:** feat/integracion-back

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

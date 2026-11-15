# 05.3 · Registro de uso de IA (SI)

> **Documento obligatorio.** Alimenta directamente la declaración de SI que exige el submission.
> Se llena **mientras se usa**, no al final. Si no está aquí, no pasó.

---

## Bitácora cruda (registro personal)

Además de este registro resumido, el equipo mantiene transcripciones completas de las sesiones de trabajo con IA en la carpeta:

```
Uso de IA-Personal/
├── Prompt1.md      conversación de arranque (investigación + plan inicial)
└── PromptN.md      sesiones siguientes, una por archivo
```

**Qué es:** evidencia literal de qué se le pidió a la IA y qué respondió. Sirve para auditoría interna y para completar la declaración de SI con precisión.
**Qué no es:** documentación del proyecto. La documentación vive en `docs/`.

---

## Formato de entrada

```
### IA-XXX · Título corto
- **Fecha/hora:**
- **Quién:**
- **Herramienta / modelo:**
- **Categoría:** investigación | código | documentación | diseño | datos | video
- **Prompt usado:** P0X (o "ad hoc")
- **Propósito:**
- **Resultado obtenido:**
- **Validación:** cómo se comprobó + por quién
- **Estado:** [VERIFICADO] | [POR VALIDAR] | [DESCARTADO]
```

---

## Entradas

### IA-001 · Investigación del reto y del marco HRP
- **Fecha/hora:** 2026-11-06
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA con búsqueda web + navegador automatizado (BrowserAct)
- **Categoría:** investigación
- **Prompt usado:** ad hoc (extracción y contraste de fuentes oficiales)
- **Propósito:** obtener el texto oficial del reto, las reglas del evento, el marco de los 5 peligros y el catálogo de datos disponibles.
- **Resultado obtenido:** síntesis del reto, tabla de requisitos, 5 peligros con mecanismos fisiológicos, mapa de fuentes de datos.
- **Validación:** cada dato se contrastó contra la fuente oficial citada en `docs/02-investigacion/04-bibliografia.md`. El video del reto se transcribió del original (no se resumió de memoria).
- **Estado:** [VERIFICADO]

---

### IA-002 · Extracción de la transcripción del video del reto
- **Fecha/hora:** 2026-11-06
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** `yt-dlp` (herramienta determinista, no generativa)
- **Categoría:** investigación
- **Prompt usado:** n/a
- **Propósito:** obtener las palabras exactas del autor del reto (Agencia Espacial Brasileña).
- **Resultado obtenido:** transcripción completa de 3:06 min con la escena del dolor torácico y los requisitos implícitos (R6–R10).
- **Validación:** la transcripción es la fuente primaria; se cita como B02.
- **Estado:** [VERIFICADO]

---

### IA-003 · Redacción de la estructura documental del proyecto
- **Fecha/hora:** 2026-11-06
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA (OpenCode) con acceso al repositorio
- **Categoría:** documentación
- **Prompt usado:** ad hoc — generación de la estructura de carpetas y de los documentos base.
- **Propósito:** crear un sistema documental profesional (AGENTS, MEMORY, TECH-STACK, investigación, plan, equipo, IA).
- **Resultado obtenido:** 20 documentos en `docs/`, más los tres archivos raíz.
- **Validación:** revisión línea por línea contra las fuentes ya verificadas. Las cifras fisiológicas quedaron marcadas `[POR VALIDAR]` a propósito.
- **Estado:** [VERIFICADO] (estructura) / [POR VALIDAR] (todas las cifras clínicas)

---

### IA-004 · Identificación del horario real de entrega
- **Fecha/hora:** 2026-11-06
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** navegador automatizado + lectura de la página del Local Event
- **Categoría:** investigación / planificación
- **Prompt usado:** n/a
- **Propósito:** confirmar el cronograma del evento local.
- **Resultado obtenido:** el envío cierra **17:00 del domingo**, no 23:59 como dice la FAQ global.
- **Validación:** leído directamente del calendario oficial del Local Event (B06). Cambió todo el plan de ejecución.
- **Estado:** [VERIFICADO]

---

### IA-005 · Selección de stack y arquitectura
- **Fecha/hora:** 2026-11-06
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA
- **Categoría:** código / arquitectura
- **Prompt usado:** ad hoc — restricciones del evento como entrada (30 h, offline, 5 personas).
- **Propósito:** elegir un stack que no consuma tiempo de aprendizaje durante el hackathon.
- **Resultado obtenido:** `TECH-STACK.md` con Next.js + Tailwind + Dexie + Recharts y una lista explícita de lo que **no** se va a usar.
- **Validación:** requiere confirmación del equipo el **2026-11-12** según el perfil real de cada integrante.
- **Estado:** [POR VALIDAR]

---

### IA-006 · Auditoría y saneamiento de textos rotos (mojibake) e integridad
- **Fecha/hora:** 2026-11-13 21:40
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA (Gemini 3.8 Flash High)
- **Categoría:** documentación / código
- **Prompt usado:** "revisa los textos rotos y arregelalos, de paso tambien lee el proyecto y analizalo"
- **Propósito:** auditar y solucionar problemas de codificación de caracteres, enlaces rotos e integridad general antes del kickoff.
- **Resultado obtenido:** reparación de 10 archivos en `team/` con mojibake por Windows-1252, corrección de `scripts/setup-integrante.ps1`, corrección de enlaces y tipografía en `skills/` y `context.md`.
- **Validación:** comprobación automatizada de caracteres, `git diff` y ejecución de `.\scripts\verificar-docs.ps1` (0 errores).
- **Estado:** [VERIFICADO]

---

### IA-007 · Segunda auditoría de estado y corrección de scripts de aprovisionamiento
- **Fecha/hora:** 2026-11-13 22:55
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA (Gemini 3.8 Flash High)
- **Categoría:** código / documentación
- **Prompt usado:** "vuelve a revisar todo el estado y corrige lo dañado"
- **Propósito:** auditoría integral de scripts de instalación, exclusiones de Git, validación JSON y asignación de CODEOWNERS.
- **Resultado obtenido:** corrección de lectura/escritura UTF-8 en `instalar-todo.ps1` e `instalar-todo.sh`, exclusión de caché de Python en `.gitignore`, asignación directa de carpetas de equipo en `.github/CODEOWNERS`, y eliminación de falsos enlaces rotos.
- **Validación:** ejecución exitosa de `instalar-todo.ps1`, `explorar-osdr.py`, `normalizar-osdr.py`, y `verificar-docs.ps1` (0 errores).
- **Estado:** [VERIFICADO]

---

### IA-008 · Reparto de tareas Backend 1 / Backend 2
- **Fecha/hora:** 2026-11-14 15:47
- **Quién:** Angel Marco Martínez Cobos (@angel_marco)
- **Herramienta / modelo:** agente de IA (deepseek-flash)
- **Categoría:** documentación
- **Prompt usado:** ad hoc
- **Propósito:** convertir `BRIEF-BACKEND-AGENTES.md` en un reparto de archivos y contratos sin duplicar dueños.
- **Resultado obtenido:** `docs/03-plan/10-reparto-backend.md` y `team/angel_marco/plan-backend-2.md`; detección de 10 archivos inexistentes y del desajuste 17 vs 19 indicadores.
- **Validación:** contraste con `git ls-tree`, `git status` y el JSON del seed; pendiente de revisión de Back 1 y Pineda.
- **Estado:** [POR VALIDAR]

---

### IA-009 · Merge Back 1 + Back 2, cableado y capa de sync
- **Fecha/hora:** 2026-11-14 18:20
- **Quién:** Ernesto Montes García (@ernesto-montes)
- **Herramienta / modelo:** agente de IA (deepseek)
- **Categoría:** arquitectura / código
- **Prompt usado:** "continúa con el flujo de trabajo", "resuelve los conflictos", "continuar con la implementación del cableado y la capa"
- **Propósito:** fusionar `feat/back2-osdr-baseline` en `feat/back1-realtime-architecture`, corregir la invariante `rules/`, y construir la capa de sincronización + composition root de Back 1.
- **Resultado obtenido:** merge sin conflictos de archivos; corrección de la invariante en `docs/03-plan/11-arquitectura-backend.md` §3; nuevos archivos `src/lib/sync/{queue,aggregate,transport}.ts`, `src/lib/runtime.ts` y `src/lib/realtime/osdr-replay-source.ts`; `sala-control.tsx` migrado a `runtime`; `repositories.test.ts` corregido para `LecturaFrame` extendida.
- **Validación:** `pnpm typecheck` limpio, `pnpm test` 41/41, `pnpm build` 4 rutas.
- **Estado:** [VERIFICADO]

---

### IA-010 · Implementación del backend Back 2 (cliente OSDR, reglas, persistencia y APIs)
- **Fecha/hora:** 2026-11-14 17:56
- **Quién:** Angel Marco Martínez Cobos (@angel_marco)
- **Herramienta / modelo:** agente de IA (OpenCode · deepseek-v4-pro)
- **Categoría:** código
- **Prompt usado:** ad hoc — implementar las tareas de Back 2 según `team/angel_marco/plan-backend-2.md`.
- **Propósito:** construir la capa de datos y reglas deterministas de AEGIS (Back 2), sin red, sin DB remota y sin IA crítica.
- **Resultado obtenido:** `osdr/client.ts` (baseline pre-vuelo + fuera de rango), `rules/thresholds.ts`, `rules/triage.ts` (`evaluar`), `db/{errors,types,dexie,repositories}.ts`, `ai/snapshot.ts`, `api/osdr` y `api/ai-context`. 61 tests propios (la capa `sync/*` de Back 2 quedó absorbida por la de Back 1 en el merge).
- **Validación:** `pnpm test` (61/61) y `pnpm typecheck` (0 errores). Umbrales OSDR contrastados 1:1 contra `src/data/seed/osdr-inspiration4-cmp.json`; 24 lecturas fuera de rango verificadas con script. Pendiente revisión de Pineda (regla `rules/`) y merge.
- **Estado:** [POR VALIDAR]

---

### IA-011 · Fix de SyncStatus (estado de red reactivo) y limpieza de demo muerto
- **Fecha/hora:** 2026-11-14 19:38
- **Quién:** Ernesto Montes García (@ernesto-montes)
- **Herramienta / modelo:** agente de IA (deepseek)
- **Categoría:** código
- **Prompt usado:** ad hoc — "corrige esto en mi rama" (observaciones de Angel Marco para la demo).
- **Propósito:** corregir el badge "Red" del panel SyncStatus (no se actualizaba al apagar WiFi) y eliminar `demo/baseline.ts` y `demo/evaluador.ts` (código muerto).
- **Resultado obtenido:** `transport.ts` expone `EstadoRed`, `estadoRed()` y `onCambioRed()` en la interfaz `SyncTransport`; se quitó el simulador aleatorio de red (interfería con la demo offline real). `sala-control.tsx` se suscribe a `onCambioRed` y lee `estadoRed()` en vez de acceder al campo privado. Se eliminaron los 2 archivos demo muertos.
- **Validación:** `pnpm typecheck` (0 errores), `pnpm test` (49/49) y `pnpm build` (6 rutas).
- **Estado:** [VERIFICADO]

---

### IA-012 · PWA oficial (offline-first) y traspaso de protocolos a Back 2
- **Fecha/hora:** 2026-11-14 19:56
- **Quién:** Ernesto Montes García (@ernesto-montes)
- **Herramienta / modelo:** agente de IA (deepseek)
- **Categoría:** código
- **Prompt usado:** ad hoc — "modifica lo necesario para la versión oficial offline y enlace con el front; indica a Angel lo que debe realizar; cambia carpetas/arquitectura para el PWA".
- **Propósito:** implementar la PWA oficial (manifest, service worker, iconos, registro) y dejar el contrato de protocolos médicos para Back 2.
- **Resultado obtenido:** `public/manifest.webmanifest`, `public/sw.js` (app-shell cache-first, `/api/*` network-first, SSE sin cache), iconos 192/512 generados por `scripts/generar-iconos-pwa.py`, `layout.tsx` con metadatos PWA y registro del SW en producción, `next.config.mjs` con headers. Documento de traspaso `docs/03-plan/12-protocolos-medicos.md` con el contrato de `/api/protocolos`.
- **Validación:** `pnpm typecheck` (0 errores), `pnpm test` (49/49) y `pnpm build` (7 rutas).
- **Estado:** [VERIFICADO]

---

### IA-013 · Implementación de protocolos médicos (Back 2)
- **Fecha/hora:** 2026-11-14 20:15
- **Quién:** Angel Marco Martínez Cobos (@angel_marco)
- **Herramienta / modelo:** agente de IA (OpenCode · deepseek-v4-pro)
- **Categoría:** código
- **Prompt usado:** ad hoc — "investiga fuentes oficiales y escribe los protocolos en lenguaje simple para tripulación no médica".
- **Propósito:** construir la capa de protocolos médicos (datos + cliente + API) según el contrato congelado de `docs/03-plan/12-protocolos-medicos.md`.
- **Resultado obtenido:** `src/data/knowledge/protocolos.json` (4 protocolos: cardiorrespiratorio, hipercapnia, radiación, metabólico), `src/lib/knowledge/client.ts` (`protocoloPara`/`listarProtocolos`), `src/app/api/protocolos/route.ts`. 8 tests.
- **Validación:** `pnpm typecheck` (0 errores), `pnpm test` (57/57), `pnpm build` (8 rutas). Fuentes: NASA HRP (página de hazards verificada) y OSDR OSD-575; pasos redactados en lenguaje simple y adaptados, marcados `[POR VALIDAR]` con `validado: false`.
- **Estado:** [POR VALIDAR] (contenido médico adaptado, pendiente de validación clínica)

---

### IA-014 · Entornos de misión, central persistente y transporte real
- **Fecha/hora:** 2026-11-14 21:05
- **Quién:** Ernesto Montes García (@ernesto-montes)
- **Herramienta / modelo:** agente de IA (deepseek)
- **Categoría:** código
- **Prompt usado:** ad hoc — "adaptar a entornos con HRP/OSDR, incorporar las 3 piezas, eliminar la incoherencia".
- **Propósito:** adaptar AEGIS a tres entornos (nave/estación/base-lunar) con trazabilidad HRP, implementar persistencia del central, transporte real a Tierra y replay al reconectar, y eliminar la incoherencia documental.
- **Resultado obtenido:** `EntornoMision` + campo `entornos` en el catálogo; `docs/02-investigacion/06-entornos-mision.md`; snapshot durable en `crew-hub`; `HttpSyncTransport` → `POST /api/tierra`; flush inmediato al reconectar; §8.1/§8.2/§9 de la arquitectura alineados con D31.
- **Validación:** `pnpm typecheck` (0 errores), `pnpm test` (49/49), `pnpm build` (7 rutas).
- **Estado:** [VERIFICADO]

---

## Resumen por categoría

| Categoría | Usos registrados | Verificados |
|---|---|---|
| Investigación | 3 | 3 |
| Documentación | 3 | 2 |
| Arquitectura / código | 9 | 6 |
| Diseño | 0 | 0 |
| Datos | 0 | 0 |
| Video | 0 | 0 |
| **Total** | **15** | **11** |

---

## Qué se reporta al submission

De este registro se derivan las 4 afirmaciones de `04-declaracion-si-submission.md`:

1. Herramientas usadas: agente de IA con búsqueda y navegador automatizado, herramientas deterministas de transcripción.
2. Uso principal: investigación, contraste de fuentes y documentación.
3. Validación: contraste contra fuentes primarias oficiales, con fecha de consulta.
4. No delegado: decisiones de alcance, criterio clínico y validación final.

---

## Recordatorio

Si durante el hackathon alguien usa IA y no lo anota aquí, **la declaración del submission queda incompleta y el equipo pierde credibilidad**. Anotarlo toma 30 segundos.

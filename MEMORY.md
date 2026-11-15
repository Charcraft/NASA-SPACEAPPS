# MEMORY.md — Memoria operativa del proyecto

> Registro vivo del estado del proyecto. Se actualiza al final de cada sesión de trabajo.
> **Última actualización:** 2026-11-14

---

## Estado actual

| Campo | Valor |
|---|---|
| Fecha | **Viernes 13 de noviembre de 2026** |
| Días para el hackathon | **1** (evento: 2026-11-14, 09:00) |
| Fase | Recursos oficiales recibidos · adaptación final |
| Proyecto enviado | No (0 de 1) |
| Repositorio público | ✅ https://github.com/Charcraft/NASA-SPACEAPPS |
| Equipo cerrado | Sí — 5 integrantes, cupo local lleno |
| Challenge confirmado | Sí — Health Monitoring Software |

---

## Hechos verificados

- **Los recursos oficiales del reto se publicaron el 2026-11-13.** Contienen **solo documentación**: 3 enlaces de NASA HRP y 2 de la CSA. **Ningún dataset.**
- El demo del submission debe ser de **30 segundos máximo** (o 7 diapositivas). Excederlo descalifica de la fase global.
- El submission completo debe estar **en inglés**. El video puede ir en español **solo con subtítulos en inglés**.
- Son **10 premios globales**. El puntaje real son **5 criterios de 1 a 5**: Impact, Creativity, Validity, Relevance, Presentation.
- El contenido generado por SI (imágenes/video) requiere **marca de agua visible** y no puede incluir branding de NASA.
- Se puede **editar y reenviar** el proyecto hasta el fin del hackathon; solo cuenta la última versión guardada.

- La cuenta del equipo está registrada desde el **2026-09-08**.
- Equipo **ROCKET** (`team-rocket13`), Local Event **Tuxtla Gutiérrez**.
- El Local Event es **presencial** en **EcoCity Hotel**, Blvd. Belisario Domínguez 1380, Tuxtla Gutiérrez, Chiapas.
- Límite de equipo en el evento local: **5 personas**. Ya están las 5. No se puede sumar nadie más sin salir del evento local.
- **Envío de proyecto local: domingo 15 de noviembre, 17:00 h.** El pitch de semifinalistas empieza 17:30.
- Los **recursos oficiales del reto se publican el viernes 13 de noviembre**. Antes de eso no hay datasets oficiales del challenge.
- La FAQ oficial prohíbe trabajar en el reto antes del evento.
- El submission debe incluir **declaración de uso de SI (IA)**.
- Premios globales 2026: Best Use of Hardware · Best Use of Data · Most Inspiring · Galactic Impact · Best Mission Concept · People's Choice.

---

## Decisiones tomadas

| # | Decisión | Fecha | Motivo |
|---|---|---|---|
| D1 | Enfocar el producto en **dos modos: rutina y emergencia** | 2026-11-06 | El video del reto abre con un infarto; ahí está la diferenciación |
| D2 | **Offline-first (PWA + IndexedDB)** | 2026-11-06 | A mitad de camino a Marte no hay nube; además el venue puede fallar |
| D3 | Apuntar a **Best Use of Data** y **Galactic Impact** | 2026-11-06 | Es donde este concepto es competitivo |
| D4 | Semana previa = investigación y decisiones, **cero código de producto** | 2026-11-06 | Cumplimiento de reglas de Space Apps |
| D5 | Línea base **personal**, no rangos poblacionales | 2026-11-06 | Más honesto fisiológicamente en microgravedad |
| D6 | **Orca no es multiusuario.** El punto de unión es GitHub | 2026-11-06 | Verificado en Orca v1.4.243: no existe proyecto compartido ni edición concurrente |
| D7 | Cada integrante trabaja en **su máquina** con **su harness** | 2026-11-06 | Menos acoplamiento, menos puntos de fallo |
| D8 | Un archivo, un dueño. Append-only en compartidos | 2026-11-06 | Evita el 90 % de los conflictos de merge |
| D9 | Tablero en **GitHub Projects**, no en Trello/Notion | 2026-11-06 | Ya está donde vive el código; cero logins extra |
| D10 | **OSDR pasa a ser plan A**, no plan B | 2026-11-13 | El paquete oficial no trae datasets; sin datos reales, *Relevance* queda débil |
| D11 | Demo de **30 s** en español con subtítulos en inglés | 2026-11-13 | Límite oficial; superar el video descalifica |
| D12 | **Cero imágenes generadas por IA** en el demo | 2026-11-13 | Evita la marca de agua obligatoria y el riesgo de branding de NASA |
| D13 | README en **inglés** (`README.md`) y español en `README.es.md` | 2026-11-13 | Todo el material enlazado al submission debe estar en inglés |
| D14 | **Dos ventanas de envío**: 16:30 para el pitch, 21:00–23:00 opcional | 2026-11-13 | El sitio permite reenviar; el Local Event cierra a las 17:00 |
| D15 | Dataset elegido: **OSDR OSD-575** (panel metabólico de Inspiration4) | 2026-11-13 | Datos humanos reales de vuelo, con rangos de referencia incluidos y línea base pre-vuelo |
| D16 | Maletín de **24 skills** versionado en el repo | 2026-11-13 | Que los agentes de todos carguen las mismas capacidades, sin depender de la máquina de cada quien |
| D17 | Formulario de reparto **autoevaluado en HTML** | 2026-11-13 | Calcula el rol con pesos y preferencia; no depende de Google ni de internet |
| D18 | **Google Form publicado** para recolectar las respuestas | 2026-11-13 | Es lo más fácil de compartir con 4 personas; el cálculo se hace a mano |
| D19 | El navegador se guarda como **NASA-BROWSER** con sesión de Google activa | 2026-11-13 | Es el navegador por defecto para cualquier búsqueda o trámite del proyecto |
| D20 | **Onboarding autoinstalable**: `ONBOARDING.md` + `instalar-todo` + `BIENVENIDA.md` por integrante | 2026-11-13 | Cualquier agente que clone el repo instala, pregunta quién eres y arranca el trabajo sin explicaciones |
| D21 | **Un navegador BrowserAct por persona**, nunca compartido | 2026-11-13 | Sesiones de Google y GitHub son privadas; compartir uno rompe trazabilidad y desconecta sesiones |
| D22 | **Protocolo documental obligatorio** + verificación automática de documentos huérfanos | 2026-11-13 | Que ningún agente cierre una tarea sin registrar decisiones, fuentes, IA y archivos |
| D23 | **Roles definitivos** asignados con las 5 respuestas del formulario | 2026-11-13 | Eduardo=Producto/Video/Submission · Pineda=Frontend/IA · Angel=Reglas/Tests · Carlos A.=Datos · Ernesto=Plataforma |
| D24 | Reparto Backend: **Back 1** = motor realtime, registry, bridge 3D, `types` y scaffold; **Back 2 (Angel)** = OSDR client, Dexie/repositorios, reglas/triage, APIs `osdr` y `ai-context`, tests | 2026-11-14 | El brief asumía archivos ya creados que no existen; se reparte por dominio para evitar conflictos |
| D25 | Corregir el brief: **17 indicadores OSDR**, no 19; `meshNodeId` nullable para parámetros ambientales | 2026-11-14 | Verificado contra `src/data/seed/osdr-inspiration4-cmp.json` |
| D26 | **Vitest como `devDependency`**, excepción registrada al congelamiento del stack | 2026-11-14 | Sin runner de TS no hay pruebas de `rules/`; no entra al bundle de producción. Ver `TECH-STACK.md` §9 |
| D27 | **`repositories.ts` es el único punto de escritura en Dexie**; Back 1 solo emite por `TelemetrySink` | 2026-11-14 | Evita doble escritura y filas duplicadas en la demo |
| D28 | Contratos compartidos (`types/index.ts`) **congelados a H2**; cambios solo por PR | 2026-11-14 | Un contrato que cambia en vivo rompe el build y la demo |
| D29 | **Roles backend cerrados:** Ernesto = Back 1, Angel = Back 2 | 2026-11-14 | Elimina la ambigüedad que dejó el brief y evita dos planes para el mismo frente |
| D30 | **TypeScript fijado en 6.x y `next.config.mjs`** en lugar de `next.config.ts` | 2026-11-14 | Next 15 falla con el compilador nativo de TS 7 (`fileExists` undefined) y rechaza el build: "TypeScript 7.0.2 is not supported". TS 6 es la versión que Next recomienda |
| D31 | **Local-first + sala compartida en vivo (SSE) + sincronización diferida a Tierra.** Sustituye el "sin réplica entre astronautas" del 2026-11-14 | 2026-11-14 | El hub en memoria permite ver la alerta de otro tripulante en < 2 s sin exigir una base central durable. Ver §8 de `11-arquitectura-backend.md` |
| D32 | **Alcance físico únicamente:** 26 parámetros físicos/bioquímicos. Sueño, ánimo y carga cognitiva quedan para fase posterior | 2026-11-14 | Evita inventar escalas clínicas y mantiene la demo enfocada |
| D33 | **El hub de sala no persiste:** estado en memoria del proceso. Lo durable vive en Dexie y `colaSync` | 2026-11-14 | Un backend durable en 30 h no es viable; el hub demuestra el contrato y se reinicia sin pérdida clínica |
| D34 | **Proveedores `[DEMO]` inyectables** (`demo/baseline.ts`, `demo/evaluador.ts`, `demo/sensor-source.ts`) hasta que Back 2 entregue `osdr/` y `rules/` | 2026-11-14 | Permite una demo funcional hoy sin duplicar archivos de Back 2; el reemplazo es una línea en `sala-control.tsx` |
| D35 | **`sync/` pasa a Back 1** (Ernesto): `queue.ts`, `aggregate.ts`, `transport.ts` | 2026-11-14 | La cola y el transporte dependen del frame de Back 1; Back 2 ya cubre `db/`, `rules/` y APIs. Evita solapar frentes |
| D36 | **Invariante corregida:** `rules/` **sí importa `registry.ts` y `osdr/client.ts`**; sigue sin importar `db/`, `stream-engine` ni `ai/` | 2026-11-14 | `thresholds.ts` resuelve umbrales desde el catálogo en vez de duplicar los 26; pedido de Angel y aceptado |
| D37 | **`runtime.ts` es el composition root de Back 1**: arranca motor, suscribe sink (DB + sync + agregación) y expone `start()/stop()` | 2026-11-14 | Sin un único punto de arranque, el pipeline no se ejecuta y la UI no puede alternar simulado/replay |
| D38 | **PWA oficial (no demo)**: `manifest.webmanifest`, `sw.js`, iconos 192/512 y registro solo en producción | 2026-11-14 | Versión oficial offline-first; el SW cachea app-shell y `/api/*` con network-first. Se descarta Vercel: app local + BD central |
| D39 | **Protocolos médicos → Back 2 (Angel)**: `data/knowledge/`, `lib/knowledge/`, `api/protocolos` y mapeo en triage. Contrato en `docs/03-plan/12-protocolos-medicos.md` | 2026-11-14 | Son datos + reglas + API (dominio Back 2); Back 1 ya cachea `/api/protocolos` en el SW |
| D40 | **Tres entornos de misión**: `nave`, `estacion`, `base-lunar`. Campo `entornos` en `ParameterDefinition` + `listarPorEntorno()` | 2026-11-14 | Cada entorno tiene exposición distinta a los 5 peligros del HRP; trazabilidad en `docs/02-investigacion/06-entornos-mision.md` |
| D41 | **El central persiste**: `crew-hub` guarda snapshot a `data/central/snapshot.json` y lo restaura al arrancar | 2026-11-14 | Un reinicio del servidor ya no borra la sala; el histórico completo sigue en Dexie |
| D42 | **Transporte real a Tierra**: `HttpSyncTransport` → `POST /api/tierra` (MCC local) sustituye al stub | 2026-11-14 | El envío ya no se simula: la cola drena a un endpoint real que persiste y devuelve ACK |

---

## Pendientes abiertos

- [x] **Sesión de Google activa en NASA-BROWSER** (2026-11-13, la persona inició sesión manualmente).
- [x] Crear el repositorio público y la licencia (MIT o Apache-2.0). ✅ `Charcraft/NASA-SPACEAPPS`
- [ ] Invitar a los 5 integrantes al repo con permiso de escritura.
- [ ] Reemplazar los `<github-user>` en `.github/CODEOWNERS`.
- [ ] Crear el tablero de GitHub Projects con las 5 columnas y las etiquetas.
- [ ] Probar el onboarding con una persona real (8 de noviembre).
- [ ] Completar el formulario de registro secundario del Local Event: https://forms.gle/JxKT5ivbd28cUN6j6
- [ ] Asignar roles definitivos a los 5 integrantes (`docs/04-equipo/02-roles-asignacion.md`).
- [ ] Confirmar si el venue tiene internet estable y cuántos contactos eléctricos hay.
- [ ] Validar umbrales clínicos con fuente primaria (`[POR VALIDAR]` en `docs/02-investigacion/02-indicadores-fisiologicos.md`).
- [ ] Explorar OSDR y documentar 3 datasets concretos utilizables.
- [ ] Revisar recursos oficiales el 13 de noviembre y ajustar el plan de datos.
- [x] Confirmar **Back 1**: Ernesto (`@ernesto-montes`).
- [x] Confirmar **Back 2**: Angel Marco (`@angel_marco`).
- [ ] Integrar `BRIEF-BACKEND-AGENTES.md` al repo (hoy está en `~/Downloads`).
- [ ] Crear el issue del reparto y los dos issues de trabajo.
- [x] Scaffold de Next 15 (Back 1) — deadline H0:45.
- [x] Congelar `types/index.ts` (Back 1 + Back 2) — deadline H2.
- [ ] Revisión de Pineda sobre `rules/` antes de mergear.
- [x] Merge de `feat/back2-osdr-baseline` en `feat/back1-realtime-architecture` (2026-11-14).
- [x] Capa de sync de Back 1: `sync/queue.ts` + `aggregate.ts` + `transport.ts`.
- [x] `runtime.ts` (composition root) + `osdr-replay-source.ts` (replay real R+1→R+194).
- [x] `api/osdr/route.ts` y `api/ai-context/route.ts` (Back 2 · Angel).
- [ ] Demo de 3 min con WiFi apagado (stream + semáforo + persistencia + cola sync).
- [x] PWA oficial: `manifest.webmanifest` + `sw.js` + iconos + registro (Back 1).
- [ ] Protocolos médicos: `data/knowledge/`, `lib/knowledge/`, `api/protocolos` + mapeo en triage (Back 2 · Angel). Contrato: `docs/03-plan/12-protocolos-medicos.md`.
- [x] Entornos de misión: `nave`, `estacion`, `base-lunar` con `entornos` en el catálogo (Back 1).
- [x] Central persistente (snapshot en `data/central/`) + transporte real a Tierra (`/api/tierra`).
- [ ] Reconciliación completa: marcar mediciones `sincronizadoTierra` tras el ACK (Back 2 · `repositories`).
- [ ] Frontend real (Pineda): semáforo literal, modelo 3D, módulo IA, pantalla de emergencia.

---

## Riesgos activos (resumen)

1. El envío local es 6 h 59 min antes de lo que dice la FAQ global → el plan de 48 h está mal calibrado si no se corrige. **Ya corregido en `docs/03-plan/02-plan-30h-hackathon.md`.**
2. Recursos del reto salen 1 día antes → dependencia fuerte de OSDR/LSDA como plan B.
3. Equipo de 5 sin especialista médico → hay que mitigar con fuentes y con un "revisor de sanidad" interno.

---

## Bitácora

### 2026-11-14 — Entornos de misión, central persistente y transporte real

- **Tres entornos** (`nave`, `estacion`, `base-lunar`): tipo `EntornoMision` + campo `entornos` en `ParameterDefinition` + `listarPorEntorno()`. Los 17 OSDR aplican a los tres; `intracranial_pressure_est` (SANS) solo a microgravedad.
- `docs/02-investigacion/06-entornos-mision.md`: trazabilidad entorno → peligro HRP → indicador.
- **Central persistente:** `crew-hub` guarda snapshot a `data/central/snapshot.json` y lo restaura al arrancar (ya no se borra la sala al reiniciar).
- **Transporte real:** `HttpSyncTransport` → `POST /api/tierra` (MCC local) sustituye al stub; `/api/tierra` valida con Zod y persiste append-only.
- **Replay al reconectar:** `iniciarFlushPeriodico` flushea inmediatamente al evento `online` (antes solo cada 10 s).
- **Incoherencia eliminada:** `docs/03-plan/11-arquitectura-backend.md` §8.1 y §8.2 alineados con D31 (central persistente, Tierra real, 3 entornos); §9 actualizado (protocolos ahora en alcance).
- **Verificado:** `pnpm typecheck` limpio, `pnpm test` 49/49, `pnpm build` 7 rutas (incluye `/api/tierra`).

### 2026-11-14 — PWA oficial y traspaso de protocolos a Back 2

- **PWA implementada:** `public/manifest.webmanifest`, `public/sw.js` (app-shell cache-first, `/api/*` network-first, `/api/telemetry` sin cache), iconos `public/icons/icon-192.png` + `icon-512.png`.
- `scripts/generar-iconos-pwa.py` genera los PNG desde el mismo diseño de `proyecto.ico` (sin marcas de NASA).
- `src/app/layout.tsx`: metadatos PWA (manifest, viewport, icons) + registro del SW **solo en producción**; se corrigió el mojibake de título/descripción.
- `next.config.mjs`: headers `no-cache` para `sw.js` y `Content-Type` del manifest.
- **Traspaso a Angel:** `docs/03-plan/12-protocolos-medicos.md` con el contrato congelado de `/api/protocolos`, esquema JSON, firma del cliente y criterios de aceptación.
- **Verificado:** `pnpm typecheck` limpio, `pnpm test` 49/49, `pnpm build` 7 rutas.

### 2026-11-14 — Merge Back 1 + Back 2 y capa de sync

- Merge de `origin/feat/back2-osdr-baseline` en `feat/back1-realtime-architecture` (sin conflictos de archivos; `types/index.ts` se fusionó adoptando la versión extendida de Angel).
- **Invariante corregida** en `docs/03-plan/11-arquitectura-backend.md` §3: `rules/` sí importa `registry.ts` y `osdr/client.ts` (pedido de Angel).
- Rama renombrada a `feat/back1-realtime-architecture` (antes `feat/back1-arquitectura`); la antigua se eliminó en remoto.
- **Nuevos de Back 1:** `sync/queue.ts` (cola A/B/C/D, hash djb2 encadenado, ACK/rechazo, reintentos), `sync/aggregate.ts` (1 Hz → 1 min → 1 h), `sync/transport.ts` (`SyncTransport` + stub local con simulación de red), `runtime.ts` (composition root) y `osdr-replay-source.ts` (replay real R+1→R+194 en 60 s).
- `sala-control.tsx` ahora usa `runtime` (motor + evaluar + baseline reales de Back 2) y alterna simulado/replay; añadido panel de estado de sync.
- `repositories.test.ts` corregido: `LecturaFrame` extendida exige `razon/accion/reglaDisparada/fuente`.
- **Verificado:** `pnpm typecheck` limpio, `pnpm test` 41/41, `pnpm build` 4 rutas.
- **Pendiente:** `api/osdr` y `api/ai-context` (Back 2 · Angel) y la demo de 3 min sin red.

### 2026-11-14 — Sala de tripulación y motor de tiempo real

- `stream-engine.ts`: 1 Hz, anomalías forzadas, estado de nodos 3D y suscriptores tolerantes a fallos.
- `crew-hub.ts`: último frame por tripulante, deduplicación por parámetro, `snapshot`, `alerta`, `resuelta` y `latido` cada 5 s.
- `api/telemetry`: POST valida con Zod y publica; GET abre SSE con `retry: 3000`.
- `api/parameters`: catálogo completo (26) con validación al arranque.
- `model3d-bridge/contracts.ts`: etiquetas, colores, animación y resumen accesible.
- Shell `sala-control.tsx`: una pestaña = una estación (`?crew=C002`), alerta compartida y simulador.
- **Prueba end-to-end** (`scripts/probar-sala.ps1`): catálogo, alerta visible por SSE, alerta resuelta, 400 con detalle. Todo en verde.
- **Errores corregidos:** `forced anomaly` no aplicaba a parámetros sin umbral (ahora lanza mensaje específico); el script de issues creaba la etiqueta `prio:crítica` con mojibake por UTF-8 en PowerShell 5.1 (ahora usa archivos de cuerpo y etiqueta sin acentos en el código).
- Issues abiertos: [#2 Back 1](https://github.com/Charcraft/NASA-SPACEAPPS/issues/2) y [#3 Back 2](https://github.com/Charcraft/NASA-SPACEAPPS/issues/3).

### 2026-11-14 — Scaffold de Back 1

- Next 15.5 + React 19 + Tailwind v4 + Dexie 4 + Zod 4 + Zustand 5 instalados con pnpm.
- **Error corregido:** `pnpm typecheck` fallaba con `TS2882` por importar `globals.css`; se añadió `src/types/assets.d.ts`.
- **Error corregido:** `next build` rompía al cargar `next.config.ts` con TypeScript 7 (`Cannot read properties of undefined (reading 'fileExists')`). Se cambió a `next.config.mjs` y se fijó TypeScript 6.
- Verificado: `pnpm typecheck` limpio y `pnpm build` genera 4 rutas; primer load 102 kB (límite del stack: 3 MB).
- Los 4 contratos compartidos quedaron en `src/types/index.ts` (congelados a H2).
- `src/lib/realtime/registry.ts`: 26 parámetros (17 OSDR reales + 9 simulados), `meshNodeId` nullable solo para `cabin_co2`, validación de invariantes y error `E-VAL-002` textual.

### 2026-11-14 — Revisión y corrección del plan de Back 2

- Se revisó `docs/angel_marco/plan-backend` contra `main` y contra la rama `feat/back2-persistencia-triage`.
- **Corregidos 4 defectos de contrato:** `baseline` nullable, `Evaluacion` con `valor`/`desviacion`/`degradado`, `guardarFrame` devuelve `ResultadoPersistencia`, y `evaluar` acepta `calidad`.
- **Higiene:** eliminado `docs/03-plan/~$pitch-aegis.pptx` (archivo temporal de PowerPoint), añadido `~$*` a `.gitignore`, y `CHARLAPRESENCIAL.md` → `charla-presencial.md` con H1 y registro en el índice.
- **Stack:** Vitest registrado como excepción explícita en `TECH-STACK.md` §9.
- **Nuevo:** `docs/03-plan/11-arquitectura-backend.md` con roles, flujo de datos, puertas y plan paralelo.
- **Roles cerrados:** Back 1 = Ernesto, Back 2 = Angel.

### 2026-11-14 — Pitch presencial
- La charla del Local Event fijó: **7 diapositivas máximo, en inglés**, con la estructura problema/usuario → solución → datos → demostración → evidencia y limitaciones → cierre.
- Se creó `docs/03-plan/07-pitch-7-slides.md` (guion hablado, tiempos, preguntas del jurado) y la presentación `pitch-aegis.pptx`, generada con `scripts/generar-pitch.py`.
- Verificado visualmente: 7 diapositivas, sin desbordes.
- Se añadió `docs/03-plan/08-preguntas-jurado.md`: documento de estudio con datos para memorizar, 10 preguntas obligatorias (ES/EN), 30 preguntas por categoría y 6 trampas.
- Se añadió `docs/03-plan/09-guia-demo-actual.md` y `scripts/demo-dataset.py` para mostrar el dataset sin depender de la app.
- **Hallazgo de calidad de datos:** 24 de 475 valores (5.1 %) caen fuera del rango de referencia del propio dataset. Verificado contra el CSV original; no es error de parseo. Se documenta en `src/data/seed/README.md` y se usa como argumento de producto.
- Se añadió `docs/12-briefing-equipo.md`: todo el proyecto en un documento, para presentarlo al equipo en 40 minutos.

### 2026-11-13 — Saneamiento de codificación y auditoría previa al kickoff
- Se detectó y resolvió el problema de mojibake (Windows-1252 vs UTF-8) en los 10 archivos de perfiles y bitácoras de `team/`.
- Se corrigió `scripts/setup-integrante.ps1`, `scripts/instalar-todo.ps1` e `instalar-todo.sh` para asegurar lectura y escritura en UTF-8 sin BOM y reemplazo de `{{NOMBRE}}`.
- Se añadieron exclusiones de Python cache (`__pycache__/`, `*.pyc`) en `.gitignore`.
- Se configuraron los usuarios de equipo en `.github/CODEOWNERS`.
- Se probaron y validaron los scripts de OSDR y verificación con `verificar-docs.ps1` al 100 % (0 errores).
- Se registraron las intervenciones en `docs/05-ia/03-registro-uso-ia.md` (IA-006 e IA-007).

### 2026-11-13 — Recursos oficiales y adaptación del plan
- Se revisó la pestaña Resources del reto: **3 enlaces de NASA HRP + 2 de CSA, ningún dataset**.
- Se leyó el Judging & Awards Guide: 5 criterios de 1 a 5 y **10 premios globales** (antes creíamos 6).
- Se leyó el Project Submission Guide: demo de **30 s máximo**, **todo en inglés**, reglas nuevas de divulgación de SI.
- Se creó el repositorio público: https://github.com/Charcraft/NASA-SPACEAPPS
- Se crearon `05-plan-13nov.md` (plan del día), `06-demo-30s.md` (guion oficial) y `08-submission/01-project-page-en.md`.
- Se tradujo el README a inglés y se conservó el español en `README.es.md`.
- Se añadió `LICENSE` MIT con aviso de no afiliación a NASA.
- Se corrigió un error propio de codificación que corrompió `02-plan-30h-hackathon.md` (reparado y verificado).

### 2026-11-13 — Cierre de roles con el formulario
- Respondieron los 5. Respuestas exportadas desde Google Forms a hoja de cálculo y procesadas.
- Puntajes calculados con los mismos pesos del formulario HTML.
- **Roles definitivos:** Eduardo (Producto/Video/Submission), Pineda (Frontend/IA), Angel (Reglas/Tests), Carlos Alberto (Datos), Ernesto (Plataforma).
- Hallazgos que cambian el plan: solo Eduardo tiene inglés fluido; Angel tiene 8 h; dos personas sin datos móviles; Eduardo y Angel sin harness todavía.
- CODEOWNERS actualizado con los usuarios reales de GitHub.

### 2026-11-13 — Integración de la investigación del equipo
- El equipo aportó en `context.md` una investigación sobre la arquitectura real de monitorización de NASA
  (Bio-Monitor, AstroSkin, actígrafos, HDTP, capas de telemetría, HUD).
- Se sintetizó en `docs/02-investigacion/05-arquitectura-actual-nasa.md` con 12 fuentes nuevas marcadas `[POR VERIFICAR]`.
- Hallazgo clave para el pitch: **NASA documenta que sus displays son demasiado densos y poco intuitivos**.
  Eso convierte nuestra propuesta en respuesta a una necesidad reconocida, no en una idea suelta.
- También valida el **local-first**: NASA almacena y analiza datos esenciales a bordo antes de transmitir.
- Se retiró un PNG del repositorio (`cur.png` se queda en disco, fuera de git).

### 2026-11-06 — Sesión de arranque
- Investigación del reto, HRP, 5 hazards, reglas del evento, premios y datasets disponibles.
- Se identificó el Local Event, el equipo, el límite de 5 y **el horario real de entrega (17:00)**.
- Se creó el navegador aislado `nasa-spaceapps-2026` con el perfil `charcraftycarlos@gmail.com`.
- Se generó la estructura documental completa (ver `docs/00-INDEX.md`).
- No se escribió código de producto (cumplimiento).

### 2026-11-06 — Infraestructura de trabajo colaborativo
- Se verificó en Orca v1.4.243 que **no existe colaboración multiusuario**: un host, un checkout, agentes locales. `orca serve` + pairing code permite conectarse a *una* máquina, no trabajar cinco personas a la vez.
- Se definió la arquitectura de 3 capas: GitHub (verdad) → Orca (ejecución local) → harness de cada quien.
- Se creó `team/` con carpeta por integrante (perfil + bitácora) para evitar conflictos.
- Se crearon plantillas de issue y PR, CODEOWNERS, adaptadores de harness (`CLAUDE.md`, `.cursor/rules`, copilot instructions).
- Se crearon 3 scripts: `setup-integrante.ps1`, `nuevo-worktree.ps1`, `verificar-docs.ps1`.
- Se inicializó el repositorio git local en `main` y `.gitignore` (excluye `Uso de IA-Personal/`).
- Se definió el plan adaptativo F0–F4 hasta el 13 de noviembre.

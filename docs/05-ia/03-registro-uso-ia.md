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

### IA-008 · Maquetado UI/UX de las 6 vistas comprometidas y simulador interactivo para Figma
- **Fecha/hora:** 2026-11-14 13:12
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA + Figma MCP + BrowserAct (`NASA-BROWSER` persistente)
- **Categoría:** diseño / código
- **Prompt usado:** "entra a este figma en conjunto y empieza a hacer las vistas de el proyecto de maquetado y diseño sin molestar a los otros usuarios"
- **Propósito:** generar las 6 vistas comprometidas en `docs/03-plan/03-alcance-producto.md` alineadas al sistema visual del equipo en Figma (`#090C14`, `#131A27`, `#D9FB76`, semáforo clínico) y conectadas a los datos reales de NASA OSDR `OSD-575`.
- **Resultado obtenido:** 6 pantallas vectoriales SVG 100% editables en Figma (`01` a `06`), lienzo maestro unificado (`00-sistema-completo-aegis.svg`) y simulador interactivo (`preview-interactivo.html`) abierto en `NASA-BROWSER` sin interferir con el trabajo de CarlosAlberto en el nodo `0,0`.
- **Validación:** contraste de rangos y valores contra `src/data/seed/osdr-inspiration4-cmp.json` (`C001`–`C004`) y verificación de disclaimer médico visible.
- **Estado:** [VERIFICADO]

---

### IA-009 · Maquetado en Figma como plugin nativo + corrección de datos clínicos

- **Fecha/hora:** 2026-11-14 13:40
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA + MCP de Figma (`figma-developer-mcp`, solo lectura) + Chrome headless para revisión visual
- **Categoría:** diseño / código
- **Prompt usado:** "conectate a el mcp de figma y empieza a hacer el maquetado de lo planeado en diseño" y, al detectar colisión de archivos, "trabaja en las vistas básicas y sin molestar a los otros agentes y personas".
- **Propósito:** dejar el maquetado de las 6 pantallas dentro de Figma con capas nativas, sin depender de la API REST (que no permite crear frames ni texto) y sin tocar `assets/figma-vistas/`, que otra línea de trabajo estaba usando.
- **Resultado obtenido:** `design/` con las 6 pantallas congeladas, un plugin de Figma que las construye (páginas «AEGIS · Pantallas» y «AEGIS · Sistema», 12 estilos de color y 7 de texto), un doble de la API para probarlo sin Figma (`smoke-test.mjs`) y una puerta de veracidad (`verificar-pantallas.py`).
- **Hallazgo y corrección:** el maquetado previo mostraba glucosa **102 mg/dL, base 89, +14.6 % para C001**. En el dataset, C001 tiene **90 mg/dL** y base **77.3**; esos números no existen. La escena se reescribió con **C003 = 103 mg/dL**, base **71.3** y **+44.4 %**, que sí son reales. También se corrigieron AST/ALT (18/19, no 29/31), albúmina (4.2) y creatinina (0.89).
- **Validación:** `verificar-pantallas.py` recalcula los valores desde `src/data/seed/osdr-inspiration4-cmp.json` y falla si el SVG no coincide; las 6 pantallas se renderizaron y revisaron una por una. La ejecución **dentro de Figma** queda pendiente de que una persona importe el plugin.
- **Estado:** [VERIFICADO] en datos y estructura · [POR VALIDAR] el render final en Figma

---

### IA-010 · Implementación del software Next.js 15 e indexador O(1) para NASA OSDR OSD-575
- **Fecha/hora:** 2026-11-14 14:13
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA
- **Categoría:** código / arquitectura
- **Prompt usado:** "hermano necesito que empieces a trabajar en el software, apegado al diseño que creaste necesito que investigues como utilizar la base de datos de la nasa, revisa la forma optima sin hacerlo tardar, empieza a crearlo y hazlo de manera estructurada en el proyecto crea la carpeta correctamante"
- **Propósito:** estructurar e implementar la aplicación web completa en `src/` conforme a `TECH-STACK.md` y al diseño minimalista monocromático con modelo 3D central, calculando cada métrica y línea base directamente desde `src/data/seed/osdr-inspiration4-cmp.json` en `<1 ms` sin latencia de red.
- **Resultado obtenido:** estructura completa en `src/app/`, `src/components/`, `src/lib/osdr/client.ts` (indexador en memoria + cálculo exacto de línea base pre-vuelo L-92, L-44, L-3), `src/lib/rules/triage.ts` (motor determinista puro), `src/lib/db/dexie.ts` (persistencia local IndexedDB) y endpoint híbrido `/api/osdr`.
- **Validación:** `pnpm exec tsc --noEmit` con 0 errores y servidor activo en `http://localhost:3000` abierto en `NASA-BROWSER`.
- **Estado:** [VERIFICADO]

---

### IA-011 · Redacción del contrato técnico de Backend y Base de Datos para agentes (`BRIEF-BACKEND-AGENTES.md`)
- **Fecha/hora:** 2026-11-14 14:52
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA
- **Categoría:** arquitectura / documentación
- **Prompt usado:** "necesito que generes en un solo md para darles el contexto de todo el stack tecnologico para la creacion del software para mi equipo, dos seran el back... el md es para el agente... tiene que mostrar un modelo 3D del cuerpo Humano... animaciones de cada herramienta util... IA no es indispensable y es añadido, preocupate en que sea adaptable y escalable por los parametros poco a poco"
- **Propósito:** alinear a los 2 integrantes de Backend/BD y a sus agentes de IA con contratos tipados para monitoreo biológico/físico en tiempo real, enlace con nodos del Modelo 3D (`meshNodeId`), disparadores de animaciones de herramientas (`toolAnimationId`), registro escalable de parámetros (*Plug & Play*) y capa de IA desacoplada/opcional.
- **Resultado obtenido:** [`BRIEF-BACKEND-AGENTES.md`](../../BRIEF-BACKEND-AGENTES.md) en la raíz del proyecto, enlazado desde `docs/00-INDEX.md`.
- **Validación:** revisión de consistencia contra `TECH-STACK.md`, `AGENTS.md` y la estructura real en `src/`.
- **Estado:** [VERIFICADO]

---

### IA-012 — Investigación de modelos 3D del cuerpo humano, licencias y mapeo a `meshNodeId`
- **Fecha/hora:** 2026-11-14
- **Quién:** Carlos De Jesús Martínez Pineda (@cxrlosmp)
- **Herramienta / modelo:** agente de IA con búsqueda web + verificación HTTP directa (descarga real de cada binario)
- **Categoría:** investigación
- **Prompt usado:** ad hoc — *"Necesito que investigues en internet o en github modelos del cuerpo humano en 3D gratuitos y que se puedan usar y descargar, necesito que venga cada sistema del cuerpo humano… nos servirá para que el astronauta interactúe visualmente con la parte del cuerpo humano"*
- **Propósito:** elegir el modelo 3D que el astronauta va a tocar, con licencia compatible con el repo público, sin share-alike ni cláusula NC, y que exponga mallas nombradas compatibles con los 6 `meshNodeId` del contrato del backend.
- **Resultado obtenido:** [`docs/02-investigacion/06-modelos-3d-anatomia.md`](../02-investigacion/06-modelos-3d-anatomia.md) — 7 fuentes comparadas, tabla de cobertura de los 11 sistemas, mapeo a los 6 nodos del contrato, 5 trampas de licencia y plan B. Fuentes B60–B76 en la bibliografía.
- **Validación:** **no se aceptó ninguna cifra de un README.** Se comprobaron por descarga real e inspección de cabecera GLB: `anatomy-male.glb` = 7,614,076 B (134 nodos) y `anatomy-female.glb` = 8,134,732 B (139 nodos); `partof_BP3D_4.0_obj_99.zip` = 64,888,505 B; `3d-vh-m-united.glb` = 241,633,636 B; licencia de BodyParts3D releída en la página oficial (CC BY 4.0 desde 2025-02-27). Las raíces de sistemas se leyeron de `TA2.csv`.
- **Corrección posterior:** la primera medición del GLB (5,991,963 B) era el tamaño del flujo **comprimido** devuelto por el CDN a una petición `Range`, no del archivo. Detectado al descargar y comparar con la longitud declarada dentro del propio GLB. Queda registrado porque el error era fácil de repetir.
- **Limitación declarada:** la afirmación de que los `.obj` de BodyParts3D llevan cabecera antigua CC BY-SA 2.1 proviene de una auditoría de terceros, no de descarga propia → queda como `[POR VALIDAR]` en el documento.
- **Estado:** [VERIFICADO]

---

## Resumen por categoría

| Categoría | Usos registrados | Verificados |
|---|---|---|
| Investigación | 4 | 4 |
| Documentación | 3 | 3 |
| Arquitectura / código | 4 | 3 |
| Diseño | 2 | 2 |
| Datos | 0 | 0 |
| Video | 0 | 0 |
| **Total** | **13** | **12** |

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

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

## Resumen por categoría

| Categoría | Usos registrados | Verificados |
|---|---|---|
| Investigación | 3 | 3 |
| Documentación | 2 | 2 |
| Arquitectura / código | 2 | 1 |
| Diseño | 0 | 0 |
| Datos | 0 | 0 |
| Video | 0 | 0 |
| **Total** | **7** | **6** |

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

# Índice de documentación

Mapa completo del proyecto. Si un documento no está aquí, no existe.

---

## Navegación principal

| Archivo | Qué contiene | Para quién |
|---|---|---|
| [`ONBOARDING.md`](../ONBOARDING.md) | **Protocolo de instalación y bienvenida que sigue un agente al clonar el repo** | Agentes y nuevos integrantes |
| [`README.md`](../README.md) | Puerta de entrada al repo | Todos |
| [`AGENTS.md`](../AGENTS.md) | Reglas de trabajo y veracidad | Todos |
| [`MEMORY.md`](../MEMORY.md) | Estado vivo, decisiones, pendientes | Todos |
| [`TECH-STACK.md`](../TECH-STACK.md) | Stack técnico congelado y arquitectura | Devs |
| [`charla-presencial.md`](../charla-presencial.md) | Notas de trabajo para el pitch presencial (no es documento final) | Quien presenta |

---

## 01 · El reto

| Documento | Contenido |
|---|---|
| [`01-brief-retor.md`](01-brief-retor.md) | Desglose del reto, requisitos explícitos, criterios de jurado, fechas y reglas |

---

## 02 · Investigación

| Documento | Contenido |
|---|---|
| [`02-investigacion/01-cinco-peligros.md`](02-investigacion/01-cinco-peligros.md) | Los 5 peligros del vuelo espacial y sus efectos fisiológicos |
| [`02-investigacion/02-indicadores-fisiologicos.md`](02-investigacion/02-indicadores-fisiologicos.md) | Catálogo de indicadores: qué se mide, cómo, por qué, umbrales |
| [`02-investigacion/03-fuentes-datos.md`](02-investigacion/03-fuentes-datos.md) | OSDR, LSDA, LSAH, data.nasa.gov: qué hay realmente y cómo acceder |
| [`02-investigacion/04-bibliografia.md`](02-investigacion/04-bibliografia.md) | Todas las fuentes citadas, con fecha de consulta |
| [`02-investigacion/05-arquitectura-actual-nasa.md`](02-investigacion/05-arquitectura-actual-nasa.md) | Cómo monitoriza NASA la salud hoy, y qué hueco llenamos |

---

## 03 · Plan de ejecución

| Documento | Contenido |
|---|---|
| [`03-plan/01-plan-7-dias.md`](03-plan/01-plan-7-dias.md) | Plan día por día del 6 al 13 (histórico) |
| [`03-plan/02-plan-30h-hackathon.md`](03-plan/02-plan-30h-hackathon.md) | Cronograma hora por hora del evento, calibrado al envío de las 17:00 |
| [`03-plan/03-alcance-producto.md`](03-plan/03-alcance-producto.md) | Qué construimos, qué no, y cómo se ve |
| [`03-plan/04-riesgos.md`](03-plan/04-riesgos.md) | Riesgos, probabilidad, impacto y mitigación |
| [`03-plan/05-plan-13nov.md`](03-plan/05-plan-13nov.md) | **Plan del día 13 con los recursos oficiales ya publicados** |
| [`03-plan/06-demo-30s.md`](03-plan/06-demo-30s.md) | Guion del demo oficial: 30 segundos, estructura NASA, subtítulos |
| [`03-plan/07-pitch-7-slides.md`](03-plan/07-pitch-7-slides.md) | **Pitch presencial: 7 diapositivas en inglés, guion hablado y tiempos** |
| [`03-plan/pitch-aegis.pptx`](03-plan/pitch-aegis.pptx) | **Presentación lista para proyectar** (generada con `scripts/generar-pitch.py`) |
| [`03-plan/08-preguntas-jurado.md`](03-plan/08-preguntas-jurado.md) | **Documento de estudio: 40+ preguntas del jurado con respuestas y preguntas trampa** |
| [`03-plan/09-guia-demo-actual.md`](03-plan/09-guia-demo-actual.md) | **Cómo mostrar lo que existe hoy**, en 2, 5 o 10 minutos |
| [`03-plan/10-reparto-backend.md`](03-plan/10-reparto-backend.md) | **Reparto Back 1 / Back 2**: dueño por archivo, contratos de dependencia y acuerdos previos |
| [`03-plan/11-arquitectura-backend.md`](03-plan/11-arquitectura-backend.md) | **Arquitectura de backend**: roles, flujo de datos, contratos congelados, puertas y plan paralelo |

---

## 04 · Equipo

| Documento | Contenido |
|---|---|
| [`04-equipo/01-equipo.md`](04-equipo/01-equipo.md) | Integrantes, datos oficiales, contacto |
| [`04-equipo/02-roles-asignacion.md`](04-equipo/02-roles-asignacion.md) | **Roles definitivos**, matriz RACI, restricciones y turnos |
| [`04-equipo/03-logistica-evento.md`](04-equipo/03-logistica-evento.md) | Sede, horarios, qué llevar, checklist |
| [`04-equipo/04-resultados-formulario.md`](04-equipo/04-resultados-formulario.md) | Respuestas del formulario, puntajes y por qué se asignó cada rol |

---

## 05 · Uso de IA (SI)

| Documento | Contenido |
|---|---|
| [`05-ia/01-politica-uso-ia.md`](05-ia/01-politica-uso-ia.md) | Política: qué se permite, qué no, cómo se valida |
| [`05-ia/02-catalogo-prompts.md`](05-ia/02-catalogo-prompts.md) | Prompts reutilizables, versionados y con formato de salida |
| [`05-ia/03-registro-uso-ia.md`](05-ia/03-registro-uso-ia.md) | Bitácora obligatoria de cada uso relevante de IA |
| [`05-ia/04-declaracion-si-submission.md`](05-ia/04-declaracion-si-submission.md) | Borrador de la declaración que exige el submission |

---

## 06 · Estructura

| Documento | Contenido |
|---|---|
| [`06-estructura-proyecto.md`](06-estructura-proyecto.md) | Organización del repo, nombrado, dónde va cada cosa, checklist de envío |

---

## 07 · Trabajo colaborativo

| Documento | Contenido |
|---|---|
| [`07-trabajo-colaborativo/01-arquitectura-colaboracion.md`](07-trabajo-colaborativo/01-arquitectura-colaboracion.md) | Cómo trabajan 5 personas a la vez sin pisarse. Qué hace y qué no hace Orca |
| [`07-trabajo-colaborativo/02-flujo-git-y-pr.md`](07-trabajo-colaborativo/02-flujo-git-y-pr.md) | Ramas, commits, PRs, conflictos y sincronización |
| [`07-trabajo-colaborativo/03-orca-por-integrante.md`](07-trabajo-colaborativo/03-orca-por-integrante.md) | Orca en la práctica, por persona |
| [`07-trabajo-colaborativo/04-onboarding-integrante.md`](07-trabajo-colaborativo/04-onboarding-integrante.md) | De cero a primer PR en 45 minutos |
| [`07-trabajo-colaborativo/05-tablero-etiquetas.md`](07-trabajo-colaborativo/05-tablero-etiquetas.md) | Tablero, etiquetas, issues y milestones |
| [`07-trabajo-colaborativo/06-plan-adaptativo-hasta-13nov.md`](07-trabajo-colaborativo/06-plan-adaptativo-hasta-13nov.md) | Fases F0–F4, gates y contingencias hasta el 13 de noviembre |

### Recursos de trabajo

| Ruta | Contenido |
|---|---|
| [`../team/`](../team/README.md) | Una carpeta por integrante: perfil y bitácora |
| [`../.github/`](../.github/CODEOWNERS) | Plantillas de issue y PR, CODEOWNERS |
| [`../scripts/`](../scripts/setup-integrante.ps1) | Setup por integrante, worktrees y verificación de docs |

---

## 08 · Submission

| Documento | Contenido |
|---|---|
| [`08-submission/01-project-page-en.md`](08-submission/01-project-page-en.md) | Todos los campos del formulario en inglés, listos para copiar y pegar |

---

## 09 · Reparto de trabajo

| Documento | Contenido |
|---|---|
| [`09-equipo/formulario-reparto.html`](09-equipo/formulario-reparto.html) | **Formulario que calcula el rol de cada integrante** (abrir en el navegador) |
| [`09-equipo/02-formulario-reparto.md`](09-equipo/02-formulario-reparto.md) | Cómo se calcula el rol y cómo se interpreta |

---

## 10 · Entorno de trabajo

| Documento | Contenido |
|---|---|
| [`10-entorno/01-mcp.md`](10-entorno/01-mcp.md) | Conectar MCPs por harness |
| [`10-entorno/02-github.md`](10-entorno/02-github.md) | Conectar GitHub y trabajar sin romper nada |
| [`10-entorno/03-browseract.md`](10-entorno/03-browseract.md) | BrowserAct en detalle, para agentes y personas |
| [`10-entorno/04-harness-por-integrante.md`](10-entorno/04-harness-por-integrante.md) | Cada harness, su modelo y las mismas reglas |
| [`10-entorno/05-tu-navegador.md`](10-entorno/05-tu-navegador.md) | Crear el navegador personal de cada integrante |
| [`../skills/README.md`](../skills/README.md) | Maletín de 24 skills y cómo instalarlas |

---

## 11 · Documentación

| Documento | Contenido |
|---|---|
| [`11-documentacion/01-protocolo-documental.md`](11-documentacion/01-protocolo-documental.md) | **Qué documenta cada agente, dónde y cuándo.** Lectura obligatoria |
| [`11-documentacion/02-plantillas.md`](11-documentacion/02-plantillas.md) | Plantillas para copiar y pegar |

---

## 12 · Briefing del equipo

| Documento | Contenido |
|---|---|
| [`12-briefing-equipo.md`](12-briefing-equipo.md) | **Todo el proyecto en un documento**, para presentarlo al equipo en 40 minutos |

---

## Convenciones

- Idioma: español. Términos oficiales en inglés cuando corresponda.
- Citas: `[Fuente: título — organización — URL — consultado YYYY-MM-DD]`
- Etiquetas de honestidad: `[POR VALIDAR]`, `[INFERENCIA]`, `[SUPUESTO]`, `[NO VERIFICADO]`
- Un documento nuevo se registra aquí **en el mismo commit** en que se crea.

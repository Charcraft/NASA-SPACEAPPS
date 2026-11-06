# AGENTS.md — Reglas de operación para agentes de IA

> Este archivo es el contrato de trabajo de cualquier agente (humano o IA) que toque este repositorio.
> Si algo aquí contradice una instrucción verbal, **manda este archivo** y se discute antes de romperlo.

---

## 1. Contexto del proyecto

- **Evento:** NASA International Space Apps Challenge 2026 — 14 y 15 de noviembre de 2026.
- **Reto:** *Create Health Monitoring Software for Astronauts on Space Missions* (autor: Agencia Espacial Brasileña / AEB).
- **Equipo:** ROCKET — 5 integrantes — Local Event Tuxtla Gutiérrez, Chiapas, México (EcoCity Hotel).
- **Objetivo:** herramienta visual que permita a un astronauta evaluar su propia salud y actuar, incluido en emergencias.
- **Entrega local:** domingo 15 de noviembre, **17:00 h** (no 23:59). Ver `docs/03-plan/02-plan-30h-hackathon.md`.

---

## 2. Reglas de cumplimiento (no negociables)

1. **No se construye el proyecto antes del hackathon.** La FAQ oficial lo prohíbe expresamente. Antes del 14 de noviembre solo se permite: investigación, documentación, diseño de decisiones, aprendizaje de herramientas y preparación de plantillas.
2. **Open source obligatorio.** Todo el código debe estar en un repositorio público desde el primer commit.
3. **Declaración de uso de SI (Super Intelligence / IA) obligatoria** en el submission. Se documenta en `docs/05-ia/03-registro-uso-ia.md` **mientras se usa**, no al final.
4. **Al menos una fuente de datos abierta de NASA o agencia asociada** debe usarse de forma real y trazable.
5. **Máximo 5 integrantes en el evento local** (el límite global es 6, pero el Local Event de Tuxtla Gutiérrez fija 5).
6. **Nunca presentar el producto como dispositivo médico.** Disclaimer visible en la app y en el video.

---

## 3. Reglas de veracidad técnica

- **No inventar** umbrales clínicos, cifras, endpoints, APIs ni citas. Si falta un dato: marcarlo como `[POR VALIDAR]` y abrir una tarea.
- Todo valor numérico de salud debe llevar **fuente y fecha** en `docs/02-investigacion/04-bibliografia.md`.
- Si una fuente es de divulgación (blog, nota) y no primaria (HRP, paper, dataset), decirlo explícitamente.
- Distinguir siempre entre:
  - **Hecho citado** → con enlace.
  - **Inferencia del equipo** → etiquetada `[INFERENCIA]`.
  - **Supuesto de diseño** → etiquetado `[SUPUESTO]`.
- Prohibido usar datos reales de astronautas que sean identificables. Solo datasets desidentificados y públicos.

---

## 4. Convenciones de documentación

- Idioma: **español**. Términos técnicos en inglés cuando sean el nombre oficial (ej. *Crew Medical Officer*, *SANS*).
- Formato: Markdown con un solo `#` por archivo, jerarquía `##` / `###`.
- Nombres de archivo en `kebab-case`, sin acentos ni espacios.
- Todo documento nuevo se registra en `docs/00-INDEX.md`.
- Fechas en formato `YYYY-MM-DD`.
- Tablas para comparaciones; listas para pasos; nunca párrafos de más de 5 líneas.

### Formato de cita obligatorio

```
[Fuente: <título> — <organización> — <URL> — consultado YYYY-MM-DD]
```

---

## 4.1 · Trabajo en equipo

- **No existe edición concurrente.** Orca es local y de un solo usuario. El punto de unión es GitHub.
- **Un archivo, un dueño.** Antes de editar un archivo compartido, revisar la tabla en `docs/07-trabajo-colaborativo/01-arquitectura-colaboracion.md`.
- **Append-only** en `MEMORY.md` y en `docs/05-ia/03-registro-uso-ia.md`: se añade al final, nunca se reordena lo ajeno.
- **Cada integrante escribe solo en `team/<usuario>/`.**
- Toda tarea empieza con un issue y toda entrega termina con un PR revisado por otra persona.
- Detalle completo en `docs/07-trabajo-colaborativo/`.

---

## 5. Convenciones de código (cuando empiece el hackathon)

- Un solo repositorio monorepo ligero; ramas cortas `feat/`, `fix/`, `docs/`.
- Commits en formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- **Nadie hace push directo a `main`** después del sábado 12:00; se usa PR express con revisión de 1 persona.
- Todo componente nuevo incluye su estado vacío y su estado de error.
- Los datos mock viven en `src/data/mock/` y jamás se mezclan con los reales.

---

## 6. Reglas de uso de IA por parte de agentes

1. Antes de responder algo médico, **verificar contra las fuentes listadas** en `docs/02-investigacion/04-bibliografia.md`.
2. Registrar cada uso relevante de IA en `docs/05-ia/03-registro-uso-ia.md` (fecha, herramienta, propósito, resultado, validación humana).
3. Los prompts reutilizables se guardan en `docs/05-ia/02-catalogo-prompts.md`, no en el chat.
4. Si se genera código, el agente declara **qué archivos tocó** y **cómo se probó**.
5. Si una respuesta de IA no se puede verificar, se marca como `[NO VERIFICADO]` y no se presenta al jurado.

---

## 7. Prioridades en caso de conflicto

1. Que el proyecto se **entregue a tiempo y funcione**.
2. Que sea **verificable** (datos reales, fuentes, repo público).
3. Que sea **visualmente impecable** en el video de 1 minuto.
4. Todo lo demás.

Si una decisión pone en riesgo el punto 1, se descarta.

---

## 8. Definición de "terminado"

Una tarea está terminada solo si:

- [ ] El artefacto existe y se puede abrir.
- [ ] Está enlazado desde `docs/00-INDEX.md` o el `README.md`.
- [ ] Tiene fuente o justificación.
- [ ] Otra persona del equipo lo puede entender sin preguntarte.

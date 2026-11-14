# 11.1 · Protocolo documental

> **Regla para agentes:** si no está escrito, no pasó. Documentar es parte del trabajo, no un extra al final.
> Este documento dice **qué** documentar, **dónde** y **con qué formato**, para que nadie tenga que adivinarlo.

---

## La prueba de los tres días

Antes de decidir si algo merece documentarse, aplica esta prueba:

> **¿Alguien del equipo necesitaría saber esto dentro de tres días y no podría deducirlo del código?**

- **Sí** → se documenta.
- **No** → no se documenta. Documentar todo también es un error: llena el repo de ruido y nadie lo lee.

---

## 1 · Qué se documenta, siempre

| Tipo de información | Dónde va | Formato mínimo |
|---|---|---|
| **Decisión tomada** | `MEMORY.md` § Decisiones | Una fila: qué, cuándo, por qué |
| **Hallazgo científico o dato** | `docs/02-investigacion/` | Afirmación + fuente + fecha de consulta |
| **Fuente nueva** | `docs/02-investigacion/04-bibliografia.md` | Título, organización, URL, fecha |
| **Umbral o valor clínico** | `docs/02-investigacion/02-indicadores-fisiologicos.md` | Valor + fuente o etiqueta `[POR VALIDAR]` |
| **Uso de IA relevante** | `docs/05-ia/03-registro-uso-ia.md` | Fecha, herramienta, propósito, validación |
| **Prompt que se va a repetir** | `docs/05-ia/02-catalogo-prompts.md` | ID, variables, formato de salida |
| **Trabajo del día** | `team/<usuario>/bitacora.md` | Qué hice, qué sigue, qué me bloqueó |
| **Cambio de alcance** | `docs/03-plan/03-alcance-producto.md` + `MEMORY.md` | Qué entró, qué salió, quién lo aprobó |
| **Riesgo nuevo** | `docs/03-plan/04-riesgos.md` | Descripción, probabilidad, impacto, mitigación |
| **Limitación conocida** | El README del área o del dataset | Qué no hace, por qué, qué haría falta |
| **Archivo o carpeta nueva** | `docs/00-INDEX.md` | Una fila con qué contiene |

---

## 2 · Lo que también hay que documentar (y casi nadie hace)

| Situación | Por qué importa | Dónde |
|---|---|---|
| **Lo que se intentó y no funcionó** | Evita que la siguiente persona pierda las mismas dos horas | `team/<usuario>/bitacora.md` |
| **Por qué se descartó una opción** | El jurado lo pregunta y el equipo lo olvida | `MEMORY.md` § Decisiones |
| **Qué dato no se pudo conseguir** | Honestidad que suma credibilidad | `docs/02-investigacion/03-fuentes-datos.md` |
| **Supuestos del equipo** | Distingue hecho de creencia | Etiqueta `[SUPUESTO]` en el texto |
| **Dependencias externas** | Qué se rompe si algo deja de estar disponible | `TECH-STACK.md` |

---

## 3 · Cómo se escribe (formato)

### Etiquetas de honestidad — obligatorias

| Etiqueta | Cuándo |
|---|---|
| `[VERIFICADO]` | Hay fuente consultada o prueba ejecutada |
| `[POR VALIDAR]` | Se cree cierto, no se comprobó |
| `[SUPUESTO]` | Es una decisión del equipo, no un hecho |
| `[INFERENCIA]` | Se deduce de otros datos |
| `[DESCARTADO]` | Se intentó y se abandonó (con el motivo) |

### Citas

```
[Fuente: <título> — <organización> — <URL> — consultado YYYY-MM-DD]
```

### Fechas
`YYYY-MM-DD`, siempre. "Hoy" y "ayer" no existen en un documento.

### Longitud
Un documento que nadie lee no documenta nada. Si pasa de 300 líneas, se parte.

---

## 4 · Cuándo se documenta

No al final. En estos cinco momentos:

| Momento | Qué se escribe |
|---|---|
| **Al empezar una tarea** | El issue, con criterio de aceptación |
| **Al descubrir algo** | La fuente o el hallazgo, en el momento |
| **Al tomar una decisión** | Una fila en `MEMORY.md` |
| **Al cerrar un bloque de trabajo** | La entrada en la bitácora |
| **Al terminar un PR** | Qué cambió, cómo se probó, uso de IA |

---

## 5 · El cierre de sesión del agente

Antes de decir "listo", un agente verifica estas cinco:

- [ ] ¿Tomé alguna decisión? → está en `MEMORY.md`
- [ ] ¿Usé una fuente nueva? → está en la bibliografía
- [ ] ¿Usé IA para algo relevante? → está en el registro
- [ ] ¿Creé o moví algún archivo? → está en `docs/00-INDEX.md`
- [ ] ¿Quedó algo pendiente o bloqueado? → está en `MEMORY.md` § Pendientes

Si alguna respuesta es "sí" y no está escrito, **la tarea no está terminada**.

---

## 6 · Lo que NO se documenta

| No documentar | Por qué |
|---|---|
| El historial del chat | Ya está en el chat; el repo no es un log |
| Lo obvio del código (`// suma dos números`) | Ruido |
| Tareas triviales de 5 minutos | Si no aporta contexto futuro, no va |
| Opiniones sin decisión | Si no cambia nada, no se escribe |
| Datos personales o credenciales | Nunca, en ningún formato |

---

## 7 · Automatización

El repo verifica dos cosas por ti:

```powershell
.\scripts\verificar-docs.ps1
```

1. **Enlaces rotos** entre documentos.
2. **Documentos huérfanos**: archivos `.md` dentro de `docs/` que no están registrados en `docs/00-INDEX.md`.

Si el script falla, no es un detalle de estilo: es documentación que alguien no va a encontrar.

---

## 8 · Por qué esto importa en un hackathon

1. **El jurado lee el repo.** Un repo bien documentado se ve como trabajo serio; uno vacío, como una demo improvisada.
2. **Cinco personas en paralelo sin documentación** es cinco personas repitiendo el mismo trabajo.
3. **El domingo a las 16:00** hay que escribir el README y el submission. Si las decisiones no están escritas, se reconstruyen de memoria y se pierden.
4. **Documentar es la única forma de que el proyecto sobreviva al fin de semana.**

---

## Plantillas

Ver [`02-plantillas.md`](02-plantillas.md) para copiar y pegar.

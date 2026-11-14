# 11.2 · Plantillas de documentación

> Copiar, pegar, rellenar. No inventar formato nuevo.

---

## Decisión (para `MEMORY.md`)

```markdown
| D<n> | <decisión en una frase> | YYYY-MM-DD | <por qué, en una frase> |
```

Ejemplo:

```markdown
| D22 | El semáforo se evalúa en el cliente, no en el servidor | 2026-11-14 | No hay servidor por diseño; funciona offline |
```

---

## Hallazgo o dato (para `docs/02-investigacion/`)

```markdown
### <Título del hallazgo>

<Afirmación en 1–3 frases.>

- **Implicación para el proyecto:** <qué cambia en la app o en el plan>
- **Estado:** [VERIFICADO] / [POR VALIDAR]
- [Fuente: <título> — <organización> — <URL> — consultado YYYY-MM-DD]
```

---

## Indicador clínico (para `02-indicadores-fisiologicos.md`)

```markdown
### <n> · <Nombre del indicador>

- **Unidad:** <unidad>
- **Cómo se toma:** <procedimiento en 3–5 pasos, sin jerga>
- **Por qué importa:** <peligro asociado y consecuencia>
- **Referencia:** <rango> — [Fuente: ...] 
- **Ajuste en vuelo:** <qué cambia en microgravedad> [POR VALIDAR]
- **Semáforo:** 🟢 <...> · 🟡 <...> · 🔴 <...>
- **Estado:** [VERIFICADO] / [POR VALIDAR]
```

---

## Uso de IA (para `03-registro-uso-ia.md`)

```markdown
### IA-<n> · <título corto>
- **Fecha/hora:** YYYY-MM-DD HH:MM
- **Quién:** <nombre>
- **Herramienta / modelo:** <herramienta>
- **Categoría:** investigación | código | documentación | diseño | datos | video
- **Prompt usado:** P0X (o "ad hoc")
- **Propósito:** <qué necesitaba resolver>
- **Resultado obtenido:** <resumen, no el output completo>
- **Validación:** <cómo se comprobó y por quién>
- **Estado:** [VERIFICADO] | [POR VALIDAR] | [DESCARTADO]
```

---

## Entrada de bitácora (para `team/<usuario>/bitacora.md`)

```markdown
## YYYY-MM-DD · HH:MM — <título corto>

**Hice:** <qué quedó hecho y dónde>
**Siguiente:** <la siguiente acción concreta>
**Bloqueos:** <o "ninguno">
**Issue(s):** #<n>
**Rama:** <tipo/usuario/tema>
**Intenté y no funcionó:** <opcional pero valioso>
```

---

## Riesgo (para `04-riesgos.md`)

```markdown
| R<n> | <riesgo> | <P 1-3> | <I 1-3> | <P×I> | <mitigación concreta> |
```

---

## Limitación conocida (para el README del área o del dataset)

```markdown
### Limitaciones

- <qué no hace o no cubre>
- <qué haría falta para cubrirlo>
- <cómo afecta la interpretación de los resultados>
```

---

## Issue (plantilla rápida)

```markdown
## Qué hay que hacer
<una frase>

## Criterio de aceptación
- [ ] <verificable por otra persona>

## Archivos que toca
- <ruta>

## Estimación
<30 min | 1 h | 2 h>
```

---

## Registro de una fuente nueva

```markdown
| B<n> | <título> — <organización> — <URL> | <tipo: oficial/paper/blog> | YYYY-MM-DD |
```

---

## Cierre de PR

```markdown
Closes #<n>

**Qué cambió:** <2 líneas>
**Cómo se probó:** <comando o pasos>
**Uso de IA:** <no / sí, para qué>
**Documentación actualizada:** <archivos tocados>
```

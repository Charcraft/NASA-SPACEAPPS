# 07.5 · Tablero, etiquetas e issues

> Un solo lugar donde cualquiera ve el avance real sin preguntar.
> **Herramienta:** GitHub Projects (incluido en el repo, sin costo, sin otro login).

---

## 1. El tablero

### Columnas

| Columna | Qué entra aquí | Cómo llega |
|---|---|---|
| **Backlog** | Todo lo que existe pero no se está haciendo | Issues sin asignar |
| **Listo** | Tiene dueño, tiene criterio de aceptación, se puede empezar | Issue asignado + label de rol |
| **En curso** | Alguien está trabajando ahora | Se mueve a mano al empezar |
| **En revisión** | Hay un PR abierto | **Automático** al abrir PR |
| **Hecho** | Mergeado a `main` | **Automático** al mergear |

### Regla de tamaño
Un issue que no se puede terminar en **2 horas** no es un issue: es un proyecto. Se parte.

---

## 2. Etiquetas

### Por área (una obligatoria por issue)
| Etiqueta | Color sugerido | Quién la usa |
|---|---|---|
| `area:datos` | azul | Carlos De Jesús |
| `area:reglas` | azul oscuro | Carlos De Jesús |
| `area:frontend` | verde | Angel Marco |
| `area:diseño` | rosa | Ernesto |
| `area:plataforma` | gris | Carlos Alberto |
| `area:documentación` | amarillo | Todos |
| `area:video` | morado | Ernesto |

### Por tipo
| Etiqueta | Cuándo |
|---|---|
| `tipo:tarea` | Trabajo normal |
| `tipo:bug` | Algo está roto |
| `tipo:investigación` | Hay que averiguar algo antes de decidir |
| `tipo:decisión` | Hay que elegir entre opciones |

### Por prioridad
| Etiqueta | Significado |
|---|---|
| `prio:crítica` | Sin esto no hay entrega |
| `prio:alta` | Entra en el MVP |
| `prio:media` | Entra si hay tiempo |
| `prio:baja` | v2, no se toca antes del 14 |

### Por estado especial
| Etiqueta | Significado |
|---|---|
| `bloqueado` | No se puede avanzar; decir por qué en un comentario |
| `necesita-revisión` | Listo para que alguien lo mire |
| `hackathon` | Creado durante el evento |

---

## 3. Plantillas de issue

Cada tipo tiene su plantilla en `.github/ISSUE_TEMPLATE/`:

### `tarea.md`
```
## Qué hay que hacer
## Criterio de aceptación (cómo sé que está listo)
## Archivos que toca
## Depende de
## Estimación (horas)
```

### `bug.md`
```
## Qué pasó
## Qué se esperaba
## Cómo reproducirlo
## Captura / log
## Entorno (navegador, sistema)
```

### `investigacion.md`
```
## Qué necesito saber
## Por qué importa (qué decisión desbloquea)
## Fuentes a revisar
## Fecha límite
```

---

## 4. Nombres de issue

Formato:
```
[área] Verbo + objeto
```

| ✅ Bien | ❌ Mal |
|---|---|
| `[datos] Normalizar serie de glucosa de OSDR` | `datos` |
| `[frontend] Agregar tarjeta de semáforo` | `hacer la tarjeta` |
| `[reglas] Definir umbral de SpO₂` | `reglas médicas` |
| `[diseño] Diseñar pantalla de emergencia` | `pantalla` |

---

## 5. Milestones

| Milestone | Fecha | Contenido |
|---|---|---|
| `Pre-hackathon` | 2026-11-13 | Investigación, perfiles, estructura |
| `Hackathon` | 2026-11-15 | Todo el desarrollo |
| `Submit` | 2026-11-15 17:00 | README, video, submission |
| `Post` | 2026-11-20 | Post-mortem |

---

## 6. Cómo se ve el avance sin preguntar

### Para el equipo
El tablero muestra quién tiene qué. Si alguien quiere saber qué hacer, mira la columna **Listo**.

### Para el Product Lead
- Filtro `is:open label:bloqueado` → a quién desbloquear ahora.
- Filtro `is:open no:assignee` → qué está huérfano.
- Filtro `is:pr is:open` → qué lleva mucho sin revisar.

### Para el jurado (sí, también sirve)
Un repo con 40 issues cerrados y PRs revisados **comunica trabajo real**. Es evidencia.

---

## 7. Vista rápida del tablero (crear una vez)

En GitHub Projects, crear una vista llamada **"Hackathon"** con:

| Filtro | Propósito |
|---|---|
| `is:open assigned:@me` | "lo mío" |
| `is:open label:prio:crítica` | "lo que no puede fallar" |
| `is:open label:bloqueado` | "lo que está trabado" |
| `is:pr is:open` | "lo que espera revisión" |

---

## 8. Higiene mínima

| Frecuencia | Acción |
|---|---|
| Al empezar algo | Mover el issue a **En curso** y asignártelo |
| Al terminar algo | Abrir PR (el tablero se mueve solo) |
| Al final del día | Revisar que no tienes issues "En curso" que ya no estás haciendo |
| Cada 4 horas | El Product Lead revisa `bloqueado` y `sin asignar` |

---

## 9. Lo que el tablero no es

- ❌ No es un chat.
- ❌ No reemplaza la reunión de 15 minutos.
- ❌ No es para discutir decisiones. Las decisiones van a `MEMORY.md`.
- ❌ No es para documentar. Eso va en `docs/`.

El tablero responde una sola pregunta: **¿quién está haciendo qué y qué está trabado?**

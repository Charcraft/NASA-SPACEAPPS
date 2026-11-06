# Cómo trabajamos en equipo

> **Respuesta corta a "¿Orca permite compartir un proyecto y trabajar todos a la vez?"**
> **No.** Orca es una aplicación local: un usuario, una máquina. Lo que sí permite es correr varios agentes en paralelo en worktrees separados **dentro de esa misma máquina**.
> Por eso el punto de unión del equipo no es Orca: es **GitHub**.

---

## Las tres capas

```
┌─────────────────────────────────────────────────────────────┐
│  CAPA 3 · VISIBILIDAD COMPARTIDA            (GitHub)        │
│  Repo público · Issues · Tablero Projects · PRs · MEMORY.md │
└───────────────────────────▲─────────────────────────────────┘
                            │ git push / pull
┌───────────────────────────┴─────────────────────────────────┐
│  CAPA 2 · EJECUCIÓN LOCAL                   (Orca)          │
│  Worktrees · Terminales · Agentes en paralelo · Navegador   │
└───────────────────────────▲─────────────────────────────────┘
                            │ archivos
┌───────────────────────────┴─────────────────────────────────┐
│  CAPA 1 · HARNESS DE CADA QUIEN       (OpenCode, Claude…)   │
│  Lee AGENTS.md · Escribe código · No decide nada solo       │
└─────────────────────────────────────────────────────────────┘
```

Cada integrante tiene **su** capa 2 y **su** capa 1. Todos comparten la capa 3.

---

## Qué hace Orca de verdad (verificado 2026-11-06, v1.4.243)

| Capacidad | ¿Existe? | Qué significa para el equipo |
|---|---|---|
| Worktrees aislados por tarea | ✅ | Cada tarea se desarrolla sin pisar otra rama |
| Varios agentes en paralelo | ✅ | Un integrante puede tener 3 agentes trabajando a la vez |
| Terminales y lecturas desde CLI | ✅ | Un agente puede supervisar a otro |
| `orca serve` + pairing code | ✅ | Otra persona puede **conectarse a tu máquina** como runtime remoto |
| Orchestration (coordinador + workers) | ✅ | Un agente reparte tareas a otros agentes |
| Búsqueda en sesiones de agentes | ✅ | Recuperar decisiones pasadas |
| **Multiusuario en tiempo real** | ❌ | No existe |
| **Proyecto compartido entre 5 laptops** | ❌ | No existe |
| **Merge o lock de archivos entre personas** | ❌ | No existe — eso lo hace git |

### La tentación que hay que evitar

Usar `orca serve` para que todos entren a **una sola máquina** parece colaboración, pero no lo es:

- Todos compiten por el mismo checkout y los mismos procesos.
- Quien tiene el runtime puede ver y matar las terminales de los demás.
- Si esa máquina se apaga, el equipo se detiene.
- El historial de IA de cada quien queda mezclado.

**Decisión:** cada integrante trabaja en su máquina. El servidor compartido se reserva para una sola cosa: la demo en vivo del domingo, si hace falta.

---

## Regla de oro: un archivo, un dueño

El 90 % de los conflictos en un hackathon viene de dos personas editando el mismo archivo.

| Archivo | Quién lo edita |
|---|---|
| `MEMORY.md` | Solo el Product Lead (Eduardo) |
| `AGENTS.md`, `TECH-STACK.md` | Nadie sin PR y revisión |
| `docs/02-investigacion/*` | Solo el rol de Datos |
| `docs/03-plan/*` | Solo el Product Lead |
| `docs/05-ia/03-registro-uso-ia.md` | **Cada quien añade su entrada al final** (append-only, no se edita lo ajeno) |
| `team/<usuario>/bitacora.md` | **Solo esa persona** |
| `src/**` | Se reparte por carpeta, no por archivo |

**Append-only en archivos compartidos:** cada quien añade su bloque al final. Si dos añaden a la vez, git lo resuelve casi siempre solo.

---

## Dónde se ve el avance, exactamente

Hay **tres** lugares, y cada uno responde una pregunta distinta:

| Pregunta | Dónde se responde | Quién lo actualiza |
|---|---|---|
| "¿Qué está haciendo cada quien ahora?" | Tablero de GitHub Projects (columna + tarjeta) | Automático desde issues y PRs |
| "¿Qué se decidió y por qué?" | `MEMORY.md` § Decisiones | Product Lead |
| "¿Qué hice hoy y qué me bloqueó?" | `team/<usuario>/bitacora.md` | Cada persona, al final de su bloque |

Con esos tres, **nadie tiene que preguntar "¿cómo va todo?"** — y eso ahorra horas el fin de semana.

---

## El flujo en una imagen

```
1. Abro un issue con la plantilla de tarea
        ↓
2. El Product Lead lo asigna y le pone label
        ↓
3. Creo una rama: feat/cxrlosmp/indicador-presion
        ↓
4. Orca: worktree + agente trabajando en esa rama
        ↓
5. Commits cada hora
        ↓
6. Abro PR → el tablero lo mueve solo a "En revisión"
        ↓
7. Otro integrante revisa (máx. 15 min) → merge
        ↓
8. Anoto en mi bitácora
```

Ver el detalle en [`02-flujo-git-y-pr.md`](02-flujo-git-y-pr.md).

---

## Qué NO vamos a usar (y por qué)

| Herramienta | Por qué no |
|---|---|
| Live Share de VS Code | Requiere que uno sea anfitrión; un corte de red tumba a todos |
| Un servidor Orca compartido | Un solo checkout, cero aislamiento, un punto de fallo |
| Google Docs para el plan | Se desincroniza del repo en 2 horas |
| WhatsApp como fuente de verdad | Se pierde; el jurado no puede leerlo |
| Trello/Notion aparte | Otro login, otra cosa que actualizar; GitHub Projects ya está donde vive el código |

---

## Lo que sí hace que esto funcione

1. **Un repo público desde hoy.** Obligatorio para el submission, y además es el punto de unión.
2. **Cada persona tiene su carpeta en `team/`.** Sin conflictos, con identidad.
3. **Issues pequeños.** Una tarea que no cabe en 2 horas no es una tarea, es un proyecto.
4. **PRs de una persona.** Nadie revisa su propio PR.
5. **Sincronización de 15 minutos cada 4 horas.** El tablero no reemplaza hablar.

---

## Documentos relacionados

- [`02-flujo-git-y-pr.md`](02-flujo-git-y-pr.md) — ramas, commits, PRs y conflictos
- [`03-orca-por-integrante.md`](03-orca-por-integrante.md) — cómo se usa Orca en la práctica
- [`04-onboarding-integrante.md`](04-onboarding-integrante.md) — cómo entra alguien nuevo, paso a paso
- [`05-tablero-etiquetas.md`](05-tablero-etiquetas.md) — el tablero y las etiquetas
- [`06-plan-adaptativo-hasta-13nov.md`](06-plan-adaptativo-hasta-13nov.md) — qué pasa cada día hasta el 13

# 07.3 · Orca por integrante

> Orca no se comparte. **Cada quien instala el suyo** y lo usa para trabajar más rápido en su propia máquina.
> Esta guía es la misma para los cinco, con una sección final de "si tu harness es X".

---

## 1. Qué es Orca para nosotros

Tres cosas concretas, nada más:

| Para qué | Comando |
|---|---|
| Aislar cada tarea en un checkout propio | `orca worktree create` |
| Lanzar un agente en esa tarea | `--agent <id> --prompt "..."` |
| Ver y controlar lo que hacen las terminales | `orca terminal list / read / send` |

Todo lo demás de Orca (browser, automations, search) es opcional y **no hace falta para el hackathon**.

---

## 2. Instalación (una vez)

```powershell
# Verificar que existe
orca --version

# Si no está, descargar desde el sitio oficial de Orca e instalar.
# Verificar de nuevo.
```

Requisitos mínimos por persona:

- [ ] Git 2.40+
- [ ] GitHub CLI (`gh`) autenticado: `gh auth login`
- [ ] Node.js 22 LTS + `pnpm`
- [ ] Orca 1.4+
- [ ] Su harness de IA instalado y funcionando

---

## 3. Preparar el proyecto (una vez por persona)

```powershell
# 1. Clonar
gh repo clone <org>/NASA-SPACEAPPS
cd NASA-SPACEAPPS

# 2. Registrar el repo en Orca
orca repo add --path (Get-Location).Path

# 3. Ejecutar el setup de integrante
.\scripts\setup-integrante.ps1 -Usuario <tu-usuario>
```

El script verifica herramientas, configura tu identidad de git, crea tu carpeta en `team/` si no existe y te dice cuál es tu primer issue.

---

## 4. El ciclo de trabajo con Orca

### Opción A — Un worktree por tarea (recomendado)

```powershell
orca worktree create `
  --name indicador-presion `
  --parent-worktree active `
  --agent opencode `
  --prompt "Lee AGENTS.md y docs/02-investigacion/02-indicadores-fisiologicos.md. Implementa el indicador de presión arterial siguiendo la ficha #2. Abre un PR al terminar."
```

Qué hace esto:

1. Crea un checkout nuevo en su propia carpeta.
2. Crea una rama a partir de `main`.
3. Lanza tu harness con el prompt ya cargado.
4. Aparece como tarjeta en la barra lateral de Orca.

**Ventaja:** puedes tener 3 tareas abiertas sin que se pisen, y volver a cualquiera mañana.

### Opción B — Agente en la carpeta actual

```powershell
orca agent launch --agent opencode --prompt "Revisa el issue #14"
```

Más simple, pero comparte checkout con lo que ya tengas abierto.

### Cerrar una tarea

```powershell
# Cuando el PR ya se mergeó
orca worktree rm --worktree name:indicador-presion --force

# Cerrar todas las terminales de un worktree
orca terminal close --worktree name:indicador-presion --all
```

---

## 5. Estado visible en Orca

La tarjeta de cada worktree tiene una línea de estado. **Se actualiza, no se deja vieja.**

```powershell
orca worktree set --worktree active --comment "reglas listas; falta UI" 
orca worktree set --worktree active --workspace-status in-review
```

Estados disponibles: `todo`, `in-progress`, `in-review`, `completed`.

> Esto es para **ti**, no para el equipo. El equipo mira GitHub. Pero cuando vuelves después de 4 horas, agradeces saber dónde ibas.

---

## 6. Varios agentes a la vez (solo si sabes lo que haces)

Orca puede tener un agente coordinador repartiendo trabajo a workers. Suena bien y **es una trampa en un hackathon de 30 horas**: la coordinación cuesta más de lo que ahorra.

**Regla del equipo:** máximo **2 agentes simultáneos por persona**. Uno escribe, el otro revisa o investiga. No más.

Si aun así quieres usarlo, el patrón es:

```powershell
# Coordinador
orca orchestration run-create --json

# Worker
orca orchestration worker-start --json
```

Pero esto está **fuera del alcance** del hackathon. Se documenta para que nadie lo descubra a las 3 de la mañana.

---

## 7. Lo que Orca NO resuelve

| Problema | Quién lo resuelve |
|---|---|
| Que dos personas editen el mismo archivo | Git + la regla "un archivo, un dueño" |
| Ver el avance del equipo | GitHub Projects |
| Compartir un proyecto en vivo | Nadie. No existe. Se trabaja asíncrono. |
| Que la demo funcione en otra laptop | El build de Vercel |
| Resolver un conflicto de merge | La persona, leyendo el conflicto |

---

## 8. Si tu harness es…

### OpenCode
Lee `AGENTS.md` de la raíz automáticamente. No hay que hacer nada.

### Claude Code
Lee `CLAUDE.md`. Ya existe en la raíz y apunta a `AGENTS.md`. No hay que hacer nada.

### Codex / ChatGPT CLI
Lee `AGENTS.md` si está en la raíz. Verificar con `codex` que lo detecta.

### Cursor
Lee `.cursor/rules/proyecto.mdc`. Ya existe en el repo y apunta a `AGENTS.md`. Al abrir el proyecto, Cursor debe mostrar la regla activa.

### GitHub Copilot
Lee `.github/copilot-instructions.md`. Ya existe y apunta a `AGENTS.md`.

### Gemini CLI / otros
Si no lee ninguno de esos archivos, **dale `AGENTS.md` a mano al inicio de la sesión**. Es un archivo, no un sistema.

> **Regla:** el harness no decide el flujo. El flujo está en `AGENTS.md`, y todos los harness leen lo mismo.

---

## 9. Checklist de arranque de cada mañana

- [ ] `git checkout main && git pull`
- [ ] `orca status` — ver que el runtime responde
- [ ] Abrir mi issue del día
- [ ] Crear worktree con el nombre del issue
- [ ] Escribir en la bitácora qué voy a hacer

## Checklist al cerrar cada bloque

- [ ] Push de todo
- [ ] `team/<usuario>/bitacora.md` actualizada
- [ ] Comentario en el issue con el estado
- [ ] Worktree con `--comment` actualizado
- [ ] Cerrar lo que no se va a retomar

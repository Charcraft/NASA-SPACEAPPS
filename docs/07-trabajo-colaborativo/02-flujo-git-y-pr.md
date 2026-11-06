# 07.2 · Flujo de git y pull requests

> El objetivo no es "usar git bien". Es que **cinco personas no se pisen** y que el domingo a las 17:00 todo esté en `main`.

---

## 1. Ramas

### Convención
```
<tipo>/<usuario>/<slug-corto>
```

| Tipo | Uso | Ejemplo |
|---|---|---|
| `feat/` | Funcionalidad nueva | `feat/angel_marco/mapa-corporal` |
| `fix/` | Corrección | `fix/giganroker/offline-reload` |
| `docs/` | Documentación | `docs/cxrlosmp/peligros` |
| `data/` | Datasets y scripts de datos | `data/cxrlosmp/osdr-normalizado` |
| `chore/` | Configuración, tooling | `chore/danny1510/ci-docs` |

### Reglas
- `main` siempre desplegable. **Nunca se trabaja directo en `main`.**
- Una rama = un issue = una persona.
- Vida máxima de una rama: **4 horas**. Si no se puede mergear en 4 h, la tarea estaba mal cortada.
- Se borra al hacer merge.

---

## 2. Commits

### Formato
```
<tipo>(<alcance>): <descripción en imperativo>

[cuerpo opcional: por qué, no qué]
```

### Ejemplos reales
```
feat(ui): agrega mapa corporal con regiones clicables
fix(rules): corrige límite superior de presión sistólica
docs(research): documenta mecanismo de SANS
data(osdr): normaliza serie de glucosa de Inspiration4
```

### Reglas
- **Un commit cada hora como mínimo.** Un portátil que se muere a las 03:00 no se lleva el trabajo.
- El mensaje dice **qué cambia**, no "cambios" ni "update".
- Si el commit toca más de 8 archivos, probablemente son dos commits.

---

## 3. Pull Requests

### Plantilla (ya está en `.github/PULL_REQUEST_TEMPLATE.md`)

Todo PR responde:
1. ¿Qué issue cierra?
2. ¿Qué cambió?
3. ¿Cómo se probó?
4. ¿Se usó IA? ¿En qué?

### Reglas del PR
| Regla | Valor |
|---|---|
| Tamaño máximo | ~300 líneas cambiadas |
| Revisor | **1 persona distinta al autor** |
| Tiempo máximo de revisión | **15 minutos** |
| Merge | Squash and merge |
| Aprobación | Obligatoria |

### Durante el hackathon (más relajado, igual de estricto)
- Después del **sábado 12:00**, el PR se aprueba con un comentario `LGTM` y uno mira. Sin ceremonia.
- Si el revisor no contesta en 15 min y no es crítico, el autor mergea y avisa.
- **Si es `src/lib/rules/`, nadie mergea sin que otra persona lo lea.** Es la lógica clínica.

---

## 4. Cómo se evitan los conflictos

### Estrategia 1 — Un archivo, un dueño
Ver la tabla en [`01-arquitectura-colaboracion.md`](01-arquitectura-colaboracion.md) § "Regla de oro".

### Estrategia 2 — Append-only en archivos compartidos
`MEMORY.md` y `03-registro-uso-ia.md` solo crecen por el final. Nunca se reordena lo existente.

### Estrategia 3 — Carpetas separadas en el código
```
src/components/dashboard/     → Angel
src/components/body/          → Angel
src/components/emergency/     → Ernesto
src/lib/rules/                → Carlos De Jesús
src/lib/db/                   → Carlos Alberto
src/data/                     → Carlos De Jesús
```

Si dos personas necesitan el mismo componente, **una lo crea y la otra lo usa**. No se crea dos veces.

### Estrategia 4 — Rebase antes de PR
```bash
git fetch origin
git rebase origin/main
```
Se hace **siempre** antes de abrir el PR. No al final del hackathon.

### Estrategia 5 — Si hay conflicto
1. No entrar en pánico.
2. `git status` para ver los archivos.
3. Abrir el archivo y buscar `<<<<<<<`.
4. **Preguntar a la otra persona antes de decidir.** Es su código.
5. Resolver, `git add`, `git rebase --continue`.

> Regla: **quien llega segundo resuelve.** No se le pide a la otra persona que arregle tu rebase.

---

## 5. Protección de `main`

Configurar en GitHub (una sola vez, por Eduardo):

- [ ] Require pull request before merging
- [ ] Require 1 approval
- [ ] Dismiss stale approvals on new commits
- [ ] Require status checks (si hay CI)
- [ ] No permitir force push
- [ ] No permitir borrar la rama

> Durante el hackathon, si la protección estorba, **se desactiva temporalmente** y se avisa. Es mejor entregar que respetar el proceso.

---

## 6. Sincronización del equipo

### Cada 4 horas (15 minutos, de pie)
Cada persona responde tres cosas:

1. **Qué terminé** (con el número de issue).
2. **Qué sigo** (con el número de issue).
3. **Qué me bloquea.**

El Product Lead anota los bloqueos y los reparte.

### Antes de dormir (5 minutos)
- Push de todo.
- Actualizar `team/<usuario>/bitacora.md`.
- Cerrar Orca o dejar las terminales en algo estable.
- Escribir en el grupo: "me voy, dejo X en la rama Y".

---

## 7. Comandos del día a día

```bash
# Empezar una tarea nueva
git checkout main
git pull
git checkout -b feat/cxrlosmp/nombre-corto

# Guardar trabajo
git add -A
git commit -m "feat(scope): descripción"

# Subir
git push -u origin feat/cxrlosmp/nombre-corto

# Abrir PR
gh pr create --fill

# Actualizar con main
git fetch origin
git rebase origin/main

# Terminar
gh pr merge --squash --delete-branch
```

### Con Orca (alternativa)

```powershell
# Crea el worktree, la rama y arranca el agente en un solo paso
orca worktree create --name indicador-presion `
  --parent-worktree active `
  --agent opencode `
  --prompt "Implementa el indicador de presión arterial según docs/02-investigacion/02-indicadores-fisiologicos.md"
```

---

## 8. Qué hacer si `main` se rompe

1. **Avisar en el grupo inmediatamente.** No intentar arreglarlo en silencio.
2. Si fue tu PR: revertir.
   ```bash
   git revert <sha> --no-edit
   git push
   ```
3. Si no se sabe cuál fue: `git log --oneline -10` y mirar.
4. Arreglarlo es prioridad #1 de todos. **Nadie abre PRs nuevos hasta que `main` esté verde.**

---

## 9. Reglas no negociables

- ❌ No se commitea `node_modules`, `.env` ni datos personales.
- ❌ No se commitea el trabajo de otra persona.
- ❌ No se hace `push --force` a `main`.
- ❌ No se mergea sin revisar el diff. Ni a las 4 de la mañana.
- ✅ Se commitea aunque el código esté feo. Un commit feo es mejor que trabajo perdido.

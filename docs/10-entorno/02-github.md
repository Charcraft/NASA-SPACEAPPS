# 10.2 · Conectar GitHub

> Sin GitHub no hay proyecto. Es el punto donde se cruzan las cinco personas.
> **Objetivo: cada integrante puede hacer push y abrir un PR a su nombre, sin ayuda.**

---

## 1. Cuenta

- Usa una cuenta de GitHub **tuya**.
- Si no tienes, créala con el correo con el que estás en Space Apps.
- **Pásale tu usuario a Eduardo** para que te invite al repo `Charcraft/NASA-SPACEAPPS` con permiso **Write**.

### Verificar que ya tienes acceso

```bash
gh repo view Charcraft/NASA-SPACEAPPS
```

Si responde con los datos del repo, ya estás dentro. Si da 404, no te han invitado todavía (o no aceptaste la invitación, que llega por correo).

---

## 2. Autenticar el CLI

```bash
gh auth login
```

Elegir:

- **GitHub.com**
- **HTTPS** (más simple; SSH solo si ya lo usas)
- **Login with a web browser**

Después:

```bash
gh auth setup-git      # configura git para usar gh como credencial
gh auth status         # debe decir "Logged in"
```

---

## 3. Identidad en los commits

**Esto es lo que más se olvida y lo que hace que tus commits aparezcan como de otra persona.**

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "el-correo-de-tu-cuenta-github"
```

Verificar:

```bash
git config user.email
```

> Si commiteaste con el correo equivocado, tus contribuciones no cuentan en el repo. Se corrige con `git rebase` o se acepta y se sigue. **No se reescribe el historial compartido sin avisar.**

---

## 4. Clonar y empezar

```bash
gh repo clone Charcraft/NASA-SPACEAPPS
cd NASA-SPACEAPPS
.\scripts\setup-integrante.ps1 -Usuario <tu-usuario>
```

El script verifica herramientas, prepara tu carpeta en `team/` y registra el repo en Orca.

---

## 5. El ciclo diario

```bash
# 1. Actualizarte SIEMPRE antes de empezar
git checkout main
git pull

# 2. Rama nueva
git checkout -b feat/<tu-usuario>/<tema>

# 3. Trabajar y commitear cada hora
git add -A
git commit -m "feat(scope): descripción"

# 4. Subir
git push -u origin feat/<tu-usuario>/<tema>

# 5. Abrir PR
gh pr create --fill

# 6. Cuando lo aprueben
gh pr merge --squash --delete-branch
```

---

## 6. Reglas que evitan el 90 % de los problemas

| Regla | Por qué |
|---|---|
| `git pull` antes de empezar | Evita conflictos que se descubren tarde |
| Una rama por tarea | Dos tareas en una rama = un PR imposible de revisar |
| `git rebase origin/main` antes del PR | El conflicto se resuelve cuando todavía recuerdas qué hiciste |
| Commit cada hora | Un portátil que se apaga no se lleva el trabajo |
| Nunca `push --force` a `main` | Borra el trabajo de otros |
| Nunca commitear `.env` | Filtra secretos |

---

## 7. Si algo se rompe

| Síntoma | Causa | Solución |
|---|---|---|
| `Permission denied (publickey)` | SSH sin configurar | `gh auth setup-git` y usar HTTPS |
| `Updates were rejected` | Tu rama está atrasada | `git pull --rebase` |
| `CONFLICT (content)` | Dos personas tocaron el mismo archivo | Ver `07-trabajo-colaborativo/02-flujo-git-y-pr.md` §4 |
| 404 al clonar | Sin acceso o repo privado | Pedir invitación a Eduardo |
| Los commits salen con otro autor | Identidad global mal | `git config --local user.name/email` |
| `fatal: not a git repository` | Estás en otra carpeta | `cd` a la raíz |

---

## 8. Después del hackathon

- El repo debe quedar **público** (requisito de Space Apps).
- El README debe explicar cómo correr el proyecto.
- Se invita a los jueces solo por enlace; no hace falta dar permisos.

---

## 9. Checklist

- [ ] `gh auth status` dice "Logged in"
- [ ] `git config user.email` es el correo de mi cuenta
- [ ] Puedo clonar el repo
- [ ] Puedo crear una rama y hacer push
- [ ] Mi PR aparece en el repo
- [ ] Mi nombre aparece en `git log`

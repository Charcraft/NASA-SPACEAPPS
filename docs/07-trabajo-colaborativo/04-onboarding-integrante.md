# 07.4 · Onboarding de un integrante

> De cero a primer PR mergeado en **45 minutos**.
> Si alguien tarda más, algo de esta guía está mal y hay que corregirlo.

---

## Antes de empezar

Necesitas:

- Tu propia laptop con Windows, macOS o Linux.
- Una cuenta de GitHub (la misma con la que estás registrado en Space Apps, o una vinculada).
- Acceso al repo (Eduardo te invita).
- 45 minutos sin interrupciones.

---

## Paso 1 · Herramientas (15 min)

### Git
```bash
git --version
```
Si no aparece, instalar desde git-scm.com.

### GitHub CLI
```bash
gh --version
gh auth login
```
Elegir: GitHub.com → HTTPS → login por navegador.

### Node.js 22 LTS + pnpm
```bash
node --version     # debe ser v22.x
pnpm --version     # si no existe: npm i -g pnpm
```

### Orca
```bash
orca --version
```
Si no está, instalarlo desde el sitio oficial.

### Tu harness de IA
El que uses: OpenCode, Claude Code, Codex, Cursor, Copilot. **No importa cuál.** Los cinco leen las mismas reglas.

---

## Paso 2 · Clonar (5 min)

```bash
gh repo clone <org>/NASA-SPACEAPPS
cd NASA-SPACEAPPS
```

### Verificar que estás en el repo correcto
```bash
git remote -v
git log --oneline -3
```

Debes ver commits y la URL del repo. Si no, no clonaste bien.

---

## Paso 3 · Configurar tu identidad (2 min)

```bash
git config user.name "Tu Nombre"
git config user.email "tu@correo.com"
```

> **Importante:** usar el correo asociado a tu cuenta de GitHub, o tus commits aparecerán como de otra persona.

---

## Paso 4 · Registrar el proyecto en Orca (5 min)

```bash
orca repo add --path .
orca repo list
```

Debes ver el repo listado. Si no aparece, revisar la ruta (debe ser absoluta).

---

## Paso 5 · Ejecutar tu setup (5 min)

```powershell
# Windows
.\scripts\setup-integrante.ps1 -Usuario tu-usuario
```

```bash
# macOS / Linux
bash scripts/setup-integrante.sh tu-usuario
```

El script:

1. Verifica que tengas las herramientas.
2. Comprueba tu identidad de git.
3. Crea `team/<tu-usuario>/` si no existe.
4. Te muestra **tu primer issue**.

---

## Paso 6 · Leer las reglas (10 min)

En este orden, sin saltarse nada:

1. `AGENTS.md` — reglas de trabajo y veracidad.
2. `README.md` — qué es el proyecto.
3. `docs/00-INDEX.md` — el mapa.
4. `docs/07-trabajo-colaborativo/02-flujo-git-y-pr.md` — cómo se trabaja.

Los demás documentos se leen **cuando se necesitan**, no de golpe.

---

## Paso 7 · Tu primer PR (8 min)

Vas a hacer un cambio real, pequeño y tuyo: llenar tu perfil.

```bash
# 1. Rama
git checkout main
git pull
git checkout -b docs/tu-usuario/perfil

# 2. Editar
# Abre team/tu-usuario/perfil.md y responde las preguntas

# 3. Commit
git add team/tu-usuario/perfil.md
git commit -m "docs(team): completa perfil de <tu nombre>"

# 4. Push
git push -u origin docs/tu-usuario/perfil

# 5. PR
gh pr create --fill
```

Cuando alguien lo apruebe y se mergee, **ya estás dentro**.

---

## Checklist de onboarding

- [ ] `git --version` funciona
- [ ] `gh auth status` está autenticado
- [ ] `node --version` es 22.x
- [ ] `orca --version` responde
- [ ] Repo clonado y con commits
- [ ] Identidad de git configurada con el correo correcto
- [ ] Repo registrado en Orca
- [ ] Carpeta `team/<usuario>/` existe
- [ ] `AGENTS.md` leído
- [ ] Perfil lleno
- [ ] Primer PR abierto y mergeado
- [ ] Mi nombre aparece en `git log`

---

## Problemas comunes

| Síntoma | Causa | Solución |
|---|---|---|
| `gh: command not found` | No instalado o no en PATH | Reinstalar y abrir terminal nueva |
| `Permission denied (publickey)` | SSH mal configurado | Usar HTTPS: `gh auth setup-git` |
| Los commits salen con otro nombre | Identidad global equivocada | `git config --local user.name/email` |
| `orca: not found` | No instalado | Instalar; verificar `orca --version` |
| `fatal: not a git repository` | Estás en otra carpeta | `cd` al repo |
| Cursor no lee las reglas | Falta `.cursor/rules/` | Ya existe en el repo; abrir la carpeta raíz, no una subcarpeta |
| Conflicto al hacer pull | Alguien tocó tu archivo | Ver §5 de `02-flujo-git-y-pr.md` |
| `pnpm: command not found` | No instalado | `npm i -g pnpm` |

---

## Lo que NO tienes que hacer

- ❌ Instalar Docker.
- ❌ Configurar una base de datos.
- ❌ Crear variables de entorno (hasta que haya código).
- ❌ Leer los 20 documentos.
- ❌ Entender toda la ciencia antes de empezar.

---

## A quién preguntar

| Tema | Persona |
|---|---|
| Git, ramas, PRs, conflictos | Carlos Alberto (@giganroker) |
| Orca, worktrees, agentes | Carlos De Jesús (@cxrlosmp) |
| Qué construir y prioridades | Eduardo (@danny1510) |
| Datos y ciencia | Carlos De Jesús (@cxrlosmp) |
| Diseño, video, narrativa | Ernesto (@ernesto-montes) |
| Acceso al repo, invitaciones | Eduardo (@danny1510) |

**Si estás bloqueado más de 15 minutos, pregunta.** No hay premio por resolverlo solo.

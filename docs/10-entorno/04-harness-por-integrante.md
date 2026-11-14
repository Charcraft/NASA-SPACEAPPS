# 10.4 · Tu harness, tu modelo, las mismas reglas

> Cada quien usa lo que le acomode. **Lo que no cambia son las reglas** (`AGENTS.md`) ni el repo.

---

## 1. Tabla de equivalencias

| Harness | Archivo de reglas que lee | Carpeta de skills | Configuración |
|---|---|---|---|
| **OpenCode** | `AGENTS.md` | `~/.config/opencode/skills/` o `.opencode/skills/` | `opencode.json` |
| **Claude Code** | `CLAUDE.md` → apunta a `AGENTS.md` | `~/.claude/skills/` | `.mcp.json`, `settings.json` |
| **Codex** | `AGENTS.md` | — (lee archivos directamente) | `~/.codex/config.toml` |
| **Cursor** | `.cursor/rules/proyecto.mdc` → apunta a `AGENTS.md` | `.cursor/skills/` | `.cursor/mcp.json` |
| **GitHub Copilot** | `.github/copilot-instructions.md` → apunta a `AGENTS.md` | — | Ajustes del editor |

> Los adaptadores ya están en el repo. **No hay que crear nada**: clona y funciona.

---

## 2. Elegir modelo

No hay una respuesta única, porque depende de la tarea. La regla práctica:

| Tarea | Tipo de modelo | Por qué |
|---|---|---|
| Escribir componentes de UI | Rápido | La tarea es acotada y el error se ve en pantalla |
| Lógica clínica y tests | Fuerte | Un umbral mal escrito es un error que llega al jurado |
| Documentación y redacción | Rápido | Se revisa leyendo |
| Depurar un build roto | Fuerte | Requiere sostener mucho contexto |
| Generar datos de prueba | Rápido | Da igual si hay que repetirlo |
| Revisar el trabajo de otro | Fuerte | Es donde un error se detecta antes de mergear |

**No se discute el modelo de nadie.** Si a alguien le funciona, funciona. Lo único obligatorio es que el resultado pase la revisión.

---

## 3. Primera configuración (5 minutos)

### OpenCode

```bash
# 1. Instalar skills (una vez)
.\scripts\instalar-skills.ps1 -Harness opencode

# 2. Abrir el proyecto
cd NASA-SPACEAPPS
opencode
```

Verificar que lee las reglas: preguntarle *"¿cuáles son las reglas de este proyecto?"*. Debe responder con contenido de `AGENTS.md`.

### Claude Code

```bash
.\scripts\instalar-skills.ps1 -Harness claude
cd NASA-SPACEAPPS
claude
```

Verificar: `/memory` debe mostrar `CLAUDE.md` cargado. Si no, abrir Claude Code **desde la raíz del repo**, no desde una subcarpeta.

### Cursor

```bash
.\scripts\instalar-skills.ps1 -Harness cursor
```

Abrir la carpeta raíz en Cursor. En *Settings → Rules* debe aparecer `proyecto.mdc` como regla activa.

### Codex

```bash
cd NASA-SPACEAPPS
codex
```

Verificar que encuentra `AGENTS.md`. Si no lo lee automáticamente, dárselo al inicio de la sesión: *"Lee AGENTS.md antes de responder"*.

---

## 4. Cómo saber que todo está bien

Checklist de 4 puntos, igual para todos:

- [ ] El agente cita algo del `AGENTS.md` sin que se lo pidas
- [ ] El agente sabe que **no** se escribe código de producto antes del 14
- [ ] Al pedirle una tarea, propone trabajo en `team/<tu-usuario>/` o en su carpeta asignada
- [ ] Las skills aparecen disponibles (preguntarle *"¿qué skills tienes?"*)

Si falla cualquiera, **no empieces a trabajar**: arréglalo primero. Un agente sin reglas inventa.

---

## 5. Lo que cada harness **no** resuelve

| Problema | Quién lo resuelve |
|---|---|
| Que dos personas editen el mismo archivo | Git + la regla "un archivo, un dueño" |
| Que el agente sepa qué hacer | El issue asignado, no el agente |
| Que la app funcione en otra máquina | El build, no el harness |
| Compartir sesión en vivo | Nadie. Se trabaja asíncrono |

---

## 6. Cambiar de harness a mitad del hackathon

**No se hace.** Aprender una herramienta nueva el domingo a las 2 de la mañana es la forma más cara de perder dos horas.

Si tu harness falla:
1. Cambia a otro que ya tengas instalado.
2. Abre el mismo repo.
3. Sigue las mismas reglas.

El proyecto no depende del harness. Eso es exactamente por lo que `AGENTS.md` existe.

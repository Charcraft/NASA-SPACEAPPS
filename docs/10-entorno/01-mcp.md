# 10.1 · Conectar MCPs

> **Primero, la verdad incómoda:** para este proyecto **no necesitas casi ningún MCP**.
> El trabajo se hace con git, un editor y un navegador. Los MCPs añaden contexto, latencia y modos de fallo.
>
> Añade uno solo cuando te falte una capacidad concreta.

---

## 1. Qué es un MCP

Un servidor que le da herramientas a tu agente. Ejemplos: leer GitHub, consultar documentación, controlar un navegador, hablar con una base de datos.

```
Agente  ──►  servidor MCP  ──►  API real (GitHub, docs, base de datos)
```

Sin el servidor, el agente solo puede usar el shell y los archivos. Con el servidor, tiene herramientas nativas.

---

## 2. Los MCPs que sí tienen sentido aquí

| MCP | Para qué | ¿Hace falta? |
|---|---|---|
| **GitHub** | Crear issues y PRs sin salir del agente | 🟡 Útil, no imprescindible (`gh` CLI ya lo hace) |
| **Context7** | Documentación actualizada de Next.js, Tailwind, three.js | 🟢 Sí, si vas a escribir código de librería |
| **Playwright / navegador** | Pruebas de UI | 🟡 Solo si alguien automatiza tests |
| **Filesystem** | Acceso a archivos fuera del proyecto | ❌ No, ya tienes el editor |

> El navegador de BrowserAct **no es un MCP**: es un CLI. Ver `03-browseract.md`.

---

## 3. Cómo se conecta, por harness

### OpenCode

Archivo `opencode.json` en la raíz del proyecto (o en `~/.config/opencode/opencode.json`):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true
    }
  }
}
```

Servidor local (proceso propio):

```json
{
  "mcp": {
    "mi-servidor": {
      "type": "local",
      "command": ["npx", "-y", "@paquete/mcp"],
      "enabled": true,
      "environment": { "MI_TOKEN": "{env:MI_TOKEN}" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add context7 -- npx -y @context7/mcp
claude mcp list
```

O declarativo, en `.mcp.json` en la raíz del proyecto:

```json
{
  "mcpServers": {
    "context7": { "command": "npx", "args": ["-y", "@context7/mcp"], "env": {} }
  }
}
```

### Cursor

Archivo `.cursor/mcp.json` con la misma forma que `.mcp.json` de Claude:

```json
{
  "mcpServers": {
    "context7": { "command": "npx", "args": ["-y", "@context7/mcp"] }
  }
}
```

### Codex

En `~/.codex/config.toml`:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@context7/mcp"]
```

> ⚠️ La sintaxis exacta cambia entre versiones. **Verifica siempre** con la documentación de tu harness antes de pelear con un archivo de configuración. Si el agente no ve la herramienta después de reiniciar, el 90 % de las veces es el formato del archivo.

---

## 4. Cómo saber si funcionó

1. Reinicia el harness (o recarga la ventana).
2. Pregunta al agente por sus herramientas disponibles.
3. Pide una acción trivial concreta ("lista los issues abiertos del repo").
4. Si falla:
   - Revisa que el comando exista: ejecútalo a mano en la terminal.
   - Revisa la ruta del archivo de configuración.
   - Revisa los logs del harness.

---

## 5. Secretos

- **Nunca** pegues un token en un archivo que va al repositorio.
- Usa variables de entorno: `{env:GITHUB_TOKEN}` en OpenCode, `$GITHUB_TOKEN` en shell.
- `.env` está en `.gitignore`. Comprueba antes de commitear.
- Si commiteas un token por error: **revócalo inmediatamente**, no lo borres con otro commit. El historial lo guarda.

---

## 6. Regla del proyecto

> **Un MCP por persona, como máximo, y solo si resuelve un bloqueo real.**

Si dos agentes necesitan MCPs distintos, se documenta aquí y se sigue. No se convierten en requisito del equipo.

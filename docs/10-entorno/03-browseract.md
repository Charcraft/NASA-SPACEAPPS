# 10.3 · BrowserAct, en detalle

> **Para qué sirve en este proyecto:** leer páginas que necesitan JavaScript, entrar a sesiones ya iniciadas, sacar capturas para el README y la documentación, y automatizar trámites (formularios, GitHub, OSDR).
>
> **Regla de oro:** si `curl` o un fetch normal funcionan, no uses un navegador. El navegador es para lo que no se puede hacer sin él.

---

## 1. Instalación

```bash
uv tool install browser-act-cli --python 3.12
browser-act --version
```

Verificar que el CLI responde antes de cualquier otra cosa.

### Cargar la guía correcta para tu versión

La sintaxis cambia entre versiones. **Nunca asumas comandos de memoria.**

```bash
browser-act get-skills core --skill-version 2.0.2
```

Para gestión de navegadores (crear, borrar, importar perfil, proxies):

```bash
browser-act get-skills advanced
```

---

## 2. Los dos modos

| Modo | Comando | Cuándo |
|---|---|---|
| **Extracción rápida** | `browser-act stealth-extract <url>` | Leer una página con JS, sin sesión. Cada llamada es independiente y se puede paralelizar |
| **Navegador completo** | `browser-act --session <nombre> ...` | Necesitas sesión, clics, formularios, capturas o estado persistente |

> `stealth-extract` requiere API key. Si no está configurada, el error te da el enlace de registro. No lo inventes: sigue el flujo que imprime el propio CLI.

---

## 3. El bucle de trabajo (memorizar)

```
open → state → interact → verify → close
```

### 3.1 Abrir

```bash
browser-act --session nasa-spaceapps browser open <browser_id> <url>
```

- El `browser_id` se obtiene con `browser-act browser list`.
- Un navegador soporta **varias sesiones en paralelo**: cada una es una ventana independiente que comparte el login.
- Si la sesión ya existe en esta conversación, **no vuelvas a abrir**: usa `navigate`.

### 3.2 Inspeccionar el estado

```bash
browser-act --session nasa-spaceapps state
```

Devuelve la lista de elementos interactivos con un índice temporal:

```
[1] <a /> Learn more
[2] input "Search"
[3] button "Go"
```

⚠️ **El índice `[N]` no es un identificador estable.** Después de un clic, navegación o recarga, los números cambian. **Vuelve a ejecutar `state` antes de cada interacción.**

### 3.3 Interactuar

```bash
browser-act --session nasa-spaceapps input 2 "texto"
browser-act --session nasa-spaceapps click 3
browser-act --session nasa-spaceapps select 4 "opción"
browser-act --session nasa-spaceapps keys "Enter"
browser-act --session nasa-spaceapps scroll down --amount 800
```

Con selector estable, cuando lo conozcas:

```bash
browser-act --session nasa-spaceapps click --selector "button.submit"
```

### 3.4 Verificar

```bash
browser-act --session nasa-spaceapps wait stable --timeout 45000
browser-act --session nasa-spaceapps get markdown      # texto legible
browser-act --session nasa-spaceapps get text 7        # un elemento
browser-act --session nasa-spaceapps screenshot ./captura.png
browser-act --session nasa-spaceapps network requests --type xhr,fetch
```

`wait stable` espera a que la red quede quieta. **Úsalo después de cada navegación**, o leerás una página a medio cargar.

### 3.5 Cerrar

```bash
browser-act session close nasa-spaceapps
```

Cerrar la sesión **no borra el navegador**: el login y las cookies siguen ahí para la próxima vez.

---

## 4. Reglas de convivencia entre agentes

Un equipo de 5 personas puede tener varios agentes usando el mismo navegador administrado. Para no pisarse:

1. **Antes de usar una sesión, revisa tu propio historial.** Si tú no la abriste en esta conversación, **no es tuya**: abre una nueva.
2. Nunca cierres la sesión de otra persona.
3. Si el nombre choca, usa otro (`nasa-spaceapps-2`, `nasa-cxrlosmp`).
4. Actualiza la `desc` del navegador cuando descubras algo útil sobre él:

```bash
browser-act browser update <id> --desc "Space Apps 2026. Cuenta X. Verificado: login activo, envio 15-nov 17:00."
```

Esa descripción es la memoria que ahorra 20 minutos la próxima vez.

---

## 5. Confirmación obligatoria antes de operaciones destructivas

Estas operaciones **no se ejecutan nunca** en el mismo mensaje en que se proponen:

| Operación | Por qué |
|---|---|
| `browser create` | Consume cuota y crea un entorno persistente |
| `browser delete` | Borra login y cookies para siempre, sin deshacer |
| `browser import-profile` | Puede cerrar el navegador del usuario y forzar re-verificación |
| `browser update --private` | Cambia el modelo de persistencia |
| `proxy buy-request` | Cuesta dinero |

**Flujo correcto:** describir qué se va a hacer y por qué → esperar respuesta → ejecutar.

---

## 6. Cuando hace falta que una persona entre

Si la página pide contraseña, 2FA, código QR, huella o captura interactiva, **no intentes automatizarlo**:

```bash
browser-act --session nasa-spaceapps remote-assist --objective "Iniciar sesion en Google con la cuenta del proyecto"
```

Devuelve un enlace que la persona abre en su navegador y toma el control. Al enviarlo, **el agente deja de operar la sesión** hasta que la persona confirme.

### Regla dura
**Nunca pedir, escribir ni almacenar contraseñas.** El agente no teclea credenciales, ni siquiera si se las dan.

---

## 7. Captchas

Orden de intentos, y hasta ahí:

1. Cambiar a un navegador *stealth* con proxy.
2. `solve-captcha`.
3. `remote-assist` y que lo resuelva la persona.

Si los tres fallan, se reporta y se sigue por otra vía.

---

## 8. Detalles que evitan perder tiempo

| Situación | Qué hacer |
|---|---|
| La página carga lento | `wait stable --timeout 45000` antes de leer |
| La página es una app React | `get markdown` puede venir vacío: usa `get html --selector` o `state` |
| Necesitas un dato estructurado | `network requests --filter <api>` y lee la respuesta JSON, en vez de parsear el DOM |
| Subir un archivo | `upload <index> <ruta>`. **Nunca** hagas clic en el botón de subir: abre el diálogo del sistema operativo |
| El índice `[N]` ya no existe | Volviste a un estado viejo: ejecuta `state` otra vez |
| `daemon is not reachable` | Reintenta una vez. Si persiste, revisa procesos `chrome.exe` huérfanos del perfil |
| `file is being used by another process` al importar perfil | Hay un Chrome abierto con ese perfil. Ciérralo y reintenta |

---

## 9. Recetas concretas para este proyecto

### Leer una página oficial de NASA sin navegador

```bash
browser-act stealth-extract "https://www.nasa.gov/hrp/risks/" --content-type markdown
```

### Entrar al equipo y sacar quiénes son

```bash
browser-act --session nasa-spaceapps navigate "https://www.spaceappschallenge.org/2026/find-a-team/team-rocket13/"
browser-act --session nasa-spaceapps wait stable
# clic en la pestaña Members (el índice sale de `state`)
browser-act --session nasa-spaceapps get markdown
```

### Consultar el dashboard de OSDR

```bash
browser-act --session nasa-spaceapps navigate "https://osdr.nasa.gov/bio/repo/data/studies/OSD-575"
browser-act --session nasa-spaceapps get markdown
```

### Ver qué pide el formulario de submission antes de llenarlo

```bash
browser-act --session nasa-spaceapps navigate "https://www.spaceappschallenge.org/2026/find-a-team/team-rocket13/"
# pestaña Project (aparece el 14 de noviembre a las 9:00)
browser-act --session nasa-spaceapps state
```

---

## 10. Checklist antes de dar una tarea de navegador por terminada

- [ ] El dato que buscaba está escrito en un archivo del repo, no solo en el chat
- [ ] Cité la URL y la fecha
- [ ] Cerré la sesión que abrí
- [ ] Actualicé la `desc` del navegador si aprendí algo
- [ ] No dejé credenciales en ningún archivo
- [ ] Si la página pedía login, usé `remote-assist` en vez de intentar adivinarlo

# 10.5 · Tu navegador personal

> **Cada integrante tiene el suyo. No se comparte.**
> El de Pineda (`NASA-BROWSER`) es personal: tiene su sesión de Google, su Gmail y sus cosas. El tuyo tendrá las tuyas.

---

## Por qué cada quien necesita uno

Un navegador administrado por BrowserAct guarda **sesiones reales**: Google, GitHub, Space Apps, OSDR. Si cinco personas comparten uno, pasan tres cosas:

1. **Cualquiera ve la cuenta de los demás.** Correos, Drive, formularios.
2. **Se pisan las sesiones.** Dos agentes navegando a la vez en el mismo perfil se desconectan entre sí.
3. **Se rompe la trazabilidad.** No se sabe quién hizo qué.

Uno por persona es más limpio, más rápido y más seguro.

---

## Qué es exactamente

Un **Chrome aislado** que vive aparte de tu Chrome normal:

- Tiene su propia carpeta de perfil, sus cookies y su historial.
- Puede importar tu sesión de Chrome una vez, para no volver a iniciar sesión en todo.
- Tu Chrome de siempre no se toca (salvo un momento durante la importación).
- Tu agente lo controla por línea de comandos: navegar, leer, hacer clic, capturar.

---

## Instalación (10 minutos)

### 1 · Instalar el CLI

```bash
uv tool install browser-act-cli --python 3.12
browser-act --version
```

Si no tienes `uv`: https://docs.astral.sh/uv/getting-started/installation/

### 2 · Crear tu navegador

```powershell
.\scripts\crear-navegador.ps1 -Usuario <tu-usuario>
```

```bash
bash scripts/crear-navegador.sh <tu-usuario>
```

Esto crea un navegador llamado **`NASA-<tu-usuario>`**, vacío y sin sesiones.

### 3 · Elegir qué perfil importar

El script imprime la lista de perfiles de Chrome de tu máquina:

```
local_profile_112511511882105068  Tu Chrome   local   tucorreo@gmail.com   Chrome
```

Elige el que tenga **tu** cuenta y ejecuta:

```powershell
.\scripts\crear-navegador.ps1 -Usuario <tu-usuario> -PerfilId <profile_id> -Abrir
```

> ⚠️ La importación puede **cerrar tu Chrome** un momento mientras copia. Guarda lo que tengas abierto.

### 4 · Iniciar sesión

Se abre una ventana. **Escribe tu contraseña tú mismo.** Ni tu agente ni nadie más debe teclearla.

> Google puede pedirte verificar la cuenta la primera vez, porque detecta un entorno distinto. Es normal: confirma desde tu celular y sigue.

### 5 · Verificar

```powershell
browser-act --session nasa-<tu-usuario> navigate "https://myaccount.google.com/"
browser-act --session nasa-<tu-usuario> get title
```

Si dice "Cuenta de Google", ya está.

---

## Cómo se usa a partir de ahí

**Convención de sesión:** `nasa-<tu-usuario>`

```bash
browser-act --session nasa-angel_marco browser open <browser_id> https://www.spaceappschallenge.org/
browser-act --session nasa-angel_marco state
browser-act --session nasa-angel_marco get markdown
```

Y dile a tu agente:

> *"Busca esto en internet usando mi navegador `nasa-angel_marco`"*

El agente sabrá de cuál hablas porque el nombre lleva tu usuario.

---

## Lo que tu agente debe hacer

1. **Preguntar antes de crear un navegador.** Es una operación que deja estado y consume cuota.
2. **No asumir** qué perfil importar: siempre mostrar la lista y esperar.
3. **No pedir ni escribir contraseñas.** Si hace falta login, se abre en modo visible y lo hace la persona.
4. **No usar el navegador de otra persona.**

Está escrito en `AGENTS.md` y en `docs/10-entorno/03-browseract.md`.

---

## Problemas comunes

| Síntoma | Causa | Solución |
|---|---|---|
| `browser-act: command not found` | No instalado o no está en PATH | Reinstalar y abrir una terminal nueva |
| `file is being used by another process` | Chrome abierto con ese perfil | Cerrar Chrome y reintentar |
| `Command daemon is not reachable` | Proceso previo colgado | Reintentar una vez; si persiste, cerrar procesos `chrome.exe` huérfanos del perfil |
| Google pide verificar la cuenta | Entorno nuevo | Confirmar desde el celular |
| La sesión no se copió | Google invalidó las cookies | Iniciar sesión manualmente en la ventana abierta |
| El agente usa el navegador equivocado | Nombre ambiguo | Decirle el nombre exacto: `nasa-<tu-usuario>` |

---

## Reglas de privacidad

- Tu navegador tiene **tu** cuenta. No lo prestes.
- No guardes contraseñas en archivos del repo.
- No pegues datos personales en un prompt.
- Si vas a mostrar pantalla compartida, cierra las pestañas personales.

---

## Checklist

- [ ] `browser-act --version` responde
- [ ] Existe un navegador `NASA-<mi-usuario>`
- [ ] Importé mi perfil (o decidí no hacerlo)
- [ ] Inicié sesión yo mismo
- [ ] Verifiqué con `myaccount.google.com`
- [ ] Sé el nombre de mi sesión: `nasa-<mi-usuario>`
- [ ] Mi agente ya lo sabe

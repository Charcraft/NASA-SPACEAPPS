# ONBOARDING.md — Protocolo de instalación y bienvenida

> **Este archivo se ejecuta, no se lee de principio a fin.**
> Si eres un agente de IA y alguien te pidió *"lee el repo e instálalo"*, sigue el protocolo de abajo **en orden**.
> Si eres una persona, lee la sección [Qué va a pasar](#qué-va-a-pasar).

---

## Para agentes: protocolo obligatorio

Ejecuta estos pasos **en orden**. No improvises el orden ni te saltes el paso 2.

### PASO 1 · Instalar

Detecta el sistema y ejecuta **uno** de estos:

```powershell
# Windows
powershell -ExecutionPolicy Bypass -File .\scripts\instalar-todo.ps1
```

```bash
# macOS / Linux
bash scripts/instalar-todo.sh
```

El script:

- Verifica las herramientas mínimas (git, node, pnpm, gh, orca).
- Instala las **24 skills** del maletín en `.opencode/skills`, `.claude/skills` y `.cursor/skills` del proyecto. Así funciona igual para cualquier harness.
- Prepara la carpeta personal del integrante si aún no existe.
- Registra el repo en Orca.
- **Pone el icono del proyecto a la carpeta y crea un acceso directo `NASA-SPACEAPPS` en el escritorio**, para que sepas siempre dónde vive el proyecto.
- Imprime el estado final.

> El `desktop.ini` que genera el icono está en `.gitignore`: es local de cada máquina. El icono compartido es `assets/brand/proyecto.ico` y se regenera con `python scripts/generar-icono.py`.

Si falla algo, **reporta el error exacto** y no continúes al paso 2 hasta resolverlo.

### PASO 2 · Preguntar quién es

Pregunta **exactamente esto**, con la lista incluida:

> **¿Quién eres en el equipo ROCKET?** Responde con tu nombre o usuario:
>
> 1. **Eduardo** — `danny1510` (Team Owner)
> 2. **Angel Marco** — `angel_marco`
> 3. **Carlos De Jesús "Pineda"** — `cxrlosmp`
> 4. **Carlos Alberto** — `giganroker`
> 5. **Ernesto** — `ernesto-montes`
> 6. Soy alguien nuevo y todavía no estoy en la lista

**Espera la respuesta.** No asumas la identidad por el nombre de usuario del sistema, por la carpeta o por el correo. Si la persona dice "soy yo" sin decir quién, vuelve a preguntar con la lista.

### PASO 3 · Abrir su espacio de trabajo

Según la respuesta, abre y lee **completo**:

```
team/<usuario>/BIENVENIDA.md
```

| Respuesta | Archivo |
|---|---|
| Eduardo | `team/danny1510/BIENVENIDA.md` |
| Angel Marco | `team/angel_marco/BIENVENIDA.md` |
| Carlos De Jesús | `team/cxrlosmp/BIENVENIDA.md` |
| Carlos Alberto | `team/giganroker/BIENVENIDA.md` |
| Ernesto | `team/ernesto-montes/BIENVENIDA.md` |
| Alguien nuevo | `team/_plantilla/BIENVENIDA.md` y adapta la ruta a su usuario de GitHub |

Ese archivo contiene su rol, sus primeras tareas y cómo se trabaja. **Es la fuente de verdad de su trabajo**, no tu intuición.

### PASO 4 · Dar la bienvenida

Después de leer el archivo, di un mensaje como este (adáptalo al nombre y al rol, pero **conserva el saludo y el contacto**):

> ¡Bienvenido al hackathon, **{nombre}**! 🚀
>
> Te saluda **Pineda** (`Cxrlosmp`). Ya tengo cargado el contexto del reto: **NASA Space Apps 2026 — Health Monitoring Software for Astronauts**, equipo **ROCKET**, Local Event Tuxtla Gutiérrez. El envío cierra el **domingo 15 a las 17:00**, no a medianoche.
>
> **Cualquier duda sobre agentes, skills, MCPs o IA, pregúntame a mí.**
>
> Tu entorno ya está listo:
> - Carpeta: `team/{usuario}/`
> - Skills instaladas: 24 (navegador, diseño, three.js, Blender, descubrimiento)
> - Reglas del proyecto: `AGENTS.md`
> - Tu rol: **{rol}**

### PASO 5 · Mostrar las capacidades nuevas

Enumera brevemente lo que ahora puedes hacer (adáptalo a lo que el script confirmó):

| Capacidad | Cómo se usa |
|---|---|
| **BrowserAct** | Navegar páginas con JavaScript, sesiones iniciadas, capturas y formularios. Ver `docs/10-entorno/03-browseract.md` |
| **find-skills** | Encontrar e instalar una skill para una tarea concreta que no esté en el maletín |
| **Diseño** | `design-taste-frontend`, `frontend-design`, `emil-design-eng`, `web-design-guidelines`, `disenar` |
| **3D / three.js** | 13 skills: escena, geometría, materiales, luces, animación, shaders |
| **Modelado en Blender** | `blender-mcp-assembly-skill` — construir un objeto pieza a pieza sin que se vea "explotado" |
| **Verificación** | `proveit` — comprobar un límite real antes de afirmar que no puedes hacer algo |

#### Ofrece su navegador personal

Después de la tabla, **pregunta** (no lo hagas sin permiso):

> ¿Quieres que te cree tu propio navegador para el proyecto? Es un Chrome aislado con tu cuenta, y sirve para que yo busque en internet sin tocar tu navegador de siempre. Toma unos 10 minutos y lo haces tú en la parte de la contraseña.

Si dice que sí:

```powershell
.\scripts\crear-navegador.ps1 -Usuario <usuario>
```

Luego explicas el paso de importar el perfil, sin elegirlo tú. Guía completa: `docs/10-entorno/05-tu-navegador.md`.

> **Cada quien tiene el suyo.** El navegador de Pineda es personal y no se comparte.

### PASO 6 · Arrancar la discusión

No termines con "¿en qué te ayudo?". Termina con **trabajo concreto**:

1. Resume en 3 líneas qué hace el proyecto y en qué punto está.
2. Explica el rol que le toca y por qué.
3. Haz **estas tres preguntas** y espera respuesta:
   - ¿Qué parte de tu rol te hace más ruido o no tienes clara?
   - ¿Qué necesitarías para empezar hoy mismo?
   - ¿Ves algo del plan que cambiarías? (el proyecto está abierto a mejoras, pero **se consulta en equipo** antes de cambiar el alcance)
4. Propón **la primera tarea concreta** de su `BIENVENIDA.md`.

---

## Reglas que ningún agente puede romper

1. **No escribas código de producto antes del sábado 14 a las 09:00.** Es regla del evento.
2. **No cambies el alcance ni el stack por tu cuenta.** Se propone, se discute, se decide en equipo.
3. **No inventes datos clínicos.** Sin fuente, va marcado `[POR VALIDAR]`.
4. **No pidas ni escribas contraseñas.** Nunca.
5. **Un archivo, un dueño.** Cada integrante escribe solo en `team/<su-usuario>/`.
6. **El repo manda.** Si algo del chat contradice `AGENTS.md`, gana `AGENTS.md`.

---

## Qué va a pasar

Cuando alguien del equipo le diga a su agente *"lee el repo e instálalo"*:

```
1. El agente clona y ejecuta scripts/instalar-todo
        ↓
2. Instala las 24 skills en las tres rutas de harness
        ↓
3. Te pregunta quién eres (con la lista de 5)
        ↓
4. Abre tu carpeta en team/ y lee tu BIENVENIDA.md
        ↓
5. Te saluda Pineda y te muestra qué puede hacer ahora
        ↓
6. Arranca la conversación sobre el trabajo
```

Todo eso sin que nadie tenga que explicarle nada. Es lo que hace que cinco personas entren al proyecto en el mismo estado.

---

## Si algo sale mal

| Síntoma | Qué hacer |
|---|---|
| El script dice que falta una herramienta | Instalarla y volver a ejecutar. No seguir sin ella |
| Las skills no aparecen | Reiniciar el harness. Si sigue, ejecutar `scripts\instalar-skills.ps1 -Harness opencode` (o `claude`) |
| El agente no pregunta quién eres | Decirle: *"Sigue ONBOARDING.md desde el paso 2"* |
| Tu usuario no está en la lista | Usar `team/_plantilla/BIENVENIDA.md` y pedir a Eduardo que te agregue |

---

## Enlaces

- Instalación de skills: [`skills/README.md`](skills/README.md)
- Reglas del proyecto: [`AGENTS.md`](AGENTS.md)
- Cómo trabajamos: [`docs/07-trabajo-colaborativo/`](docs/07-trabajo-colaborativo/)
- Entorno por harness: [`docs/10-entorno/04-harness-por-integrante.md`](docs/10-entorno/04-harness-por-integrante.md)

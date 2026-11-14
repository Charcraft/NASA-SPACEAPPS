# skills/ — Maletín de habilidades del equipo

> **Para agentes:** si lees esto, estas son las habilidades que debes cargar antes de empezar una tarea.
> No las improvises. Cada una tiene un `SKILL.md` con instrucciones verificadas.
>
> **Para personas:** instala el maletín con un comando y tu harness las verá como propias.

---

## Qué es una skill

Una carpeta con un archivo `SKILL.md` que le dice a tu agente **cómo hacer bien una tarea concreta**: qué pasos seguir, qué errores evitar, qué comandos usar.

No es documentación para leer de principio a fin. Es una instrucción que se carga **cuando la tarea la necesita**.

```
skills/
└── threejs-geometry/
    └── SKILL.md        ← se carga cuando vas a construir geometría 3D
```

---

## Instalación (una vez por persona)

```powershell
# Windows
.\scripts\instalar-skills.ps1 -Harness claude
```

```bash
# macOS / Linux
bash scripts/instalar-skills.sh claude
```

| Harness | Valor de `-Harness` | Dónde las instala |
|---|---|---|
| Claude Code | `claude` | `~/.claude/skills/` |
| OpenCode | `opencode` | `~/.config/opencode/skills/` |
| Cursor | `cursor` | `./.cursor/skills/` (por proyecto) |
| Codex / otros | `proyecto` | `./.opencode/skills/` (por proyecto) |

Sin argumento, instala en la carpeta del proyecto (`.opencode/skills/`), que es la opción más segura.

---

## Catálogo

### Descubrimiento y meta

| Skill | Cuándo cargarla |
|---|---|
| **`find-skills`** | **Siempre primero si no sabes qué skill usar.** Busca e instala habilidades para una tarea concreta. Es la que encuentra a las demás. |
| `proveit` | Cuando crees que no puedes acceder a algo (red, shell, archivos). Genera evidencia real antes de afirmar una limitación. |

### Navegador y datos web

| Skill | Cuándo cargarla |
|---|---|
| **`browser-act`** | Cualquier tarea que requiera un navegador real: páginas con JavaScript, sesiones autenticadas, capturas, formularios, extracción de contenido. **Ver `docs/10-entorno/03-browseract.md`.** |

### Diseño de interfaz

| Skill | Cuándo cargarla |
|---|---|
| `design-taste-frontend` | Antes de diseñar cualquier pantalla. Evita el look genérico de plantilla. |
| `frontend-design` | Dirección visual, tipografía, jerarquía. Cuando el diseño se siente plano. |
| `emil-design-eng` | Detalles invisibles: animación, microinteracciones, pulido. |
| `web-design-guidelines` | Revisión de accesibilidad y convenciones antes de dar una UI por terminada. |
| `disenar` | Flujo de diseño con captura de pantalla y corrección iterativa. Útil si el equipo diseña en vivo. |

### 3D y three.js

| Skill | Cuándo cargarla |
|---|---|
| `threejs-fundamentals` | Escena, cámara, renderer, bucle de render. **Empieza aquí.** |
| `threejs-geometry` | Construir formas, texto 3D, buffers, instancing. |
| `threejs-materials` | Estilo y comportamiento de materiales. |
| `threejs-lighting` | Luces, sombras, environment maps. |
| `threejs-textures` | Imágenes sobre materiales, UVs, color space. |
| `threejs-loaders` | Cargar glTF, comprimir con Draco/meshopt/KTX2. |
| `threejs-animation` | Animación por keyframes, esqueletos, morph targets. |
| `threejs-interaction` | Raycasting, selección, controles de cámara. |
| `threejs-postprocessing` | Bloom, DOF, grading. |
| `threejs-performance` | Cuando la escena va lenta. |
| `threejs-shaders` | Shaders GLSL/TSL personalizados. |
| `threejs-asset-pipeline` | Optimizar modelos antes de cargarlos. |
| `threejs-react-three-fiber` | Si se usa React Three Fiber. |

### Modelado 3D en Blender

| Skill | Cuándo cargarla |
|---|---|
| **`blender-mcp-assembly-skill`** | **La más importante para crear objetos.** Enseña a construir un modelo pieza a pieza con primitivas, bmesh y modificadores, evitando los tres errores de geometría que hacen que un modelo se vea "explotado". Cárgala **antes de escribir cualquier código de geometría**. |
| `blender-core` | Fundamentos de bpy, contexto, enums, API 5.x. Cárgala primero si el trabajo es en Blender. |

### Assets de juego

| Skill | Cuándo cargarla |
|---|---|
| `create-game-assets` | Dirección de arte, style bible, sprites, tilesets, iconos, texturas. Cuando el proyecto necesita coherencia visual, no solo una pantalla. |

---

## Regla de uso para agentes

1. **Antes de una tarea técnica, pregúntate:** ¿hay una skill para esto?
2. Si no lo sabes, carga `find-skills`.
3. Carga **una** skill por tarea. Cargar cinco a la vez gasta contexto y confunde.
4. Si la skill contradice a `AGENTS.md`, **manda `AGENTS.md`**.
5. Si la skill pide una herramienta que no tienes instalada, dilo antes de intentarlo.

---

## Regla de uso para personas

- No las leas todas. Carga la que corresponda a lo que estás haciendo.
- Si una skill te resulta inútil para este proyecto, dilo y se quita del maletín.
- Si encuentras una skill mejor, se añade aquí con un PR.

---

## Lo que este maletín NO incluye

| Excluida | Motivo |
|---|---|
| `playwright-skill` | 18 MB y 190 archivos. Se instala aparte si hace falta automatizar tests de navegador. |
| `impeccable` | 2.1 MB. Es excelente, pero el equipo no la necesita para una app de 30 h. |
| `hyperframes` / edición de video | Fuera del alcance del hackathon. |
| `roblox-*`, `aseprite-*` | No aplican a este reto. |

Si alguien las necesita, las instala por su cuenta con `find-skills`.

# TECH-STACK.md — Stack técnico decidido

> **Regla:** este documento se congela el **viernes 13 de noviembre a las 23:59**.
> Después de esa hora no se añade ninguna dependencia nueva. Cero excepciones.

---

## 1. Restricciones que mandan sobre el stack

| Restricción | Consecuencia técnica |
|---|---|
| ~30 horas efectivas de desarrollo (sáb 11:15 → dom 17:00) | Nada de backend propio. Nada de autenticación. |
| Internet del venue no confiable | **Offline-first obligatorio**. La app debe funcionar con el WiFi apagado. |
| 5 personas, perfiles mixtos, sin especialista médico | Stack con curva de aprendizaje baja y mucha documentación. |
| Jurado ve un **video de 1 minuto** y un repo público | El repo tiene que ser legible; el video se graba desde la app corriendo. |
| Debe ser open source y verificable | Sin servicios de pago obligatorios para que la app funcione. |
| Necesita gráficas, mapa corporal y datos reales | Librería de charts + visor 3D por WebGL con respaldo SVG. |

---

## 1.1 · Lenguajes por parte del software

> **Medido sobre el código real del repositorio el 2026-11-14**, no sobre el plan.
> Conteo sin `node_modules`, `.git`, `.next` ni `skills/`.

### Lo que usa cada parte

| Parte del software | Lenguaje | Dónde vive | Tamaño |
|---|---|---|---|
| **Interfaz** — pantallas, componentes | **TSX** (React 19) | `src/app/`, `src/components/` | 18 archivos · 5 416 líneas |
| **Lógica clínica** — umbrales y triage | **TypeScript** puro | `src/lib/rules/` | dentro de las 3 082 líneas de `.ts` |
| **Estado global** | **TypeScript** (Zustand) | `src/lib/store/` | — |
| **Persistencia offline** | **TypeScript** + Dexie (IndexedDB) | `src/lib/db/` | — |
| **Cliente de datos NASA** | **TypeScript** | `src/lib/osdr/` | — |
| **Asistente de IA** | **TypeScript** | `src/lib/ai/` | — |
| **Rutas de servidor** | **TypeScript** (Next route handlers) | `src/app/api/` | 5 rutas |
| **Modelo 3D del cuerpo** | **TypeScript + three.js** (WebGL) | `src/components/BodyModel3D.tsx` | — |
| **Estilos** | **CSS** (Tailwind v4) | `src/app/globals.css` | 16 líneas |
| **Datos y configuración** | **JSON** | `src/data/` | 9 archivos · 5 175 líneas |
| **Pipeline de datos** | **Python** | `scripts/*.py` | 8 archivos · 783 líneas |
| **Plugin de Figma** | **JavaScript + HTML** | `design/figma-plugin/` | 2 archivos JS · 995 líneas |
| **Automatización del equipo** | **PowerShell / Bash** | `scripts/*.ps1`, `*.sh` | 12 scripts · 1 076 líneas |
| **Mockups y assets** | **SVG** | `design/pantallas/`, `assets/` | 13 archivos · 1 580 líneas |
| **Build y configuración** | **MJS / JSON** | `postcss.config.mjs`, `next.config` | 3 archivos · 283 líneas |
| **Documentación** | **Markdown** | `docs/`, `team/`, raíz | 121 archivos |

### Totales por lenguaje

| Lenguaje | Archivos | Líneas |
|---|---|---|
| **TSX** | 18 | 5 416 |
| **TypeScript** | 17 | 3 082 |
| **JSON** | 9 | 5 175 |
| **SVG** | 13 | 1 580 |
| **JavaScript** | 2 | 995 |
| **HTML** | 4 | 912 |
| **Python** | 8 | 783 |
| **PowerShell** | 7 | 692 |
| **Bash** | 5 | 384 |
| **MJS** | 3 | 283 |
| **CSS** | 1 | 16 |

### Lo que NO usamos

| Lenguaje / tecnología | Por qué |
|---|---|
| **SQL / base de datos** | No hay backend persistente: todo vive en IndexedDB |
| **Java, Kotlin, C#, Swift** | No hay app nativa; es una PWA |
| **GLSL escrito a mano** | three.js genera los shaders; no tocamos shaders propios |
| **PHP, Ruby, Go** | Fuera del stack y sin necesidad |

### Desviaciones del stack congelado

El `TECH-STACK.md` original decía "sin three.js" y "sin backend". La realidad cambió:

| Se planeó | Se hizo | Motivo |
|---|---|---|
| Sin three.js | **three.js instalado** | El modelo 3D del cuerpo resultó más demostrable que el SVG |
| Sin backend | **5 rutas de API** | Proxy para OSDR, TTS y el asistente; no son una base de datos, son funciones sin estado |
| Solo TypeScript | **Python para datos y tooling** | El pipeline de OSDR y la generación del pitch son más simples en Python |

> Toda desviación está registrada aquí y en `MEMORY.md`. Si aparece otra, se anota igual.

---

## 2 · Stack principal

### Frontend
| Pieza | Elección | Motivo |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Routing y build listos; un solo comando para correr. |
| UI | **Tailwind CSS v4** | Velocidad; sin archivos CSS que mantener. |
| Componentes | **shadcn/ui** (copiar/pegar, no dependencia) | Accesibles y personalizables sin pelear con estilos. |
| Gráficas | **Recharts** | Simple, declarativo, suficiente para tendencias. |
| Mapa corporal | **Three.js** con `anatomy-male.glb` + `MeshoptDecoder`, piel translúcida tipo rayos X, picking por órgano. El SVG de `BodyMap.tsx` queda como respaldo sin WebGL. | Es el único modelo CC BY 4.0 que cubre los 6 `meshNodeId`. La piel opaca del cuerpo masculino es de baja calidad, así que se dibuja en rayos X. Ver D27. |
| Estado | **Zustand** | 3 líneas de boilerplate frente a Redux. |
| Formularios | **react-hook-form + zod** | Validación de rangos fisiológicos en el cliente. |

### Persistencia (offline)
| Pieza | Elección | Motivo |
|---|---|---|
| Base local | **Dexie.js** (IndexedDB) | Sobrevive refresh y cierre de pestaña sin backend. |
| PWA | **next-pwa** o manifest + service worker manual | Instalable, funciona sin red. |
| Semilla de datos | **JSON estático** en `src/data/seed/` | Datos reales de OSDR exportados antes del evento. |

### IA
| Pieza | Elección | Motivo |
|---|---|---|
| Copiloto explicativo | **API compatible con OpenAI** (o Gemini) llamada opcional | Si no hay red, la app sigue funcionando con contenido precalculado. |
| Fallback sin red | **Base de conocimiento en JSON** (explicaciones por indicador, escritas a mano) | Garantiza demo aunque falle todo. |
| RAG | **Búsqueda por palabras clave sobre JSON**, no embeddings | Con 30 h no se monta un vector store. Honestidad > elegancia. |

> **Decisión consciente:** no se usa un LLM local en el navegador. Pesa, tarda y el jurado no lo va a notar. Se presenta como "capa SI opcional con fallback determinista".

### Tooling
| Pieza | Elección |
|---|---|
| Runtime | Node.js 22 LTS |
| Gestor de paquetes | **pnpm** |
| Lint/format | ESLint + Prettier (config compartida) |
| Deploy | **Vercel** (gratis, un comando) + export estático como respaldo |
| Video | OBS o grabación de pantalla + **CapCut** para edición |
| Diseño | **Figma** (gratis) |

---

## 3. Arquitectura de la aplicación

```
src/
├── app/
│   ├── page.tsx                 # Dashboard de tripulación
│   ├── cuerpo/page.tsx          # Mapa corporal interactivo
│   ├── medir/[indicador]/page.tsx  # Asistente de medición guiado
│   ├── emergencia/page.tsx      # Selector de protocolo
│   ├── emergencia/[protocolo]/page.tsx  # Protocolo paso a paso
│   └── rutina/page.tsx          # Recordatorios y racha
├── components/
│   ├── BodyMap.tsx
│   ├── IndicatorCard.tsx
│   ├── TrafficLight.tsx
│   ├── TrendChart.tsx
│   └── EmergencyTimer.tsx
├── lib/
│   ├── rules/                   # Motor de triage (funciones puras)
│   │   ├── thresholds.ts
│   │   └── triage.ts
│   ├── db/                      # Dexie schema
│   └── ai/                      # Cliente SI + fallback
├── data/
│   ├── seed/                    # Datos reales OSDR normalizados
│   └── knowledge/               # Explicaciones por indicador (JSON)
└── types/
```

### Principios de arquitectura
1. **El motor de triage es una función pura.** Entra `{indicador, valor, baseline, entorno}` y sale `{nivel, razon, accion, fuente}`. Sin UI, sin red. Así se puede testear y defender ante el jurado.
2. **Todo dato que se muestra tiene origen visible.** Cada tarjeta tiene un enlace "¿de dónde sale esto?".
3. **La app nunca dice "tienes X".** Dice "este valor está fuera de tu rango habitual; esto puede significar Y; esto deberías hacer".
4. **Cada pantalla funciona sin red.** Si no, está mal hecha.

---

## 4. Modelo de datos (núcleo)

```ts
type Indicador = {
  id: string;                    // "presion-arterial-sistolica"
  nombre: string;
  unidad: string;                // "mmHg"
  sistema: 'cardiovascular' | 'respiratorio' | 'metabolico'
         | 'termorregulacion' | 'neuroconductual' | 'musculoesqueletico'
         | 'sensorial' | 'inmune' | 'radiacion';
  requiereAyuda: boolean;        // ¿hace falta un compañero?
  entornoRelevante: Entorno[];   // dónde importa más
  comoSeMide: string;
  porQueImporta: string;
  fuente: string;                // URL o cita
};

type Medicion = {
  id: string;
  indicadorId: string;
  valor: number;
  timestamp: number;
  entorno: Entorno;
  nota?: string;
};

type Evaluacion = {
  nivel: 'verde' | 'amarillo' | 'rojo';
  razon: string;
  accion: string;
  escalarA: 'ninguno' | 'cmo' | 'cirujano-de-vuelo' | 'protocolo-emergencia';
  fuente: string;
};
```

---

## 5. Lo que NO se va a usar (y por qué)

| Descartado | Motivo |
|---|---|
| Backend con base de datos | 30 h no dan; IndexedDB cumple. Se declara como limitación honesta. |
| Autenticación / multiusuario | No aporta al jurado y se come 6 horas. |
| LLM local en navegador (WebLLM) | Descarga de cientos de MB, lento en el venue. |
| ~~Three.js / 3D del cuerpo~~ | **Revisado el 2026-11-14:** se descartó por tiempo, pero la decisión D25 lo volvió el centro de `/cuerpo`. Ya está implementado en `BodyModel3D.tsx`. |
| React Native / móvil nativo | El jurado lo ve en video; web responsive basta. |
| Kubernetes, Docker Compose, microservicios | Ruido sin valor para este entregable. |

---

## 6. Riesgo técnico y mitigación

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Next.js falla al instalar en el venue | Media | `pnpm install` probado el viernes 13; `node_modules` respaldado en USB |
| Recharts pelea con datos vacíos | Media | Componente `<TrendChart>` con estado vacío desde el día 1 |
| El service worker rompe el hot reload | Alta | Se activa solo en el build final, no en desarrollo |
| Se acaba el tiempo y no hay video | Alta | Guion escrito el 2026-11-11; se graba el domingo a las 14:00 sin negociación |
| La API de IA no responde en el venue | Media | Fallback JSON determinista siempre disponible |

---

## 7. Comandos base

```bash
pnpm install          # instalar
pnpm dev              # desarrollo en localhost:3000
pnpm build            # build de producción
pnpm start            # servir el build
pnpm lint             # revisar estilo
```

---

## 8. Criterio de aceptación del stack

El stack está aprobado si y solo si, el **viernes 13 de noviembre**, en el venue:

- [ ] `pnpm install && pnpm dev` funciona desde cero en menos de 5 minutos.
- [ ] La app carga con el WiFi apagado.
- [ ] Se agregó un indicador nuevo sin tocar más de 2 archivos.
- [ ] El build de producción pesa menos de 3 MB de JS.

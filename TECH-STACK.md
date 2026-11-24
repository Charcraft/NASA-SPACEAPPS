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
| Necesita gráficas, mapa corporal y datos reales | Librería de charts + SVG interactivo. |

---

## 2. Stack principal

### Frontend
| Pieza | Elección | Motivo |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Routing y build listos; un solo comando para correr. |
| UI | **Tailwind CSS v4** | Velocidad; sin archivos CSS que mantener. |
| Componentes | **shadcn/ui** (copiar/pegar, no dependencia) | Accesibles y personalizables sin pelear con estilos. |
| Gráficas | **Recharts** | Simple, declarativo, suficiente para tendencias. |
| Mapa corporal | **SVG inline** dibujado a mano + `onClick` por región | Cero dependencias nuevas; control total del estilo. |
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
| Three.js / 3D del cuerpo | El SVG 2D se ve mejor en un video de 1 min y se hace en 2 h. |
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

---

## 9. Excepciones aprobadas

El congelamiento del §0 sigue vigente. Esta es la única excepción registrada y su justificación.

| Fecha | Dependencia | Tipo | Motivo | Aprobó |
|---|---|---|---|---|
| 2026-11-14 | `vitest` | `devDependency` | El backend necesita pruebas unitarias de `rules/` y `db/`; con Node 22 no hay runner de TypeScript sin añadir un cargador. No entra al bundle de producción. | Equipo backend (Back 1 y Back 2) |

**Regla:** una excepción sin fila en esta tabla no existe. Si aparece otra dependencia fuera del §2, se rechaza el PR.

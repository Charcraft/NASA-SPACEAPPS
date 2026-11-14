# BRIEF-BACKEND-AGENTES.md — Contrato técnico de Backend y Base de Datos (Para Agentes de IA)

> **Propósito de este archivo:** instrucción maestra para los **2 integrantes de Backend y Base de Datos** y sus **agentes de IA**.
> Léelo completo antes de tocar código. Define el stack, los contratos de datos en tiempo real, el enlace con el Modelo 3D / animaciones y la arquitectura extensible.

---

## 1. Visión actual del software y división de responsabilidades

El sistema **AEGIS** monitorea y evalúa en **tiempo real** parámetros **biológicos y físicos** del astronauta, proyectándolos sobre un **Modelo 3D del cuerpo humano** con **animaciones de instrumentos médicos** y una capa **opcional de IA**.

| Área | Responsable | Alcance exacto |
|---|---|---|
| **Backend, Motor de Tiempo Real y Base de Datos** | **2 integrantes de Back + sus Agentes de IA** (USTEDES) | Ingesta y almacenamiento de datos NASA OSDR (`OSD-575`), motor de *streaming* fisiológico en tiempo real, registro escalable de parámetros, enlace de datos con nodos del Modelo 3D/animaciones y motor determinista de *triage*. |
| **Modelo 3D, Animaciones de Herramientas, UI e IA** | **Carlos (`@cxrlosmp`)** | Escena y *rigging* del Modelo 3D humano, animaciones de cada instrumento de medición, interfaz visual minimalista monocromática y entrenamiento/integración del asistente de IA. |

---

## 2. Principios de arquitectura (No negociables)

1. **Escalable por parámetros (Plug & Play):** los parámetros biológicos y físicos se integrarán progresivamente. Añadir un parámetro nuevo debe bastar con agregar una entrada al catálogo tipado sin reescribir la base de datos ni romper el frontend.
2. **Tiempo real sin bloquear el hilo 3D:** el flujo de signos físicos continuos debe operar a baja latencia (`1 Hz` a `10 Hz` para escalares, `30–60 Hz` para ondas si aplica) sin bloquear el renderizado WebGL/Three.js.
3. **Preparado para el Modelo 3D y Animaciones:** todo parámetro y evento del backend debe incluir `meshNodeId` (a qué parte del cuerpo 3D pertenece) y `toolAnimationId` (qué animación de herramienta dispara al medirse).
4. **La IA es un añadido opcional, nunca crítica:** el software debe funcionar al 100 % con reglas deterministas si el módulo de IA está apagado, entrenándose o sin red.
5. **Offline-first y trazabilidad NASA (`AGENTS.md`):** todo corre localmente sin depender de internet; los datos reales de **NASA OSDR (`OSD-575`)** viven en `src/data/seed/` y las simulaciones de sensores en tiempo real viven separadas en `src/data/mock/`.

---

## 3. Stack tecnológico oficial (Sincronizado con el proyecto)

| Capa | Tecnología | Ubicación en el repo |
|---|---|---|
| Framework y API local | **Next.js 15 (App Router) + TypeScript estricto** | `src/app/api/` |
| Base de datos local (Offline-First) | **Dexie.js (IndexedDB)** | `src/lib/db/dexie.ts` |
| Semilla científica oficial | **NASA OSDR `OSD-575`** (Inspiration4 CMP, 19 analitos, 4 tripulantes `C001`–`C004`, 7 *timepoints*) | `src/data/seed/osdr-inspiration4-cmp.json` |
| Indexador O(1) de línea base | **Mapa en memoria `< 1 ms`** (calcula media y desviación pre-vuelo `L-92, L-44, L-3`) | `src/lib/osdr/client.ts` |
| Estado en tiempo real y bus hacia 3D | **Zustand** + *Stream Adapter* (`Server-Sent Events` / `BroadcastChannel` / *WebWorker*) | `src/lib/store/` y `src/lib/realtime/` |
| Motor clínico determinista | **Funciones puras de Triage** (sin red, sin IA) | `src/lib/rules/triage.ts` y `thresholds.ts` |
| Validación de esquemas | **Zod** (o validación estricta TS) | `src/types/index.ts` |

---

## 4. Estructura de carpetas donde debe trabajar el equipo de Backend/BD

```text
src/
├── app/
│   └── api/
│       ├── osdr/route.ts             # [YA CREADO] API híbrida NASA OSDR OSD-575 + fallback offline
│       ├── telemetry/route.ts        # [CREAR] Stream SSE / polling rápido de signos físicos en tiempo real
│       ├── parameters/route.ts       # [CREAR] Catálogo dinámico de parámetros registrados
│       └── ai-context/route.ts       # [CREAR] Snapshot estructurado para el módulo opcional de IA
├── lib/
│   ├── osdr/
│   │   └── client.ts                 # [YA CREADO] Indexador O(1) de OSD-575 y cálculo de baseline personal
│   ├── db/
│   │   ├── dexie.ts                  # [YA CREADO - EXPANDIR] Tablas IndexedDB (mediciones, bitácora, series)
│   │   └── repositories.ts           # [CREAR] CRUD limpio para guardar/consultar lecturas y cola Flight Surgeon
│   ├── realtime/
│   │   ├── stream-engine.ts          # [CREAR] Generador/receptor en tiempo real de signos biológicos y físicos
│   │   └── registry.ts               # [CREAR] Registro escalable de parámetros (Plug & Play)
│   ├── model3d-bridge/
│   │   └── contracts.ts              # [CREAR] Mapeo de parámetros -> nodos del Modelo 3D y animaciones
│   └── rules/
│       ├── thresholds.ts             # [YA CREADO - EXPANDIR] Umbrales por parámetro (OSDR + físicos)
│       └── triage.ts                 # [YA CREADO - EXPANDIR] Evaluación determinista pura
├── data/
│   ├── seed/
│   │   └── osdr-inspiration4-cmp.json # [NO EDITAR A MANO] Datos reales NASA OSDR
│   ├── knowledge/                    # [EXPANDIR] Guías por herramienta y protocolos de emergencia
│   └── mock/                         # [EXPANDIR] Flujos simulados de sensores físicos en tiempo real
└── types/
    └── index.ts                      # [YA CREADO - EXPANDIR] Contratos compartidos Front/Back/3D/IA
```

---

## 5. Contratos de datos obligatorios (Para conectar Back ↔ Modelo 3D ↔ Animaciones ↔ IA)

### 5.1. Registro escalable de parámetros (`ParameterDefinition`)
Cada parámetro nuevo que el equipo de Backend agregue (hoy o mañana) debe seguir este contrato para que el **Modelo 3D** y las **animaciones de herramientas** funcionen automáticamente:

```ts
export type TipoFrecuenciaParametro = 'tiempo-real-continuo' | 'muestra-discreta' | 'ambiental-cabina';

export interface ParameterDefinition {
  id: string;                        // ej. "heart_rate", "glucose", "intracranial_pressure_est"
  nombre: string;                    // ej. "Frecuencia cardíaca", "Glucosa capilar"
  unidad: string;                    // ej. "lpm", "mg/dL", "mmHg"
  categoria: 'biologico-fisico' | 'bioquimico-osdr' | 'ambiental';
  frecuencia: TipoFrecuenciaParametro;
  intervaloMs?: number;              // ej. 1000 para 1 Hz en tiempo real
  rangoReferencia: {
    min: number | null;
    max: number | null;
    criticoMin: number | null;
    criticoMax: number | null;
  };
  // --- CONTRATO CON EL MODELO 3D Y ANIMACIONES (CARLOS) ---
  meshNodeId:
    | 'head_neuro_ocular'            // Cráneo / ojos (SANS, temperatura central, presión intracraneal)
    | 'thorax_heart'                 // Corazón (FC, PA, ECG, gasto cardíaco)
    | 'thorax_lungs'                 // Pulmones (SpO2, frecuencia respiratoria, EtCO2)
    | 'abdomen_hepatic_renal'        // Hígado/riñón/metabolismo (Glucosa, AST, ALT, Creatinina, BUN)
    | 'limbs_musculoskeletal'        // Fémur/músculo (Calcio, fosfatasa alcalina, densitometría)
    | 'systemic_immune_radiation';   // Cuerpo completo / piel (Radiación acumulada, albúmina, leucocitos)
  toolAnimationId:
    | 'anim_none'                    // Sensor pasivo del traje
    | 'anim_capillary_analyzer'      // Punción capilar 0G + cartucho i-STAT
    | 'anim_bp_cuff'                 // Brazalete de presión arterial
    | 'anim_pulse_oximeter'          // Oxímetro óptico
    | 'anim_ocular_fundoscope'       // Oftalmoscopio / rejilla Amsler
    | 'anim_cpr_cmrs_restraint'      // Fijación CMRS / Handstand + DEA
    | 'anim_pba_oxygen_mask';        // Máscara de oxígeno portátil PBA
  fuenteTrazable: string;            // Cita exacta (ej. "NASA OSDR OSD-575" o "[SUPUESTO] NASA-STD-3001")
  esDatoRealOSDR: boolean;           // true = viene de seed/, false = sensor simulado en mock/
}
```

### 5.2. Payload en tiempo real hacia el Modelo 3D (`RealtimeTelemetryFrame`)
El motor de tiempo real (`src/lib/realtime/stream-engine.ts`) debe emitir este objeto cada *tick* para que la interfaz y el modelo 3D actualicen nodos sin recalcular lógica pesada:

```ts
export interface RealtimeTelemetryFrame {
  timestamp: number;
  crewId: 'C001' | 'C002' | 'C003' | 'C004';
  timepointMision: 'L-92' | 'L-44' | 'L-3' | 'R+1' | 'R+45' | 'R+82' | 'R+194';
  lecturas: Record<string, {
    valor: number;
    unidad: string;
    baselinePersonal: number;
    desviacionPct: number;
    nivel: 'NOMINAL' | 'ATENCION' | 'CRITICO';
    meshNodeId: ParameterDefinition['meshNodeId'];
    toolAnimationId: ParameterDefinition['toolAnimationId'];
  }>;
  // Resumen por nodo 3D listo para colorear/iluminar mallas en Three.js
  estadoNodos3D: Record<ParameterDefinition['meshNodeId'], {
    nivelMaximo: 'NOMINAL' | 'ATENCION' | 'CRITICO';
    parametroPrincipalId: string;
    animacionActiva: ParameterDefinition['toolAnimationId'] | null;
  }>;
}
```

### 5.3. Contrato desacoplado para el módulo opcional de IA (`AIAssistantPayload`)
Para que la IA que entrenará Carlos se conecte sin acoplarse a la base de datos, el backend debe exponer una función/endpoint que entregue este resumen limpio:

```ts
export interface AIAssistantContextSnapshot {
  crewId: string;
  modoOperacion: 'rutina' | 'emergencia';
  parametrosFueraDeRango: {
    id: string;
    nombre: string;
    valorActual: number;
    baselinePreVuelo: number;
    rangoReferencia: { min: number | null; max: number | null };
    nivelDeterminista: 'NOMINAL' | 'ATENCION' | 'CRITICO';
    reglaDisparada: string;
  }[];
  ambienteCabina: {
    radiacionMsv: number;
    co2MmHg: number;
    retardoTierraSegundos: number;
  };
  fallbackDeterminista: {
    mensajeResumen: string;
    pasosAccion: string[];
  };
}
```

---

## 6. Tareas inmediatas para los 2 integrantes de Backend y Base de Datos

Divídanse el trabajo en dos frentes paralelos para no pisarse archivos:

### Integrante Back 1 · Motor de Tiempo Real y Registro Escalable (`src/lib/realtime/` y `src/lib/model3d-bridge/`)
1. Crear `src/lib/realtime/registry.ts` con el catálogo extensible (`ParameterDefinition[]`) que unifique:
   - Los **19 analitos reales** de `src/data/seed/osdr-inspiration4-cmp.json`.
   - Los **parámetros biológicos y físicos en tiempo real** (frecuencia cardíaca, SpO₂, presión sistólica/diastólica, frecuencia respiratoria, temperatura central, estimación de presión intracraneal/SANS, CO₂ y radiación), etiquetados como `[SUPUESTO]` en `src/data/mock/`.
2. Crear `src/lib/realtime/stream-engine.ts` que emita `RealtimeTelemetryFrame` a `1 Hz` (con opción de inyectar anomalías en vivo para la demo de 30 s, como caída de SpO₂ o dolor torácico/taquicardia) y calcule `estadoNodos3D`.
3. Crear `src/lib/model3d-bridge/contracts.ts` con helpers para que el Modelo 3D consulte qué nodo iluminar (`meshNodeId`) y qué animación de herramienta reproducir (`toolAnimationId`).

### Integrante Back 2 · Persistencia IndexedDB, Cola Flight Surgeon y APIs (`src/lib/db/` y `src/app/api/`)
1. Expandir `src/lib/db/dexie.ts` y crear `src/lib/db/repositories.ts` para:
   - Guardar series históricas de sensores en ventana deslizante (últimos 15 minutos en IndexedDB sin saturar memoria).
   - Gestionar la **cola de sincronización diferida** (`sincronizadoTierra: boolean`) que empaqueta lecturas + eventos de emergencia con hash verificable para el *Flight Surgeon*.
2. Expandir `src/lib/rules/triage.ts` y `src/lib/rules/thresholds.ts` para que evalúen automáticamente cualquier parámetro registrado en `registry.ts`.
3. Crear `src/app/api/ai-context/route.ts` que devuelva el `AIAssistantContextSnapshot` listo para el modelo de IA opcional (y devuelva siempre `fallbackDeterminista` si la IA no está conectada).

---

## 7. Reglas de oro para los Agentes de Backend

- **Prohibido tocar `src/data/seed/osdr-inspiration4-cmp.json` a mano.** Si necesitan regenerarlo, usen `python scripts/normalizar-osdr.py`.
- **Prohibido bloquear el renderizado si no hay internet o si el módulo de IA no responde.** Todo llamado externo lleva `AbortController` con *timeout* máximo de `2500 ms` y *fallback* inmediato a datos locales.
- **No inventar cifras médicas sin etiqueta.** Todo umbral que no venga en `OSD-575` debe citar su fuente de `docs/02-investigacion/04-bibliografia.md` o marcarse explícitamente como `[SUPUESTO]` o `[POR VALIDAR]`.
- **Respetar la estética minimalista monocromática del frontend:** cuando expongan estados hacia la UI, usen exclusivamente los tres niveles deterministas (`NOMINAL`, `ATENCION`, `CRITICO`).
- **Registrar cualquier uso relevante de IA** en `docs/05-ia/03-registro-uso-ia.md` antes de cerrar su PR.

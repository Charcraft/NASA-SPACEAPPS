# Arquitectura de Backend — Back 1 y Back 2

> Documento de arranque técnico. Define quién hace qué, cómo se conectan las dos mitades y en qué orden se construyen.
> Base: `docs/03-plan/10-reparto-backend.md` (corregido el 2026-11-14) y `team/angel_marco/plan-backend-2.md`.
> Estado: **listo para empezar**. Bloqueador único: el scaffold de Next 15.

---

## 1. Roles

| Rol | Persona | Dominio | No toca |
|---|---|---|---|
| **Back 1** | Ernesto (`@ernesto-montes`) | Scaffold, `types/`, `realtime/`, `model3d-bridge/`, `api/telemetry`, `api/parameters` | `db/`, `rules/`, `osdr/`, `api/osdr`, `api/ai-context` |
| **Back 2** | Angel Marco (`@angel_marco`) | `osdr/`, `db/`, `rules/`, `sync/`, `api/osdr`, `api/ai-context`, tests | `realtime/`, `model3d-bridge/`, `api/telemetry`, `api/parameters` |

**Regla única:** un archivo, un dueño. Los cambios cruzados se piden por PR. Los contratos compartidos se congelan a H2.

---

## 2. Estructura objetivo

```text
src/
├── types/
│   └── index.ts                 # Back 1 · contrato compartido (append-only)
├── lib/
│   ├── realtime/
│   │   ├── registry.ts          # Back 1 · catálogo ParameterDefinition
│   │   └── stream-engine.ts     # Back 1 · emite frames a 1 Hz
│   ├── model3d-bridge/
│   │   └── contracts.ts         # Back 1 · meshNodeId → animación
│   ├── osdr/
│   │   └── client.ts            # Back 2 · índice O(1) + baseline
│   ├── db/
│   │   ├── dexie.ts             # Back 2 · esquema v1
│   │   ├── repositories.ts      # Back 2 · ÚNICO punto de escritura
│   │   └── errors.ts            # Back 2 · Back2Error + códigos
│   ├── rules/
│   │   ├── thresholds.ts        # Back 2 · umbrales con fuente
│   │   └── triage.ts            # Back 2 · función pura
│   ├── sync/
│   │   ├── queue.ts             # Back 2 · cola A/B/C/D + hash
│   │   └── aggregate.ts         # Back 2 · 1 Hz → 1 min → 1 h
│   └── ai/
│       ├── types.ts             # Back 2 · contrato AIProvider
│       └── null-provider.ts     # Back 2 · fallback determinista
└── app/api/
    ├── osdr/route.ts            # Back 2
    ├── ai-context/route.ts      # Back 2
    ├── telemetry/route.ts       # Back 1 (SSE)
    └── parameters/route.ts      # Back 1
```

---

## 3. Flujo de datos

```text
[seed OSDR] ──► osdr/client ──► baselinePreVuelo()
                                      │
[sensor / mock] ──► stream-engine ──► frame(1 Hz)
                                      │
                                      ├──► evaluar(frame) ──► Evaluacion[]
                                      │                         │
                                      │                         ├──► UI semáforo
                                      │                         └──► model3d-bridge
                                      │
                                      └──► guardarFrame() ──► Dexie
                                                                  │
                                                          queue.ts ──► sync diferida
                                                                  │
                                                          ai-context (snapshot)
```

**Invariantes:**
1. `repositories.ts` es el único que escribe en Dexie.
2. `rules/` no importa `db/`, `realtime/` ni `ai/`.
3. `realtime/` no importa `dexie`.
4. La IA es opcional: con `AI_ENABLED=false` todo funciona.

---

## 4. Contrato compartido (congelado a H2)

```ts
export type Nivel = 'NOMINAL' | 'ATENCION' | 'CRITICO';
export type TipoDesviacion = 'z-score' | 'delta-absoluto';

export interface LecturaEvaluable {
  parametroId: string;
  valor: number;
  unidad: string;
  timestamp: number;   // epoch ms, tomado en el origen
  calidad: number;     // 0..1
}

export interface Evaluacion {
  nivel: Nivel;
  razon: string;
  accion: string;
  fuente: string;
  reglaDisparada: string;
  valor: number;
  baseline: number | null;
  desviacion: { tipo: TipoDesviacion; valor: number };
  degradado: boolean;
}

export interface TelemetrySink {
  onLectura(lectura: LecturaEvaluable, crewId: string): void;
  onFrame(frame: { timestamp: number; crewId: string; lecturas: LecturaEvaluable[] }): void;
}

export interface ResultadoPersistencia {
  ok: boolean;
  guardadas: number;
  codigo?: string;
  motivo?: string;
}
```

**Cambios a este bloque:** solo por PR, con aviso al otro dueño y registro en `MEMORY.md`.

---

## 5. Puntos de integración

| # | Punto | Back 1 entrega | Back 2 entrega | Criterio de "conectado" |
|---|---|---|---|---|
| 1 | Catálogo | `list()` / `get(id)` | — | Back 2 resuelve los 17 IDs sin adaptador |
| 2 | Baseline | — | `baselinePreVuelo()` | Devuelve media de `L-92, L-44, L-3` o `null` |
| 3 | Evaluación | frame a 1 Hz | `evaluar()` | Mismo input → mismo `nivel` en 1.000 frames |
| 4 | Persistencia | `sink.onFrame()` | `guardarFrame()` | 60 s de stream → ≥ 55 filas |
| 5 | 3D | `meshNodeId` + `toolAnimationId` | pasa el campo sin tocarlo | 0 `undefined` |
| 6 | IA | — | `api/ai-context` | Responde < 250 ms con IA apagada |
| 7 | Reloj | `timestamp` de origen | lo guarda tal cual | Desfase < 50 ms |

---

## 6. Plan de ejecución (paralelo)

### Back 1 · Ernesto

| # | Entregable | Criterio | h |
|---|---|---|---|
| 1 | Scaffold: `package.json`, `tsconfig`, `next.config`, Tailwind | `pnpm dev` levanta | 0:45 |
| 2 | `types/index.ts` con los 4 contratos del §4 | `typecheck` limpio | 0:30 |
| 3 | `registry.ts`: 17 OSDR + 9 simulados, `meshNodeId` nullable | Back 2 lo consume | 1:30 |
| 4 | `stream-engine.ts`: 1 Hz, anomalías, `estadoNodos3D` | 60 s sin caídas | 2:00 |
| 5 | `model3d-bridge/contracts.ts` | Helpers usados por UI | 1:00 |
| 6 | `api/telemetry` (SSE) + `api/parameters` | Reconexión + Zod válido | 1:30 |
| 7 | Integración con Back 2 y demo | 3 min reproducibles sin red | 1:30 |

### Back 2 · Angel

| # | Entregable | Criterio | h |
|---|---|---|---|
| 1 | `osdr/client.ts` + tests | 17 IDs, baseline o `null` | 1:00 |
| 2 | `thresholds.ts` con `fuenteTrazable` | Cero cifras sin fuente | 1:30 |
| 3 | `triage.ts` puro + tests | Nominal, atención, crítico y bordes | 2:00 |
| 4 | `dexie.ts` + `repositories.ts` | 10k inserts < 500 ms | 2:00 |
| 5 | `errors.ts` + catálogo `E-*` | 12 códigos con mensaje | 0:30 |
| 6 | `api/osdr` + `api/ai-context` | Fallback siempre presente | 1:00 |
| 7 | `sync/queue.ts` + cierre | Hash válido tras offline | 1:00 |

**Punto de sincronización obligatorio:** H2 (contratos) y H10 (integración).

---

## 7. Puertas

| Puerta | Cuándo | Pregunta | Si falla |
|---|---|---|---|
| **G-B0** | H0:45 | ¿`pnpm dev` corre? | Back 2 no puede empezar; se prioriza el scaffold |
| **G-B1** | H2 | ¿Contratos congelados y `typecheck` limpio? | Se recorta `model3d-bridge` a lo mínimo |
| **G-B2** | H10 | ¿Frame → evaluación → fila en Dexie? | Se corta `sync/` y agregación |
| **G-B3** | H14 | ¿Demo de 3 min sin red? | Se corta `api/osdr` y se sirve el seed directo |

---

## 8. Sincronización, persistencia y hardware

### 8.1 · Modelo de datos: local primero, Tierra después

| Capa | Dónde vive | Qué guarda | Estado en el MVP |
|---|---|---|---|
| **Local** | IndexedDB del dispositivo (Dexie) | Verdad operativa en vuelo: mediciones, episodios, alertas, bitácora | **Sí** |
| **Nave** | Nodo compartido de la tripulación | Consolidado de los 4 tripulantes | **No** (fuera del MVP) |
| **Tierra** | Servidor de misión | Archivo histórico y análisis clínico | **No** (contrato y cola sí) |

**Decisión:** no hay sincronización en tiempo real entre astronautas. Cada estación
trabaja contra su IndexedDB y la sincronización es **diferida hacia Tierra**.

Por qué:

1. En vuelo real el enlace es intermitente y con retardo; el dato no puede depender de la red.
2. Sin backend remoto no hay forma honesta de simular un nodo de nave en 30 h.
3. El modelo real de NASA es telemetría hacia el *Mission Control Center*, no
   réplica entre tripulantes.

Lo que **sí** queda preparado: `colaSync` en Dexie con prioridad, hash e idempotencia.
Cuando exista el nodo central, solo se implementa el transporte; el contrato ya está.

### 8.2 · Pérdida de conexión

```text
sensor ──► frame ──► evaluar ──► guardarFrame (Dexie)  ← siempre funciona
                                        │
                                        └──► colaSync: A (crítico) > B (alerta)
                                                       > C (medición) > D (bitácora)
                                                            │
                                          sin red ──────────┘  se acumula
                                                            │
                                          con red ──────────┘  replay en orden
```

- **Nada se descarta por falta de red.** La escritura local es la operación crítica.
- Cada lote lleva hash del anterior: si no coincide, no se reintenta en automático
  (`E-SYN-001`) para no corromper el histórico.
- **Conflicto:** las mediciones son *append-only*. Una corrección es una fila nueva
  con `amendsId`; nunca se sobrescribe un valor clínico.
- **Reconexión:** se envía primero lo crítico, luego el resto; el ACK libera la cola.

### 8.3 · De dónde salen los datos (hardware)

| Fuente | Interfaz | Uso en el MVP |
|---|---|---|
| Simulador determinista | `stream-engine` | **Sí**, es la fuente de la demo |
| Sensor BLE (pulsioxímetro, manguito, termómetro) | Web Bluetooth + GATT | Interfaz prevista, no conectada |
| Equipo con puerto serie | Web Serial | Interfaz prevista, no conectada |
| Bus de la nave (CO₂, radiación) | Gateway → HTTP/WS | Fuera del alcance del navegador |
| Entrada manual / importación | Formulario + CSV/JSON | Sí, para datos OSDR y correcciones |

**Regla de honestidad:** la demo no afirma leer hardware real. Los 9 parámetros
simulados se presentan como simulación; los 17 de OSDR se presentan como dataset
público. Cualquier cifra clínica sin fuente va marcada `[SUPUESTO]`.

**Consecuencia técnica:** la ingesta se define como una interfaz `SensorSource`
(Back 1) que hoy implementa el simulador. Un adaptador BLE o serie se añade sin
tocar `stream-engine` ni los contratos.

### 8.4 · Alcance actual: solo físico

En el MVP entran únicamente parámetros **físicos y bioquímicos** (los 26 del
`registry.ts`: 17 OSDR + 9 simulados). Quedan fuera, para una fase posterior:

- Estado de ánimo y cuestionarios psicológicos.
- Horas de sueño y calidad percibida.
- Tiempo de reacción y carga cognitiva.

El contrato `LecturaEvaluable` ya acepta estos datos (valor numérico + unidad +
calidad); lo que falta es su catálogo de umbrales y su fuente. No se implementan
ahora para no diluir el alcance ni inventar escalas clínicas.

## 9. Fuera de alcance (explícito)

- Implementar IA: solo el contrato `AIProvider` y el `null-provider`.
- Modelo 3D y animaciones: los consume, no los define.
- Autenticación, multiusuario y backend remoto.
- Protocolos ALSP paso a paso (si entran, van como datos en `src/data/knowledge/`).

---

## 10. Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Scaffold tarde | Bloquea a Back 2 | Es la primera tarea de Back 1, con deadline H0:45 |
| IDs divergentes | Umbrales no encuentran parámetro | Tabla de IDs aceptada en H2 |
| Doble escritura en Dexie | Filas duplicadas | Solo `repositories` escribe |
| `rules/` sin revisión | Rompe la regla de `BIENVENIDA.md` | PR con revisión de Pineda |
| Contrato cambiado en vivo | Build roto en la demo | Congelado a H2 |

---

## 11. Registro

| Artefacto | Destino |
|---|---|
| Este documento | `docs/03-plan/11-arquitectura-backend.md` |
| Reparto y contratos | `docs/03-plan/10-reparto-backend.md` |
| Plan de Back 2 | `team/angel_marco/plan-backend-2.md` |
| Decisiones | `MEMORY.md` § Decisiones |

# Plan de trabajo · Backend 2 (Angel Marco)

> **Estado:** propuesta de reparto, 2026-11-14 15:47.
> **Fuente:** `BRIEF-BACKEND-AGENTES.md` (recibido en `~/Downloads`, pendiente de integrar al repo) + verificación sobre `main` @ `836aea6`.
> **Compañero Back 1:** **Ernesto** (`@ernesto-montes`).
> Este documento describe **solo mi frente**. El reparto compartido vive en [`docs/03-plan/10-reparto-backend.md`](../../docs/03-plan/10-reparto-backend.md).

---

## 0 · Estado verificado antes de planear

| Afirmación del brief | Estado real | Etiqueta |
|---|---|---|
| `src/app/api/osdr/route.ts` ya creado | **No existe** | `[VERIFICADO]` |
| `src/lib/osdr/client.ts` ya creado | **No existe** | `[VERIFICADO]` |
| `src/lib/db/dexie.ts` ya creado | **No existe** | `[VERIFICADO]` |
| `src/lib/rules/thresholds.ts` y `triage.ts` ya creados | **No existen** | `[VERIFICADO]` |
| `src/types/index.ts` ya creado | **No existe** | `[VERIFICADO]` |
| `package.json`, `tsconfig.json`, `next.config.*` | **No existen** | `[VERIFICADO]` |
| Seed OSDR: 4 tripulantes y 7 timepoints | Correcto (`C001–C004`, `L-92…R+194`) | `[VERIFICADO]` |
| Seed OSDR: **19 analitos** | Falso: el JSON tiene **17 indicadores** | `[VERIFICADO]` |

> Solo existe hoy `src/data/seed/osdr-inspiration4-cmp.json` (48 KB) y su `README.md`.

---

## 1 · Reparto de archivos (un archivo, un dueño)

| Archivo | Dueño | Nota |
|---|---|---|
| `src/types/index.ts` | Back 1 | Yo reviso y pido cambios por PR |
| `src/lib/realtime/registry.ts` | Back 1 | Catálogo `ParameterDefinition[]` |
| `src/lib/realtime/stream-engine.ts` | Back 1 | Emite `RealtimeTelemetryFrame` |
| `src/lib/model3d-bridge/contracts.ts` | Back 1 | `meshNodeId` / `toolAnimationId` |
| `src/app/api/telemetry/route.ts` | Back 1 | SSE / polling |
| `src/app/api/parameters/route.ts` | Back 1 | Expone el registry |
| `package.json`, `tsconfig.json`, `next.config.ts` | Back 1 | Scaffold inicial |
| `src/lib/osdr/client.ts` | **Back 2 (yo)** | Índice + baseline pre-vuelo |
| `src/app/api/osdr/route.ts` | **Back 2** | API híbrida con fallback |
| `src/lib/db/dexie.ts` | **Back 2** | Tablas IndexedDB |
| `src/lib/db/repositories.ts` | **Back 2** | CRUD + ventana + cola |
| `src/lib/rules/thresholds.ts` | **Back 2** | Umbrales con fuente |
| `src/lib/rules/triage.ts` | **Back 2** | Función pura `evaluar` |
| `src/app/api/ai-context/route.ts` | **Back 2** | Snapshot + fallback |
| `*.test.ts` de `rules/`, `db/`, `osdr/`, `realtime/` | **Back 2** | Tests de todo el backend |
| `vitest.config.ts` | **Back 2** | Runner de pruebas |

**No toco:** `realtime/`, `model3d-bridge/`, `api/telemetry`, `api/parameters`, `types/index.ts` (salvo PR acordado).
**Back 1 no toca:** `rules/`, `db/`, `osdr/`, `api/osdr`, `api/ai-context`, tests.

---

## 2 · Mis tareas, en orden

| # | Entregable | Criterio de aceptación | Archivo |
|---|---|---|---|
| 1 | Índice O(1) del seed y baseline | `baselinePreVuelo(crewId, paramId)` devuelve media de `L-92, L-44, L-3`; sin baseline → `null`; test con los 17 IDs | `src/lib/osdr/client.ts` |
| 2 | Umbrales | 17 IDs reales + simulados; cada uno con `fuenteTrazable`; sin fuente → `[SUPUESTO]` o `[POR VALIDAR]`; **cero cifras inventadas** | `src/lib/rules/thresholds.ts` |
| 3 | Evaluador puro | `evaluar(paramId, valor, baseline, entorno)` → `{nivel, razon, accion, fuente, reglaDisparada}`; sin red, sin DB, sin IA; tests de límites | `src/lib/rules/triage.ts` |
| 4 | Tests 1–3 | Cubren nominal, atención, crítico y borde exacto; corren con `pnpm test` | `*.test.ts` |
| 5 | Persistencia | Ventana deslizante de 15 min; cola `sincronizadoTierra` con hash; escritura no bloqueante | `src/lib/db/dexie.ts`, `repositories.ts` |
| 6 | API OSDR | Sirve el seed local; si falla la red o el archivo, fallback offline; `AbortController` ≤ 2500 ms | `src/app/api/osdr/route.ts` |
| 7 | API IA | Devuelve `AIAssistantContextSnapshot`; **siempre** incluye `fallbackDeterminista` | `src/app/api/ai-context/route.ts` |
| 8 | Runner + cierre | `vitest.config.ts`; registro de IA, bitácora y PR con revisión de Pineda para `rules/` | — |

### Orden recomendado (ventana de 8 h)

1. Acuerdo de contratos con Back 1 — 0:30
2. `osdr/client.ts` + tests — 1:00
3. `thresholds.ts` — 1:30
4. `triage.ts` + tests — 2:00
5. `dexie.ts` + `repositories.ts` — 2:00
6. APIs `osdr` y `ai-context` — 1:00
7. Integración + docs + PR — 1:00

> Si el reloj aprieta, el punto 6 se recorta primero. Los puntos 1–4 son el corazón verificable.

---

## 3 · Lo que hace Back 1 (para no duplicar)

1. Scaffold (`package.json`, `tsconfig`, `next.config`) y `types/index.ts` con los 3 contratos del brief.
2. `registry.ts`: 17 indicadores OSDR + parámetros simulados de tiempo real.
3. `stream-engine.ts`: `RealtimeTelemetryFrame` a 1 Hz, inyección de anomalías, `estadoNodos3D`.
4. `model3d-bridge/contracts.ts`: helpers de nodo y animación.
5. `api/telemetry` y `api/parameters`.

---

## 4 · Contrato de dependencia

### Lo que Back 1 necesita de mí

```ts
// src/lib/rules/triage.ts
export type Nivel = 'NOMINAL' | 'ATENCION' | 'CRITICO';
export type TipoDesviacion = 'z-score' | 'delta-absoluto';

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

export function evaluar(
  paramId: string,
  valor: number,
  baseline: number | null,
  entorno?: EntornoCabina,
  calidad?: number,
): Evaluacion;
```

```ts
// src/lib/osdr/client.ts
export function baselinePreVuelo(crewId: CrewId, paramId: string): number | null;
```

```ts
// src/lib/db/repositories.ts
export interface ResultadoPersistencia {
  ok: boolean;
  guardadas: number;
  codigo?: string;
  motivo?: string;
}

export async function guardarFrame(frame: RealtimeTelemetryFrame): Promise<ResultadoPersistencia>;
// No lanza y no bloquea el loop de 1 Hz. Devuelve código si falla; no descarta en silencio.
```


### Lo que yo necesito de Back 1

```ts
// src/lib/realtime/registry.ts
export function list(): ParameterDefinition[];
export function get(id: string): ParameterDefinition | undefined;
```

```ts
// src/lib/realtime/stream-engine.ts
export function subscribe(cb: (frame: RealtimeTelemetryFrame) => void): () => void;
export function injectAnomaly(paramId: string, valor: number): void;
```

Además: `types/index.ts` final, IDs definitivos y fixtures de anomalía para mis tests.

---

## 5 · Acuerdos obligatorios antes de escribir código

1. **IDs canónicos.** OSDR tal cual vienen en el seed; simulados en `snake_case`:
   - OSDR (17): `albumin`, `alkaline_phosphatase`, `alt`, `ast`, `total_bilirubin`, `calcium`, `carbon_dioxide`, `chloride`, `creatinine`, `egfr_african_american`, `egfr_non_african_american`, `globulin`, `glucose`, `potassium`, `total_protein`, `sodium`, `urea_nitrogen_bun`.
   - Simulados (propuesta): `heart_rate`, `spo2`, `systolic_bp`, `diastolic_bp`, `respiratory_rate`, `core_temperature`, `intracranial_pressure_est`, `cabin_co2`, `radiation_dose`.
2. **Corregir el brief:** 19 → **17** indicadores.
3. **`meshNodeId` nullable** para `ambiental-cabina` (CO₂ no tiene malla corporal). Si no, `ParameterDefinition` no compila.
4. **Scaffold:** lo crea Back 1; yo solo agrego `vitest.config.ts` y tests.
5. **Roles confirmados (2026-11-14):** Back 1 = Ernesto (`@ernesto-montes`), Back 2 = Angel Marco (`@angel_marco`). El reparto queda aceptado.
6. **Runner:** Vitest como `devDependency`, registrado como excepción al congelamiento del stack. No entra al bundle de producción.
7. **Contratos congelados a H2.** Cualquier cambio posterior va por PR y se avisa al otro dueño.

---

## 5.1 · Catálogo de errores (mensajes exactos)

Toda falla del backend lanza `Back2Error` con código, y la UI muestra el mensaje ya redactado.

| Código | Cuándo | Mensaje |
|---|---|---|
| `E-DB-001` | Cuota de IndexedDB llena | `No se pudo guardar: cuota de IndexedDB llena ({usadoMb} MB). Ejecuta purgarVentana() y reintenta.` |
| `E-DB-002` | Otra pestaña bloquea la base | `Base de datos bloqueada por otra pestaña. Cierra las demás pestañas de AEGIS y reintenta.` |
| `E-DB-003` | Versión de esquema incompatible | `Esquema incompatible (v{actual} vs v{esperada}). Borra los datos locales desde Ajustes.` |
| `E-VAL-001` | Valor fuera de rango fisiológico | `Medición rechazada para «{paramId}»: valor {valor} fuera de [{min}, {max}]. Revisa el sensor o corrige la entrada.` |
| `E-VAL-002` | Parámetro no registrado | `Parámetro «{paramId}» no existe en el catálogo. Añádelo en registry.ts antes de registrar.` |
| `E-VAL-003` | Unidad no canónica | `Unidad «{unidad}» no es la canónica de «{paramId}» (esperada: {unidadCanonica}). Convierte antes de guardar.` |
| `E-TRI-001` | Umbral sin fuente | `Umbral de «{paramId}» sin fuente trazable. Añade fuenteTrazable o marca [SUPUESTO].` |
| `E-TRI-002` | Sin baseline en la época | `Sin baseline de «{paramId}» en época «{epoca}». Se evaluó con referencia poblacional (degradado).` |
| `E-SYN-001` | Hash no coincide | `Lote {id} rechazado: hash esperado {esperado}, recibido {recibido}. No se reintenta automáticamente.` |
| `E-SYN-002` | Cola corrupta | `Cola de sincronización corrupta en el ítem {id}. Exporta la cola y reinicia el estado a 'pendiente'.` |
| `E-API-001` | Respuesta fuera de contrato | `Respuesta inválida en {ruta}: {detalle}. Se sirvió el fallback local.` |
| `E-API-002` | Timeout de llamada externa | `Tiempo de espera agotado en {ruta} ({ms} ms). Se sirvió el fallback determinista.` |

```ts
export class Back2Error extends Error {
  constructor(
    public readonly codigo: CodigoError,
    public readonly detalle: Record<string, string | number>,
    public readonly causa?: unknown,
  ) {
    super(mensajeDe(codigo, detalle));
    this.name = 'Back2Error';
  }
}
```

## 5.2 · Esquema Dexie v1

```ts
this.version(1).stores({
  parametros: 'id, categoria, meshNodeId, tipoDato',
  mediciones: '++id, [crewId+parametroId+timestamp], timestamp, nivel',
  series:     '[crewId+parametroId+resolucion+inicio], parametroId',
  episodios:  '++id, [crewId+parametroId+inicio], abierto',
  baselines:  '[crewId+parametroId+epoca]',
  eventos:    '++id, crewId, timestamp, severidad, sincronizadoTierra',
  colaSync:   '++id, prioridad, creadoEn, estado',
  bitacora:   '++id, timestamp, actor',
});
```

| Tabla | Retención |
|---|---|
| `mediciones` | 15 min en memoria + 30 días en disco |
| `series` | 1 año (agregados 1 min / 1 h) |
| `baselines`, `episodios`, `bitacora` | Permanente |

**Regla:** `mediciones` es append-only. Corregir = fila nueva con `amendsId`; nunca `delete` sobre histórico.

## 6 · Riesgos

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Back 1 no crea el scaffold | No hay TS, tests ni build | Acordar que sea su primer PR; si no, lo creo yo y él revisa |
| IDs distintos entre `registry` y `thresholds` | Umbrales nunca se encuentran | Tabla de IDs acordada antes de codificar |
| `rules/` se mergea sin revisión | Rompe la regla de tu `BIENVENIDA.md` | PR con revisión obligatoria de Pineda |
| Intentar tiempo real con datos OSDR | Mezcla real/mock | OSDR solo discreto; simulación en `mock/` |
| Umbrales sin fuente | Pierde *Validity* ante el jurado | Toda cifra con `fuenteTrazable` o etiqueta de honestidad |

---

## 7 · Cierre de cada bloque

- Decisión → `MEMORY.md` § Decisiones.
- Fuente nueva → `docs/02-investigacion/04-bibliografia.md`.
- Uso de IA → `docs/05-ia/03-registro-uso-ia.md`.
- Archivo nuevo → `docs/00-INDEX.md`.
- Trabajo del día → `team/angel_marco/bitacora.md`.
- Rama sugerida: `docs/angel_marco/plan-backend`.

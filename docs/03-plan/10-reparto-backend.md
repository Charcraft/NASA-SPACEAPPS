# 03.10 · Reparto Backend 1 / Backend 2

> Reparto de archivos y contratos para los 2 integrantes de Backend y Base de Datos.
> **Fuente:** `BRIEF-BACKEND-AGENTES.md` (recibido el 2026-11-14, pendiente de integrar al repo).
> **Verificado contra:** `main` @ `836aea6`.
> **Estado:** propuesta; **Back 1 = Ernesto** (`@ernesto-montes`), pendiente de su aceptación.

---

## 1 · Hallazgo que condiciona el reparto

El brief marca como `[YA CREADO]` varios archivos que **no existen** en el repositorio:

| Marcado en el brief | Realidad |
|---|---|
| `src/app/api/osdr/route.ts` | No existe |
| `src/lib/osdr/client.ts` | No existe |
| `src/lib/db/dexie.ts` | No existe |
| `src/lib/rules/thresholds.ts` | No existe |
| `src/lib/rules/triage.ts` | No existe |
| `src/types/index.ts` | No existe |
| Scaffold (`package.json`, `tsconfig.json`, `next.config.mjs`) | No existe |

`[VERIFICADO]` — Solo existe `src/data/seed/osdr-inspiration4-cmp.json`.

Además, el seed tiene **17 indicadores**, no 19 como dice el brief; sí coinciden los **4 tripulantes** (`C001–C004`) y los **7 timepoints** (`L-92…R+194`). `[VERIFICADO]`

---

## 2 · Dueño por archivo

| Archivo | Dueño |
|---|---|
| `src/types/index.ts` | Back 1 |
| `src/lib/realtime/registry.ts` | Back 1 |
| `src/lib/realtime/stream-engine.ts` | Back 1 |
| `src/lib/model3d-bridge/contracts.ts` | Back 1 |
| `src/app/api/telemetry/route.ts` | Back 1 |
| `src/app/api/parameters/route.ts` | Back 1 |
| `package.json`, `tsconfig.json`, `next.config.mjs` | Back 1 |
| `src/lib/osdr/client.ts` | Back 2 |
| `src/app/api/osdr/route.ts` | Back 2 |
| `src/lib/db/dexie.ts` | Back 2 |
| `src/lib/db/repositories.ts` | Back 2 |
| `src/lib/rules/thresholds.ts` | Back 2 |
| `src/lib/rules/triage.ts` | Back 2 |
| `src/app/api/ai-context/route.ts` | Back 2 |
| `*.test.ts` (todo el backend) y `vitest.config.ts` | Back 2 |

**Regla:** nadie edita archivos del otro dueño; los cambios se piden por PR.

---

## 3 · Frentes de trabajo

### Back 1 · Motor de tiempo real y registro

1. Scaffold + `types/index.ts` con los 3 contratos del brief.
2. `registry.ts` con los 17 indicadores OSDR + parámetros simulados.
3. `stream-engine.ts` a 1 Hz, anomalías inyectables y `estadoNodos3D`.
4. `model3d-bridge/contracts.ts`.
5. `api/telemetry` y `api/parameters`.

### Back 2 · Datos, persistencia, reglas y APIs

1. `osdr/client.ts`: índice O(1) y baseline pre-vuelo.
2. `thresholds.ts`: umbrales con `fuenteTrazable` obligatoria.
3. `triage.ts`: `evaluar(paramId, valor, baseline, entorno)` puro.
4. Tests de todo el backend.
5. `dexie.ts` + `repositories.ts`: ventana de 15 min y cola `sincronizadoTierra`.
6. `api/osdr` y `api/ai-context` (con `fallbackDeterminista` siempre).

---

## 4 · Contratos de dependencia

### Back 2 entrega a Back 1

```ts
export type Nivel = 'NOMINAL' | 'ATENCION' | 'CRITICO';
export type TipoDesviacion = 'z-score' | 'delta-absoluto';

export interface Evaluacion {
  nivel: Nivel;
  razon: string;
  accion: string;
  fuente: string;
  reglaDisparada: string;
  // --- añadido 2026-11-14: lo exige RealtimeTelemetryFrame del brief ---
  valor: number;
  baseline: number | null;
  desviacion: { tipo: TipoDesviacion; valor: number };
  degradado: boolean;
}

export function evaluar(
  paramId: string,
  valor: number,
  baseline: number | null,      // antes era `number`: rompía con baselinePreVuelo()
  entorno?: EntornoCabina,
  calidad?: number,             // 0..1; si falta, se asume 1
): Evaluacion;

export function baselinePreVuelo(
  crewId: CrewId,
  paramId: string,
): EstadisticaBaselinePersonal | null;
// Devuelve el objeto completo (media, desviacionEstandar, min, max, n), no solo la media:
// `triage` necesita la desviación estándar para el cálculo z-score.

export interface ResultadoPersistencia {
  ok: boolean;
  guardadas: number;
  codigo?: string;              // E-DB-001, E-DB-002, E-SYN-001…
  motivo?: string;
}

export async function guardarFrame(frame: RealtimeTelemetryFrame): Promise<ResultadoPersistencia>;
// Contrato: no lanza y no bloquea el loop de 1 Hz.
// Pero TAMPOCO descarta en silencio: devuelve `codigo` y deja rastro en `bitacora`.
```

**Correcciones aplicadas el 2026-11-14** (`[VERIFICADO]`):

| Error encontrado | Por qué rompía | Corrección |
|---|---|---|
| `baseline: number` vs `baselinePreVuelo(): number \| null` | Primer tripulante sin baseline → `NaN` o `!` forzado | `baseline: number \| null` + `degradado` |
| `Evaluacion` sin `valor`/`baseline`/`desviacion` | Back 1 debía recalcular `desviacionPct` por su cuenta → dos fórmulas | Campos añadidos al contrato |
| `guardarFrame` devolvía `void` | Fallo de IndexedDB invisible; datos perdidos sin rastro | `ResultadoPersistencia` con código |
| `evaluar` sin `calidad` | Un artefacto de sensor podía disparar `CRITICO` en el video | Parámetro opcional `calidad` |


### Back 1 entrega a Back 2

```ts
export function list(): ParameterDefinition[];
export function get(id: string): ParameterDefinition | undefined;

export function subscribe(cb: (frame: RealtimeTelemetryFrame) => void): () => void;
export function injectAnomaly(paramId: string, valor: number): void;
```

---

## 5 · Acuerdos antes de codificar

1. IDs canónicos acordados (OSDR tal cual; simulados en `snake_case`).
2. Corregir **19 → 17** indicadores en el brief.
3. `meshNodeId: ... | null` para parámetros `ambiental-cabina`.
4. Back 1 crea el scaffold; Back 2 agrega la configuración de tests.
5. **Roles confirmados (2026-11-14):** Back 1 = **Ernesto** (`@ernesto-montes`), Back 2 = **Angel Marco** (`@angel_marco`).
6. **Contratos congelados a H2.** Cambios posteriores solo por PR y con aviso al otro dueño.
7. **`repositories.ts` es el único punto de escritura en Dexie.** Back 1 nunca importa `dexie`.
8. **Runner de tests:** Vitest como `devDependency`, registrado como excepción al congelamiento del stack (`TECH-STACK.md` §Excepciones). No entra al bundle de producción.

---

## 6 · Pendientes

- [ ] Integrar `BRIEF-BACKEND-AGENTES.md` al repo (hoy vive en `~/Downloads`).
- [x] Confirmar Back 1: **Ernesto** (`@ernesto-montes`).
- [x] Confirmar Back 2: **Angel Marco** (`@angel_marco`).
- [ ] Aceptación explícita del reparto por ambos y por Pineda (revisión de `rules/`).
- [ ] Crear el issue del reparto y los dos issues de trabajo.
- [ ] Scaffold de Next 15: primer commit de Back 1.

# 14 · Contrato de integración Frontend ↔ Backend

> Documento para **Pineda (Frontend)**. Define exactamente qué expone el backend y cómo consumirlo.
> Todos los tipos referenciados viven en `src/types/index.ts` y se importan con `@/types`.
> Estado del backend: **completo y verificado** (`pnpm typecheck` 0, `pnpm test` 74/74, `pnpm build` 9 rutas).

---

## 1 · Principios

1. **Todo el backend es local y offline.** Las APIs son *route handlers* de Next que sirven datos del proceso, no de una red externa.
2. **Los datos en vivo viajan por SSE** (`GET /api/telemetry`), no por polling.
3. **La persistencia es transparente:** el front **no** toca Dexie/IndexedDB directamente. Consume las APIs y el SSE; la persistencia es interna del backend.
4. **Trazabilidad obligatoria:** toda cifra clínica trae su `fuente` / `fuenteTrazable`. Mostrarla es parte del diseño.
5. **Honestidad:** la simulación se etiqueta como simulación; el dataset OSDR como dataset público. Nunca "lectura de sensor real".

---

## 2 · Tipos compartidos (importar desde `@/types`)

```ts
export type CrewId = 'C001' | 'C002' | 'C003' | 'C004';
export type Sexo = 'M' | 'F';
export type Nivel = 'NOMINAL' | 'ATENCION' | 'CRITICO';
export type EntornoMision = 'nave' | 'estacion' | 'base-lunar';
export type MeshNodeId =
  | 'head_neuro_ocular' | 'thorax_heart' | 'thorax_lungs'
  | 'abdomen_hepatic_renal' | 'limbs_musculoskeletal' | 'systemic_immune_radiation';
export type ToolAnimationId =
  | 'anim_none' | 'anim_capillary_analyzer' | 'anim_bp_cuff'
  | 'anim_pulse_oximeter' | 'anim_ocular_fundoscope'
  | 'anim_cpr_cmrs_restraint' | 'anim_pba_oxygen_mask';
```

### `ParameterDefinition` (catálogo)

```ts
interface ParameterDefinition {
  id: string;
  nombre: string;
  unidad: string;
  categoria: 'biologico-fisico' | 'bioquimico-osdr' | 'ambiental';
  frecuencia: 'tiempo-real-continuo' | 'muestra-discreta' | 'ambiental-cabina';
  tipoDesviacion: 'z-score' | 'delta-absoluto';
  rangoReferencia: { min: number|null; max: number|null; criticoMin: number|null; criticoMax: number|null };
  rangoReferenciaPorSexo?: Partial<Record<Sexo, { min; max; criticoMin; criticoMax }>>;  // creatinina
  referenciaPoblacional: { min: number|null; max: number|null };
  fuenteUmbral: string;
  meshNodeId: MeshNodeId | null;
  toolAnimationId: ToolAnimationId;
  entornos: EntornoMision[];       // ← para filtrar por entorno
  fuenteTrazable: string;
  esDatoRealOSDR: boolean;
}
```

---

## 3 · Endpoints REST

### 3.1 · `GET /api/parameters` — catálogo

Responde los 26 parámetros (17 OSDR + 9 simulados).

```json
{
  "total": 26,
  "osdr": 17,
  "simulados": 9,
  "parametros": [ /* ParameterDefinition[] */ ]
}
```

**Uso para filtrar por entorno** (además de `listarPorEntorno` en el backend):
```ts
const relevantes = parametros.filter(p => p.entornos.includes(entornoSeleccionado));
```

### 3.2 · `GET /api/osdr` — dataset OSDR

Parámetros: `?verifyRemote=1` (verifica contra NASA, opcional), `?fueraDeRango=1` (incluye las 24 lecturas fuera de rango).

```json
{
  "estado": "offline-seed" | "online-verificado",
  "meta": { "accesion": "OSD-575", "titulo": "...", "tripulantes": ["C001","C002","C003","C004"] },
  "totalAnalitos": 17,
  "totalFueraDeRango": 24,
  "timepoints": [ { "id": "L-92", "diasRelativosAlLanzamiento": -92, "fase": "pre-vuelo" }, ... ]
}
```

### 3.3 · `GET /api/ai-context` — snapshot para el módulo de IA

Parámetros: `?crewId=C001&modo=emergencia&radiacionMsv=0.4&co2MmHg=2.8&retardoTierraSegundos=860`.

Responde un `AIAssistantContextSnapshot` (siempre con `fallbackDeterminista` poblado, sin necesidad de IA real):

```json
{
  "crewId": "C001",
  "modoOperacion": "rutina",
  "parametrosFueraDeRango": [
    {
      "id": "glucose", "nombre": "Glucosa", "valorActual": 103,
      "baselinePreVuelo": 96, "rangoReferencia": { "min": 65, "max": 99 },
      "nivelDeterminista": "ATENCION", "reglaDisparada": "ATENCION_ALTO"
    }
  ],
  "ambienteCabina": { "radiacionMsv": null, "co2MmHg": null, "retardoTierraSegundos": 0 },
  "fallbackDeterminista": {
    "mensajeResumen": "2 parámetro(s) fuera de rango. Nivel máximo: ATENCION.",
    "pasosAccion": ["Repetir la medición...", "Registrar la lectura..."]
  }
}
```

### 3.4 · `GET /api/protocolos` — protocolos de emergencia

Parámetros: `?id=<protocoloId>` | `?parametroId=<id>&nivel=CRITICO` | `?parametroId=<id>` | sin parámetros (todos).

```json
{
  "estado": "local",
  "total": 4,
  "protocolos": [
    {
      "id": "hipercapnia-cabina",
      "nombre": "Hipercapnia en cabina",
      "disparadores": [ { "parametroId": "cabin_co2", "nivel": "CRITICO", "regla": "CRITICO_ALTO" } ],
      "pasos": [ { "orden": 1, "texto": "..." }, { "orden": 2, "texto": "..." } ],
      "escalarA": "cmo",
      "fuente": "NASA HRP ...",
      "fuenteUrl": "https://...",
      "validado": false
    }
  ]
}
```

**Resolución por parámetro + nivel:** `GET /api/protocolos?parametroId=cabin_co2&nivel=CRITICO` devuelve el protocolo exacto (o `total: 0` si no hay).

### 3.5 · `POST /api/mediciones` — entrada manual (nuevo)

Un astronauta registra una medición a mano (glucómetro, analítica, corrección). El backend evalúa con el triage real y persiste.

**Body:**
```json
{ "crewId": "C001", "parametroId": "glucose", "valor": 103 }
```

**Respuesta (200):**
```json
{
  "ok": true,
  "medicion": {
    "crewId": "C001", "parametroId": "glucose", "valor": 103,
    "nivel": "ATENCION", "regla": "ATENCION_ALTO",
    "fuente": "OSDR OSD-575 ...", "degradado": false
  }
}
```

**Errores:** `400` (cuerpo inválido / parámetro no registrado), `500` (fallo de persistencia).

---

## 4 · Tiempo real (SSE)

### 4.1 · `GET /api/telemetry` — suscripción a la sala

Abre `EventSource('/api/telemetry')`. Cabecera `retry: 3000` (reconexión automática).

Eventos (`EventoSala`):

| Tipo | Payload | Cuándo |
|---|---|---|
| `snapshot` | `{ tipo, timestamp, tripulantes: EstadoTripulante[] }` | Al conectar |
| `alerta` | `{ tipo, timestamp, alerta: AlertaTripulacion }` | Alerta nueva o sube de nivel |
| `resuelta` | `{ tipo, timestamp, crewId, parametroId }` | Vuelve a NOMINAL |
| `latido` | `{ tipo, timestamp, tripulantes: {crewId,nivel,estadoEnlace}[] }` | Cada 5 s |

```ts
// AlertaTripulacion
interface AlertaTripulacion {
  id: string; crewId: CrewId; parametroId: string; nombreParametro: string;
  nivel: Nivel; valor: number; unidad: string; baseline: number|null;
  razon: string; accion: string; reglaDisparada: string; fuente: string; timestamp: number;
}

// EstadoTripulante
interface EstadoTripulante {
  crewId: CrewId; nivel: Nivel; alertasActivas: AlertaTripulacion[];
  ultimaActualizacion: number; silencioSegundos: number|null; estadoEnlace: 'conectado'|'degradado'|'sin-enlace';
}
```

### 4.2 · `POST /api/telemetry` — publicar frame de una estación

Cada estación publica su frame cada ~2 s. El backend valida con Zod.

```json
// body: RealtimeTelemetryFrame
{ "aceptado": true, "alertas": 2 }   // status 202
```

> En la integración con el front, esta publicación la hace el `runtime` de Back 1 (`sala-control.tsx` ya lo hace). El front **no** necesita reimplementarla; la hereda del runtime.

---

## 5 · Modelo 3D

El frame en vivo trae el estado agregado por nodo corporal en `frame.estadoNodos3D`:

```ts
// RealtimeTelemetryFrame
interface RealtimeTelemetryFrame {
  timestamp: number;
  crewId: CrewId;
  metSegundos: number;
  lecturas: Record<string, LecturaFrame>;
  estadoNodos3D: Partial<Record<MeshNodeId, {
    nivelMaximo: Nivel;          // ← color del nodo
    parametroPrincipalId: string;
    animacionActiva: ToolAnimationId | null;  // ← animación a reproducir
  }>>;
}

// LecturaFrame (una lectura evaluada)
interface LecturaFrame {
  valor: number; unidad: string; baselinePersonal: number|null;
  desviacion: { tipo: 'z-score'|'delta-absoluto'; valor: number };
  nivel: Nivel; meshNodeId: MeshNodeId|null; toolAnimationId: ToolAnimationId;
  calidad: number; razon: string; accion: string; reglaDisparada: string; fuente: string;
}
```

**Mapeo visual (ya definido en `model3d-bridge/contracts.ts`):**
- `COLOR_NIVEL`: `NOMINAL` → verde, `ATENCION` → ámbar, `CRITICO` → rojo.
- `ETIQUETA_NODO`: nombre legible de cada `MeshNodeId`.
- `estadoDeNodo(frame, nodo)` → helper para leer un nodo del frame.

---

## 6 · Episodios y emergencias (cómo llegan al front)

El backend ya registra los **episodios** automáticamente (período continuo fuera de rango) y los **eventos de emergencia** (transición a CRITICO). El front los observa por dos vías:

1. **En vivo:** por el SSE — `alerta` (nuevo/subió) y `resuelta` (volvió a NOMINAL).
2. **Protocolo:** ante una alerta, el front pide `GET /api/protocolos?parametroId=X&nivel=Y` para mostrar los pasos ordenados.

> **Nota:** el backend persiste los episodios/eventos en IndexedDB, pero **aún no hay endpoint de consulta** para listarlos (`GET /api/episodios`). Si Pineda lo necesita, es una tarea pequeña de Back 2. Por ahora, el front se apoya en el SSE para el estado en vivo.

---

## 7 · Selección de entorno

El backend expone `EntornoMision` y cada `ParameterDefinition.entornos`. El front:

1. Muestra un selector de entorno (`nave` | `estacion` | `base-lunar`).
2. Filtra el catálogo con `parametros.filter(p => p.entornos.includes(entorno))`.
3. Opcional: usa `GET /api/parameters` y filtra en cliente, o el helper `listarPorEntorno()` si el código se corre del lado del backend.

> El entorno **no** cambia los umbrales por ahora (ver `06-entornos-mision.md`): solo determina qué indicadores son relevantes.

---

## 8 · Flujo de integración mínimo (checklist)

1. **Pantalla de rutina:** consumir `GET /api/parameters` + SSE para pintar las tarjetas por indicador con su semáforo.
2. **Mapa corporal (3D):** leer `frame.estadoNodos3D` del SSE y colorear nodos con `COLOR_NIVEL`.
3. **Pantalla de emergencia:** `GET /api/protocolos?parametroId=X&nivel=Y` → pasos ordenados por `orden` + `escalarA`.
4. **Módulo IA:** `GET /api/ai-context?crewId=X&modo=...` → mostrar `fallbackDeterminista.mensajeResumen` + `pasosAccion`.
5. **Entrada manual:** formulario que haga `POST /api/mediciones` (para analíticas, glucemia, correcciones).
6. **Semáforo literal:** `TrafficLight` con 3 luces según `nivel` (`NOMINAL`/`ATENCION`/`CRITICO`).
7. **Selector de entorno:** filtrar catálogo por `entornos`.

---

## 9 · Notas de honestidad (para la presentación)

- Los 17 parámetros OSDR son **datos reales** del dataset público `OSD-575`.
- Los 9 parámetros vitales son **simulados** (etiquetar "Simulación").
- La app **no diagnostica**: muestra nivel + acción + fuente, y el lenguaje es "esto deberías hacer", nunca "tienes X".
- Fuentes (HRP, OSDR) se **mencionan** en la presentación, no se citan formalmente (indicación de mentores/evaluadores).

---

## 10 · Registro

| Artefacto | Destino |
|---|---|
| Este documento | `docs/03-plan/14-contrato-integracion-front.md` |
| Tipos | `src/types/index.ts` (congelado, append-only) |
| Catálogo | `src/app/api/parameters/route.ts` + `registry.ts` |
| Sala SSE | `src/app/api/telemetry/route.ts` + `crew-hub.ts` |
| Entrada manual | `src/app/api/mediciones/route.ts` |

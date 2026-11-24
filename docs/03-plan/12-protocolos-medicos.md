# 12 · Protocolos médicos (Back 2)

> Traspaso de Back 1 (Ernesto) → Back 2 (Angel Marco).
> La versión oficial abandona la demo: esto define **qué debe construir Back 2** y el contrato que Back 1 ya consume.
> Estado: **listo para empezar**. La PWA de Back 1 ya cachea `/api/protocolos` sin conocer su contenido.

---

## 1 · Contexto

AEGIS necesita responder ante enfermedad, emergencias y eventos con **protocolos médicos oficiales trazables**. Hoy el triage devuelve un texto genérico en `Evaluacion.accion` (*"activar el protocolo de emergencia correspondiente"*), pero no existe el protocolo concreto ni el mapeo `parametroId + nivel → protocolo`.

**Alcance:** protocolos paso a paso, con fuente y fecha. Si un paso o umbral no tiene fuente primaria, se marca `[POR VALIDAR]` (regla `AGENTS.md §3`).

---

## 2 · Reparto

| Capa | Dueño | Estado |
|---|---|---|
| Cacheo offline de `/api/protocolos` | Back 1 (Ernesto) | ✅ Hecho (`public/sw.js`, network-first) |
| Datos de protocolos (`src/data/knowledge/`) | **Back 2 (Angel)** | ⬜ |
| Cliente de acceso (`src/lib/knowledge/`) | **Back 2** | ⬜ |
| API (`/api/protocolos`) | **Back 2** | ⬜ |
| Mapeo en `rules/triage.ts` | **Back 2** | ⬜ |
| UI de emergencia paso a paso | Frontend (Pineda) | ⬜ |

---

## 3 · Contrato de la API (congelado, no cambiar)

### `GET /api/protocolos`

Responde siempre con JSON local (sin red), igual que `api/osdr`.

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `id` | string | No | Devuelve un solo protocolo |
| `parametroId` | string | No | Protocolos disparados por ese parámetro |
| `nivel` | `ATENCION \| CRITICO` | No | Filtra por severidad |

**Respuesta** (siempre `200` con fallback local):

```json
{
  "estado": "local",
  "total": 1,
  "protocolos": [
    {
      "id": "hipercapnia-cabina",
      "nombre": "Hipercapnia en cabina",
      "disparadores": [
        { "parametroId": "cabin_co2", "nivel": "CRITICO", "regla": "CRITICO_ALTO" }
      ],
      "pasos": [
        { "orden": 1, "texto": "..." },
        { "orden": 2, "texto": "..." }
      ],
      "escalarA": "cmo",
      "fuente": "NASA ALSP ...",
      "fuenteUrl": "https://...",
      "validado": false
    }
  ]
}
```

---

## 4 · Estructura de archivos que debe crear Back 2

```text
src/
├── data/knowledge/
│   └── protocolos.json            # Back 2 · fuente de verdad (append-only)
└── lib/knowledge/
    └── client.ts                  # Back 2 · índice O(1), como osdr/client.ts
└── app/api/protocolos/
    └── route.ts                   # Back 2 · GET con filtros de §3
```

**Firma mínima del cliente** (para que el front y el triage lo consuman):

```ts
// src/lib/knowledge/client.ts
export interface Protocolo {
  id: string;
  nombre: string;
  disparadores: Array<{ parametroId: string; nivel: Nivel; regla: string }>;
  pasos: Array<{ orden: number; texto: string }>;
  escalarA: 'cmo' | 'cirujano-de-vuelo' | 'protocolo-emergencia';
  fuente: string;
  fuenteUrl?: string;
  validado: boolean;
}

export function listarProtocolos(): Protocolo[];
export function protocoloPara(parametroId: string, nivel: Nivel): Protocolo | null;
```

---

## 5 · Integración con `rules/triage.ts`

El `accion` de `Evaluacion` debe dejar de ser texto genérico y pasar a **enlazar el protocolo concreto**:

- `triage.evaluar()` no importa `knowledge/` (mantener la invariante de `rules/` limpia).
- La **resolución del protocolo** se hace en `protocoloPara(parametroId, nivel)` y la consume la UI o el `runtime`.
- Si no hay protocolo para un parámetro, la UI muestra el `accion` actual (fallback).

---

## 6 · Reglas de honestidad (no negociables)

1. **Cero protocolos inventados.** Cada protocolo lleva `fuente` + `fuenteUrl` + fecha de consulta.
2. Sin fuente primaria → `validado: false` y `[POR VALIDAR]` en `fuente`.
3. Los protocolos se redactan **resumiendo** la fuente oficial, no copiando texto íntegro con copyright.
4. Fuentes sugeridas: NASA ALSP (*Advanced Life Support Protocols*), HRP, y las ya listadas en `docs/02-investigacion/04-bibliografia.md`.
5. `protocolos.json` es **append-only**: no se reescribe un paso existente sin PR.

---

## 7 · Criterios de aceptación

- [ ] `GET /api/protocolos` responde `< 50 ms` sin red.
- [ ] Al menos 1 protocolo por cada categoría: emergencia cardiorrespiratoria, ambiental (CO₂/radiación) y metabólico (OSDR).
- [ ] `protocoloPara(parametroId, nivel)` resuelve el protocolo correcto para los 26 parámetros del `registry`.
- [ ] Tests con Vitest: `knowledge/client` + resolución de protocolo.
- [ ] Cero cifras clínicas sin fuente (verificado contra `04-bibliografia.md`).

---

## 8 · Registro

| Artefacto | Destino |
|---|---|
| Este documento | `docs/03-plan/12-protocolos-medicos.md` |
| Contrato de la API | §3 (congelado) |
| Decisión de división | `MEMORY.md` § Decisiones |

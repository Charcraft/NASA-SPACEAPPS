# 15 · Endpoint de series para gráficas (tarea Back 2)

> Traspaso Back 1 (Ernesto) → Back 2 (Angel Marco).
> Para graficar el historial sin tocar la estructura: un endpoint de **solo lectura** sobre la tabla `series` que ya existe.
> Dueño: **Back 2** (`api/series/route.ts` + `repositories.ts`). Estado: **✅ implementada** (`listarSeries` + `/api/series`, con filtro en memoria porque la tabla no tiene índice simple `crewId`).

---

## 1 · Contexto

El front necesita mostrar el historial de cada parámetro (o por sección) como gráfica de tendencia. Hoy el front solo recibe el **último valor** por SSE. El historial vive en Dexie, en la tabla **`series`** (agregados 1min/1h), que ya tiene `media`, `min`, `max`, `n`.

**Regla de arquitectura que se respeta:** el front **no** toca Dexie directamente. Consume APIs. Por eso hace falta este endpoint.

**Por qué `series` y no `mediciones`:** `mediciones` (crudo) se poda a los 15–30 min y a ~12.400 filas/hora es inviable para graficar; `series` se conserva 30 días y ya está agregada (24 puntos/día en resolución 1h). **La gráfica lee `series`.**

---

## 2 · Contrato del endpoint (congelado)

### `GET /api/series`

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `crewId` | `C001–C004` | **Sí** | Tripulante |
| `parametroId` | string | No | Un solo parámetro (si se omite, devuelve todos) |
| `resolucion` | `1min` \| `1h` | No | Default `1h` |
| `desde` | number (epoch ms) | No | Inicio del rango |
| `hasta` | number (epoch ms) | No | Fin del rango |

**Respuesta (200):**

```json
{
  "crewId": "C001",
  "total": 24,
  "series": [
    {
      "crewId": "C001",
      "parametroId": "heart_rate",
      "resolucion": "1h",
      "inicio": 1760000000000,
      "fin": 1760003600000,
      "min": 58,
      "max": 84,
      "media": 71.2,
      "n": 3600
    }
  ]
}
```

**Errores:** `400` si falta `crewId` o es inválido; `200` con `series: []` si no hay datos en el rango.

---

## 3 · Cambio requerido

### 3.1 · Nueva función de lectura en `db/repositories.ts`

```ts
import type { SerieAgregada } from '@/lib/db/types';

/**
 * Lista las series agregadas de un tripulante (opcionalmente de un parámetro,
 * resolución y rango). Solo lectura; no lanza (devuelve [] ante error).
 *
 * Nota: la tabla `series` NO tiene índice simple `crewId` (solo el compuesto
 * `[crewId+parametroId+resolucion+inicio]`), así que se filtra en memoria.
 */
export async function listarSeries(opciones: {
  crewId: CrewId;
  parametroId?: string;
  resolucion?: '1min' | '1h';
  desde?: number;
  hasta?: number;
}): Promise<SerieAgregada[]> {
  try {
    const todas = await db.series.toCollection().toArray();

    return todas
      .filter((s) => {
        if (s.crewId !== opciones.crewId) return false;
        if (opciones.parametroId && s.parametroId !== opciones.parametroId) return false;
        if (opciones.resolucion && s.resolucion !== opciones.resolucion) return false;
        if (opciones.desde !== undefined && s.inicio < opciones.desde) return false;
        if (opciones.hasta !== undefined && s.fin > opciones.hasta) return false;
        return true;
      })
      .sort((a, b) => a.inicio - b.inicio);
  } catch {
    return [];
  }
}
```

> ⚠️ La tabla `series` **no** tiene índice simple `crewId` (solo el compuesto `[crewId+parametroId+resolucion+inicio]`). Por eso se lee con `toCollection()` y se filtra en memoria — sin tocar el esquema.

### 3.2 · Endpoint `src/app/api/series/route.ts`

```ts
import { NextResponse } from 'next/server';
import { listarSeries } from '@/lib/db/repositories';
import { z } from 'zod';

const CREWS = ['C001', 'C002', 'C003', 'C004'] as const;
const RESOLUCIONES = ['1min', '1h'] as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const crewId = searchParams.get('crewId');
  const parametroId = searchParams.get('parametroId');
  const resolucion = searchParams.get('resolucion');
  const desde = searchParams.get('desde');
  const hasta = searchParams.get('hasta');

  if (!crewId || !CREWS.includes(crewId as any)) {
    return NextResponse.json({ error: 'crewId inválido' }, { status: 400 });
  }

  const series = await listarSeries({
    crewId: crewId as any,
    parametroId: parametroId ?? undefined,
    resolucion: (resolucion === '1min' || resolucion === '1h') ? resolucion : '1h',
    desde: desde !== null ? Number(desde) : undefined,
    hasta: hasta !== null ? Number(hasta) : undefined,
  });

  return NextResponse.json({ crewId, total: series.length, series });
}
```

---

## 4 · Criterios de aceptación

- [ ] `GET /api/series?crewId=C001&resolucion=1h` devuelve `{ crewId, total, series }` en < 50 ms.
- [ ] Con `parametroId` devuelve solo ese parámetro.
- [ ] Con `desde`/`hasta` respeta el rango.
- [ ] Sin datos en el rango → `200` con `series: []`.
- [ ] `crewId` inválido → `400`.
- [ ] Test con Vitest: `listarSeries` con datos sembrados devuelve solo el rango pedido, ordenado por `inicio`.

---

## 5 · Qué NO cambia (mantener la estructura)

- ❌ No se toca el esquema de Dexie (la tabla `series` ya existe).
- ❌ No se toca `mediciones`, `colaSync`, `eventos`, `bitacora`.
- ❌ No se toca el triage, runtime, sync ni contratos.
- ✅ Es **aditivo**: 1 función de lectura + 1 endpoint.

---

## 6 · Registro

| Artefacto | Destino |
|---|---|
| Este documento | `docs/03-plan/15-graficas-backend.md` |
| Función | `src/lib/db/repositories.ts` |
| Endpoint | `src/app/api/series/route.ts` |

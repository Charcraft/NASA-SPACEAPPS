# 13 · Reconciliación de sincronización (tarea Back 2)

> Traspaso Back 1 (Ernesto) → Back 2 (Angel Marco).
> Cierra el ciclo de sincronización: cuando Tierra confirma un lote (ACK), las mediciones de ese frame deben marcarse `sincronizadoTierra: true`.
> Dueño: **Back 2** (`db/repositories.ts`). Estado: **✅ implementada** (`marcarSincronizadoPorFrame` + llamada en `flushCola`, 4 tests).

---

## 1 · Contexto

El pipeline de sync tiene **dos marcas de estado** que hoy no están conectadas entre sí:

| Capa | Marca | Quién la actualiza |
|---|---|---|
| Cola (`colaSync`) | `estado: 'pendiente' → 'enviado'` | ✅ `flushCola` (Back 1) al recibir el ACK |
| Mediciones (`mediciones`) | `sincronizadoTierra: false → true` | ❌ **Nadie** |

**Consecuencia:** `pendientesSincronizar()` siempre devuelve todo el histórico, porque `sincronizadoTierra` nunca pasa a `true`. Los datos llegan a Tierra (la cola se drena), pero la capa de mediciones no lo refleja.

---

## 2 · Dónde está el punto exacto

En `src/lib/sync/transport.ts` (Back 1), la función `flushCola`:

```ts
const ok = await tx.enviar(lote);
if (ok) {
  await marcarEnviado(lote.id);   // ← marca la COLA como enviada
  exitosos++;
  // AQUÍ FALTA: marcar las MEDICIONES del frame como sincronizadas
}
```

`lote` es un `LoteSync` de `sync/queue.ts`. Cuando `lote.tipo === 'frame'`, su `payload` es un `RealtimeTelemetryFrame` con `crewId` y `timestamp`.

---

## 3 · Cambio requerido

### 3.1 · Nueva función en `db/repositories.ts` (Back 2)

```ts
import type { CrewId } from '@/types';

/**
 * Marca como sincronizadas las mediciones de un frame ya confirmado por Tierra.
 * Devuelve cuántas mediciones se actualizaron.
 */
export async function marcarSincronizadoPorFrame(
  crewId: CrewId,
  timestamp: number,
): Promise<number> {
  const pendientes = await db.mediciones
    .where('crewId')
    .equals(crewId)
    .filter((m) => m.timestamp === timestamp && !m.sincronizadoTierra)
    .toArray();

  await db.transaction('rw', db.mediciones, async () => {
    for (const m of pendientes) {
      await db.mediciones.update(m.id as number, { sincronizadoTierra: true });
    }
  });

  return pendientes.length;
}
```

> El índice por `crewId` ya existe en `db/dexie.ts`. No requiere migración de esquema.

### 3.2 · Llamada en `flushCola` (Back 1, con aviso a Ernesto)

```ts
import { marcarSincronizadoPorFrame } from '@/lib/db/repositories';

// dentro de flushCola, tras marcarEnviado:
if (lote.tipo === 'frame' && 'crewId' in lote.payload && 'timestamp' in lote.payload) {
  await marcarSincronizadoPorFrame(lote.payload.crewId, lote.payload.timestamp);
}
```

> **Nota de dueño:** `repositories.ts` es de Back 2. La llamada desde `transport.ts` (Back 1) es un **consumo** de la API pública de Back 2. La edición en `transport.ts` la hace Ernesto; Angel solo entrega la función.

---

## 4 · Criterios de aceptación

- [ ] `marcarSincronizadoPorFrame(crewId, timestamp)` marca `true` en todas las mediciones de ese `crewId` + `timestamp` con `sincronizadoTierra: false`.
- [ ] Devuelve el número exacto de mediciones actualizadas (0 si no hay pendientes).
- [ ] `pendientesSincronizar()` deja de devolver mediciones ya confirmadas.
- [ ] No lanza: ante un error devuelve `0` y deja rastro, sin bloquear `flushCola`.
- [ ] Idempotente: llamar dos veces no duplica ni falla.
- [ ] Test con Vitest en `repositories.test.ts`: tras `guardarFrame` + `marcarSincronizadoPorFrame`, `pendientesSincronizar()` queda vacío para ese frame.

---

## 5 · Consideraciones

1. **Idempotencia:** el filtro `!sincronizadoTierra` garantiza que una segunda llamada no re-marca filas ya sincronizadas.
2. **Concurrencia:** `flushCola` es secuencial (un lote por iteración); no hay condición de carrera con el bucle de 1 Hz si el frame se guardó antes de encolarse.
3. **Clave `crewId + timestamp`:** cada `guardarFrame` usa `frame.timestamp` (epoch ms del origen), único por frame a 1 Hz. Suficiente para el MVP.
4. **No tocar** `sync/queue.ts` ni `transport.ts` (son de Back 1): Angel entrega la función; Ernesto conecta la llamada.

---

## 6 · Registro

| Artefacto | Destino |
|---|---|
| Este documento | `docs/03-plan/13-reconciliacion-sync.md` |
| Función nueva | `src/lib/db/repositories.ts` |
| Consumo | `src/lib/sync/transport.ts` (Back 1) |
| Decisión | `MEMORY.md` § Decisiones |

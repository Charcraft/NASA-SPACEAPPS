# Bitácora de Angel Marco Martínez Cobos

> **Append-only.** Solo tú escribes aquí. Añade un bloque al final cada vez que cierras una sesión de trabajo.
> Sirve para tres cosas: que no pierdas el hilo, que el equipo sepa en qué vas, y que el domingo puedas reconstruir qué pasó.

---

## Formato

```
## YYYY-MM-DD · HH:MM — Título corto

**Hice:** ...
**Siguiente:** ...
**Bloqueos:** ... (o "ninguno")
**Issue(s):** #12, #15
**Rama:** feat/usuario/nombre
```

---

## Ejemplo (bórralo cuando escribas el tuyo)

```
## 2026-11-10 · 18:30 — Primer dataset normalizado

**Hice:** Descargué la serie de glucosa de OSDR y la dejé en src/data/seed/glucosa.json
**Siguiente:** Escribir el script de normalización para que sea reproducible
**Bloqueos:** ninguna
**Issue(s):** #8
**Rama:** data/cxrlosmp/osdr-glucosa
```

---

## Registro

## 2026-11-14 · 15:47 — Reparto Backend 2

**Hice:** Convertí `BRIEF-BACKEND-AGENTES.md` en un reparto de archivos sin duplicados. Verifiqué que 10 archivos marcados `[YA CREADO]` no existen y que el seed tiene 17 indicadores (no 19). Escribí `team/angel_marco/plan-backend-2.md` y `docs/03-plan/10-reparto-backend.md`.
**Siguiente:** Acordar contratos e IDs con Back 1; esperar el scaffold para arrancar `osdr/client.ts` y `thresholds.ts`.
**Bloqueos:** Falta confirmar quién es Back 1; no hay `package.json` ni runner de tests.
**Issue(s):** pendiente de crear
**Rama:** docs/angel_marco/plan-backend

## 2026-11-14 · 15:49 — Back 1 confirmado y rama de revisión

**Hice:** Se confirmó que **Back 1 es Ernesto (`@ernesto-montes`)**. Actualicé ambos planes y `MEMORY.md`. Preparo la rama `docs/angel_marco/plan-backend` con los documentos para revisión de Pineda y Ernesto.
**Siguiente:** Abrir el PR y etiquetar a los dos revisores.
**Bloqueos:** ninguno
**Issue(s):** pendiente de crear
**Rama:** docs/angel_marco/plan-backend

## 2026-11-14 · 15:53 — PR abierto para revisión

**Hice:** Subí la rama `docs/angel_marco/plan-backend` y abrí el **PR #1**: https://github.com/Charcraft/NASA-SPACEAPPS/pull/1. Asigné como revisores a **Pineda (`@Charcraft`)** y **Ernesto (`@ErnestoMG01`)**. Para poder subir, acepté la invitación pendiente del repo con permiso `write`.
**Siguiente:** Resolver comentarios y, con su aprobación, mergear.
**Bloqueos:** ninguno (red intermitente al subir).
**Issue(s):** pendiente de crear
**Rama:** docs/angel_marco/plan-backend

## 2026-11-14 · 20:15 — Protocolos médicos (Back 2)

**Hice:** Revisé los cambios de Ernesto (PWA offline, fix de SyncStatus, traspaso de protocolos). Implementé la capa de protocolos: `src/data/knowledge/protocolos.json` (4 protocolos en lenguaje simple), `src/lib/knowledge/client.ts` (`protocoloPara`), `src/app/api/protocolos/route.ts` y 8 tests. Fuentes: NASA HRP + OSDR OSD-575; pasos adaptados marcados `[POR VALIDAR]`.
**Siguiente:** Coordinar con Ernesto el cableado de `protocoloPara` en el runtime/UI y validar el contenido médico con fuente primaria.
**Bloqueos:** NASA-STD-3001 no accesible (404); usé HRP + OSDR ya citadas.
**Issue(s):** pendiente de crear
**Rama:** feat/integracion-back

## 2026-11-14 · 21:27 — Rangos por sexo (creatinina)

**Hice:** Implementé los rangos de referencia sexo-específicos: tipo `Sexo` + `rangoReferenciaPorSexo?`, creatinina con rango M/F (fuente UCSF Health, `[POR VALIDAR]`), perfil `tripulacion.json` [SUPUESTO] + `sexoDe()`, y resolución por sexo en `thresholds`/`triage`/`runtime`. 9 tests nuevos.
**Siguiente:** BUN queda documentado (MedlinePlus confirma que varía por sexo, sin cifras) pero sin implementar. Validar rangos sexo-específicos con fuente clínica antes de presentar.
**Bloqueos:** ninguna (creatinina verificada; BUN sin cifras exactas de fuente confiable).
**Issue(s):** pendiente de crear
**Rama:** feat/integracion-back

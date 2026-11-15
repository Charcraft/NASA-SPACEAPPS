# 02.6 · Entornos de misión: nave, estación y base lunar

> Determina **qué indicador importa en cada entorno** y por qué, trazable a los cinco peligros del HRP de NASA.
> Fuente: `01-cinco-peligros.md` (NASA HRP) y `02-indicadores-fisiologicos.md`.
> Estado de los datos numéricos: `[POR VALIDAR]` salvo que se indique fuente primaria.

---

## 1 · Los tres entornos

| Entorno | Régimen de gravedad | Radiación | Distancia a Tierra | Ambiente |
|---|---|---|---|---|
| **Nave** (tránsito) | Microgravedad pura | **Máxima**: GCR + SPE fuera de la magnetosfera | Hasta ~22 min por sentido (Marte) | Cerrado, soporte vital crítico |
| **Estación** (órbita baja) | Microgravedad | **Moderada**: dentro de la magnetosfera | ~1.3 s | Cerrado, 16 amaneceres/día |
| **Base lunar** (superficie) | Gravedad parcial (1/6 g) | **Alta**: sin atmósfera, solo blindaje del hábitat | ~1.3 s | Cerrado + polvo lunar + EVA |

> La diferencia entre entornos **no es binaria** (sí/no): es una exposición distinta al mismo peligro. El catálogo usa `entornos: []` para la *aplicabilidad* y este documento explica la *severidad relativa*.

---

## 2 · Trazabilidad: entorno → peligro → indicador

### Radiación (HRP peligro #1)

| Entorno | Exposición | Indicador | Nota |
|---|---|---|---|
| Nave | 🔴 Máxima (GCR continua + SPE) | `radiation_dose` | El dosímetro es el dato directo |
| Estación | 🟡 Moderada (magnetosfera) | `radiation_dose` | Umbral de alerta distinto, menos estricto |
| Base lunar | 🔴 Alta (sin atmósfera, SPE en EVA) | `radiation_dose` | Requiere refugio de regolito y límite de carrera |

### Microgravedad (HRP peligro #4)

| Entorno | Efecto | Indicador |
|---|---|---|
| Nave | 🔴 SANS, pérdida ósea/muscular, desplazamiento de fluidos | `intracranial_pressure_est`, `heart_rate`, `systolic_bp`, `diastolic_bp` |
| Estación | 🔴 Igual (microgravedad pura) | Los mismos |
| Base lunar | 🟡 Parcial (1/6 g), efecto reducido no nulo | Vitales cardiovasculares; `intracranial_pressure_est` queda fuera `[POR VALIDAR]` |

### Ambiente cerrado (HRP peligro #5)

| Entorno | Riesgo | Indicador |
|---|---|---|
| Nave, estación, base lunar | CO₂ elevado, microbiota alterada, hipoxia | `cabin_co2`, `spo2`, `core_temperature`, `respiratory_rate` |

### Distancia (HRP peligro #3) — restricción de diseño, no indicador

- Nave (Marte): retardo ~22 min → máxima autonomía, protocolos completos a bordo.
- Estación y base lunar: ~1.3 s → telemedicina casi en vivo, evacuación posible.
- Determina **cuánto debe persistir y sincronizarse**, no qué indicador medir.

### Aislamiento (HRP peligro #2)

- Cubierto por indicadores conductuales (sueño, ánimo, tiempo de reacción) que hoy están en `02-indicadores-fisiologicos.md` **pero no en el catálogo del MVP** (ver §4).

---

## 3 · Regla de asignación en el código

- **17 analitos OSDR** (panel metabólico CMP): aplican a **los tres entornos**. Es el biomarcador de rutina pre/en/post vuelo de cualquier misión tripulada. `[Fuente: OSDR OSD-575]`
- **Vitales y ambiente** (9 simulados): aplican a los tres, **excepto** `intracranial_pressure_est` (SANS), que solo aplica a microgravedad (`nave`, `estacion`). En base lunar falta dato primario → excluido hasta validar.
- La función `listarPorEntorno(entorno)` del `registry` filtra el catálogo para la UI.

---

## 4 · Indicadores documentados pero NO en el MVP

Estos están en `02-indicadores-fisiologicos.md` con base HRP, pero **no** en el catálogo actual (26 params). Quedan para fase posterior:

| Indicador | Entorno donde más importa | Estado |
|---|---|---|
| Sueño (h/calidad) | Nave (aislamiento) | Documentado, sin catálogo |
| Estado de ánimo (POMS) | Nave (aislamiento) | Documentado, sin catálogo |
| Masa corporal | Nave/estación (gravedad) | Documentado, sin catálogo |
| Carga de ejercicio | Nave/estación (contramedida) | Documentado, sin catálogo |
| Agudeza visual (SANS) | Nave/estación | Documentado, sin catálogo |
| Tiempo de reacción | Nave (radiación/aislamiento) | Documentado, sin catálogo |

> Se documentan aquí para no perder la trazabilidad, pero **no se implementan** hasta no tener su catálogo de umbrales con fuente (regla `AGENTS.md §3`).

---

## 5 · Referencias

- NASA HRP — 5 Hazards: https://www.nasa.gov/hrp/hazards/
- NASA HRP — Space Radiation: https://www.nasa.gov/hrp/hazard-space-radiation/
- NASA HRP — Gravity Fields: https://www.nasa.gov/hrp/hazard-gravity-fields/
- NASA HRP — Hostile/Closed Environments: https://www.nasa.gov/hrp/hazard-hostile-closed-environments/
- OSDR OSD-575: `src/data/seed/osdr-inspiration4-cmp.json`
- Todo valor numérico queda `[POR VALIDAR]` hasta citar fuente primaria.

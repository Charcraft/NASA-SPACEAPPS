# 02.7 · Los 17 analitos OSDR (panel metabólico CMP)

> Documento de trazabilidad de los 17 bioquímicos del catálogo.
> **Fuente primaria:** OSDR **OSD-575** — *SpaceX Inspiration4 Blood Serum Metabolic Panel* (`src/data/seed/osdr-inspiration4-cmp.json`).
> Estado: los **rangos y valores** son `[VERIFICADO]` (vienen del dataset). Las **técnicas de laboratorio** son `[INFERENCIA]` (química clínica estándar, no citadas en el dataset). Los **ejemplos de misiones** distintos de Inspiration4 son `[POR VERIFICAR]`.

---

## 1 · Qué es este panel

Los 17 analitos forman el **Comprehensive Metabolic Panel (CMP)**, el panel de química sanguínea de rutina en medicina. Evalúa cuatro sistemas:

| Sistema | Analitos | Qué vigila |
|---|---|---|
| **Hígado** | Fosfatasa alcalina, ALT, AST, bilirrubina total | Función hepática y daño celular |
| **Riñón** | Creatinina, eGFR (×2), BUN | Filtrado glomerular |
| **Electrolitos** | Sodio, potasio, cloruro, calcio, CO₂ total | Equilibrio iónico y ácido-base |
| **Proteínas** | Albúmina, globulina, proteína total | Estado nutricional e inflamación |
| **Metabólico** | Glucosa | Energía y control glucémico |

**Por qué importa en vuelo espacial:** la microgravedad altera el balance de fluidos, la masa muscular/ósea y la función renal (riesgo de cálculos). El CMP es la ventana de laboratorio a esos cambios.

---

## 2 · Cómo se obtienen

### 2.1 · La muestra

```text
Sangre venosa ──► tubo con gel separador ──► centrifugado ──► SUERO ──► analizador
```

1. **Toma de sangre** venosa (flebopunción) o, en vuelo, sistema de recolección adaptado.
2. **Centrifugado** para separar el suero de las células.
3. **Análisis químico** en un analizador automatizado de química clínica.

### 2.2 · Frecuencia real (dato honesto)

El CMP **no se mide en continuo**. Se mide en **timepoints discretos** antes y después del vuelo. En OSD-575 son 7:

| Timepoint | Fase | Días relativos |
|---|---|---|
| L-92, L-44, L-3 | Pre-vuelo (línea base) | −92, −44, −3 |
| R+1, R+45, R+82, R+194 | Post-vuelo | +1, +45, +82, +194 |

> Por eso en el catálogo los 17 OSDR tienen `frecuencia: 'muestra-discreta'`. En la demo se muestran como dataset; no se simulan como si fueran continuos.

---

## 3 · Los 17 analitos: función, método y relevancia en vuelo

| # | Analito | Unidad | Rango (dataset) | Método de laboratorio `[INFERENCIA]` | Relevancia en vuelo |
|---|---|---|---|---|---|
| 1 | **Albúmina** | g/dL | 3.6–5.1 | Colorimetría verde de bromocresol | Estado nutricional; baja con inflamación |
| 2 | **Fosfatasa alcalina** | U/L | 36–130 | Sustrato p-nitrofenilfosfato | Marcador de recambio óseo (pérdida ósea) |
| 3 | **ALT** | U/L | 9–46 | Ensayo enzimático NADH | Daño hepatocelular |
| 4 | **AST** | U/L | 10–40 | Ensayo enzimático NADH | Daño celular (hígado/músculo) |
| 5 | **Bilirrubina total** | mg/dL | 0.2–1.2 | Reacción diazo | Función hepática |
| 6 | **Calcio** | mg/dL | 8.6–10.3 | Arsenazo III / o-cresolftaleína | Pérdida ósea → calcio sérico |
| 7 | **CO₂ total** | mmol/L | 20–32 | Electrodo pH/pCO₂ | Equilibrio ácido-base |
| 8 | **Cloruro** | mmol/L | 98–110 | ISE (electrodo selectivo) | Balance electrolítico |
| 9 | **Creatinina** | mg/dL | 0.6–1.35 (M 0.7–1.3 / F 0.5–0.95) | Jaffé o enzimática | Función renal; varía por masa muscular |
| 10 | **eGFR (afroam.)** | mL/min/1.73m² | ≥60 | **Cálculo** CKD-EPI | Filtrado glomerular |
| 11 | **eGFR** | mL/min/1.73m² | ≥60 | **Cálculo** CKD-EPI | Filtrado glomerular |
| 12 | **Globulina** | g/dL | 1.9–3.7 | **Cálculo** (proteína − albúmina) | Respuesta inmune |
| 13 | **Glucosa** | mg/dL | 65–99 | Hexoquinasa / glucosa oxidasa | Energía, control glucémico |
| 14 | **Potasio** | mmol/L | 3.5–5.3 | ISE | Ritmo cardíaco, función neuromuscular |
| 15 | **Proteína total** | g/dL | 6.1–8.1 | Biuret | Nutrición, hidratación |
| 16 | **Sodio** | mmol/L | 135–146 | ISE | Hidratación, balance de fluidos |
| 17 | **BUN** | mg/dL | 7–25 | Ureasa | Función renal, catabolismo proteico |

> **Derivados vs medidos:** `eGFR` (×2) y `globulina` son **calculados** a partir de otros analitos, no medidos directamente. El resto son medidos.

---

## 4 · Ejemplos de uso en viajes reales

### 4.1 · Inspiration4 (2021) — `[VERIFICADO]`, es el propio dataset

- **Misión:** 4 civiles, 3 días en órbita baja (SpaceX Crew Dragon).
- **Qué se midió:** el CMP completo en 7 timepoints (pre y post vuelo).
- **Hallazgo del equipo:** **24 de 475 valores (5.1 %) caen fuera del rango de referencia** del propio dataset. Verificado contra el CSV original. Se usa como argumento de producto: *incluso en una misión corta, hay desviaciones que conviene detectar*.

### 4.2 · ISS (expediciones de ~6 meses) — `[POR VERIFICAR]`

- NASA monitorea bioquímica de rutina antes, durante y después de las estancias largas.
- Foco documentado: **pérdida ósea** (calcio, fosfatasa alcalina), **función renal y riesgo de cálculos** (creatinina, eGFR, BUN), **balance de fluidos** (sodio, potasio).

### 4.3 · NASA Twins Study (2015–2016) — `[POR VERIFICAR]`

- Scott Kelly (1 año en ISS) vs su gemelo Mark (en Tierra).
- Se compararon marcadores bioquímicos para aislar el efecto del vuelo espacial del componente genético. Es el precedente de "línea base personal" que justifica el diseño de AEGIS.

### 4.4 · Programas tempranos (Gemini/Apollo) — `[POR VERIFICAR]`

- Desde los primeros vuelos se monitorizaron **electrolitos y función renal** para entender la adaptación del cuerpo a la microgravedad. Es la base histórica del CMP en vuelo.

---

## 5 · Cómo se traduce esto al producto

| Pregunta | Respuesta |
|---|---|
| ¿Se miden en continuo? | **No.** Son muestras discretas pre/post vuelo |
| ¿Cómo llegan a la app? | Importación del dataset (OSDR OSD-575) o, en una misión, entrada de resultados de laboratorio |
| ¿Necesitan entrada manual? | **Sí** — son "datos con excepción": resultados de análisis, no lecturas de sensor |
| ¿Qué fuente se cita? | OSDR OSD-575 + `04-bibliografia.md` |

---

## 6 · Referencias

- OSDR OSD-575 — `src/data/seed/osdr-inspiration4-cmp.json` `[VERIFICADO]`
- NASA HRP — *The Human Body in Space* — https://www.nasa.gov/humans-in-space/the-human-body-in-space/ `[POR VERIFICAR]`
- UCSF Health — *Creatinine blood test* (rango por sexo) — https://www.ucsfhealth.org/medical-tests/creatinine-blood-test `[POR VALIDAR]`
- Las técnicas de laboratorio (§3) son química clínica estándar `[INFERENCIA]` — no citadas en el dataset.

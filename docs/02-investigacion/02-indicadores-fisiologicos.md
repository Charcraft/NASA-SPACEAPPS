# 02.2 · Catálogo de indicadores fisiológicos

> Este es el documento que alimenta el motor de triage de la aplicación.
> **Regla:** ningún valor de esta tabla se muestra en la app sin pasar de `[POR VALIDAR]` a `[VALIDADO]` con fuente primaria.

---

## Cómo leer este documento

Cada indicador tiene ficha con:

- **Qué mide** y en qué unidad.
- **Cómo se toma** (texto que la app le mostrará al astronauta).
- **Por qué importa** (peligro asociado).
- **Rango de referencia** y umbrales de semáforo.
- **Ajuste en vuelo** (qué cambia respecto a la Tierra).
- **Estado de validación**.

### Códigos de semáforo
- 🟢 **Verde** — dentro del rango habitual del tripulante. Sin acción.
- 🟡 **Amarillo** — fuera del rango habitual. Repetir medición, registrar contexto, avisar al CMO.
- 🔴 **Rojo** — fuera de rango clínico o cambio brusco. Activar protocolo y contactar al cirujano de vuelo.

### Nota metodológica importante
La app compara contra la **línea base personal** del tripulante, no solo contra rangos poblacionales. Motivo: los rangos "normales" en microgravedad están desplazados, y dos astronautas sanos pueden tener baselines distintos. `[SUPUESTO de diseño — justificado en docs/02-investigacion/01-cinco-peligros.md §4]`

---

## Tabla resumen

| # | Indicador | Unidad | Peligro | ¿Automedible? | Prioridad MVP |
|---|---|---|---|---|---|
| 1 | Frecuencia cardíaca en reposo | bpm | Gravedad | Sí | 🔴 Alta |
| 2 | Presión arterial | mmHg | Gravedad | Con manguito | 🔴 Alta |
| 3 | Saturación de oxígeno (SpO₂) | % | Ambiente | Sí | 🔴 Alta |
| 4 | Frecuencia respiratoria | rpm | Ambiente | Sí | 🟡 Media |
| 5 | Temperatura corporal | °C | Ambiente / inmune | Sí | 🔴 Alta |
| 6 | Glucemia capilar | mg/dL | Nutrición | Con glucómetro | 🟡 Media |
| 7 | Horas de sueño | h | Aislamiento | Sí | 🔴 Alta |
| 8 | Estado de ánimo | escala | Aislamiento | Sí | 🔴 Alta |
| 9 | Masa corporal | kg | Gravedad | Con báscula espacial | 🟡 Media |
| 10 | Carga de ejercicio | min / kJ | Gravedad | Sí | 🟡 Media |
| 11 | Dosis de radiación acumulada | mSv | Radiación | No (dosímetro) | 🟢 Baja |
| 12 | Agudeza visual / síntomas | — | Gravedad (SANS) | Con optotipo | 🟢 Baja |
| 13 | Tiempo de reacción | ms | Aislamiento / radiación | Sí (test web) | 🔴 Alta |
| 14 | Hidratación (color de orina) | escala 1–8 | Gravedad | Sí | 🟢 Baja |
| 15 | Síntomas y lesiones de piel | texto/imagen | Ambiente | Sí (cámara) | 🟡 Media |

**Prioridad MVP = los 6–8 primeros.** El resto es "si alcanza el tiempo".

---

## Fichas

### 1 · Frecuencia cardíaca en reposo

- **Unidad:** latidos por minuto (bpm).
- **Cómo se toma:** pulso radial o carotídeo durante 30 s multiplicado por 2, o dispositivo de pecho. En reposo, sentado y tras 5 min de quietud. Si es en microgravedad, el tripulante debe sujetarse para evitar flotar y falsear la lectura.
- **Por qué importa:** detecta desacondicionamiento cardiovascular, estrés, fiebre, arritmias. En microgravedad el corazón se redondea y el volumen plasmático baja.
- **Referencia en Tierra (reposo adulto):** 60–100 bpm. Atletas pueden estar en 40–60.
- **Ajuste en vuelo:** la FC en reposo tiende a mantenerse o bajar ligeramente; un aumento sostenido es señal de alerta. `[POR VALIDAR]`
- **Semáforo:**
  - 🟢 50–90 bpm y dentro de ±10 del baseline personal.
  - 🟡 90–110, o >15 bpm sobre baseline, o <50 sin ser atleta conocido.
  - 🔴 >110 en reposo, <40, o irregularidad palpable.
- **Estado:** rangos poblacionales son estándar clínico; ajuste en vuelo `[POR VALIDAR]`.

---

### 2 · Presión arterial

- **Unidad:** mmHg (sistólica / diastólica).
- **Cómo se toma:** manguito en el brazo a la altura del corazón, sentado, tras 5 min de reposo, dos tomas separadas 1 min. **En microgravedad hace falta un dispositivo automatizado y un punto de anclaje**; el tripulante no puede sostenerse el brazo contra la gravedad de forma fiable.
- **Por qué importa:** el riesgo cardiovascular es uno de los explícitamente nombrados en el reto. También detecta hipovolemia e intolerancia ortostática.
- **Referencia en Tierra (adulto):**
  - Normal: <120 / <80
  - Elevada: 120–129 / <80
  - Hipertensión etapa 1: 130–139 / 80–89
  - Hipertensión etapa 2: ≥140 / ≥90
  - Crisis: ≥180 / ≥120
- **Ajuste en vuelo:** la presión sistólica suele ser algo más baja en vuelo; el problema real aparece **al regresar** (hipotensión ortostática). `[POR VALIDAR]`
- **Semáforo:**
  - 🟢 Dentro de ±15 mmHg de la línea base personal y <140/90.
  - 🟡 Cambio >15 mmHg respecto al baseline, o 140–179 / 90–119.
  - 🔴 ≥180/120, o <90/60 con síntomas (mareo, visión borrosa, síncope).
- **Estado:** rangos poblacionales estándar; ajuste en vuelo `[POR VALIDAR]`.

---

### 3 · Saturación de oxígeno (SpO₂)

- **Unidad:** porcentaje.
- **Cómo se toma:** pulsioxímetro en dedo índice, sin esmalte, con la mano caliente y quieta. Esperar 30 s a que la señal se estabilice.
- **Por qué importa:** detecta hipoxia por fallo de soporte vital, fuga de oxígeno o problema pulmonar. Es el indicador más crítico en un ambiente cerrado.
- **Referencia en Tierra:** ≥95 % normal; 90–94 % requiere atención; <90 % es emergencia.
- **Ajuste en vuelo:** puede haber lecturas algo más bajas por atelectasias en microgravedad. `[POR VALIDAR]`
- **Semáforo:**
  - 🟢 ≥95 %
  - 🟡 90–94 %, o caída >3 puntos respecto al baseline
  - 🔴 <90 %, o caída brusca >5 puntos → **protocolo de hipoxia**
- **Estado:** rangos estándar; ajuste `[POR VALIDAR]`.

---

### 4 · Frecuencia respiratoria

- **Unidad:** respiraciones por minuto (rpm).
- **Cómo se toma:** contar durante 60 s en reposo, sin avisar al tripulante para no alterar el patrón.
- **Por qué importa:** signo temprano de hipoxia, acidosis, ansiedad o infección. Suele ser el primer parámetro que se altera y el último que se mide.
- **Referencia en Tierra:** 12–20 rpm.
- **Ajuste en vuelo:** sin cambios mayores esperados. `[SUPUESTO]`
- **Semáforo:** 🟢 12–20 · 🟡 20–24 o 10–11 · 🔴 >24 o <10
- **Estado:** rangos estándar.

---

### 5 · Temperatura corporal

- **Unidad:** °C.
- **Cómo se toma:** oral, timpánica o axilar, siempre por la misma vía para poder comparar.
- **Por qué importa:** fiebre es la señal más temprana de infección en un ambiente cerrado con microbiota alterada e inmunidad comprometida.
- **Referencia en Tierra:** 36.1–37.2 °C oral.
- **Ajuste en vuelo:** la temperatura central puede estar ligeramente elevada de forma basal. `[POR VALIDAR]`
- **Semáforo:** 🟢 36.0–37.3 · 🟡 37.4–38.0 · 🔴 >38.0 o <35.0
- **Estado:** rangos estándar.

---

### 6 · Glucemia capilar

- **Unidad:** mg/dL.
- **Cómo se toma:** glucómetro capilar, punción lateral del dedo, manos limpias y secas.
- **Por qué importa:** el reto nombra "nutrición inadecuada". Detecta hipoglucemia (peligrosa en una EVA o en una maniobra crítica) e hiperglucemia.
- **Referencia en Tierra (ayuno):** 70–99 normal; 100–125 prediabetes; ≥126 diabetes. **Hipoglucemia <70.**
- **Ajuste en vuelo:** cambios en sensibilidad a la insulina y en la dieta. `[POR VALIDAR]`
- **Semáforo:** 🟢 70–140 · 🟡 141–180 o 60–69 · 🔴 >180, <60, o cualquier valor con síntomas (sudoración, temblor, confusión)
- **Estado:** rangos estándar; relevancia en vuelo `[POR VALIDAR]`.

---

### 7 · Horas de sueño

- **Unidad:** horas y calidad percibida (1–5).
- **Cómo se toma:** autorregistro al despertar + opcionalmente actigrafía de muñeca.
- **Por qué importa:** el déficit de sueño es el predictor más accesible de deterioro cognitivo, error operacional y problema conductual. En órbita hay 16 ciclos día/noche por jornada terrestre.
- **Referencia:** 7–9 h en adultos.
- **Ajuste en vuelo:** la tripulación de ISS duerme en promedio menos de lo recomendado. `[POR VALIDAR]`
- **Semáforo:** 🟢 7–9 h con calidad ≥3 · 🟡 6–7 h o calidad 2 · 🔴 <6 h o <5 h varias noches seguidas
- **Estado:** recomendación estándar; promedio en vuelo `[POR VALIDAR]`.

---

### 8 · Estado de ánimo

- **Unidad:** escala estructurada (se propone un cuestionario corto de 6 ítems adaptado de POMS: tensión, ánimo deprimido, cólera, vigor, fatiga, confusión).
- **Cómo se toma:** 6 preguntas con escala 1–5, una vez al día, en el mismo momento.
- **Por qué importa:** es el único indicador que cubre el peligro de aislamiento y confinamiento de forma directa.
- **Referencia:** no hay "normal" absoluto; importa la **desviación respecto a la propia línea base**.
- **Semáforo:** 🟢 sin desviación · 🟡 desviación de 1–2 puntos sostenida 3 días · 🔴 desviación >2 puntos o ideación negativa → intervención y contacto con apoyo psicológico
- **Estado:** `[INFERENCIA]` — la escala concreta debe elegirse con fuente y adaptarse a un contexto no clínico.

---

### 9 · Masa corporal

- **Unidad:** kg.
- **Cómo se toma:** dispositivo de medición de masa corporal por oscilación (Body Mass Measurement Device) en microgravedad; báscula convencional en Luna/Marte.
- **Por qué importa:** pérdida de masa no intencional refleja pérdida muscular y ósea, y desbalance calórico.
- **Referencia:** variación <2 % semanal.
- **Semáforo:** 🟢 ±2 % · 🟡 2–4 % · 🔴 >4 % en una semana o >7 % acumulado en un mes
- **Estado:** umbrales `[INFERENCIA]` razonable, por validar.

---

### 10 · Carga de ejercicio

- **Unidad:** minutos y kilojulios por sesión.
- **Cómo se toma:** registro de la sesión (el ejercicio es a la vez contramedida y dato).
- **Por qué importa:** es la contramedida principal contra la pérdida ósea y muscular. Su ausencia es tan relevante como un valor anormal.
- **Referencia:** objetivo diario definido por el plan de contramedidas de la misión.
- **Semáforo:** 🟢 objetivo cumplido · 🟡 50–99 % · 🔴 <50 % durante 3 días
- **Estado:** `[SUPUESTO]` — el objetivo depende de la misión.

---

### 11 · Dosis de radiación acumulada

- **Unidad:** mSv.
- **Cómo se toma:** lectura de dosímetro personal (no es una medición activa del tripulante).
- **Por qué importa:** es el indicador directo del peligro #1.
- **Referencia:** límite de carrera por definir según fuente primaria. `[POR VALIDAR]`
- **Semáforo:** 🟢 bajo umbral de alerta · 🟡 acercándose al umbral · 🔴 umbral alcanzado
- **Estado:** **bloqueado hasta tener la fuente oficial**. Si no se consigue, se presenta como "lectura informativa sin semáforo".

---

### 12 · Agudeza visual y síntomas visuales (SANS)

- **Unidad:** líneas de optotipo + cuestionario de síntomas.
- **Cómo se toma:** test de agudeza a distancia fija con optotipo impreso o en pantalla calibrada; preguntar por visión borrosa, destellos, dolor de cabeza.
- **Por qué importa:** SANS es una de las complicaciones más documentadas de las misiones largas.
- **Semáforo:** 🟢 sin cambio · 🟡 cambio de 1 línea o síntomas leves · 🔴 pérdida ≥2 líneas o síntomas nuevos persistentes
- **Estado:** `[POR VALIDAR]` — prevalencia y criterios deben citarse.

---

### 13 · Tiempo de reacción y atención sostenida

- **Unidad:** milisegundos y tasa de aciertos.
- **Cómo se toma:** test web de 60–90 segundos: aparecen estímulos y el tripulante responde. Se corre a la misma hora cada día.
- **Por qué importa:** detecta fatiga, déficit de sueño, efectos de radiación en SNC y deterioro cognitivo por CO₂. **Y es el indicador más fácil de demostrar en un video.**
- **Referencia:** línea base individual de los primeros 3 días.
- **Semáforo:** 🟢 dentro del 10 % del baseline · 🟡 10–25 % más lento · 🔴 >25 % más lento o errores repetidos
- **Estado:** `[INFERENCIA]` — los umbrales se calibran con la propia línea base, no con una tabla externa.

---

### 14 · Hidratación

- **Unidad:** escala de color de orina de 8 niveles.
- **Cómo se toma:** observación y selección en la app.
- **Por qué importa:** la deshidratación agrava la intolerancia ortostática y el riesgo de cálculos renales, que es un riesgo conocido en vuelo.
- **Semáforo:** 🟢 1–3 · 🟡 4–5 · 🔴 6–8
- **Estado:** escala estándar.

---

### 15 · Síntomas y lesiones de piel

- **Unidad:** descripción + imagen opcional.
- **Cómo se toma:** cuestionario guiado ("¿dónde?, ¿desde cuándo?, ¿pica, duele, supura?") + foto con la cámara del dispositivo.
- **Por qué importa:** el reto menciona explícitamente la entrada por cámara. Es también la vía para detectar reacciones alérgicas, infecciones cutáneas y lesiones por el traje.
- **Semáforo:** 🟢 leve y localizado · 🟡 extendido o en aumento · 🔴 con fiebre, ampollas, dificultad respiratoria (posible anafilaxia)
- **Estado:** `[INFERENCIA]` — el árbol de decisión debe revisarse.

---

## Lo que la app nunca va a hacer

- Diagnosticar.
- Decir "tienes una infección".
- Recomendar un fármaco o una dosis concreta.

Sí puede decir: *"este valor, junto con este otro y este síntoma, cumple criterios para que un cirujano de vuelo lo revise de inmediato. Mientras tanto, esto es lo que debes hacer."*

Ese lenguaje es más defendible, más honesto y — ante un jurado con criterio científico — **más impresionante**.

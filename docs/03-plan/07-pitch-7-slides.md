# 03.7 · Pitch presencial — 7 diapositivas

> **Formato oficial:** máximo **7 diapositivas, en inglés**.
> **Estructura de la charla del Local Event:** problema y usuario → solución → datos espaciales → demostración → evidencia y limitaciones → cierre.
> **Evaluación:** impacto, creatividad, validez, relevancia, presentación.

---

## Dónde está el pitch

| Qué | Dónde |
|---|---|
| **Presentación lista para proyectar** | [`pitch-aegis.pptx`](pitch-aegis.pptx) — 7 diapositivas, inglés, 16:9 |
| **Guion hablado** (notas en español) | este documento |
| **Demo de 30 s** (para el submission) | [`06-demo-30s.md`](06-demo-30s.md) |
| **Demo en vivo de 90 s** | [`03-alcance-producto.md`](03-alcance-producto.md) §7 |

> El video de 30 s es para el jurado global. **Este pitch es para los jueces del Local Event.**

---

## Reglas que no se pueden romper

1. **Máximo 7 diapositivas.** Ni una más.
2. **Todo en inglés.** Lo que se lee y lo que se dice.
3. **Una idea por diapositiva.** Si hay que explicarla, no es una diapositiva.
4. **El problema y el usuario van primero.** Es lo que la charla marcó como lo más importante.
5. **Las limitaciones se dicen en voz alta.** Restan menos de lo que suman.

---

## Diapositiva 1 — Portada

**En pantalla**

```
AEGIS
Crew health autonomy, offline

Team ROCKET · NASA Space Apps Challenge 2026
Tuxtla Gutiérrez, Mexico

Challenge: Create Health Monitoring Software
for Astronauts on Space Missions
```

**Qué digo (20 s)**

> "Somos el equipo ROCKET. Construimos AEGIS: una herramienta para que un astronauta pueda evaluar su propia salud y decidir qué hacer, cuando no hay nadie al otro lado de la línea."

---

## Diapositiva 2 — Problema y usuario

**En pantalla**

```
HALFWAY TO MARS,
THERE IS NO DOCTOR

22 min   one-way communication delay
5        hazards: radiation, isolation, distance, gravity, closed environments
0        clinicians on board

OUR USER:  the crew member who has to decide alone
```

**Qué digo (50 s)**

> "A mitad de camino a Marte, la señal tarda hasta 22 minutos. El astronauta no es médico. Y las cinco amenazas del programa de investigación humana de NASA —radiación, aislamiento, distancia, gravedad y ambiente cerrado— producen cambios que hay que detectar antes de que sean una emergencia.
> Nuestro usuario no es el cirujano de vuelo en Houston. Es la persona que está en la nave, con un compañero en el suelo y sin poder preguntar."

---

## Diapositiva 3 — Solución

**En pantalla**

```
FROM "SOMETHING FEELS WRONG"
TO A DECISION

1  Guided measurement      how to measure, in microgravity
2  Personal baseline       not population ranges
3  Traffic light           green · yellow · red, with a reason and an action
4  Emergency protocols     step by step, with timer and log
5  Works offline           because there is no cloud at 22 light-minutes
```

**Qué digo (60 s)**

> "AEGIS convierte una pregunta abierta en una decisión.
> Primero guía la medición: cómo tomarte la presión en microgravedad y qué errores dan un valor falso.
> Después compara contra tu propia línea base, no contra una tabla de población, porque en el espacio tu fisiología se desplaza.
> Entrega un semáforo con una razón, una acción y la fuente.
> Y cuando es urgente, cambia de modo: protocolo paso a paso, con cronómetro y registro automático para el cirujano de vuelo.
> Todo funciona sin conexión."

---

## Diapositiva 4 — Datos espaciales

**En pantalla**

```
THRESHOLDS THAT COME
FROM REAL FLIGHT DATA

NASA HRP        5 hazards + risks framework
NASA OSDR       OSD-575 · Inspiration4 metabolic panel
                4 crew · 7 timepoints · L-92 → R+194
                reference ranges included in the dataset
CSA             radiation monitoring for astronaut health

Every number in the app traces to its source.
```

**Qué digo (50 s)**

> "No inventamos los umbrales.
> El marco viene del Human Research Program de NASA. Los datos vienen del repositorio abierto de NASA: el panel metabólico de los cuatro tripulantes de Inspiration4, con siete mediciones desde 92 días antes del lanzamiento hasta 194 días después.
> Y los rangos de referencia vienen dentro del propio archivo. Cada número en la aplicación se puede rastrear hasta su fuente."

---

## Diapositiva 5 — Demostración

**En pantalla**

```
THE PRODUCT

[ captura 1: medición guiada ]
[ captura 2: semáforo rojo ]
[ captura 3: protocolo activo ]

measure → compare → decide → act → log
```

> ⚠️ Sustituir los marcadores por capturas reales de la app antes de presentar.
> Si la app no está lista: usar el video de 30 segundos y decir "esto es el producto corriendo".

**Qué digo (60 s)**

> "Así se ve. El astronauta elige un indicador, la app le dice cómo medirlo, y con el valor entra el semáforo.
> Si sale rojo, la pantalla cambia: una acción a la vez, letra grande, cronómetro.
> Y todo queda registrado para cuando el cirujano de vuelo pueda verlo."

---

## Diapositiva 6 — Evidencia y limitaciones

**En pantalla**

```
WHAT WE VALIDATED

✓ real flight dataset, downloaded and normalized
✓ reference ranges taken from the source, not invented
✓ works with the network disabled
✓ every threshold traceable to a citation

WHAT WE DID NOT

× it does not diagnose
× it does not prescribe medication or doses
× 4 crew members, short orbital flight
× not clinically validated

We built a decision aid, not a medical device.
```

**Qué digo (45 s)**

> "Lo que validamos: el dataset es real y se descarga con un script reproducible; los rangos salen de la fuente; funciona con el WiFi apagado.
> Lo que no: no diagnostica, no receta, son cuatro personas en un vuelo orbital corto, y no está validado clínicamente.
> Construimos una ayuda para decidir, no un dispositivo médico. Y preferimos decirlo nosotros antes de que lo pregunte el jurado."

---

## Diapositiva 7 — Cierre

**En pantalla**

```
WE DON'T DIAGNOSE.
WE GIVE THE CREW BACK
THE ABILITY TO DECIDE.

github.com/Charcraft/NASA-SPACEAPPS
[demo link]

Team ROCKET
```

**Qué digo (20 s)**

> "No diagnosticamos. Le devolvemos a la tripulación la capacidad de decidir.
> El código y los datos están abiertos. Gracias."

---

## Tiempos

| Diapositiva | Tema | Tiempo | Acumulado |
|---|---|---|---|
| 1 | Portada | 0:20 | 0:20 |
| 2 | Problema y usuario | 0:50 | 1:10 |
| 3 | Solución | 1:00 | 2:10 |
| 4 | Datos espaciales | 0:50 | 3:00 |
| 5 | Demostración | 1:00 | 4:00 |
| 6 | Evidencia y limitaciones | 0:45 | 4:45 |
| 7 | Cierre | 0:20 | 5:05 |

**Total: ~5 minutos.** Si el pitch local es de 3 minutos, se recorta la diapositiva 5 a 30 s y la 4 a 30 s.

---

## Cómo se practica

1. **Crazy 8s en una sola idea:** escribe en 8 minutos, en 8 cuadros, ocho formas de explicar AEGIS. Elige la que un desconocido entendería sin contexto.
2. **Método PAS** para la diapositiva 2: **Problema** (no hay médico), **Agitación** (22 minutos de retraso, el compañero se está muriendo), **Solución** (AEGIS decide contigo).
3. **Ensayo cronometrado**, dos veces seguidas, de pie. Si en la segunda tardas más, el problema es el guion, no tú.

---

## Preguntas que van a hacer

| Pregunta | Respuesta corta |
|---|---|
| ¿Esto ya existe? | "NASA tiene los sensores y la telemetría. Lo que sus propios documentos señalan como problema es la presentación: pantallas densas y poco intuitivas. Nosotros hacemos la capa de decisión." |
| ¿De dónde salen los umbrales? | "Del dataset de OSDR, que trae sus rangos, y del marco de riesgos de HRP. Cada uno tiene fuente." |
| ¿Y si el astronauta se equivoca midiendo? | "Cada indicador advierte del error de técnica que da un valor falso, y el semáforo amarillo obliga a repetir la medición." |
| ¿Es un dispositivo médico? | "No, y lo decimos en la app y en el repo. Es una ayuda para decidir y para que el cirujano de vuelo reciba mejor información." |
| ¿Usaron IA? | "Sí, para investigación y documentación, con revisión humana de cada dato. El registro completo es público en el repo." |

---

## Checklist final

- [ ] 7 diapositivas, ni una más
- [ ] Todo en inglés
- [ ] Capturas reales en la diapositiva 5
- [ ] Enlaces funcionando y probados en incógnito
- [ ] Ensayado dos veces, cronometrado
- [ ] Alguien sabe qué decir si falla el proyector (video en el celular)
- [ ] Se dice una limitación en voz alta

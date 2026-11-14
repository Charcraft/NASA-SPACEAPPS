# 03.8 · Preguntas del jurado — documento de estudio

> **Cómo usarlo:** no lo leas entero la noche anterior. Estudia la §1 (lo que hay que saber de memoria), practica las **10 obligatorias** de la §2 en voz alta, y hojea el resto.
> Las respuestas están en español porque el jurado local habla español. Las diez principales tienen versión en inglés para el submission.

---

## 1 · Lo que hay que saber de memoria

### El problema

| Dato | Valor |
|---|---|
| Retraso de comunicación a Marte | **hasta 22 minutos** por sentido |
| Peligros del vuelo espacial (NASA HRP) | **5**: radiación, aislamiento, distancia, gravedad, ambiente cerrado |
| ¿Hay médicos a bordo? | **No**. La tripulación es su propio personal de salud |

### Los datos

| Dato | Valor |
|---|---|
| Dataset | **OSDR OSD-575** — panel metabólico de **Inspiration4** |
| Tripulantes | **4** (anonimizados C001–C004) |
| Puntos temporales | **7**: L-92, L-44, L-3 → R+1, R+45, R+82, R+194 |
| Indicadores en el dataset | **17** |
| ¿De dónde salen los rangos? | **Del propio dataset**, no los inventamos |

**Ejemplo que puedes citar de memoria:** glucosa del tripulante C001 — 69 mg/dL tres días antes del lanzamiento, 90 al día siguiente del regreso, 87 a los 194 días. La referencia del dataset es 65–99.

### El producto

| Dato | Valor |
|---|---|
| Nombre | **AEGIS** |
| Tagline | *Crew health autonomy, offline* |
| Modos | **2**: rutina y emergencia |
| Pasos del flujo | medir → comparar → decidir → actuar → registrar |
| ¿Diagnostica? | **No.** Es una ayuda para decidir |
| ¿Funciona sin internet? | **Sí**, por diseño |

### El evento

| Dato | Valor |
|---|---|
| Envío local | **domingo 15, 17:00** (no 23:59) |
| Demo del submission | **30 segundos** máximo, o **7 diapositivas** |
| Idioma | **Inglés** en todo el submission |
| Criterios de evaluación | **5**: impacto, creatividad, validez, relevancia, presentación |
| Premios globales | **10** |

---

## 2 · Las 10 preguntas obligatorias

Practica estas hasta que salgan sin pensar. Son las que van a hacer.

---

### 1. ¿Qué hace exactamente su proyecto?

> "AEGIS es una aplicación para que un astronauta evalúe su propia salud cuando no hay un médico. Le dice cómo medirse, compara el valor con su propia línea base construida con datos abiertos de NASA, y le da un semáforo con una acción concreta. Si sale rojo, la app cambia a modo emergencia: protocolo paso a paso, con cronómetro y registro automático para el cirujano de vuelo. Todo funciona sin conexión."

**English:** "AEGIS lets an astronaut assess their own health when there is no doctor. It guides the measurement, compares it to the astronaut's own baseline built from NASA open data, and returns a traffic light with a concrete action. If it goes red, the app switches to emergency mode: a step-by-step protocol with a timer and an automatic log for the flight surgeon. It works offline."

---

### 2. ¿De dónde salen sus umbrales? ¿Los inventaron?

> "No. Los rangos de referencia vienen dentro del propio dataset de NASA — el panel metabólico de Inspiration4, que trae mínimo y máximo por cada analito. Y el marco de qué medir viene del Human Research Program de NASA. Cada número en la aplicación se rastrea hasta su fuente en el repositorio. Lo que no pudimos verificar está marcado como supuesto del equipo, y se ve en la interfaz."

**English:** "No. The reference ranges come inside NASA's own dataset — the Inspiration4 metabolic panel includes min and max for every analyte. The framework for what to measure comes from NASA's Human Research Program. Every number in the app traces to a source in the repository. What we could not verify is labelled as a team assumption, and that label is visible in the interface."

---

### 3. ¿En qué se diferencia de lo que NASA ya tiene?

> "NASA ya tiene los sensores y la telemetría. Lo que sus propios documentos señalan como problema es la presentación: pantallas demasiado densas, poco intuitivas y que exigen mucho entrenamiento. Nosotros no competimos con el sistema de vuelo. Hacemos la capa que falta: la interfaz de decisión para alguien que no es médico y que está solo."

**English:** "NASA already has the sensors and the telemetry. What its own documents identify as the problem is the presentation: displays that are too dense, not intuitive, and training-heavy. We don't compete with the flight system. We build the missing layer: a decision interface for someone who is not a clinician and is alone."

> ⚠️ **Nunca digas** "NASA no tiene esto". Sí lo tiene. Lo que falta es la capa de decisión.

---

### 4. ¿Por qué no usaron datos en tiempo real?

> "Porque no existen en abierto. Lo que sí está publicado es el panel metabólico de Inspiration4, con siete mediciones desde 92 días antes del lanzamiento hasta 194 días después. Con eso construimos el concepto de línea base personal, que es lo que queríamos demostrar. Los signos vitales continuos los daría el hardware de la nave en una misión real."

---

### 5. ¿Esto es un dispositivo médico? ¿Tiene validación clínica?

> "No es un dispositivo médico y no tiene validación clínica. Lo decimos en la aplicación, en el README y en el video. Construimos una ayuda para decidir: no diagnostica y no receta. La validación clínica sería el siguiente paso, con un cirujano de vuelo y un protocolo de estudio."

**English:** "It is not a medical device and it is not clinically validated. We say so in the app, in the README and in the video. We built a decision aid: it does not diagnose and does not prescribe. Clinical validation would be the next step, with a flight surgeon and a study protocol."

---

### 6. ¿Cómo garantizan que la app funcione sin internet?

> "Todos los datos vive en el dispositivo, en IndexedDB. No hay backend por diseño. La verificación es simple y contundente: apagamos el WiFi y recorremos el flujo completo en la demo."

---

### 7. ¿Usaron inteligencia artificial? ¿Para qué?

> "Sí, para investigación, documentación y algo de código, siempre con revisión humana. Cada uso relevante está registrado con fecha, propósito y método de validación en un archivo público del repositorio. No usamos IA para generar imágenes ni video del producto. Y no la usamos para inventar umbrales clínicos: ningún valor entró sin fuente."

**English:** "Yes, for research, documentation and some code, always with human review. Every relevant use is logged with date, purpose and validation method in a public file in the repository. We did not use AI to generate the product images or video. And we did not use it to invent clinical thresholds: no value entered without a source."

---

### 8. ¿Qué pasa si el astronauta mide mal?

> "Cada indicador advierte del error de técnica que produce un valor falso — por ejemplo, no fijarse en microgravedad al tomarse la presión. Y el semáforo amarillo obliga a repetir la medición antes de escalar. El sistema está diseñado para no reaccionar a una sola lectura rara."

---

### 9. ¿Cuál es el impacto real?

> "En el escenario del reto: un compañero colapsa a mitad de camino a Marte y no hay nadie al otro lado de la línea. AEGIS convierte eso en una lista de pasos. Fuera del espacio, el mismo diseño sirve para clínicas remotas sin conectividad: comunidades rurales, barcos, zonas de desastre. El reto mismo lo menciona."

**English:** "In the challenge scenario: a crewmate collapses halfway to Mars and there is nobody on the other end of the line. AEGIS turns that into a list of steps. Beyond space, the same design serves remote clinics without connectivity: rural communities, ships, disaster zones. The challenge itself points at this."

---

### 10. ¿Qué no alcanzaron a hacer?

> "Tres cosas. No tenemos signos vitales continuos, porque ese dataset no está abierto. No tenemos validación clínica. Y el motor de reglas cubre ocho indicadores, no los quince que catalogamos. Preferimos entregar ocho bien fundamentados que quince a medias."

---

## 3 · Ciencia y medicina

### ¿Por qué la línea base personal y no rangos poblacionales?

> "Porque en microgravedad la fisiología se desplaza: baja el volumen plasmático, cambia la distribución de fluidos, se pierde masa ósea. Un rango de población sana de la Tierra deja de ser la referencia correcta. Lo que sí sigue siendo válido es cómo se comporta *esa* persona comparada consigo misma."

### ¿Qué son los cinco peligros?

> "Radiación espacial, aislamiento y confinamiento, distancia de la Tierra, campos gravitatorios y ambientes hostiles o cerrados. Es el marco del Human Research Program de NASA. Cada indicador de nuestra app está mapeado a uno de los cinco."

### ¿Qué es el SANS?

> "El síndrome neuro-ocular asociado al vuelo espacial: edema de disco óptico, aplanamiento del globo ocular y cambios refractivos. Es una de las complicaciones más documentadas en misiones largas. Por eso incluimos agudeza visual y síntomas visuales en el catálogo."

### ¿Cómo se toma la presión arterial en microgravedad?

> "Con un manguito automatizado y un punto de anclaje para el brazo. El tripulante no puede sostener el brazo contra la gravedad de forma fiable, así que la técnica importa más que en Tierra. Ese es exactamente el tipo de instrucción que da la app."

### ¿No sería mejor que un médico lo revise todo?

> "En la ISS sí, y de hecho hay cirujanos de vuelo. El problema es la distancia: en Marte el retraso llega a 22 minutos. La app no reemplaza al médico: le manda mejor información y le da a la tripulación algo que hacer mientras espera."

### ¿Qué evidencia hay de que esto funcione?

> "Evidencia de que el problema existe: sí, es el marco de riesgos de NASA. Evidencia de que nuestra solución funciona en vuelo: no la tenemos, y no la vamos a inventar. Tenemos un prototipo que demuestra el flujo completo con datos reales."

---

## 4 · Datos de NASA

### ¿Por qué Inspiration4 y no otra misión?

> "Porque es el conjunto humano más accesible: cuatro tripulantes, siete puntos temporales y paneles clínicos con rangos incluidos. Casi todo lo demás en OSDR son ómicas, que no sirven para una interfaz de signos vitales."

### ¿Cuántos datos son?

> "Cuatro tripulantes por siete mediciones: veintiocho muestras de sangre, con diecisiete analitos cada una. Es pequeño a propósito: alcanza para demostrar el concepto de línea base, y lo decimos como limitación."

### ¿Cómo sabemos que el dataset es real y no lo inventaron?

> "Porque se descarga con un script del repositorio que apunta a la API pública de OSDR. Cualquiera puede correrlo y obtener el mismo archivo. Además cada dato lleva la accesión del estudio: OSD-575."

### ¿Qué otras fuentes usaron?

> "El Human Research Program de NASA para el marco de peligros y riesgos, la Agencia Espacial Canadiense para el tema de radiación, y el repositorio abierto de NASA para los datos. Todo está en la bibliografía con fecha de consulta."

### ¿Y los recursos que publicó el reto?

> "Los revisamos el 13 de noviembre. Son cinco enlaces de documentación: tres de NASA HRP y dos de la CSA. No traen datasets. Por eso fuimos directo a OSDR, porque el criterio de relevancia premia que el dato sea parte real de la solución."

### ¿Qué harían con acceso a datos de telemetría real?

> "Dos cosas: reemplazar la línea base de demostración por la del tripulante real, y añadir los indicadores continuos —frecuencia cardíaca, SpO₂, temperatura— que ahora no tenemos. La arquitectura ya está preparada: el motor de reglas recibe un valor y un baseline, venga de donde venga."

---

## 5 · Técnicas

### ¿Qué stack usaron y por qué?

> "Next.js con TypeScript, Tailwind, Recharts y Dexie sobre IndexedDB. Lo elegimos por una razón: en 30 horas no se aprende nada nuevo. Todo el equipo podía ser productivo desde la primera hora."

### ¿Por qué no hay backend?

> "Porque el astronauta a Marte tampoco tiene backend. El diseño es local-first a propósito: los datos viven en el dispositivo y se sincronizan cuando hay enlace. No es una carencia, es el comportamiento correcto para el contexto."

### ¿Cómo está estructurada la lógica?

> "El motor de triage es una función pura: entran valor, línea base y entorno; salen nivel, razón, acción y fuente. Sin UI y sin red. Eso lo hace testeable y auditable, que es exactamente lo que quieres en algo que toca decisiones de salud."

### ¿Qué pasa si falla la app en medio de una emergencia?

> "Los protocolos están escritos como contenido estático, no dependen de cálculos en vivo. Y toda la aplicación funciona sin red. El modo de fallo más probable es que el dispositivo se apague, no que la lógica falle."

### ¿Es accesible?

> "Está diseñada para el peor contexto: poca luz, pantalla con reflejo, usuario estresado, posible guante. Objetivos táctiles grandes, contraste alto, una acción por pantalla, y el estado nunca se comunica solo con color: siempre color más icono más texto."

### ¿Por qué PWA y no app nativa?

> "Porque el jurado la ve en un navegador y en un video. Una PWA se instala, funciona offline y no requiere tiendas ni compilación por plataforma. Para un prototipo de 30 horas, la relación valor-esfuerzo es la correcta."

---

## 6 · IA

### ¿No es contradictorio usar IA en un proyecto de salud?

> "Sería contradictorio si la IA decidiera algo clínico. No lo hace. La IA nos ayudó a investigar, documentar y escribir código. Las reglas son deterministas y los umbrales tienen fuente. La IA acelera el trabajo, no toma decisiones."

### ¿Cómo sabemos que no alucinaron datos?

> "Porque cada cifra que aparece tiene una fuente en la bibliografía, y las que no pudimos verificar están marcadas como supuesto y se muestran así en la interfaz. Además el registro de uso de IA es público: se puede ver qué se pidió y cómo se validó."

### ¿La app usa IA en tiempo de ejecución?

> "El diseño contempla una capa explicativa opcional, pero con un respaldo determinista en JSON: si no hay red o el modelo falla, la app sigue funcionando con el contenido precalculado. La decisión clínica nunca depende de un modelo."

### ¿Qué reglas se pusieron para la IA?

> "Cinco: no inventar umbrales, no usar IA para concebir la idea, no generar imágenes sin marca de agua, no pegar datos personales en un prompt, y registrar cada uso con su validación. Está escrito y es público."

---

## 7 · Producto y diseño

### ¿Por qué dos modos?

> "Porque son dos situaciones distintas. En rutina el astronauta quiere entender y seguir su tendencia en menos de tres minutos. En emergencia quiere que le digan qué hacer ahora, con letra grande y un paso a la vez. Una sola interfaz no sirve bien para las dos."

### ¿Por qué el mapa corporal si no lo terminaron?

> "Lo catalogamos como deseable, no como imprescindible. El reto lo sugiere, pero no es lo que salva una vida. Preferimos invertir esas horas en el motor de reglas y en el protocolo de emergencia."

### ¿Cómo priorizaron?

> "Con un criterio: ¿esto ayuda a que alguien decida mejor en los primeros diez minutos de una emergencia? Si la respuesta era no, se iba al final. El video y el submission no eran negociables; el mapa corporal sí."

### ¿Qué pasa en la Luna o en Marte, con otra gravedad?

> "El motor recibe el entorno como parámetro, así que un indicador puede tener umbrales distintos en tránsito, en la Luna o en Marte. En esta versión solo tenemos el perfil de tránsito bien definido; el resto está estructurado pero no validado."

---

## 8 · Impacto y futuro

### ¿Cuál sería el siguiente paso?

> "Validarlo con un cirujano de vuelo. Después, conectarlo a telemetría real y ampliar de ocho a quince indicadores. Y antes de todo eso, una prueba de usabilidad con alguien que no sepa medicina, porque ese es el usuario real."

### ¿Se puede comercializar?

> "El caso espacial es institucional, pero el mismo producto sirve para clínicas remotas: zonas rurales, barcos, minería, respuesta a desastres. Ese es el mercado real, y el reto mismo lo menciona."

### ¿Esto solo sirve para astronautas?

> "No. La lógica —medición guiada, línea base personal, semáforo con acción y fuente— es exactamente lo que hace falta en cualquier lugar sin médico a mano. La restricción de diseño que nos impusimos, funcionar sin conexión, es la misma que tiene una clínica rural."

### ¿Qué los hace distintos de otros equipos?

> "Que trajimos datos reales cuando el paquete del reto no traía ninguno. Y que dijimos en voz alta lo que no hicimos. Preferimos un prototipo honesto a una demo que promete más de lo que puede."

---

## 9 · Equipo y proceso

### ¿Cómo se organizaron?

> "Cinco roles con respaldo, cada uno con un archivo de bienvenida que dice qué hace y qué no. Todo el trabajo pasa por el repositorio: issues, pull requests y un tablero. Nadie tiene que preguntar en qué va el proyecto."

### ¿Cómo usaron la IA en equipo?

> "Cada quien con su herramienta y su modelo, pero todos leyendo las mismas reglas del repositorio. Y cada uso relevante registrado en un archivo común. La IA no reemplaza el criterio del equipo: lo acelera."

### ¿Qué fue lo más difícil?

> "Recortar. Teníamos quince indicadores catalogados y entregamos ocho. La decisión de qué sacar fue más dura que la de qué construir."

### ¿Cuánto tiempo llevan?

> "El evento son dos días. La preparación previa fue investigación y decisiones, no código: las reglas del reto no permiten construir antes."

---

## 10 · Preguntas trampa

| Pregunta | Cómo responder |
|---|---|
| **"¿Entonces esto ya existe?"** | "Como sistema de vuelo, sí. Como interfaz de decisión para la tripulación, no." |
| **"¿Por qué debería importarle a alguien en Tierra?"** | "Porque la misma app sirve en una clínica sin internet. El reto lo dice explícitamente." |
| **"¿No es peligroso que un astronauta se autodiagnostique?"** | "Por eso no diagnostica. Da criterio para actuar y empaqueta la información para el médico." |
| **"¿Cuánto costaría?"** | "No lo modelamos. Es software abierto que corre en hardware que la nave ya tiene." |
| **"¿Y si el dato está mal?"** | "El amarillo existe exactamente para eso: repetir antes de escalar." |
| **"¿Esto está terminado?"** | "No. Es un prototipo funcional con un alcance declarado. Y sabemos exactamente qué falta." |

---

## 11 · Si no sabes la respuesta

No improvises. Usa una de estas tres:

1. **"No lo sé, y prefiero no inventarlo."** — seguido de lo que sí sabes.
2. **"No lo medimos. Lo que sí tenemos es…"** — redirige a evidencia real.
3. **"Es una buena pregunta; la anotamos como siguiente paso."** — y que alguien del equipo la apunte de verdad.

> Una respuesta honesta de 10 segundos vale más que una inventada de 30. El jurado evalúa criterio, no memoria.

---

## 12 · Cómo practicar (30 minutos)

| Minuto | Ejercicio |
|---|---|
| 0–10 | Alguien del equipo lee las 10 obligatorias en orden. Tú respondes en voz alta, sin leer. |
| 10–20 | Esas mismas, pero en inglés. Solo las respuestas cortas. |
| 20–25 | El otro elige 5 preguntas al azar del resto del documento. |
| 25–30 | Dos preguntas trampa. El objetivo es no quedarse callado más de 3 segundos. |

**Regla:** si una respuesta pasa de 30 segundos, es demasiado larga. El jurado tiene más preguntas.

---

## 13 · Chuleta de bolsillo

Si solo puedes memorizar cinco líneas, memoriza estas:

```
22 minutos de retraso
5 peligros (HRP)
OSD-575 · Inspiration4 · 4 tripulantes · 7 puntos
"No diagnosticamos: damos criterio"
Funciona sin conexión
```

# 01 · Brief del reto

> Documento de referencia. Todo el proyecto se deriva de aquí.
> **Consultado:** 2026-11-06

---

## 1. Identificación

| Campo | Valor |
|---|---|
| Nombre oficial | Create Health Monitoring Software for Astronauts on Space Missions |
| Autor del reto | **Agencia Espacial Brasileña (AEB)** |
| Presentador en video | Rodrigo Leonardi, presidente interino de la AEB |
| URL | https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/ |
| Video | https://www.youtube.com/watch?v=RERG3gEmdC8 |
| Dificultad declarada | Intermedio / Avanzado |
| Categorías | Human Exploration · Software · Data Visualization · Health |

---

## 2. Formulación del problema

> "Las misiones de larga duración exponen a los astronautas a radiación espacial, aislamiento y confinamiento, gravedad alterada y un ambiente cerrado hostil, lo que puede provocar cambios inmunes, pérdida ósea, eventos cardiovasculares y problemas de salud conductual. En misiones largas, los astronautas asumen gran parte de la responsabilidad de detectar estos cambios en sí mismos. Tu reto es construir un software de monitoreo de salud que reúna indicadores de salud y permita a los astronautas evaluar y actuar sobre el estado de su salud."

### La escena que define el reto (palabras del autor)

> "Imagina que vas a mitad de camino a Marte. De repente tu compañero de tripulación siente un dolor agudo en el pecho y colapsa. ¿Qué está pasando? ¿Se está muriendo? ¿Qué deberías hacer en esta situación?"

Esta escena no es decorativa: es el **caso de uso principal**. El jurado va a evaluar si tu herramienta sirve para eso.

---

## 3. Requisitos explícitos del reto

| # | Requisito | Dónde lo dice |
|---|---|---|
| R1 | Herramienta **visual** | Objetivos |
| R2 | Que el astronauta **se autoevalúe** | Objetivos |
| R3 | Que **provea guía** de tratamiento y mejora | Objetivos |
| R4 | Entrada de datos por cualquier medio (teclado, mouse, **cámara/imagen**) | Objetivos |
| R5 | Cualquier dato vale si representa un indicador (ej. glucosa mg/dL, ecografía) | Objetivos |
| R6 | **Explicar cómo se toma cada medición** | Video |
| R7 | **Explicar por qué importa** | Video |
| R8 | **Decir qué hacer cuando el valor no es normal** | Video |
| R9 | **Recordar** al crew que tome mediciones | Video / Consideraciones |
| R10 | Adaptarse a distintos entornos (nave, estación, rover, base lunar/Marte) | Video / Consideraciones |
| R11 | Indicar **cuándo un resultado amerita atención** del crew o de los cirujanos de vuelo | Objetivos |
| R12 | Indicar **qué acciones previenen** una condición crítica | Objetivos |

### Opcionales que el reto sugiere (y que valen puntos)
- Gamificación para el engagement con tareas de salud.
- Gráficas dinámicas de evolución de indicadores.
- Código de color para interpretar de un vistazo.
- **Figura humana con partes del cuerpo clicables** que muestren función y estado.
- Instrucciones simples porque **los astronautas no son médicos**.

---

## 4. Los cinco peligros (marco oficial de NASA HRP)

1. **Radiación espacial**
2. **Aislamiento y confinamiento**
3. **Distancia de la Tierra**
4. **Campos gravitatorios** (microgravedad, gravedad lunar/marciana, retorno a 1 g)
5. **Ambientes hostiles / cerrados**

Estos cinco se combinan y se potencian entre sí. Toda decisión de producto debe poder rastrearse hasta uno de ellos.

[Fuente: 5 Hazards of Human Spaceflight — NASA HRP — https://www.nasa.gov/hrp/hazards/ — consultado 2026-11-06]

---

## 5. Efectos fisiológicos que el reto nombra explícitamente

- Cambios en el sistema inmune
- Pérdida de densidad ósea
- Eventos cardiovasculares
- Nutrición inadecuada
- Condiciones de salud conductual

Y menciona como indicadores útiles: **presión arterial, frecuencia cardíaca, glucosa en sangre, temperatura corporal, horas de sueño diarias y estado de ánimo**.

---

## 6. Cómo se gana esto

### Los 5 criterios reales de evaluación (1–5 cada uno)

> Fuente: Judging & Awards Guide, publicado 2026-11-13.

| Criterio | Qué premia | Nuestra respuesta |
|---|---|---|
| **Impact** | Resolver un problema significativo, con alcance amplio | Colapso a mitad de camino a Marte + aplicación en Tierra |
| **Creativity** | Originalidad real, no una mejora cosmética | Modo emergencia + línea base personal + offline-first |
| **Validity** | Solidez científica, viabilidad, usabilidad | Umbrales con fuente, motor de reglas auditable, sin red |
| **Relevance** | Alineación con el reto + **integración profunda de datos NASA** | OSDR como fuente real |
| **Presentation** | Claridad, historia, ejecución del demo | Guion de 30 s con la estructura oficial + subtítulos |

### Los 10 premios globales 2026

| Premio | Qué busca |
|---|---|
| Best Use of Science | Mejor y más válido uso del método científico |
| **Best Use of Data** | Hacer accesible el dato espacial o usarlo en una aplicación única |
| Best Use of Technology | Uso más innovador de tecnología |
| **Galactic Impact** | Mayor potencial de mejorar la vida en la Tierra o el universo |
| Best Mission Concept | Concepto y diseño más plausibles |
| Most Inspirational | El que captura el corazón |
| **Best Storytelling** | El que mejor comunica el potencial del dato abierto |
| Global Connection | El que mejor conecta personas a través de la tecnología |
| Art & Technology | Mejor combinación de habilidad técnica y creativa |
| Local Impact | Mayor potencial de impacto en la comunidad local |

> Los premios se asignan **después** de la ronda de finalistas globales, entre los 10 mejores. No se compite "por categoría" desde el inicio: se compite por puntaje en los 5 criterios.

### Entregables que evalúa el jurado
1. Descripción corta del proyecto.
2. **Demo: video de 30 segundos MÁXIMO, o 7 diapositivas.** Excederlo descalifica de la fase global.
3. Página del proyecto (todos los campos).
4. Enlaces públicos sin login.

### Requisito de idioma
**Todo el submission y el material enlazado debe estar en inglés.** El video puede hablarse en español **solo si lleva subtítulos en inglés**. Las diapositivas deben estar en inglés.

### Selección
El Local Event nomina proyectos a la fase global. Global Nominees: 3 de diciembre. Global Finalists: 17 de diciembre. Ganadores: 26 de enero de 2027.

---

## 7. Reglas del evento que condicionan el plan

| Regla | Implicación |
|---|---|
| **No se puede trabajar en el reto antes del hackathon** | La semana previa es solo investigación, diseño y aprendizaje |
| Recursos oficiales del reto salen el **13 de noviembre** | Plan B obligatorio: OSDR / LSDA / HRP desde ya |
| Open source obligatorio | Repo público desde el primer commit |
| Declaración de uso de SI (IA) obligatoria | Bitácora de uso desde el primer prompt |
| Máx. 6 personas (global) / **5 en Tuxtla Gutiérrez** | Equipo cerrado |
| Un equipo = un reto | Ya elegido |
| Registro secundario del Local Event | Formulario: https://forms.gle/JxKT5ivbd28cUN6j6 |

⚠️ **Nota terminológica:** desde la orden ejecutiva del 29 de septiembre de 2026, el término oficial es **"Super Intelligence" (SI)** en lugar de "Artificial Intelligence" (AI). En el submission se usa "SI" para no perder puntos por forma.

---

## 8. Criterios de éxito del equipo

**Mínimo aceptable:** app funcionando offline con 5 indicadores, semáforo clínico, 1 protocolo de emergencia, video de 1 min y repo público.

**Éxito:** lo anterior + mapa corporal + 3 protocolos + datos reales de OSDR + declaración de SI impecable + nominación local.

**Éxito extraordinario:** premio global en Best Use of Data o Galactic Impact.

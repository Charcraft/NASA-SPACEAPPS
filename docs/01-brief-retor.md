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

### Premios globales 2026 (6 categorías)
| Premio | Qué busca |
|---|---|
| Best Use of Hardware | Uso creativo de hardware físico |
| **Best Use of Data** | Uso real, profundo y trazable de datos abiertos de NASA/agencias asociadas |
| Most Inspiring | Historia, impacto humano, capacidad de inspirar |
| **Galactic Impact** | Impacto real y escalable en la exploración espacial |
| Best Mission Concept | Solidez del concepto de misión |
| People's Choice | Voto público |

### Entregables que evalúa el jurado
1. Descripción corta del proyecto.
2. **Video de 1 minuto**.
3. Página del proyecto.
4. **Repositorio público con el código.**

### Selección
El Local Event nomina los mejores proyectos a la fase global. En Tuxtla Gutiérrez hay semifinalistas locales a las **17:30** y pitch de finalistas a las **19:00** del domingo.

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

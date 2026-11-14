# 02.5 · Cómo monitoriza NASA la salud hoy

> **Origen:** investigación aportada por el equipo en `context.md` el **2026-11-13**.
> **Estado de verificación:** las URLs provienen de ese documento y **no se han abierto una por una**.
> Cada dato se marca `[POR VERIFICAR]` hasta que alguien lo confirme contra la fuente.

---

## Por qué este documento importa

Antes de construir una herramienta de salud para astronautas, hay que saber **qué existe ya**. Este documento evita dos errores caros:

1. **Reinventar** algo que NASA ya tiene resuelto.
2. **Afirmar** en el pitch que "nadie ha hecho esto", cuando sí.

Y descubre algo mejor: **NASA documenta un problema de presentación de datos que nosotros estamos resolviendo.** Eso convierte nuestra propuesta en una respuesta a una necesidad reconocida, no en una idea suelta.

---

## 1. Qué monitoriza NASA hoy

| Categoría | Qué se mide |
|---|---|
| **Signos vitales y cardiovascular** | Frecuencia cardíaca, ECG, presión arterial, temperatura corporal estimada, flujo sanguíneo, ritmo cardíaco |
| **Respiración y actividad** | Frecuencia respiratoria, actividad muscular, sueño, movimiento, patrones de ejercicio |
| **Salud ambiental** | CO₂, oxígeno, calidad del aire, agua, radiación, niveles acústicos |
| **Estado del traje en EVA** | Presión total, presión parcial de O₂ y CO₂, oxígeno restante, batería, corriente, voltaje, alertas de subsistemas |
| **Salud a largo plazo** | Cognición, comportamiento, sueño, rendimiento, exposición a radiación |

[Fuente: NASA — Biomedical Flight Controllers — https://www.nasa.gov/directorates/esdmd/hhp/biomedical-flight-controllers/ — aportado 2026-11-13] `[POR VERIFICAR]`

---

## 2. La arquitectura, por capas

No hay un "stack" monolítico. NASA integra sensores, sistemas embebidos, comunicaciones espaciales y software de misión en seis capas.

| Capa | Tecnología | Función |
|---|---|---|
| **Sensado** | Bio-Monitor, AstroSkin, actígrafos de muñeca, electrodos, sensores del traje | ECG, respiración, temperatura, presión, sueño, movimiento |
| **Adquisición y borde** | Dispositivos portátiles, tabletas, registradores | Recoger, almacenar y preprocesar **cerca del astronauta** |
| **Comunicaciones** | Telemetría, downlink, sincronización asíncrona, cifrado | Enviar datos prioritarios cuando hay enlace; **si no, conservarlos a bordo** |
| **Integración y decisión** | Gateways de datos, sistemas de soporte a decisiones clínicas, consolas | Normalizar, generar alertas, distribuir a médicos y *flight surgeons* |
| **Visualización** | Pantallas del traje, HUD, tabletas, consolas de EVA | Mostrar signos vitales, estado del traje y alarmas |
| **Archivo e investigación** | Bases de datos de ciencias de la vida, vigilancia longitudinal | Seguimiento de salud y estudios futuros |

[Fuente: NASA — Biomedical Flight Controllers y OCHMO-TB-044 Medical Operations — aportado 2026-11-13] `[POR VERIFICAR]`

---

## 3. El flujo operativo actual

1. El astronauta se equipa con sensores (por ejemplo, el chaleco y banda frontal **Bio-Monitor**, hasta 48 horas).
2. Los sensores capturan señales continuas mientras trabaja, duerme o hace ejercicio.
3. Los datos **se guardan y procesan a bordo**; el wearable transfiere a una tableta de la estación.
4. Se transmiten por telemetría a Tierra, donde los controladores biomédicos los distribuyen.
5. Médicos y *flight surgeons* vigilan en tiempo real cuando es posible y envían instrucciones.
6. Muestras y datos completos se analizan después del regreso.

---

## 4. Lo que esto valida de nuestro diseño

Esta es la sección que hay que citar en el pitch. Cada hallazgo de NASA respalda una decisión que ya tomamos.

| Hallazgo de NASA | Nuestra decisión | Por qué importa |
|---|---|---|
| **Existe una arquitectura "local-first"** que almacena y analiza datos esenciales en la nave antes de transmitirlos | App **offline-first** con IndexedDB | No es un atajo de hackathon: es cómo opera NASA de verdad |
| **Si no hay enlace, los datos se conservan a bordo** | Cola local + exportación diferida | El *store-and-forward* es el comportamiento correcto, no una limitación |
| Existe una capa de **"sistemas de soporte a decisiones clínicas"** | Motor de triage determinista y auditable | Encajamos exactamente en una capa que ya existe |
| Los **displays actuales pueden ser demasiado densos, poco intuitivos y exigentes en entrenamiento** | Una decisión por pantalla, letra grande, sin jerga | **Resolvemos un problema que NASA documenta explícitamente** |
| NASA desarrolla el **Human Digital Twin Platform (HDTP)**: avatar 3D + monitorización fisiológica continua | Mapa corporal + línea base personal | La dirección del avatar y del gemelo digital es la correcta |
| **Bio-Monitor** registra hasta 48 h continuas | Series longitudinales contra línea base | Los datos largos son el estándar, no la excepción |

> **Frase para el pitch:**
> "NASA ya tiene los sensores y la telemetría. Lo que documenta como problema es la presentación: pantallas demasiado densas, poco intuitivas y que exigen mucho entrenamiento. AEGIS no compite con el sistema de vuelo — le da a la tripulación una capa de decisión legible cuando no hay un médico al lado."

---

## 5. Lo más reciente (2025–2026)

| Novedad | Qué es |
|---|---|
| **Bio-Monitor** | Chaleco + banda frontal; salud cardiovascular y respiratoria hasta 48 h; revisión en tiempo real o tras descarga |
| **Actígrafos de Artemis II** | Registran movimiento y sueño antes, durante y después de la misión |
| **HDTP (Human Digital Twin Platform)** | Biosensores + avatar 3D fotorrealista + monitorización continua de signos vitales, sueño y preparación |
| **Rediseño de telemetría para EVA de Artemis** | Jerarquías de información, esquemas visuales del traje, filtros contextuales, alertas multimodales |

[Fuente: NASA TechPort — HDTP — https://techport.nasa.gov/projects/154412 — aportado 2026-11-13] `[POR VERIFICAR]`
[Fuente: NTRS — Human-Centered Design of Next-Gen Telemetry Displays — https://ntrs.nasa.gov/api/citations/20250011659 — aportado 2026-11-13] `[POR VERIFICAR]`

---

## 6. Qué NO resuelve NASA (y por eso existe nuestro proyecto)

NASA tiene **los datos y la telemetría**. Lo que el reto pide es otra cosa:

| NASA ya lo tiene | El reto pide |
|---|---|
| Sensores y adquisición | Que el **astronauta** interprete su propio estado |
| Consolas para control de misión en Tierra | Guía a bordo, **sin Tierra en tiempo real** |
| Flight surgeons interpretando | Autonomía cuando el retraso es de 22 minutos |
| Telemetría densa | Una decisión clara por pantalla |

Ese hueco — **la interfaz de decisión para quien no es médico** — es exactamente lo que estamos construyendo.

---

## 7. Fuentes nuevas aportadas

Se añaden a `04-bibliografia.md`. Todas `[POR VERIFICAR]` hasta su confirmación:

- NASA — Biomedical Flight Controllers
- NASA — OCHMO-TB-044 Medical Operations
- NASA — Spacesuits Vol. 2 / OCHMO-TB-050
- NASA — Artemis II Human Research
- NASA — Expedition 74 (salud y AI en la estación)
- NASA TechPort 154412 — Human Digital Twin Platform
- NTRS 20190000238 — fisiología en vuelo
- NTRS 20250011659 — Human-Centered Design of Next-Gen Telemetry Displays
- SpaceOps 2025 — *paper* de operaciones (id 0092)

---

## 8. Cómo usar este documento

- **En el pitch:** una sola frase, la de §4.
- **En el README:** la sección *Data* no cambia, pero se puede añadir una línea sobre continuidad con el sistema operativo de NASA.
- **En el formulario:** el campo *Detailed Project Description* puede mencionar que el diseño se alinea con la capa de soporte a decisiones clínicas de NASA.
- **En el video de 30 s:** **no cabe**. El video se queda como está.

> ⚠️ No afirmar en ningún material que "NASA no tiene esto". NASA sí lo tiene. Lo que falta es la capa de decisión para la tripulación. Decirlo mal es el error más fácil de cometer y el más caro ante un jurado que conoce el programa.

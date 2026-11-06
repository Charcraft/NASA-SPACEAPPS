# 02.1 · Los cinco peligros del vuelo espacial

> Base científica del proyecto. Cada indicador de la app debe poder rastrearse hasta uno de estos cinco peligros.
> **Fuente principal:** NASA Human Research Program — *5 Hazards of Human Spaceflight* y páginas de riesgo asociadas.

---

## Por qué este documento existe

El reto pide que el astronauta entienda **por qué** un valor importa. La respuesta nunca es "porque está fuera de rango": es "porque estás expuesto a este peligro, y este peligro produce este efecto, y este indicador lo detecta antes de que sea un problema".

Esa cadena — **peligro → mecanismo → indicador → acción** — es el corazón del producto y de la presentación ante el jurado.

---

## 1. Radiación espacial

### Qué es
Dos componentes principales:
- **Rayos cósmicos galácticos (GCR):** partículas de alta energía, continuas, imposibles de blindar completamente.
- **Eventos de partículas solares (SPE):** erupciones puntuales, peligrosas y poco predecibles.

Fuera de la magnetosfera terrestre la dosis se dispara respecto a la ISS.

### Mecanismos de daño
- Daño directo al ADN y roturas de doble cadena.
- Estrés oxidativo persistente.
- Inflamación crónica de bajo grado.
- Alteración del sistema inmune.

### Riesgos asociados
- Cáncer (riesgo de por vida).
- Enfermedad cardiovascular degenerativa.
- Efectos en el sistema nervioso central (deterioro cognitivo, cambios de comportamiento).
- Cataratas.
- Síndrome agudo de radiación en caso de SPE severo.

### Indicadores que lo detectan
- **Dosis acumulada** (dosímetro personal) — el indicador más directo.
- Biomarcadores de daño oxidativo y de reparación del ADN (no medibles a bordo de forma rutinaria).
- Cambios cognitivos medibles con **pruebas de tiempo de reacción**.

### Acción posible a bordo
- Refugio en zona blindada ante SPE.
- Gestión del *career dose limit*.
- Registro y correlación con síntomas.

> `[POR VALIDAR]` Los límites de dosis de carrera de NASA están en revisión y dependen de edad, sexo y misión. Deben citarse de la fuente primaria antes de mostrarse en la app.

[Fuente: Space Radiation — NASA HRP — https://www.nasa.gov/hrp/hazard-space-radiation/ — consultado 2026-11-06]

---

## 2. Aislamiento y confinamiento

### Qué es
Grupos pequeños, aislados, en un espacio reducido, durante meses o años, con la misma gente y sin poder salir.

### Mecanismos de daño
- Privación sensorial y monotonía.
- Ruptura del ritmo circadiano (en órbita hay 16 amaneceres al día).
- Estrés crónico.
- Conflictos interpersonales y pérdida de cohesión.
- Deterioro de la función cognitiva y de la toma de decisiones.

### Riesgos asociados
- Depresión, ansiedad, trastornos del sueño.
- **"Third quarter phenomenon":** caída de la moral aproximadamente al 60–75 % de la misión.
- Fatiga por *burnout*.
- Errores operacionales por déficit de atención.

### Indicadores que lo detectan
- **Horas y calidad de sueño.**
- **Estado de ánimo autoinformado** (escalas tipo POMS).
- **Tiempo de reacción / atención sostenida.**
- Interacción social registrada (frecuencia de comunicación con la tripulación y con Tierra).

### Acción posible a bordo
- Rutinas estructuradas, light therapy, ejercicio.
- Comunicación programada con familia.
- Ejercicios de cohesión de equipo.

[Fuente: Isolation & Confinement — NASA HRP — https://www.nasa.gov/hrp/hazard-isolation-and-confinement/ — consultado 2026-11-06]

---

## 3. Distancia de la Tierra

### Qué es
En la Luna el retardo de comunicación es de ~1.3 segundos; en Marte puede llegar a **~22 minutos por sentido**. No hay reabastecimiento rápido ni evacuación posible.

### Mecanismos de daño
- Imposibilidad de telemedicina en tiempo real.
- Autonomía médica forzada: la tripulación es su propio personal de salud.
- Caducidad de fármacos y consumibles.
- Retraso en el diagnóstico → progresión de la enfermedad.

### Riesgos asociados
- Fallo en la respuesta a una emergencia médica.
- Tratamiento inadecuado por falta de criterio experto.
- Muerte evitable.

### Indicadores que lo detectan
No es un indicador fisiológico: es una **restricción de diseño**. Determina que la herramienta debe:
- Funcionar sin conexión.
- Contener los protocolos completos a bordo.
- Registrar todo para el reporte diferido al cirujano de vuelo.

### Acción posible a bordo
- Protocolos paso a paso autosuficientes.
- Registro estructurado sincronizable cuando vuelva la conexión.
- Escalada asíncrona: evidencia empaquetada para revisión en Tierra.

[Fuente: Distance from Earth — NASA HRP — https://www.nasa.gov/hrp/hazard-distance-from-earth/ — consultado 2026-11-06]

---

## 4. Campos gravitatorios

### Qué es
Cuatro regímenes distintos en una misma misión: microgravedad en tránsito, gravedad lunar (1/6 g), gravedad marciana (3/8 g) y retorno a 1 g.

### Mecanismos de daño

**Microgravedad (tránsito):**
- Desplazamiento de fluidos hacia la cabeza (~2 L). Rostro congestionado, piernas delgadas.
- Reducción del volumen plasmático (del orden de 10–15 %).
- Pérdida de masa muscular por desuso (aprox. 1–3 % por semana sin contramedidas).
- Pérdida de densidad mineral ósea en huesos de carga: del orden de **1–1.5 % por mes** en columna lumbar y cuello femoral. No se recupera por completo.
- **SANS** (Spaceflight Associated Neuro-ocular Syndrome): edema de disco óptico, aplanamiento del globo ocular, pliegues coroideos y cambio refractivo hacia hipermetropía. Afecta a una fracción grande de la tripulación de misiones largas.
- Desacondicionamiento cardiovascular e **intolerancia ortostática** al regresar.
- Alteración del sistema vestibular (mareo, ilusión de caída).

**Gravedad parcial (Luna/Marte):**
- Carga reducida pero no nula: el ritmo de pérdida ósea y muscular baja, no desaparece.
- Readaptación al cambiar de régimen.

**Retorno a 1 g:**
- Riesgo de síncope, fracturas por fragilidad, dificultad para caminar.

### Indicadores que lo detectan
- **Masa corporal** y composición.
- **Densidad mineral ósea** (DXA, solo pre/post misión).
- **Presión arterial y frecuencia cardíaca en ortostatismo.**
- **Agudeza visual** y reporte de síntomas visuales.
- Fuerza de prensión y pruebas funcionales.
- **Carga de ejercicio** (contramedida y a la vez indicador).

### Acción posible a bordo
- Ejercicio resistido y aeróbico diario (la contramedida principal).
- Ingesta de calcio/vitamina D y nutrición adecuada.
- Protocolos de reacondicionamiento antes del retorno.
- Monitorización visual periódica.

[Fuente: Gravity Fields — NASA HRP — https://www.nasa.gov/hrp/hazard-gravity-fields/ — consultado 2026-11-06]

---

## 5. Ambientes hostiles / cerrados

### Qué es
La nave no es solo un hogar: es una máquina. Temperatura, presión, iluminación, ruido, CO₂, microorganismos y calidad del aire están bajo control artificial y cualquier fallo se propaga.

### Mecanismos de daño
- **CO₂ elevado** respecto a la Tierra: cefalea, irritabilidad, deterioro cognitivo.
- **Ruido continuo** (ventiladores, sistemas): pérdida auditiva, alteración del sueño.
- **Iluminación** inadecuada para el ritmo circadiano.
- Exposición a **microbiota alterada** y reactivación de virus latentes.
- Contaminantes y polvo.
- Riesgo de incendio, fuga o fallo de soporte vital.

### Riesgos asociados
- Cambios en el sistema inmune y mayor susceptibilidad a infecciones.
- Reactivación de virus latentes (Epstein-Barr, citomegalovirus, varicela-zóster).
- Reacciones alérgicas y dermatitis.
- Problemas respiratorios.
- Pérdida de audición.

### Indicadores que lo detectan
- **Temperatura corporal** y síntomas autoinformados.
- **Lesiones y erupciones cutáneas** (entrada por cámara/imagen — el reto lo permite explícitamente).
- **Saturación de oxígeno (SpO₂)**.
- Calidad del aire y CO₂ del habitáculo (dato de telemetría del entorno).
- Frecuencia de síntomas respiratorios.

### Acción posible a bordo
- Ventilación y filtros.
- Protección auditiva.
- Higiene y protocolos antimicrobianos.
- Aislamiento del tripulante enfermo.

[Fuente: Hostile/Closed Environments — NASA HRP — https://www.nasa.gov/hrp/hazard-hostile-closed-environments/ — consultado 2026-11-06]

---

## Tabla de trazabilidad: peligro → indicador → protocolo

| Peligro | Indicador principal | Protocolo de emergencia relacionado |
|---|---|---|
| Radiación | Dosis acumulada, tiempo de reacción | Refugio ante SPE |
| Aislamiento | Sueño, ánimo, atención | Intervención conductual |
| Distancia de la Tierra | (restricción de diseño) | Todos los protocolos autosuficientes |
| Gravedad | PA/FC ortostática, visión, masa | Síncope / intolerancia ortostática |
| Ambiente cerrado | Temperatura, SpO₂, piel | Hipoxia, anafilaxia, infección |

> Esta tabla es el argumento central de la presentación: **no elegimos indicadores al azar, los derivamos del marco oficial de NASA**.

---

## Referencias

- NASA HRP — 5 Hazards: https://www.nasa.gov/hrp/hazards/
- NASA HRP — Risks: https://www.nasa.gov/hrp/risks/
- NASA HRP — The Human Body in Space: https://www.nasa.gov/humans-in-space/the-human-body-in-space/
- Todos los datos numéricos de este documento están marcados para validación con fuente primaria antes de mostrarse en la app.

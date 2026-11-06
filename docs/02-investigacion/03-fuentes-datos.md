# 02.3 · Fuentes de datos disponibles

> El reto pide usar datos abiertos de NASA. El premio **Best Use of Data** se decide aquí.
> **Estado:** reconocimiento inicial hecho; los endpoints exactos se confirman el 2026-11-07.

---

## 1. Mapa de fuentes

| Fuente | Tipo | Qué contiene | Acceso | Uso en el proyecto |
|---|---|---|---|---|
| **OSDR** (Open Science Data Repository) | Repositorio de datos | Ómicas, fisiológicos, fenotípicos, conductuales, imágenes, telemetría ambiental. +455 estudios. Incluye GeneLab + ALSDA + colecciones biológicas | Web + S3 público + API | **Fuente principal** para datos reales de la demo |
| **NLSP** (NASA Life Sciences Portal) | Portal | Punto único a LSDA, LSAH y repositorio de investigación humana | Web | Descubrimiento y contexto |
| **LSDA** (Life Sciences Data Archive) | Archivo | Datos de investigación humana desidentificados, vuelo y análogos, desde 1961 | Web, con solicitud para algunos conjuntos | Rangos de referencia reales |
| **LSAH** (Lifetime Surveillance of Astronaut Health) | Programa | Datos de vigilancia médica de astronautas | Web | Contexto de riesgos a largo plazo |
| **data.nasa.gov** | Catálogo | **No aloja datos**: describe datasets y enlaza al repositorio real | Web | Descubrimiento |
| **NASA HRP** | Documentación | Marco científico: hazards, risks, contramedidas | Web | Justificación de cada indicador |
| **OSDR en AWS** | Bucket S3 | `s3://nasa-osdr`, región `us-west-2`, acceso sin cuenta | `aws s3 ls --no-sign-request` | Descarga masiva si hace falta |

[Fuente: NASA OSDR — https://science.nasa.gov/biological-physical/data/osdr — consultado 2026-11-06]
[Fuente: NASA Life Sciences Portal — https://www.nasa.gov/hrp/nlsp/ — consultado 2026-11-06]
[Fuente: Registry of Open Data on AWS — https://registry.opendata.aws/nasa-osdr — consultado 2026-11-06]

---

## 2. OSDR en detalle

### Qué lo hace valioso para este reto
1. **Datos humanos reales de vuelo**, no simulaciones.
2. **Inspiration4**: ~12 datasets de cuatro astronautas civiles, incluyendo paneles metabólicos completos, paneles de citoquinas, proteómica y secuenciación. Es el conjunto humano más accesible y reciente.
3. **Estudios de análogos** (cama inclinada, aislamiento, HERO/HERA) que reproducen parcialmente los efectos del vuelo.
4. **Metadata abierta incluso para datasets médicos privados** — permite citar sin exponer datos sensibles.
5. Estructura **FAIR** pensada para reutilización por IA/ML.

### Cómo se accede
- **Web:** búsqueda por tipo de ensayo, organismo, misión.
- **S3:** `aws s3 ls --no-sign-request s3://nasa-osdr/` (sin cuenta de AWS).
- **API programática:** OSDR expone acceso vía GLOpenAPI. `[POR VERIFICAR: endpoint exacto y límites de tasa]`

### Qué se va a extraer para el proyecto
Objetivo mínimo: **3 datasets** que permitan mostrar una serie temporal real en la app.

| Necesidad de la app | Tipo de dato OSDR | Candidato |
|---|---|---|
| Serie temporal de un indicador fisiológico | Panel metabólico / clínico | Datasets de Inspiration4 |
| Cambio antes/después del vuelo | Datos longitudinales pre/post | Estudios de misión corta |
| Contexto de riesgo | Metadata de estudio | Cualquier estudio humano con metadatos abiertos |

> `[POR VALIDAR]` Los nombres concretos de los estudios y sus identificadores se documentan en la sesión de reconocimiento del 2026-11-07.

---

## 3. LSDA y LSAH

- **LSDA** es el archivo histórico de investigación humana de NASA. Contiene datos de vuelo y de análogos terrestres.
- **LSAH** es el programa de vigilancia médica a largo plazo de los astronautas: útil para entender consecuencias acumuladas, no para datos en tiempo real.
- El acceso a algunos conjuntos requiere **solicitud formal**. Para el hackathon se usan solo los públicos.

**Uso realista:** consultar y citar, no descargar masivamente. Aportan autoridad a la sección "de dónde salen nuestros rangos".

---

## 4. Lo que probablemente traiga el paquete oficial del reto (2026-11-13)

Basado en el patrón de años anteriores y en lo que el video del reto menciona:

- Enlaces curados a HRP por tema.
- Posiblemente datasets de ejemplo o notebooks.
- Posiblemente recursos de la agencia autora (AEB).

**Plan:** el 13 de noviembre se revisan y se clasifican en `docs/02-investigacion/03-fuentes-datos.md` §5 con fecha. Si contradicen algo de este documento, **manda el recurso oficial** y se actualiza.

---

## 5. Registro de recursos oficiales (se llena el 2026-11-13)

| Recurso | Tipo | Enlace | Utilidad | Decisión |
|---|---|---|---|---|
| _pendiente_ | | | | |

---

## 6. Estrategia de datos para el jurado

El jurado de **Best Use of Data** no premia "usé un CSV". Premia:

1. **Que el dato sea real y trazable** → cada número en la app enlaza a su dataset de origen.
2. **Que el dato cambie una decisión** → el dataset no decora: define los umbrales o la línea base.
3. **Que el uso sea reproducible** → script en el repo que descarga y normaliza el dataset.
4. **Que se reconozcan las limitaciones** → decir en el README qué no se pudo obtener y por qué.

### Frase para el video
> "Nuestros umbrales y nuestras líneas base no los inventamos: salen de datos fisiológicos de vuelo publicados en el repositorio abierto de NASA, y cada número en pantalla se puede rastrear hasta su estudio de origen."

---

## 7. Riesgos de datos

| Riesgo | Mitigación |
|---|---|
| OSDR no expone una serie temporal limpia y usable en 30 h | Usar el dataset solo para la línea base + curar a mano 1 serie corta |
| Los datos requieren solicitud | Citar como referencia, no usar en la demo |
| El formato es demasiado complejo (ómica) | Elegir paneles clínicos, no secuenciación |
| Se descubre el 13 que el paquete oficial es distinto | Ya está previsto: el 13 se ajusta el plan, no se empieza de cero |
| Sin internet en el venue | Descargar y normalizar **antes** del 14; el repo lleva los JSON seed |

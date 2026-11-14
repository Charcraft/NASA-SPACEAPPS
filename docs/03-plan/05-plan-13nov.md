# 03.5 · Plan del 13 de noviembre (hoy)

> Los recursos oficiales ya están publicados. Este documento reemplaza a `01-plan-7-dias.md` § "Viernes 13".
> **Faltan menos de 24 horas para el kickoff.**

---

## 1. Qué cambió con la información nueva

Cinco hallazgos obligan a modificar el plan. Se listan por gravedad.

| # | Hallazgo | Impacto | Acción |
|---|---|---|---|
| **1** | El demo debe ser de **30 segundos**, no 60. Superarlo **descalifica de la fase global**. | 🔴 Crítico | Nuevo guion: `06-demo-30s.md` |
| **2** | Todo el submission debe estar **en inglés**, incluido el material enlazado | 🔴 Crítico | Traducir README y campos del formulario |
| **3** | Son **10 premios globales**, no 6. Y el puntaje real son **5 criterios** de 1 a 5 | 🟠 Alto | Reorientar la narrativa a los 5 criterios |
| **4** | El paquete oficial **no trae datasets**: solo 5 enlaces de documentación | 🟠 Alto | OSDR pasa de plan B a **plan A obligatorio** |
| **5** | Reglas de SI más estrictas: **marca de agua visible** en imágenes/video generados | 🟠 Alto | Actualizar política de IA |

---

## 2. Los recursos oficiales, clasificados

### Lo que publicó NASA (pestaña Resources del reto)

| Recurso | Tipo | Utilidad para nosotros |
|---|---|---|
| [5 Hazards of Human Spaceflight](https://www.nasa.gov/hrp/hazards/) | Documentación | ✅ Ya lo teníamos y es nuestra base |
| [Risks of Human Spaceflight](https://www.nasa.gov/hrp/risks/) | Documentación | ✅ Refuerza la trazabilidad peligro→riesgo |
| [Ongoing HRP Research in Space](https://www.nasa.gov/hrp/ongoing-hrp-research/) | Documentación | 🟡 Útil para citar investigación activa |

### Lo que publicó la CSA (agencia socia)

| Recurso | Tipo | Utilidad |
|---|---|---|
| [Monitoring Radiation for Astronaut Health](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp) | Artículo | ✅ Justifica el indicador de dosis de radiación y da una agencia socia que citar |
| [Why Do We Conduct Science Experiments in Space?](https://www.asc-csa.gc.ca/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp) | Artículo | 🟢 Contexto general |

### La conclusión que cambia la estrategia

**No hay ni un solo dataset en el paquete oficial.**

Eso significa tres cosas:

1. El criterio **Relevance** del jurado premia "NASA data is integral to the project's success". Si solo citamos los tres links de HRP, no estamos integrando datos: estamos citando documentación.
2. **OSDR deja de ser un plan B.** Es la única vía real para que el proyecto tenga datos de NASA de verdad.
3. Es una **ventaja competitiva enorme**: la mayoría de equipos va a usar solo los links oficiales y va a presentar un dashboard sin datos.

**Decisión:** el pipeline de OSDR deja de ser opcional. Ver §4.

---

## 3. Los criterios reales de evaluación

El jurado puntúa **1 a 5** en cinco criterios. Esto reemplaza cualquier suposición anterior sobre "ganar una categoría".

| Criterio | Qué premia | Cómo lo cubrimos |
|---|---|---|
| **Impact** | Resolver un problema significativo, con alcance amplio | El escenario del colapso a mitad de camino a Marte + aplicación en Tierra (comunidades remotas) |
| **Creativity** | Originalidad real, no una mejora cosmética | Modo emergencia + línea base personal + offline-first |
| **Validity** | Solidez científica, viabilidad técnica, usabilidad | Umbrales con fuente, motor de reglas testeable, funciona sin red |
| **Relevance** | Alineación con el reto + **integración profunda de datos NASA** | OSDR como fuente real, no como adorno |
| **Presentation** | Claridad, historia, ejecución del demo | Guion de 30 s con estructura oficial + subtítulos en inglés |

> **Nota del propio guide:** "los equipos suelen cuidar los primeros cuatro criterios y descuidar Presentation". Es exactamente donde se gana o se pierde.

---

## 4. Nuevo plan de datos (sin datasets oficiales)

### Objetivo mínimo
Tener **1 dataset real de OSDR** descargado, normalizado y visible en la app antes de las 18:00 del sábado.

### Ruta
1. Entrar a OSDR y buscar estudios humanos con datos **clínicos o fisiológicos**.
2. Preferir paneles metabólicos de **Inspiration4**: son los más accesibles y recientes.
3. Descargar, limpiar y convertir a JSON.
4. Guardar el script de descarga en `scripts/fetch-osdr.sh` para que sea reproducible.
5. Documentar en `docs/02-investigacion/03-fuentes-datos.md` §5.

### Si OSDR falla
Plan C: usar los **rangos de referencia fisiológicos** documentados en HRP como "dato derivado de NASA" y decirlo con honestidad en el campo *NASA Data*. No es tan fuerte, pero es verdad.

---

## 5. Qué hacer hoy (checklist por horas)

### Mañana — cumplimiento y contenido

- [ ] **09:00** — Leer `06-demo-30s.md` y aprobar el guion entre los 5.
- [ ] **09:30** — Decidir si el video va en español con subtítulos en inglés (recomendado) o en inglés.
- [ ] **10:00** — Traducir el README a inglés (`README.md` pasa a inglés, `README.es.md` conserva el español).
- [ ] **11:00** — Redactar los campos del formulario en inglés: `docs/08-submission/01-project-page-en.md`.
- [ ] **12:00** — Actualizar la política de IA con las reglas de marca de agua.

### Tarde — datos y ensayo

- [ ] **13:00** — Confirmar el dataset de OSDR. Nombre, enlace y muestra descargada.
- [ ] **14:00** — Ensayo del flujo de trabajo: cada quien crea un issue y un PR pequeño.
- [ ] **15:00** — Repartir los issues del hackathon en el tablero.
- [ ] **16:00** — Revisar que los 5 tengan acceso al repo y al proyecto.
- [ ] **17:00** — Solicitar la clasificación FortiGuard del sitio (si se va a usar Vercel).
- [ ] **18:00** — Congelar `TECH-STACK.md`.
- [ ] **19:00** — Confirmar logística: hora de llegada, qué lleva cada quien.

### Noche — dormir

- [ ] **21:00** — Todo pusheado, todo escrito.
- [ ] **22:00** — Dormir. Mañana es un día de 14 horas.

---

## 6. Estrategia de envío: dos ventanas

El guide global dice que se puede **editar y reenviar** hasta el fin del hackathon, y que **solo cuenta la última versión guardada**.

| Ventana | Hora | Qué se envía |
|---|---|---|
| **Envío 1 — para el pitch local** | Dom 16:30 | Todo completo y funcional. Es lo que ven los jueces locales a las 17:30 |
| **Envío 2 — mejora opcional** | Dom 21:00–23:00 | Correcciones del README, video mejor, campos pulidos. Solo si no hay riesgo |

**Regla:** el envío 2 nunca puede empeorar el envío 1. Si hay duda, no se toca.

> El cronograma del Local Event fija el envío a las **17:00**. El sitio permite hasta las 23:59. Se cumple el local (17:00) y se usa la ventana extra solo como mejora.

---

## 7. Lo que se descarta hoy

Para llegar a mañana con foco, se descarta formalmente:

| Se descarta | Motivo |
|---|---|
| Mapa corporal interactivo como prioridad | Bonito, pero no puntúa en ningún criterio por sí solo |
| Copiloto SI con RAG | Riesgo alto, beneficio marginal en 30 h |
| Gamificación | El reto la sugiere como opcional |
| Gráficas de tendencia complejas | Una serie simple basta para demostrar la línea base |
| Traducir la documentación interna | Solo el material enlazado al submission debe estar en inglés |

**Se conserva por encima de todo:** modo emergencia, semáforo con fuente, offline, datos de OSDR y un demo de 30 segundos impecable.

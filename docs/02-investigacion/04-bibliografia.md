# 02.4 · Bibliografía y fuentes

> Toda afirmación del proyecto debe poder rastrearse hasta aquí.
> **Formato:** `[Fuente: título — organización — URL — consultado YYYY-MM-DD]`

---

## Fuentes primarias — el reto

| # | Fuente | Tipo | Consultado |
|---|---|---|---|
| B01 | Create Health Monitoring Software for Astronauts on Space Missions — NASA Space Apps — https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/ | Enunciado oficial | 2026-11-06 |
| B02 | Video del reto (Rodrigo Leonardi, AEB) — NASA Space Apps — https://www.youtube.com/watch?v=RERG3gEmdC8 | Video oficial (transcripción extraída) | 2026-11-06 |
| B03 | Participant FAQs — NASA Space Apps — https://www.spaceappschallenge.org/resources/participant-faqs/ | Reglas oficiales | 2026-11-06 |
| B04 | 2026 Challenges — NASA Space Apps — https://www.spaceappschallenge.org/2026/challenges/ | Lista de retos | 2026-11-06 |
| B05 | Team ROCKET — NASA Space Apps — https://www.spaceappschallenge.org/2026/find-a-team/team-rocket13/ | Página del equipo | 2026-11-06 |
| B06 | Local Event Tuxtla Gutiérrez — NASA Space Apps — https://www.spaceappschallenge.org/2026/local-events/tuxtla-gutierrez/ | Página del evento local | 2026-11-06 |
| B07 | Discussion #1772: Health Monitoring Software Resources availability — nasa/spaceapps — https://github.com/nasa/spaceapps/discussions/1772 | Foro oficial | 2026-11-06 |

---

## Fuentes primarias — ciencia

| # | Fuente | Tipo | Consultado |
|---|---|---|---|
| B10 | 5 Hazards of Human Spaceflight — NASA HRP — https://www.nasa.gov/hrp/hazards/ | Marco oficial | 2026-11-06 |
| B11 | Human Research Program (home) — NASA — https://www.nasa.gov/hrp/ | Programa | 2026-11-06 |
| B12 | Space Radiation (hazard) — NASA HRP — https://www.nasa.gov/hrp/hazard-space-radiation/ | Peligro 1 | 2026-11-06 |
| B13 | Isolation & Confinement (hazard) — NASA HRP — https://www.nasa.gov/hrp/hazard-isolation-and-confinement/ | Peligro 2 | 2026-11-06 |
| B14 | Distance from Earth (hazard) — NASA HRP — https://www.nasa.gov/hrp/hazard-distance-from-earth/ | Peligro 3 | 2026-11-06 |
| B15 | Gravity Fields (hazard) — NASA HRP — https://www.nasa.gov/hrp/hazard-gravity-fields/ | Peligro 4 | 2026-11-06 |
| B16 | Hostile/Closed Environments (hazard) — NASA HRP — https://www.nasa.gov/hrp/hazard-hostile-closed-environments/ | Peligro 5 | 2026-11-06 |
| B17 | Risks of Human Spaceflight — NASA HRP — https://www.nasa.gov/hrp/risks/ | Catálogo de riesgos | 2026-11-06 |
| B18 | The Human Body in Space — NASA — https://www.nasa.gov/humans-in-space/the-human-body-in-space/ | Divulgación científica oficial | 2026-11-06 |

---

## Fuentes primarias — datos

| # | Fuente | Tipo | Consultado |
|---|---|---|---|
| B20 | NASA Open Science Data Repository (OSDR) — NASA Science — https://science.nasa.gov/biological-physical/data/osdr | Repositorio | 2026-11-06 |
| B21 | NASA Life Sciences Portal (NLSP) — NASA HRP — https://www.nasa.gov/hrp/nlsp/ | Portal | 2026-11-06 |
| B22 | OSDR en Registry of Open Data on AWS — https://registry.opendata.aws/nasa-osdr | Acceso S3 | 2026-11-06 |
| B23 | NASA Open Data Portal — https://data.nasa.gov/ | Catálogo | 2026-11-06 |
| B24 | The NASA Open Science Data Repository: Biomedical FAIR Data… — NTRS — https://ntrs.nasa.gov/citations/20230014168 | Documento técnico | 2026-11-06 |
| B25 | Inspiration4 data access through the NASA OSDR — PMC — https://pmc.ncbi.nlm.nih.gov/articles/PMC11094041 | Artículo | 2026-11-06 |

---

## Fuentes secundarias (contexto, no autoridad)

| # | Fuente | Nota |
|---|---|---|
| B30 | NASA Welcomes All Ages, Experience Levels for Space Apps Challenge — NASA Science — https://science.nasa.gov/universe/nasa-welcomes-all-ages-experience-levels-for-space-apps-challenge | Divulgación oficial del evento |
| B31 | Judging — Space Apps SF Chapter — https://spaceappssf.weebly.com/judging.html | Categorías de premiación (fuente no oficial, coincide con la oficial) |
| B32 | NASA International Space Apps Challenge — Wikipedia | Solo para contexto histórico |

---

## Fuentes pendientes de obtener

| # | Qué falta | Dónde buscarlo | Bloquea a |
|---|---|---|---|
| P01 | Límites de dosis de radiación de carrera | NASA HRP / Space Radiation | Indicador #11 |
| P02 | Valores fisiológicos de referencia en vuelo (PA, FC, SpO₂) | LSDA / literatura HRP | Indicadores #1–#5 |
| P03 | Prevalencia y criterios de SANS | HRP / literatura | Indicador #12 |
| P04 | Escala de ánimo validada para contexto no clínico | Literatura POMS / adaptaciones | Indicador #8 |
| P05 | Recursos oficiales del reto | Se publican 2026-11-13 | Plan de datos completo |
| P06 | Endpoint exacto y límites de la API de OSDR | Documentación OSDR | Pipeline de datos |

---

## Cómo se cita dentro del código

Cada indicador en la app incluye un campo `fuente`. Reglas:

```ts
// Correcto
fuente: "NASA HRP — Gravity Fields (https://www.nasa.gov/hrp/hazard-gravity-fields/)"

// Incorrecto
fuente: "NASA"                      // demasiado vago
fuente: ""                          // nunca
fuente: "según estudios"            // nunca
```

Si el valor es un supuesto del equipo, el campo dice:

```ts
fuente: "[SUPUESTO DEL EQUIPO] Umbral derivado de práctica clínica estándar; pendiente de validación con fuente primaria."
```

Y se muestra en la UI con una etiqueta distinta. **La honestidad se ve en la interfaz, no solo en el README.**

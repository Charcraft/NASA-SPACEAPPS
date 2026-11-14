# AEGIS — Autonomía de salud de tripulación

**Herramienta de monitoreo de salud para astronautas en misiones espaciales de larga duración.** Construida para el [NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/) por el equipo ROCKET, Tuxtla Gutiérrez, México.

> **Estado:** en desarrollo durante el hackathon (14–15 de noviembre de 2026).
> Este repositorio contiene la investigación, las decisiones de diseño y el registro del submission.

*Read this in [English](README.md).*

---

## El problema

A mitad de camino a Marte, un compañero de tripulación colapsa con dolor en el pecho. No hay médico a bordo, y el mensaje a la Tierra tarda hasta 22 minutos en llegar.

El Human Research Program de NASA enmarca el riesgo en cinco peligros: radiación espacial, aislamiento y confinamiento, distancia de la Tierra, campos gravitatorios, y ambientes hostiles o cerrados. En misiones largas, los astronautas asumen gran parte de la responsabilidad de detectar cambios en sí mismos — y no son médicos.

## Qué hace AEGIS

Convierte una pregunta abierta — *"algo se siente mal"* — en una decisión sobre la que la tripulación puede actuar.

Para cada indicador responde tres preguntas en lenguaje llano:

1. **¿Cómo lo mido?** Un procedimiento corto escrito para alguien sin formación médica, incluyendo los errores que producen una lectura falsa en microgravedad.
2. **¿Por qué importa?** El peligro al que se asocia y qué podría significar un valor anormal.
3. **¿Qué hago ahora?** Un nivel de triage, una acción concreta y la fuente del umbral.

Dos modos:

- **Rutina** — mediciones guiadas, tendencias contra la línea base personal y recordatorios de la rutina de misión.
- **Emergencia** — la interfaz se convierte en un protocolo paso a paso, con cronómetro y registro automático para el cirujano de vuelo.

## Cómo funciona

```
medir  →  comparar con la línea base personal  →  semáforo  →  actuar  →  registrar
```

1. **Medición guiada** — cada indicador tiene procedimiento y advertencia de error de técnica.
2. **Línea base personal** — se compara contra el historial del propio astronauta, la única referencia que sigue siendo válida cuando la fisiología se desplaza en microgravedad.
3. **Triage de semáforo** — una función pura, determinista y con tests, devuelve nivel, razón, acción y fuente. Es auditable.
4. **Escalada** — verde: continuar. Amarillo: repetir, registrar contexto, avisar al Crew Medical Officer. Rojo: activar protocolo y empaquetar el evento para el cirujano de vuelo.
5. **Offline-first** — todos los datos se guardan localmente. La aplicación funciona con la red desactivada.

## Datos

Los recursos publicados por NASA el 13 de noviembre son solo documentación: no incluyen datasets. Por eso AEGIS toma datos reales de vuelo directamente:

| Fuente | Uso |
|---|---|
| [NASA HRP — 5 Hazards](https://www.nasa.gov/hrp/hazards/) | Marco: cada indicador mapea a un peligro |
| [NASA HRP — Risks](https://www.nasa.gov/hrp/risks/) | Peligro → riesgo → criterio de escalada |
| [NASA HRP — Ongoing Research](https://www.nasa.gov/hrp/ongoing-hrp-research/) | Contramedidas del modo rutina |
| [NASA OSDR](https://science.nasa.gov/biological-physical/data/osdr) | Líneas base fisiológicas y series longitudinales |
| [CSA — Monitoring Radiation for Astronaut Health](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp) | Indicador de dosis acumulada |

Cada umbral clínico está citado con fuente y fecha de consulta en [`docs/02-investigacion/04-bibliografia.md`](docs/02-investigacion/04-bibliografia.md).

## Tecnología

Next.js 15 · TypeScript · Tailwind CSS · Recharts · Dexie (IndexedDB) · Zustand · desplegado en Vercel.

Sin backend por diseño: los datos viven en el dispositivo.

Justificación completa y lista explícita de lo que **no** usamos: [`TECH-STACK.md`](TECH-STACK.md).

## Cómo ejecutarlo

```bash
pnpm install
pnpm dev
```

> La aplicación está en construcción durante el hackathon. Esta sección se actualiza en cuanto haya un build desplegable.

## Lo que AEGIS no hace

- No diagnostica.
- No prescribe medicamentos ni dosis.
- No sustituye al cirujano de vuelo.
- No es un dispositivo médico.

Le da a la tripulación las dos cosas que realmente le faltan: una forma estructurada de medir y una forma defendible de decidir.

## Uso de inteligencia artificial

Se usaron herramientas de IA y todo lo que produjeron fue revisado por una persona del equipo. El registro completo — qué se usó, para qué y cómo se validó — es público en [`docs/05-ia/`](docs/05-ia/).

No se usa ninguna imagen ni video generado por IA en el demo del proyecto.

## Cómo trabaja el equipo

Cinco personas, cinco máquinas, una sola fuente de verdad. Orca es local y de un solo usuario, así que la colaboración ocurre en Git: issues, pull requests y un tablero de proyecto. Ver [`docs/07-trabajo-colaborativo/`](docs/07-trabajo-colaborativo/).

## Mapa del repositorio

| Ruta | Contenido |
|---|---|
| [`docs/00-INDEX.md`](docs/00-INDEX.md) | Mapa de toda la documentación |
| [`docs/01-brief-retor.md`](docs/01-brief-retor.md) | El reto, desglosado |
| [`docs/02-investigacion/`](docs/02-investigacion/) | Ciencia, indicadores, fuentes de datos, bibliografía |
| [`docs/03-plan/`](docs/03-plan/) | Planes, alcance, riesgos, demo de 30 segundos |
| [`docs/04-equipo/`](docs/04-equipo/) | Equipo, roles, logística del evento |
| [`docs/05-ia/`](docs/05-ia/) | Política de IA, catálogo de prompts, registro de uso |
| [`docs/06-estructura-proyecto.md`](docs/06-estructura-proyecto.md) | Estructura y convenciones |
| [`docs/07-trabajo-colaborativo/`](docs/07-trabajo-colaborativo/) | Cómo trabajan cinco personas a la vez |
| [`docs/08-submission/`](docs/08-submission/) | Contenido enviado en la página del proyecto |

## Equipo

| Nombre | Rol |
|---|---|
| Eduardo Daniel Vázquez Díaz | Team Owner · Product Lead |
| Angel Marco Martínez Cobos | Frontend |
| Carlos De Jesús Martínez Pineda | Datos · Reglas · IA |
| Carlos Alberto Lázaro Aguilar | Plataforma · Offline · QA |
| Ernesto Montes García | Diseño · Video · Narrativa |

Local Event: **Tuxtla Gutiérrez, Chiapas, México** — EcoCity Hotel.

## Licencia

MIT. Ver [`LICENSE`](LICENSE).

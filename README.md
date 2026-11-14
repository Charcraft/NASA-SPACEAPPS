# AEGIS — Crew Health Autonomy

**A health monitoring tool for astronauts on long-duration space missions.** Built for the [NASA Space Apps Challenge 2026](https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/) by Team ROCKET, Tuxtla Gutiérrez, Mexico.

> **Status:** in development during the 2026 hackathon (November 14–15). This repository holds the research, the design decisions and the submission record.

*Read this in [Spanish](README.es.md).*

---

## The problem

Halfway to Mars, a crewmate collapses with chest pain. There is no doctor on board, and the message to Earth takes up to 22 minutes to arrive.

NASA's Human Research Program frames the risk as five hazards: space radiation, isolation and confinement, distance from Earth, gravity fields, and hostile or closed environments. On long missions, astronauts carry much of the responsibility for spotting changes in themselves — and they are not clinicians.

## What AEGIS does

AEGIS turns an open question — *"something feels wrong"* — into a decision a crew can act on.

For every health indicator it answers three questions in plain language:

1. **How do I measure this?** A short procedure written for a non-medical crew member, including the mistakes that produce a false reading in microgravity.
2. **Why does it matter?** The hazard it maps to, and what an abnormal value could mean.
3. **What do I do now?** A triage level, a concrete next action, and the source behind the threshold.

The tool has two modes:

- **Routine** — guided measurements, trends against the astronaut's own baseline, and mission-routine reminders.
- **Emergency** — the interface becomes a step-by-step protocol with a timer and an automatic event log for the flight surgeon.

## How it works

```
measure  →  compare to personal baseline  →  traffic light  →  act  →  log
```

1. **Guided measurement** — every indicator has a procedure and a failure-mode warning.
2. **Personal baseline** — readings are compared against the astronaut's own longitudinal baseline, which is the only reference that stays meaningful when physiology shifts in microgravity.
3. **Traffic-light triage** — a deterministic, unit-tested pure function returns a level, a reason, an action and a source. It can be audited.
4. **Escalation** — green: continue. Yellow: repeat, log context, notify the Crew Medical Officer. Red: activate a protocol and package the event for the flight surgeon on the ground.
5. **Offline-first** — all data is stored locally. The application works with the network disabled, because at 22 light-minutes there is no cloud.

## Data

The challenge resources published by NASA on November 13 are documentation only — no datasets. AEGIS therefore sources real spaceflight data directly:

| Source | Use |
|---|---|
| [NASA Human Research Program — 5 Hazards](https://www.nasa.gov/hrp/hazards/) | Framework: every indicator maps to a hazard |
| [NASA Human Research Program — Risks](https://www.nasa.gov/hrp/risks/) | Hazard → risk → escalation criteria |
| [NASA HRP — Ongoing Research in Space](https://www.nasa.gov/hrp/ongoing-hrp-research/) | Countermeasures recommended in routine mode |
| [NASA Open Science Data Repository (OSDR)](https://science.nasa.gov/biological-physical/data/osdr) | Physiological baselines and longitudinal series |
| [CSA — Monitoring Radiation for Astronaut Health](https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp) | Cumulative radiation dose indicator |

Every clinical threshold is cited with its source and consultation date in [`docs/02-investigacion/04-bibliografia.md`](docs/02-investigacion/04-bibliografia.md).

## Technology

Next.js 15 · TypeScript · Tailwind CSS · Recharts · Dexie (IndexedDB) · Zustand · deployed on Vercel.

No backend by design: the data lives on the device.

Full rationale and the explicit list of what we do **not** use: [`TECH-STACK.md`](TECH-STACK.md).

## Running it

```bash
pnpm install
pnpm dev
```

> The application is under active construction during the hackathon. This section is updated as soon as the first build is deployable.

## What AEGIS does not do

- It does not diagnose.
- It does not prescribe medication or doses.
- It does not replace a flight surgeon.
- It is not a medical device.

It gives a crew two things they actually lack: a structured way to measure, and a defensible way to decide.

## Use of Artificial Intelligence

AI tools were used, and everything they produced was reviewed by a team member. The complete log — what was used, for what, and how it was validated — is public in [`docs/05-ia/`](docs/05-ia/).

No AI-generated image or video is used in the project demo.

## How the team works

Five people, five machines, one source of truth. Orca runs locally and is single-user, so collaboration happens through Git: issues, pull requests and a project board. See [`docs/07-trabajo-colaborativo/`](docs/07-trabajo-colaborativo/).

## Repository map

| Path | Contents |
|---|---|
| [`docs/00-INDEX.md`](docs/00-INDEX.md) | Map of all documentation |
| [`docs/01-brief-retor.md`](docs/01-brief-retor.md) | The challenge, broken down |
| [`docs/02-investigacion/`](docs/02-investigacion/) | Science, indicators, data sources, bibliography |
| [`docs/03-plan/`](docs/03-plan/) | Execution plans, scope, risks, 30-second demo |
| [`docs/04-equipo/`](docs/04-equipo/) | Team, roles, event logistics |
| [`docs/05-ia/`](docs/05-ia/) | AI policy, prompt catalogue, usage log |
| [`docs/06-estructura-proyecto.md`](docs/06-estructura-proyecto.md) | Repository structure and conventions |
| [`docs/07-trabajo-colaborativo/`](docs/07-trabajo-colaborativo/) | How five people work at once |
| [`docs/08-submission/`](docs/08-submission/) | Submitted project page content |

## Team

| Name | Role |
|---|---|
| Eduardo Daniel Vázquez Díaz | Team Owner · Product Lead |
| Angel Marco Martínez Cobos | Frontend |
| Carlos De Jesús Martínez Pineda | Data · Rules · AI |
| Carlos Alberto Lázaro Aguilar | Platform · Offline · QA |
| Ernesto Montes García | Design · Video · Narrative |

Local Event: **Tuxtla Gutiérrez, Chiapas, Mexico** — EcoCity Hotel.

## License

MIT. See [`LICENSE`](LICENSE).

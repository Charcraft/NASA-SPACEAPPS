# 08.1 · Project Page — campos en inglés

> **Todo el submission va en inglés.** "You must use English language on the project submission page and in any linked materials."
> Este documento se copia y pega en el formulario. Se completa el **domingo 15 a las 15:00**.
> Los marcadores `{{ASÍ}}` se reemplazan antes de pegar.

---

## Project Name

```
AEGIS — Crew Health Autonomy
```

---

## High-Level Project Summary

```
AEGIS is a visual health-monitoring tool that lets astronauts assess their own health on long-duration missions and act on it — including when nobody on Earth can help.

Astronauts on a Mars transit face up to 22 minutes of one-way communication delay. They are not doctors. When a crewmate collapses with chest pain, the crew must decide alone. AEGIS turns that decision into three steps: a guided measurement, a comparison against the astronaut's own physiological baseline built from NASA's open spaceflight data, and a single red-yellow-green call with a concrete next action and a cited source.

The tool has two modes. Routine mode tracks indicators and prompts measurements as part of the mission schedule. Emergency mode converts the screen into a step-by-step protocol with a timer and an automatic event log for the flight surgeon.

It runs fully offline. Because in deep space, there is no cloud.
```

---

## Link to Project Demo

```
{{ENLACE_YOUTUBE_30S}}
```

> Video de 30 segundos, público, sin login. Ver `docs/03-plan/06-demo-30s.md`.

---

## Link to Final Project

```
{{ENLACE_DEL_SITIO_EN_VERCEL}}
```

Respaldo si el sitio falla:

```
https://github.com/Charcraft/NASA-SPACEAPPS
```

---

## Detailed Project Description

```
WHAT IT DOES
AEGIS is a web application for astronaut self-assessment during space missions. It covers fifteen physiological indicators grouped by the five hazards of human spaceflight defined by NASA's Human Research Program: space radiation, isolation and confinement, distance from Earth, gravity fields, and hostile/closed environments.

For every indicator the app shows how to take the measurement in microgravity, why it matters, what the expected range is, and what to do when the value is not normal.

HOW IT WORKS
1. Guided measurement. Each indicator has a short, plain-language procedure written for a non-medical crew member, with the failure modes that produce a false reading.
2. Personal baseline. Instead of comparing against population ranges alone, AEGIS compares each reading against the astronaut's own longitudinal baseline, which is the only reference that remains meaningful when physiology shifts in microgravity.
3. Traffic-light triage. A pure function evaluates value, baseline and environment, and returns a level, a reason, an action and a source. The logic is deterministic and unit-tested, so it can be audited.
4. Escalation. Green means continue. Yellow means repeat the measurement, log context and notify the Crew Medical Officer. Red activates a protocol and packages the event for the flight surgeon on the ground.
5. Emergency protocols. Step-by-step decision trees with a running timer and an automatic log. Chest pain, hypoxia and anaphylaxis are included.
6. Offline-first. The application stores all data locally and works with the network disabled. Nothing depends on a connection that does not exist at 22 light-minutes.

WHY IT MATTERS
The challenge states that on long missions astronauts carry much of the responsibility for spotting changes in themselves. AEGIS does not diagnose and does not replace a flight surgeon. It gives the crew the two things they actually lack: a structured way to measure, and a defensible way to decide.

BENEFITS
- Reduces decision time in an emergency by turning an open question into a checklist.
- Makes every threshold traceable to a published source instead of invented.
- Produces a structured event record that a flight surgeon can review asynchronously.
- Works in a spacecraft, a space station, a rover or a surface base without modification.
- The same design applies to remote clinics on Earth with limited connectivity.

WHAT WE HOPE TO ACHIEVE
A working prototype that demonstrates the full loop — measure, compare, decide, act, log — under realistic constraints, and a transparent account of what is validated and what is not.

TOOLS AND TECHNOLOGIES
{{STACK: Next.js 15, TypeScript, Tailwind CSS, Recharts, Dexie (IndexedDB), Zustand. Deployed on Vercel. No backend: all data is local by design.}}
```

---

## Use of Super Intelligence (SI)

> El formulario lo usa para recolección de datos y **los jueces no lo ven directamente**, pero sí ven las marcas de SI dentro del proyecto. Responder con precisión.

```
Yes, SI tools were used. Everything they produced was reviewed by a team member before reaching the project.

RESEARCH — An AI agent with web search and an automated browser helped locate and cross-check official sources (NASA Human Research Program, the challenge resources, the event rules). Every claim was verified against the original document and recorded with a consultation date in the public repository.

DOCUMENTATION — The research structure, planning documents and the AI-use policy were drafted with agent assistance, starting from the verified sources.

CODE — {{DESCRIBIR: qué partes del código se generaron o revisaron con asistencia y cómo se probaron. Ejemplo: "UI components and unit tests were scaffolded with assistance and then reviewed, run and corrected by the team."}}

DESIGN AND NARRATIVE — {{DESCRIBIR: guion del demo, textos de interfaz. Si el video no contiene imágenes generadas por SI, decirlo.}}

WHAT WAS NOT DELEGATED — The scope of the product, the selection of clinical indicators, the definition of thresholds, and the final review. Every threshold shown in the application traces to a cited source or is explicitly labelled as the team's own assumption.

DISCLOSURE — The complete log of SI use is public in the repository at docs/05-ia/. No SI-generated image or video is used in the project demo without a visible watermark.
```

---

## NASA Data

> "To be eligible for a Global Award, you must use at least one NASA data or resource."

```
1. NASA Human Research Program — 5 Hazards of Human Spaceflight
   https://www.nasa.gov/hrp/hazards/
   Used as the organizing framework: every indicator in the application maps to one of the five hazards.

2. NASA Human Research Program — Risks of Human Spaceflight
   https://www.nasa.gov/hrp/risks/
   Used to trace each hazard to specific physiological risks and to define escalation criteria.

3. NASA Human Research Program — Ongoing HRP Research in Space
   https://www.nasa.gov/hrp/ongoing-hrp-research/
   Used to ground the countermeasures recommended in routine mode.

4. NASA Open Science Data Repository (OSDR)
   {{ENLACE_AL_DATASET}}
   {{DESCRIBIR: qué dataset, qué contiene y para qué se usó — línea base, serie temporal, etc.}}
```

---

## Space Agency Partner Data and Other References

```
SPACE AGENCY PARTNER RESOURCES
- Canadian Space Agency (CSA), "Monitoring Radiation for Astronaut Health"
  https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp
  Informed the radiation indicator and the rationale for cumulative dose tracking.

- Canadian Space Agency (CSA), "Why Do We Conduct Science Experiments in Space?"
  https://www.asc-csa.gc.ca/eng/eng/iss/science/why-do-we-conduct-science-experiments-in-space.asp
  Background on the value of ISS research for human health.

OPEN SOURCE LIBRARIES
- Next.js (MIT), React (MIT), Tailwind CSS (MIT), Recharts (MIT), Dexie.js (Apache-2.0), Zustand (MIT)

ICONS AND ASSETS
- {{LISTAR: Lucide icons (ISC) u otros. Si se usaron imágenes de NASA, indicarlas y confirmar que no incluyen logos ni identificadores de misión.}}

CONTENT
- All clinical reference ranges are cited in docs/02-investigacion/04-bibliografia.md with source and consultation date.
```

---

## Checklist antes de pulsar "Submit for Judging"

- [ ] Todos los campos en **inglés**.
- [ ] Los dos enlaces abren **sin login** en ventana de incógnito.
- [ ] El video dura **30 segundos o menos**.
- [ ] El repositorio está **público**.
- [ ] El campo de Referencias lista **todo** lo externo usado.
- [ ] Se marcaron las dos casillas de términos y originalidad.
- [ ] Se solicitó la clasificación FortiGuard si el sitio tiene dominio propio.
- [ ] Banner de confirmación visible en pantalla.
- [ ] Captura de pantalla del envío guardada en `docs/08-submission/`.

---

## Después del envío

Se puede seguir editando y reenviando hasta el fin del hackathon. **Solo cuenta la última versión guardada.**

Plan: envío 1 el domingo a las 16:30 (para el pitch local). Mejora opcional entre 21:00 y 23:00, sin tocar nada que ya funcione.

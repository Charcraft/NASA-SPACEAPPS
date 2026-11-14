# Bienvenida, Eduardo

> Te saluda **Pineda** (`Cxrlosmp`). Llegaste a tu espacio de trabajo del equipo **ROCKET**.
> **Cualquier duda sobre agentes, skills, MCPs o IA, pregúntame a mí.**

---

## Dónde estás

| Campo | Valor |
|---|---|
| Proyecto | NASA Space Apps Challenge 2026 |
| Reto | *Create Health Monitoring Software for Astronauts on Space Missions* |
| Equipo | ROCKET — 5 integrantes |
| Local Event | Tuxtla Gutiérrez, Chiapas — EcoCity Hotel |
| Producto | **AEGIS** — autonomía de salud de tripulación, offline |
| Entrega local | **domingo 15 de noviembre, 17:00** |
| Repositorio | https://github.com/Charcraft/NASA-SPACEAPPS |

---

## Tu rol

**Product Lead · Pitch · Submission**

Respaldo si faltas: **Carlos De Jesús (Pineda)**

> Este rol es **provisional**. Se confirma cuando respondas el formulario de reparto:
> https://docs.google.com/forms/d/e/1FAIpQLSc9ru484FG9c5DJdTjkiPXC28nuYSz11ugFvlCfJ96gPDGHCA/viewform
> Si tus respuestas dicen otra cosa, se cambia. La motivación pesa más que la nota.

---

## El proyecto en 30 segundos

Un astronauta a mitad de camino a Marte no puede llamar a un médico: la señal tarda hasta 22 minutos. Si un compañero colapsa, la tripulación tiene que decidir sola.

**AEGIS** convierte eso en tres pasos: medición guiada → comparación con la línea base personal (construida con datos abiertos de NASA) → semáforo con una acción concreta y la fuente del umbral.

Tiene dos modos: **rutina** (seguimiento y recordatorios) y **emergencia** (protocolo paso a paso con cronómetro y registro para el cirujano de vuelo).

Funciona **sin conexión**. Y no diagnostica: da criterio.

---

## Cómo trabajamos

1. **Un archivo, un dueño.** Solo escribes en `team/danny1510/`. Los demás archivos se tocan con PR.
2. **Todo pasa por un issue y un PR.** Nadie empuja directo a `main` después del sábado 12:00.
3. **Commit cada hora.** Un portátil que se apaga no se lleva el trabajo.
4. **Append-only** en `MEMORY.md` y en el registro de IA: se añade al final, no se reordena lo ajeno.
5. **El alcance no se cambia solo.** Si crees que algo debe cambiar, se propone y se decide en equipo.

Guía completa: [`docs/07-trabajo-colaborativo/02-flujo-git-y-pr.md`](../../docs/07-trabajo-colaborativo/02-flujo-git-y-pr.md)

---

## Tus primeras tres tareas

1. **Responde el formulario de reparto** (5 minutos) y confirma que los 5 tengan acceso al repo.
2. **Congela el alcance del sábado** a las 12:00: 8 indicadores, 3 protocolos y una lista escrita de lo que **no** se hará.
3. **Prepara el pitch de 3 minutos** y revisa el guion del demo de 30 s en `docs/03-plan/06-demo-30s.md`. Tú eres la cara del equipo el domingo.

---

## Lo que NO te toca

- No escribas código de producto antes del sábado a las 09:00.
- No tomes decisiones clínicas sin pasar por Datos.
- No edites la carpeta de otra persona.
- No dejes el submission para las 16:50 del domingo: el objetivo es enviarlo a las 16:30.

---

## A quién preguntar

| Tema | Persona |
|---|---|
| Agentes, skills, MCPs, IA | **Pineda** — `@cxrlosmp` |
| Git, ramas, conflictos | Carlos Alberto — `@giganroker` |
| Alcance, prioridades, decisiones | Eduardo — `@danny1510` |
| Datos y ciencia | Pineda — `@cxrlosmp` |
| Diseño, video, narrativa | Ernesto — `@ernesto-montes` |

WhatsApp del equipo: **967 135 4853**

---

## Tu entorno

- **Skills:** 24 instaladas en `.opencode/skills`, `.claude/skills` y `.cursor/skills`.
  Catálogo: [`skills/README.md`](../../skills/README.md)
- **Reglas:** [`AGENTS.md`](../../AGENTS.md) — se leen antes de cualquier cosa.
- **Estado del proyecto:** [`MEMORY.md`](../../MEMORY.md)
- **Datos reales:** `src/data/seed/osdr-inspiration4-cmp.json` (panel metabólico de Inspiration4, OSDR OSD-575).
- **Tu perfil:** [`perfil.md`](perfil.md) — complétalo antes del evento.
- **Tu bitácora:** [`bitacora.md`](bitacora.md) — escribe al cerrar cada bloque de trabajo.

### Primer paso técnico

```bash
git checkout main
git pull
git checkout -b docs/danny1510/perfil
# completa perfil.md
git add team/danny1510/perfil.md
git commit -m "docs(team): completa perfil de Eduardo"
git push -u origin docs/danny1510/perfil
gh pr create --fill
```

Ese es tu primer PR. Cuando se mergee, ya estás dentro.

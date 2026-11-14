# Bienvenida, Carlos Alberto

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

**Plataforma · Offline · QA**

Respaldo si faltas: **Angel Marco**

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

1. **Un archivo, un dueño.** Solo escribes en `team/giganroker/`. Los demás archivos se tocan con PR.
2. **Todo pasa por un issue y un PR.** Nadie empuja directo a `main` después del sábado 12:00.
3. **Commit cada hora.** Un portátil que se apaga no se lleva el trabajo.
4. **Append-only** en `MEMORY.md` y en el registro de IA: se añade al final, no se reordena lo ajeno.
5. **El alcance no se cambia solo.** Si crees que algo debe cambiar, se propone y se decide en equipo.

Guía completa: [`docs/07-trabajo-colaborativo/02-flujo-git-y-pr.md`](../../docs/07-trabajo-colaborativo/02-flujo-git-y-pr.md)

---

## Tus primeras tres tareas

1. **Verifica que el repo clone en limpio** en otra carpeta y que `scripts/instalar-todo.ps1` funcione sin errores.
2. **Prepara el deploy en Vercel** (una página vacía es suficiente) y el plan para verificar el modo offline.
3. **Configura la protección de `main`** y el tablero de GitHub Projects con las 5 columnas y las etiquetas.

---

## Lo que NO te toca

- No toques la lógica clínica ni los datos.
- No hagas `push --force` a `main`.
- No agregues servicios que cuesten dinero sin avisar.

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

- **Tu carpeta:** el instalador creó un acceso directo **`NASA-SPACEAPPS`** en tu escritorio, con el icono del proyecto. Ábrelo y estarás en el repo.
- **Tu navegador:** pídele a tu agente que te cree uno propio (`NASA-giganroker`). El de Pineda es personal y no se comparte. Guía: [`docs/10-entorno/05-tu-navegador.md`](../../docs/10-entorno/05-tu-navegador.md)
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
git checkout -b docs/giganroker/perfil
# completa perfil.md
git add team/giganroker/perfil.md
git commit -m "docs(team): completa perfil de Carlos Alberto"
git push -u origin docs/giganroker/perfil
gh pr create --fill
```

Ese es tu primer PR. Cuando se mergee, ya estás dentro.

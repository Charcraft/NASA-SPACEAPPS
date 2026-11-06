# NASA Space Apps Challenge 2026 — Equipo ROCKET

Repositorio de investigación, planificación y desarrollo para el reto **Create Health Monitoring Software for Astronauts on Space Missions** de la NASA Space Apps Challenge 2026.

> **Evento:** 14–15 de noviembre de 2026
> **Local Event:** Tuxtla Gutiérrez, Chiapas, México — EcoCity Hotel
> **Entrega local:** domingo 15 de noviembre, **17:00 h**

---

## Qué es esto

Un astronauta a mitad de camino a Marte no puede llamar a un médico. La luz tarda hasta 22 minutos en llegar a la Tierra. Si un compañero colapsa con dolor en el pecho, la tripulación tiene que saber qué hacer **en ese momento**.

Este proyecto construye la herramienta que les permite hacerlo: evaluación de salud guiada, semáforo clínico con escalada de decisión, y protocolos de emergencia paso a paso — todo funcionando **sin conexión**.

---

## Estructura del repositorio

```
.
├── README.md                  ← estás aquí
├── AGENTS.md                  ← reglas de trabajo para humanos e IA
├── CLAUDE.md                  ← adaptador para Claude Code (apunta a AGENTS.md)
├── MEMORY.md                  ← estado vivo del proyecto
├── TECH-STACK.md              ← stack técnico congelado
├── context.md                 ← enlaces originales del reto
│
├── docs/
│   ├── 00-INDEX.md            ← índice y mapa de la documentación
│   ├── 01-brief-retor.md      ← el reto, desglosado
│   ├── 02-investigacion/      ← base científica y de datos
│   ├── 03-plan/               ← planes de ejecución
│   ├── 04-equipo/             ← equipo, roles y logística
│   ├── 05-ia/                 ← política, prompts y registro de uso de IA
│   ├── 06-estructura-proyecto.md
│   └── 07-trabajo-colaborativo/  ← cómo trabajamos los 5 a la vez
│
├── team/                      ← una carpeta por integrante
│   ├── danny1510/             ← perfil + bitácora
│   ├── angel_marco/
│   ├── cxrlosmp/
│   ├── giganroker/
│   └── ernesto-montes/
│
├── scripts/                   ← setup, worktrees, verificación
└── .github/                   ← plantillas de issue y PR, CODEOWNERS
```

## Cómo trabajamos

No existe una herramienta que permita a 5 personas editar el mismo proyecto en vivo. **Orca es local y de un solo usuario.**

La solución:

| Capa | Herramienta | Para qué |
|---|---|---|
| Verdad compartida | **GitHub** (repo + issues + tablero) | Todos ven el mismo avance |
| Ejecución local | **Orca** | Worktrees y agentes en paralelo en tu máquina |
| Tu asistente | **OpenCode / Claude Code / Codex / Cursor** | Leen `AGENTS.md`, escriben código |

Detalle completo en [`docs/07-trabajo-colaborativo/01-arquitectura-colaboracion.md`](docs/07-trabajo-colaborativo/01-arquitectura-colaboracion.md).

Empieza por **`docs/00-INDEX.md`**.

---

## Estado

| Fase | Estado |
|---|---|
| Investigación del reto | ✅ Completada |
| Definición de alcance | ✅ Completada |
| Investigación de datos | 🟡 En curso |
| Diseño de producto | ⬜ Pendiente |
| Desarrollo | ⬜ Bloqueado hasta el 14 de noviembre (regla oficial) |
| Submission | ⬜ Pendiente |

---

## Reglas rápidas

1. No se escribe código de producto antes del 14 de noviembre.
2. Todo debe ser open source.
3. Toda cifra de salud necesita fuente.
4. Todo uso de IA se registra en `docs/05-ia/03-registro-uso-ia.md`.
5. Nunca se presenta como dispositivo médico.

---

## Enlaces

- Reto oficial: https://www.spaceappschallenge.org/2026/challenges/health-monitoring-software/
- Equipo: https://www.spaceappschallenge.org/2026/find-a-team/team-rocket13/
- NASA Human Research Program: https://www.nasa.gov/hrp/
- NASA Open Science Data Repository: https://science.nasa.gov/biological-physical/data/osdr

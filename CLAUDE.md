# CLAUDE.md

Este proyecto usa un único archivo de reglas para todos los asistentes de IA.

**Lee [`AGENTS.md`](AGENTS.md) antes de hacer cualquier cosa.** Contiene el contexto del proyecto, las reglas de veracidad, las convenciones de documentación y la política de uso de IA.

## Resumen mínimo (si no puedes leer AGENTS.md)

- Proyecto: NASA Space Apps 2026, reto **Health Monitoring Software for Astronauts**. Equipo ROCKET, 5 personas, Local Event Tuxtla Gutiérrez.
- **No se construye código de producto antes del 14 de noviembre** (regla oficial del evento).
- Idioma de la documentación: español.
- **No inventes** umbrales clínicos, cifras, APIs ni citas. Si falta un dato, márcalo `[POR VALIDAR]`.
- Toda cifra de salud necesita fuente en `docs/02-investigacion/04-bibliografia.md`.
- Registra cada uso relevante de IA en `docs/05-ia/03-registro-uso-ia.md`.
- El stack está congelado en `TECH-STACK.md`. No lo cambies sin PR.

## Antes de escribir código

1. Lee `TECH-STACK.md` §3 (arquitectura) y §5 (lo que no se usa).
2. Revisa `docs/03-plan/03-alcance-producto.md` para saber si eso que vas a hacer está en el alcance.
3. Si no está en el alcance, **no lo hagas**: pregunta primero.

## Al terminar

- Declara qué archivos tocaste.
- Di cómo se probó.
- Actualiza la documentación si cambió algo del comportamiento.

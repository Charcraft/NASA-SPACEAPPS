# Instrucciones para GitHub Copilot

Este repositorio tiene un archivo de reglas único: **`AGENTS.md`**. Léelo antes de sugerir código.

## Resumen

- **Proyecto:** NASA Space Apps Challenge 2026, reto *Create Health Monitoring Software for Astronauts on Space Missions*. Equipo ROCKET, 5 personas, Local Event Tuxtla Gutiérrez, México.
- **Entrega:** domingo 15 de noviembre de 2026, **17:00**.
- **Idioma de la documentación:** español.
- **No se escribe código de producto antes del 14 de noviembre** (regla del evento).
- **No inventes umbrales clínicos, cifras ni citas.** Si falta un dato: `[POR VALIDAR]`.
- **Stack congelado** en `TECH-STACK.md`: Next.js 15 + TypeScript + Tailwind + Recharts + Dexie + Zustand. No propongas dependencias nuevas sin justificarlo.
- **Nunca** generes texto que diagnostique, recomiende fármacos o dosis.
- **Nunca** mezcles datos reales (`src/data/seed/`) con datos ficticios (`src/data/mock/`).

## Estilo de código

- TypeScript estricto. Sin `any` implícito.
- Componentes en `PascalCase.tsx`, utilidades en `camelCase.ts`.
- El motor de triage (`src/lib/rules/`) debe ser una **función pura**, sin UI ni red.
- Todo componente nuevo incluye estado vacío y estado de error.
- Comentarios en español cuando expliquen una decisión; en inglés cuando sean nombres técnicos.

## Accesibilidad obligatoria

Contexto de uso: astronauta bajo estrés, poca luz, pantalla con reflejo, posible guante.

- Objetivos táctiles ≥ 48 px.
- Contraste AA mínimo.
- El estado **nunca** se comunica solo con color: siempre color + icono + texto.

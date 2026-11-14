---
name: disenar
description: Use when the user asks to design, redesign, restyle, or iterate on a web or mobile UI (Next.js, React, Tailwind, HTML/CSS), or asks to reproduce, copy, or match a visual reference, screenshot, Dribbble shot, or Figma design. Enforces a render-and-look screenshot loop instead of shipping code blind, and records user corrections into DESIGN.md so the design system learns over time. Trigger keywords include diseño, diseñar, UI, interfaz, landing, pantalla, mockup, maquetar, estilo, tema, colores, tipografía, "como este diseño", "hazlo así", "se parece", "cambia el color", "más moderno", "copia este diseño".
---

# Diseñar con ciclo de render

Diseñar código sin mirar el resultado es adivinar. Este skill obliga a
**renderizar y mirar antes de mostrar nada**.

## Reglas innegociables

1. **`DESIGN.md` es la fuente de verdad.** Se lee al empezar y se escribe al
   terminar. Si un valor existe ahí, se usa; no se inventa uno nuevo en el
   componente.
2. **Nunca entregues código sin haberlo visto renderizado.** Si no hay captura,
   no hay diseño terminado.
3. **Mírate la captura antes de enseñársela al usuario.** Éste es el paso que
   más se salta y el que más valor da. Revisa y corrige tú mismo primero.
4. **Cada corrección del usuario se anota** en la bitácora de `DESIGN.md`.
   Eso es lo que convierte esto en un sistema que aprende en vez de un
   generador que repite los mismos errores.
5. **No inventes decisiones que el usuario debe tomar.** Si la estética cambia
   el resultado por completo, pregunta antes de construir.

## Flujo

### Fase 0 — Contexto

- Lee `DESIGN.md`. Si no existe, créalo desde
  `~/.config/opencode/skills/disenar/templates/DESIGN.md`.
- Mira si el usuario adjuntó una imagen o dio una URL. Si es así, **analízala
  antes de escribir código** y extrae: jerarquía, escala tipográfica, paleta,
  radios, densidad, sombras. Anota los valores medidos, no losCarrier-ga.
- Si `DESIGN.md` tiene la sección "Pendientes de decisión" sin resolver y el
  alcance es serio, pregunta. Si el alcance es exploratory, elige y dilo.

### Fase 1 — Construir

- Reusa `components/ui/*` si existe. No dupliques un componente que ya está.
- Solo tokens de `@theme` para color, radio y sombra. Cero hex sueltos.
- Mobile-first siempre. El base es móvil.
- A11y: foco visible, `aria-label` en iconos sueltos, contraste AA.

### Fase 2 — Ver

```bash
# el dev server debe estar corriendo; si no: npm run dev
python tools/shot.py --url http://localhost:3000 --name <slug> --vp desktop --full
```

Lee la imagen que produce con la herramienta de lectura. Pregúntate:

- ¿La jerarquía es clara o todo compite por atención?
- ¿El espaciado es consistente o hay saltos evidente?
- ¿Se ve cortado, desbordado, o desalineado en este viewport?
- ¿El contraste es suficiente?
- ¿Hay elementos que no aportan?

Itera hasta que la captura te parezca correcta. Solo entonces enséñasela.

Si hay referencia, compara:

```bash
python tools/shot.py --name <slug> --vp desktop --ref ruta/a/referencia.png
```

Imprime un lado a lado y el porcentaje de píxeles distintos. Úsalo para
cuantificar el parecido, no solo para tu ojo.

### Fase 3 — Mostrar y aprender

Muestra la captura. El usuario responde con correcciones. Por cada una:

1. Aplica el cambio.
2. Vuelve a renderizar y a mirar.
3. Añade la fila a la bitácora de `DESIGN.md`:

```
| 1 | 2026-09-28 | Header muy apretado | subí a py-8 y gap-3 | Secciones: py-24 móvil / py-32 desktop, nunca py-16 |
```

La columna "Regla derivada" es lo importante. Si en tres filas sale la misma
regla, súbela a la sección de Anti-patrones o a Tokens. Ese es el aprendizaje.

## Errores frecuentes

| Error | Por qué duele |
|---|---|
| Entregar el código sin captura | El usuario no puede juzgarlo; vuelve un intercambio entero |
| No mirar la propia captura | Entregas errores que habrías visto gratis |
| Cada corrección se aplica y se olvida | A los 3 turnos repites el mismo error |
| Ignorar la referencia y hacer "algo bonito" | El parecido es el requisito, no el gusto |
| Introducir un token nuevo sin registrarlo | `DESIGN.md` deja de reflejar la app |
| Preguntar por cada detalle | Fricción. Pregunta lo que cambia el resultado, no lo demás |

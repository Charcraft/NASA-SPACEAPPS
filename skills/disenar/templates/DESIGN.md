# Sistema de diseño — design-lab

Este archivo es la **fuente de verdad** del diseño. Cualquier valor que yo
escriba en un componente sale de aquí. Si tú me pides un cambio y lo apruebas,
la regla derivada se anota abajo para que no vuelva a preguntarte.

> Estado: **v0 — tokens neutros, pendientes de tu aprobación.**
> Cambia lo que quieras aquí y yo lo aplico en el siguiente render.

---

## 1. Principio rector

Modesto por defecto. Negro/blanco/grís, un solo color de acento, tipografía
sistema. La referencia que me pases manda; esto es solo el punto de partida
neutro para que la primera pantalla no salga con mi gusto inventado.

---

## 2. Tokens

Los tokens viven en `app/globals.css` dentro de `@theme`, no en un config de JS.
Si cambias un token, cambia en toda la app.

### Color

| Token | Uso | Valor |
|---|---|---|
| `--color-bg` | Fondo de página | `#ffffff` |
| `--color-surface` | Cards, paneles | `#fafafa` |
| `--color-fg` | Texto principal | `#0a0a0a` |
| `--color-muted` | Texto secundario | `#737373` |
| `--color-border` | Bordes, separadores | `#e5e5e5` |
| `--color-accent` | Acción primaria | `#171717` (pendiente) |

Regla: **un** color de acento. Si me pides dos, pregúntame cuál manda.
Contraste mínimo AA (4.5:1) para texto normal.

### Tipografía

| Rol | Token | Tamaño / línea |
|---|---|---|
| Display | `--text-display` | `clamp(2.25rem, 5vw, 4rem)` / 1.08 / -0.03em |
| H1 | `--text-h1` | `clamp(2rem, 4vw, 3rem)` / 1.15 / -0.02em |
| H2 | `--text-h2` | `1.5rem` / 1.25 |
| H3 | `--text-h3` | `1.125rem` / 1.4 |
| Body | `text-base` | `1rem` / 1.6 |
| Small | `text-sm` | `0.875rem` / 1.5 |
| Eyebrow | `--text-eyebrow` | `0.75rem` / 1 / `0.08em` uppercase |

Familia: Geist Sans (ya cargada). Solo Geist Mono para código y cifras.
Números tabulares en toda tabla o métrica: `tnum`.

Regla de composición: el display no debe partirse en más de 3 líneas. Si lo
hace, el problema es el ancho de columna, no el tamaño de letra.

### Espacio y forma

- Escala de espaciado: **múltiplos de 4** (Tailwind por defecto). No inventes
  valores intermedios; si falta un espacio, probablemente el layout está mal.
- Contenedor: `max-w-6xl` (72rem), padding lateral `px-6` móvil / `px-8` desktop.
- Radio: `--radius-sm 6px` (inputs, botones), `--radius-md 10px` (cards),
  `--radius-lg 16px` (modales, secciones destacadas). Sin `rounded-full`
  salvo que sea un avatar o un punto.
- Sombra: **una sola**, sutil: `0 1px 3px rgb(0 0 0 / 0.08)`. Si un elemento
  necesita más sombra para verse, el problema es el borde o el color, no la sombra.

### Movimiento

- Duración: `150ms` micro (hover), `250ms` transición de estado.
- Easing: `cubic-bezier(0.2, 0, 0, 1)`.
- Solo `transform` y `opacity`. Nada de animar `width`/`height`.
- Respeta `prefers-reduced-motion`.

---

## 3. Reglas de layout

- Mobile-first. El breakpoint base **es** móvil; los `md:` son la excepción.
- Hero de landing: grid de 2 columnas a partir de `lg`, no columna estrecha
  centrada. Una columna `max-w-2xl` dentro de un contenedor `max-w-6xl` deja
  media pantalla vacía y se lee como error de maquetación, no como minimalismo.
- Grid de 12 columnas en desktop, 8 en tablet, stack en móvil.
- Separación vertical entre secciones (`Section`): `py-16 sm:py-20 md:py-32`.
- Alineación: todo el texto a la izquierda. Centrado solo en hero y estados vacíos.
- Ancho máximo de línea de texto: `65ch`. Nunca un párrafo a 100% de ancho.

---

## 4. Componentes base

Los primitives viven en `components/ui/`. Si no existe, se crea; si existe,
se reusa. No reescribas un componente que ya está a mano.

| Componente | Notas |
|---|---|
| `Button` | Variantes `primary` / `secondary` / `ghost`. `primary` = fondo `--color-accent`, texto invertido. Alto `h-11` en móvil y `sm:h-10` en desktop: el dedo necesita 44px, el puntero no. |
| `Card` | `bg-surface` + borde `--color-border` + `--radius-md`. Padding `p-5 md:p-6`. Sombra solo si flota. |
| `Input` | `h-11 text-base` en móvil, `sm:h-10 sm:text-sm`. Por debajo de 16px, iOS Safari hace zoom al enfocar y descuadra la página. Nunca sin label. |
| `Badge` | `text-xs`, `rounded-sm`, `border`, fondo `surface`. |
| `Section` | Wrapper de sección: `max-w-6xl px-6 py-16 sm:py-20 md:px-8 md:py-32`. |
| `Eyebrow` | `text-eyebrow uppercase` en `text-muted`. Solo para antetítulo de sección. |

Accesibilidad obligatoria, no negociable:
- Foco visible en todo elemento interactivo (`:focus-visible`).
- Iconos solos llevan `aria-label`.
- Contraste AA.
- Orden de tabulación lógico.

---

## 5. Anti-patrones

Lo que **no** quiero ver, aunque sea fácil:

- Gradientes decorativos sin motivo funcional.
- Sombras difusas tipo `shadow-xl` sobre cards.
- Texto centrado en párrafos largos.
- `rounded-full` en botones.
- Iconos genéricos de librería sin personalidad: si usas un icono, que sea
  del set del proyecto.
- Tres o más colores de acento.
- Texto gris sobre blanco sin contraste suficiente.
- Inventar contenido de relleno en inglés tipo "Lorem" — los textos van en
  español y deben sonar a producto real, no a plantilla.

---

## 6. Pendientes de decisión

Esto aún no lo has decidido. Antes de construir en serio, dime:

- [ ] **Estilo visual**: ¿minimalista tipo Linear/Vercel, editorial con serif,
      colorido tipo Stripe, oscuro tipo Linear, o algo propio?
- [ ] **Color de acento**: ¿cuál es la marca?
- [ ] **Tipografía**: ¿Geist está bien o prefieres otra?
- [ ] **Scope real**: ¿esto va a producción o es un laboratorio de prototipos?
- [ ] **Modo oscuro**: ¿lo quieres desde el inicio?

---

## 7. Bitácora — el aprendizaje

Cada vez que me corrijas, añado una fila. Con 5 o 6 filas esto deja de ser
el registro de hoy y pasa a ser el manual. **Esta sección es la que más valor
tiene del archivo.**

| # | Fecha | Pediste | Cambié | Regla derivada |
|---|---|---|---|---|
| — | — | — | — | — |

### Reglas acumuladas

Aún no hay ninguna. Empieza a llenarse con la primera corrección que me hagas.

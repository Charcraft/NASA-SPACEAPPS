# 04.2 · Roles y asignación

> **Estado: DEFINITIVO.** Cerrado el **2026-11-13** con las 5 respuestas del formulario.
> El detalle del cálculo está en [`04-resultados-formulario.md`](04-resultados-formulario.md).

---

## Principio

Con 5 personas y ~30 horas no hay especialistas. La regla:

> **Cada persona tiene un rol primario y un respaldo. Nadie es dueño único de nada crítico.**

---

## Asignación final

| # | Persona | GitHub | Rol primario | Respaldo |
|---|---|---|---|---|
| 1 | **Eduardo** | `@eduardovd2007-sys` | **Product Lead · Video · Submission** | Pineda |
| 2 | **Pineda** | `@Charcraft` | **Frontend Lead · IA** | Eduardo |
| 3 | **Angel Marco** | `@angelcobos380-art` | **Lógica y reglas · Tests** | Pineda |
| 4 | **Carlos Alberto** | `@carlosaalbertolazaro` | **Datos · QA de datos** | Angel Marco |
| 5 | **Ernesto** | `@ErnestoMG01` | **Plataforma · Offline · Build** | Carlos Alberto |

---

## Por qué cada uno

### Eduardo — Product Lead · Video · Submission

- Es el **Team Owner**: solo él puede editar la página del proyecto y enviar el submission.
- **Inglés fluido**: es el único. Todo el submission y los subtítulos del demo pasan por él.
- Tiene **Figma, OBS y React** en su stack declarado.
- Su formulario vino **plano** (2 en todo), así que el rol se asignó por necesidad del proyecto y herramientas, no por puntaje.

**Responsabilidad crítica:** el demo de 30 segundos y el envío a las 16:30 del domingo. Es el 20 % de la nota (Presentation) y el 100 % de la elegibilidad.

### Pineda — Frontend Lead · IA

- **Puntaje más alto del equipo en Frontend (85)** y en Diseño (83).
- Único con **Orca** y con el contexto completo del repo, los datos y la política de IA.
- Nivel de IA 4/4: es quien puede sacarle provecho a los agentes.

**Responsabilidad crítica:** que la app exista y se vea bien. Y que ningún umbral llegue a la pantalla sin fuente.

### Angel Marco — Lógica y reglas · Tests

- **Lógica 61**, su puntaje más alto, y lo puso como su segunda preferencia.
- Declaró saber JavaScript y bases no relacionales.
- **Dijo explícitamente que no le gusta el diseño** — por eso no va a UI.

**Restricción real:** solo **8 horas** el sábado y no tiene datos móviles. Su trabajo debe ser **acotado y verificable**: funciones puras + tests. Nada que dependa de estar disponible todo el día.

### Carlos Alberto — Datos · QA de datos

- **Datos 65**, su puntaje más alto.
- Aporta **terminal, comandos y Linux**: ideal para validar datasets y scripts.
- Dijo no querer video, ni hablar inglés, ni programación muy compleja en lenguajes que no domina.

**Ventaja:** declaró **la mayor disponibilidad del equipo**. Puede cubrir validación de datos y apoyo técnico cuando los demás duerman.

### Ernesto — Plataforma · Offline · Build

- **Plataforma 66**, su puntaje más alto, y la puso como su preferencia más alta.
- Tiene **Python, Figma y OBS**.
- Dijo no querer despliegue — se interpreta como inseguridad, no rechazo: su rol es exactamente **hacer que el despliegue funcione** con acompañamiento de Carlos Alberto.
- **24 h y disponibilidad nocturna completa.**

---

## Matriz RACI

**R** = lo hace · **A** = aprueba · **C** = consultado · **I** = informado

| Actividad | Eduardo | Pineda | Angel | Carlos A. | Ernesto |
|---|---|---|---|---|---|
| Alcance y prioridades | **A/R** | C | C | C | C |
| Frontend / UI | I | **R** | C | I | C |
| Lógica y reglas | A | C | **R** | I | I |
| Dataset y validación | I | C | I | **R** | I |
| Despliegue y offline | I | C | I | C | **R** |
| Video de 30 s | **R/A** | C | I | I | C |
| Submission | **R/A** | C | I | I | I |
| Pitch | **R/A** | C | C | C | C |
| Documentación | A | **R** | C | C | C |

---

## Restricciones reales del equipo

| Persona | Horas | Noche | Laptop | Datos móviles | Inglés | Harness |
|---|---|---|---|---|---|---|
| Eduardo | 20 | Un turno | Sí | Sí | **Fluido** | Ninguno |
| Pineda | 16 | Un turno | Sí | Sí | — | OpenCode |
| Angel | **8** | Un turno | Sí | **No** | Se defiende | Ninguno (comprando) |
| Carlos Alberto | **Alta** | Completa | Sí | Sí | Lee, no escribe | OpenCode |
| Ernesto | 24 | Completa | Sí | **No** | Se defiende | OpenCode |

### Consecuencias directas

1. **Todo texto en inglés lo revisa Eduardo.** Nadie más puede.
2. **Angel tiene 8 horas**: su entrega debe estar lista el sábado antes de las 19:00.
3. **Ernesto y Angel sin datos móviles**: si falla el WiFi del venue, dependen del hotspot de alguien.
4. **Eduardo no tiene harness todavía**: debe instalar OpenCode o Claude Code antes del sábado.
5. **Solo Pineda tiene Orca**: no es requisito; el flujo funciona con git a secas.

---

## Turnos nocturnos

| Turno | Ventana | Personas |
|---|---|---|
| A | 00:00 – 04:00 | Carlos Alberto · Pineda |
| B | 04:00 – 08:00 | Ernesto · Carlos Alberto |
| Descanso | — | Eduardo · Angel |

> Un equipo agotado a las 10:00 del domingo pierde el pitch. El turno no es opcional.

---

## Respaldos

| Si falta… | Lo cubre… | Qué se sacrifica |
|---|---|---|
| Eduardo | Pineda | El pitch se reparte; el submission lo sube Pineda con la cuenta de Eduardo |
| Pineda | Eduardo | El frontend se simplifica a una sola columna |
| Angel | Pineda | Las reglas se escriben como tabla estática en JSON |
| Carlos Alberto | Angel | Solo se usa el dataset ya normalizado, sin validación adicional |
| Ernesto | Carlos Alberto | El deploy se hace a mano en Vercel |

---

## Reglas de trabajo

### Ritmo
- **Sync de 15 minutos cada 4 horas.** De pie: qué hice, qué sigue, qué me bloquea.
- **Nadie trabaja más de 4 horas seguidas.**
- **Commit cada hora.**

### Código
- Ramas cortas `feat/<usuario>/<tema>`.
- Conventional Commits.
- Después del sábado 12:00, PR express con una revisión.
- **`src/lib/rules/` no se mergea sin que otra persona lo lea.**

### Decisiones
- Sin consenso en 5 minutos: decide el Product Lead.
- Toda decisión se anota en `MEMORY.md`.
- **No se reabre** salvo dato nuevo.

### Documentación
- Cada quien documenta en su bitácora al cerrar un bloque.
- Ver [`docs/11-documentacion/01-protocolo-documental.md`](../11-documentacion/01-protocolo-documental.md).

---

## Lo que ningún rol incluye

- Nadie hace "todo".
- Nadie solo opina.
- Nadie se va sin haber commiteado algo el sábado y el domingo.

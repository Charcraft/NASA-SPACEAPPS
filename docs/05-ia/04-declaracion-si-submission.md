# 05.4 · Declaración de uso de SI para el submission

> **Estado: BORRADOR.** Se completa el 15 de noviembre a las 15:00 con el registro real de `03-registro-uso-ia.md`.
> Se pega en el campo correspondiente del formulario de submission de Space Apps.
>
> ⚠️ **Actualización 2026-11-13:** el submission va en inglés. La versión que realmente se pega en el formulario
> está en [`../08-submission/01-project-page-en.md`](../08-submission/01-project-page-en.md) § "Use of Super Intelligence (SI)".
> Este documento queda como la versión razonada y en español del mismo contenido.
>
> **Reglas nuevas que aplican** (ver `01-politica-uso-ia.md` § 3.1):
> - Imágenes y videos generados por SI: **marca de agua visible obligatoria**.
> - Nada de logos, banderas ni identificadores de misión de NASA en contenido generado.
> - SI **no puede** usarse para concebir la idea de solución.

---

## Por qué existe este documento

Space Apps exige que cada proyecto describa **cómo se usaron herramientas de SI (Super Intelligence)** durante su desarrollo. No es opcional y no es una formalidad: es parte de la evaluación.

Una declaración vaga ("usamos IA para algunas cosas") se lee como una declaración escondida. Una declaración específica se lee como rigor.

---

## Versión corta (para el formulario, 150 palabras)

> **Uso de SI en el proyecto**
>
> Usamos herramientas de SI en cuatro áreas, siempre con validación humana:
>
> **Investigación.** Un agente con búsqueda web y navegador automatizado nos ayudó a localizar y contrastar fuentes oficiales de NASA (Human Research Program, Open Science Data Repository, reglas del evento). Cada afirmación se verificó contra el documento original y se registró con fecha de consulta.
>
> **Documentación.** La estructura de investigación, planificación y política de uso de IA se redactó con asistencia de un agente, partiendo de esas fuentes verificadas.
>
> **Código.** [COMPLETAR: qué partes del código se generaron o revisaron con asistencia de SI y cómo se probaron.]
>
> **Diseño y narrativa.** [COMPLETAR: guion del video, textos de la interfaz, sistema visual.]
>
> **Lo que no delegamos:** el alcance del producto, la selección de indicadores clínicos, la definición de umbrales y la validación final. Todo umbral mostrado en la aplicación se rastrea hasta una fuente citada o está marcado explícitamente como supuesto del equipo.
>
> El registro completo de uso está en el repositorio público, en `docs/05-ia/`.

---

## Versión larga (para el README del repositorio)

### Declaración de uso de Super Intelligence (SI)

Este proyecto usó herramientas de SI durante el hackathon. A continuación se describe con precisión qué se hizo con ellas y qué no.

#### Herramientas utilizadas

| Herramienta | Tipo | Uso |
|---|---|---|
| Agente de IA con acceso al repositorio | Asistente de código y documentación | Redacción, scaffolding, revisión |
| Navegador automatizado | Extracción de fuentes | Consulta de páginas oficiales de NASA y del evento |
| Herramienta de transcripción | Determinista (no generativa) | Transcripción del video oficial del reto |
| [COMPLETAR] | | |

#### Por área

**1. Investigación y verificación de fuentes**
Se usó SI para localizar documentación oficial y para estructurar la síntesis. Todo dato citado se contrastó contra el documento original. Las fuentes están listadas con URL y fecha de consulta en `docs/02-investigacion/04-bibliografia.md`.

**2. Documentación**
La estructura documental, la política de uso de IA y los planes se redactaron con asistencia. El contenido técnico y las decisiones fueron revisados por el equipo.

**3. Código**
[COMPLETAR: proporción aproximada generada vs. escrita a mano, qué se probó y cómo.]

**4. Diseño y narrativa**
[COMPLETAR: guion del video, textos de interfaz, sistema visual.]

**5. Datos**
[COMPLETAR: si se usó SI para limpiar o normalizar los datasets de OSDR, y cómo se verificó la integridad.]

#### Qué no se delegó

- La definición del alcance del producto.
- La elección de los indicadores de salud.
- La validación de umbrales clínicos.
- La decisión de qué se muestra al usuario y con qué lenguaje.
- La revisión final antes del envío.

#### Cómo se valida

Cada uso relevante está registrado en `docs/05-ia/03-registro-uso-ia.md` con fecha, propósito, resultado y método de validación. Los estados posibles son `[VERIFICADO]`, `[POR VALIDAR]` y `[DESCARTADO]`.

Los elementos que no pudieron verificarse **no se muestran en la aplicación** o se muestran marcados como supuesto del equipo.

#### Limitaciones reconocidas

- La SI puede producir afirmaciones plausibles pero falsas. Por eso ningún valor clínico se aceptó sin fuente.
- No se usó SI para generar datos de salud presentados como reales. Los datos mostrados provienen de repositorios públicos de NASA o están etiquetados como datos de demostración.
- El producto no es un dispositivo médico y no emite diagnósticos.

---

## Checklist antes de enviar

- [ ] El registro `03-registro-uso-ia.md` está completo y actualizado hasta el domingo.
- [ ] La versión corta cabe en el campo del formulario.
- [ ] La versión larga está en el README del repo público.
- [ ] Se menciona explícitamente qué **no** se delegó.
- [ ] Se mencionan las limitaciones.
- [ ] No se exagera ni se minimiza el uso.
- [ ] Alguien que no escribió esto lo leyó y dijo "sí, es cierto".

---

## Errores que hay que evitar

| ❌ Error | Por qué duele |
|---|---|
| Omitir el uso de IA | Es un requisito; omitirlo es peor que usarla |
| "Usamos IA para todo" | Suena a que el equipo no aportó nada |
| "Solo la usamos un poquito" | Se detecta en el código y en la documentación |
| Listar herramientas sin decir para qué | No responde la pregunta del jurado |
| No declarar las limitaciones | Resta credibilidad al resto de la declaración |

---

## Nota sobre terminología

Se usa **"SI" / "Super Intelligence"** porque es el término oficial establecido por la orden ejecutiva del 29 de septiembre de 2026 y es el que emplea la organización del evento. Usar "AI" no invalida el proyecto, pero alinearse con el término oficial demuestra atención al detalle.

# 03.1 · Plan de los 7 días previos (6 → 13 de noviembre)

> **Regla que manda:** no se construye el proyecto antes del hackathon.
> Esta semana es de **investigación, decisiones y preparación**. Cero código de producto.

---

## Objetivo de la semana

Llegar al sábado 14 de noviembre a las 11:15 con:

1. El **alcance congelado** (qué sí y qué no).
2. Los **umbrales clínicos** definidos y con fuente.
3. **3 datasets reales** descargados y normalizados.
4. El **guion del video de 60 segundos** escrito.
5. El **repositorio público** creado y con README.
6. Cada persona con **su rol y su primera tarea** clara.

Nada más. Si sobra tiempo, se investiga más, no se programa más.

---

## Resumen visual

| Día | Foco | Entregable | Quién |
|---|---|---|---|
| Vie 6 | Inmersión en HRP | `01-cinco-peligros.md` | Todos |
| Sáb 7 | Recon de datos | `03-fuentes-datos.md` §5 + 3 datasets | Datos |
| Dom 8 | Umbrales clínicos | `02-indicadores-fisiologicos.md` validado | Datos + Producto |
| Lun 9 | UX y wireframes | Figma con 6 pantallas | Diseño |
| Mar 10 | Aprendizaje técnico | Notas de práctica por persona | Devs |
| Mié 11 | Guion + repo + declaración SI | `docs/05-ia/04-*` y repo creado | Todos |
| Jue 12 | Sync de equipo y logística | `docs/04-equipo/*` completo | Todos |
| Vie 13 | **Recursos oficiales** | Plan de datos definitivo | Todos |

---

## Vie 6 — Inmersión en el marco científico

**Objetivo:** que nadie del equipo llegue al sábado sin entender los 5 peligros.

- [ ] Leer `docs/01-brief-retor.md` completo (20 min).
- [ ] Leer `docs/02-investigacion/01-cinco-peligros.md` (30 min).
- [ ] Ver el video del reto (3 min) y anotar la escena del dolor torácico.
- [ ] Cada integrante responde por escrito: *¿qué indicador te parece el más importante y por qué?*
- [ ] Reunión de 30 min para contrastar respuestas.

**Criterio de salida:** los 5 pueden nombrar los 5 peligros y asociarles un indicador.

---

## Sáb 7 — Reconocimiento de datos

**Objetivo:** saber exactamente qué datos reales existen y cuáles sirven.

- [ ] Crear cuenta en OSDR.
- [ ] Buscar estudios con datos **humanos** y **longitudinales**.
- [ ] Identificar 3 candidatos y descargar muestras pequeñas.
- [ ] Probar el acceso S3: `aws s3 ls --no-sign-request s3://nasa-osdr/`
- [ ] Documentar formato, tamaño, licencia y si requiere solicitud.
- [ ] Llenar la tabla de la §5 de `03-fuentes-datos.md`.

**Criterio de salida:** 3 datasets concretos con nombre, enlace y una muestra descargada.

---

## Dom 8 — Umbrales clínicos

**Objetivo:** que cada número de la app tenga respaldo.

- [ ] Recorrer `02-indicadores-fisiologicos.md` y resolver cada `[POR VALIDAR]`.
- [ ] Para cada indicador: fuente primaria o marca explícita de `[SUPUESTO]`.
- [ ] Definir el conjunto final de **8 indicadores del MVP**.
- [ ] Escribir el texto de "cómo se mide" en lenguaje llano (sin jerga).
- [ ] Escribir el texto de "por qué importa" en 2 frases máximo.

**Criterio de salida:** los 8 indicadores del MVP tienen los tres textos y una fuente.

---

## Lun 9 — Diseño de producto

**Objetivo:** saber exactamente cómo se ve antes de escribir una línea.

- [ ] Wireframes de 6 pantallas en Figma:
  1. Dashboard de tripulación
  2. Mapa corporal interactivo
  3. Asistente de medición guiada
  4. Tarjeta de resultado con semáforo
  5. Selector de emergencia
  6. Protocolo de emergencia activo
- [ ] Definir sistema de color (verde/amarillo/rojo accesibles para daltonismo: no depender solo del color, añadir icono + texto).
- [ ] Definir tipografía y tamaños mínimos (contexto: poca luz, estrés, posible guante).
- [ ] Definir el tono de voz: directo, sin jerga, sin alarmismo.

**Criterio de salida:** un enlace de Figma que cualquiera del equipo puede recorrer.

---

## Mar 10 — Aprendizaje técnico (no producto)

**Objetivo:** que nadie aprenda la herramienta durante el hackathon.

Cada persona practica su stack con un ejemplo **que no sea del proyecto**:

- [ ] Frontend: un componente de gráfica con datos falsos de temperatura.
- [ ] Datos: leer un CSV, limpiarlo y exportarlo a JSON.
- [ ] Reglas: una función pura `evaluar(valor, baseline) → nivel`.
- [ ] Diseño: exportar un SVG de cuerpo humano con regiones clicables.
- [ ] Video: grabar y editar un clip de 15 s.

**Criterio de salida:** cada uno tiene un archivo de práctica funcionando en su máquina.

> ⚠️ Estos ejercicios **no se suben al repo del proyecto**. Se quedan como prueba local de que la herramienta funciona.

---

## Mié 11 — Guion, repositorio y declaración de IA

**Objetivo:** quitar del domingo las tareas que siempre se olvidan.

- [ ] Crear el repositorio público con licencia MIT y README.
- [ ] Escribir el **guion del video de 60 s**, con tiempos:

| Tiempo | Plano | Texto / voz en off |
|---|---|---|
| 0:00–0:08 | Astronauta, oscuridad, alarma | "A mitad de camino a Marte, no hay médico." |
| 0:08–0:18 | Síntoma → app → semáforo rojo | "La tripulación tiene que decidir sola." |
| 0:18–0:38 | Mapa corporal, medición guiada, tendencia | "Cada indicador explicado, medido y comparado con tu propia línea base." |
| 0:38–0:50 | Protocolo de emergencia paso a paso | "Y cuando es urgente, la app te lleva de la mano." |
| 0:50–0:60 | Logo + repo + cierre | "Funciona sin conexión. Porque allá arriba, no hay señal." |

- [ ] Redactar el borrador de la declaración de SI: `docs/05-ia/04-declaracion-si-submission.md`.
- [ ] Preparar la plantilla del formulario de submission (qué campos pide).

**Criterio de salida:** guion aprobado por los 5 y repo público existente.

---

## Jue 12 — Equipo y logística

**Objetivo:** que el sábado nadie pregunte "¿y ahora qué hago?".

- [ ] Confirmar roles definitivos (§`docs/04-equipo/02-roles-asignacion.md`).
- [ ] Confirmar quién lleva qué (laptop, extensión, cargadores, USB con `node_modules`).
- [ ] Definir las **reglas de trabajo**: horarios de sync, canal, cómo se pide ayuda.
- [ ] Definir el **plan B**: si no hay internet, si falla una laptop, si alguien se enferma.
- [ ] Completar el formulario de registro secundario del Local Event.

**Criterio de salida:** cada persona sabe su rol, su primera tarea del sábado y su horario.

---

## Vie 13 — Día de los recursos oficiales

**Objetivo:** absorber lo oficial y ajustar sin pánico.

- [ ] A las 09:00 revisar la pestaña Resources del reto.
- [ ] Clasificar cada recurso: útil / redundante / descartado.
- [ ] Actualizar `03-fuentes-datos.md` §5.
- [ ] Si aparece un dataset mejor que el plan B, decidir en 30 min si se cambia.
- [ ] **Congelar el stack** (`TECH-STACK.md`) a las 23:59.
- [ ] Dormir. En serio.

**Criterio de salida:** plan de datos definitivo y stack congelado.

---

## Lo que NO se hace esta semana

- Escribir la aplicación.
- Crear componentes del producto.
- Maquetar pantallas finales.
- Grabar el video.
- Descargar datasets gigantes.

Si alguien quiere hacerlo, se le recuerda: **la FAQ oficial lo prohíbe explícitamente**, y un repo con historial de commits anterior al 14 de noviembre es una mala señal ante el jurado.

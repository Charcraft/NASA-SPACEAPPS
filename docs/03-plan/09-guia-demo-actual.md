# 03.9 · Guía para mostrar lo que tenemos hoy

> **Para qué sirve:** cualquiera del equipo puede enseñar el proyecto en 2, 5 o 10 minutos, sin improvisar y sin prometer lo que no hay.
> **Regla de oro:** mostrar lo que existe, decir lo que falta. La honestidad se nota y se premia.

---

## 1 · Inventario real (lo que hay hoy)

| Pieza | Estado | Dónde se ve |
|---|---|---|
| **Dataset real de NASA normalizado** | ✅ Funcionando | `src/data/seed/osdr-inspiration4-cmp.json` |
| **Script reproducible de descarga** | ✅ Funcionando | `python scripts/normalizar-osdr.py` |
| **Demo del dataset en terminal** | ✅ Funcionando | `python scripts/demo-dataset.py glucosa` |
| **Repositorio público documentado** | ✅ 110+ documentos | github.com/Charcraft/NASA-SPACEAPPS |
| **Pitch de 7 diapositivas en inglés** | ✅ Listo | `docs/03-plan/pitch-aegis.pptx` |
| **Documento de estudio del jurado** | ✅ Listo | `docs/03-plan/08-preguntas-jurado.md` |
| **Onboarding autoinstalable** | ✅ Funcionando | `scripts/instalar-todo.ps1` |
| **24 skills para los agentes** | ✅ Instaladas | `skills/` |
| **Roles y equipo** | ✅ Cerrados | `docs/04-equipo/02-roles-asignacion.md` |
| **Aplicación AEGIS** | ⬜ En construcción | — |
| **Video de 30 segundos** | ⬜ Pendiente | — |
| **Submission enviado** | ⬜ Pendiente | — |

> **Actualiza esta tabla** en cuanto la app tenga pantalla. Es la fuente de verdad de qué se puede mostrar.

---

## 2 · Tres recorridos según el tiempo

### Recorrido A — 2 minutos (pasillo, café, alguien pregunta)

1. La historia (30 s): *"A mitad de camino a Marte no hay médico y la señal tarda 22 minutos."*
2. El activo (30 s): abrir el JSON y mostrar los 4 tripulantes y 7 puntos temporales.
3. La frase (15 s): *"Cada umbral viene de datos de vuelo de NASA, no lo inventamos."*
4. El cierre (15 s): *"Es una ayuda para decidir, no un dispositivo médico."*

**No abras el repo.** Muestra el dataset y la historia. Nada más.

### Recorrido B — 5 minutos (un mentor, un juez informal)

1. La historia (30 s).
2. El problema en datos: 22 min, 5 peligros, 0 médicos a bordo (1 min).
3. **Demo del dataset en vivo** (1 min 30 s) — ver §4.
4. La solución: medir → comparar → decidir → actuar → registrar (1 min).
5. Lo que falta, dicho por ti (1 min).

### Recorrido C — 10 minutos (presentación formal o un compañero nuevo)

1. Recorrido B completo (5 min).
2. El repo por dentro: `docs/00-INDEX.md` → investigación → plan → equipo (3 min).
3. Cómo trabajamos: un issue, una rama, un PR, y la regla "si no está escrito, no pasó" (1 min).
4. Preguntas (1 min).

---

## 3 · Guion de cada pieza

### El dataset (el activo más sólido)

> "Esto es lo que trajimos cuando el paquete del reto no traía datos. Es el panel metabólico de los cuatro tripulantes de Inspiration4, publicado por NASA en su repositorio abierto. Son diecisiete indicadores, siete mediciones por persona, desde 92 días antes del lanzamiento hasta 194 días después. Y lo importante: los rangos de referencia vienen dentro del archivo. No los inventamos nosotros."

### El script reproducible

> "Cualquiera puede correr esto y obtener el mismo archivo. No es una captura de pantalla ni un Excel hecho a mano: es un script que apunta a la API pública de NASA."

### El repositorio

> "Todo el trabajo está aquí: la investigación con fuentes, el plan con tiempos, los roles, y el registro de uso de IA. No es un repo de código: es el registro de cómo se tomó cada decisión."

### El pitch

> "Siete diapositivas, en inglés, con la estructura que pidió el evento: problema y usuario, solución, datos, demostración, evidencia y limitaciones, cierre."

---

## 4 · Demo en vivo del dataset (el momento fuerte)

### Antes de mostrar

```bash
python scripts/demo-dataset.py glucosa
```

Funciona sin internet. Si la terminal falla, ten una captura guardada.

### Qué decir mientras corre

1. **Al aparecer el encabezado:** *"Estudio OSD-575, cuatro tripulantes, siete puntos temporales."*
2. **Al aparecer la línea de tiempo:** *"Desde 92 días antes del lanzamiento hasta 194 días después. Eso es una línea base."*
3. **Al aparecer la barra de glucosa:** *"Aquí está el punto clave: cada persona vuelve a su propio rango, no al promedio del grupo."*
4. **Al ver un valor marcado FUERA:** *"Y ojo: hay 24 valores de 475 que caen fuera del rango de referencia del propio dataset. Eso es exactamente lo que justifica una capa de triaje. Nosotros no los interpretamos clínicamente: los marcamos."*

### El remate

> "Esto es un dato real que cualquiera puede verificar. No es una maqueta."

---

## 5 · Cómo enseñárselo al equipo (sesión de 20 minutos)

| Minuto | Qué |
|---|---|
| 0–3 | La historia: el compañero que colapsa. Que cada uno la cuente en una frase. |
| 3–8 | Demo del dataset en la pantalla. Que dos personas la corran ellos mismos. |
| 8–12 | Recorrido del repo: índice, investigación, plan, roles. Que cada uno abra su `BIENVENIDA.md`. |
| 12–16 | El pitch: pasar las 7 diapositivas sin explicar. Que adivinen qué falta. |
| 16–20 | Cada uno responde en voz alta **una** de las 10 preguntas obligatorias. |

**Criterio de éxito:** al terminar, cada persona puede explicar el proyecto en 60 segundos sin leer.

---

## 6 · Qué NO mostrar todavía

| No mostrar | Por qué |
|---|---|
| Pantallas que no existen o están a medias | Una captura vacía resta más de lo que suma |
| Promesas de funcionalidad futura como si existiera | Se detecta en la primera pregunta |
| El `desktop.ini` o carpetas personales | Ruido |
| Discusiones internas del equipo | No aportan y restan |
| Datos que no puedas explicar | Si no sabes de dónde salió, no lo muestres |

---

## 7 · Checklist antes de mostrarle a alguien

- [ ] `python scripts/demo-dataset.py glucosa` corre sin error
- [ ] El repo abre en una ventana de incógnito
- [ ] El pitch abre en PowerPoint o en Google Slides
- [ ] Sabes decir en una frase qué hace AEGIS
- [ ] Sabes decir en una frase qué **no** hace
- [ ] Sabes de dónde salen los umbrales
- [ ] Tienes la tabla del §1 actualizada

---

## 8 · Preguntas de quien lo ve (y qué responder)

| Pregunta | Respuesta |
|---|---|
| "¿Ya funciona?" | "La app está en construcción. Lo que ya funciona es el dato y la lógica que la va a alimentar." |
| "¿Esto es real?" | "Sí. Estudio OSD-575 del repositorio abierto de NASA. Se descarga con el script del repo." |
| "¿Y el resto del equipo?" | "Cinco roles definidos, cada uno con su archivo de trabajo. Todos saben qué hacen y qué no." |
| "¿Cuánto falta?" | "El build y el video. El dato, el pitch y la documentación ya están." |
| "¿Puedo verlo yo?" | "Claro: clona el repo y corre el script. Tarda dos minutos." |

---

## 9 · La frase que resume todo

Si solo tienes 15 segundos:

> "Trajimos datos reales de vuelo de NASA cuando el reto no traía ninguno, y construimos la capa de decisión que falta entre esos datos y una tripulación que está sola. Y dijimos en voz alta lo que no hicimos."

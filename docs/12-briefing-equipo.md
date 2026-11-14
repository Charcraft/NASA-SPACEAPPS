# 12 · Briefing del equipo

> **Qué es:** todo lo que tenemos estructurado y planeado, en un solo documento.
> **Para qué:** que Pineda lo presente al equipo en ~40 minutos y todos salgan sabiendo lo mismo.
> **Regla:** si algo de aquí contradice el repo, manda el repo. Este documento es la puerta de entrada, no la fuente.

---

## Cómo usar este documento

| Bloque | Minutos | Qué se hace |
|---|---|---|
| §1–§3 El reto y la solución | 10 | Se explica, no se lee |
| §4 Los datos | 5 | Se corre la demo en vivo |
| §5–§6 Qué hay y qué falta | 5 | Tabla en pantalla |
| §7–§8 El plan y los roles | 10 | Cada uno confirma su rol en voz alta |
| §9–§11 Cómo trabajamos | 5 | Se muestra el repo |
| §12–§16 Evaluación, riesgos y cierre | 5 | Preguntas |

---

## 1 · El reto

| Campo | Dato |
|---|---|
| Evento | NASA Space Apps Challenge 2026 |
| Reto | *Create Health Monitoring Software for Astronauts on Space Missions* |
| Autor del reto | **Agencia Espacial Brasileña** |
| Local Event | Tuxtla Gutiérrez, Chiapas — EcoCity Hotel |
| Equipo | **ROCKET** — 5 personas |
| **Envío local** | **domingo 15 de noviembre, 17:00** |
| Demo | **30 segundos** máximo, o **7 diapositivas** |
| Idioma | **Inglés** en todo el submission |

> ⚠️ El sitio global dice 23:59. **El Local Event cierra a las 17:00.** Se trabaja con 17:00.

---

## 2 · El problema

> *"Imagina que vas a mitad de camino a Marte. De repente tu compañero siente un dolor agudo en el pecho y colapsa. ¿Qué está pasando? ¿Se está muriendo? ¿Qué haces?"*
> — Video oficial del reto

| Dato | Valor |
|---|---|
| Retraso de comunicación | hasta **22 minutos** por sentido |
| Médicos a bordo | **0** |
| Peligros del vuelo (NASA HRP) | **5**: radiación, aislamiento, distancia, gravedad, ambiente cerrado |

**El usuario no es el cirujano de vuelo en Houston. Es la persona que está en la nave, sola, con alguien en el suelo.**

---

## 3 · La solución: AEGIS

**Tagline:** *Crew health autonomy, offline.*

### El flujo

```
medir  →  comparar con tu línea base  →  semáforo  →  actuar  →  registrar
```

### Dos modos

| Modo | Cuándo | Qué hace |
|---|---|---|
| **Rutina** | Todo normal | Medición guiada, tendencias, recordatorios |
| **Emergencia** | Algo va mal | Protocolo paso a paso, cronómetro, registro para el cirujano de vuelo |

### Las cinco decisiones de producto

1. **Medición guiada** — cómo se mide en microgravedad y qué error da un valor falso.
2. **Línea base personal** — no rangos poblacionales, porque la fisiología se desplaza.
3. **Semáforo con razón, acción y fuente** — nunca solo un color.
4. **Protocolos de emergencia** — una acción por pantalla, letra grande.
5. **Offline-first** — sin red, sin backend, por diseño.

### Lo que AEGIS **no** hace

- No diagnostica.
- No receta medicamentos ni dosis.
- No sustituye al cirujano de vuelo.
- No es un dispositivo médico.

---

## 4 · Los datos (nuestro activo más sólido)

### Qué tenemos

| Campo | Valor |
|---|---|
| Fuente | **NASA OSDR — OSD-575** |
| Estudio | Panel metabólico de **SpaceX Inspiration4** |
| Tripulantes | **4** (anonimizados C001–C004) |
| Puntos temporales | **7**: L-92, L-44, L-3 → R+1, R+45, R+82, R+194 |
| Indicadores | **17** |
| Valores totales | **475** |
| Rangos de referencia | **vienen dentro del dataset** |

### Por qué importa

El paquete oficial del reto **no traía ningún dataset**: solo cinco enlaces de documentación. Nosotros fuimos a OSDR y trajimos datos humanos reales de vuelo.

### El hallazgo que vale para el pitch

**24 de 475 valores (5.1 %) caen fuera del rango de referencia del propio dataset.**

Verificado contra el CSV original: no es error nuestro. Y es el mejor argumento de producto:

> "Una app que muestre todo en verde está mintiendo. El semáforo existe porque el dato real es ruidoso."

### Demo en vivo

```bash
python scripts/demo-dataset.py glucosa
```

Funciona sin internet. Muestra la línea de tiempo, las barras por tripulante y los valores fuera de rango.

---

## 5 · Lo que existe hoy

| Pieza | Estado |
|---|---|
| Dataset real normalizado | ✅ |
| Script reproducible de descarga | ✅ |
| Demo del dataset en terminal | ✅ |
| Repositorio público con 110+ documentos | ✅ |
| Pitch de 7 diapositivas en inglés | ✅ |
| Documento de estudio del jurado | ✅ |
| 24 skills para los agentes | ✅ |
| Onboarding autoinstalable | ✅ |
| Roles y equipo definidos | ✅ |

---

## 6 · Lo que falta

| Pieza | Cuándo |
|---|---|
| La aplicación AEGIS | sábado y domingo |
| El video de 30 segundos | domingo, 12:00 |
| El submission enviado | domingo, **16:30** |

> **No se promete nada que no exista.** Si alguien pregunta, se dice exactamente esto.

---

## 7 · El plan de ~30 horas

### Los 5 gates

| Gate | Cuándo | Pregunta |
|---|---|---|
| **G1** Alcance congelado | Sáb 12:00 | ¿Tenemos 8 indicadores y 3 protocolos definidos? |
| **G2** Esqueleto vivo | Sáb 18:00 | ¿La app corre y navega? |
| **G3** Núcleo funcional | Dom 01:00 | ¿El semáforo evalúa datos reales? |
| **G4** Congelamiento | Dom 12:00 | ¿Todo lo que está, funciona? |
| **G5** Envío | Dom 16:30 | ¿Está subido el formulario? |

**Regla de oro:** después del G4 solo se arregla, no se agrega.

### Turnos nocturnos

| Turno | Ventana | Quiénes |
|---|---|---|
| A | 00:00–04:00 | Carlos Alberto · Pineda |
| B | 04:00–08:00 | Ernesto · Carlos Alberto |

Eduardo y Angel descansan. **Un equipo agotado a las 10:00 del domingo pierde el pitch.**

---

## 8 · Los roles

| Persona | Rol | Qué entrega |
|---|---|---|
| **Eduardo** | Product Lead · Video · Submission | Alcance, pitch, demo de 30 s, envío |
| **Pineda** | Frontend Lead · IA | La app que se ve, soporte de agentes |
| **Angel** | Lógica y reglas · Tests | `thresholds.ts` + función `evaluar()` + tests |
| **Carlos Alberto** | Datos · QA de datos | Validación del dataset, apoyo de despliegue |
| **Ernesto** | Plataforma · Offline · Build | Deploy, PWA, verificación sin red |

### Restricciones que el plan respeta

- **Solo Eduardo tiene inglés fluido** → todo el texto en inglés pasa por él.
- **Angel tiene 8 horas** → su entrega cierra el sábado antes de las 19:00.
- **Dos personas sin datos móviles** → si falla el WiFi, hotspot compartido.
- **Nadie domina diseño** → sistema prehecho, sin exploración.

---

## 9 · Cómo trabajamos

### El repositorio es la verdad

```
GitHub  →  issues, ramas, pull requests, tablero
Orca    →  worktrees y agentes en cada máquina
Harness →  OpenCode / Claude Code / Cursor, todos leen AGENTS.md
```

### El ciclo

```
issue → rama → trabajo → commit cada hora → PR → revisión de otra persona → merge
```

### Cinco reglas de convivencia

1. **Un archivo, un dueño.** Cada quien escribe en `team/<usuario>/`.
2. **Append-only** en `MEMORY.md` y en el registro de IA.
3. **Commit cada hora.** Un portátil que se apaga no se lleva el trabajo.
4. **Nadie empuja directo a `main`** después del sábado 12:00.
5. **`src/lib/rules/` no se mergea sin que otra persona lo lea.**

---

## 10 · Las seis reglas duras

1. **No se construye antes del evento.** (Ya pasó: hoy es 14.)
2. **Todo es open source.** Repo público desde el primer commit.
3. **Toda cifra de salud necesita fuente.** Sin fuente → `[POR VALIDAR]` y se muestra así.
4. **Todo uso de IA se registra.** Está en el submission.
5. **Nunca se presenta como dispositivo médico.**
6. **Si no está escrito, no pasó.**

---

## 11 · Las herramientas

| Herramienta | Para qué | Quién la tiene |
|---|---|---|
| **OpenCode / Claude Code / Cursor** | Trabajar con el agente | Pineda, Carlos A., Ernesto (Eduardo y Angel deben instalarlo) |
| **24 skills** | Navegador, diseño, 3D, descubrimiento | Todos, con `scripts/instalar-todo.ps1` |
| **BrowserAct** | Buscar en internet con sesión | Cada quien el suyo (`docs/10-entorno/05-tu-navegador.md`) |
| **Orca** | Worktrees y agentes en paralelo | Solo Pineda (opcional) |
| **git + gh** | Todo el flujo | Todos |

---

## 12 · Cómo nos van a evaluar

**Cinco criterios, de 1 a 5 cada uno:**

| Criterio | Qué premia |
|---|---|
| **Impacto** | Resolver un problema significativo |
| **Creatividad** | Originalidad real |
| **Validez** | Solidez científica y viabilidad |
| **Relevancia** | Alineación con el reto + datos de NASA de verdad |
| **Presentación** | Claridad y storytelling |

> La guía oficial lo dice: los equipos cuidan los cuatro primeros y descuidan presentación. **Ahí se pierde.**

**10 premios globales.** Apuntamos a *Best Use of Data* y *Galactic Impact*.

---

## 13 · Riesgos y qué hacemos

| Riesgo | Mitigación |
|---|---|
| Se acaba el tiempo | Gates con recorte definido |
| Falla el internet del venue | Todo funciona offline; submission desde el celular |
| La app no compila | Se presenta el dataset y la lógica, no se improvisa |
| Alguien se agota | Turnos y descanso obligatorio |
| Se nos va el domingo | G4 a las 12:00 y envío a las 16:30 |
| Nos preguntan algo que no sabemos | "No lo sé, prefiero no inventarlo" |

---

## 14 · Qué espero de cada uno

| Persona | Compromiso concreto |
|---|---|
| **Eduardo** | Instalar harness hoy. Congelar alcance a las 12:00. Ser dueño del envío. |
| **Pineda** | Esqueleto funcionando antes de las 18:00. No hacer todo. |
| **Angel** | Reglas y tests cerrados el sábado antes de las 19:00. |
| **Carlos Alberto** | Dataset validado y documentado. Apoyo de despliegue a Ernesto. |
| **Ernesto** | URL viva el sábado a las 13:00. Offline verificado. |

---

## 15 · Checklist de arranque (sábado)

- [ ] Cada uno corrió `scripts/instalar-todo.ps1`
- [ ] Cada uno leyó su `team/<usuario>/BIENVENIDA.md`
- [ ] Cada uno sabe su rol y su primera tarea
- [ ] El repo está clonado y se puede hacer push
- [ ] El alcance está escrito en la pared o en FigJam
- [ ] Los turnos nocturnos están confirmados
- [ ] Alguien tiene hotspot de respaldo

---

## 16 · Las cinco frases que todos deben poder decir

1. "A mitad de camino a Marte no hay médico y la señal tarda 22 minutos."
2. "AEGIS convierte eso en una decisión: medir, comparar con tu línea base, semáforo, actuar, registrar."
3. "Los umbrales vienen de datos reales de NASA, no los inventamos."
4. "Funciona sin conexión."
5. "No diagnosticamos: le devolvemos a la tripulación la capacidad de decidir."

---

## Material de apoyo

| Documento | Para qué |
|---|---|
| `docs/01-brief-retor.md` | El reto completo |
| `docs/02-investigacion/01-cinco-peligros.md` | La ciencia |
| `docs/03-plan/03-alcance-producto.md` | Qué se construye |
| `docs/03-plan/06-demo-30s.md` | Guion del demo |
| `docs/03-plan/07-pitch-7-slides.md` | Pitch del jurado |
| `docs/03-plan/08-preguntas-jurado.md` | Estudio de preguntas |
| `docs/03-plan/09-guia-demo-actual.md` | Cómo mostrar lo de hoy |
| `docs/04-equipo/02-roles-asignacion.md` | Roles y RACI |
| `docs/07-trabajo-colaborativo/` | Cómo trabajar sin pisarse |
| `docs/11-documentacion/01-protocolo-documental.md` | Qué documentar |

# 04.2 · Roles y asignación

> ⚠️ **Estado: PROPUESTA.** Los perfiles del equipo aún no se han levantado.
> Se confirma el **jueves 12 de noviembre** con las respuestas de `01-equipo.md` §"Lo que falta por saber".

---

## Principio de diseño de roles

Con 5 personas y ~30 horas, no se puede tener un especialista por área. La regla es:

> **Cada persona tiene un rol primario y un rol de respaldo. Nadie es dueño único de nada crítico.**

---

## Roles propuestos

### 1 · Eduardo (@danny1510) — **Product Lead + Pitch**

**Es el owner del equipo, así que este rol es natural.**

| Responsabilidad | Detalle |
|---|---|
| Alcance | Decide qué entra y qué no. Autoridad final en el G1 y G4. |
| Priorización | Cuando dos personas quieren cosas distintas, decide en 5 minutos. |
| Pitch | Es la cara del equipo a las 17:30 y 19:00. |
| Submission | Llena y sube el formulario. **Debe terminar a las 16:30.** |
| Respaldo | Carlos De Jesús (@cxrlosmp) |

**Primera tarea (sábado 11:15):** escribir en la pared los 8 indicadores, los 3 protocolos y el "no haremos".

---

### 2 · Angel Marco (@angel_marco) — **Frontend Lead**

| Responsabilidad | Detalle |
|---|---|
| Interfaz | Dashboard, mapa corporal, tarjetas, protocolos. |
| Componentes | Todo componente nace con estado vacío y estado de error. |
| Accesibilidad | Contraste, tamaños táctiles, no depender solo del color. |
| Respaldo | Ernesto |

**Primera tarea:** maquetar el dashboard y el mapa corporal con datos mock antes de las 15:00 del sábado.

---

### 3 · Carlos De Jesús (@cxrlosmp) — **Datos + IA**

| Responsabilidad | Detalle |
|---|---|
| Datasets | Descargar, limpiar y normalizar los datos de OSDR a JSON seed. |
| Motor de reglas | Escribir `triage.ts` como función pura y sus tests. |
| Capa SI | Cliente de IA + fallback determinista en JSON. |
| Reproducibilidad | Script que regenera los datos desde el origen. |
| Respaldo | Carlos Alberto |

**Primera tarea:** tener un JSON con una serie temporal real de un indicador fisiológico antes de las 18:00 del sábado.

---

### 4 · Carlos Alberto (@giganroker) — **Plataforma + Offline + QA**

| Responsabilidad | Detalle |
|---|---|
| Infraestructura | Repo, Vercel, build, variables de entorno. |
| Offline | Dexie/IndexedDB, service worker, verificación con WiFi apagado. |
| Pruebas | Que el build final corra en una máquina limpia. |
| Riesgo técnico | Es quien dice "esto no va a funcionar en 3 horas". |
| Respaldo | Angel Marco |

**Primera tarea:** deploy vacío en Vercel antes de las 13:00 del sábado, para que el equipo tenga una URL desde el minuto uno.

---

### 5 · Ernesto (@ernesto-montes) — **Diseño + Video + Narrativa**

| Responsabilidad | Detalle |
|---|---|
| Sistema de diseño | Color, tipografía, espaciado, tono de voz. |
| SVG del cuerpo | Dibujar el mapa corporal con regiones clicables. |
| Video | Grabar y editar los 60 segundos. **Empieza a las 12:00 del domingo.** |
| Narrativa | Que todo lo que se diga suene humano y no a folleto. |
| Respaldo | Eduardo |

**Primera tarea:** sistema de color y tipografía definidos antes de las 15:00 del sábado, y el SVG base del cuerpo.

---

## Matriz RACI

**R** = responsable de hacerlo · **A** = aprueba · **C** = consultado · **I** = informado

| Actividad | Eduardo | Angel | Carlos D. | Carlos A. | Ernesto |
|---|---|---|---|---|---|
| Alcance y priorización | **A/R** | C | C | C | C |
| Diseño visual | A | C | I | I | **R** |
| Frontend | I | **R** | C | C | C |
| Motor de reglas | I | C | **R** | C | I |
| Datos OSDR | I | I | **R** | C | I |
| Offline / infra | I | C | C | **R** | I |
| Protocolos de emergencia | A | R | **R** | I | C |
| Video de 60 s | **A** | C | I | I | **R** |
| Submission | **R/A** | I | C | C | C |
| Pitch | **R/A** | C | C | C | C |

---

## Reglas de trabajo del equipo

### Ritmo
- **Sync de 15 minutos cada 4 horas.** De pie. Cada uno responde: qué hice, qué sigue, qué me bloquea.
- **Descanso obligatorio de 10 min cada 90 min.**
- **Nadie trabaja más de 4 horas seguidas.**

### Código
- Ramas cortas: `feat/`, `fix/`, `docs/`.
- Conventional Commits.
- **Commit cada hora como mínimo.**
- Después del sábado 12:00, nada de push directo a `main`: PR express con una revisión.

### Comunicación
- Un solo canal para el equipo (WhatsApp del equipo) y un solo lugar para el estado (este repo).
- **Lo que no está en el repo, no existe.**
- Si alguien está bloqueado más de 45 minutos, lo dice. No se resuelve en silencio.

### Decisiones
- Si en 5 minutos no hay consenso: decide el Product Lead.
- Las decisiones se anotan en `MEMORY.md` con fecha.
- **Una decisión tomada no se reabre** salvo que aparezca un dato nuevo.

---

## Asignación de respaldos (si alguien falta)

| Si falta… | Lo cubre… | Qué se sacrifica |
|---|---|---|
| Eduardo | Carlos De Jesús | El pitch se reparte; el submission se hace igual |
| Angel Marco | Ernesto | Se pierde velocidad en frontend |
| Carlos De Jesús | Carlos Alberto | Datos se simplifican a mock + 1 dataset |
| Carlos Alberto | Angel Marco | Offline se verifica a mano, no automatizado |
| Ernesto | Angel Marco | Se pierde el video profesional; se graba con OBS |

---

## Lo que ningún rol incluye

- Nadie es "el que hace todo".
- Nadie es "el que solo opina".
- Nadie se va sin haber commiteado algo el sábado y el domingo.

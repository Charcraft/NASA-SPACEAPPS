# 07.6 · Plan adaptativo hasta el viernes 13

> El equipo todavía no se conoce técnicamente. Este documento define **cómo se adapta el plan** conforme llega la información, sin improvisar.
> Cinco fases, cinco gates, y un plan para cada cosa que puede salir mal.

---

## La lógica

```
Hoy (6 nov)      →  estructura lista, sin depender de nadie
8–9 nov          →  llega la información de las personas
10 nov           →  se asignan roles con datos, no con intuición
11–12 nov        →  se ensaya el flujo completo, en frío
13 nov           →  llegan los recursos oficiales, se ajusta y se congela
14–15 nov        →  se ejecuta
```

**Principio:** cada fase produce un artefacto que la siguiente necesita. Si una fase falla, la siguiente se degrada de forma controlada, no se colapsa.

---

## Fase F0 · Estructura (6–7 de noviembre)

**Estado: completada.**

### Entregable
- [x] Repo git inicializado en `main`.
- [x] `AGENTS.md`, `MEMORY.md`, `TECH-STACK.md`, `README.md`.
- [x] 20 documentos en `docs/`.
- [x] `.github/` con plantillas, CODEOWNERS y PR template.
- [x] Adaptadores de harness (`CLAUDE.md`, `.cursor/`, `.github/copilot-instructions.md`).
- [x] `team/` con una carpeta por integrante.
- [x] Scripts de setup.

### Gate G0
> ¿Puede una persona nueva clonar el repo y abrir su primer PR sin ayuda?

Se prueba con alguien del equipo el **8 de noviembre**. Si falla, se corrige la guía, no se le pide a la persona que "le eche ganas".

---

## Fase F1 · Conocer al equipo (8–9 de noviembre)

### Objetivo
Saber qué sabe hacer cada quien, **antes** de repartir trabajo.

### Acciones
- [ ] Cada integrante llena `team/<usuario>/perfil.md` (7 preguntas).
- [ ] Cada integrante abre su PR del perfil → **primer contacto real con el flujo**.
- [ ] Eduardo consolida las respuestas en una matriz.

### La matriz

| Pregunta | Para qué sirve |
|---|---|
| Lenguajes que domina | Decide el stack, no al revés |
| Frontend / backend / datos / diseño / video | Asigna rol primario |
| Experiencia en salud o biología | Rol de "revisor de sanidad" |
| Herramienta que domina | Quién hace qué más rápido |
| Hasta qué hora aguanta el sábado | Turnos nocturnos |
| Laptop y batería | Quién puede correr build |
| Plan de datos móviles | Respaldo si falla el WiFi |

### Gate G1
> ¿Sabemos quién hace qué sin adivinar?

Si dos personas quedan sin rol claro, **el rol se inventa antes del 12 o se recorta el alcance**.

---

## Fase F2 · Entornos individuales (10 de noviembre)

### Objetivo
Que las 5 máquinas puedan trabajar. No que "deberían poder".

### Acciones
- [ ] Cada integrante ejecuta `setup-integrante.ps1`.
- [ ] Cada integrante clona, configura identidad y registra el repo en Orca.
- [ ] Eduardo invita a los 5 al repo con permiso de escritura.
- [ ] Se crea el tablero de Projects con las 5 columnas y las etiquetas.
- [ ] **Prueba de fuego:** cada quien hace un commit trivial y lo sube.

### Gate G2
> ¿Los 5 pueden hacer push a una rama propia?

Si alguien no puede, se resuelve **ese día**. Un integrante que descubre el sábado que no tiene acceso es un integrante perdido.

---

## Fase F3 · Simulacro (11–12 de noviembre)

### Objetivo
Recorrer el flujo completo **con trabajo real pero no del producto**.

### La tarea de simulacro
Cada persona toma un issue pequeño de documentación, por ejemplo:

| Persona | Issue de simulacro |
|---|---|
| Eduardo | Escribir el guion del video en `docs/03-plan/` |
| Angel Marco | Documentar el wireframe en Figma y enlazarlo |
| Carlos De Jesús | Documentar 3 datasets de OSDR en `03-fuentes-datos.md` |
| Carlos Alberto | Escribir el script de verificación de enlaces |
| Ernesto | Definir el sistema de color y tipografía |

Cada uno pasa por: **issue → rama → worktree en Orca → commits → PR → revisión → merge**.

### Qué se mide (en serio, con reloj)

| Métrica | Objetivo | Si falla… |
|---|---|---|
| Tiempo de issue a PR | < 2 h | Los issues son demasiado grandes |
| Tiempo de revisión | < 15 min | Alguien no está mirando el repo |
| Conflictos de merge | 0 | Las reglas de "un archivo, un dueño" no se respetan |
| Alguien bloqueado > 30 min | 0 | Falta documentación o acceso |

### Gate G3
> ¿El flujo completo funcionó sin que nadie se quedara trabado?

Si alguien se trabó más de 30 minutos en algo del **flujo** (no del contenido), se arregla ese día. El sábado no hay tiempo para descubrir que git no funciona.

---

## Día D · Viernes 13 de noviembre

### Objetivo
Absorber lo oficial y congelar.

### Cronograma del día

| Hora | Acción |
|---|---|
| 09:00 | Abrir la pestaña Resources del reto. **Todos a la vez.** |
| 09:30 | Clasificar cada recurso: útil / redundante / descartado |
| 10:30 | Actualizar `03-fuentes-datos.md` |
| 11:30 | **Decisión:** ¿cambia el plan de datos? Sí/No, en 30 min |
| 12:30 | Ajustar `03-alcance-producto.md` si hace falta |
| 14:00 | Repartir issues del hackathon en el tablero |
| 16:00 | Cada quien revisa sus 2 issues del sábado y pregunta dudas |
| 18:00 | **Congelar `TECH-STACK.md`** |
| 20:00 | Confirmar logística: quién lleva qué, hora de llegada |
| 21:00 | Dormir. En serio. |

### Gate G4 (final)
> ¿Todo el equipo sabe qué hace el sábado a las 11:15?

Si alguien responde "no sé", se le asigna un issue concreto ahí mismo.

---

## Matriz de decisión de roles

Se aplica cuando lleguen las respuestas de F1. Se lee de arriba hacia abajo; **la primera fila que aplique, gana**.

| Escenario | Decisión |
|---|---|
| ≥2 personas con React/Next | Stack completo de `TECH-STACK.md`. Se divide frontend por pantallas. |
| 1 persona con React + 1 con HTML/CSS | Esa persona hace el núcleo; la otra hace pantallas estáticas que se integran. |
| 0 personas con React | **Se baja a HTML + CSS + JavaScript vanilla.** Se sacrifica el mapa corporal. |
| 0 personas con JS pero sí con Python | Se considera Streamlit. **Solo si el equipo lo aprueba en 15 min.** |
| Alguien con medicina/biología | Esa persona es **revisor de sanidad**: aprueba todos los textos clínicos. |
| Alguien con video/edición | Ernesto absorbe el video completo y no toca código. |
| Nadie con video | Se graba con OBS y se edita en CapCut con plantilla. |
| Nadie con diseño | Se usa un sistema prehecho (shadcn + paleta NASA) y se invierte el tiempo en datos. |

---

## Contingencias

### Si solo 3 personas pueden trabajar de verdad

**Se recorta el alcance a la mitad, el sábado a las 11:15, no después.**

| Se conserva | Se descarta |
|---|---|
| 5 indicadores | Mapa corporal |
| 1 protocolo de emergencia | Protocolos 2 y 3 |
| Offline | Gráficas |
| Video | Copiloto SI |

### Si nadie del equipo sabe git

- Carlos Alberto hace un **taller de 40 minutos** el 9 de noviembre.
- Se simplifica: **una sola rama por persona durante todo el hackathon** (`work/<usuario>`), sin ramas por tarea.
- Se acepta el riesgo de conflictos y se compensa con la regla "un archivo, un dueño".

### Si alguien no tiene laptop o la tiene muy limitada

- Se le asigna trabajo **que no requiere build**: documentación, contenido clínico, guion, investigación, revisión.
- Su código lo corre otra persona.
- **Nunca se le deja sin tarea.** Un integrante sin tarea se desconecta.

### Si alguien desaparece el fin de semana

- El respaldo definido en `02-roles-asignacion.md` toma el rol.
- Se recorta su parte del alcance sin intentar cubrirla.
- No se le espera. El envío a las 17:00 no se mueve.

### Si el internet del venue es malo o nulo

- Ya está previsto: offline-first.
- El repo se pushea desde el celular con datos móviles.
- El video se sube comprimido o se entrega por enlace a Drive.
- **Confirmar con el Local Lead antes del 12.**

### Si los recursos oficiales del 13 contradicen la investigación

- **Mandan los oficiales.** Se actualiza `03-fuentes-datos.md` y se anota en `MEMORY.md`.
- No se discute: se ajusta y se sigue.
- Si el recurso oficial es peor que nuestro plan B, se usan **ambos** y se dice en el pitch.

### Si el equipo se pelea por el alcance

- Decide Eduardo en 5 minutos, sin votación.
- La decisión se escribe en `MEMORY.md`.
- **No se reabre.** Discutir dos veces la misma decisión es el mayor consumidor de tiempo en un hackathon.

### Si el viernes 13 nadie ha hecho el simulacro

- Se salta F3 y se pasa directo a F4.
- Se acepta que el sábado se aprenderá el flujo sobre la marcha.
- **Se refuerza el rol de Carlos Alberto** como soporte de git en vivo.

---

## Diagrama de dependencias

```
F0 estructura ──► F1 perfiles ──► F2 entornos ──► F3 simulacro ──► F4 recursos
     │                 │                │                │               │
     ▼                 ▼                ▼                ▼               ▼
  repo listo       roles con       5 máquinas       flujo probado    alcance
  y documentado    evidencia        operativas       sin bloqueos     congelado
```

**Ninguna fase puede empezar antes de que la anterior tenga su gate pasado.** Si una se atrasa, se recorta la siguiente, no se solapan.

---

## Lo que se decide el 13 (y solo el 13)

| Decisión | Por qué esperar |
|---|---|
| Qué datasets se usan | Depende de los recursos oficiales |
| Si se cambia algún indicador | Depende de qué datos haya |
| Versión final del alcance | Depende de lo anterior |
| Asignación final de issues del sábado | Depende de todo lo anterior |

**Todo lo demás ya está decidido.** Eso es lo que permite que el 14 a las 11:15 se trabaje y no se discuta.

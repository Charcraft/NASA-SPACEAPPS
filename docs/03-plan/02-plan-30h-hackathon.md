# 03.2 · Plan del hackathon (calibrado al envío de las 17:00)

> ⚠️ **Este es el documento más importante del repo.**
> La mayoría de equipos planea para 48 horas. Aquí el plazo real es de **~30 horas**, y con dos bloques de sueño en medio.

---

## 1. La corrección que cambia todo

| Suposición común | Realidad en Tuxtla Gutiérrez |
|---|---|
| Entrega domingo 23:59 | **Entrega domingo 17:00** |
| 48 horas de desarrollo | **≈29 h 45 min desde el kickoff**, menos comidas y sueño |
| Hay margen para pulir al final | El pitch de semifinalistas empieza **17:30**, 30 min después |

[Fuente: Local Event Schedule — NASA Space Apps Tuxtla Gutiérrez — https://www.spaceappschallenge.org/2026/local-events/tuxtla-gutierrez/ — consultado 2026-11-06]

### Horario oficial del evento

**Sábado 14**
| Hora | Actividad |
|---|---|
| 09:00 | Registro y desayuno |
| 09:30 | Bienvenida e inauguración |
| 10:00 | Conferencia |
| 11:00 | Kick Off |
| **11:15** | **Inicia el hacking** |
| 15:00 | Comida |
| 16:00 | Más hacking |
| 18:00 | Mentorías |
| 20:00 | Cena |
| 21:00 | Break |
| 00:00 | Hacking |
| 03:00 | Snack |
| 04:00 | Hacking |

**Domingo 15**
| Hora | Actividad |
|---|---|
| 08:00 | Desayuno |
| 09:00 | Kick Off |
| 09:15 | Conferencia |
| 10:00 | Hacking |
| 15:00 | "A comer o terminar" |
| **17:00** | **Envío de proyectos y entrega de presentación** |
| 17:30 | Semifinalistas locales |
| 19:00 | Pitch de finalistas |
| 19:20 | Conferencia magistral |
| 20:00 | Premiación y cierre |

---

## 2. Presupuesto de tiempo real

```
Sábado  11:15 → 24:00 ........ 12 h 45 min
Domingo 00:00 → 08:00 ........  8 h 00 min   (turno nocturno parcial)
Domingo 10:00 → 17:00 ........  7 h 00 min
────────────────────────────────────────────
Tiempo bruto ................. 27 h 45 min
Menos comidas (2 h) .......... 25 h 45 min
Menos sueño (6 h por persona)  19 h 45 min efectivas
```

**Conclusión:** 5 personas × ~20 h efectivas = **~100 horas-persona**. Eso es todo lo que hay. Cada funcionalidad debe justificarse contra ese presupuesto.

---

## 3. Los 5 gates de decisión

Un *gate* es un punto donde se decide sí o no. Se respeta aunque duela.

| Gate | Cuándo | Pregunta | Si la respuesta es NO |
|---|---|---|---|
| **G1 — Alcance congelado** | Sáb 12:00 | ¿Tenemos los 8 indicadores y los 3 protocolos definidos? | Se recorta a 5 y 1 |
| **G2 — Esqueleto vivo** | Sáb 18:00 | ¿La app corre y navega entre pantallas? | Se abandona el mapa corporal |
| **G3 — Núcleo funcional** | Dom 01:00 | ¿El semáforo evalúa datos reales? | Se abandonan gráficas y gamificación |
| **G4 — Congelamiento de features** | Dom 12:00 | ¿Todo lo que está, funciona? | Nada nuevo entra |
| **G5 — Envío** | Dom 16:30 | ¿Está subido el formulario? | Se envía lo que haya, sin pulir |

> **Regla de oro:** a partir del G4, **solo se arregla, no se agrega**. Un equipo que agrega funciones a las 15:00 del domingo no entrega.

---

## 4. Cronograma hora por hora

### Sábado 14

| Hora | Actividad | Responsable | Salida |
|---|---|---|---|
| 09:00–11:00 | Registro, bienvenida, conferencia, kickoff | Todos | — |
| 11:00–11:15 | **Reunión de arranque de 15 min**: repasar roles y G1 | Owner | Roles confirmados |
| 11:15–12:00 | Definir en la pared/FigJam: 8 indicadores, 3 protocolos, 6 pantallas. **Escribir el "no haremos"** | Todos | **G1** ✅ |
| 12:00–13:00 | Setup técnico: clonar, `pnpm install`, primer commit público, deploy vacío en Vercel | Dev lead | URL viva |
| 13:00–15:00 | Pantallas 1 y 2: dashboard y mapa corporal con datos mock | Frontend + Diseño | Navegable |
| 15:00–16:00 | Comida | — | — |
| 16:00–18:00 | Motor de reglas (función pura) + tarjeta de semáforo | Dev + Datos | `triage.test.ts` pasando |
| **18:00** | **G2** — ¿la app corre y navega? | Todos | Decisión |
| 18:00–20:00 | Mentorías: **mostrar lo que hay y preguntar**. Los mentores son el recurso más subestimado del evento | 2 personas | Feedback escrito |
| 20:00–21:00 | Cena | — | — |
| 21:00–24:00 | Asistente de medición guiada + primera gráfica de tendencia con datos reales | Frontend + Datos | Flujo completo de 1 indicador |

> **Turno nocturno:** no trabaja todo el equipo. Se turnan 2 personas despiertas de 00:00 a 04:00 y el resto duerme. Un equipo agotado a las 10:00 del domingo pierde el pitch.

### Domingo 15

| Hora | Actividad | Responsable | Salida |
|---|---|---|---|
| 00:00–03:00 | Turno A: protocolo de emergencia #1 (dolor torácico) completo | 2 personas | Protocolo funcional |
| 03:00–04:00 | Snack + cambio de turno | — | — |
| 04:00–08:00 | Turno B: protocolos #2 y #3 + pull de datos OSDR | 2 personas | 3 protocolos |
| 08:00–09:00 | Desayuno + **revisión de estado de 15 min** | Todos | Prioridades del día |
| **08:30** | **G3** — ¿el semáforo evalúa datos reales? | Todos | Decisión |
| 09:00–10:00 | Kick Off y conferencia (aprovechar para descansar la vista) | — | — |
| 10:00–12:00 | Integración: unir todo, arreglar lo roto, estados vacíos y de error | Todos | App coherente |
| **12:00** | **G4 — congelamiento de features** | Todos | Solo bugs de aquí en adelante |
| 12:00–13:30 | **Grabar el video de 30 s** (guion ya escrito el viernes) | Diseño + Owner | Video exportado |
| 13:30–14:30 | Ensayo del pitch de 3 min, dos veces | Todos | Guion memorizado |
| 14:30–15:00 | Comida | — | — |
| 15:00–16:00 | README en inglés + campos del formulario + declaración SI | Dev + Datos | Repo presentable |
| 16:00–16:30 | **Subir el submission** con 1 hora de margen | Owner | Confirmación en pantalla |
| **16:30** | **G5** — enviado | Todos | ✅ |
| 17:00 | Envío oficial local cierra | — | — |
| 17:30–19:00 | Semifinalistas locales | Owner + 1 | Pitch |
| 19:00–20:00 | Finalistas y premiación | Todos | — |
| 21:00–23:00 | **Ventana de reenvío opcional.** Solo mejoras sin riesgo. Nunca empeorar lo enviado | Owner + 1 | Envío 2 |

---

## 5. Reglas de trabajo durante el evento

1. **Sync de 15 minutos cada 4 horas.** De pie, de uno en uno: qué hice, qué sigue, qué me bloquea.
2. **Todo se commitea cada hora.** Un portátil que se muere a las 03:00 no se lleva el trabajo.
3. **Nadie trabaja más de 4 horas seguidas sin levantarse.** El código malo se escribe cansado.
4. **Si algo lleva más de 45 minutos sin avanzar, se pide ayuda o se descarta.**
5. **Los mentores se usan a las 18:00 y a las 10:00**, no al final.
6. **El video y el submission no son negociables.** Se hacen aunque la app esté a medias.

---

## 6. Escenarios de recorte

Si el sábado a las 18:00 (G2) el equipo va retrasado, se aplica este orden de recorte:

| Se recorta primero | Se conserva siempre |
|---|---|
| 3. Gamificación y rachas | 1. Mapa corporal |
| 4. Gráficas de tendencia | 2. Semáforo clínico |
| 5. Perfiles de entorno | 3. Un protocolo de emergencia completo |
| 6. Copiloto SI | 4. Funcionamiento offline |
| 7. Indicadores 6–8 | 5. Video de 30 s y submission |

**La regla:** mejor una app pequeña que se ve impresionante que una app enorme que no abre.

---

## 7. Qué hace que ganemos el pitch de las 17:30

Los jueces locales ven muchos dashboards. Lo que se recuerda:

1. **Una historia de 20 segundos**: el compañero que colapsa.
2. **Una demo en vivo de 90 segundos** que funcione sin internet.
3. **Una frase que nadie más pueda decir.** Ejemplo:
   > "Cada umbral de esta app viene de datos de vuelo publicados por NASA, y cada decisión se puede rastrear hasta su fuente."
4. **Reconocer una limitación con seguridad.** Ejemplo:
   > "No diagnosticamos. Le damos a la tripulación lo que necesita para decidir y para que el cirujano de vuelo decida mejor."

Ese último punto es contraintuitivo y es el que más credibilidad genera.

# 03.4 · Riesgos y mitigación

> Un riesgo que no está escrito es un riesgo que te va a sorprender.
> Se revisa en cada sync de 15 minutos.

---

## Matriz de riesgos

**Probabilidad** (P): 1 = improbable · 2 = posible · 3 = probable
**Impacto** (I): 1 = molesto · 2 = grave · 3 = fatal para el proyecto
**Score** = P × I

| # | Riesgo | P | I | Score | Mitigación |
|---|---|---|---|---|---|
| R1 | **El envío es a las 17:00 y el equipo planea para medianoche** | 3 | 3 | **9** | Ya corregido: `02-plan-30h-hackathon.md` con G5 a las 16:30 |
| R2 | Los recursos oficiales del reto decepcionan o no llegan | 2 | 3 | 6 | Plan B listo con OSDR/LSDA desde el día 1 |
| R3 | Sin internet en el venue | 2 | 3 | 6 | Offline-first + `node_modules` en USB + datasets descargados |
| R4 | Scope creep: se agregan funciones el domingo | 3 | 3 | **9** | Gate G4 a las 12:00. Después, solo bugs |
| R5 | No se graba el video a tiempo | 3 | 3 | **9** | Guion escrito el miércoles; grabación fija a las 12:00 del domingo |
| R6 | Un umbral clínico está mal y un juez lo detecta | 2 | 3 | 6 | Toda cifra con fuente o marcada como supuesto visible |
| R7 | El equipo se agota en la madrugada | 3 | 2 | 6 | Turnos rotativos; nadie trabaja más de 4 h seguidas |
| R8 | Falla una laptop o se pierde trabajo | 2 | 3 | 6 | Commit cada hora; repo público; respaldo en la nube |
| R9 | Un integrante no puede asistir | 2 | 2 | 4 | Roles con respaldo cruzado (cada rol tiene un suplente) |
| R10 | La app no funciona en el proyector del venue | 2 | 3 | 6 | Probar el build en el proyector antes del pitch; tener video de respaldo |
| R11 | Se descubre que alguien trabajó antes del evento | 1 | 3 | 3 | Regla explícita en `AGENTS.md`; historial de commits limpio |
| R12 | La declaración de SI se redacta mal o se olvida | 2 | 2 | 4 | Borrador el miércoles; plantilla en `docs/05-ia/04-*` |
| R13 | El equipo no se pone de acuerdo en el alcance | 2 | 2 | 4 | G1 a las 12:00 del sábado: decide el owner, no el consenso |
| R14 | La librería de gráficas falla con datos vacíos | 2 | 1 | 2 | Componente con estado vacío desde el inicio |
| R15 | Nadie del equipo sabe medicina y se nota | 2 | 2 | 4 | Lenguaje de "criterio para revisión", nunca diagnóstico |

---

## Los 3 riesgos que hay que vigilar de verdad

### R1 · La trampa de las 17:00 — score 9
Es el error que hunde a los equipos en este Local Event específicamente. La FAQ global dice 23:59. El evento local cierra a las 17:00.
**Señal de alarma:** alguien dice "todavía tenemos toda la noche del domingo".
**Acción:** mostrarle este documento.

### R4 · Scope creep — score 9
Siempre empieza igual: "es que solo falta una cosita".
**Señal de alarma:** una feature nueva después de las 12:00 del domingo.
**Acción:** se anota en una lista de "v2" y no se toca.

### R5 · El video — score 9
Es lo que el jurado global ve. Una app mediocre con un video excelente avanza; una app excelente con un video malo no.
**Señal de alarma:** son las 13:00 del domingo y no hay video.
**Acción:** se para todo lo demás. Se graba.

---

## Plan de contingencia por escenario

### Si a las 18:00 del sábado (G2) no hay app navegable
- Se abandona el mapa corporal.
- Se recorta a 4 indicadores.
- Se mantiene: semáforo + 1 protocolo + offline.
- La app pasa a ser de una sola columna, tres pantallas.

### Si a las 08:30 del domingo (G3) el motor de reglas no evalúa datos
- Se reemplaza por una tabla de decisión estática en JSON.
- Se pierde flexibilidad, no se pierde la demo.

### Si el venue se queda sin internet el domingo
- La app funciona (offline-first).
- El submission se sube desde el celular con datos móviles. **Confirmar que alguien tenga plan de datos.**
- El repo ya está pusheado.

### Si alguien se enferma o no llega
- El owner absorbe el rol crítico.
- Se recorta a Must have.
- **No se intenta cubrir todo con menos gente.**

### Si el proyector no acepta el HDMI de nadie
- Video pregrabado de la demo en el celular.
- Presentación en PDF con capturas.

---

## Riesgos que NO son riesgos (y conviene decir en voz alta)

| Preocupación | Por qué no lo es |
|---|---|
| "No somos médicos" | El reto no pide diagnóstico; pide criterio y guía. Además, los jueces valoran la honestidad. |
| "No tenemos backend" | El astronauta a Marte no tiene backend tampoco. Es una decisión, no una carencia. |
| "Cinco personas es poco" | El equipo promedio es de 3. Cinco con roles claros es una ventaja. |
| "Es un hackathon, no hace falta pulir" | El video de 60 s es literalmente el entregable. Sí hace falta. |

---

## Revisión

Este documento se revisa:
- El **jueves 12** (antes del evento).
- En cada **sync de 15 minutos** durante el hackathon.
- Al cerrar el domingo, para el post-mortem.

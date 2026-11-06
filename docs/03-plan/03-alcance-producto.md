# 03.3 · Alcance del producto

> Qué construimos exactamente, qué no, y por qué eso gana.

---

## 1. La idea en una frase

> **Una herramienta de salud de tripulación que convierte "me siento raro" en una decisión accionable — y que funciona cuando no hay nadie al otro lado de la línea.**

### Nombre del producto (propuesta, el equipo decide)

| Opción | Significado | Comentario |
|---|---|---|
| **AEGIS** ⭐ recomendado | El escudo de Zeus; protección | Corto, pronunciable en inglés y español, evoca protección sin sonar clínico |
| **VITALIS** | De *vital* | Claro pero genérico |
| **BITÁCORA** | Registro de a bordo | Muy bonito en español, pierde fuerza en inglés |

**Tagline:** *"Crew health autonomy, offline."*

---

## 2. Las dos experiencias

### Modo Rutina — "todo está bien, pero quiero saberlo"

El astronauta entra, ve su estado, mide lo que toca hoy, y sigue con su jornada en menos de 3 minutos.

- Tarjetas por sistema con semáforo.
- Mapa corporal clicable.
- Recordatorio de la medición del día.
- Tendencia de cada indicador contra su propia línea base.

### Modo Emergencia — "algo está mal ahora"

Alguien tiene dolor en el pecho. La app deja de ser un dashboard y se convierte en un protocolo.

- Detección: cualquier rojo activa el modo.
- Pantalla única, letra grande, un paso a la vez.
- Cronómetro visible y metrónomo de RCP si aplica.
- Registro automático de lo que se hizo y cuándo, para el reporte al cirujano de vuelo.
- Botón de "no sé qué hacer" → árbol de decisión con preguntas cerradas.

---

## 3. Las 6 pantallas

| # | Pantalla | Qué resuelve | Prioridad |
|---|---|---|---|
| 1 | **Dashboard de tripulación** | Estado general de un vistazo | Must |
| 2 | **Mapa corporal** | Explorar por sistema; enseñar anatomía funcional | Should |
| 3 | **Asistente de medición** | Cómo se mide, por qué importa, qué significa el resultado | Must |
| 4 | **Tarjeta de resultado** | Semáforo + razón + acción + fuente | Must |
| 5 | **Selector de emergencia** | Elegir el protocolo correcto rápido | Must |
| 6 | **Protocolo activo** | Guía paso a paso bajo estrés | Must |

---

## 4. Priorización MoSCoW

### Must have (sin esto no hay proyecto)
- [ ] Motor de triage con 5 indicadores mínimo.
- [ ] Semáforo con razón, acción y fuente visibles.
- [ ] Asistente de medición guiada para esos indicadores.
- [ ] Un protocolo de emergencia completo (dolor torácico).
- [ ] Funcionamiento offline real.
- [ ] README con arquitectura, datasets y declaración de SI.
- [ ] Video de 60 segundos.

### Should have (marca la diferencia)
- [ ] Mapa corporal interactivo.
- [ ] Gráfica de tendencia contra línea base personal.
- [ ] 3 protocolos de emergencia.
- [ ] 8 indicadores.
- [ ] Registro de eventos exportable (para el reporte a Tierra).
- [ ] Perfiles de entorno (ISS / tránsito / base lunar).

### Could have (si sobra tiempo)
- [ ] Copiloto SI con explicaciones y citas.
- [ ] Gamificación: racha de días cumpliendo la rutina.
- [ ] Prueba de tiempo de reacción.
- [ ] Captura de imagen para lesiones de piel.
- [ ] Modo oscuro/claro.

### Won't have (se dice explícitamente en el pitch)
- ❌ Diagnóstico automático.
- ❌ Recomendación de fármacos o dosis.
- ❌ Backend multiusuario y autenticación.
- ❌ Integración con hardware médico real.
- ❌ Modelo de IA entrenado con datos de astronautas.

> Decir lo que **no** haces, con seguridad, es una señal de madurez. Los jueces lo notan.

---

## 5. Los 3 protocolos de emergencia

| Protocolo | Por qué este primero |
|---|---|
| **Dolor torácico** | Es literalmente la escena del video del reto |
| **Hipoxia / fallo de oxígeno** | Es el riesgo más mortal en un ambiente cerrado y el más "espacial" |
| **Anafilaxia / reacción alérgica** | Cubre el peligro de ambiente hostil y justifica la entrada por cámara |

### Estructura de cada protocolo
1. **Reconocer** — 3 preguntas cerradas ("¿puede hablar? ¿respira? ¿dónde duele?").
2. **Estabilizar** — acciones inmediatas, una por pantalla.
3. **Registrar** — hora, signos, decisiones.
4. **Escalar** — qué empaquetar para el cirujano de vuelo y con qué prioridad.
5. **Reevaluar** — cada N minutos, con cronómetro.

---

## 6. Lo que hace única a esta propuesta

| Lo obvio | Lo nuestro |
|---|---|
| Un dashboard bonito | Un dashboard **y** un protocolo de crisis en la misma app |
| Rangos poblacionales | **Línea base personal** del tripulante |
| Necesita internet | **Funciona sin conexión**, con datos reales pre-cargados |
| Inventa los números | **Rastrea** cada umbral hasta su fuente |
| Dice "consulta a un médico" | Dice **qué hacer ahora** y **qué mandarle a Tierra** |
| Una app de salud | Un argumento: **la autonomía médica es la última frontera del viaje a Marte** |

---

## 7. Guion de la demo en vivo (90 segundos)

Para el pitch de las 17:30.

| t | Acción | Qué se dice |
|---|---|---|
| 0:00 | Pantalla del dashboard | "Esta es la tripulación. Todo verde. Un día normal." |
| 0:10 | Clic en "Registrar síntoma" → dolor torácico | "Pero un día no lo es." |
| 0:20 | La app pasa a modo emergencia, pregunta 1 | "No hay médico. Hay una app que pregunta lo correcto." |
| 0:35 | Paso 2: estabilizar, cronómetro corriendo | "Un paso a la vez. Letra grande. Sin jerga." |
| 0:50 | Registro automático del evento | "Todo queda registrado para el cirujano de vuelo, que lo verá en 22 minutos." |
| 1:00 | **Apagar el WiFi** | "Y esto funciona sin conexión." |
| 1:10 | Volver al dashboard, mostrar tendencia con datos OSDR | "Cada umbral viene de datos de vuelo de NASA. Cada número se puede rastrear." |
| 1:25 | Cierre | "No diagnosticamos. Devolvemos a la tripulación la capacidad de decidir." |

**El momento del WiFi apagado es el que gana el pitch.** Ensayarlo.

---

## 8. Criterio de éxito

| Nivel | Definición |
|---|---|
| Entregado | App abre, 5 indicadores, 1 protocolo, video, repo público |
| Bueno | + mapa corporal, 3 protocolos, datos OSDR, offline verificado |
| Excelente | + narrativa impecable, pitch ensayado, limitaciones reconocidas, **nominación local** |
| Histórico | Premio global en Best Use of Data o Galactic Impact |

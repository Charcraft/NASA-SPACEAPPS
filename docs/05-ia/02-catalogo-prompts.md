# 05.2 · Catálogo de prompts

> Prompts reutilizables, versionados y con formato de salida definido.
> **Regla:** si un prompt se usa más de una vez, se guarda aquí. Los prompts se copian y pegan; no se reescriben desde cero cada vez.

---

## Cómo usar este catálogo

Cada prompt tiene:
- **ID** para referenciarlo en el registro.
- **Propósito** y cuándo usarlo.
- **Variables** entre `{{ }}` que se reemplazan.
- **Formato de salida esperado**.
- **Nivel de revisión** (🟢 libre / 🟡 requiere segunda persona).

Al usarlo, se anota en `03-registro-uso-ia.md` con su ID.

---

## P01 · Extraer requisitos de un documento oficial

**Uso:** convertir un texto largo de NASA o del reto en requisitos accionables.
**Revisión:** 🟢

```
Actúa como analista de requisitos.

DOCUMENTO:
{{texto del documento}}

Extrae TODOS los requisitos explícitos e implícitos y devuélvelos como tabla Markdown con estas columnas:
| # | Requisito | Tipo (funcional/no funcional) | Cita textual del documento | Prioridad (must/should/could) |

Reglas:
- Solo requisitos que el documento sostenga. Si infieres uno, márcalo como [INFERENCIA].
- La columna "cita textual" debe ser una frase literal del documento, no un resumen.
- No agregues requisitos que el documento no mencione.
- Si un requisito es ambiguo, añade una fila al final titulada "AMBIGÜEDADES".
```

---

## P02 · Contrastar una afirmación contra fuentes

**Uso:** antes de poner cualquier cifra en la app o en el documento.
**Revisión:** 🟡

```
Voy a darte una afirmación sobre fisiología humana en vuelo espacial.

AFIRMACIÓN:
{{afirmación}}

Responde EXACTAMENTE con esta estructura:

1. VEREDICTO: [RESPALDADA / PARCIALMENTE RESPALDADA / NO RESPALDADA / NO VERIFICABLE]
2. FUENTE PRIMARIA: si conoces una, cita título, organización y URL. Si no estás seguro de la URL, escribe "URL NO CONFIRMADA".
3. QUÉ DIRÍA LA EVIDENCIA: en 2 frases máximo.
4. QUÉ FALTA: qué habría que consultar para confirmarlo.
5. RIESGO DE ERROR: alto / medio / bajo, y por qué.

No inventes citas. Si no sabes, di "no tengo una fuente verificable para esto".
```

> ⚠️ El punto 2 casi siempre requiere verificación humana. Una URL inventada es el error más común de la IA.

---

## P03 · Escribir el texto "cómo se mide" para la app

**Uso:** generar el texto instructivo de un indicador.
**Revisión:** 🟡

```
Escribe las instrucciones para que un astronauta NO médico mida {{indicador}} a bordo.

Contexto: está en microgravedad, con poco tiempo, posiblemente estresado, y la pantalla puede reflejar luz.

Requisitos del texto:
- Máximo 5 pasos numerados.
- Cada paso: una acción física concreta, en imperativo.
- Lenguaje de secundaria. Cero jerga médica.
- Incluye una advertencia si un error de técnica da un valor falso.
- Incluye qué hacer si no puede completar la medición.

Devuelve:
PASOS:
1. ...
ADVERTENCIA:
SI NO PUEDE MEDIR:
```

---

## P04 · Redactar el texto "por qué importa"

**Uso:** explicar el indicador en 2 frases.
**Revisión:** 🟡

```
Explica por qué un astronauta debería importarse de medir {{indicador}}.

Público: tripulante sin formación médica.
Restricción: 2 frases, máximo 40 palabras en total.
Debe conectar con uno de estos peligros: radiación / aislamiento / distancia de la Tierra / gravedad / ambiente cerrado.

Devuelve solo el texto, sin preámbulo. Al final, entre corchetes, el peligro elegido.
```

---

## P05 · Diseñar un árbol de decisión de emergencia

**Uso:** construir la lógica de un protocolo.
**Revisión:** 🟡 (crítico)

```
Diseña un árbol de decisión para un protocolo de emergencia médica a bordo.

ESCENARIO: {{escenario, ej. dolor torácico en microgravedad}}
TRIPULANTE: no médico, sin apoyo de Tierra en tiempo real (retardo de hasta 22 min).

Devuelve en este formato:

PREGUNTA 1
- Texto de la pregunta (cerrada, respuesta sí/no o múltiple)
- Si SÍ → siguiente nodo
- Si NO → siguiente nodo

... (máximo 5 preguntas antes de una acción)

ACCIONES INMEDIATAS
- Lista numerada de acciones físicas.

SEÑALES DE ESCALADA
- Qué debe empaquetarse para el cirujano de vuelo.

CRITERIOS DE REEVALUACIÓN
- Cada cuántos minutos y qué se vuelve a medir.

Advertencias:
- No recomiendes fármacos ni dosis.
- No emitas diagnósticos.
- Marca con [POR VALIDAR] cualquier criterio clínico que no puedas respaldar con una fuente.
```

---

## P06 · Generar el componente React de una tarjeta

**Uso:** acelerar UI.
**Revisión:** 🟢 (código se prueba)

```
Genera un componente React con TypeScript y Tailwind para una tarjeta de indicador de salud.

Props:
- nombre: string
- valor: number
- unidad: string
- nivel: 'verde' | 'amarillo' | 'rojo'
- razon: string
- accion: string
- fuente: string
- onMedir: () => void

Requisitos:
- El nivel NO debe comunicarse solo con color: añade icono y texto.
- Debe incluir un enlace "¿de dónde sale esto?" que muestre la fuente.
- Debe tener estado vacío (sin medición) y estado de error.
- Contraste AA mínimo.
- Sin dependencias fuera de React y Tailwind.

Devuelve solo el archivo completo, sin explicación.
```

---

## P07 · Escribir tests del motor de triage

**Uso:** asegurar que las reglas no se rompen.
**Revisión:** 🟢

```
Escribe tests con Vitest para esta función pura:

{{código de evaluateIndicator}}

Casos que debe cubrir:
- Valor claramente normal → verde
- Valor en zona intermedia → amarillo
- Valor crítico → rojo
- Valor exactamente en el límite (ambos lados)
- Valor faltante o no numérico → error controlado
- Cambio brusco respecto al baseline aunque el valor absoluto sea normal

Devuelve solo el archivo de test. Nombra cada test en español, describiendo el escenario.
```

---

## P08 · Revisar un documento contra las reglas del repo

**Uso:** control de calidad documental.
**Revisión:** 🟢

```
Revisa este documento contra las reglas del proyecto.

REGLAS:
1. Español, con términos oficiales en inglés cuando corresponda.
2. Un solo H1.
3. Toda cifra de salud necesita fuente.
4. Las etiquetas [POR VALIDAR], [INFERENCIA], [SUPUESTO] deben usarse correctamente.
5. Nada de párrafos de más de 5 líneas.

DOCUMENTO:
{{texto}}

Devuelve una tabla:
| Línea | Problema | Regla violada | Corrección sugerida |

Si no hay problemas, responde "SIN HALLAZGOS".
```

---

## P09 · Guion del video de 60 segundos

**Uso:** convertir el alcance en un guion.
**Revisión:** 🟡

```
Escribe un guion de 60 segundos para un video de hackathon.

PRODUCTO: {{descripción en 3 frases}}
INSIGHT CENTRAL: {{la idea que debe quedar}}

Formato de salida: tabla con
| Tiempo | Plano visual | Texto en pantalla | Voz en off |

Reglas:
- Empezar con una escena humana, no con una feature.
- Un solo concepto por bloque.
- Máximo 25 palabras de voz en off por cada 10 segundos.
- Terminar con una frase que el jurado pueda repetir de memoria.
- Nada de "revolucionario", "innovador", "sinergia".
```

---

## P10 · Preparar respuestas a preguntas difíciles del jurado

**Uso:** antes del pitch.
**Revisión:** 🟡

```
Somos un equipo de 5 personas que en ~30 horas construyó: {{resumen del producto}}.

Genera las 15 preguntas más difíciles que un juez técnico podría hacer, y para cada una:
- La pregunta.
- Por qué es difícil.
- Una respuesta honesta de máximo 3 frases.
- Qué NO decir.

Incluye al menos 4 preguntas sobre:
- Validez médica y responsabilidad.
- Uso de datos de NASA.
- Qué no alcanzaron a hacer.
- Uso de IA.
```

---

## P11 · Depurar un error de build

**Uso:** salir de un bloqueo técnico rápido.
**Revisión:** 🟢

```
Tengo este error:

{{mensaje de error completo}}

Contexto:
- Stack: {{stack}}
- Lo que estaba intentando: {{acción}}
- Lo que ya probé: {{intentos}}

Dame:
1. La causa más probable (1 frase).
2. Cómo verificarlo (1 comando).
3. La solución.
4. Si hay una segunda causa posible, cuál es.

No propongas reinstalar todo como primera opción.
```

---

## P12 · Revisión de accesibilidad en contexto extremo

**Uso:** validar la UI para un tripulante estresado.
**Revisión:** 🟡

```
Revisa este componente/pantalla para uso en contexto de emergencia espacial.

Condiciones: poca luz, pantalla con reflejo, usuario con estrés alto, posible guante, posible fatiga visual, riesgo de daltonismo.

Evalúa:
- Tamaño de objetivos táctiles (mínimo 48 px).
- Contraste.
- Dependencia del color.
- Carga cognitiva (¿cuántas decisiones simultáneas?).
- Claridad del siguiente paso.

Devuelve:
| Criterio | Estado | Problema | Corrección |
```

---

## Anti-patrones (nunca usar estos prompts)

| ❌ Mal prompt | Por qué falla | ✅ Mejor |
|---|---|---|
| "Hazme una app de salud para astronautas" | Demasiado abierto, resultado genérico | "Genera el componente X con estas props y estos estados" |
| "Dame los valores normales de presión arterial en el espacio" | Invita a alucinar cifras | "¿Tienes una fuente primaria para X? Si no, dilo" |
| "Escribe el README" | Sale relleno | "Resume estas 5 secciones con estos datos concretos" |
| "Corrige este código" | Sin contexto | "Este error ocurre al hacer X; ya probé Y" |
| "Hazme un video de 60 segundos" | No hay guion | Usar P09 con el insight definido |

---

## Versionado

| Fecha | Cambio |
|---|---|
| 2026-11-06 | v1.0 — catálogo inicial con 12 prompts |

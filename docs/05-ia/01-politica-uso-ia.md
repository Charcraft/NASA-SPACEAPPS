# 05.1 · Política de uso de IA (SI)

> **Contexto normativo:** desde la orden ejecutiva del 29 de septiembre de 2026, NASA usa el término **"Super Intelligence" (SI)** en lugar de "Artificial Intelligence" (AI). En el submission se usa **SI**.
> **Obligación:** el submission debe describir cómo se usaron herramientas de SI durante el desarrollo.

---

## 1. Postura del equipo

> **Usamos IA para acelerar el trabajo, no para sustituir el criterio.**
> Toda salida de IA pasa por revisión humana antes de llegar al producto, al video o al jurado.

No ocultamos el uso: lo documentamos. La transparencia es más valiosa que la apariencia de originalidad.

---

## 2. Principio rector: la IA no es una fuente

Una IA **puede** decir algo falso con total seguridad. Por eso:

| La IA sirve para | La IA **no** sirve para |
|---|---|
| Redactar, resumir, reformular | Ser la fuente de un dato clínico |
| Generar código y explicarlo | Decidir un umbral médico |
| Proponer estructuras y opciones | Citar literatura que "recuerda" |
| Traducir | Inventar un endpoint de API |
| Acelerar tareas repetitivas | Sustituir una prueba |

**Regla dura:** todo dato numérico de salud que aparezca en la app debe rastrearse a una fuente de `docs/02-investigacion/04-bibliografia.md`. Si la IA lo propuso, se verifica; si no se puede verificar, se marca `[SUPUESTO]` y se muestra como tal.

---

## 3. Clasificación de usos

### ✅ Permitido sin restricción
- Redacción y edición de documentación.
- Generación de código de UI (componentes, estilos, layouts).
- Explicación de errores y sugerencias de depuración.
- Traducción y adaptación de tono.
- Generación de datos **ficticios** claramente etiquetados como mock.
- Estructura de presentaciones y guiones.
- Tests unitarios.

### 🟡 Permitido con revisión obligatoria
- Código del motor de triage (reglas clínicas).
- Textos de la app que explican un indicador.
- Contenido del video y del pitch.
- Cualquier afirmación científica en el README.

**Revisión obligatoria significa:** una segunda persona lo lee y lo valida contra la fuente. Se firma en `03-registro-uso-ia.md`.

### ❌ Prohibido
- Usar IA para **inventar** umbrales clínicos, dosis, o nombres de fármacos.
- Pegar datos personales o identificables de alguien en un prompt (propio o de terceros).
- Generar citas bibliográficas sin verificar que existan.
- Presentar código generado sin entenderlo.
- Usar IA para **decidir** el alcance del producto (eso lo decide el equipo).
- Subir al repo credenciales, tokens o API keys vistas en un prompt.

---

## 4. Manejo de datos en prompts

| Dato | ¿Se puede pegar en un prompt? |
|---|---|
| Código del proyecto | ✅ Sí |
| Documentación pública de NASA | ✅ Sí |
| Datasets públicos de OSDR | ✅ Sí (son abiertos) |
| Nombres y correos del equipo | 🟡 Solo si es imprescindible |
| Datos de salud de una persona real | ❌ Nunca |
| Credenciales, API keys, tokens | ❌ Nunca |
| Información del Local Event no pública | 🟡 Con criterio |

**Si dudas, no lo pegues.** Describe el problema sin el dato.

---

## 5. Herramientas autorizadas

| Herramienta | Uso previsto | Estado |
|---|---|---|
| Asistente de código en el IDE | Autocompletado, refactor, tests | Autorizado |
| Modelo de chat (razonamiento) | Investigación, redacción, arquitectura | Autorizado |
| Generación de imágenes | Solo para mockups y placeholders | Autorizado con revisión |
| Agentes con acceso a archivos (OpenCode) | Documentación y scaffolding | Autorizado con revisión |
| Navegador automatizado (BrowserAct) | Consulta de fuentes oficiales | Autorizado |

> Cualquier herramienta nueva que se agregue durante el evento se registra aquí **antes** de usarse.

---

## 6. Flujo de validación

```
1. Se usa la IA
        ↓
2. Se registra en 03-registro-uso-ia.md
        ↓
3. Se marca el resultado:
   [VERIFICADO]  → hay fuente o prueba
   [POR VALIDAR] → falta comprobarlo
   [DESCARTADO]  → la IA se equivocó
        ↓
4. Segunda persona revisa (si es 🟡)
        ↓
5. Entra al producto
```

---

## 7. Responsabilidad

- **El equipo es responsable de todo lo que la IA produjo.** "Lo dijo la IA" no es una excusa válida ante el jurado.
- Si un juez pregunta "¿de dónde salió este umbral?", la respuesta debe ser una fuente, no una herramienta.
- Si se detecta un error generado por IA en el producto después de enviarlo, se corrige y se anota en el registro.

---

## 8. Registro obligatorio

Todo uso relevante se anota en [`03-registro-uso-ia.md`](03-registro-uso-ia.md) con:

- **Cuándo** (fecha y hora).
- **Quién** lo usó.
- **Qué herramienta** y qué modelo.
- **Para qué** (propósito concreto).
- **Qué se obtuvo** (resumen, no el output completo).
- **Cómo se validó** (fuente, prueba o revisión).
- **Estado** (`[VERIFICADO]`, `[POR VALIDAR]`, `[DESCARTADO]`).

Sin este registro, la declaración del submission queda vacía y se pierden puntos.

---

## 9. Formato de la declaración final

La declaración que exige Space Apps se redacta en [`04-declaracion-si-submission.md`](04-declaracion-si-submission.md) y responde:

1. **Qué herramientas** se usaron.
2. **Para qué** se usaron (por área: código, documentación, diseño, investigación).
3. **Qué se validó** y cómo.
4. **Qué NO se delegó** a la IA.

Debe ser honesta, específica y breve. Una declaración vaga se lee como una declaración escondida.

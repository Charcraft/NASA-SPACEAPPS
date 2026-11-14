# 09.2 · Formulario de reparto de trabajo

> **Archivo:** [`formulario-reparto.html`](formulario-reparto.html) — se abre con doble clic en cualquier navegador.
> No necesita internet, no envía nada a ningún servidor.

---

## Por qué existe

El sábado a las 11:15 el equipo tiene que empezar a producir, no a descubrirse. Este formulario convierte "¿quién hace qué?" en una decisión con datos, tomada **antes** del evento.

---

## Qué mide

Nueve dimensiones, cada una de 0 a 4:

| Dimensión | Qué evalúa |
|---|---|
| Frontend | HTML, CSS, React, Tailwind |
| Lógica y código | TypeScript, algoritmos, tests |
| Datos | CSV/JSON, APIs, análisis |
| Diseño | Figma, color, tipografía |
| Narrativa y video | Guion, edición, comunicación |
| Plataforma | Git, deploy, build, PWA |
| Salud / biología | Conocimiento de dominio |
| Herramientas de IA | Prompting, agentes, MCPs |
| Git y colaboración | Ramas, PRs, conflictos |

---

## Cómo se calcula el rol

Cada rol es una combinación ponderada de dimensiones:

| Rol | Pesos |
|---|---|
| **Frontend** | frontend ×3 · diseño ×1.5 · IA ×1 · git ×0.5 · lógica ×0.5 |
| **Lógica y reglas** | lógica ×3 · dominio ×1.5 · datos ×1 · git ×1 · IA ×0.5 |
| **Datos** | datos ×3 · lógica ×1 · IA ×1 · git ×0.5 · dominio ×0.5 |
| **Diseño y video** | diseño ×3 · narrativa ×2.5 · frontend ×1 · IA ×0.5 |
| **Plataforma** | plataforma ×3 · git ×1.5 · IA ×1 · lógica ×0.5 |

A eso se suma un **bonus por preferencia declarada**: +30 % si marcó ese rol como su primera opción, +18 % como segunda, +8 % como tercera.

La nota se normaliza a 0–100. El rol con mayor nota es el **principal**; el segundo es el **de respaldo**.

---

## Banderas automáticas

El formulario detecta condiciones que cambian la asignación:

| Bandera | Cuándo se activa | Qué implica |
|---|---|---|
| Revisor de sanidad | Salud ≥ 3 | Valida todos los textos clínicos |
| Textos en inglés | Inglés ≥ 3 | Responsable del submission y subtítulos |
| Soporte de agentes | IA ≥ 3 | Skills, MCPs y entornos del equipo |
| Necesita apoyo en inglés | Inglés ≤ 1 | Sus textos pasan por revisión |
| Disponibilidad baja | ≤ 5 h el sábado | Alcance corto asignado |
| Sin madrugada | No puede 00:00–06:00 | No entra al turno nocturno |
| Sin laptop | No tiene | Trabajo sin build: docs, guion, contenido |
| Llegada tarde | No llega 08:30 | Revisar logística con el Local Lead |

---

## Cómo se usa

1. Cada integrante abre el HTML y lo llena (8 minutos).
2. Pulsa **Calcular mi rol**.
3. Pulsa **Descargar JSON** o **Copiar resultado**.
4. Lo manda a Eduardo (WhatsApp del equipo: 967 135 4853).
5. Eduardo consolida los cinco y publica la asignación en `docs/04-equipo/02-roles-asignacion.md`.

---

## Reglas de interpretación

1. **La nota no manda sola.** Si alguien saca 55 en Frontend y 52 en Datos, pero quiere hacer Datos, va a Datos. La motivación vale más que 3 puntos.
2. **Nadie queda sin rol.** Si un perfil no encaja en los cinco, se le da un rol de soporte concreto (documentación clínica, guion, revisión de inglés).
3. **El rol de respaldo no es decorativo.** Si alguien falta, entra el respaldo sin discutir.
4. **Se revisa el viernes antes del evento.** Si dos perfiles chocan, decide el Product Lead.

---

## Versión Google Form

**Formulario publicado:** https://docs.google.com/forms/d/e/1FAIpQLSc9ru484FG9c5DJdTjkiPXC28nuYSz11ugFvlCfJ96gPDGHCA/viewform

- Cuenta: `charcraftycarlos@gmail.com`
- Estado: publicado, cualquiera con el enlace puede responder (verificado sin cookies)
- Editor: https://docs.google.com/forms/d/1TBsm5nE8IC7l4qWs9HduQ2CpmEWeLWs7suP4l6Q7lCM/edit
- Respuestas: pestaña **Respuestas** del editor, o vincular a una hoja de cálculo

### Diferencias con la versión HTML

| | HTML | Google Form |
|---|---|---|
| Calcula el rol | ✅ Automático | ❌ Manual |
| Exporta JSON | ✅ | ❌ |
| Se responde desde el celular | 🟡 Hay que enviar el archivo | ✅ Link directo |
| Funciona sin internet | ✅ | ❌ |

**Recomendación:** usar el Google Form para recolectar (es lo más fácil de compartir) y calcular el rol a mano con la tabla de pesos de este documento, o pasar las respuestas al HTML.

> Nota conocida: la última pregunta quedó con una errata menor ("que not este" en lugar de "que no este"). No afecta la respuesta.


# Bitácora de Carlos De Jesús Martínez Pineda

> **Append-only.** Solo tú escribes aquí. Añade un bloque al final cada vez que cierras una sesión de trabajo.
> Sirve para tres cosas: que no pierdas el hilo, que el equipo sepa en qué vas, y que el domingo puedas reconstruir qué pasó.

---

## Formato

```
## YYYY-MM-DD · HH:MM — Título corto

**Hice:** ...
**Siguiente:** ...
**Bloqueos:** ... (o "ninguno")
**Issue(s):** #12, #15
**Rama:** feat/usuario/nombre
```

---

## Ejemplo (bórralo cuando escribas el tuyo)

```
## 2026-11-10 · 18:30 — Primer dataset normalizado

**Hice:** Descargué la serie de glucosa de OSDR y la dejé en src/data/seed/glucosa.json
**Siguiente:** Escribir el script de normalización para que sea reproducible
**Bloqueos:** ninguna
**Issue(s):** #8
**Rama:** data/cxrlosmp/osdr-glucosa
```

---

## Registro

_(empieza aquí)_

## 2026-11-14 — 13:45 — Maquetado en Figma entregado como plugin

**Hice:** conecté el MCP de Figma y comprobé que es de solo lectura (la API REST de Figma no crea nodos). Monté `design/` con las 6 pantallas congeladas y un plugin que las construye con capas nativas, más la página de sistema. Al revisar los números contra OSD-575 descubrí que el maquetado previo usaba datos inventados (102 mg/dL, base 89, C001) y lo corregí a C003 = 103 mg/dL, base 71.3, +44.4 %. Añadí un verificador de datos y un smoke test del plugin.
**Siguiente:** importar el plugin en Figma y revisar el render real; decidir con el rol de reglas si el semáforo de glucemia es 70–140 o 70–99.
**Bloqueos:** ninguno. Ojo: otra línea de trabajo escribe en `assets/figma-vistas/` y sobrescribió un archivo mientras trabajaba; por eso todo lo mío vive en `design/`.
**Issue(s):** pendiente de crear
**Rama:** feat/diseno-maquetado-figma

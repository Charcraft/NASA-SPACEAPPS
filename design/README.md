# design/ — maquetado de AEGIS

Todo el maquetado vive aquí. **No toca `assets/figma-vistas/`**, que es de otra
línea de trabajo.

---

## Qué hay

| Ruta | Qué es |
|---|---|
| `pantallas/` | Las 6 pantallas del alcance, en SVG 412 × 917. **Copia congelada** el 2026-11-14 13:10. |
| `figma-plugin/` | Plugin de Figma que crea las 6 pantallas y la página de sistema con capas nativas. |
| `figma-plugin/src/template.js` | Lógica del plugin (aquí se edita). |
| `figma-plugin/code.js` | **Generado**. No editar a mano. |
| `figma-plugin/ui.html` | Panel del plugin: dos casillas y un botón. |
| `tools/build-plugin.mjs` | Inyecta los SVG en el plugin y escribe `code.js`. |
| `tools/smoke-test.mjs` | Ejecuta el plugin contra un doble de la API de Figma y escribe `out/preview.html`. |
| `tools/alertas-osdr.py` | Lista los valores reales fuera de rango del dataset OSD-575. |
| `tools/verificar-pantallas.py` | **Puerta de veracidad**: falla si un número de las pantallas no está en el dataset. |
| `out/preview.html` | Vista previa de cómo quedan las pantallas dentro de Figma. |

---

## Por qué un plugin y no la API

El MCP de Figma configurado (`figma-developer-mcp`) es **de solo lectura**, y la
API REST de Figma **no permite crear frames, texto ni formas**. La única forma
de escribir maquetado dentro de un archivo es la API de plugins, que corre
dentro de Figma con el archivo abierto.

Por eso el maquetado se entrega como plugin: no necesita token, no necesita
internet y no depende de qué archivo abra cada quien.

---

## Cómo se usa (30 segundos)

1. Abre Figma (app de escritorio o web) y **cualquier archivo tuyo**.
2. Menú **Plugins → Development → Import plugin from manifest…**
3. Elige `design/figma-plugin/manifest.json`.
4. **Plugins → Development → AEGIS · Maquetado → Run**.
5. Pulsa **Generar maquetado**.

Crea:

- Página **AEGIS · Pantallas**: las 6 pantallas en fila, con título y subtítulo.
- Página **AEGIS · Sistema**: paleta, tipografía, reglas de accesibilidad,
  espaciado y radios.
- 12 estilos de color `AEGIS/…` y 7 estilos de texto `AEGIS/…` en el panel de
  estilos locales.

Si lo ejecutas dos veces, la segunda tanda se coloca **debajo** de la primera:
nunca borra ni encima lo anterior.

---

## Cómo se reconstruye

```powershell
node design/tools/build-plugin.mjs     # pantallas/ → code.js
node --check design/figma-plugin/code.js
node design/tools/smoke-test.mjs       # ejecuta el plugin sin Figma
python design/tools/verificar-pantallas.py
```

`smoke-test.mjs` valida que haya 6 pantallas de 412 × 917, sin solapes, y que la
segunda ejecución no encime. También escribe `out/preview.html`, que se puede
abrir en el navegador para mirar el resultado sin Figma.

---

## Qué hace y qué no

**Hace**

- Capas nativas: cada pantalla es un frame con el contenido vectorial editable.
- Texto real (Inter / JetBrains Mono), no imágenes.
- Estilos de color y de texto reutilizables.
- Página de sistema con las reglas del proyecto.

**No hace**

- No usa auto-layout: las pantallas van posicionadas en absoluto dentro de un
  frame de 412 × 917, igual que el SVG validado. Si más adelante quieres
  auto-layout por secciones, se convierte sección por sección.
- No enlaza pantallas entre sí (no hay prototipo navegable).
- No exporta assets: eso se hace desde Figma cuando el diseño esté aprobado.

---

## Regla de oro

Los números clínicos de las pantallas **no se inventan**. Salen de
`src/data/seed/osdr-inspiration4-cmp.json` (OSDR OSD-575) y
`design/tools/verificar-pantallas.py` lo comprueba en cada cambio.

Si un valor es un supuesto de interfaz, va marcado en
`docs/03-plan/10-sistema-diseno.md` como `[SUPUESTO]`.

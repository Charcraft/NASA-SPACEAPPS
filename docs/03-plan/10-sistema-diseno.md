# 03.10 · Sistema de diseño y maquetado

> Cómo se ve AEGIS, por qué se ve así, y qué de lo que aparece en pantalla está
> respaldado por datos y qué es un supuesto de interfaz.
> **Última actualización:** 2026-11-14

---

## 1 · Estado

| Pieza | Dónde | Estado |
|---|---|---|
| 6 pantallas del alcance | `design/pantallas/*.svg` | ✅ |
| Plugin de Figma que las construye | `design/figma-plugin/` | ✅ probado con un doble de la API |
| Página de sistema (color, tipo, reglas) | generada por el plugin | ✅ |
| Verificación de datos | `design/tools/verificar-pantallas.py` | ✅ |
| Auto-layout por secciones | — | ⬜ pendiente |
| Prototipo navegable entre pantallas | — | ⬜ pendiente |

Las 6 pantallas son las de `03-alcance-producto.md` §3:

1. Dashboard de tripulación.
2. Mapa corporal.
3. Asistente de medición.
4. Tarjeta de resultado (triage).
5. Selector de emergencia.
6. Protocolo activo.

---

## 2 · Sistema visual

### Color

| Token | Hex | Uso |
|---|---|---|
| Fondo | `#090C14` | Lienzo de la app |
| Superficie | `#131A27` | Tarjetas |
| Superficie 2 | `#1E293B` | Chips, pastillas |
| Borde | `#334155` | Separadores |
| Texto | `#F6F7FB` | Lectura principal |
| Texto atenuado | `#9BA4B8` | Etiquetas y apoyo |
| Acento | `#D9FB76` | Acción principal, selección |
| Nominal | `#10B981` | Verde del semáforo |
| Atención | `#F59E0B` | Ámbar del semáforo |
| Crítico | `#EF4444` | Rojo del semáforo |
| Informativo | `#38BDF8` | Datos y enlaces |

**Por qué oscuro:** cabina con luz controlada, turnos largos, pantallas que
comparten espacio con instrumentos. El oscuro reduce el deslumbramiento y hace
que el semáforo destaque.

**Por qué lima y no azul como acento:** el azul ya está tomado por la
información (`#38BDF8`). El lima no compite con ningún color del semáforo y
resiste bien el daltonismo rojo-verde.

### Tipografía

| Rol | Fuente | Tamaño mínimo |
|---|---|---|
| Titular | Inter Extra Bold | 22–34 px |
| Cuerpo | Inter Regular | **11.5 px** |
| Etiqueta | Inter Medium/Semi Bold | 9–10 px |
| Dato y hora | JetBrains Mono | 9–10 px |

**Por qué mono para datos:** los números de un panel clínico se comparan
verticalmente; la monoespaciada evita que `103` y `108` se confundan de un
vistazo.

### Espaciado y radios

- Escala: 4 · 6 · 8 · 12 · 16 · 18 · 22 · 24 · 28 · 32.
- Radios: 6 chips · 12 botones pequeños · 16 tarjetas · 22 tarjeta principal ·
  28 pantalla.
- Área táctil de acción: **≥ 46 px de alto** (guantes).
- Lienzo: **412 × 917** (iPhone estándar en vertical).

---

## 3 · Accesibilidad (reglas no negociables)

1. **Nunca solo color.** Cada estado lleva icono y palabra: `● Nominal`,
   `▲ Atención`, `✕ Crítico`.
2. **Texto de lectura ≥ 11.5 px**, contraste alto sobre `#090C14`.
3. **Una acción por pantalla** en modo emergencia.
4. **Cronómetro visible** en todo protocolo activo.
5. **Sin jerga clínica** en la interfaz; el término técnico va entre paréntesis
   si aporta.

---

## 4 · Trazabilidad de los números

La escena de demostración es **C003 en R+1**, glucosa capilar.

| Lo que dice la pantalla | Valor | Origen |
|---|---|---|
| Glucosa R+1 | **103 mg/dL** | `src/data/seed/osdr-inspiration4-cmp.json` |
| Línea base personal | **71.3 mg/dL** (L-92 77 · L-44 62 · L-3 75) | mismo archivo |
| Desviación | **+44.4 %** (+32 mg/dL) | calculado |
| Rango de referencia del panel | **65–99 mg/dL** | mismo archivo |
| Umbral crítico | **> 180 mg/dL** | `02-investigacion/02-indicadores-fisiologicos.md` §6 |

[Fuente: SpaceX Inspiration4 Blood Serum Metabolic Panel — NASA OSDR OSD-575 — https://osdr.nasa.gov/bio/repo/data/studies/OSD-575 — consultado 2026-11-14]

`design/tools/verificar-pantallas.py` recalcula estos valores desde el JSON y
falla si el SVG dice otra cosa. Se ejecuta antes de cada entrega.

### Corrección aplicada el 2026-11-14

El primer maquetado mostraba **102 mg/dL, base 89 y +14.6 %** para **C001**.
Esos tres números **no existen en el dataset**: C001 tiene 90 mg/dL en R+1 y su
media pre-vuelo es 77.3. Se corrigió a los valores reales de C003, que sí
sostienen la escena (103 mg/dL, fuera del rango 65–99).

Motivo: el pitch afirma que *cada número se puede rastrear hasta su fuente*. Un
solo valor inventado en pantalla destruye ese argumento ante el jurado.

---

## 5 · Decisiones y supuestos

| # | Decisión | Etiqueta |
|---|---|---|
| DD1 | Modo oscuro como único tema del MVP | `[SUPUESTO]` |
| DD2 | Acento lima `#D9FB76`; azul reservado a información | `[SUPUESTO]` |
| DD3 | Lienzo 412 × 917 y navegación inferior de 4 destinos | `[SUPUESTO]` |
| DD4 | La pantalla de protocolo activo **no** lleva navegación: modo foco | `[SUPUESTO]` |
| DD5 | La alerta ámbar de la tarjeta de triage es **por desviación personal**, no por rango clínico | `[SUPUESTO]` |
| DD6 | Regla propuesta: alerta si el valor está fuera de referencia **y** ≥ 30 % sobre la línea base | `[SUPUESTO]` — validar con el rol de reglas |
| DD7 | Reevaluación a los 5 minutos en dolor torácico | `[POR VALIDAR]` contra el protocolo clínico |
| DD8 | Los signos vitales de la escena (72 lpm, 98 %, 118/76) son de interfaz | `[SUPUESTO]` — no vienen de OSD-575 |

### Inconsistencia abierta

`02-indicadores-fisiologicos.md` §6 define el semáforo de glucemia como
**verde 70–140**, pero la referencia de ayuno que cita es **70–99**. Un valor de
103 queda verde por el semáforo y alto por la referencia.

La pantalla 04 resuelve el conflicto diciéndolo explícitamente: «Semáforo clínico
verde (70–140): no es urgencia. Pero 103 está 44.4 % sobre tu media pre-vuelo».

**Pendiente:** decidir cuál es la regla oficial antes del demo y dejarla en un
solo lugar del código. Responsable: rol de reglas y tests.

---

## 6 · Lo que la interfaz nunca hace

Tomado de `03-alcance-producto.md` §4 y verificado en las 6 pantallas:

- ❌ No diagnostica. Todas llevan aviso de «no es un dispositivo médico».
- ❌ No recomienda fármacos ni dosis. El protocolo activo solo indica
  posicionamiento, aviso y medición.
- ❌ No promete conexión: muestra `OFFLINE · LOCAL` y `DELAY +14m 20s`.
- ❌ No usa marcas ni logotipos de NASA.

---

## 7 · Cómo se revisa

```powershell
python design/tools/verificar-pantallas.py   # datos
node design/tools/build-plugin.mjs           # regenera el plugin
node design/tools/smoke-test.mjs             # estructura y preview
```

Y a ojo: abrir `design/out/preview.html` o importar el plugin en Figma.

---

## 8 · Documentos relacionados

- [`design/README.md`](../../design/README.md) — cómo se usa el plugin.
- [`03-alcance-producto.md`](03-alcance-producto.md) — las 6 pantallas y el guion del demo.
- [`02-investigacion/02-indicadores-fisiologicos.md`](../02-investigacion/02-indicadores-fisiologicos.md) — semáforos y umbrales.

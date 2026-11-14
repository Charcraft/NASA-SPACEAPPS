# 02.6 · Modelos 3D del cuerpo humano: qué existe, qué es libre y cuál usar

> **Para qué sirve este documento:** elegir el modelo 3D del cuerpo con el que el astronauta va a interactuar, sin violar ninguna licencia y sin perder el domingo.
> **Estado:** investigación cerrada el **2026-11-14**. Todo lo marcado `[VERIFICADO]` se comprobó con una petición HTTP real ese día, no leyendo un README.

---

## 0. La respuesta en 30 segundos

| Pregunta | Respuesta |
|---|---|
| ¿Existe un modelo 3D gratuito con **todos** los sistemas del cuerpo? | **Sí, varios.** El problema nunca fue el modelo: es la licencia y el peso. |
| ¿Cuál usamos? | **`open-anatomy-3d`** (GLB de 7.6 MB, 147 estructuras con nombre, hombre y mujer, CC BY 4.0). |
| ¿Por qué ese? | Es el único que cumple las cuatro cosas a la vez: **gratis, CC BY 4.0 (sin share-alike), órganos con nombre en el nodo glTF y peso de web**. |
| ¿Cubre los 6 `meshNodeId` del contrato del backend? | **Sí, los 6.** Ver §5. |
| ¿Y si queremos las 2,234 piezas, cada hueso y cada músculo? | **Human Atlas** (15 sistemas, CC BY 4.0, ~31 MB comprimido). |
| ¿Cuál es la trampa que puede costarnos el proyecto? | **Z-Anatomy**: su licencia es contagiosa y dos de sus piezas son **no comerciales**. Ver §6. |

**Decisión recomendada:** modelo principal `open-anatomy-3d`; `Human Atlas` como ampliación si sobra tiempo; `Z-Anatomy` solo como atlas de consulta en Blender, nunca como asset publicado tal cual.

---

## 1. Criterios con los que se evaluó cada opción

| # | Criterio | Por qué manda |
|---|---|---|
| C1 | **Licencia compatible con repo público** | El submission exige repo abierto. Una cláusula NC o ND nos deja fuera del premio global. |
| C2 | **Cada sistema representado** | El reto pide que el astronauta navegue su cuerpo por sistema, no un maniquí genérico. |
| C3 | **Mallas separadas y con nombre** | Sin nombres estables no existe `meshNodeId`: no se puede iluminar el corazón cuando sube la FC. |
| C4 | **Formato web (GLB/glTF) o convertible en una sesión** | Estamos en 30 horas, no en un curso de Blender. |
| C5 | **Peso razonable** | Tiene que abrir en el venue, en un portátil, y funcionar **sin red**. |
| C6 | **Descarga real y hoy** | Un repositorio bonito sin binarios no sirve. |
| C7 | **Terminología en español** | El equipo y la demo son en español; el jurado local también. |

---

## 2. Tabla maestra

| Fuente | Qué trae realmente | Licencia | Formato / peso | ¿Cada sistema? | Esfuerzo | Veredicto |
|---|---|---|---|---|---|---|
| **open-anatomy-3d** | Hombre y mujer; 147 estructuras con nombre (`heart`, `lung_l`, `femur_r`, `kidney_l`…); piel, esqueleto, músculos, órganos, vasos, nervios | Modelos **CC BY 4.0** · código **MIT** | GLB **7.6 MB** hombre / **8.1 MB** mujer · meshopt | 7 capas | **Bajo** | ✅ **ELEGIDO** |
| **Human Atlas** | 2,234 mallas seleccionables, **15 sistemas**, 3,432 conceptos, búsqueda por FMA | Datos **CC BY 4.0** · código **MIT** | 15 `.bin` + `atlas.json` ≈ **55 MB** (≈31 MB gz) | **15** | Medio | ✅ Ampliación |
| **BodyParts3D 4.0** | 2,235 mallas OBJ, 411 músculos, esqueleto completo, indexado por FMA | **CC BY 4.0** (desde 2025-02-27) | OBJ · ZIP **62 MB** / **136 MB** | Todos (crudo) | Alto (hay que procesar) | ✅ Fuente raíz |
| **Z-Anatomy** | Atlas completo en Blender, ~4,500 mallas, 1,944 colecciones, definiciones de Wikipedia | **CC BY-SA 4.0** ⚠️ + 2 piezas **NC** | `.blend` · **82.7 MB** | Todos | Alto | ⚠️ Solo consulta |
| **HRA / HuBMAP** | 81 órganos de referencia en GLB, 1,392 estructuras con ID UBERON/FMA, hombre y mujer | **CC BY 4.0** | GLB por órgano (**1.7 MB** el hígado) | Por órgano | Medio | ✅ Órganos femeninos |
| **Écorché** | 634 mallas: 198 huesos, 42 cartílagos, 362 músculos | **CC BY-SA 4.0** | GLB **13.7 MB** | Solo hueso + músculo | Bajo | ⚠️ Parcial |
| **Innerscene CC0** | Linfático, endocrino y muscular completos, sueltos | **CC0** | GLB **1.7–14.6 MB** | 3 sistemas | Medio | 🟡 Relleno |
| Sketchfab / tiendas | Mucho y muy bonito | **NC, ND o propietaria** | Varios | Sí | Bajo | ❌ Descartado |

---

## 3. Ficha de cada candidato

### 3.1 · open-anatomy-3d — **el elegido**

`[VERIFICADO]` Paquete real en npm (`0.1.0`, sin dependencias, 15.8 MB descomprimido) y modelos descargables.

| Dato | Valor |
|---|---|
| Estructuras | **147** (140 en el hombre, 145 en la mujer) |
| Sistemas | piel, esqueleto, músculos, órganos, vasos, nervios + 12 puntos articulares |
| Nombres de nodo | Son la clave del catálogo: `heart`, `lung_l`, `kidney_l`, `femur_r`, `spine_lumbar`, `uterus`… |
| Escala | Metros, **Y-arriba**, pies en `y = 0` |
| Peso real | `anatomy-male.glb` = **7,614,076 bytes** (7.26 MiB) · `anatomy-female.glb` = **8,134,732 bytes** (7.76 MiB) |
| Estructura del binario | 134 nodos / 128 mallas (macho) · 139 nodos / 133 mallas (hembra) · **`materials = 0`** |
| Nodos | 6 raíces de sistema (`skin`, `skeleton`, `muscles`, `organs`, `vessels`, `nerves`) |
| Compresión | `EXT_meshopt_compression` + cuantización |
| Geometría | ~1 M triángulos por cuerpo (decimado desde ~6.4 M) |
| Licencia | Modelos **CC BY 4.0**; código **MIT**; sin cláusula NC ni share-alike |

**Cómo se descarga** (una de las tres, según convenga):

```bash
# Opción A — paquete npm (trae los .glb dentro)
pnpm add open-anatomy-3d

# Opción B — descarga directa del binario (los dos cuerpos, ~15.1 MiB en total)
curl -L -o public/models/anatomy-male.glb   https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/anatomy-male.glb
curl -L -o public/models/anatomy-female.glb https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/anatomy-female.glb

# Opción C — desde el repo, con el pipeline que los reconstruye
# https://github.com/MervinR07/open-anatomy-3d
```

> **Trampa al verificar el tamaño:** si se pide con cabecera `Range` y el CDN responde comprimido, el `content-range` informa el tamaño **del flujo comprimido** (5,991,963 bytes), no el del archivo. El binario real pesa **7,614,076**. La forma de no equivocarse es descargar y abrir la cabecera GLB: los bytes 8–11 declaran la longitud total y tiene que coincidir con el tamaño en disco.

**Contras honestos:**

- **140 estructuras no son 2,234.** Es un cuerpo "de divulgación": tiene los órganos que un astronauta necesita ver, no cada hueso del pie. `[VERIFICADO]` por el propio catálogo.
- El paquete React (`open-anatomy-3d-react`) dice estar probado con **React 18 + R3F 8 + drei 9**. Nuestro stack es **Next.js 15 / React 19** `[POR VALIDAR: puede exigir R3F 9]`. **Mitigación:** usar el `.glb` con **Three.js plano**, no con el componente React. Así no dependemos de la versión de React.
- Los modelos derivan de BodyParts3D + HRA + MakeHuman → **la atribución es obligatoria** (§6.1).

### 3.2 · Human Atlas — cobertura total sin share-alike

`[VERIFICADO]` El repositorio publica los binarios: 15 archivos `body-0.bin` … `body-14.bin` (2.2–4.3 MB cada uno) + `atlas.json` (1.27 MB).

- **2,234 mallas individualmente seleccionables**, 15 sistemas anatómicos, 3,432 conceptos con identificador FMA.
- Código **MIT**, datos **CC BY 4.0** → se puede usar, modificar y publicar sin abrir nuestro código.
- Incluye búsqueda por nombre anatómico e identificador FMA: sirve para que el astronauta **busque** "riñón" y el modelo lo aísle.
- **Contra:** ~31 MB comprimidos. Cabe en un PWA offline, pero no en una carga inicial en red mala.
- Repos: `github.com/ashemag/human-atlas` · `github.com/OlivierLAVAUD/human-atlas` (mismo proyecto, dos espejos).

### 3.3 · BodyParts3D — la fuente raíz de casi todo

`[VERIFICADO]` Descarga real: `partof_BP3D_4.0_obj_99.zip` = **64,888,505 bytes**; `isa_BP3D_4.0_obj_99.zip` = 136 MB.

- Es el dataset japonés (DBCLS) del que salen Z-Anatomy, open-anatomy-3d, Human Atlas, Écorché y media Internet anatómica.
- **2,235 mallas OBJ**, esqueleto completo, 411 músculos, con índice **FMA**.
- **Licencia: CC BY 4.0** — `[VERIFICADO]` en la página oficial, "Last updated: 2025/02/27". DBCLS **relicenció** de CC BY-SA 2.1 JP a CC BY 4.0.
- **Contra:** son OBJ en milímetros y eje Z-arriba, sin nombres amigables. Hay que procesarlos (convertir, escalar, unir, comprimir). Es un proyecto de 4–6 horas, no de 20 minutos. **No es la ruta del hackathon.**

### 3.4 · Z-Anatomy — el atlas más completo y la licencia más incómoda

`[VERIFICADO]` `Z-Anatomy.zip` = **82.72 MB** en el repo oficial; `TA2.csv` = 1.37 MB con columna **Español**.

- A nivel de contenido es el mejor: **12 sistemas con raíz propia** en su terminología — esquelético, muscular, digestivo, respiratorio, urinario, genital masculino, genital femenino, endocrino ("integrating system"), cardiovascular, linfático, nervioso central y periférico. `[VERIFICADO]` leyendo las raíces de `TA2.csv`.
- **Traducción al español oficial** de cada estructura (columna `Español` del `TA2.csv`). Para una app en español, es oro.
- **Contras serios:**
  1. Licencia **CC BY-SA 4.0** → *share-alike*: si publicamos derivados, se publican bajo la misma licencia.
  2. Contiene **dos piezas no comerciales**: riñón (CC BY-NC 4.0) y oído interno (CC BY-NC-SA 4.0). El paquete tal cual **no es comercialmente usable**.
  3. El propio dueño del proyecto interpreta, en su issue #6, que *"una app desarrollada para leer este modelo tendría que estar bajo la misma licencia y compartir su código abierto"*. `[VERIFICADO]` — es una interpretación agresiva, pero es la del licenciante.
- **Uso permitido y útil para nosotros:** abrirlo en Blender para **sacarle capturas** al pitch y para **exportar un sistema concreto** si nos falta algo. Un render o un PNG son obra derivada pero no obligan a abrir la app.

### 3.5 · HRA / HuBMAP — órganos clínicos con ID ontológico

`[VERIFICADO]` Descargas reales desde el CDN:

| Archivo | Bytes | Equivalente |
|---|---|---|
| `ref-organ/liver-female/v1.2/…/3d-vh-f-liver.glb` | 1,738,552 | **1.7 MB** |
| `ref-organ/united-male/v1.10/…/3d-vh-m-united.glb` | 241,633,636 | **230 MiB** |
| `ref-organ/united-female/v1.10/…/3d-vh-f-united.glb` | 374,505,632 | **357 MiB** |

- **81 órganos de referencia** (v2.5), **1,392 estructuras** etiquetadas con **UBERON/FMA**.
- **CC BY 4.0**, derivados del *Visible Human Project* de la NLM.
- Es el **único** que trae los órganos femeninos completos (útero, ovarios, trompas, vagina, mama) con licencia limpia.
- **Contra:** el cuerpo entero unido pesa **230–357 MB**. Sirve como fuente en Blender, **no como asset de web**. Los órganos sueltos sí son usables.

### 3.6 · Écorché — solo hueso y músculo

`[VERIFICADO]` por su README: 634 mallas nombradas, 198 huesos, 42 cartílagos, 28 dientes, 159 músculos profundos, 203 superficiales; GLB 13.7 MB (5.7 MB en meshopt). **CC BY-SA 4.0**. Excelente para hablar de pérdida de masa ósea y muscular en microgravedad, insuficiente como modelo único porque **no tiene órganos**.

### 3.7 · Innerscene CC0 — relleno sin obligaciones

`[VERIFICADO]` Modelos GLB con **dominio público (CC0)**: sistema linfático (2.3 MB), conjunto de glándulas endocrinas (1.7 MB), sistema muscular capa profunda (14.6 MB). Cero obligación de atribución, uso comercial libre. **Contra:** son modelos sueltos, no comparten pose ni escala con el cuerpo principal; mezclarlos se nota. Útiles como **imagen de diapositiva**, no como capa del visor.

### 3.8 · Descartados y por qué

| Fuente | Motivo del descarte |
|---|---|
| Sketchfab (mayoría de modelos anatómicos) | La mayoría son **CC BY-NC-ND**: prohíben uso comercial **y obras derivadas**. No se pueden adaptar a nuestra UI. |
| CGTrader / 3DModels.org / TurboSquid | Licencia *royalty-free* **propietaria**: no es open source, y el jurado pide repo abierto y verificable. |
| Ella / Virtual Population (IT'IS) | Requiere **acuerdo firmado** y es no comercial. |
| BioDigital Human | Excelente, pero es **SaaS cerrado** con API de pago: no se descarga ni funciona offline. |
| Visible Human Project crudo | 40 GB de criosecciones. Es una fuente de investigación, no un asset. |

---

## 4. Cobertura por sistema

Los 11 sistemas clásicos y dónde vive cada uno. `[INFERENCIA]` a partir de los catálogos y de las raíces de `TA2.csv`.

| Sistema | open-anatomy-3d | Human Atlas / BP3D | Z-Anatomy | HRA |
|---|---|---|---|---|
| Tegumentario (piel) | ✅ capa `skin` | ✅ | ✅ | ✅ `Skin` |
| Esquelético | ✅ | ✅ 271 piezas | ✅ | 🟡 pelvis, rodilla |
| Muscular | ✅ | ✅ 476 piezas | ✅ | ❌ |
| Nervioso | ✅ capa `nerves` | ✅ 255 piezas | ✅ central + periférico | 🟡 médula |
| Cardiovascular | ✅ capa `vessels` | ✅ arterias + venas | ✅ | ✅ 125 vasos |
| Linfático / inmune | 🟡 parcial | ✅ | ✅ `Lymphoid system` | ✅ ganglios |
| Respiratorio | ✅ `lung_l/r` | ✅ | ✅ | ✅ pulmones + tráquea |
| Digestivo | ✅ | ✅ | ✅ | ✅ hígado, intestinos, páncreas |
| Urinario | ✅ `kidney_l/r` | ✅ | ✅ | ✅ riñón, vejiga, uréter |
| Endocrino | 🟡 tiroides/páncreas | ✅ | ✅ | 🟡 páncreas, timo |
| Reproductor | ✅ mujer (útero, ovarios) | 🟡 solo masculino | ✅ M y F | ✅ M y F |
| Sensorial (ojo, oído) | 🟡 ojo | ✅ | ✅ (oído **NC**) | ✅ ojo |

**Lectura:** ninguna fuente sola gana en las 12 filas, pero **open-anatomy-3d cubre los 6 nodos que el contrato necesita** y las 12 filas quedan cubiertas si se suma Human Atlas.

---

## 5. Mapeo al contrato `meshNodeId` — la tabla que necesita Carlos

El contrato de `BRIEF-BACKEND-AGENTES.md` §5.1 define **6 nodos**. Con `open-anatomy-3d` cada uno tiene mallas reales que se pueden colorear, iluminar y aislar:

| `meshNodeId` | Estructuras disponibles en el modelo | Qué se ilumina | Parámetros que lo disparan |
|---|---|---|---|
| `head_neuro_ocular` | `skull`, `brain`, `eye_l`, `eye_r` | Cráneo + ojos | SANS, presión intracraneal estimada, temperatura central |
| `thorax_heart` | `heart`, `aorta`, vasos torácicos | Corazón | FC, PA, ECG, gasto cardíaco |
| `thorax_lungs` | `lung_l`, `lung_r`, `trachea` | Pulmones | SpO₂, frecuencia respiratoria, EtCO₂ |
| `abdomen_hepatic_renal` | `liver`, `kidney_l`, `kidney_r`, `pancreas` | Hígado + riñones | Glucosa, AST, ALT, creatinina, BUN |
| `limbs_musculoskeletal` | `femur_l`, `femur_r`, músculos de miembro inferior | Fémur + musculatura | Calcio, fosfatasa alcalina, densitometría |
| `systemic_immune_radiation` | capa `skin` + vasos + ganglios | Piel completa (envolvente) | Radiación acumulada, albúmina, leucocitos |

**Por qué importa:** el contrato ya está escrito y el backend va a emitir `estadoNodos3D`. Si el modelo no tuviera estos nombres, ese campo no se podría consumir y el trabajo del backend se tira. **Este es el argumento técnico para no cambiar de modelo a mitad del evento.**

### 5.1 · Correspondencia con lo que ya existe en el código

`[VERIFICADO]` en `src/types/index.ts:12` y `src/components/BodyMap.tsx`. La unión es **1 a 1**, sin traducciones intermedias:

| `SistemaFisiologico` (ya implementado) | `meshNodeId` (contrato backend) |
|---|---|
| `neuro-ocular` | `head_neuro_ocular` |
| `cardiovascular` | `thorax_heart` |
| `respiratorio` | `thorax_lungs` |
| `metabolico` | `abdomen_hepatic_renal` |
| `musculoesqueletico` | `limbs_musculoskeletal` |
| `inmune-radiacion` | `systemic_immune_radiation` |

Consecuencia práctica: `BodyMap.tsx` (SVG, 6 nodos con coordenadas frontal y lateral) **sigue siendo el plano de datos**. El visor 3D no reemplaza los tipos ni el store: solo cambia el render de los mismos 6 IDs. Un componente `BodyModel3D.tsx` puede convivir detrás de un interruptor `modoVista: 'svg' | '3d'` y, si falla, se vuelve al SVG sin tocar nada más.

---

## 6. Trampas de licencia (leer antes de publicar)

### 6.1 · La atribución es obligatoria y tiene que verse

Con `open-anatomy-3d` la cadena es: **BodyParts3D (DBCLS, CC BY 4.0) + HRA (HuBMAP, CC BY 4.0) + MakeHuman (CC0)**, modificados por el proyecto. La línea lista para pegar:

```
Anatomía 3D: BodyParts3D © The Database Center for Life Science (CC BY 4.0);
órganos femeninos: Human Reference Atlas, HuBMAP (CC BY 4.0);
cuerpo femenino: MakeHuman (CC0). Adaptado por open-anatomy-3d (CC BY 4.0).
```

Va en **tres sitios**: el README público, la pantalla "Acerca de" de la app y los créditos del video.

### 6.2 · Z-Anatomy contamina

CC BY-SA 4.0 + riñón CC BY-NC 4.0 + oído interno CC BY-NC-SA 4.0. Si se publica el paquete tal cual, **el conjunto deja de ser comercialmente usable**. Se puede "limpiar" quitando esas dos piezas, pero eso es trabajo que no tenemos. **Decisión: no se publica Z-Anatomy; se usa como atlas de consulta.**

### 6.3 · Las cabeceras de BodyParts3D siguen diciendo lo viejo

`[POR VALIDAR]` Según una auditoría de terceros, los `.obj` de 2013 llevan dentro la cabecera "CC BY-SA 2.1 Japan" aunque la web ya diga CC BY 4.0. **Mitigación:** citar siempre la página de licencia vigente, **no borrar las cabeceras** y no usar BodyParts3D crudo en la entrega (con open-anatomy-3d el problema lo hereda el paquete, que ya lo declara).

### 6.4 · Son cuerpos de personas reales

Los modelos derivan del *Visible Human Project* (cadáveres donados) y de escaneos. Regla del proyecto: **nunca** presentarlos como dispositivo médico, nunca intentar reidentificar, y mantener el disclaimer visible.

### 6.5 · "Gratis para descargar" ≠ "libre para usar"

La mitad de los modelos anatómicos bonitos de Internet son *free download, all rights reserved*. La prueba rápida antes de meter cualquier modelo: **¿aparece una licencia Creative Commons en la ficha? ¿cuál de las seis?** Si dice NC o ND, se descarta sin discutir.

---

## 7. Cómo se integra (Three.js, sin sorpresas)

`BRIEF-BACKEND-AGENTES.md` ya fija **Three.js** para el modelo 3D. Eso sustituye la fila "Mapa corporal: SVG inline, cero dependencias" de `TECH-STACK.md`, que quedó desactualizada. `[INFERENCIA]` El contrato nuevo es más específico y más reciente: manda el contrato.

### 7.1 · El archivo va al repo, no al CDN

El demo apaga el WiFi en vivo. Un modelo servido desde jsDelivr = pantalla en negro delante del jurado.

```
public/
└── models/
    ├── anatomy-male.glb        ← 7.3 MiB, versionado en el repo
    ├── anatomy-female.glb      ← 7.8 MiB
    ├── catalog.json            ← 147 estructuras con color y categoría clínica
    └── ATTRIBUTION.md          ← obligatorio junto al binario
```

### 7.2 · Carga y clic sobre el órgano

```ts
// src/components/BodyModel3D.tsx  (client component)
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'

const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder) // obligatorio: el GLB usa meshopt
const gltf = await loader.loadAsync('/models/anatomy-male.glb')

// 1) Capas por sistema: cada sistema es un nodo padre
gltf.scene.getObjectByName('muscles')!.visible = false   // apagar músculos
gltf.scene.getObjectByName('skin')!.visible = false      // quitar piel

// 2) Clic directo sobre el órgano (no sobre un pin colocado a mano)
const raycaster = new THREE.Raycaster()
// en pointerdown: raycaster.setFromCamera(ndc, camera)
// const hit = raycaster.intersectObjects(gltf.scene.children, true)[0]
// hit.object.name  →  'heart' | 'lung_l' | 'kidney_r'  ...
//                   →  se traduce a meshNodeId y se abre la tarjeta del sistema
```

**Ventaja frente a `<model-viewer>`:** `model-viewer` solo permite *hotspots* declarativos con coordenadas puestas a mano. Con Three.js el astronauta **toca el órgano** y el raycast devuelve el nombre del nodo. Es menos trabajo y es exactamente la interacción que pide el reto.

### 7.3 · Presupuesto de rendimiento

| Medida | Valor | Comentario |
|---|---|---|
| Triángulos | ~1 M por cuerpo | Correcto en desktop; en móvil, apagar capas |
| Peso | 7.3 MiB (macho) / 7.8 MiB (hembra) | Cabe en un PWA con `cache-first` |
| Memoria GPU | ~120–180 MB estimado | `[POR VALIDAR]` en el portátil del venue |

---

## 8. Plan B si el 3D no llega

El contrato `meshNodeId` es **agnóstico al render**. Si el domingo a las 12:00 el visor 3D no funciona:

1. Se usa el SVG ya diseñado (`assets/figma-vistas/02-mapa-corporal.svg`) con 6 regiones clicables.
2. El backend no cambia una línea: sigue emitiendo `estadoNodos3D` con los mismos 6 IDs.
3. El video se graba con el SVG y una captura del modelo 3D renderizado aparte.

**Nada se pierde.** Por eso el contrato se definió con IDs semánticos y no con nombres de malla.

---

## 9. Riesgos añadidos

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| El GLB usa `meshopt` y no se carga el decoder → cuerpo invisible | Media | Alto | Importar `MeshoptDecoder` **siempre**; probar con el WiFi apagado |
| React 19 rompe el componente `open-anatomy-3d-react` | Media | Medio | Usar Three.js plano, no el wrapper React |
| Descubrir el domingo que el modelo no tiene un órgano del guion | Baja | Alto | Verificado en §5: los 6 nodos existen hoy |
| Publicar Z-Anatomy sin querer y contaminar la licencia | Baja | **Muy alto** | Solo `open-anatomy-3d` entra a `public/models/` |
| El jurado pregunta por la licencia y no hay respuesta | Media | Medio | Esta tabla, en el README, en inglés |

---

## 10. Fuentes

[Fuente: open-anatomy-3d — repositorio y README — https://github.com/MervinR07/open-anatomy-3d — consultado 2026-11-14]
[Fuente: open-anatomy-3d — paquete npm (versión, licencia, tamaño) — https://registry.npmjs.org/open-anatomy-3d — consultado 2026-11-14]
[Fuente: anatomy-male.glb — jsDelivr (descarga e inspección de cabecera GLB: 7,614,076 bytes, 134 nodos) — https://cdn.jsdelivr.net/npm/open-anatomy-3d@0.1.0/models/anatomy-male.glb — consultado 2026-11-14]
[Fuente: Human Atlas — ashemag — https://github.com/ashemag/human-atlas — consultado 2026-11-14]
[Fuente: Human Atlas — OlivierLAVAUD (espejo) — https://github.com/OlivierLAVAUD/human-atlas — consultado 2026-11-14]
[Fuente: BodyParts3D — descarga oficial — https://dbarchive.biosciencedbc.jp/en/bodyparts3d/download.html — consultado 2026-11-14]
[Fuente: BodyParts3D — licencia CC BY 4.0 (actualizada 2025-02-27) — https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html — consultado 2026-11-14]
[Fuente: BodyParts3D — README del dataset — https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/README_e.html — consultado 2026-11-14]
[Fuente: Z-Anatomy — Models-of-human-anatomy — https://github.com/Z-Anatomy/Models-of-human-anatomy — consultado 2026-11-14]
[Fuente: Z-Anatomy — License.txt y atribuciones — https://github.com/Z-Anatomy/Models-of-human-anatomy/blob/master/License.txt — consultado 2026-11-14]
[Fuente: Z-Anatomy — issue #6 sobre licencia de derivados — https://github.com/Z-Anatomy/Models-of-human-anatomy/issues/6 — consultado 2026-11-14]
[Fuente: Z-Anatomy — TA2.csv con terminología en español — https://raw.githubusercontent.com/Z-Anatomy/Models-of-human-anatomy/master/TA2.csv — consultado 2026-11-14]
[Fuente: HRA 3D Reference Object Library — HuBMAP — https://humanatlas.io/3d-reference-library — consultado 2026-11-14]
[Fuente: HRA — repositorio de releases en GLB — https://github.com/hubmapconsortium/ccf-releases — consultado 2026-11-14]
[Fuente: HRA — colección en NIH 3D — https://3d.nih.gov/collections/hra — consultado 2026-11-14]
[Fuente: Écorché — Charleeh — https://github.com/Charleeh/ecorche — consultado 2026-11-14]
[Fuente: Innerscene 3D Parts Library (CC0) — https://www.innerscene.com/tools/library/3d-parts/lymphatic-system-figure-f810172c — consultado 2026-11-14]
[Fuente: nqwrc/3d-anatomy — advertencia de licencia NC del riñón y oído — https://github.com/nqwrc/3d-anatomy — consultado 2026-11-14]
[Fuente: Provenance and commercial licensing of Z-Anatomy meshes — Z-Anatomy issue #6 — https://github.com/Z-Anatomy/Models-of-human-anatomy/issues/6 — consultado 2026-11-14]
[Fuente: PERMISSIVE_ANATOMY.md, auditoría de licencias de anatomía abierta — Opening-Science/open-twin-xr — https://github.com/Opening-Science/open-twin-xr/blob/main/docs/PERMISSIVE_ANATOMY.md — consultado 2026-11-14]

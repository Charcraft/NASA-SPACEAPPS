# `public/models/` — modelo 3D del cuerpo humano

> **Qué es:** los dos cuerpos con los que el astronauta interactúa en la app.
> **De dónde salen:** `open-anatomy-3d` v0.1.0. **Licencia:** CC BY 4.0 (modelos) + MIT (código). Ver `ATTRIBUTION.md`.
> **Decisión:** `MEMORY.md` D25 · **Investigación completa:** [`docs/02-investigacion/06-modelos-3d-anatomia.md`](../../docs/02-investigacion/06-modelos-3d-anatomia.md)

---

## 1. Inventario (verificado el 2026-11-14)

| Archivo | Bytes | Qué es |
|---|---|---|
| `anatomy-male.glb` | **7,614,076** | Cuerpo masculino. 134 nodos, 128 mallas |
| `anatomy-female.glb` | **8,134,732** | Cuerpo femenino. 139 nodos, 133 mallas |
| `catalog.json` | 23,585 | **147 estructuras**: `key`, `label`, `system`, `category`, `color`, `anchor` |
| `ATTRIBUTION.md` | 2,611 | Créditos obligatorios (copia literal del paquete) |
| `LICENSE-MODELS.md` | 860 | Licencia de los modelos |

Cada archivo se comprobó abriendo su cabecera GLB: `magic = glTF`, `version = 2`, y la longitud declarada coincide con el tamaño real en disco (no está truncado).

**Total: ~15.1 MiB.** Cabe en el repo y en la caché de un PWA. No requiere Git LFS.

---

## 2. Cómo están armados

Un nodo raíz por sistema, y dentro las estructuras con nombre:

```
skin        (  2 hijos)
skeleton    ( 28 hijos)
muscles     ( 41 hijos)
organs      ( 34 hijos)
vessels     ( 22 hijos)
nerves      (  2 hijos)
```

Órganos disponibles en el macho (34):

```
adrenal_l, adrenal_r, appendix, bladder, brain, brainstem, bronchi, cerebellum,
colon, esophagus, eye_l, eye_r, gallbladder, heart, kidney_l, kidney_r, larynx,
liver, lung_l, lung_r, pancreas, pharynx, pituitary, prostate, reproductive,
salivary_glands, small_intestine, spleen, stomach, thymus, tongue, trachea,
ureter_l, ureter_r
```

La mujer añade `uterus`, `ovary_l`, `ovary_r`, `fallopian_tube_l/r`, `vagina`, `breast_l/r`.

**Dos detalles que importan al programar:**

1. **No traen materiales** (`materials = 0` en el JSON del glTF). El color de cada estructura se aplica desde `catalog.json`, campo `color`. Si no se hace, todo sale gris por defecto.
2. **Usan `EXT_meshopt_compression`.** Sin `MeshoptDecoder` el modelo no se abre. Es la causa número uno de "pantalla en negro".

---

## 3. Cómo se carga

```ts
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'

// 1. El decoder es obligatorio
const gltf = await new GLTFLoader()
  .setMeshoptDecoder(MeshoptDecoder)
  .loadAsync('/models/anatomy-male.glb');

// 2. Un sistema entero se oculta por su nodo padre
gltf.scene.getObjectByName('skin')!.visible = false;

// 3. Un órgano suelto, por su nombre
const heart = gltf.scene.getObjectByName('heart');

// 4. Color desde el catálogo (el glTF no trae materiales)
//    catalog.json → { key: "heart", color: "#b8352c", system: "organs", category: "Cardiovascular" }
```

Para que el astronauta **toque el órgano**, se lanza un `Raycaster` contra la escena y se lee `hit.object.name`: devuelve `heart`, `lung_l`, `kidney_r`… y de ahí se salta al nodo del contrato.

---

## 4. Mapeo a los 6 nodos del contrato

El `catalog.json` agrupa las 147 estructuras en **12 categorías clínicas**. `[INFERENCIA]` Esta es la traducción propuesta a los 6 `meshNodeId` de `BRIEF-BACKEND-AGENTES.md` §5.1:

| `category` del catálogo | `meshNodeId` | `SistemaFisiologico` |
|---|---|---|
| `Cardiovascular` | `thorax_heart` | `cardiovascular` |
| `Respiratory` | `thorax_lungs` | `respiratorio` |
| `Digestive`, `Renal / Urinary`, `Endocrine` | `abdomen_hepatic_renal` | `metabolico` |
| `Musculoskeletal` | `limbs_musculoskeletal` | `musculoesqueletico` |
| `Skin`, `Immune / Lymphatic` | `systemic_immune_radiation` | `inmune-radiacion` |
| `Neurological`, `Eye / Sensory`, `Oral / ENT` | `head_neuro_ocular` | `neuro-ocular` |
| `Reproductive` | sin nodo propio → se muestra, no dispara triage | — |

---

## 5. Atribución obligatoria

CC BY 4.0 exige crédito visible. Esta línea va en el README público, en la pantalla "Acerca de" y en los créditos del video:

```
Anatomía 3D: BodyParts3D © The Database Center for Life Science (CC BY 4.0);
órganos femeninos: Human Reference Atlas, HuBMAP (CC BY 4.0);
cuerpo femenino: MakeHuman (CC0).
Adaptado por open-anatomy-3d (https://github.com/MervinR07/open-anatomy-3d), CC BY 4.0.
```

**No borrar `ATTRIBUTION.md` ni `LICENSE-MODELS.md`.** Son parte de la licencia, no documentación opcional.

> Modelos educativos y de visualización. **No son dispositivo médico y no sirven para diagnóstico.**

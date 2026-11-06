# 06 · Estructura del proyecto

> Cómo está organizado el repositorio, dónde va cada cosa y por qué.
> **Regla:** si no sabes dónde poner un archivo, esta página lo dice. Si no lo dice, se pregunta antes de inventar una carpeta.

---

## 1. Vista general

```
NASA-SPACEAPPS/
│
├── README.md                     ← Puerta de entrada. Qué es el proyecto y cómo navegarlo.
├── AGENTS.md                     ← Contrato de trabajo. Reglas de veracidad y de uso de IA.
├── MEMORY.md                     ← Estado vivo: decisiones, pendientes, bitácora.
├── TECH-STACK.md                 ← Stack técnico congelado + arquitectura de la app.
├── context.md                    ← Enlaces originales del reto (archivo del usuario).
│
├── docs/
│   ├── 00-INDEX.md               ← Mapa de toda la documentación.
│   ├── 01-brief-retor.md         ← El reto desglosado.
│   ├── 06-estructura-proyecto.md ← este archivo
│   │
│   ├── 02-investigacion/         ← La base científica y de datos.
│   │   ├── 01-cinco-peligros.md
│   │   ├── 02-indicadores-fisiologicos.md
│   │   ├── 03-fuentes-datos.md
│   │   └── 04-bibliografia.md
│   │
│   ├── 03-plan/                  ← Cómo se ejecuta.
│   │   ├── 01-plan-7-dias.md
│   │   ├── 02-plan-30h-hackathon.md
│   │   ├── 03-alcance-producto.md
│   │   └── 04-riesgos.md
│   │
│   ├── 04-equipo/                ← Las personas y la logística.
│   │   ├── 01-equipo.md
│   │   ├── 02-roles-asignacion.md
│   │   └── 03-logistica-evento.md
│   │
│   └── 05-ia/                    ← Todo el gobierno de la IA.
│       ├── 01-politica-uso-ia.md
│       ├── 02-catalogo-prompts.md
│       ├── 03-registro-uso-ia.md
│       └── 04-declaracion-si-submission.md
│
├── team/                         ← Una carpeta por integrante.
│   ├── README.md
│   ├── _plantilla/               ← perfil.md y bitacora.md base
│   ├── danny1510/                ← Eduardo (Team Owner)
│   ├── angel_marco/
│   ├── cxrlosmp/
│   ├── giganroker/
│   └── ernesto-montes/
│
├── scripts/                      ← Automatización del equipo.
│   ├── setup-integrante.ps1      ← Verifica herramientas y prepara la carpeta personal
│   ├── setup-integrante.sh
│   ├── nuevo-worktree.ps1        ← Rama + worktree de Orca en un comando
│   └── verificar-docs.ps1        ← Detecta enlaces rotos y archivos sin H1
│
├── .github/                      ← Todo lo que ve GitHub.
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── copilot-instructions.md   ← Adaptador para Copilot
│   └── ISSUE_TEMPLATE/
│
├── CLAUDE.md                     ← Adaptador para Claude Code (apunta a AGENTS.md)
├── .cursor/rules/proyecto.mdc    ← Adaptador para Cursor
│
└── (a partir del 14 de noviembre)
    ├── src/                      ← Código de la aplicación. Ver TECH-STACK.md §3.
    ├── public/
    ├── package.json
    └── LICENSE
```

---

## 2. La lógica de la numeración

Los prefijos no son decorativos: **ordenan la lectura**.

- `00` → índice
- `01` → contexto (el problema)
- `02` → ciencia (por qué el problema existe)
- `03` → plan (qué hacemos al respecto)
- `04` → equipo (quiénes lo hacen)
- `05` → IA (cómo se usa la herramienta)
- `06` → estructura (dónde vive todo)

Alguien que entra por primera vez lee `00 → 01 → 03` y ya entiende el proyecto. Los demás son profundización.

---

## 3. Reglas de nombrado

| Tipo | Convención | Ejemplo |
|---|---|---|
| Carpetas | `kebab-case`, plural cuando agrupan | `02-investigacion/` |
| Documentos numerados | `NN-titulo-descriptivo.md` | `03-alcance-producto.md` |
| Documentos sueltos | `kebab-case.md` | `README.md` |
| Archivos de código | `PascalCase.tsx` componentes, `camelCase.ts` utilidades | `BodyMap.tsx`, `triage.ts` |
| Datos semilla | `indicador-entorno.json` | `presion-arterial-iss.json` |
| Imágenes | `kebab-case` con propósito | `mapa-corporal-sistemas.svg` |

**Prohibido:** acentos, espacios, mayúsculas sueltas, fechas en el nombre (`final-v2-ok.md`), y `utils2.ts`.

---

## 4. Dónde va cada cosa

| Si tienes… | Va en… |
|---|---|
| Un dato clínico nuevo con fuente | `docs/02-investigacion/02-indicadores-fisiologicos.md` |
| Una fuente nueva | `docs/02-investigacion/04-bibliografia.md` |
| Un dataset descargado y normalizado | `src/data/seed/` (y se documenta en `03-fuentes-datos.md`) |
| Una decisión tomada | `MEMORY.md` § Decisiones |
| Una tarea pendiente | `MEMORY.md` § Pendientes |
| Un prompt que vas a reutilizar | `docs/05-ia/02-catalogo-prompts.md` |
| Un uso de IA | `docs/05-ia/03-registro-uso-ia.md` |
| Una regla de trabajo | `AGENTS.md` |
| Una duda sin resolver | `MEMORY.md` § Pendientes (no en un chat) |
| Un riesgo nuevo | `docs/03-plan/04-riesgos.md` |
| El guion del video | `docs/03-plan/03-alcance-producto.md` §7 o sección propia el 11 de noviembre |

---

## 5. Ciclo de vida de un documento

```
1. Se crea el archivo con su número y nombre
        ↓
2. Se registra en docs/00-INDEX.md  ← mismo commit
        ↓
3. Se enlaza desde donde sea relevante
        ↓
4. Se actualiza cuando cambia la realidad
        ↓
5. Si queda obsoleto: se marca [OBSOLETO] arriba y se deja
   (no se borra: el historial es evidencia del trabajo)
```

---

## 6. Estructura del código (desde el 14 de noviembre)

Se detalla en `TECH-STACK.md` §3. Resumen:

```
src/
├── app/          páginas (App Router)
├── components/   UI reutilizable
├── lib/          lógica pura: reglas, db, ia
├── data/         seed (real) y mock (ficticio)
└── types/        tipos compartidos
```

### Separación crítica

| Carpeta | Qué contiene | Regla |
|---|---|---|
| `data/seed/` | Datos reales de OSDR, normalizados | **Nunca se editan a mano.** Se regeneran con el script. |
| `data/mock/` | Datos ficticios para desarrollo | Siempre etiquetados como mock en la UI si se muestran. |
| `data/knowledge/` | Textos explicativos por indicador | Cada entrada con su `fuente`. |

**Mezclar seed con mock es el error que hace que un jurado desconfíe de todo lo demás.**

---

## 7. Estructura del repositorio público (entregable)

El submission exige un repositorio público. Su estructura mínima:

```
├── README.md              ← qué es, cómo correrlo, qué datos usa, declaración de SI
├── LICENSE                ← MIT o Apache-2.0
├── package.json
├── src/
├── public/
├── docs/                  ← esta carpeta, completa
└── scripts/
    └── fetch-osdr.sh      ← reproducibilidad: cómo se obtuvieron los datos
```

### El README público debe responder en 30 segundos:
1. ¿Qué hace?
2. ¿Cómo lo corro?
3. ¿Qué datos de NASA usa y de dónde salieron?
4. ¿Cómo se usó la IA?
5. ¿Qué no hace?

Si falta cualquiera de las cinco, el README no está terminado.

---

## 8. Anti-patrones de estructura

| ❌ Anti-patrón | Por qué duele |
|---|---|
| `docs2/`, `docs-final/`, `docs-viejo/` | Nadie sabe cuál es la verdad |
| Archivos sueltos en la raíz | La raíz es la carta de presentación del repo |
| `notas.txt`, `cosas.md`, `temp.md` | No se encuentran, no se mantienen |
| Documentación solo en WhatsApp o Discord | Se pierde y no es evidencia |
| Código sin `types/` | El hackathon se vuelve un caos de `any` |
| Datos reales y mock mezclados | Destruye la credibilidad |
| README escrito al final, a las 16:55 | Es el primer archivo que lee el jurado |

---

## 9. Checklist de estructura antes de enviar

- [ ] `README.md` responde las 5 preguntas.
- [ ] `LICENSE` existe y es open source.
- [ ] `docs/00-INDEX.md` lista todos los documentos existentes.
- [ ] No hay carpetas duplicadas ni archivos `temp`.
- [ ] `src/data/seed/` contiene solo datos reales, con su script de origen.
- [ ] La declaración de SI está en el README.
- [ ] El video está enlazado o incluido.
- [ ] El repo está público (probarlo en una ventana de incógnito).

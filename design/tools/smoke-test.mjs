/* Prueba local del plugin sin Figma.
 *
 * 1. Carga code.js en un contexto aislado con un doble de la API de Figma.
 * 2. Ejecuta build() y valida que las 6 pantallas midan 412x917 y no
 *    tengan coordenadas inválidas.
 * 3. Escribe un preview.html con las posiciones reales que produjo el
 *    plugin, para poder mirarlo en el navegador.
 *
 * Uso:  node design/tools/smoke-test.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const codePath = join(root, "design", "figma-plugin", "code.js");
const previewPath = join(root, "design", "out", "preview.html");

/* ---------------- doble de la API ---------------- */

let idSeq = 0;

function makeNode(type) {
  const node = {
    id: `${type}:${++idSeq}`,
    type,
    name: type,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fills: [],
    strokes: [],
    strokeWeight: 1,
    cornerRadius: 0,
    clipsContent: false,
    opacity: 1,
    characters: "",
    fontSize: 12,
    fontName: { family: "Inter", style: "Regular" },
    children: [],
    resize(w, h) {
      if (!Number.isFinite(w) || !Number.isFinite(h)) throw new Error(`${type}: resize inválido ${w}x${h}`);
      this.width = w;
      this.height = h;
    },
    appendChild(child) {
      if (!child) throw new Error(`${type}.appendChild(undefined)`);
      this.children.push(child);
      child.parent = this;
      if (child.type === "TEXT" && child.width === 0) {
        const lines = String(child.characters || "").split("\n");
        const longest = lines.reduce((a, b) => Math.max(a, b.length), 0);
        child.width = Math.round(longest * child.fontSize * 0.55);
        child.height = Math.round(lines.length * child.fontSize * 1.2);
      }
    },
    remove() {
      if (this.parent) this.parent.children = this.parent.children.filter((c) => c !== this);
    }
  };
  return node;
}

const pages = [];
let currentPage = null;

function createPage() {
  const page = makeNode("PAGE");
  page.name = "Página";
  pages.push(page);
  return page;
}

const paintStyles = [];
const textStyles = [];

const figma = {
  root: { children: pages },
  get currentPage() {
    if (!currentPage) currentPage = createPage();
    return currentPage;
  },
  set currentPage(page) {
    currentPage = page;
  },
  async setCurrentPageAsync(page) {
    currentPage = page;
  },
  createPage,
  createFrame() {
    return makeNode("FRAME");
  },
  createRectangle() {
    return makeNode("RECTANGLE");
  },
  createText() {
    return makeNode("TEXT");
  },
  createNodeFromSvg(svg) {
    const node = makeNode("SVG");
    node.svg = svg;
    node.width = Number((svg.match(/width="(\d+)"/) || [])[1] || 0);
    node.height = Number((svg.match(/height="(\d+)"/) || [])[1] || 0);
    return node;
  },
  createPaintStyle() {
    const s = { id: `S:${++idSeq}`, name: "", type: "PAINT", paints: [] };
    paintStyles.push(s);
    return s;
  },
  createTextStyle() {
    const s = { id: `T:${++idSeq}`, name: "", fontSize: 12 };
    textStyles.push(s);
    return s;
  },
  getLocalPaintStyles: () => paintStyles,
  getLocalTextStyles: () => textStyles,
  async loadFontAsync(font) {
    if (!font || !font.family) throw new Error("fuente inválida");
    return null;
  },
  notify(msg) {
    console.log("  [figma.notify]", msg);
  },
  closePlugin() {},
  viewport: { scrollAndZoomIntoView() {} },
  ui: null
};

/* ---------------- ejecución ---------------- */

const sandbox = { figma, console, Date, Math, JSON, Number, String };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

const code = readFileSync(codePath, "utf8");
vm.runInContext(code, sandbox, { filename: "code.js" });

if (!sandbox.__AEGIS__ || typeof sandbox.__AEGIS__.build !== "function") {
  throw new Error("El plugin no expuso __AEGIS__.build");
}

const result = await sandbox.__AEGIS__.build({ screens: true, system: true });

/* ---------------- validaciones ---------------- */

const errors = [];

if (result.screens !== 6) errors.push(`Se esperaban 6 pantallas, se crearon ${result.screens}`);
if (result.system !== true) errors.push("La página de sistema no se creó");

const screenPage = pages.find((p) => p.name === "AEGIS · Pantallas");
const systemPage = pages.find((p) => p.name === "AEGIS · Sistema");
if (!screenPage) errors.push("No existe la página AEGIS · Pantallas");
if (!systemPage) errors.push("No existe la página AEGIS · Sistema");

const shells = screenPage.children.filter((n) => n.type === "FRAME");
if (shells.length !== 6) errors.push(`Se esperaban 6 frames de pantalla, hay ${shells.length}`);

let previousRight = -Infinity;
for (const shell of shells) {
  if (shell.width !== 412 || shell.height !== 917) {
    errors.push(`${shell.name}: mide ${shell.width}x${shell.height}`);
  }
  if (!Number.isFinite(shell.x) || !Number.isFinite(shell.y)) {
    errors.push(`${shell.name}: posición inválida`);
  }
  if (shell.x < previousRight) {
    errors.push(`${shell.name}: se solapa con la pantalla anterior`);
  }
  previousRight = shell.x + shell.width;
  const inner = shell.children.find((c) => c.type === "SVG");
  if (!inner) errors.push(`${shell.name}: no tiene el SVG dentro`);
  else if (inner.width !== 412 || inner.height !== 917) {
    errors.push(`${shell.name}: el SVG mide ${inner.width}x${inner.height}`);
  }
}

const texts = [];
for (const page of pages) {
  for (const n of page.children) {
    if (n.type === "TEXT") texts.push(n);
  }
}
if (texts.length < 10) errors.push(`Muy poco texto nativo: ${texts.length}`);

/* ---------------- preview ---------------- */

const margin = 60;
const maxX = Math.max(...shells.map((s) => s.x + s.width)) + margin * 2;
const maxY = Math.max(...shells.map((s) => s.y + s.height)) + margin;

const labels = screenPage.children
  .filter((n) => n.type === "TEXT" && n.y < Math.min(...shells.map((s) => s.y)))
  .map(
    (n) =>
      `<div class="label" style="left:${n.x}px;top:${n.y}px;font-size:${n.fontSize}px">${n.characters}</div>`
  )
  .join("\n");

const shots = shells
  .map((s) => `<img class="screen" src="../pantallas/${s.name.slice(0, 2)}-${slug(s.name)}.svg" style="left:${s.x}px;top:${s.y}px" />`)
  .join("\n");

function slug(name) {
  const map = {
    "Dashboard de rutina": "dashboard-rutina",
    "Mapa corporal": "mapa-corporal",
    "Asistente de medición": "asistente-medicion",
    "Tarjeta de triage": "tarjeta-triage",
    "Selector de emergencia": "selector-emergencia",
    "Protocolo activo": "protocolo-activo"
  };
  return map[name.replace(/^\d+ · /, "")] || "";
}

const html = `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8" />
<style>
  body { margin:0; background:#05070b; color:#f6f7fb; font-family:Inter,system-ui,sans-serif; }
  #stage { position:relative; width:${maxX}px; height:${maxY}px; }
  .label { position:absolute; color:#f6f7fb; font-weight:700; white-space:nowrap; }
  .screen { position:absolute; width:412px; height:917px; }
</style></head>
<body><div id="stage">
${labels}
${shots}
</div></body></html>`;

writeFileSync(previewPath, html, "utf8");

console.log(`Nodos creados: ${idSeq}`);
console.log(`Páginas: ${pages.map((p) => p.name).join(" | ")}`);
console.log(`Estilos: ${paintStyles.length} de color, ${textStyles.length} de texto`);
console.log(`Texto nativo: ${texts.length} capas`);
console.log(`Preview: ${previewPath} (${maxX}x${maxY})`);

/* segunda ejecución: no debe encimar lo ya generado */
const before = new Set(shells.map((s) => s.id));
await sandbox.__AEGIS__.build({ screens: true, system: false });
const after = screenPage.children.filter((n) => n.type === "FRAME");
const second = after.filter((n) => !before.has(n.id));
const firstBottom = Math.max(...shells.map((s) => s.y + s.height));

if (second.length !== 6) errors.push(`La segunda ejecución creó ${second.length} pantallas`);
for (const s of second) {
  if (s.y < firstBottom) errors.push(`La segunda ejecución encima ${s.name} sobre la primera`);
}
console.log(`Segunda ejecución: ${second.length} pantallas colocadas debajo de la primera tanda.`);

if (errors.length > 0) {
  console.error("\nERRORES:");
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}

console.log("\nOK: 6 pantallas de 412x917 sin solapes.");

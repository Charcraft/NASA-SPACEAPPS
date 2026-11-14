/* Genera design/figma-plugin/code.js a partir de la plantilla
 * y de las 6 pantallas SVG congeladas en design/pantallas/.
 *
 * Uso:  node design/tools/build-plugin.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const screensDir = join(root, "design", "pantallas");
const templatePath = join(root, "design", "figma-plugin", "src", "template.js");
const outPath = join(root, "design", "figma-plugin", "code.js");

const META = {
  "01": ["Dashboard de rutina", "Modo rutina · estado general de un vistazo · selector C001–C004"],
  "02": ["Mapa corporal", "Explorar por sistema · 6 sistemas, 2 en atención"],
  "03": ["Asistente de medición", "Medición guiada paso 2/3 · glucosa capilar en microgravedad"],
  "04": ["Tarjeta de triage", "Semáforo con razón, acción y fuente · motor determinista local"],
  "05": ["Selector de emergencia", "Elegir el protocolo correcto en un toque"],
  "06": ["Protocolo activo", "Guía paso a paso bajo estrés · cronómetro y registro automático"]
};

const files = readdirSync(screensDir)
  .filter((f) => f.endsWith(".svg"))
  .sort();

if (files.length !== 6) {
  throw new Error(`Se esperaban 6 pantallas y hay ${files.length}: ${files.join(", ")}`);
}

const screens = files.map((file) => {
  const id = file.slice(0, 2);
  const meta = META[id];
  if (!meta) throw new Error(`Falta metadata para ${file}`);
  const svg = readFileSync(join(screensDir, file), "utf8");
  if (!svg.startsWith("<svg")) throw new Error(`${file} no parece un SVG`);
  if (!svg.includes('width="412"') || !svg.includes('height="917"')) {
    throw new Error(`${file} no mide 412x917`);
  }
  return { id, title: meta[0], subtitle: meta[1], file, svg };
});

const template = readFileSync(templatePath, "utf8");
if (!template.includes("__SCREENS__")) {
  throw new Error("La plantilla no tiene el marcador __SCREENS__");
}

const code = template.replace("__SCREENS__", JSON.stringify(screens, null, 2));
writeFileSync(outPath, code, "utf8");

const kb = (Buffer.byteLength(code, "utf8") / 1024).toFixed(1);
console.log(`code.js generado: ${kb} KB · ${screens.length} pantallas`);
for (const s of screens) {
  console.log(`  ${s.id} · ${s.title} (${s.file})`);
}

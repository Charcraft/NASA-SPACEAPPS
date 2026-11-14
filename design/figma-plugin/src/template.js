/* AEGIS · Maquetado — plugin de Figma
 * ------------------------------------------------------------------
 * Genera el maquetado de las 6 pantallas del alcance del producto y
 * una página de sistema de diseño, todo con capas nativas de Figma.
 *
 * NO usa la API de Figma ni internet: se ejecuta dentro del archivo
 * abierto y crea páginas, frames, texto y estilos.
 *
 * Este archivo lo genera `design/tools/build-plugin.mjs`. Si hay que
 * tocar la lógica, se edita `design/figma-plugin/src/template.js` y se
 * vuelve a construir. Ver `design/figma-plugin/README.md`.
 * ------------------------------------------------------------------ */

const SCREENS = __SCREENS__;

const COLOR = {
  bg: "#090C14",
  bgAlt: "#0B0F17",
  surface: "#131A27",
  surface2: "#1E293B",
  line: "#334155",
  text: "#F6F7FB",
  muted: "#9BA4B8",
  muted2: "#64748B",
  accent: "#D9FB76",
  ok: "#10B981",
  warn: "#F59E0B",
  danger: "#EF4444",
  info: "#38BDF8",
  ink: "#11180A",
  dangerBg: "#2A1215"
};

const TYPE = {
  display: 26,
  h1: 22,
  h2: 17,
  h3: 15,
  body: 11.5,
  label: 10,
  mono: 9
};

let fontCache = {};

function rgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255
  };
}

function solid(hex, opacity) {
  const paint = { type: "SOLID", color: rgb(hex) };
  if (typeof opacity === "number") paint.opacity = opacity;
  return paint;
}

async function loadFont(style) {
  const key = "Inter|" + style;
  if (fontCache[key]) return fontCache[key];
  const wanted = { family: "Inter", style: style };
  try {
    await figma.loadFontAsync(wanted);
    fontCache[key] = wanted;
    return wanted;
  } catch (e) {
    const fallback = { family: "Inter", style: "Regular" };
    await figma.loadFontAsync(fallback);
    fontCache[key] = fallback;
    return fallback;
  }
}

function log(text) {
  try {
    figma.ui.postMessage({ type: "log", text: text });
  } catch (e) {
    /* sin UI (pruebas locales) */
  }
}

function progress(done, total, label) {
  try {
    figma.ui.postMessage({ type: "progress", done: done, total: total, label: label });
  } catch (e) {
    /* sin UI (pruebas locales) */
  }
}

async function gotoPage(page) {
  if (typeof figma.setCurrentPageAsync === "function") {
    await figma.setCurrentPageAsync(page);
    return page;
  }
  figma.currentPage = page;
  return page;
}

function findOrCreatePage(name) {
  const pages = figma.root.children;
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].name === name) return pages[i];
  }
  const page = figma.createPage();
  page.name = name;
  return page;
}

/* ---------------------------------------------------------------- */
/* Estilos                                                           */
/* ---------------------------------------------------------------- */

function ensurePaintStyles() {
  findOrCreatePage("AEGIS · Sistema");
  const existing = figma.getLocalPaintStyles().filter(function (s) {
    return s.name.indexOf("AEGIS/") === 0;
  });
  if (existing.length > 0) return existing;

  const defs = [
    ["Fondo", COLOR.bg],
    ["Superficie", COLOR.surface],
    ["Superficie 2", COLOR.surface2],
    ["Borde", COLOR.line],
    ["Texto", COLOR.text],
    ["Texto atenuado", COLOR.muted],
    ["Acento", COLOR.accent],
    ["Nominal", COLOR.ok],
    ["Atención", COLOR.warn],
    ["Crítico", COLOR.danger],
    ["Informativo", COLOR.info],
    ["Tinta sobre acento", COLOR.ink]
  ];

  const created = [];
  for (let i = 0; i < defs.length; i++) {
    const style = figma.createPaintStyle();
    style.name = "AEGIS/" + defs[i][0];
    style.paints = [solid(defs[i][1])];
    created.push(style);
  }
  return created;
}

function ensureTextStyles() {
  const existing = figma.getLocalTextStyles().filter(function (s) {
    return s.name.indexOf("AEGIS/") === 0;
  });
  if (existing.length > 0) return existing;

  const defs = [
    ["Display/26", 26, "Extra Bold"],
    ["Título/22", 22, "Extra Bold"],
    ["Título/17", 17, "Bold"],
    ["Sección/15", 15, "Bold"],
    ["Cuerpo/11.5", 11.5, "Regular"],
    ["Etiqueta/10", 10, "Medium"],
    ["Dato/9 mono", 9, "Regular"]
  ];

  const created = [];
  for (let i = 0; i < defs.length; i++) {
    const style = figma.createTextStyle();
    style.name = "AEGIS/" + defs[i][0];
    style.fontSize = defs[i][1];
    created.push(style);
  }
  return created;
}

/* ---------------------------------------------------------------- */
/* Helpers de construcción                                           */
/* ---------------------------------------------------------------- */

function addFrame(parent, name, x, y, w, h, opts) {
  const o = opts || {};
  const frame = figma.createFrame();
  frame.name = name;
  frame.resize(w, h);
  frame.x = x;
  frame.y = y;
  frame.fills = o.fill ? [solid(o.fill)] : [];
  frame.strokes = o.stroke ? [solid(o.stroke)] : [];
  if (o.stroke) frame.strokeWeight = o.strokeWidth || 1;
  frame.cornerRadius = o.radius || 0;
  frame.clipsContent = o.clip !== false;
  parent.appendChild(frame);
  return frame;
}

function addRect(parent, name, x, y, w, h, fill, radius, stroke) {
  const rect = figma.createRectangle();
  rect.name = name;
  rect.resize(w, h);
  rect.x = x;
  rect.y = y;
  rect.fills = fill ? [solid(fill)] : [];
  rect.strokes = stroke ? [solid(stroke)] : [];
  if (stroke) rect.strokeWeight = 1;
  rect.cornerRadius = radius || 0;
  parent.appendChild(rect);
  return rect;
}

async function addText(parent, name, content, x, y, opts) {
  const o = opts || {};
  const node = figma.createText();
  node.name = name;
  node.fontName = await loadFont(o.weight || "Regular");
  node.fontSize = o.size || TYPE.body;
  node.characters = content;
  node.textAutoResize = "WIDTH_AND_HEIGHT";
  node.fills = [solid(o.color || COLOR.text)];
  node.x = x;
  node.y = y;
  if (o.opacity) node.opacity = o.opacity;
  parent.appendChild(node);
  return node;
}

/* Devuelve la Y libre para no encimar una segunda ejecución sobre la primera. */
function nextFreeY(page) {
  if (!page.children || page.children.length === 0) return 0;
  let bottom = 0;
  for (let i = 0; i < page.children.length; i++) {
    const child = page.children[i];
    if (typeof child.y === "number" && typeof child.height === "number") {
      bottom = Math.max(bottom, child.y + child.height);
    }
  }
  return bottom + 160;
}

/* ---------------------------------------------------------------- */
/* Pantallas                                                         */
/* ---------------------------------------------------------------- */

async function buildScreens(page) {
  await gotoPage(page);

  const originY = nextFreeY(page);

  const title = await addText(
    page,
    "Cabecera · título",
    "AEGIS · Órbita — maquetado de las 6 pantallas",
    0,
    originY,
    { size: 32, weight: "Extra Bold", color: COLOR.text }
  );

  await addText(
    page,
    "Cabecera · subtítulo",
    "NASA Space Apps 2026 · Equipo ROCKET · Datos NASA OSDR OSD-575 · Prototipo educativo, no es un dispositivo médico",
    0,
    title.y + title.height + 10,
    { size: 14, weight: "Regular", color: COLOR.muted }
  );

  const startY = title.y + title.height + 78;
  const gap = 120;
  const frames = [];

  for (let i = 0; i < SCREENS.length; i++) {
    const s = SCREENS[i];
    const x = i * (412 + gap);

    const label = await addText(page, "Etiqueta · " + s.id, s.id + " · " + s.title, x, startY - 46, {
      size: 16,
      weight: "Bold",
      color: COLOR.text
    });
    if (!label) throw new Error("No se pudo crear la etiqueta " + s.id);

    await addText(page, "Descripción · " + s.id, s.subtitle, x, startY - 24, {
      size: 11,
      weight: "Regular",
      color: COLOR.muted
    });

    const shell = addFrame(page, s.id + " · " + s.title, x, startY, 412, 917, {
      fill: COLOR.bg,
      radius: 28,
      clip: true
    });

    const imported = figma.createNodeFromSvg(s.svg);
    imported.name = s.id + " · contenido";
    shell.appendChild(imported);
    imported.x = 0;
    imported.y = 0;

    frames.push(shell);
    progress(i + 1, SCREENS.length, s.title);
    log("Pantalla " + s.id + " creada: " + s.title);
  }

  return frames;
}

/* ---------------------------------------------------------------- */
/* Página de sistema                                                 */
/* ---------------------------------------------------------------- */

async function buildSystemPage(page) {
  await gotoPage(page);

  const originY = nextFreeY(page);

  const board = addFrame(page, "Sistema · tablero", 0, originY, 1520, 1180, {
    fill: COLOR.bg,
    radius: 24,
    clip: true
  });

  await addText(board, "Sistema · título", "Sistema de diseño AEGIS", 56, 48, {
    size: 34,
    weight: "Extra Bold",
    color: COLOR.text
  });

  await addText(
    board,
    "Sistema · subtítulo",
    "Oscuro por diseño: cabina con poca luz, estrés alto, guantes. Contraste alto, letra grande, nunca solo color.",
    56,
    96,
    { size: 14, weight: "Regular", color: COLOR.muted }
  );

  /* Paleta */
  await addText(board, "Paleta · título", "Color", 56, 160, {
    size: 18,
    weight: "Bold",
    color: COLOR.text
  });

  const swatches = [
    ["Fondo", COLOR.bg],
    ["Superficie", COLOR.surface],
    ["Superficie 2", COLOR.surface2],
    ["Borde", COLOR.line],
    ["Texto", COLOR.text],
    ["Atenuado", COLOR.muted],
    ["Acento", COLOR.accent],
    ["Nominal", COLOR.ok],
    ["Atención", COLOR.warn],
    ["Crítico", COLOR.danger],
    ["Informativo", COLOR.info]
  ];

  for (let i = 0; i < swatches.length; i++) {
    const x = 56 + i * 128;
    addRect(board, "Swatch · " + swatches[i][0], x, 196, 112, 76, swatches[i][1], 12, COLOR.line);
    await addText(board, "Swatch nombre · " + swatches[i][0], swatches[i][0], x, 282, {
      size: 11,
      weight: "Semi Bold",
      color: COLOR.text
    });
    await addText(board, "Swatch hex · " + swatches[i][0], swatches[i][1], x, 298, {
      size: 10,
      weight: "Regular",
      color: COLOR.muted
    });
  }

  /* Tipografía */
  await addText(board, "Tipografía · título", "Tipografía", 56, 360, {
    size: 18,
    weight: "Bold",
    color: COLOR.text
  });

  await addText(board, "Tipo · display", "Afloja el traje y avisa a Tierra.", 56, 400, {
    size: 34,
    weight: "Extra Bold",
    color: COLOR.text
  });
  await addText(board, "Tipo · 26", "DOLOR TORÁCICO · 26 px", 56, 452, {
    size: 26,
    weight: "Extra Bold",
    color: COLOR.text
  });
  await addText(board, "Tipo · 17", "1 indicador fuera de tu línea base · 17 px", 56, 496, {
    size: 17,
    weight: "Bold",
    color: COLOR.text
  });
  await addText(board, "Tipo · 11.5", "Cuerpo de lectura en cabina: 11.5 px mínimo, interlineado 1.5 · 11.5 px", 56, 530, {
    size: 11.5,
    weight: "Regular",
    color: COLOR.muted
  });
  await addText(board, "Tipo · mono", "14:31:08  Paso 1 «Detente y siéntate» · JetBrains Mono 9 px para datos", 56, 556, {
    size: 10,
    weight: "Regular",
    color: COLOR.info
  });

  /* Reglas */
  await addText(board, "Reglas · título", "Reglas no negociables", 56, 616, {
    size: 18,
    weight: "Bold",
    color: COLOR.text
  });

  const rules = [
    ["Semáforo", "Color + icono + palabra. Nunca solo color (daltonismo y poca luz)."],
    ["Tamaño", "Texto de lectura ≥ 11.5 px. Acciones ≥ 46 px de alto para guantes."],
    ["Tono", "Directo, sin jerga, sin alarmismo. Una acción por pantalla en emergencia."],
    ["Alcance", "No diagnostica, no recomienda fármacos ni dosis. Cada umbral con fuente."],
    ["Offline", "Todo se guarda local. La app nunca bloquea esperando red."]
  ];

  for (let i = 0; i < rules.length; i++) {
    const y = 656 + i * 44;
    addRect(board, "Regla punto · " + i, 56, y + 8, 8, 8, COLOR.accent, 4);
    await addText(board, "Regla etiqueta · " + i, rules[i][0], 80, y, {
      size: 12,
      weight: "Bold",
      color: COLOR.text
    });
    await addText(board, "Regla texto · " + i, rules[i][1], 196, y, {
      size: 12,
      weight: "Regular",
      color: COLOR.muted
    });
  }

  /* Espaciado */
  await addText(board, "Espaciado · título", "Espaciado y radios", 56, 906, {
    size: 18,
    weight: "Bold",
    color: COLOR.text
  });

  const spaces = [4, 8, 12, 16, 18, 22, 24, 28, 32];
  for (let i = 0; i < spaces.length; i++) {
    const x = 56 + i * 60;
    addRect(board, "Espacio · " + spaces[i], x, 944, spaces[i] * 2, 8, COLOR.accent, 4);
    await addText(board, "Espacio valor · " + spaces[i], String(spaces[i]), x, 960, {
      size: 10,
      weight: "Regular",
      color: COLOR.muted
    });
  }

  await addText(board, "Radios", "Radios: 6 chips · 12 botones pequeños · 16 tarjetas · 22 tarjeta principal · 28 pantalla", 56, 1000, {
    size: 11,
    weight: "Regular",
    color: COLOR.muted
  });

  await addText(
    board,
    "Pie",
    "Generado por el plugin «AEGIS · Maquetado» · 2026-11-14 · Fuente de verdad de los datos: docs/02-investigacion y OSDR OSD-575",
    56,
    1100,
    { size: 10, weight: "Regular", color: COLOR.muted2 }
  );

  return board;
}

/* ---------------------------------------------------------------- */
/* Arranque                                                          */
/* ---------------------------------------------------------------- */

async function build(options) {
  const started = Date.now();
  const doScreens = options.screens !== false;
  const doSystem = options.system !== false;

  const created = { screens: 0, system: false };

  await loadFont("Regular");
  await loadFont("Bold");

  ensurePaintStyles();
  ensureTextStyles();
  log("Estilos AEGIS creados o reutilizados.");

  let frames = [];
  if (doScreens) {
    const screenPage = findOrCreatePage("AEGIS · Pantallas");
    frames = await buildScreens(screenPage);
    created.screens = frames.length;
    await gotoPage(screenPage);
  }

  if (doSystem) {
    const systemPage = findOrCreatePage("AEGIS · Sistema");
    const board = await buildSystemPage(systemPage);
    created.system = true;
    if (frames.length > 0) {
      await gotoPage(findOrCreatePage("AEGIS · Pantallas"));
      figma.viewport.scrollAndZoomIntoView(frames);
      figma.currentPage.selection = frames;
    } else {
      await gotoPage(systemPage);
      figma.viewport.scrollAndZoomIntoView([board]);
    }
  } else if (frames.length > 0) {
    figma.viewport.scrollAndZoomIntoView(frames);
    figma.currentPage.selection = frames;
  }

  const ms = Date.now() - started;
  const msg = "Listo: " + created.screens + " pantallas y página de sistema (" + ms + " ms).";
  log(msg);
  figma.notify("AEGIS: maquetado generado (" + created.screens + " pantallas)");
  return created;
}

/* Punto de entrada para las pruebas locales (no hace nada en Figma). */
if (typeof globalThis !== "undefined") {
  globalThis.__AEGIS__ = { build: build };
}

if (typeof figma !== "undefined" && figma.ui) {
  figma.showUI(__html__, { width: 340, height: 430, themeColors: true });

  figma.ui.onmessage = async function (msg) {
    if (msg.type === "build") {
      try {
        figma.ui.postMessage({ type: "busy", value: true });
        await build({ screens: msg.screens, system: msg.system });
        figma.ui.postMessage({ type: "done" });
      } catch (e) {
        figma.ui.postMessage({ type: "error", text: String(e && e.message ? e.message : e) });
      } finally {
        figma.ui.postMessage({ type: "busy", value: false });
      }
    }
    if (msg.type === "close") figma.closePlugin();
  };
}

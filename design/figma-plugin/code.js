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

const SCREENS = [
  {
    "id": "01",
    "title": "Dashboard de rutina",
    "subtitle": "Modo rutina · estado general de un vistazo · selector C001–C004",
    "file": "01-dashboard-rutina.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad01\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#090C14\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n    <linearGradient id=\"amberCardGrad\" x1=\"0\" y1=\"0\" x2=\"364\" y2=\"120\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#231B12\"/>\n      <stop offset=\"100%\" stop-color=\"#131A27\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Fondo principal -->\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad01)\"/>\n\n  <!-- Barra de estado superior -->\n  <g id=\"StatusBar\">\n    <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:22 UTC</text>\n    <rect x=\"132\" y=\"13\" width=\"112\" height=\"18\" rx=\"9\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"144\" cy=\"22\" r=\"3.5\" fill=\"#D9FB76\"/>\n    <text x=\"153\" y=\"25\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">OFFLINE · LOCAL</text>\n    <text x=\"272\" y=\"26\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"500\">DELAY +14m 20s</text>\n  </g>\n\n  <!-- Cabecera AEGIS + Selector Modo -->\n  <g id=\"Header\">\n    <text x=\"24\" y=\"64\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"22\" font-weight=\"700\" letter-spacing=\"0.5\">AEGIS · ÓRBITA</text>\n    <text x=\"24\" y=\"81\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Autonomía de Salud · NASA OSDR OSD-575</text>\n\n    <!-- Botón SOS / Emergencia -->\n    <rect x=\"282\" y=\"46\" width=\"106\" height=\"36\" rx=\"18\" fill=\"#2A1215\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n    <circle cx=\"298\" cy=\"64\" r=\"4\" fill=\"#EF4444\"/>\n    <text x=\"308\" y=\"68\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">EMERGENCIA</text>\n  </g>\n\n  <!-- Selector de Tripulante (C001 - C004 de OSD-575) -->\n  <g id=\"CrewSelector\">\n    <!-- C001 -->\n    <rect x=\"24\" y=\"98\" width=\"85\" height=\"54\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"36\" y=\"118\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">C001</text>\n    <circle cx=\"95\" cy=\"114\" r=\"4\" fill=\"#10B981\"/>\n    <text x=\"36\" y=\"134\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">CMO · R+1</text>\n    <text x=\"36\" y=\"146\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"8\" font-weight=\"600\">Nominal</text>\n\n    <!-- C002 -->\n    <rect x=\"117\" y=\"98\" width=\"85\" height=\"54\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"129\" y=\"118\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">C002</text>\n    <circle cx=\"188\" cy=\"114\" r=\"4\" fill=\"#10B981\"/>\n    <text x=\"129\" y=\"134\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Piloto · R+1</text>\n    <text x=\"129\" y=\"146\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"8\" font-weight=\"600\">Nominal</text>\n\n    <!-- C003 · activo -->\n    <rect x=\"210\" y=\"98\" width=\"85\" height=\"54\" rx=\"14\" fill=\"#131A27\" stroke=\"#D9FB76\" stroke-width=\"1.5\"/>\n    <text x=\"222\" y=\"118\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"700\">C003</text>\n    <circle cx=\"281\" cy=\"114\" r=\"4\" fill=\"#F59E0B\"/>\n    <text x=\"222\" y=\"134\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">Espec. · R+1</text>\n    <text x=\"222\" y=\"146\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"8\" font-weight=\"700\">Glucosa ↑</text>\n\n    <!-- C004 -->\n    <rect x=\"303\" y=\"98\" width=\"85\" height=\"54\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"315\" y=\"118\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">C004</text>\n    <circle cx=\"374\" cy=\"114\" r=\"4\" fill=\"#10B981\"/>\n    <text x=\"315\" y=\"134\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Cmdte · R+1</text>\n    <text x=\"315\" y=\"146\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"8\" font-weight=\"600\">Nominal</text>\n  </g>\n\n  <!-- Barra de los 5 Peligros NASA HRP -->\n  <g id=\"HrpHazardsBar\">\n    <rect x=\"24\" y=\"164\" width=\"364\" height=\"52\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"36\" y=\"180\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.8\">5 PELIGROS NASA HRP · CONTEXTO AMBIENTAL</text>\n\n    <!-- Pills de los 5 riesgos -->\n    <rect x=\"36\" y=\"188\" width=\"62\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"43\" y=\"201\" fill=\"#10B981\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">RAD 0.4mSv</text>\n\n    <rect x=\"104\" y=\"188\" width=\"66\" height=\"20\" rx=\"6\" fill=\"#2A2012\" stroke=\"#F59E0B\" stroke-width=\"0.8\"/>\n    <text x=\"111\" y=\"201\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">μG · SANS</text>\n\n    <rect x=\"176\" y=\"188\" width=\"66\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"183\" y=\"201\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">CO₂ 2.8mmHg</text>\n\n    <rect x=\"248\" y=\"188\" width=\"62\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"255\" y=\"201\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">SUEÑO 6.8h</text>\n\n    <rect x=\"316\" y=\"188\" width=\"60\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"323\" y=\"201\" fill=\"#38BDF8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">AUTÓNOMO</text>\n  </g>\n\n  <!-- Banner de Estado General / Triage -->\n  <g id=\"StatusSummaryCard\">\n    <rect x=\"24\" y=\"228\" width=\"364\" height=\"106\" rx=\"18\" fill=\"url(#amberCardGrad)\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n    <rect x=\"40\" y=\"244\" width=\"110\" height=\"22\" rx=\"11\" fill=\"#F59E0B\"/>\n    <text x=\"52\" y=\"258\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">● ATENCIÓN · R+1</text>\n    <text x=\"276\" y=\"258\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"500\">BASE PERSONAL: L-44</text>\n\n    <text x=\"40\" y=\"286\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"17\" font-weight=\"700\">1 indicador fuera de tu línea base</text>\n    <text x=\"40\" y=\"305\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"400\">Glucosa 103 mg/dL · +44.4 % vs tu media pre-vuelo</text>\n    <text x=\"40\" y=\"322\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">Acción: Repetir medición en 2 h tras hidratación →</text>\n  </g>\n\n  <!-- Título de sección Signos Vitales y Panel Metabólico -->\n  <text x=\"24\" y=\"358\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\" letter-spacing=\"0.8\">SIGNOS VITALES Y PANEL METABÓLICO (OSD-575)</text>\n  <text x=\"312\" y=\"358\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">Ver serie L→R ↗</text>\n\n  <!-- Grid 2x2 de Tarjetas de Signos Vitales -->\n  <!-- Card 1: Frecuencia Cardíaca -->\n  <g id=\"CardHR\">\n    <rect x=\"24\" y=\"370\" width=\"176\" height=\"118\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"38\" y=\"392\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">PULSO CARDÍACO</text>\n    <circle cx=\"182\" cy=\"388\" r=\"4.5\" fill=\"#10B981\"/>\n    <text x=\"38\" y=\"430\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"30\" font-weight=\"700\">72</text>\n    <text x=\"84\" y=\"430\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"500\">lpm</text>\n    <!-- Mini sparkline -->\n    <path d=\"M38 452 L62 449 L86 451 L110 446 L134 448 L158 442 L182 444\" stroke=\"#10B981\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n    <text x=\"38\" y=\"474\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">Base L-44: 68 lpm (+5.8%)</text>\n  </g>\n\n  <!-- Card 2: SpO2 -->\n  <g id=\"CardSpO2\">\n    <rect x=\"212\" y=\"370\" width=\"176\" height=\"118\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"226\" y=\"392\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">OXÍGENO (SpO₂)</text>\n    <circle cx=\"370\" cy=\"388\" r=\"4.5\" fill=\"#10B981\"/>\n    <text x=\"226\" y=\"430\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"30\" font-weight=\"700\">98</text>\n    <text x=\"272\" y=\"430\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">%</text>\n    <!-- Mini sparkline -->\n    <path d=\"M226 446 L250 446 L274 448 L298 446 L322 445 L346 447 L370 446\" stroke=\"#D9FB76\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n    <text x=\"226\" y=\"474\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">Base L-44: 99% (Nominal)</text>\n  </g>\n\n  <!-- Card 3: Glucosa (OSD-575 real alert) -->\n  <g id=\"CardGlucose\">\n    <rect x=\"24\" y=\"500\" width=\"176\" height=\"118\" rx=\"16\" fill=\"#131A27\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n    <text x=\"38\" y=\"522\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">GLUCOSA (OSD-575)</text>\n    <circle cx=\"182\" cy=\"518\" r=\"4.5\" fill=\"#F59E0B\"/>\n    <text x=\"38\" y=\"560\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"30\" font-weight=\"700\">103</text>\n    <text x=\"102\" y=\"560\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"11\" font-weight=\"600\">mg/dL</text>\n    <!-- Mini sparkline showing spike at R+1 -->\n    <path d=\"M38 584 L62 582 L86 583 L110 568 L134 579 L158 581 L182 580\" stroke=\"#F59E0B\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n    <circle cx=\"110\" cy=\"568\" r=\"3\" fill=\"#F59E0B\"/>\n    <text x=\"38\" y=\"604\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">Rango: 65–99 · Base: 71</text>\n  </g>\n\n  <!-- Card 4: Presión Arterial + Proteína C Reactiva -->\n  <g id=\"CardBP\">\n    <rect x=\"212\" y=\"500\" width=\"176\" height=\"118\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"226\" y=\"522\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">PRESIÓN ARTERIAL</text>\n    <circle cx=\"370\" cy=\"518\" r=\"4.5\" fill=\"#10B981\"/>\n    <text x=\"226\" y=\"560\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"24\" font-weight=\"700\">118/76</text>\n    <text x=\"322\" y=\"560\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"500\">mmHg</text>\n    <path d=\"M226 582 L250 580 L274 581 L298 577 L322 579 L346 578 L370 578\" stroke=\"#10B981\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n    <text x=\"226\" y=\"604\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">Base L-44: 115/74 mmHg</text>\n  </g>\n\n  <!-- Serie Longitudinal OSD-575 (L-92 a R+194) -->\n  <g id=\"TimelineCard\">\n    <rect x=\"24\" y=\"632\" width=\"364\" height=\"132\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"40\" y=\"654\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">Línea base personal · C003</text>\n    <text x=\"372\" y=\"654\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\" text-anchor=\"end\">4 PUNTOS · OSD-575</text>\n\n    <!-- Banda de referencia 65-99 mg/dL -->\n    <rect x=\"40\" y=\"684\" width=\"332\" height=\"32\" rx=\"4\" fill=\"#10B981\" fill-opacity=\"0.1\"/>\n    <line x1=\"40\" y1=\"684\" x2=\"372\" y2=\"684\" stroke=\"#F59E0B\" stroke-width=\"1\" stroke-dasharray=\"4 4\"/>\n    <text x=\"248\" y=\"680\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"8\">UMBRAL 99</text>\n\n    <!-- Serie real de C003: 77 · 62 · 75 · 103 mg/dL (OSD-575) -->\n    <path d=\"M52 705 L152 719 L252 707 L352 680\" stroke=\"#D9FB76\" stroke-width=\"2.5\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n    <circle cx=\"52\" cy=\"705\" r=\"3.5\" fill=\"#10B981\"/>\n    <circle cx=\"152\" cy=\"719\" r=\"3.5\" fill=\"#F59E0B\"/>\n    <circle cx=\"252\" cy=\"707\" r=\"3.5\" fill=\"#10B981\"/>\n    <circle cx=\"352\" cy=\"680\" r=\"5\" fill=\"#F59E0B\" stroke=\"#090C14\" stroke-width=\"1.5\"/>\n\n    <!-- Etiquetas eje X -->\n    <text x=\"42\" y=\"746\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\">L-92</text>\n    <text x=\"142\" y=\"746\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\">L-44</text>\n    <text x=\"242\" y=\"746\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\">L-3</text>\n    <text x=\"332\" y=\"746\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"700\">R+1</text>\n  </g>\n\n  <!-- CTA Principal: Nueva Medición Guiada -->\n  <g id=\"PrimaryCTA\">\n    <rect x=\"24\" y=\"778\" width=\"364\" height=\"50\" rx=\"25\" fill=\"#D9FB76\"/>\n    <text x=\"52\" y=\"808\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">+  Iniciar medición guiada paso a paso</text>\n    <text x=\"350\" y=\"808\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"18\" font-weight=\"700\">↗</text>\n  </g>\n\n  <!-- Barra de Navegación Inferior + Disclaimer -->\n  <g id=\"BottomNav\">\n    <rect x=\"24\" y=\"840\" width=\"364\" height=\"44\" rx=\"22\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <rect x=\"30\" y=\"845\" width=\"90\" height=\"34\" rx=\"17\" fill=\"#1E293B\"/>\n    <text x=\"47\" y=\"866\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Dashboard</text>\n    <text x=\"142\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Cuerpo 3D</text>\n    <text x=\"232\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Medición</text>\n    <text x=\"312\" y=\"866\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">Protocolos</text>\n  </g>\n\n  <text x=\"58\" y=\"898\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">Prototipo educativo NASA Space Apps 2026 · No es un dispositivo médico.</text>\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  },
  {
    "id": "02",
    "title": "Mapa corporal",
    "subtitle": "Explorar por sistema · 6 sistemas, 2 en atención",
    "file": "02-mapa-corporal.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad02\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#090C14\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n    <radialGradient id=\"bodyGlow\" cx=\"50%\" cy=\"42%\" r=\"45%\">\n      <stop offset=\"0%\" stop-color=\"#38BDF8\" stop-opacity=\"0.16\"/>\n      <stop offset=\"100%\" stop-color=\"#090C14\" stop-opacity=\"0\"/>\n    </radialGradient>\n  </defs>\n\n  <!-- Fondo -->\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad02)\"/>\n  <circle cx=\"206\" cy=\"390\" r=\"185\" fill=\"url(#bodyGlow)\"/>\n\n  <!-- Barra de estado -->\n  <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:23 UTC</text>\n  <text x=\"259\" y=\"26\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">SEÑAL  •••  100%</text>\n\n  <!-- Cabecera -->\n  <rect x=\"24\" y=\"44\" width=\"96\" height=\"36\" rx=\"12\" fill=\"#131A27\"/>\n  <text x=\"38\" y=\"66\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"13\" font-weight=\"600\">←  Volver</text>\n  <text x=\"136\" y=\"60\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"16\" font-weight=\"700\">MAPA CORPORAL</text>\n  <text x=\"136\" y=\"76\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"500\">TRIPULANTE C003 · TRAJE A-01</text>\n\n  <!-- Filtros de sistema -->\n  <rect x=\"24\" y=\"92\" width=\"114\" height=\"28\" rx=\"14\" fill=\"#D9FB76\"/>\n  <text x=\"40\" y=\"110\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">6 Sistemas</text>\n  <rect x=\"146\" y=\"92\" width=\"118\" height=\"28\" rx=\"14\" fill=\"#131A27\" stroke=\"#F59E0B\" stroke-width=\"1\"/>\n  <text x=\"160\" y=\"110\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\">● 2 en Atención</text>\n  <rect x=\"272\" y=\"92\" width=\"116\" height=\"28\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n  <text x=\"288\" y=\"110\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Microgravedad</text>\n\n  <!-- Escena central del cuerpo humano anatómico vectorial + Nodos -->\n  <g id=\"BodyMapScene\">\n    <!-- Retícula espacial de telemetría -->\n    <circle cx=\"206\" cy=\"360\" r=\"145\" stroke=\"#1E293B\" stroke-width=\"1\" stroke-dasharray=\"4 6\"/>\n    <circle cx=\"206\" cy=\"360\" r=\"105\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <line x1=\"206\" y1=\"180\" x2=\"206\" y2=\"545\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <line x1=\"60\" y1=\"360\" x2=\"352\" y2=\"360\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n\n    <!-- Silueta anatómica del astronauta (SVG puro editable en Figma) -->\n    <!-- Cabeza y casco -->\n    <circle cx=\"206\" cy=\"212\" r=\"24\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n    <!-- Torso -->\n    <path d=\"M174 244 C174 238 238 238 238 244 L246 356 C246 364 166 364 166 356 Z\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"2\"/>\n    <!-- Brazo Izquierdo -->\n    <path d=\"M172 248 L142 338 L156 344 L178 274\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.8\"/>\n    <!-- Brazo Derecho -->\n    <path d=\"M240 248 L270 338 L256 344 L234 274\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.8\"/>\n    <!-- Pierna Izquierda -->\n    <path d=\"M174 360 L166 492 L188 492 L198 360\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.8\"/>\n    <!-- Pierna Derecha -->\n    <path d=\"M214 360 L224 492 L246 492 L238 360\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.8\"/>\n\n    <!-- Nodos fisiológicos sobre el cuerpo -->\n    <!-- 1. Neuro-ocular / SANS (Cabeza) -->\n    <circle cx=\"206\" cy=\"206\" r=\"10\" fill=\"#F59E0B\" fill-opacity=\"0.25\"/>\n    <circle cx=\"206\" cy=\"206\" r=\"5\" fill=\"#F59E0B\"/>\n    <line x1=\"214\" y1=\"206\" x2=\"262\" y2=\"176\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n\n    <!-- 2. Cardiovascular (Corazón) -->\n    <circle cx=\"214\" cy=\"282\" r=\"11\" fill=\"#10B981\" fill-opacity=\"0.25\"/>\n    <circle cx=\"214\" cy=\"282\" r=\"5\" fill=\"#10B981\"/>\n    <line x1=\"222\" y1=\"282\" x2=\"262\" y2=\"272\" stroke=\"#10B981\" stroke-width=\"1.5\"/>\n\n    <!-- 3. Respiratorio (Pulmones) -->\n    <circle cx=\"192\" cy=\"274\" r=\"9\" fill=\"#10B981\" fill-opacity=\"0.25\"/>\n    <circle cx=\"192\" cy=\"274\" r=\"4.5\" fill=\"#10B981\"/>\n    <line x1=\"184\" y1=\"274\" x2=\"144\" y2=\"250\" stroke=\"#10B981\" stroke-width=\"1.5\"/>\n\n    <!-- 4. Metabólico / Hepático (Abdomen - OSD-575) -->\n    <circle cx=\"196\" cy=\"326\" r=\"12\" fill=\"#F59E0B\" fill-opacity=\"0.3\"/>\n    <circle cx=\"196\" cy=\"326\" r=\"6\" fill=\"#F59E0B\"/>\n    <line x1=\"188\" y1=\"326\" x2=\"144\" y2=\"346\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n\n    <!-- 5. Musculoesquelético (Fémur / Columna) -->\n    <circle cx=\"230\" cy=\"418\" r=\"10\" fill=\"#10B981\" fill-opacity=\"0.25\"/>\n    <circle cx=\"230\" cy=\"418\" r=\"5\" fill=\"#10B981\"/>\n    <line x1=\"238\" y1=\"418\" x2=\"262\" y2=\"418\" stroke=\"#10B981\" stroke-width=\"1.5\"/>\n\n    <!-- Callout Cards flotantes alrededor del astronauta -->\n    <!-- Callout Neuro-Ocular (SANS) -->\n    <rect x=\"262\" y=\"152\" width=\"126\" height=\"52\" rx=\"12\" fill=\"#131A27\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n    <text x=\"274\" y=\"170\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">NEURO · SANS</text>\n    <text x=\"274\" y=\"185\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"11\" font-weight=\"600\">Fluido cefálico ↑</text>\n    <text x=\"274\" y=\"197\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"8.5\">Test Amsler sugerido</text>\n\n    <!-- Callout Respiratorio -->\n    <rect x=\"24\" y=\"226\" width=\"120\" height=\"50\" rx=\"12\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"36\" y=\"244\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">RESPIRATORIO</text>\n    <text x=\"36\" y=\"260\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">SpO₂ 98% · 14 rpm</text>\n    <text x=\"36\" y=\"271\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"8.5\">Nominal en cabina</text>\n\n    <!-- Callout Cardiovascular -->\n    <rect x=\"262\" y=\"248\" width=\"126\" height=\"50\" rx=\"12\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"274\" y=\"266\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">CARDIOVASCULAR</text>\n    <text x=\"274\" y=\"282\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"600\">72 lpm · 118/76</text>\n    <text x=\"274\" y=\"293\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"8.5\">Ritmo sinusal normal</text>\n\n    <!-- Callout Metabólico (Seleccionado) -->\n    <rect x=\"24\" y=\"320\" width=\"124\" height=\"60\" rx=\"12\" fill=\"#231B12\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n    <text x=\"36\" y=\"338\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">● METABÓLICO</text>\n    <text x=\"36\" y=\"354\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"700\">Glucosa 103 mg/dL</text>\n    <text x=\"36\" y=\"368\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">AST 18 U/L · ALT 19 U/L</text>\n\n    <!-- Callout Musculoesquelético -->\n    <rect x=\"262\" y=\"394\" width=\"126\" height=\"50\" rx=\"12\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"274\" y=\"412\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">ÓSEO / MUSCULAR</text>\n    <text x=\"274\" y=\"428\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"11\" font-weight=\"600\">Ca²⁺ 9.4 mg/dL</text>\n    <text x=\"274\" y=\"439\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"8.5\">ARED: 120 min compl.</text>\n\n    <!-- Callout Radiación / Inmune -->\n    <rect x=\"24\" y=\"458\" width=\"124\" height=\"50\" rx=\"12\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"36\" y=\"476\" fill=\"#38BDF8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">INMUNE / RAD</text>\n    <text x=\"36\" y=\"492\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"11\" font-weight=\"600\">PCR 0.8 mg/L</text>\n    <text x=\"36\" y=\"503\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"8.5\">Dosis acum: 12.4 mSv</text>\n  </g>\n\n  <!-- Panel Inferior: Detalle del Sistema Seleccionado (Metabólico OSD-575) -->\n  <g id=\"SystemDetailSheet\">\n    <rect x=\"24\" y=\"560\" width=\"364\" height=\"268\" rx=\"22\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1.5\"/>\n    <rect x=\"176\" y=\"570\" width=\"60\" height=\"4\" rx=\"2\" fill=\"#334155\"/>\n\n    <text x=\"44\" y=\"598\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\" letter-spacing=\"0.8\">SISTEMA SELECCIONADO · PANEL BIOQUÍMICO OSD-575</text>\n    <text x=\"44\" y=\"622\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"20\" font-weight=\"700\">Metabólico y Hepático</text>\n    <text x=\"44\" y=\"642\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\">La microgravedad eleva glucosa y transaminasas.</text>\n\n    <!-- 3 Mini métricas del sistema -->\n    <rect x=\"44\" y=\"658\" width=\"102\" height=\"84\" rx=\"14\" fill=\"#090C14\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n    <text x=\"56\" y=\"678\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">GLUCOSA</text>\n    <text x=\"56\" y=\"708\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"22\" font-weight=\"700\">103</text>\n    <text x=\"56\" y=\"728\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">mg/dL (↑ 44%)</text>\n\n    <rect x=\"155\" y=\"658\" width=\"102\" height=\"84\" rx=\"14\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"167\" y=\"678\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">ALBÚMINA</text>\n    <text x=\"167\" y=\"708\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"22\" font-weight=\"700\">4.2</text>\n    <text x=\"167\" y=\"728\" fill=\"#10B981\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">g/dL (Nominal)</text>\n\n    <rect x=\"266\" y=\"658\" width=\"102\" height=\"84\" rx=\"14\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"278\" y=\"678\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">CREATININA</text>\n    <text x=\"278\" y=\"708\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"22\" font-weight=\"700\">0.89</text>\n    <text x=\"278\" y=\"728\" fill=\"#10B981\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">mg/dL (Nominal)</text>\n\n    <!-- Botón de acción -->\n    <rect x=\"44\" y=\"758\" width=\"324\" height=\"52\" rx=\"26\" fill=\"#D9FB76\"/>\n    <text x=\"68\" y=\"789\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"14\" font-weight=\"700\">Medir indicador de este sistema</text>\n    <text x=\"332\" y=\"789\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"18\" font-weight=\"700\">↗</text>\n  </g>\n\n  <!-- Barra de Navegación Inferior -->\n  <g id=\"BottomNav02\">\n    <rect x=\"24\" y=\"840\" width=\"364\" height=\"44\" rx=\"22\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"47\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Dashboard</text>\n    <rect x=\"128\" y=\"845\" width=\"90\" height=\"34\" rx=\"17\" fill=\"#1E293B\"/>\n    <text x=\"145\" y=\"866\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Cuerpo 3D</text>\n    <text x=\"232\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Medición</text>\n    <text x=\"312\" y=\"866\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">Protocolos</text>\n  </g>\n\n  <text x=\"58\" y=\"898\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">Prototipo educativo NASA Space Apps 2026 · No es un dispositivo médico.</text>\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  },
  {
    "id": "03",
    "title": "Asistente de medición",
    "subtitle": "Medición guiada paso 2/3 · glucosa capilar en microgravedad",
    "file": "03-asistente-medicion.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad03\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#090C14\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n  </defs>\n\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad03)\"/>\n\n  <!-- Barra de estado -->\n  <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:25 UTC</text>\n  <text x=\"259\" y=\"26\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">MODO GUIADO · PASO 2/3</text>\n\n  <!-- Cabecera -->\n  <rect x=\"24\" y=\"44\" width=\"96\" height=\"36\" rx=\"12\" fill=\"#131A27\"/>\n  <text x=\"38\" y=\"66\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"13\" font-weight=\"600\">←  Volver</text>\n  <text x=\"136\" y=\"60\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">MEDICIÓN GUIADA</text>\n  <text x=\"136\" y=\"76\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"600\">GLUCOSA EN SANGRE (i-STAT / PUNCIÓN)</text>\n\n  <!-- Barra de progreso de 3 pasos -->\n  <g id=\"StepProgress\">\n    <rect x=\"24\" y=\"94\" width=\"116\" height=\"6\" rx=\"3\" fill=\"#10B981\"/>\n    <rect x=\"148\" y=\"94\" width=\"116\" height=\"6\" rx=\"3\" fill=\"#D9FB76\"/>\n    <rect x=\"272\" y=\"94\" width=\"116\" height=\"6\" rx=\"3\" fill=\"#1E293B\"/>\n    <text x=\"24\" y=\"114\" fill=\"#10B981\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">1. Preparación ✓</text>\n    <text x=\"148\" y=\"114\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"700\">2. Toma en microgravedad</text>\n    <text x=\"272\" y=\"114\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"500\">3. Evaluación</text>\n  </g>\n\n  <!-- Tarjeta de instrucción paso a paso para no-clínicos -->\n  <g id=\"InstructionCard\">\n    <rect x=\"24\" y=\"128\" width=\"364\" height=\"224\" rx=\"18\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1.5\"/>\n\n    <!-- Ilustración vectorial de toma capilar en 0G -->\n    <rect x=\"40\" y=\"144\" width=\"332\" height=\"96\" rx=\"12\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"104\" cy=\"192\" r=\"28\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n    <circle cx=\"104\" cy=\"192\" r=\"8\" fill=\"#EF4444\"/>\n    <path d=\"M144 192 L212 192\" stroke=\"#D9FB76\" stroke-width=\"2\" stroke-dasharray=\"4 4\"/>\n    <rect x=\"224\" y=\"170\" width=\"128\" height=\"44\" rx=\"8\" fill=\"#131A27\" stroke=\"#D9FB76\" stroke-width=\"1.5\"/>\n    <text x=\"240\" y=\"190\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"11\" font-weight=\"700\">CARTUCHO CG8+</text>\n    <text x=\"240\" y=\"204\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\">Acción capilar 90°</text>\n\n    <!-- Pasos claros -->\n    <text x=\"40\" y=\"264\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"14\" font-weight=\"700\">Cómo tomar la muestra sin gravedad:</text>\n    <text x=\"40\" y=\"286\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\">1. Sujeta tu mano al riel Velcro del módulo médico.</text>\n    <text x=\"40\" y=\"306\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\">2. Limpia el anular con gasa estéril y espera 10 s a que evapore.</text>\n    <text x=\"40\" y=\"326\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">3. Acerca la tira a 90° (no sacudas el dedo).</text>\n  </g>\n\n  <!-- Advertencia de Modo de Fallo en Microgravedad -->\n  <g id=\"FailureModeWarning\">\n    <rect x=\"24\" y=\"364\" width=\"364\" height=\"74\" rx=\"14\" fill=\"#231B12\" stroke=\"#F59E0B\" stroke-width=\"1.2\"/>\n    <text x=\"42\" y=\"386\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\" letter-spacing=\"0.5\">⚠ MODO DE FALLO EN MICROGRAVEDAD (0G)</text>\n    <text x=\"42\" y=\"406\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11\">En 0G la gota no cae: forma una esfera por tensión superficial.</text>\n    <text x=\"42\" y=\"424\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10.5\">Si entra aire al canal capilar, la lectura dará un falso bajo (&lt;60 mg/dL).</text>\n  </g>\n\n  <!-- Entrada del Valor + Contexto Personal OSD-575 -->\n  <g id=\"ValueInputPanel\">\n    <rect x=\"24\" y=\"450\" width=\"364\" height=\"156\" rx=\"18\" fill=\"#131A27\" stroke=\"#D9FB76\" stroke-width=\"1.5\"/>\n    <text x=\"42\" y=\"476\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"600\" letter-spacing=\"0.6\">VALOR OBTENIDO EN LECTOR PORTÁTIL</text>\n\n    <!-- Display numérico grande -->\n    <rect x=\"42\" y=\"490\" width=\"204\" height=\"64\" rx=\"12\" fill=\"#090C14\" stroke=\"#334155\" stroke-width=\"1.5\"/>\n    <text x=\"62\" y=\"534\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"36\" font-weight=\"700\">103</text>\n    <rect x=\"144\" y=\"502\" width=\"2\" height=\"38\" fill=\"#D9FB76\"/>\n    <text x=\"182\" y=\"528\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"14\" font-weight=\"600\">mg/dL</text>\n\n    <!-- Comparación inmediata con línea base C003 -->\n    <rect x=\"258\" y=\"490\" width=\"112\" height=\"64\" rx=\"12\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"270\" y=\"510\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">TU BASE (C003)</text>\n    <text x=\"270\" y=\"530\" fill=\"#10B981\" font-family=\"JetBrains Mono, monospace\" font-size=\"15\" font-weight=\"700\">71 mg/dL</text>\n    <text x=\"270\" y=\"545\" fill=\"#64748B\" font-family=\"JetBrains Mono, monospace\" font-size=\"8.5\">Ref: 65–99 mg/dL</text>\n\n    <!-- Condición de la toma -->\n    <rect x=\"42\" y=\"566\" width=\"102\" height=\"26\" rx=\"8\" fill=\"#D9FB76\"/>\n    <text x=\"56\" y=\"583\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">● En ayunas</text>\n    <rect x=\"152\" y=\"566\" width=\"108\" height=\"26\" rx=\"8\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"166\" y=\"583\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Post-prandial</text>\n    <rect x=\"268\" y=\"566\" width=\"102\" height=\"26\" rx=\"8\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"282\" y=\"583\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Post-EVA</text>\n  </g>\n\n  <!-- Teclado numérico táctil de guante / gran formato -->\n  <g id=\"TouchKeypad\">\n    <rect x=\"24\" y=\"618\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"61\" y=\"646\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">1</text>\n    <rect x=\"117\" y=\"618\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"154\" y=\"646\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">2</text>\n    <rect x=\"210\" y=\"618\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"247\" y=\"646\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">3</text>\n    <rect x=\"303\" y=\"618\" width=\"85\" height=\"44\" rx=\"10\" fill=\"#1E293B\"/><text x=\"336\" y=\"646\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"16\" font-weight=\"600\">⌫</text>\n\n    <rect x=\"24\" y=\"670\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"61\" y=\"698\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">4</text>\n    <rect x=\"117\" y=\"670\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"154\" y=\"698\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">5</text>\n    <rect x=\"210\" y=\"670\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"247\" y=\"698\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">6</text>\n    <rect x=\"303\" y=\"670\" width=\"85\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"340\" y=\"698\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">0</text>\n\n    <rect x=\"24\" y=\"722\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"61\" y=\"750\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">7</text>\n    <rect x=\"117\" y=\"722\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"154\" y=\"750\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">8</text>\n    <rect x=\"210\" y=\"722\" width=\"84\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"247\" y=\"750\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">9</text>\n    <rect x=\"303\" y=\"722\" width=\"85\" height=\"44\" rx=\"10\" fill=\"#131A27\"/><text x=\"341\" y=\"750\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"18\" font-weight=\"600\">.</text>\n  </g>\n\n  <!-- CTA Evaluar contra Línea Base -->\n  <rect x=\"24\" y=\"780\" width=\"364\" height=\"52\" rx=\"26\" fill=\"#D9FB76\"/>\n  <text x=\"64\" y=\"811\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">Evaluar contra mi línea base →</text>\n\n  <!-- Barra de Navegación Inferior -->\n  <g id=\"BottomNav03\">\n    <rect x=\"24\" y=\"842\" width=\"364\" height=\"42\" rx=\"21\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"47\" y=\"867\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Dashboard</text>\n    <text x=\"142\" y=\"867\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Cuerpo 3D</text>\n    <rect x=\"216\" y=\"846\" width=\"86\" height=\"34\" rx=\"17\" fill=\"#1E293B\"/>\n    <text x=\"234\" y=\"867\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Medición</text>\n    <text x=\"312\" y=\"867\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">Protocolos</text>\n  </g>\n\n  <text x=\"58\" y=\"898\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">Prototipo educativo NASA Space Apps 2026 · No es un dispositivo médico.</text>\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  },
  {
    "id": "04",
    "title": "Tarjeta de triage",
    "subtitle": "Semáforo con razón, acción y fuente · motor determinista local",
    "file": "04-tarjeta-triage.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad04\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#090C14\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n    <linearGradient id=\"triageAmber\" x1=\"24\" y1=\"108\" x2=\"388\" y2=\"340\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#291E10\"/>\n      <stop offset=\"100%\" stop-color=\"#131A27\"/>\n    </linearGradient>\n  </defs>\n\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad04)\"/>\n\n  <!-- Barra de estado -->\n  <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:26 UTC</text>\n  <text x=\"246\" y=\"26\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"600\">MOTOR DETERMINISTA LOCAL</text>\n\n  <!-- Cabecera -->\n  <rect x=\"24\" y=\"44\" width=\"96\" height=\"36\" rx=\"12\" fill=\"#131A27\"/>\n  <text x=\"38\" y=\"66\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"13\" font-weight=\"600\">←  Volver</text>\n  <text x=\"136\" y=\"60\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">RESULTADO DE TRIAGE</text>\n  <text x=\"136\" y=\"76\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"500\">C003 · GLUCOSA · R+1</text>\n\n  <!-- Tarjeta Principal Semáforo Determinista -->\n  <g id=\"TriageHeroCard\">\n    <rect x=\"24\" y=\"96\" width=\"364\" height=\"236\" rx=\"22\" fill=\"url(#triageAmber)\" stroke=\"#F59E0B\" stroke-width=\"2\"/>\n\n    <!-- Badge Semáforo AMARILLO -->\n    <rect x=\"42\" y=\"116\" width=\"164\" height=\"28\" rx=\"14\" fill=\"#F59E0B\"/>\n    <text x=\"54\" y=\"134\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"800\">▲ ATENCIÓN · DESVIACIÓN</text>\n    <text x=\"282\" y=\"134\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\">ID #TRG-0575</text>\n\n    <!-- Lectura y Delta -->\n    <text x=\"42\" y=\"186\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"44\" font-weight=\"700\">103</text>\n    <text x=\"136\" y=\"186\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"16\" font-weight=\"600\">mg/dL</text>\n\n    <rect x=\"220\" y=\"156\" width=\"150\" height=\"42\" rx=\"10\" fill=\"#090C14\" stroke=\"#F59E0B\" stroke-width=\"1\"/>\n    <text x=\"232\" y=\"173\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\">DESVIACIÓN PERSONAL</text>\n    <text x=\"232\" y=\"190\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"13\" font-weight=\"700\">+44.4% (+32 mg/dL)</text>\n\n    <!-- Razón explícita de la regla determinista -->\n    <line x1=\"42\" y1=\"214\" x2=\"370\" y2=\"214\" stroke=\"#334155\" stroke-width=\"1\"/>\n    <text x=\"42\" y=\"236\" fill=\"#F59E0B\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">¿POR QUÉ TE PIDE ATENCIÓN?</text>\n    <text x=\"42\" y=\"256\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"500\">Semáforo clínico verde (70–140): no es urgencia. Pero 103 está</text>\n    <text x=\"42\" y=\"274\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"500\">44.4 % sobre tu media pre-vuelo (71.3) y fuera del ayuno (65–99).</text>\n    <text x=\"42\" y=\"298\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\">Regla: fuera de 65–99 Y ≥ 30 % sobre la línea base personal</text>\n    <text x=\"42\" y=\"316\" fill=\"#38BDF8\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"600\">Fuente: NASA OSDR OSD-575 (Inspiration4 CMP) · NASA-STD-3001</text>\n  </g>\n\n  <!-- Plan de Acción Autónoma (Pasos concretos para el astronauta) -->\n  <g id=\"NextStepsCard\">\n    <rect x=\"24\" y=\"346\" width=\"364\" height=\"222\" rx=\"18\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1.5\"/>\n    <text x=\"42\" y=\"372\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"0.6\">QUÉ HACER AHORA (PROTOCOLO DE AUTONOMÍA)</text>\n\n    <!-- Paso 1 -->\n    <rect x=\"42\" y=\"386\" width=\"328\" height=\"48\" rx=\"12\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"64\" cy=\"410\" r=\"11\" fill=\"#D9FB76\"/>\n    <text x=\"60\" y=\"414\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">1</text>\n    <text x=\"84\" y=\"406\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"600\">Hidratación oral (250 mL de agua)</text>\n    <text x=\"84\" y=\"422\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\">Descarta hemoconcentración por desplazamiento de fluidos.</text>\n\n    <!-- Paso 2 -->\n    <rect x=\"42\" y=\"442\" width=\"328\" height=\"48\" rx=\"12\" fill=\"#090C14\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"64\" cy=\"466\" r=\"11\" fill=\"#1E293B\"/>\n    <text x=\"60\" y=\"470\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">2</text>\n    <text x=\"84\" y=\"462\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"600\">Repetir medición capilar en 120 minutos</text>\n    <text x=\"84\" y=\"478\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\">Temporizador programable en reloj de misión.</text>\n\n    <!-- Paso 3 -->\n    <rect x=\"42\" y=\"498\" width=\"328\" height=\"54\" rx=\"12\" fill=\"#2A1215\" stroke=\"#EF4444\" stroke-width=\"1\"/>\n    <circle cx=\"64\" cy=\"525\" r=\"11\" fill=\"#EF4444\"/>\n    <text x=\"60\" y=\"529\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">!</text>\n    <text x=\"84\" y=\"518\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Criterio de escalado a ROJO (Emergencia):</text>\n    <text x=\"84\" y=\"534\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"10\">Si hay mareo, visión borrosa, dolor torácico o &gt;180.</text>\n  </g>\n\n  <!-- Paquete de Telemetría Asincrónica para el Flight Surgeon -->\n  <g id=\"TelemetryQueueCard\">\n    <rect x=\"24\" y=\"582\" width=\"364\" height=\"92\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"42\" y=\"606\" fill=\"#38BDF8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"700\">📦 COLA DE TELEMETRÍA DIFERIDA (DELAY +14m 20s)</text>\n    <text x=\"42\" y=\"626\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"600\">Registro guardado en IndexedDB local y empaquetado</text>\n    <text x=\"42\" y=\"644\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\">Se enviará al Flight Surgeon en Tierra en la próxima ventana de enlace.</text>\n    <text x=\"42\" y=\"662\" fill=\"#D9FB76\" font-family=\"JetBrains Mono, monospace\" font-size=\"9.5\">HASH: OSD575-C003-GLU-103-20261114T1426Z</text>\n  </g>\n\n  <!-- Botones de Acción -->\n  <rect x=\"24\" y=\"688\" width=\"176\" height=\"48\" rx=\"24\" fill=\"#D9FB76\"/>\n  <text x=\"44\" y=\"717\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"12.5\" font-weight=\"700\">✓ Agendar re-toma 2h</text>\n\n  <rect x=\"212\" y=\"688\" width=\"176\" height=\"48\" rx=\"24\" fill=\"#2A1215\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n  <text x=\"232\" y=\"717\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"12.5\" font-weight=\"700\">⚡ Tengo síntomas</text>\n\n  <!-- Disclaimer Médico Legal Visible (Regla §2.6 AGENTS.md) -->\n  <rect x=\"24\" y=\"750\" width=\"364\" height=\"76\" rx=\"14\" fill=\"#090C14\" stroke=\"#334155\" stroke-width=\"1\"/>\n  <text x=\"40\" y=\"770\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"700\">AVISO DE CUMPLIMIENTO · NO ES UN DISPOSITIVO MÉDICO</text>\n  <text x=\"40\" y=\"788\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"9.5\">Esta herramienta es un prototipo informativo de apoyo a la autonomía</text>\n  <text x=\"40\" y=\"802\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"9.5\">de la tripulación basado en rangos públicos de NASA OSDR (OSD-575).</text>\n  <text x=\"40\" y=\"816\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"9.5\">No diagnostica, trata ni prescribe. Use el protocolo del CMO a bordo.</text>\n\n  <!-- Barra de Navegación Inferior -->\n  <g id=\"BottomNav04\">\n    <rect x=\"24\" y=\"840\" width=\"364\" height=\"44\" rx=\"22\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"47\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Dashboard</text>\n    <text x=\"142\" y=\"866\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Cuerpo 3D</text>\n    <rect x=\"216\" y=\"845\" width=\"86\" height=\"34\" rx=\"17\" fill=\"#1E293B\"/>\n    <text x=\"234\" y=\"866\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Medición</text>\n    <text x=\"312\" y=\"866\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\">Protocolos</text>\n  </g>\n\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  },
  {
    "id": "05",
    "title": "Selector de emergencia",
    "subtitle": "Elegir el protocolo correcto en un toque",
    "file": "05-selector-emergencia.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad05\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#090C14\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n    <linearGradient id=\"redCard05\" x1=\"24\" y1=\"190\" x2=\"388\" y2=\"302\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#2A1215\"/>\n      <stop offset=\"100%\" stop-color=\"#131A27\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Fondo principal -->\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad05)\"/>\n\n  <!-- Barra de estado -->\n  <g id=\"StatusBar05\">\n    <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:31 UTC</text>\n    <circle cx=\"250\" cy=\"22\" r=\"3.5\" fill=\"#EF4444\"/>\n    <text x=\"259\" y=\"26\" fill=\"#FCA5A5\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"600\">MODO EMERGENCIA · LOCAL</text>\n  </g>\n\n  <!-- Cabecera -->\n  <g id=\"Header05\">\n    <rect x=\"24\" y=\"44\" width=\"96\" height=\"36\" rx=\"12\" fill=\"#131A27\"/>\n    <text x=\"38\" y=\"66\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"13\" font-weight=\"600\">← Salir</text>\n    <text x=\"136\" y=\"60\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\" letter-spacing=\"0.3\">SELECTOR DE EMERGENCIA</text>\n    <text x=\"136\" y=\"76\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">C003 · UN TOQUE, SIN CONFIRMAR</text>\n  </g>\n\n  <!-- Aviso de contexto -->\n  <g id=\"Context05\">\n    <rect x=\"24\" y=\"96\" width=\"364\" height=\"56\" rx=\"16\" fill=\"#2A1215\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n    <circle cx=\"46\" cy=\"124\" r=\"10\" fill=\"#EF4444\"/>\n    <text x=\"46\" y=\"128\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"800\" text-anchor=\"middle\">!</text>\n    <text x=\"64\" y=\"120\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12.5\" font-weight=\"700\">Nadie puede decidir por ti en 20 min</text>\n    <text x=\"64\" y=\"136\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"500\">Elige el cuadro que se parezca: la app pregunta el resto.</text>\n  </g>\n\n  <!-- Paso 1: elegir cuadro -->\n  <text x=\"24\" y=\"180\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.8\">1 · ELIGE EL CUADRO</text>\n\n  <!-- Protocolo 1: dolor torácico -->\n  <g id=\"ProtocolChest\">\n    <rect x=\"24\" y=\"190\" width=\"364\" height=\"112\" rx=\"18\" fill=\"url(#redCard05)\" stroke=\"#EF4444\" stroke-width=\"2\"/>\n    <rect x=\"24\" y=\"206\" width=\"4\" height=\"80\" rx=\"2\" fill=\"#EF4444\"/>\n    <text x=\"46\" y=\"224\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"17\" font-weight=\"800\" letter-spacing=\"0.2\">DOLOR TORÁCICO</text>\n    <text x=\"46\" y=\"243\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10.5\" font-weight=\"400\">Opresión, ardor o dolor que baja al brazo izquierdo</text>\n    <rect x=\"46\" y=\"256\" width=\"62\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"54\" y=\"269\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">6 PASOS</text>\n    <rect x=\"114\" y=\"256\" width=\"68\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"122\" y=\"269\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">≈ 12 MIN</text>\n    <text x=\"46\" y=\"291\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"600\">El más frecuente en vuelo · Empieza ya</text>\n    <circle cx=\"348\" cy=\"222\" r=\"19\" fill=\"#2A1215\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n    <path d=\"M348 230 L340 222 A5 5 0 0 1 348 216 A5 5 0 0 1 356 222 Z\" fill=\"#EF4444\"/>\n  </g>\n\n  <!-- Protocolo 2: hipoxia -->\n  <g id=\"ProtocolHypoxia\">\n    <rect x=\"24\" y=\"312\" width=\"364\" height=\"100\" rx=\"18\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"46\" y=\"342\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">HIPOXIA · FALLO DE O₂</text>\n    <text x=\"46\" y=\"360\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"400\">Confusión, cefalea, visión borrosa o alarma de cabina</text>\n    <rect x=\"46\" y=\"372\" width=\"56\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"54\" y=\"385\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">5 PASOS</text>\n    <rect x=\"108\" y=\"372\" width=\"60\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"116\" y=\"385\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">≈ 8 MIN</text>\n    <circle cx=\"348\" cy=\"338\" r=\"19\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n    <text x=\"348\" y=\"344\" fill=\"#38BDF8\" font-family=\"JetBrains Mono, monospace\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">O₂</text>\n  </g>\n\n  <!-- Protocolo 3: anafilaxia -->\n  <g id=\"ProtocolAnaphylaxis\">\n    <rect x=\"24\" y=\"424\" width=\"364\" height=\"100\" rx=\"18\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"46\" y=\"454\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"700\">ANAFILAXIA</text>\n    <text x=\"46\" y=\"472\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"400\">Ronchas, labios hinchados o silbido al respirar</text>\n    <rect x=\"46\" y=\"484\" width=\"56\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"54\" y=\"497\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">5 PASOS</text>\n    <rect x=\"108\" y=\"484\" width=\"64\" height=\"20\" rx=\"6\" fill=\"#1E293B\"/>\n    <text x=\"116\" y=\"497\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">≈ 10 MIN</text>\n    <circle cx=\"348\" cy=\"450\" r=\"19\" fill=\"#131A27\" stroke=\"#F59E0B\" stroke-width=\"1.5\"/>\n    <path d=\"M348 443 L342 456 L354 456 Z\" fill=\"none\" stroke=\"#F59E0B\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/>\n    <line x1=\"348\" y1=\"447\" x2=\"348\" y2=\"451\" stroke=\"#F59E0B\" stroke-width=\"1.5\" stroke-linecap=\"round\"/>\n  </g>\n\n  <!-- Paso 2: ayuda si no lo reconoce -->\n  <text x=\"24\" y=\"556\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.8\">2 · SI NO SABES QUÉ ES</text>\n\n  <g id=\"HelpTree\">\n    <rect x=\"24\" y=\"566\" width=\"364\" height=\"96\" rx=\"18\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>\n    <text x=\"46\" y=\"594\" fill=\"#38BDF8\" font-family=\"Inter, sans-serif\" font-size=\"14\" font-weight=\"700\">NO SÉ QUÉ HACER</text>\n    <text x=\"46\" y=\"613\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"400\">3 preguntas cerradas en 20 segundos</text>\n    <text x=\"46\" y=\"629\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"10\" font-weight=\"400\">¿Puede hablar? · ¿Respira? · ¿Dónde duele?</text>\n    <text x=\"364\" y=\"620\" fill=\"#38BDF8\" font-family=\"Inter, sans-serif\" font-size=\"20\" font-weight=\"700\" text-anchor=\"end\">→</text>\n  </g>\n\n  <!-- Registro local -->\n  <g id=\"LogNote\">\n    <rect x=\"24\" y=\"674\" width=\"364\" height=\"54\" rx=\"14\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"44\" cy=\"701\" r=\"4\" fill=\"#D9FB76\"/>\n    <text x=\"56\" y=\"697\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"10.5\" font-weight=\"600\">La selección y la hora quedan en el registro local</text>\n    <text x=\"56\" y=\"712\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">Se enviará a Tierra en la próxima ventana · delay +14m</text>\n  </g>\n\n  <!-- Salida secundaria -->\n  <rect x=\"24\" y=\"742\" width=\"364\" height=\"48\" rx=\"24\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n  <text x=\"206\" y=\"771\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\" text-anchor=\"middle\">Salir del modo emergencia</text>\n\n  <!-- Barra de navegación inferior -->\n  <g id=\"BottomNav05\">\n    <rect x=\"24\" y=\"842\" width=\"364\" height=\"42\" rx=\"21\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"47\" y=\"867\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Dashboard</text>\n    <text x=\"142\" y=\"867\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Cuerpo 3D</text>\n    <text x=\"234\" y=\"867\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"500\">Medición</text>\n    <rect x=\"300\" y=\"846\" width=\"76\" height=\"34\" rx=\"17\" fill=\"#2A1215\"/>\n    <text x=\"316\" y=\"867\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"700\">Protocolos</text>\n  </g>\n\n  <text x=\"58\" y=\"898\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">Prototipo educativo NASA Space Apps 2026 · No es un dispositivo médico.</text>\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  },
  {
    "id": "06",
    "title": "Protocolo activo",
    "subtitle": "Guía paso a paso bajo estrés · cronómetro y registro automático",
    "file": "06-protocolo-activo.svg",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"412\" height=\"917\" viewBox=\"0 0 412 917\" fill=\"none\">\n  <defs>\n    <linearGradient id=\"bgGrad06\" x1=\"206\" y1=\"0\" x2=\"206\" y2=\"917\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#0C0A10\"/>\n      <stop offset=\"100%\" stop-color=\"#0B0F17\"/>\n    </linearGradient>\n    <linearGradient id=\"timerGrad06\" x1=\"24\" y1=\"96\" x2=\"388\" y2=\"184\" gradientUnits=\"userSpaceOnUse\">\n      <stop offset=\"0%\" stop-color=\"#2A1215\"/>\n      <stop offset=\"100%\" stop-color=\"#131A27\"/>\n    </linearGradient>\n  </defs>\n\n  <!-- Fondo principal (modo foco: sin barra de navegación) -->\n  <rect width=\"412\" height=\"917\" rx=\"28\" fill=\"url(#bgGrad06)\"/>\n\n  <!-- Barra de estado -->\n  <g id=\"StatusBar06\">\n    <text x=\"24\" y=\"26\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"12\" font-weight=\"600\">14:34 UTC</text>\n    <circle cx=\"250\" cy=\"22\" r=\"3.5\" fill=\"#EF4444\"/>\n    <text x=\"259\" y=\"26\" fill=\"#FCA5A5\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"600\">PROTOCOLO ACTIVO · LOCAL</text>\n  </g>\n\n  <!-- Cabecera -->\n  <text x=\"24\" y=\"52\" fill=\"#FCA5A5\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.8\">EMERGENCIA · C003 · ESPECIALISTA</text>\n  <text x=\"24\" y=\"78\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"22\" font-weight=\"800\" letter-spacing=\"0.3\">DOLOR TORÁCICO</text>\n\n  <!-- Cronómetro -->\n  <g id=\"TimerCard\">\n    <rect x=\"24\" y=\"96\" width=\"364\" height=\"88\" rx=\"18\" fill=\"url(#timerGrad06)\" stroke=\"#EF4444\" stroke-width=\"1.5\"/>\n    <text x=\"42\" y=\"120\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.6\">TIEMPO EN PROTOCOLO</text>\n    <text x=\"42\" y=\"158\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"34\" font-weight=\"700\">03:42</text>\n    <rect x=\"300\" y=\"130\" width=\"72\" height=\"24\" rx=\"12\" fill=\"#1E293B\"/>\n    <text x=\"336\" y=\"146\" fill=\"#F6F7FB\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"700\" text-anchor=\"middle\">PASO 2/6</text>\n    <text x=\"42\" y=\"172\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"500\">Sigue aunque te sientas mejor · no se puede deshacer</text>\n  </g>\n\n  <!-- Progreso de pasos -->\n  <g id=\"StepDots\">\n    <circle cx=\"30\" cy=\"204\" r=\"5\" fill=\"#10B981\"/>\n    <circle cx=\"56\" cy=\"204\" r=\"6\" fill=\"#EF4444\"/>\n    <circle cx=\"82\" cy=\"204\" r=\"5\" fill=\"#334155\"/>\n    <circle cx=\"108\" cy=\"204\" r=\"5\" fill=\"#334155\"/>\n    <circle cx=\"134\" cy=\"204\" r=\"5\" fill=\"#334155\"/>\n    <circle cx=\"160\" cy=\"204\" r=\"5\" fill=\"#334155\"/>\n    <text x=\"388\" y=\"208\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\" text-anchor=\"end\">1 hecho · 1 en curso</text>\n  </g>\n\n  <!-- Instrucción del paso actual -->\n  <g id=\"StepCard\">\n    <rect x=\"24\" y=\"222\" width=\"364\" height=\"262\" rx=\"22\" fill=\"#131A27\" stroke=\"#38BDF8\" stroke-width=\"1.5\"/>\n    <text x=\"46\" y=\"252\" fill=\"#38BDF8\" font-family=\"JetBrains Mono, monospace\" font-size=\"10\" font-weight=\"700\" letter-spacing=\"0.6\">PASO 2 · AHORA</text>\n\n    <text x=\"46\" y=\"292\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"26\" font-weight=\"800\" letter-spacing=\"-0.3\">Afloja el traje</text>\n    <text x=\"46\" y=\"324\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"26\" font-weight=\"800\" letter-spacing=\"-0.3\">y avisa a Tierra.</text>\n\n    <text x=\"46\" y=\"356\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"400\">Libera el cuello y el pecho del traje para respirar</text>\n    <text x=\"46\" y=\"373\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11.5\" font-weight=\"400\">sin esfuerzo. Después envía el aviso de emergencia.</text>\n\n    <line x1=\"46\" y1=\"394\" x2=\"366\" y2=\"394\" stroke=\"#334155\" stroke-width=\"1\"/>\n\n    <text x=\"46\" y=\"416\" fill=\"#EF4444\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"700\" letter-spacing=\"0.5\">NO HAGAS ESTO</text>\n    <text x=\"46\" y=\"434\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"10.5\" font-weight=\"500\">✕ No te acuestes boca abajo</text>\n    <text x=\"222\" y=\"434\" fill=\"#F6F7FB\" font-family=\"Inter, sans-serif\" font-size=\"10.5\" font-weight=\"500\">✕ No comas ni bebas</text>\n    <text x=\"46\" y=\"456\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"400\">El traje abierto no se presuriza: hazlo en 30 segundos.</text>\n  </g>\n\n  <!-- Reevaluación -->\n  <g id=\"ReevalCard\">\n    <rect x=\"24\" y=\"496\" width=\"364\" height=\"94\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"42\" y=\"520\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"9\" font-weight=\"600\" letter-spacing=\"0.6\">SIGUIENTE REEVALUACIÓN</text>\n    <text x=\"42\" y=\"548\" fill=\"#F59E0B\" font-family=\"JetBrains Mono, monospace\" font-size=\"22\" font-weight=\"700\">01:18</text>\n    <text x=\"366\" y=\"548\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\" text-anchor=\"end\">a los 5 min</text>\n    <rect x=\"42\" y=\"562\" width=\"324\" height=\"8\" rx=\"4\" fill=\"#1E293B\"/>\n    <rect x=\"42\" y=\"562\" width=\"252\" height=\"8\" rx=\"4\" fill=\"#F59E0B\"/>\n    <text x=\"42\" y=\"582\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"400\">Pulso, SpO₂ y dolor (0–10). El cronómetro es visible a propósito.</text>\n  </g>\n\n  <!-- Registro automático -->\n  <g id=\"EventLog\">\n    <rect x=\"24\" y=\"602\" width=\"364\" height=\"86\" rx=\"16\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <circle cx=\"42\" cy=\"624\" r=\"3.5\" fill=\"#D9FB76\"/>\n    <text x=\"54\" y=\"628\" fill=\"#D9FB76\" font-family=\"Inter, sans-serif\" font-size=\"9.5\" font-weight=\"700\" letter-spacing=\"0.5\">REGISTRO AUTOMÁTICO · 3 EVENTOS</text>\n    <text x=\"42\" y=\"648\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">14:31:08  Paso 1 «Detente y siéntate»</text>\n    <text x=\"42\" y=\"662\" fill=\"#9BA4B8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"500\">14:33:12  Paso 2 iniciado</text>\n    <text x=\"42\" y=\"676\" fill=\"#38BDF8\" font-family=\"JetBrains Mono, monospace\" font-size=\"9\" font-weight=\"600\">14:34:02  Aviso empaquetado para enlace</text>\n  </g>\n\n  <!-- Acción principal -->\n  <rect x=\"24\" y=\"702\" width=\"364\" height=\"58\" rx=\"29\" fill=\"#D9FB76\"/>\n  <text x=\"50\" y=\"737\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"15\" font-weight=\"800\">Siguiente: medir signos</text>\n  <text x=\"364\" y=\"738\" fill=\"#11180A\" font-family=\"Inter, sans-serif\" font-size=\"18\" font-weight=\"700\" text-anchor=\"end\">→</text>\n\n  <!-- Acciones secundarias -->\n  <g id=\"SecondaryActions\">\n    <rect x=\"24\" y=\"770\" width=\"176\" height=\"46\" rx=\"23\" fill=\"#131A27\" stroke=\"#1E293B\" stroke-width=\"1\"/>\n    <text x=\"112\" y=\"798\" fill=\"#9BA4B8\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">← Volver un paso</text>\n    <rect x=\"212\" y=\"770\" width=\"176\" height=\"46\" rx=\"23\" fill=\"#131A27\" stroke=\"#EF4444\" stroke-width=\"1\"/>\n    <text x=\"300\" y=\"798\" fill=\"#FCA5A5\" font-family=\"Inter, sans-serif\" font-size=\"11\" font-weight=\"600\" text-anchor=\"middle\">Avisar a Tierra</text>\n  </g>\n\n  <!-- Aviso de cumplimiento -->\n  <text x=\"24\" y=\"846\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">Protocolo de apoyo. No sustituye al Crew Medical Officer ni a un</text>\n  <text x=\"24\" y=\"858\" fill=\"#64748B\" font-family=\"Inter, sans-serif\" font-size=\"8.5\" font-weight=\"500\">dispositivo médico. Cada paso queda registrado con su hora.</text>\n  <rect x=\"142\" y=\"906\" width=\"128\" height=\"4\" rx=\"2\" fill=\"#F6F7FB\" fill-opacity=\"0.4\"/>\n</svg>\n"
  }
];

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

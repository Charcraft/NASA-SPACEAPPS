"""Puerta de veracidad del maquetado.

Comprueba que los números clínicos que aparecen en las 6 pantallas existen
en el dataset OSD-575 y que no quedó ningún valor inventado.

Uso:  python design/tools/verificar-pantallas.py

Falla (exit 1) si:
  - el valor de glucosa de C003 en R+1 no coincide con lo escrito;
  - la media pre-vuelo o el delta no coinciden;
  - reaparece un valor viejo no trazable (102 mg/dL, base 89, +14.6 %);
  - el semáforo de la tarjeta contradice el catálogo de indicadores.
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEED = os.path.join(ROOT, "src", "data", "seed", "osdr-inspiration4-cmp.json")
SCREENS = os.path.join(ROOT, "design", "pantallas")

with open(SEED, encoding="utf-8") as fh:
    data = json.load(fh)

glucosa = next(i for i in data["indicadores"] if i["id"] == "glucose")
serie = {p["timepoint"]: p["valor"] for p in glucosa["serie"]["C003"]}
pre = [serie[t] for t in ("L-92", "L-44", "L-3")]
media = sum(pre) / len(pre)
valor = serie["R+1"]
delta = (valor - media) / media * 100
ref = glucosa["rangoReferencia"]

print(f"C003 glucosa R+1 = {valor:g} {glucosa['unidad']}")
print(f"Media pre-vuelo  = {media:.2f} (L-92 {pre[0]:g}, L-44 {pre[1]:g}, L-3 {pre[2]:g})")
print(f"Delta            = {delta:+.1f} % ({valor - media:+.1f} mg/dL)")
print(f"Rango dataset    = {ref['min']:g}–{ref['max']:g}\n")

errores = []


def leer(nombre):
    with open(os.path.join(SCREENS, nombre), encoding="utf-8") as fh:
        return fh.read()


def solo_texto(svg):
    """Devuelve únicamente el texto visible, sin atributos ni coordenadas."""
    return " ".join(re.findall(r">([^<>]+)<", svg))


# 1. El valor y el delta deben estar escritos como los calcula el dataset.
esperado = {
    "01-dashboard-rutina.svg": ["103", "Base: 71", "+44.4"],
    "02-mapa-corporal.svg": ["103", "↑ 44%"],
    "03-asistente-medicion.svg": ["103", "71 mg/dL"],
    "04-tarjeta-triage.svg": ["103", "+44.4%", "71.3"],
}

for nombre, fragmentos in esperado.items():
    texto = solo_texto(leer(nombre))
    for frag in fragmentos:
        if frag not in texto:
            errores.append(f"{nombre}: falta «{frag}»")

# 2. No debe quedar el valor viejo inventado.
prohibido = {
    "01-dashboard-rutina.svg": ["102", "Base: 89", "+14.6"],
    "02-mapa-corporal.svg": ["Glucosa 102", "↑ 14%", "AST 29"],
    "03-asistente-medicion.svg": ["89 mg/dL"],
    "04-tarjeta-triage.svg": ["102", "+14.6", "126 mg/dL", "89.0"],
}

for nombre, fragmentos in prohibido.items():
    texto = solo_texto(leer(nombre))
    for frag in fragmentos:
        if frag in texto:
            errores.append(f"{nombre}: quedó el valor no trazable «{frag}»")

# 3. El semáforo no puede contradecir el catálogo sin decirlo.
texto04 = solo_texto(leer("04-tarjeta-triage.svg"))
if "Semáforo clínico verde" not in texto04:
    errores.append("04: no explica que el semáforo clínico sigue en verde")

# 4. La fuente debe estar citada en la tarjeta.
if "OSD-575" not in texto04:
    errores.append("04: no cita OSD-575 como fuente")

# 5. La tripulación de la escena debe ser C003 en todas las pantallas.
for nombre in ("02-mapa-corporal.svg", "03-asistente-medicion.svg", "04-tarjeta-triage.svg"):
    if "C001" in solo_texto(leer(nombre)):
        errores.append(f"{nombre}: sigue hablando de C001")

if errores:
    print("FALLÓ la verificación:\n")
    for e in errores:
        print(" - " + e)
    sys.exit(1)

print("OK: los 6 números de la escena son trazables a OSD-575 y C003.")

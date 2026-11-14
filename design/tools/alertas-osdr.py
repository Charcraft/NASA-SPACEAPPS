"""¿Qué indicadores están realmente fuera de rango en el dataset OSD-575?

Uso:  python design/tools/alertas-osdr.py

Sirve para elegir qué número puede protagonizar una pantalla sin inventarlo.
Fuente: src/data/seed/osdr-inspiration4-cmp.json (OSDR OSD-575).
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SEED = os.path.join(ROOT, "src", "data", "seed", "osdr-inspiration4-cmp.json")

with open(SEED, encoding="utf-8") as fh:
    data = json.load(fh)

PRE = ("L-92", "L-44", "L-3")
POST = ("R+1", "R+45", "R+82", "R+194")

print(f"Dataset: {data['meta']['accesion']} · {data['meta']['titulo']}\n")

for crew in ("C001", "C002", "C003", "C004"):
    print(f"== {crew} ==")
    found = False
    for ind in data["indicadores"]:
        serie = ind["serie"].get(crew) or []
        if not serie:
            continue
        ref = ind["rangoReferencia"]
        base = [p["valor"] for p in serie if p["timepoint"] in PRE]
        media = sum(base) / len(base) if base else None
        for p in serie:
            if p["timepoint"] not in POST:
                continue
            val = p["valor"]
            lo = ref.get("min")
            hi = ref.get("max")
            fuera = (lo is not None and val < lo) or (hi is not None and val > hi)
            delta = ((val - media) / media * 100) if media else 0.0
            if fuera or abs(delta) >= 15:
                found = True
                marca = "FUERA DE RANGO" if fuera else "delta >= 15%"
                print(
                    f"  {ind['id']:26s} {p['timepoint']:5s} "
                    f"{val:8.2f} {ind['unidad']:7s} "
                    f"ref [{ref['min']}, {ref['max']}]  "
                    f"base {media:7.2f}  delta {delta:+6.1f}%  {marca}"
                )
    if not found:
        print("  (ningún valor fuera de rango ni con delta >= 15%)")
    print()

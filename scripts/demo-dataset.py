# -*- coding: utf-8 -*-
"""Demo de lo que ya existe: muestra el dataset OSDR normalizado.

No necesita internet. No necesita la app. Sirve para ensenar el activo
mas solido que tenemos hoy: datos reales de vuelo, con rangos de referencia.

Uso:
    python scripts/demo-dataset.py            # glucosa
    python scripts/demo-dataset.py sodio
    python scripts/demo-dataset.py --lista    # todos los indicadores
"""
import io
import json
import os
import sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEED = os.path.join(RAIZ, "src", "data", "seed", "osdr-inspiration4-cmp.json")

ANCHO_BARRA = 34


def cargar():
    with io.open(SEED, encoding="utf-8") as f:
        return json.load(f)


def linea(char="-", n=74):
    print(char * n)


def barra(valor, minimo, maximo, ancho=ANCHO_BARRA):
    """Devuelve una barra ASCII y marca si el valor esta fuera de rango."""
    if minimo is None or maximo is None or maximo <= minimo:
        return "?" * ancho, "?"
    rango = maximo - minimo
    escala_min = minimo - rango * 0.25
    escala_max = maximo + rango * 0.25
    pos = int((valor - escala_min) / (escala_max - escala_min) * (ancho - 1))
    pos = max(0, min(ancho - 1, pos))
    dentro = minimo <= valor <= maximo
    relleno = "." if dentro else "!"
    return relleno * pos + "|" + relleno * (ancho - 1 - pos), "ok " if dentro else "FUERA"


def main():
    argumentos = [a for a in sys.argv[1:] if not a.startswith("--")]
    datos = cargar()

    if "--lista" in sys.argv:
        print("")
        print("INDICADORES DISPONIBLES EN EL DATASET")
        linea("=")
        for i, ind in enumerate(datos["indicadores"], 1):
            print("{0:>2}. {1:<32} {2:<10} ref {3}-{4}".format(
                i, ind["nombre"][:32], ind["unidad"],
                ind["rangoReferencia"]["min"], ind["rangoReferencia"]["max"]))
        print("")
        print("Uso: python scripts/demo-dataset.py <parte-del-nombre>")
        return

    objetivo = argumentos[0].lower() if argumentos else "glucosa"
    ind = next((i for i in datos["indicadores"] if objetivo in i["id"].lower()
                or objetivo in i["nombre"].lower()), None)

    if ind is None:
        print("No encontre el indicador '{0}'. Prueba con --lista".format(objetivo))
        return

    meta = datos["meta"]
    print("")
    print("NASA OPEN SCIENCE DATA REPOSITORY")
    linea("=")
    print("Estudio     {0}".format(meta["accesion"]))
    print("Titulo      {0}".format(meta["titulo"]))
    print("Tripulacion {0} personas (anonimizadas)".format(len(meta["tripulantes"])))
    print("Muestras    {0} puntos temporales por persona".format(len(datos["timepoints"])))
    print("Obtenido    {0}  (script: {1})".format(meta["obtenido"], meta["generadoPor"]))
    print("")

    print("LINEA DE TIEMPO DE LA MISION")
    linea()
    for t in datos["timepoints"]:
        dias = t["diasRelativosAlLanzamiento"]
        etiqueta = "lanzamiento" if dias == 0 else (
            "{0} dias antes".format(-dias) if dias < 0 else "{0} dias despues".format(dias))
        print("  {0:<7} {1}".format(t["id"], etiqueta))
    print("")

    print("INDICADOR: {0}  ({1})".format(ind["nombre"].upper(), ind["unidad"]))
    linea("=")
    rmin = ind["rangoReferencia"]["min"]
    rmax = ind["rangoReferencia"]["max"]
    print("Rango de referencia del dataset: {0} - {1} {2}".format(rmin, rmax, ind["unidad"]))
    print("Fuente: {0}".format(ind["fuente"]))
    print("")
    print("  {0:<7} {1:<28} {2}".format("PUNTO", "VALOR", "DENTRO DEL RANGO"))
    linea()

    for crew in meta["tripulantes"]:
        print("")
        print("  Tripulante {0}".format(crew))
        for punto in ind["serie"].get(crew, []):
            b, estado = barra(punto["valor"], rmin, rmax)
            print("    {0:<6} {1:>7} {2}  {3}".format(
                punto["timepoint"], punto["valor"], b, estado))

    print("")
    linea("=")
    print("Lectura para el pitch:")
    print("")
    print("  Cada persona vuelve a SU PROPIO rango, no al promedio del grupo.")
    print("  Eso es una linea base personal: la referencia es el historial del")
    print("  tripulante, no una tabla de poblacion terrestre.")
    print("")
    print("  {0} valores, {1} tripulantes, datos abiertos de NASA.".format(
        len(datos["timepoints"]) * len(meta["tripulantes"]), len(meta["tripulantes"])))
    print("")


if __name__ == "__main__":
    main()

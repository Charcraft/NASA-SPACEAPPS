# -*- coding: utf-8 -*-
"""Genera el icono del proyecto (assets/brand/proyecto.ico).

Diseno propio: sin logos ni marcas de NASA. Cuadrado redondeado oscuro
con una linea de pulso en cian. Se genera en varios tamanos para que
Windows lo vea nitido en escritorio, barra de tareas y explorador.

Uso:  python scripts/generar-icono.py
"""
import os

from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "assets", "brand", "proyecto.ico")

FONDO = (11, 14, 19)        # #0b0e13
BORDE = (38, 48, 63)        # #26303f
PULSO = (77, 163, 255)      # #4da3ff
ACENTO = (61, 220, 151)     # #3ddc97

ESCALA = 8  # se dibuja grande y se reduce para suavizar bordes


def dibujar(lado):
    s = lado * ESCALA
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    margen = int(s * 0.06)
    radio = int(s * 0.22)
    d.rounded_rectangle(
        [margen, margen, s - margen, s - margen],
        radius=radio,
        fill=FONDO,
        outline=BORDE,
        width=max(1, int(s * 0.012)),
    )

    # linea de pulso (ECG) centrada
    g = max(1, int(s * 0.055))          # grosor
    y = s * 0.52
    x0 = s * 0.16
    x1 = s * 0.84
    tramo = (x1 - x0)

    puntos = [
        (x0, y),
        (x0 + tramo * 0.18, y),
        (x0 + tramo * 0.28, y - s * 0.16),
        (x0 + tramo * 0.38, y + s * 0.20),
        (x0 + tramo * 0.50, y - s * 0.10),
        (x0 + tramo * 0.62, y),
        (x1, y),
    ]

    d.line(puntos, fill=PULSO, width=g, joint="curve")

    # punto de acento al final del pulso
    r = s * 0.035
    d.ellipse([x1 - r, y - r, x1 + r, y + r], fill=ACENTO)

    return img.resize((lado, lado), Image.LANCZOS)


def main():
    os.makedirs(os.path.dirname(SALIDA), exist_ok=True)
    tamanos = [16, 24, 32, 48, 64, 128, 256]
    base = dibujar(256)
    base.save(SALIDA, format="ICO", sizes=[(t, t) for t in tamanos])
    print("icono generado: {0}".format(os.path.relpath(SALIDA, RAIZ)))
    print("tamanos: {0}".format(", ".join(str(t) for t in tamanos)))


if __name__ == "__main__":
    main()

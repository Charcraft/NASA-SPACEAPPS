# -*- coding: utf-8 -*-
"""Genera los iconos PNG para la PWA (public/icons/icon-192.png y icon-512.png).

Reutiliza el mismo diseno de `generar-icono.py` (cuadrado redondeado oscuro,
linea de pulso en cian y punto verde), sin marcas de NASA.

Uso:  python scripts/generar-iconos-pwa.py
"""
import os

from PIL import Image, ImageDraw

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR_SALIDA = os.path.join(RAIZ, "public", "icons")

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
    os.makedirs(DIR_SALIDA, exist_ok=True)
    for lado in (192, 512):
        icono = dibujar(lado)
        ruta = os.path.join(DIR_SALIDA, "icon-{0}.png".format(lado))
        icono.save(ruta, format="PNG")
        print("icono generado: {0}".format(os.path.relpath(ruta, RAIZ)))


if __name__ == "__main__":
    main()

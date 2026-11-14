# -*- coding: utf-8 -*-
"""Genera docs/03-plan/pitch-aegis.pptx — 7 diapositivas en ingles.

Estructura del Local Event:
problema y usuario -> solucion -> datos espaciales -> demostracion ->
evidencia y limitaciones -> cierre.

Uso:  python scripts/generar-pitch.py
"""
import os

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches, Pt

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, "docs", "03-plan", "pitch-aegis.pptx")

FONDO = RGBColor(0x0B, 0x0E, 0x13)
PANEL = RGBColor(0x14, 0x19, 0x22)
TEXTO = RGBColor(0xE6, 0xED, 0xF6)
SUAVE = RGBColor(0x8B, 0x9B, 0xB0)
ACENTO = RGBColor(0x4D, 0xA3, 0xFF)
VERDE = RGBColor(0x3D, 0xDC, 0x97)
ROJO = RGBColor(0xFF, 0x6B, 0x6B)
AMARILLO = RGBColor(0xFF, 0xB8, 0x4D)

FUENTE = "Segoe UI"
ANCHO = Inches(13.333)
ALTO = Inches(7.5)


def nueva_diapositiva(prs):
    s = prs.slides.add_slide(prs.slide_layouts[6])
    fondo = s.shapes.add_shape(1, 0, 0, ANCHO, ALTO)
    fondo.fill.solid()
    fondo.fill.fore_color.rgb = FONDO
    fondo.line.fill.background()
    return s


def texto(slide, izq, arriba, ancho, alto, contenido, tam=20, color=TEXTO,
          negrita=False, alineacion=PP_ALIGN.LEFT, espaciado=1.0):
    caja = slide.shapes.add_textbox(izq, arriba, ancho, alto)
    tf = caja.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0

    lineas = contenido.split("\n")
    for i, linea in enumerate(lineas):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = alineacion
        p.line_spacing = espaciado
        run = p.add_run()
        run.text = linea
        run.font.name = FUENTE
        run.font.size = Pt(tam)
        run.font.bold = negrita
        run.font.color.rgb = color
    return caja


def barra(slide, color=ACENTO, izq=Inches(0.9), arriba=Inches(0.75),
          ancho=Inches(0.9), alto=Inches(0.06)):
    b = slide.shapes.add_shape(1, izq, arriba, ancho, alto)
    b.fill.solid()
    b.fill.fore_color.rgb = color
    b.line.fill.background()


def pie(slide, numero):
    texto(slide, Inches(0.9), Inches(6.85), Inches(8), Inches(0.4),
          "Team ROCKET  ·  NASA Space Apps 2026", 11, SUAVE)
    texto(slide, Inches(11.6), Inches(6.85), Inches(0.9), Inches(0.4),
          str(numero), 11, SUAVE, alineacion=PP_ALIGN.RIGHT)


def diapositiva_titulo(prs, titulo, subtitulo, cuerpo, tam_titulo=40, tam_cuerpo=18):
    s = nueva_diapositiva(prs)
    barra(s)
    texto(s, Inches(0.9), Inches(1.0), Inches(11.5), Inches(1.6), titulo, tam_titulo, TEXTO, True)
    if subtitulo:
        texto(s, Inches(0.9), Inches(2.35), Inches(11.5), Inches(0.5), subtitulo, 20, ACENTO)
    if cuerpo:
        texto(s, Inches(0.9), Inches(3.0), Inches(11.5), Inches(3.4), cuerpo, tam_cuerpo, TEXTO, espaciado=1.5)
    return s


def main():
    prs = Presentation()
    prs.slide_width = ANCHO
    prs.slide_height = ALTO

    # ---------------------------------------------------------------- 1
    s = nueva_diapositiva(prs)
    barra(s, ACENTO, Inches(0.9), Inches(2.2), Inches(1.4), Inches(0.09))
    texto(s, Inches(0.9), Inches(2.5), Inches(11), Inches(1.4), "AEGIS", 88, TEXTO, True)
    texto(s, Inches(0.9), Inches(3.9), Inches(11), Inches(0.6),
          "Crew health autonomy, offline", 28, ACENTO)
    texto(s, Inches(0.9), Inches(5.1), Inches(11), Inches(0.5),
          "Team ROCKET  ·  NASA Space Apps Challenge 2026  ·  Tuxtla Gutierrez, Mexico", 16, SUAVE)
    texto(s, Inches(0.9), Inches(5.6), Inches(11), Inches(0.5),
          "Create Health Monitoring Software for Astronauts on Space Missions", 15, SUAVE)
    pie(s, 1)

    # ---------------------------------------------------------------- 2
    s = diapositiva_titulo(
        prs,
        "HALFWAY TO MARS,\nTHERE IS NO DOCTOR",
        None,
        "22 min      one-way communication delay\n"
        "5           hazards: radiation, isolation, distance, gravity, closed environments\n"
        "0           clinicians on board",
        44, 20)
    texto(s, Inches(0.9), Inches(5.05), Inches(11.5), Inches(0.5),
          "OUR USER:  the crew member who has to decide alone", 22, ACENTO, True)
    pie(s, 2)

    # ---------------------------------------------------------------- 3
    s = diapositiva_titulo(
        prs,
        "FROM \"SOMETHING FEELS WRONG\"\nTO A DECISION",
        None,
        "1    Guided measurement        how to measure, in microgravity\n"
        "2    Personal baseline         not population ranges\n"
        "3    Traffic light             green · yellow · red, with reason and action\n"
        "4    Emergency protocols       step by step, with timer and log\n"
        "5    Works offline             there is no cloud at 22 light-minutes",
        36, 19)
    pie(s, 3)

    # ---------------------------------------------------------------- 4
    s = diapositiva_titulo(
        prs,
        "THRESHOLDS THAT COME\nFROM REAL FLIGHT DATA",
        None,
        "NASA HRP      5 hazards + risks framework\n"
        "NASA OSDR     OSD-575 · Inspiration4 metabolic panel\n"
        "              4 crew · 7 timepoints · L-92 to R+194\n"
        "              reference ranges included in the dataset\n"
        "CSA           radiation monitoring for astronaut health",
        36, 19)
    texto(s, Inches(0.9), Inches(5.75), Inches(11.5), Inches(0.5),
          "Every number in the app traces to its source.", 20, VERDE, True)
    pie(s, 4)

    # ---------------------------------------------------------------- 5
    s = nueva_diapositiva(prs)
    barra(s)
    texto(s, Inches(0.9), Inches(0.95), Inches(11), Inches(0.9), "THE PRODUCT", 36, TEXTO, True)

    # tres marcadores de captura
    etiquetas = ["1 · guided measurement", "2 · traffic light", "3 · emergency protocol"]
    colores = [ACENTO, ROJO, AMARILLO]
    for i in range(3):
        izq = Inches(0.9 + i * 3.95)
        caja = s.shapes.add_shape(1, izq, Inches(2.1), Inches(3.6), Inches(2.9))
        caja.fill.solid()
        caja.fill.fore_color.rgb = PANEL
        caja.line.color.rgb = colores[i]
        caja.line.width = Pt(1.5)
        texto(s, izq + Inches(0.25), Inches(3.25), Inches(3.1), Inches(0.9),
              etiquetas[i], 15, colores[i], True, PP_ALIGN.CENTER)

    texto(s, Inches(0.9), Inches(5.5), Inches(11.5), Inches(0.6),
          "measure  →  compare  →  decide  →  act  →  log", 24, ACENTO, True, PP_ALIGN.CENTER)
    texto(s, Inches(0.9), Inches(6.15), Inches(11.5), Inches(0.4),
          "[ replace placeholders with real app screenshots before presenting ]", 12, SUAVE, False, PP_ALIGN.CENTER)
    pie(s, 5)

    # ---------------------------------------------------------------- 6
    s = nueva_diapositiva(prs)
    barra(s)
    texto(s, Inches(0.9), Inches(0.95), Inches(11), Inches(0.9), "EVIDENCE & LIMITATIONS", 36, TEXTO, True)

    texto(s, Inches(0.9), Inches(2.2), Inches(5.4), Inches(0.4), "WHAT WE VALIDATED", 15, VERDE, True)
    texto(s, Inches(0.9), Inches(2.7), Inches(5.4), Inches(2.8),
          "•  real flight dataset, downloaded and normalized\n"
          "•  reference ranges from the source, not invented\n"
          "•  works with the network disabled\n"
          "•  every threshold traceable to a citation",
          17, TEXTO, espaciado=1.4)

    texto(s, Inches(7.0), Inches(2.2), Inches(5.4), Inches(0.4), "WHAT WE DID NOT", 15, ROJO, True)
    texto(s, Inches(7.0), Inches(2.7), Inches(5.4), Inches(2.8),
          "•  it does not diagnose\n"
          "•  it does not prescribe medication or doses\n"
          "•  4 crew members, short orbital flight\n"
          "•  not clinically validated",
          17, TEXTO, espaciado=1.4)

    texto(s, Inches(0.9), Inches(5.75), Inches(11.5), Inches(0.5),
          "We built a decision aid, not a medical device.", 21, ACENTO, True)
    pie(s, 6)

    # ---------------------------------------------------------------- 7
    s = nueva_diapositiva(prs)
    barra(s, VERDE, Inches(0.9), Inches(2.0), Inches(1.4), Inches(0.09))
    texto(s, Inches(0.9), Inches(2.4), Inches(11.5), Inches(1.8),
          "WE DON'T DIAGNOSE.\nWE GIVE THE CREW BACK\nTHE ABILITY TO DECIDE.", 40, TEXTO, True)
    texto(s, Inches(0.9), Inches(5.1), Inches(11.5), Inches(0.9),
          "github.com/Charcraft/NASA-SPACEAPPS\n[demo link]", 17, ACENTO)
    texto(s, Inches(0.9), Inches(6.1), Inches(11.5), Inches(0.4), "Team ROCKET", 16, SUAVE)
    pie(s, 7)

    prs.save(SALIDA)
    print("generado: {0}".format(os.path.relpath(SALIDA, RAIZ)))
    print("diapositivas: {0}".format(len(prs.slides)))


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# crear-acceso-directo.sh
# Deja el proyecto visible en el escritorio (macOS / Linux).
#
# En macOS y Linux no existe "icono de carpeta" como en Windows, asi que se
# crea un enlace simbolico en el escritorio y, en Linux, un lanzador .desktop
# con el icono del proyecto.
#
# Uso:
#   bash scripts/crear-acceso-directo.sh
#   bash scripts/crear-acceso-directo.sh /ruta/a/otro.ico

set -eu

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ICONO="${1:-$RAIZ/assets/brand/proyecto.ico}"

if [ ! -f "$ICONO" ]; then
  echo "      icono no encontrado: $ICONO"
  ICONO=""
fi

ESCRITORIO="$HOME/Desktop"
[ -d "$ESCRITORIO" ] || ESCRITORIO="$HOME/Escritorio"
[ -d "$ESCRITORIO" ] || ESCRITORIO="$HOME/escritorio"

if [ ! -d "$ESCRITORIO" ]; then
  echo "      no se encontro el escritorio; se omite"
  exit 0
fi

ENLACE="$ESCRITORIO/NASA-SPACEAPPS"

if [ -L "$ENLACE" ] || [ -e "$ENLACE" ]; then
  rm -f "$ENLACE"
fi

ln -s "$RAIZ" "$ENLACE"
echo "      enlace creado: $ENLACE -> $RAIZ"

# Lanzador .desktop para Linux (GNOME/KDE lo muestran con icono)
if [ "$(uname -s)" = "Linux" ] && [ -n "$ICONO" ]; then
  LANZADOR="$ESCRITORIO/nasa-spaceapps.desktop"
  cat > "$LANZADOR" <<EOF
[Desktop Entry]
Type=Application
Name=NASA-SPACEAPPS
Comment=NASA Space Apps 2026 - Equipo ROCKET
Exec=xdg-open "$RAIZ"
Icon=$ICONO
Terminal=false
Categories=Development;
EOF
  chmod +x "$LANZADOR"
  echo "      lanzador creado: $LANZADOR"
fi

echo ""
echo "      Carpeta del proyecto: $RAIZ"

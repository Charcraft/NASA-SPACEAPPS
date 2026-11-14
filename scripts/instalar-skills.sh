#!/usr/bin/env bash
# instalar-skills.sh
# Copia el maletin de skills del repo a la carpeta que usa tu harness.
#
# Uso:
#   bash scripts/instalar-skills.sh              -> .opencode/skills (proyecto)
#   bash scripts/instalar-skills.sh claude
#   bash scripts/instalar-skills.sh opencode
#   bash scripts/instalar-skills.sh cursor

set -eu

HARNESS="${1:-proyecto}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ORIGEN="$RAIZ/skills"

if [ ! -d "$ORIGEN" ]; then
  echo "No se encontro la carpeta skills/ en el repo."
  exit 1
fi

case "$HARNESS" in
  claude)   DESTINO="$HOME/.claude/skills" ;;
  opencode) DESTINO="$HOME/.config/opencode/skills" ;;
  cursor)   DESTINO="$RAIZ/.cursor/skills" ;;
  *)        DESTINO="$RAIZ/.opencode/skills" ;;
esac

echo ""
echo "== Instalando skills =="
echo "Origen:  $ORIGEN"
echo "Destino: $DESTINO"
echo ""

mkdir -p "$DESTINO"

INSTALADAS=0
OMITIDAS=0

for dir in "$ORIGEN"/*/; do
  [ -d "$dir" ] || continue
  NOMBRE="$(basename "$dir")"
  TARGET="$DESTINO/$NOMBRE"

  if [ -e "$TARGET" ]; then
    echo "  ya existe  $NOMBRE"
    OMITIDAS=$((OMITIDAS + 1))
    continue
  fi

  cp -R "$dir" "$TARGET"
  echo "  OK         $NOMBRE"
  INSTALADAS=$((INSTALADAS + 1))
done

echo ""
echo "Instaladas: $INSTALADAS   Omitidas: $OMITIDAS"
echo ""
echo "Para ver el catalogo: skills/README.md"

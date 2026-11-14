#!/usr/bin/env bash
# crear-navegador.sh
# Crea el navegador personal de un integrante del equipo en BrowserAct.
#
# Uso:
#   bash scripts/crear-navegador.sh <usuario>
#   bash scripts/crear-navegador.sh <usuario> <profile_id>
#   bash scripts/crear-navegador.sh <usuario> <profile_id> --abrir
#
# Cada persona tiene SU navegador. No se comparte.

set -u

USUARIO="${1:-}"
PERFIL_ID="${2:-}"
ABRIR="${3:-}"

if [ -z "$USUARIO" ]; then
  echo "Uso: bash scripts/crear-navegador.sh <usuario> [profile_id] [--abrir]"
  exit 1
fi

echo ""
echo "== Navegador personal de $USUARIO =="
echo ""

if ! command -v browser-act >/dev/null 2>&1; then
  echo "browser-act no esta instalado."
  echo ""
  echo "Instalalo con:"
  echo "  uv tool install browser-act-cli --python 3.12"
  exit 1
fi

echo "  browser-act: $(browser-act --version 2>&1 | head -1)"

NOMBRE="NASA-$USUARIO"

if browser-act browser list 2>&1 | grep -q "name=\"$NOMBRE\""; then
  echo ""
  echo "  Ya existe un navegador llamado $NOMBRE. No se crea otro."
  exit 0
fi

echo ""
echo "  Creando navegador $NOMBRE ..."

DESC="Navegador PERSONAL de $USUARIO - equipo ROCKET - NASA Space Apps 2026 (reto Health Monitoring Software). Cuenta propia de esta persona. No compartir con otros integrantes."

browser-act browser create --name "$NOMBRE" --type chrome --desc "$DESC"

echo ""
echo "  Perfiles de Chrome disponibles:"
echo ""
browser-act browser list-profiles 2>&1 | sed 's/^/  /'

if [ -z "$PERFIL_ID" ]; then
  echo ""
  echo "  Para importar tu cuenta, ejecuta:"
  echo "    bash scripts/crear-navegador.sh $USUARIO <profile_id> --abrir"
  exit 0
fi

echo ""
echo "  Importando perfil $PERFIL_ID ..."
browser-act browser import-profile "$NOMBRE" "$PERFIL_ID"

if [ "$ABRIR" = "--abrir" ]; then
  echo ""
  echo "  Abriendo el navegador. Inicia sesion con TU cuenta."
  browser-act --session "nasa-$(echo "$USUARIO" | tr '[:upper:]' '[:lower:]')" \
    browser open "$NOMBRE" "https://accounts.google.com/signin" --headed
fi

echo ""
echo "  Guia completa: docs/10-entorno/05-tu-navegador.md"
echo ""

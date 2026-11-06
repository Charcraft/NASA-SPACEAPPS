#!/usr/bin/env bash
# setup-integrante.sh
# Prepara la maquina de un integrante del equipo ROCKET (macOS / Linux).
# Uso:  bash scripts/setup-integrante.sh cxrlosmp

set -u

USUARIO="${1:-}"

if [ -z "$USUARIO" ]; then
  echo "Uso: bash scripts/setup-integrante.sh <usuario>"
  exit 1
fi

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FALTANTES=()

echo ""
echo "== NASA Space Apps 2026 - Setup de integrante =="
echo "Usuario: $USUARIO"
echo "Repo:    $RAIZ"
echo ""

# --- 1. Herramientas -------------------------------------------------------
echo "[1/5] Verificando herramientas..."

check() {
  if command -v "$2" >/dev/null 2>&1; then
    echo "  OK    $1"
  else
    echo "  FALTA $1  ->  $3"
    FALTANTES+=("$1")
  fi
}

check "git"  "git"  "https://git-scm.com"
check "node" "node" "https://nodejs.org (v22 LTS)"
check "pnpm" "pnpm" "npm install -g pnpm"
check "gh"   "gh"   "https://cli.github.com"
check "orca" "orca" "sitio oficial de Orca"

# --- 2. Identidad de git ---------------------------------------------------
echo ""
echo "[2/5] Verificando identidad de git..."

GIT_NOMBRE="$(git config user.name || true)"
GIT_CORREO="$(git config user.email || true)"

if [ -z "$GIT_NOMBRE" ] || [ -z "$GIT_CORREO" ]; then
  echo "  No hay identidad configurada en este repo."
  echo '  git config user.name "Tu Nombre"'
  echo '  git config user.email "tu@correo.com"'
else
  echo "  OK    $GIT_NOMBRE <$GIT_CORREO>"
fi

# --- 3. Estructura ---------------------------------------------------------
echo ""
echo "[3/5] Verificando estructura del repo..."

for req in AGENTS.md MEMORY.md TECH-STACK.md docs team; do
  if [ -e "$RAIZ/$req" ]; then
    echo "  OK    $req"
  else
    echo "  FALTA $req"
  fi
done

# --- 4. Carpeta personal ---------------------------------------------------
echo ""
echo "[4/5] Preparando carpeta personal..."

CARPETA="$RAIZ/team/$USUARIO"
PLANTILLA="$RAIZ/team/_plantilla"

if [ -d "$CARPETA" ]; then
  echo "  OK    team/$USUARIO ya existe"
else
  mkdir -p "$CARPETA"
  for archivo in perfil.md bitacora.md; do
    if [ -f "$PLANTILLA/$archivo" ]; then
      sed "s/{{USUARIO}}/$USUARIO/g; s/{{NOMBRE}}/$USUARIO/g" \
        "$PLANTILLA/$archivo" > "$CARPETA/$archivo"
    fi
  done
  echo "  CREADA team/$USUARIO"
fi

# --- 5. Orca ---------------------------------------------------------------
echo ""
echo "[5/5] Registrando el repo en Orca..."

if command -v orca >/dev/null 2>&1; then
  orca repo add --path "$RAIZ" >/dev/null 2>&1 \
    && echo "  OK    repo registrado en Orca" \
    || echo "  No se pudo registrar. Ejecuta: orca repo add --path ."
else
  echo "  Orca no esta instalado. Se omite."
fi

# --- Resumen ---------------------------------------------------------------
echo ""
echo "== Siguientes pasos =="
echo "  1. Lee AGENTS.md"
echo "  2. Lee docs/07-trabajo-colaborativo/04-onboarding-integrante.md"
echo "  3. Completa team/$USUARIO/perfil.md"
echo "  4. Abre tu primer PR"
echo ""

if [ ${#FALTANTES[@]} -gt 0 ]; then
  echo "Herramientas faltantes: ${FALTANTES[*]}"
  exit 1
fi

echo "Setup completo."

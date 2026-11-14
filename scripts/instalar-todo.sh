#!/usr/bin/env bash
# instalar-todo.sh
# Instalacion completa de un integrante del equipo ROCKET (macOS / Linux).
# Ejecuta esto cuando alguien diga "lee el repo e instalalo".
#
# Uso:
#   bash scripts/instalar-todo.sh
#   bash scripts/instalar-todo.sh cxrlosmp

set -u

USUARIO="${1:-}"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$RAIZ" || exit 1

linea() { printf '%s\n' "----------------------------------------------------------"; }

echo ""
echo "  NASA SPACE APPS 2026  -  EQUIPO ROCKET"
echo "  Instalacion del entorno de trabajo"
echo ""
linea
echo ""

# ---------------------------------------------------------------- 1. Herramientas
echo "[1/6] Herramientas"
echo ""

FALTANTES=()
check() {
  if command -v "$2" >/dev/null 2>&1; then
    echo "      ok      $1"
  else
    echo "      FALTA   $1   ->  $3"
    FALTANTES+=("$1")
  fi
}

check "git"  "git"  "https://git-scm.com"
check "node" "node" "https://nodejs.org (v22 LTS)"
check "pnpm" "pnpm" "npm install -g pnpm"
check "gh"   "gh"   "https://cli.github.com"
check "orca" "orca" "sitio oficial de Orca"

echo ""

# ---------------------------------------------------------------- 2. Skills
echo "[2/6] Skills (24)"
echo ""

ORIGEN="$RAIZ/skills"

if [ ! -d "$ORIGEN" ]; then
  echo "      ERROR: no existe la carpeta skills/"
else
  for DESTINO in "$RAIZ/.opencode/skills" "$RAIZ/.claude/skills" "$RAIZ/.cursor/skills"; do
    mkdir -p "$DESTINO"
    NUEVAS=0
    for dir in "$ORIGEN"/*/; do
      [ -d "$dir" ] || continue
      NOMBRE="$(basename "$dir")"
      if [ ! -e "$DESTINO/$NOMBRE" ]; then
        cp -R "$dir" "$DESTINO/$NOMBRE"
        NUEVAS=$((NUEVAS + 1))
      fi
    done
    printf '      %-20s %s nuevas\n' "${DESTINO#$RAIZ/}" "$NUEVAS"
  done
fi

echo ""

# ---------------------------------------------------------------- 3. Orca
echo "[3/6] Orca"
echo ""
if command -v orca >/dev/null 2>&1; then
  orca repo add --path "$RAIZ" >/dev/null 2>&1 \
    && echo "      repo registrado" \
    || echo "      no se pudo registrar; ejecuta: orca repo add --path ."
else
  echo "      Orca no instalado (opcional)"
fi

echo ""

# ---------------------------------------------------------------- 4. Git
echo "[4/6] Git"
echo ""
GIT_NOMBRE="$(git config user.name || true)"
GIT_CORREO="$(git config user.email || true)"
if [ -z "$GIT_NOMBRE" ] || [ -z "$GIT_CORREO" ]; then
  echo "      Sin identidad configurada. Ejecuta:"
  echo '        git config user.name  "Tu Nombre"'
  echo '        git config user.email "tu@correo.com"'
else
  echo "      $GIT_NOMBRE <$GIT_CORREO>"
fi

if [ -n "$USUARIO" ]; then
  CARPETA="$RAIZ/team/$USUARIO"
  PLANTILLA="$RAIZ/team/_plantilla"
  if [ ! -d "$CARPETA" ]; then
    mkdir -p "$CARPETA"
    for archivo in BIENVENIDA.md perfil.md bitacora.md; do
      [ -f "$PLANTILLA/$archivo" ] && sed "s/{{USUARIO}}/$USUARIO/g; s/{{NOMBRE}}/$USUARIO/g" "$PLANTILLA/$archivo" > "$CARPETA/$archivo"
    done
    echo "      carpeta team/$USUARIO creada"
  else
    echo "      carpeta team/$USUARIO ya existe"
  fi
fi

echo ""

# ---------------------------------------------------------------- 5. Escritorio
echo "[5/6] Escritorio"
echo ""
if [ -f "$RAIZ/scripts/crear-acceso-directo.sh" ]; then
  bash "$RAIZ/scripts/crear-acceso-directo.sh" || echo "      no se pudo preparar el escritorio"
else
  echo "      falta scripts/crear-acceso-directo.sh"
fi

echo ""

# ---------------------------------------------------------------- 6. Estado
echo "[6/6] Estado"
echo ""
SKILLS_OK=$(find "$RAIZ/.opencode/skills" -maxdepth 1 -type d 2>/dev/null | wc -l | tr -d ' ')
DOCS=$(find "$RAIZ/docs" -name '*.md' -type f 2>/dev/null | wc -l | tr -d ' ')
echo "      skills disponibles : $SKILLS_OK"
echo "      documentos         : $DOCS"
if [ -f "$RAIZ/src/data/seed/osdr-inspiration4-cmp.json" ]; then
  echo "      dataset OSDR       : listo"
else
  echo "      dataset OSDR       : falta"
fi

echo ""
linea
echo ""

if [ ${#FALTANTES[@]} -gt 0 ]; then
  echo "INSTALACION INCOMPLETA"
  echo "Falta: ${FALTANTES[*]}"
  echo ""
  echo "Instalalas y vuelve a ejecutar este script."
  exit 1
fi

echo "INSTALACION COMPLETA"
echo ""
echo "  Siguiente paso, para el agente:"
echo "  Lee ONBOARDING.md y ejecuta el PASO 2: pregunta quien es la persona."
echo ""

# crear-navegador.ps1
# Crea el navegador personal de un integrante del equipo en BrowserAct.
#
# Cada persona tiene SU navegador. No se comparte: el navegador guarda
# sesiones de Google, GitHub y Space Apps de una cuenta concreta.
#
# Uso:
#   .\scripts\crear-navegador.ps1 -Usuario cxrlosmp
#   .\scripts\crear-navegador.ps1 -Usuario cxrlosmp -PerfilId local_profile_123
#   .\scripts\crear-navegador.ps1 -Usuario cxrlosmp -PerfilId local_profile_123 -Abrir
#
# Flujo:
#   1. Verifica que browser-act este instalado.
#   2. Crea el navegador "NASA-<usuario>" (vacio, sin sesiones).
#   3. Lista los perfiles de Chrome locales para elegir cual importar.
#   4. Importa el perfil elegido (opcional, con -PerfilId).
#   5. Abre el navegador para que la persona inicie sesion (opcional, con -Abrir).
#
# Nota: crear un navegador es una operacion que requiere confirmacion de la
# persona. El agente debe preguntar antes de ejecutar este script.

param(
    [Parameter(Mandatory = $true)]
    [string]$Usuario,

    [string]$PerfilId = "",

    [switch]$Abrir
)

$ErrorActionPreference = "Continue"

Write-Host ""
Write-Host "== Navegador personal de $Usuario ==" -ForegroundColor Cyan
Write-Host ""

# ---------------------------------------------------------------- 1. browser-act
$ba = Get-Command browser-act -ErrorAction SilentlyContinue
if (-not $ba) {
    Write-Host "browser-act no esta instalado." -ForegroundColor Red
    Write-Host ""
    Write-Host "Instalalo con:" -ForegroundColor Yellow
    Write-Host "  uv tool install browser-act-cli --python 3.12"
    Write-Host ""
    Write-Host "Si no tienes uv:" -ForegroundColor Yellow
    Write-Host "  https://docs.astral.sh/uv/getting-started/installation/"
    exit 1
}

$version = (browser-act --version 2>&1 | Select-Object -First 1)
Write-Host ("  browser-act: {0}" -f $version) -ForegroundColor DarkGreen

# ---------------------------------------------------------------- 2. ya existe?
$nombre = "NASA-$Usuario"
$lista = browser-act browser list 2>&1

if ($lista -match [regex]::Escape("name=`"$nombre`"")) {
    Write-Host ""
    Write-Host ("  Ya existe un navegador llamado {0}." -f $nombre) -ForegroundColor Yellow
    Write-Host "  No se crea otro. Para usarlo:" -ForegroundColor Gray
    Write-Host ("    browser-act --session nasa-{0} browser open <browser_id> https://google.com --headed" -f $Usuario.ToLower())
    exit 0
}

# ---------------------------------------------------------------- 3. crear
Write-Host ""
Write-Host ("  Creando navegador {0} ..." -f $nombre) -ForegroundColor Yellow

$desc = "Navegador PERSONAL de $Usuario - equipo ROCKET - NASA Space Apps 2026 (reto Health Monitoring Software). Cuenta propia de esta persona. Uso: buscar en internet, spaceappschallenge.org, NASA HRP, OSDR, GitHub. No compartir con otros integrantes."

$creado = browser-act browser create --name $nombre --type chrome --desc $desc 2>&1
$creado | Select-Object -First 4 | ForEach-Object { Write-Host ("  {0}" -f $_) }

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "  No se pudo crear. Revisa el mensaje de arriba." -ForegroundColor Red
    exit 1
}

# sacar el id del navegador recien creado
$idNuevo = ""
$m = [regex]::Match(($creado -join "`n"), "id=(\S+)")
if ($m.Success) { $idNuevo = $m.Groups[1].Value }

Write-Host ""
Write-Host "  Navegador creado." -ForegroundColor Green
if ($idNuevo) { Write-Host ("  id: {0}" -f $idNuevo) -ForegroundColor Gray }

# ---------------------------------------------------------------- 4. perfiles
Write-Host ""
Write-Host "  Perfiles de Chrome disponibles para importar:" -ForegroundColor Yellow
Write-Host ""

$perfiles = browser-act browser list-profiles 2>&1
$perfiles | ForEach-Object { Write-Host ("  {0}" -f $_) }

if ($PerfilId -eq "") {
    Write-Host ""
    Write-Host "  Para importar tu cuenta, elige el profile_id de la lista y ejecuta:" -ForegroundColor Cyan
    if ($idNuevo) {
        Write-Host ("    .\scripts\crear-navegador.ps1 -Usuario {0} -PerfilId <profile_id> -Abrir" -f $Usuario)
    }
    else {
        Write-Host ("    browser-act browser import-profile <browser_id> <profile_id>")
    }
    Write-Host ""
    Write-Host "  Aviso: importar puede cerrar tu Chrome un momento." -ForegroundColor DarkGray
    exit 0
}

# ---------------------------------------------------------------- 5. importar
$destino = if ($idNuevo) { $idNuevo } else { $nombre }
Write-Host ""
Write-Host ("  Importando perfil {0} ..." -f $PerfilId) -ForegroundColor Yellow

$imp = browser-act browser import-profile $destino $PerfilId 2>&1
$imp | ForEach-Object { Write-Host ("  {0}" -f $_) }

if ($imp -match "successful") {
    Write-Host "  Perfil importado." -ForegroundColor Green
}
else {
    Write-Host "  Revisa el mensaje. Si dice que un archivo esta en uso, cierra Chrome y reintenta." -ForegroundColor Yellow
}

# ---------------------------------------------------------------- 6. abrir
if ($Abrir) {
    Write-Host ""
    Write-Host "  Abriendo el navegador para iniciar sesion..." -ForegroundColor Yellow
    Write-Host "  Inicia sesion con TU cuenta de Google. Escribe la contrasena tu mismo." -ForegroundColor Cyan
    if ($destino -eq $nombre) { $destino = $idNuevo }
    browser-act --session ("nasa-" + $Usuario.ToLower()) browser open $destino "https://accounts.google.com/signin" --headed 2>&1 | Select-Object -First 3
}

Write-Host ""
Write-Host "== Siguiente paso ==" -ForegroundColor Cyan
Write-Host "  1. Inicia sesion con TU cuenta en la ventana abierta."
Write-Host "  2. Verifica:"
Write-Host ("     browser-act --session nasa-{0} navigate https://myaccount.google.com/" -f $Usuario.ToLower())
Write-Host "  3. A partir de ahora, pidele a tu agente que use ESE navegador."
Write-Host ""
Write-Host "  Guia completa: docs/10-entorno/05-tu-navegador.md" -ForegroundColor Gray
Write-Host ""

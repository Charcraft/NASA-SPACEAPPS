# setup-integrante.ps1
# Prepara la maquina de un integrante del equipo ROCKET.
# Uso:  .\scripts\setup-integrante.ps1 -Usuario cxrlosmp

param(
    [Parameter(Mandatory = $true)]
    [string]$Usuario
)

$ErrorActionPreference = "Continue"
$raiz = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "== NASA Space Apps 2026 - Setup de integrante ==" -ForegroundColor Cyan
Write-Host "Usuario: $Usuario"
Write-Host "Repo:    $raiz"
Write-Host ""

# --- 1. Herramientas -------------------------------------------------------
Write-Host "[1/5] Verificando herramientas..." -ForegroundColor Yellow

$faltantes = @()

function Test-Herramienta {
    param([string]$Nombre, [string]$Comando, [string]$Sugerencia)
    $existe = Get-Command $Comando -ErrorAction SilentlyContinue
    if ($existe) {
        Write-Host ("  OK   {0}" -f $Nombre) -ForegroundColor Green
    }
    else {
        Write-Host ("  FALTA {0}  ->  {1}" -f $Nombre, $Sugerencia) -ForegroundColor Red
        $script:faltantes += $Nombre
    }
}

Test-Herramienta "git"  "git"  "https://git-scm.com"
Test-Herramienta "node" "node" "https://nodejs.org (v22 LTS)"
Test-Herramienta "pnpm" "pnpm" "npm install -g pnpm"
Test-Herramienta "gh"   "gh"   "https://cli.github.com"
Test-Herramienta "orca" "orca" "sitio oficial de Orca"

# --- 2. Identidad de git ---------------------------------------------------
Write-Host ""
Write-Host "[2/5] Verificando identidad de git..." -ForegroundColor Yellow

$nombre = git config user.name
$correo = git config user.email

if ([string]::IsNullOrWhiteSpace($nombre) -or [string]::IsNullOrWhiteSpace($correo)) {
    Write-Host "  No hay identidad configurada en este repo." -ForegroundColor Red
    Write-Host "  Ejecuta:" -ForegroundColor Yellow
    Write-Host '    git config user.name "Tu Nombre"'
    Write-Host '    git config user.email "tu@correo.com"'
}
else {
    Write-Host ("  OK   {0} <{1}>" -f $nombre, $correo) -ForegroundColor Green
}

# --- 3. Carpetas del repositorio -------------------------------------------
Write-Host ""
Write-Host "[3/5] Verificando estructura del repo..." -ForegroundColor Yellow

$requeridos = @("AGENTS.md", "MEMORY.md", "TECH-STACK.md", "docs", "team")
foreach ($r in $requeridos) {
    if (Test-Path (Join-Path $raiz $r)) {
        Write-Host ("  OK   {0}" -f $r) -ForegroundColor Green
    }
    else {
        Write-Host ("  FALTA {0}" -f $r) -ForegroundColor Red
    }
}

# --- 4. Carpeta personal ---------------------------------------------------
Write-Host ""
Write-Host "[4/5] Preparando carpeta personal..." -ForegroundColor Yellow

$carpeta = Join-Path $raiz (Join-Path "team" $Usuario)
$plantilla = Join-Path $raiz "team\_plantilla"

if (Test-Path $carpeta) {
    Write-Host ("  OK   team\{0} ya existe" -f $Usuario) -ForegroundColor Green
}
else {
    New-Item -ItemType Directory -Path $carpeta -Force | Out-Null
    foreach ($archivo in @("perfil.md", "bitacora.md")) {
        $origen = Join-Path $plantilla $archivo
        $destino = Join-Path $carpeta $archivo
        if (Test-Path $origen) {
            (Get-Content $origen -Raw) -replace '\{\{USUARIO\}\}', $Usuario | Set-Content $destino -Encoding UTF8
        }
    }
    Write-Host ("  CREADA team\{0}" -f $Usuario) -ForegroundColor Green
    Write-Host "  Completa tu perfil: team\$Usuario\perfil.md"
}

# --- 5. Registro en Orca ---------------------------------------------------
Write-Host ""
Write-Host "[5/5] Registrando el repo en Orca..." -ForegroundColor Yellow

if (Get-Command orca -ErrorAction SilentlyContinue) {
    try {
        orca repo add --path $raiz 2>&1 | Out-Null
        Write-Host "  OK   repo registrado en Orca" -ForegroundColor Green
    }
    catch {
        Write-Host "  No se pudo registrar. Ejecuta a mano: orca repo add --path ." -ForegroundColor Yellow
    }
}
else {
    Write-Host "  Orca no esta instalado. Se omite." -ForegroundColor Yellow
}

# --- Resumen ---------------------------------------------------------------
Write-Host ""
Write-Host "== Siguientes pasos ==" -ForegroundColor Cyan
Write-Host "  1. Lee AGENTS.md (5 min)"
Write-Host "  2. Lee docs/07-trabajo-colaborativo/04-onboarding-integrante.md"
Write-Host "  3. Completa team\$Usuario\perfil.md"
Write-Host "  4. Abre tu primer PR:"
Write-Host "       git checkout -b docs/$Usuario/perfil"
Write-Host "       git add team/$Usuario/perfil.md"
Write-Host '       git commit -m "docs(team): completa perfil"'
Write-Host "       git push -u origin docs/$Usuario/perfil"
Write-Host "       gh pr create --fill"
Write-Host ""

if ($faltantes.Count -gt 0) {
    Write-Host ("Herramientas faltantes: {0}" -f ($faltantes -join ", ")) -ForegroundColor Red
    Write-Host "Instalalas antes de continuar." -ForegroundColor Red
    exit 1
}

Write-Host "Setup completo." -ForegroundColor Green

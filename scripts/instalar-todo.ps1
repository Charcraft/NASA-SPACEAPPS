# instalar-todo.ps1
# Instalacion completa de un integrante del equipo ROCKET.
# Ejecuta esto cuando alguien diga "lee el repo e instalalo".
#
# Uso:
#   .\scripts\instalar-todo.ps1
#   .\scripts\instalar-todo.ps1 -Usuario cxrlosmp
#
# Instala las skills en las tres rutas de harness del proyecto para que
# funcione igual en OpenCode, Claude Code y Cursor.

param(
    [string]$Usuario = "",
    [string]$Icono = ""
)

$ErrorActionPreference = "Continue"
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz

function Linea { Write-Host ("-" * 58) -ForegroundColor DarkGray }

Clear-Host
Write-Host ""
Write-Host "  NASA SPACE APPS 2026  -  EQUIPO ROCKET" -ForegroundColor Cyan
Write-Host "  Instalacion del entorno de trabajo" -ForegroundColor DarkGray
Write-Host ""
Linea
Write-Host ""

# ---------------------------------------------------------------- 1. Herramientas
Write-Host "[1/6] Herramientas" -ForegroundColor Yellow
Write-Host ""

$faltantes = @()
function Test-Minimo {
    param([string]$Nombre, [string]$Comando, [string]$Sugerencia)
    if (Get-Command $Comando -ErrorAction SilentlyContinue) {
        Write-Host ("      ok      {0}" -f $Nombre) -ForegroundColor DarkGreen
    }
    else {
        Write-Host ("      FALTA   {0}   ->  {1}" -f $Nombre, $Sugerencia) -ForegroundColor Red
        $script:faltantes += $Nombre
    }
}

Test-Minimo "git"     "git"     "https://git-scm.com"
Test-Minimo "node"    "node"    "https://nodejs.org (v22 LTS)"
Test-Minimo "pnpm"    "pnpm"    "npm install -g pnpm"
Test-Minimo "gh"      "gh"      "https://cli.github.com"
Test-Minimo "orca"    "orca"    "sitio oficial de Orca"

Write-Host ""

# ---------------------------------------------------------------- 2. Skills
Write-Host "[2/6] Skills (24)" -ForegroundColor Yellow
Write-Host ""

$origen = Join-Path $raiz "skills"
$destinos = @(
    @{ ruta = (Join-Path $raiz ".opencode\skills"); nombre = ".opencode/skills" },
    @{ ruta = (Join-Path $raiz ".claude\skills");   nombre = ".claude/skills" },
    @{ ruta = (Join-Path $raiz ".cursor\skills");   nombre = ".cursor/skills" }
)

$totalInstaladas = 0

if (-not (Test-Path $origen)) {
    Write-Host "      ERROR: no existe la carpeta skills/" -ForegroundColor Red
}
else {
    foreach ($d in $destinos) {
        New-Item -ItemType Directory -Path $d.ruta -Force | Out-Null
        $nuevas = 0
        Get-ChildItem $origen -Directory | ForEach-Object {
            $target = Join-Path $d.ruta $_.Name
            if (-not (Test-Path $target)) {
                Copy-Item -Path $_.FullName -Destination $target -Recurse -Force
                $nuevas++
            }
        }
        $totalInstaladas += $nuevas
        Write-Host ("      {0,-20} {1} nuevas" -f $d.nombre, $nuevas) -ForegroundColor DarkGreen
    }
}

Write-Host ""

# ---------------------------------------------------------------- 3. Repo en Orca
Write-Host "[3/6] Orca" -ForegroundColor Yellow
Write-Host ""

if (Get-Command orca -ErrorAction SilentlyContinue) {
    try {
        orca repo add --path $raiz 2>&1 | Out-Null
        Write-Host "      repo registrado" -ForegroundColor DarkGreen
    }
    catch {
        Write-Host "      no se pudo registrar; ejecuta: orca repo add --path ." -ForegroundColor Yellow
    }
}
else {
    Write-Host "      Orca no instalado (opcional)" -ForegroundColor DarkGray
}

Write-Host ""

# ---------------------------------------------------------------- 4. Git
Write-Host "[4/6] Git" -ForegroundColor Yellow
Write-Host ""

$nombre = git config user.name
$correo = git config user.email

if ([string]::IsNullOrWhiteSpace($nombre) -or [string]::IsNullOrWhiteSpace($correo)) {
    Write-Host "      Sin identidad configurada. Ejecuta:" -ForegroundColor Yellow
    Write-Host '        git config user.name  "Tu Nombre"'
    Write-Host '        git config user.email "tu@correo.com"'
}
else {
    Write-Host ("      {0} <{1}>" -f $nombre, $correo) -ForegroundColor DarkGreen
}

if ($Usuario -ne "") {
    $carpeta = Join-Path $raiz (Join-Path "team" $Usuario)
    $plantilla = Join-Path $raiz "team\_plantilla"
    if (-not (Test-Path $carpeta)) {
        New-Item -ItemType Directory -Path $carpeta -Force | Out-Null
        foreach ($archivo in @("BIENVENIDA.md", "perfil.md", "bitacora.md")) {
            $o = Join-Path $plantilla $archivo
            if (Test-Path $o) {
                $txt = (Get-Content $o -Raw -Encoding UTF8) -replace '\{\{USUARIO\}\}', $Usuario
                $txt = $txt -replace '\{\{NOMBRE\}\}', $Usuario
                [System.IO.File]::WriteAllText((Join-Path $carpeta $archivo), $txt, [System.Text.UTF8Encoding]::new($false))
            }
        }
        Write-Host ("      carpeta team/{0} creada" -f $Usuario) -ForegroundColor DarkGreen
    }
    else {
        Write-Host ("      carpeta team/{0} ya existe" -f $Usuario) -ForegroundColor DarkGreen
    }
}

Write-Host ""

# ---------------------------------------------------------------- 5. Escritorio
Write-Host "[5/6] Escritorio" -ForegroundColor Yellow
Write-Host ""

$scriptAcceso = Join-Path $raiz "scripts\crear-acceso-directo.ps1"
if (Test-Path $scriptAcceso) {
    try {
        if ($Icono -ne "") { & $scriptAcceso -Icono $Icono } else { & $scriptAcceso }
    }
    catch {
        Write-Host "      no se pudo preparar el escritorio: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}
else {
    Write-Host "      falta scripts\crear-acceso-directo.ps1" -ForegroundColor Yellow
}

Write-Host ""

# ---------------------------------------------------------------- 6. Estado
Write-Host "[6/6] Estado" -ForegroundColor Yellow
Write-Host ""

$skillsOk = (Get-ChildItem (Join-Path $raiz ".opencode\skills") -Directory -ErrorAction SilentlyContinue).Count
$docs = (Get-ChildItem (Join-Path $raiz "docs") -Recurse -File -Filter *.md -ErrorAction SilentlyContinue).Count

Write-Host ("      skills disponibles : {0}" -f $skillsOk)
Write-Host ("      documentos         : {0}" -f $docs)
Write-Host ("      dataset OSDR       : {0}" -f $(if (Test-Path "src\data\seed\osdr-inspiration4-cmp.json") { "listo" } else { "falta" }))

Write-Host ""
Linea
Write-Host ""

if ($faltantes.Count -gt 0) {
    Write-Host "INSTALACION INCOMPLETA" -ForegroundColor Red
    Write-Host ("Falta: {0}" -f ($faltantes -join ", ")) -ForegroundColor Red
    Write-Host ""
    Write-Host "Instalalas y vuelve a ejecutar este script." -ForegroundColor Yellow
    exit 1
}

Write-Host "INSTALACION COMPLETA" -ForegroundColor Green
Write-Host ""
Write-Host "  Siguiente paso, para el agente:" -ForegroundColor Cyan
Write-Host "  Lee ONBOARDING.md y ejecuta el PASO 2: pregunta quien es la persona." -ForegroundColor Gray
Write-Host ""

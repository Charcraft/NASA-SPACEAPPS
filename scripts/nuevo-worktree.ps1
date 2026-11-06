# nuevo-worktree.ps1
# Crea una rama y un worktree de Orca para una tarea, y lanza el agente.
#
# Uso:
#   .\scripts\nuevo-worktree.ps1 -Nombre indicador-presion -Usuario cxrlosmp
#   .\scripts\nuevo-worktree.ps1 -Nombre mapa-corporal -Usuario angel_marco -Tipo feat -Agente opencode -Prompt "Lee AGENTS.md..."
#
# Sin -Agente, solo crea el worktree (util si prefieres abrir tu editor a mano).

param(
    [Parameter(Mandatory = $true)]
    [string]$Nombre,

    [Parameter(Mandatory = $true)]
    [string]$Usuario,

    [ValidateSet("feat", "fix", "docs", "data", "chore")]
    [string]$Tipo = "feat",

    [string]$Agente = "",
    [string]$Prompt = ""
)

$ErrorActionPreference = "Stop"
$raiz = Split-Path -Parent $PSScriptRoot
$rama = "$Tipo/$Usuario/$Nombre"

Write-Host ""
Write-Host "== Nuevo worktree ==" -ForegroundColor Cyan
Write-Host ("Rama:    {0}" -f $rama)
Write-Host ("Worktree:{0}" -f $Nombre)
Write-Host ""

# Verificar que estamos en el repo
if (-not (Test-Path (Join-Path $raiz ".git"))) {
    Write-Host "No se encontro el repositorio. Ejecuta desde la raiz del proyecto." -ForegroundColor Red
    exit 1
}

# Actualizar main antes de ramificar
Push-Location $raiz
try {
    Write-Host "Actualizando main..." -ForegroundColor Yellow
    git checkout main 2>&1 | Out-Null
    git pull --ff-only 2>&1 | Out-Null
}
catch {
    Write-Host "No se pudo actualizar main. Continuando con lo que hay." -ForegroundColor Yellow
}
finally {
    Pop-Location
}

# Crear el worktree con Orca
if (-not (Get-Command orca -ErrorAction SilentlyContinue)) {
    Write-Host "Orca no esta instalado. Creando solo la rama con git." -ForegroundColor Yellow
    Push-Location $raiz
    git checkout -b $rama
    Pop-Location
    Write-Host ("Listo: rama {0} creada. Ya puedes trabajar." -f $rama) -ForegroundColor Green
    exit 0
}

$argumentos = @("worktree", "create", "--name", $Nombre, "--repo", $raiz)

if ($Agente -ne "") {
    $argumentos += @("--agent", $Agente)
    if ($Prompt -ne "") {
        $argumentos += @("--prompt", $Prompt)
    }
}

Write-Host "Creando worktree en Orca..." -ForegroundColor Yellow
& orca @argumentos

Write-Host ""
Write-Host "Siguientes pasos:" -ForegroundColor Cyan
Write-Host "  orca worktree set --worktree name:$Nombre --comment ""iniciando"" "
Write-Host "  orca worktree list"
Write-Host ""
Write-Host "Al terminar:" -ForegroundColor Cyan
Write-Host ("  git push -u origin {0}" -f $rama)
Write-Host "  gh pr create --fill"
Write-Host ""

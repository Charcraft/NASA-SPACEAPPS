# instalar-skills.ps1
# Copia el maletin de skills del repo a la carpeta que usa tu harness.
#
# Uso:
#   .\scripts\instalar-skills.ps1              -> instala en .opencode/skills (proyecto)
#   .\scripts\instalar-skills.ps1 -Harness claude
#   .\scripts\instalar-skills.ps1 -Harness opencode
#   .\scripts\instalar-skills.ps1 -Harness cursor

param(
    [ValidateSet("proyecto", "claude", "opencode", "cursor")]
    [string]$Harness = "proyecto"
)

$ErrorActionPreference = "Stop"
$raiz = Split-Path -Parent $PSScriptRoot
$origen = Join-Path $raiz "skills"

if (-not (Test-Path $origen)) {
    Write-Host "No se encontro la carpeta skills/ en el repo." -ForegroundColor Red
    exit 1
}

$destino = switch ($Harness) {
    "claude"   { Join-Path $env:USERPROFILE ".claude\skills" }
    "opencode" { Join-Path $env:USERPROFILE ".config\opencode\skills" }
    "cursor"   { Join-Path $raiz ".cursor\skills" }
    default    { Join-Path $raiz ".opencode\skills" }
}

Write-Host ""
Write-Host "== Instalando skills ==" -ForegroundColor Cyan
Write-Host ("Origen:  {0}" -f $origen)
Write-Host ("Destino: {0}" -f $destino)
Write-Host ""

New-Item -ItemType Directory -Path $destino -Force | Out-Null

$instaladas = 0
$omitidas = 0

Get-ChildItem $origen -Directory | ForEach-Object {
    $nombre = $_.Name
    $target = Join-Path $destino $nombre

    if (Test-Path $target) {
        Write-Host ("  ya existe  {0}" -f $nombre) -ForegroundColor DarkGray
        $omitidas++
        return
    }

    Copy-Item -Path $_.FullName -Destination $target -Recurse -Force
    Write-Host ("  OK         {0}" -f $nombre) -ForegroundColor Green
    $instaladas++
}

Write-Host ""
Write-Host ("Instaladas: {0}   Omitidas (ya existian): {1}" -f $instaladas, $omitidas) -ForegroundColor Cyan
Write-Host ""

if ($Harness -eq "opencode" -and (Test-Path $destino)) {
    Write-Host "Reinicia OpenCode para que detecte las skills nuevas." -ForegroundColor Yellow
}

Write-Host "Para ver el catalogo: skills/README.md" -ForegroundColor Gray

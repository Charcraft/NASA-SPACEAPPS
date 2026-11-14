# verificar-docs.ps1
# Comprueba que todos los enlaces relativos a archivos .md resuelvan.
# Uso:  .\scripts\verificar-docs.ps1
# Sale con codigo 1 si encuentra referencias rotas (sirve para CI).

$ErrorActionPreference = "Stop"
$raiz = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "== Verificacion de documentacion ==" -ForegroundColor Cyan
Write-Host ""

$archivos = Get-ChildItem $raiz -Recurse -Filter *.md -File |
    Where-Object {
        $_.FullName -notmatch '\\node_modules\\' -and
        $_.FullName -notmatch '\\\.git\\' -and
        $_.FullName -notmatch '\\\.opencode\\skills\\' -and
        $_.FullName -notmatch '\\\.claude\\skills\\' -and
        $_.FullName -notmatch '\\\.cursor\\skills\\'
    }

$rotos = @()
$totalEnlaces = 0
$huerfanosSinH1 = @()

foreach ($archivo in $archivos) {
    $contenido = Get-Content $archivo.FullName -Raw
    if ([string]::IsNullOrEmpty($contenido)) { continue }

    # Enlaces relativos a .md
    $enlaces = [regex]::Matches($contenido, '\]\(([^)]+\.md)(#[^)]*)?\)')
    foreach ($m in $enlaces) {
        $enlace = $m.Groups[1].Value
        if ($enlace -match '^https?://') { continue }
        $totalEnlaces++
        $destino = Join-Path $archivo.DirectoryName $enlace
        if (-not (Test-Path $destino)) {
            $rel = $archivo.FullName.Replace($raiz + '\', '')
            $rotos += ("{0}  ->  {1}" -f $rel, $enlace)
        }
    }

    # Un solo H1 por archivo (solo se exige en documentación del proyecto)
    $esDoc = $archivo.FullName -match '\\docs\\' -or $archivo.FullName -match '\\(README|AGENTS|MEMORY|TECH-STACK|CLAUDE)\.md$'
    $tieneFrontMatter = $contenido.StartsWith("---")
    $h1 = [regex]::Matches($contenido, '(?m)^#\s+')
    if ($esDoc -and -not $tieneFrontMatter -and $h1.Count -eq 0) {
        $huerfanosSinH1 += $archivo.FullName.Replace($raiz + '\', '')
    }
}

Write-Host ("Archivos revisados: {0}" -f $archivos.Count)
Write-Host ("Enlaces relativos:  {0}" -f $totalEnlaces)
Write-Host ""

if ($rotos.Count -gt 0) {
    Write-Host "ENLACES ROTOS:" -ForegroundColor Red
    $rotos | ForEach-Object { Write-Host ("  {0}" -f $_) -ForegroundColor Red }
    Write-Host ""
}

if ($huerfanosSinH1.Count -gt 0) {
    Write-Host "ARCHIVOS SIN TITULO H1:" -ForegroundColor Yellow
    $huerfanosSinH1 | ForEach-Object { Write-Host ("  {0}" -f $_) -ForegroundColor Yellow }
    Write-Host ""
}

if ($rotos.Count -eq 0 -and $huerfanosSinH1.Count -eq 0) {
    Write-Host "Todo correcto." -ForegroundColor Green
    exit 0
}

if ($rotos.Count -gt 0) { exit 1 }
exit 0

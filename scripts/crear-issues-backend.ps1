# crear-issues-backend.ps1
# Crea los dos issues de backend del hackathon.
# Requiere: gh autenticado (gh auth login) y permisos de escritura en el repo.
# Uso:  .\scripts\crear-issues-backend.ps1
#
# Es idempotente: si un issue con el mismo título ya existe, no lo duplica.
# Los cuerpos viven en `scripts/issues/*.md` para no depender de la codificación
# de PowerShell 5.1 (que lee UTF-8 sin BOM como ANSI y rompe los acentos).

$ErrorActionPreference = "Continue"

function Invoke-Gh {
    param([string[]]$GhArgs)

    $ultimoError = ""

    for ($intento = 1; $intento -le 4; $intento++) {
        $salida = & gh @GhArgs 2>&1
        if ($LASTEXITCODE -eq 0) {
            return $salida
        }

        $ultimoError = ($salida | Out-String).Trim()
        Start-Sleep -Seconds (2 * $intento)
    }

    throw "gh $($GhArgs -join ' ') falló tras 4 intentos: $ultimoError"
}

function Test-Gh {
    # `gh auth status` puede devolver 1 por un fallo de red puntual aunque la
    # sesión sea válida. Solo se aborta si el mensaje dice que no hay sesión.
    $salida = (& gh auth status 2>&1 | Out-String)

    if ($salida -match "not logged into any GitHub hosts") {
        Write-Host "gh no está autenticado. Ejecuta: gh auth login" -ForegroundColor Red
        exit 1
    }
}

# Se construye con código de carácter para que el script siga siendo ASCII.
$acentoI = [char]0x00ED
$prioCritica = "prio:cr${acentoI}tica"

$etiquetas = @(
    @{ Nombre = "area:plataforma"; Color = "6E7781"; Descripcion = "Backend: scaffold, realtime, bridge 3D, APIs" },
    @{ Nombre = "area:datos";      Color = "1D76DB"; Descripcion = "Datos OSDR, persistencia y sincronizacion" },
    @{ Nombre = "area:reglas";     Color = "0B3D91"; Descripcion = "Reglas deterministas y triage" },
    @{ Nombre = "tipo:tarea";      Color = "C5DEF5"; Descripcion = "Trabajo normal" },
    @{ Nombre = $prioCritica;      Color = "B60205"; Descripcion = "Sin esto no hay entrega" },
    @{ Nombre = "hackathon";       Color = "5319E7"; Descripcion = "NASA Space Apps 2026" }
)

Test-Gh

foreach ($etiqueta in $etiquetas) {
    # `--force` crea o actualiza: la operación es idempotente y no depende de
    # comparar nombres acentuados en la salida de PowerShell 5.1.
    Invoke-Gh @(
        "label", "create", $etiqueta.Nombre,
        "--color", $etiqueta.Color,
        "--description", $etiqueta.Descripcion,
        "--force"
    ) | Out-Null
}

$issues = (Invoke-Gh @("issue", "list", "--state", "all", "--limit", "100", "--json", "title")) | ConvertFrom-Json

$tituloBack1 = "[backend] Scaffold, contratos y motor de tiempo real (Back 1)"
$tituloBack2 = "[backend] Datos, triage y persistencia (Back 2)"

$cuerpoBack1 = Join-Path $PSScriptRoot "issues\backend-1.md"
$cuerpoBack2 = Join-Path $PSScriptRoot "issues\backend-2.md"

foreach ($archivo in @($cuerpoBack1, $cuerpoBack2)) {
    if (-not (Test-Path $archivo)) {
        throw "Falta el cuerpo del issue: $archivo"
    }
}

if ($issues | Where-Object { $_.title -eq $tituloBack1 }) {
    Write-Host "Ya existe: $tituloBack1" -ForegroundColor Yellow
} else {
    $url = Invoke-Gh @(
        "issue", "create",
        "--title", $tituloBack1,
        "--body-file", $cuerpoBack1,
        "--label", "area:plataforma",
        "--label", "tipo:tarea",
        "--label", $prioCritica,
        "--label", "hackathon",
        "--assignee", "@me"
    )
    Write-Host "Issue creado: $url" -ForegroundColor Green
}

if ($issues | Where-Object { $_.title -eq $tituloBack2 }) {
    Write-Host "Ya existe: $tituloBack2" -ForegroundColor Yellow
} else {
    $url = Invoke-Gh @(
        "issue", "create",
        "--title", $tituloBack2,
        "--body-file", $cuerpoBack2,
        "--label", "area:datos",
        "--label", "area:reglas",
        "--label", "tipo:tarea",
        "--label", $prioCritica,
        "--label", "hackathon"
    )
    Write-Host "Issue creado: $url" -ForegroundColor Green
}

Write-Host ""
Write-Host "Listo. Verifica en GitHub Projects." -ForegroundColor Green

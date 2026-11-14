# crear-acceso-directo.ps1
# Deja el proyecto visible en el escritorio con su icono propio.
#
# Que hace:
#   1. Pone el icono del proyecto al icono de la carpeta del repo (desktop.ini).
#   2. Crea un acceso directo "NASA-SPACEAPPS" en el escritorio que abre la carpeta.
#
# Uso:
#   .\scripts\crear-acceso-directo.ps1
#   .\scripts\crear-acceso-directo.ps1 -Icono "C:\ruta\a\otro.ico"
#   .\scripts\crear-acceso-directo.ps1 -SinEscritorio
#
# Nota sobre el icono:
#   El icono por defecto es propio (assets/brand/proyecto.ico) para no usar
#   marcas de NASA en un repositorio publico. Si quieres otro localmente,
#   pasa -Icono con la ruta; no se sube al repo.

param(
    [string]$Icono = "",
    [switch]$SinEscritorio
)

$ErrorActionPreference = "Continue"
$raiz = Split-Path -Parent $PSScriptRoot
Set-Location $raiz

# ---------------------------------------------------------------- icono
if ($Icono -eq "") {
    $icono = Join-Path $raiz "assets\brand\proyecto.ico"
}
else {
    $icono = $Icono
}

if (-not (Test-Path $icono)) {
    Write-Host "      icono no encontrado: $icono" -ForegroundColor Yellow
    Write-Host "      se omite el cambio de icono" -ForegroundColor DarkGray
    $icono = $null
}

# ---------------------------------------------------------------- icono de carpeta
if ($icono) {
    # Ruta relativa si esta dentro del repo; absoluta si viene de fuera
    if ($icono.StartsWith($raiz)) {
        $ref = $icono.Replace($raiz + "\", "")
    }
    else {
        $ref = $icono
    }

    $ini = @"
[.ShellClassInfo]
IconResource=$ref,0
"@
    $iniPath = Join-Path $raiz "desktop.ini"

    # Windows bloquea la escritura si el archivo es de sistema / solo lectura
    if (Test-Path $iniPath) {
        attrib -r -s -h $iniPath 2>&1 | Out-Null
    }
    if ((Get-Item $raiz -Force).Attributes -band [IO.FileAttributes]::ReadOnly) {
        attrib -r $raiz 2>&1 | Out-Null
    }

    try {
        [System.IO.File]::WriteAllText($iniPath, $ini, (New-Object System.Text.UTF8Encoding($false)))
        attrib +r +s $iniPath 2>&1 | Out-Null
        attrib +r (Get-Item $raiz).FullName 2>&1 | Out-Null
        Write-Host "      icono de carpeta aplicado" -ForegroundColor Green
    }
    catch {
        Write-Host "      no se pudo aplicar el icono: $($_.Exception.Message)" -ForegroundColor Yellow
    }
}

# ---------------------------------------------------------------- acceso directo
if (-not $SinEscritorio) {
    $escritorio = [Environment]::GetFolderPath("Desktop")
    if ([string]::IsNullOrWhiteSpace($escritorio) -or -not (Test-Path $escritorio)) {
        Write-Host "      no se encontro el escritorio; se omite el acceso directo" -ForegroundColor Yellow
    }
    else {
        $lnk = Join-Path $escritorio "NASA-SPACEAPPS.lnk"
        try {
            $shell = New-Object -ComObject WScript.Shell
            $acceso = $shell.CreateShortcut($lnk)
            $acceso.TargetPath = $raiz
            $acceso.WorkingDirectory = $raiz
            $acceso.Description = "NASA Space Apps 2026 - Equipo ROCKET - Proyecto AEGIS"
            if ($icono) { $acceso.IconLocation = "$icono,0" }
            $acceso.Save()
            Write-Host ("      acceso directo creado: {0}" -f $lnk) -ForegroundColor Green
        }
        catch {
            Write-Host "      no se pudo crear el acceso directo: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "      Carpeta del proyecto: $raiz" -ForegroundColor Gray

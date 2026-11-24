# probar-sala.ps1
# Prueba end-to-end del hub de tripulacion y del catalogo.
# Uso:  .\scripts\probar-sala.ps1 [-BaseUrl http://localhost:3100]

param(
    [string]$BaseUrl = "http://localhost:3100"
)

$ErrorActionPreference = "Stop"

function Esperar-Servidor {
    param([string]$Url)

    for ($intento = 1; $intento -le 30; $intento++) {
        try {
            $respuesta = Invoke-WebRequest -Uri "$Url/api/parameters" -UseBasicParsing -TimeoutSec 2
            if ($respuesta.StatusCode -eq 200) { return }
        } catch {
            Start-Sleep -Milliseconds 500
        }
    }

    throw "FALLO: el servidor no respondio en $Url tras 15 s. Ejecuta 'pnpm build; pnpm start -p 3100'."
}

function Enviar-Frame {
    param([string]$Cuerpo)

    $archivo = Join-Path $env:TEMP "aegis-frame.json"
    $respuesta = Join-Path $env:TEMP "aegis-respuesta.json"
    [System.IO.File]::WriteAllText($archivo, $Cuerpo, [System.Text.UTF8Encoding]::new($false))

    $codigo = curl.exe -s -o $respuesta -w "%{http_code}" -X POST `
        -H "Content-Type: application/json" `
        --data-binary "@$archivo" `
        "$BaseUrl/api/telemetry"

    $detalle = if (Test-Path $respuesta) { Get-Content $respuesta -Raw } else { "" }

    Remove-Item $archivo -Force -ErrorAction SilentlyContinue
    Remove-Item $respuesta -Force -ErrorAction SilentlyContinue

    return [pscustomobject]@{ Codigo = [int]$codigo; Detalle = $detalle }
}

function Leer-Sse {
    $salida = curl.exe -sN --max-time 2 "$BaseUrl/api/telemetry"
    return ($salida | Out-String)
}

Esperar-Servidor -Url $BaseUrl
Write-Host "Servidor disponible." -ForegroundColor Green

# 1. Catalogo
$catalogo = Invoke-RestMethod -Uri "$BaseUrl/api/parameters" -TimeoutSec 10
if ($catalogo.total -ne 26) {
    throw "FALLO: /api/parameters devolvio $($catalogo.total) parametros; se esperaban 26."
}
if ($catalogo.osdr -ne 17) {
    throw "FALLO: /api/parameters devolvio $($catalogo.osdr) OSDR; se esperaban 17."
}
if ($catalogo.simulados -ne 9) {
    throw "FALLO: /api/parameters devolvio $($catalogo.simulados) simulados; se esperaban 9."
}
Write-Host "OK  catalogo: 26 parametros (17 OSDR + 9 simulados)." -ForegroundColor Green

# 2. Frame valido con alerta critica
$frameCritico = @'
{
  "timestamp": 1763000000000,
  "crewId": "C002",
  "metSegundos": 120,
  "lecturas": {
    "heart_rate": {
      "valor": 132,
      "unidad": "bpm",
      "baselinePersonal": 71,
      "desviacion": { "tipo": "delta-absoluto", "valor": 61 },
      "nivel": "CRITICO",
      "meshNodeId": "thorax_heart",
      "toolAnimationId": "anim_none",
      "calidad": 0.92,
      "razon": "«Frecuencia cardíaca» en 132 bpm está por encima del límite crítico (110 bpm).",
      "accion": "Aplicar el protocolo, confirmar la lectura y avisar al CMO.",
      "reglaDisparada": "demo:critico-max:heart_rate",
      "fuente": "docs/02-investigacion/02-indicadores-fisiologicos.md §1"
    }
  },
  "estadoNodos3D": {
    "thorax_heart": {
      "nivelMaximo": "CRITICO",
      "parametroPrincipalId": "heart_rate",
      "animacionActiva": null
    }
  }
}
'@

$resultado = Enviar-Frame -Cuerpo $frameCritico
if ($resultado.Codigo -ne 202) {
    throw "FALLO: POST de un frame valido devolvio $($resultado.Codigo); se esperaba 202. Detalle: $($resultado.Detalle)"
}

$sse = Leer-Sse
if ($sse -notmatch '"tipo":"snapshot"') {
    throw "FALLO: SSE no envio el evento snapshot."
}
if ($sse -notmatch '"crewId":"C002"') {
    throw "FALLO: el snapshot no contiene al tripulante C002."
}
if ($sse -notmatch '"nivel":"CRITICO"') {
    throw "FALLO: el snapshot no contiene la alerta CRITICO de C002."
}
Write-Host "OK  alerta C002 publicada y visible por SSE." -ForegroundColor Green

# 3. Alerta resuelta
$frameNominal = @'
{
  "timestamp": 1763000002000,
  "crewId": "C002",
  "metSegundos": 122,
  "lecturas": {
    "heart_rate": {
      "valor": 72,
      "unidad": "bpm",
      "baselinePersonal": 71,
      "desviacion": { "tipo": "delta-absoluto", "valor": 1 },
      "nivel": "NOMINAL",
      "meshNodeId": "thorax_heart",
      "toolAnimationId": "anim_none",
      "calidad": 0.96,
      "razon": "«Frecuencia cardíaca» en 72 bpm dentro del rango de referencia.",
      "accion": "Sin acción.",
      "reglaDisparada": "demo:dentro-de-rango:heart_rate",
      "fuente": "docs/02-investigacion/02-indicadores-fisiologicos.md §1"
    }
  },
  "estadoNodos3D": {}
}
'@

$resultado = Enviar-Frame -Cuerpo $frameNominal
if ($resultado.Codigo -ne 202) {
    throw "FALLO: POST del frame nominal devolvio $($resultado.Codigo); se esperaba 202. Detalle: $($resultado.Detalle)"
}

$sse = Leer-Sse
if ($sse -match '"nivel":"CRITICO"') {
    throw "FALLO: la alerta de C002 sigue activa tras publicar un valor nominal."
}
Write-Host "OK  alerta resuelta al volver a rango." -ForegroundColor Green

# 4. Frame invalido: JSON valido con forma incorrecta
$resultado = Enviar-Frame -Cuerpo '{"crewId":"C099"}'
if ($resultado.Codigo -ne 400) {
    throw "FALLO: un frame con forma invalida devolvio $($resultado.Codigo); se esperaba 400."
}
if ($resultado.Detalle -notmatch 'frame-invalido') {
    throw "FALLO: el 400 no explica que la forma es invalida: $($resultado.Detalle)"
}
Write-Host "OK  frame con forma invalida rechazado con detalle." -ForegroundColor Green

# 5. JSON malformado
$resultado = Enviar-Frame -Cuerpo '{ esto no es json'
if ($resultado.Codigo -ne 400 -or $resultado.Detalle -notmatch 'json-invalido') {
    throw "FALLO: el JSON malformado devolvio $($resultado.Codigo) / $($resultado.Detalle); se esperaba 400 json-invalido."
}
Write-Host "OK  JSON malformado rechazado con detalle." -ForegroundColor Green

Write-Host ""
Write-Host "Todas las pruebas pasaron." -ForegroundColor Green

# assets/brand/

Identidad visual del proyecto. **Sin marcas de NASA.**

---

## `proyecto.ico`

Icono propio del proyecto, generado por script.

- Cuadrado redondeado oscuro (`#0b0e13`), borde sutil, línea de pulso en azul (`#4da3ff`) y un punto verde (`#3ddc97`).
- Tamaños incluidos: 16, 24, 32, 48, 64, 128 y 256 px.
- Se usa para el icono de la carpeta del repo y el acceso directo del escritorio.

### Regenerarlo

```bash
python scripts/generar-icono.py
```

Editar los colores o la forma en ese script. No se edita el `.ico` a mano.

---

## Por qué no se usa un icono de NASA

El reto prohíbe usar logos, banderas o identificadores de misión de NASA en contenido generado, y el repositorio es público y lo revisan los jueces. Un icono con el logotipo de NASA:

1. Implica afiliación o respaldo que no existe.
2. Contradice la declaración de marca del `LICENSE`.
3. Es un riesgo gratuito por un detalle decorativo.

**El icono del proyecto es propio.** Si alguien quiere otro icono solo en su máquina, puede aplicarlo sin subirlo:

```powershell
.\scripts\crear-acceso-directo.ps1 -Icono "C:\ruta\a\mi.ico"
```

Ese `desktop.ini` está en `.gitignore`, así que no se comparte.

---

## Estado

| Archivo | Estado |
|---|---|
| `proyecto.ico` | ✅ Listo |
| Logotipo vectorial | ⬜ Pendiente (Ernesto) |
| Paleta documentada | 🟡 En `docs/03-plan/03-alcance-producto.md` y Figma |

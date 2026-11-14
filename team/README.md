# team/ — Las personas del proyecto

Una carpeta por integrante. **Cada quien es dueño de la suya y de nadie más.**

---

## Estructura

```
team/
├── README.md            ← este archivo
├── _plantilla/          ← no editar; es la base
│   ├── BIENVENIDA.md
│   ├── perfil.md
│   └── bitacora.md
├── danny1510/           Eduardo Daniel Vázquez Díaz — Team Owner
├── angel_marco/         Angel Marco Martínez Cobos
├── cxrlosmp/            Carlos De Jesús Martínez Pineda
├── giganroker/          Carlos Alberto Lázaro Aguilar
└── ernesto-montes/      Ernesto Montes García
```

---

## Qué contiene cada carpeta

| Archivo | Para qué | Quién lo edita |
|---|---|---|
| `BIENVENIDA.md` | Tu rol, tus primeras tareas y cómo se trabaja aquí. **Se lee al entrar.** | Solo lectura (lo mantiene Pineda) |
| `perfil.md` | Tus habilidades, disponibilidad y preferencias. **Se llena antes del evento.** | Solo tú |
| `bitacora.md` | Qué hiciste y qué te bloqueó, bloque por bloque. Append-only. | Solo tú |

---

## Por qué existen estas carpetas

1. **Cero conflictos.** Nadie más toca tu archivo, así que nunca hay merge conflict aquí.
2. **Identidad.** En un repo de 5 personas, saber quién hizo qué importa.
3. **Memoria.** El domingo a las 16:00, cuando haya que escribir el README o el pitch, la bitácora es la fuente de qué se logró realmente.

---

## Reglas

- ✅ Escribe en tu carpeta cuando quieras.
- ❌ No edites la carpeta de otra persona.
- ❌ No borres entradas de la bitácora. Si algo cambió, añade otra entrada.
- ❌ No pongas datos sensibles: nada de contraseñas, tokens, direcciones o datos de salud personales.

---

## Cómo empezar

```bash
git checkout -b docs/<tu-usuario>/perfil
# edita team/<tu-usuario>/perfil.md
git add team/<tu-usuario>/perfil.md
git commit -m "docs(team): completa perfil de <tu nombre>"
git push -u origin docs/<tu-usuario>/perfil
gh pr create --fill
```

Ese es tu primer PR. Bienvenido.

# MEMORY.md — Memoria operativa del proyecto

> Registro vivo del estado del proyecto. Se actualiza al final de cada sesión de trabajo.
> **Última actualización:** 2026-11-06

---

## Estado actual

| Campo | Valor |
|---|---|
| Días para el hackathon | **8** (evento: 2026-11-14) |
| Fase | Investigación y planificación (pre-evento permitida) |
| Proyecto enviado | No (0 de 1) |
| Repositorio público | Pendiente de crear |
| Equipo cerrado | Sí — 5 integrantes, cupo local lleno |
| Challenge confirmado | Sí — Health Monitoring Software |

---

## Hechos verificados

- La cuenta del equipo está registrada desde el **2026-09-08**.
- Equipo **ROCKET** (`team-rocket13`), Local Event **Tuxtla Gutiérrez**.
- El Local Event es **presencial** en **EcoCity Hotel**, Blvd. Belisario Domínguez 1380, Tuxtla Gutiérrez, Chiapas.
- Límite de equipo en el evento local: **5 personas**. Ya están las 5. No se puede sumar nadie más sin salir del evento local.
- **Envío de proyecto local: domingo 15 de noviembre, 17:00 h.** El pitch de semifinalistas empieza 17:30.
- Los **recursos oficiales del reto se publican el viernes 13 de noviembre**. Antes de eso no hay datasets oficiales del challenge.
- La FAQ oficial prohíbe trabajar en el reto antes del evento.
- El submission debe incluir **declaración de uso de SI (IA)**.
- Premios globales 2026: Best Use of Hardware · Best Use of Data · Most Inspiring · Galactic Impact · Best Mission Concept · People's Choice.

---

## Decisiones tomadas

| # | Decisión | Fecha | Motivo |
|---|---|---|---|
| D1 | Enfocar el producto en **dos modos: rutina y emergencia** | 2026-11-06 | El video del reto abre con un infarto; ahí está la diferenciación |
| D2 | **Offline-first (PWA + IndexedDB)** | 2026-11-06 | A mitad de camino a Marte no hay nube; además el venue puede fallar |
| D3 | Apuntar a **Best Use of Data** y **Galactic Impact** | 2026-11-06 | Es donde este concepto es competitivo |
| D4 | Semana previa = investigación y decisiones, **cero código de producto** | 2026-11-06 | Cumplimiento de reglas de Space Apps |
| D5 | Línea base **personal**, no rangos poblacionales | 2026-11-06 | Más honesto fisiológicamente en microgravedad |
| D6 | **Orca no es multiusuario.** El punto de unión es GitHub | 2026-11-06 | Verificado en Orca v1.4.243: no existe proyecto compartido ni edición concurrente |
| D7 | Cada integrante trabaja en **su máquina** con **su harness** | 2026-11-06 | Menos acoplamiento, menos puntos de fallo |
| D8 | Un archivo, un dueño. Append-only en compartidos | 2026-11-06 | Evita el 90 % de los conflictos de merge |
| D9 | Tablero en **GitHub Projects**, no en Trello/Notion | 2026-11-06 | Ya está donde vive el código; cero logins extra |

---

## Pendientes abiertos

- [ ] Crear el repositorio público y la licencia (MIT o Apache-2.0).
- [ ] Invitar a los 5 integrantes al repo con permiso de escritura.
- [ ] Reemplazar los `<github-user>` en `.github/CODEOWNERS`.
- [ ] Crear el tablero de GitHub Projects con las 5 columnas y las etiquetas.
- [ ] Probar el onboarding con una persona real (8 de noviembre).
- [ ] Completar el formulario de registro secundario del Local Event: https://forms.gle/JxKT5ivbd28cUN6j6
- [ ] Asignar roles definitivos a los 5 integrantes (`docs/04-equipo/02-roles-asignacion.md`).
- [ ] Confirmar si el venue tiene internet estable y cuántos contactos eléctricos hay.
- [ ] Validar umbrales clínicos con fuente primaria (`[POR VALIDAR]` en `docs/02-investigacion/02-indicadores-fisiologicos.md`).
- [ ] Explorar OSDR y documentar 3 datasets concretos utilizables.
- [ ] Revisar recursos oficiales el 13 de noviembre y ajustar el plan de datos.

---

## Riesgos activos (resumen)

1. El envío local es 6 h 59 min antes de lo que dice la FAQ global → el plan de 48 h está mal calibrado si no se corrige. **Ya corregido en `docs/03-plan/02-plan-30h-hackathon.md`.**
2. Recursos del reto salen 1 día antes → dependencia fuerte de OSDR/LSDA como plan B.
3. Equipo de 5 sin especialista médico → hay que mitigar con fuentes y con un "revisor de sanidad" interno.

---

## Bitácora

### 2026-11-06 — Sesión de arranque- Investigación del reto, HRP, 5 hazards, reglas del evento, premios y datasets disponibles.
- Se identificó el Local Event, el equipo, el límite de 5 y **el horario real de entrega (17:00)**.
- Se creó el navegador aislado `nasa-spaceapps-2026` con el perfil `charcraftycarlos@gmail.com`.
- Se generó la estructura documental completa (ver `docs/00-INDEX.md`).
- No se escribió código de producto (cumplimiento).

### 2026-11-06 — Infraestructura de trabajo colaborativo
- Se verificó en Orca v1.4.243 que **no existe colaboración multiusuario**: un host, un checkout, agentes locales. `orca serve` + pairing code permite conectarse a *una* máquina, no trabajar cinco personas a la vez.
- Se definió la arquitectura de 3 capas: GitHub (verdad) → Orca (ejecución local) → harness de cada quien.
- Se creó `team/` con carpeta por integrante (perfil + bitácora) para evitar conflictos.
- Se crearon plantillas de issue y PR, CODEOWNERS, adaptadores de harness (`CLAUDE.md`, `.cursor/rules`, copilot instructions).
- Se crearon 3 scripts: `setup-integrante.ps1`, `nuevo-worktree.ps1`, `verificar-docs.ps1`.
- Se inicializó el repositorio git local en `main` y `.gitignore` (excluye `Uso de IA-Personal/`).
- Se definió el plan adaptativo F0–F4 hasta el 13 de noviembre.

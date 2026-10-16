# Modelo de datos 002 — Rediseño visual "Brote"

**No cambia nada de lo guardado** (RNF-1, principio V).

## Sesión (sin cambios)

localStorage, clave `diario-estudio-sesiones`: lista de `{ id, fecha: "AAAA-MM-DD", tema, minutos }`.
Se lee y se guarda igual que hoy (`cargarSesiones()` y `guardarSesiones()` en `app.js`).

## Inicial de la insignia (calculada, no se guarda)

| Dato | De dónde sale | Regla |
|------|---------------|-------|
| `inicial` | `inicialDelTema(sesion.tema)` en `logica.js` | Primer grafema del tema sin espacios iniciales, en mayúscula; `""` si no hay (CA-8.5, CA-8.6). Ver `contracts/inicial-del-tema.md`. |

- Se calcula cada vez que se pinta la lista (`mostrarLista()` en `app.js`).
- Si `inicial === ""`, la sesión se pinta sin insignia.
- Un `tema` que no sea texto (datos corruptos) da `""`: no rompe la insignia. (Los demás
  errores con datos corruptos siguen fuera de alcance, spec §8.)

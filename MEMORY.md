# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1: registrar sesiones, racha actual, lista y fila Mejor racha / Esta semana / Este mes.
- Mapa de calor (spec 001) cerrado: `logica.js` (funciones puras, "hoy" como parámetro, scripts
clásicos), `tests.html` (140 de 140 OK; pruebas nuevas antes de `mostrarResultados()`), `app.js` pinta.
- Rediseño "Brote" (spec 002, `specs/002-sprout-redesign/`): T001-T019 hechas y §9 marcada
(2026-10-16). Verde salvia, tarjetas blancas, racha en tarjeta verde bosque con aparición suave,
dos columnas desde 1024 px, insignia con `inicialDelTema`. Bricolage Grotesque + Figtree. Iconos
`icono-brote.svg` y `brote-racha.svg`. Colores en `:root`. PENDIENTE: validación final del reviewer
y aprobación del usuario. Maquetas: https://claude.ai/artifact/ASECBHQh4dta4rmvLmTuVr (C · Brote).
- Pendientes (tareas aparte, preguntar antes):
  - Pasar racha, semana y mes a funciones puras (principios III y IV); hoy usan `sesiones` y `new Date()`.
  - Con lo guardado corrupto racha/semana/mes/lista dan errores de consola; el mapa sí se dibuja.
  - Con zoom 200 % en 360 px (180 px CSS) la píldora "1000000 min" saca scroll horizontal; a
  320 px CSS no (fuera de los escenarios de la spec 002).
- SDD con GitHub Spec Kit (CLI 1.2.1, scripts sh): `.specify/`, skills `.claude/skills/speckit-*`,
constitución `.specify/memory/constitution.md` v1.0.0. Agentes en `.claude/agents/` (`coordinator`,
`planner`, `implementer`, `reviewer`). Dos aprobaciones del usuario (spec; plan+tareas).

## Decisiones (y por qué)
- Manda Spec Kit: `docs/constitution.md` y la skill `sdd` quedan solo como referencia.
- Fecha editable con máximo hoy; una sesión futura no suma. Minutos solo enteros > 0.
- Mejor racha calculada, no guardada; oculta si es 0 (un récord de 0 no motiva). Semana y mes se
muestran aunque sean 0. Mes = mes natural. Minutos: "45 min" / "1 h 45 min" / "2 h".
- Google Fonts permitido (`<link>`, funciona con `file://`). Sin emojis en la interfaz propia; lo
que escribe el usuario (p. ej. la inicial de la insignia) se muestra tal cual (spec 002).
- Colores del mapa recalculados (research R-3) para cumplir 1,4:1 entre niveles; nivel 4 = bosque.
- Carpetas `001-heat-map` y `002-sprout-redesign` en inglés por decisión del usuario.
- Principio IV: criterios [manual] (visuales) sin prueba en `tests.html` (`file://` no carga
`index.html`); se verifican a mano. Excepción aceptada por el usuario (spec 001 y 002).

## Aprendizajes y errores a evitar
- Cifras: forzar `font-variant-numeric: lining-nums` (algunas fuentes usan cifras antiguas).
- A 360 px el mapa mide 308 px fijos: relleno lateral total ≤ 26 px por lado (hoy 12 + 14).
- Cifras: a 1.5rem "12 h 30 min" no cabe en fila de tres hasta ~590 px; entre 481 y 600 px van a
1.05rem. Valores con `nowrap`.
- Una regla con `display` anula el atributo `hidden`: añadir `.x[hidden] { display: none; }`.
- No usar `node --test`: pruebas solo en `tests.html`. Para verificar la interfaz: sembrar sesiones
relativas a hoy en `localStorage` (contexto aislado) y comparar el DOM con la versión anterior.
- En `mostrarTodo()`, `mostrarMapa()` va primero: el mapa se dibuja aunque otro panel falle.
- Escribir con escapes (`́`) los caracteres combinados en specs y pruebas: el editor los fusiona.
- `.mapa` lleva 5 px de relleno (y margen -5 px) para que no se recorte el anillo de foco.
- `input type=date` en Chrome: el Tab pasa al botón del calendario y el campo pierde
`:focus-visible`; por eso el anillo usa también `input[type="date"]:focus-within` (CA-7.3).
- Con `minutos` 0 salta antes la validación nativa (`min="1"`) que el mensaje rojo propio.
- Playwright global (`/opt/pw-browsers/chromium`) con scripts en el scratchpad, nunca en el repo.

## Próximos pasos
- Reviewer: validar la implementación de la spec 002; después, aprobación del usuario y PR.

# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1: registrar sesiones, racha actual, lista y fila Mejor racha / Esta semana / Este mes.
- Diseño actual (hasta aplicar la spec 002): "cuaderno de cuadros" (cuadrícula, margen rojo, tinta
azul, fosforito animado una vez), Literata + Atkinson Hyperlegible. Colores en `:root`.
- Mapa de calor (spec 001) cerrado: `logica.js` (funciones puras, "hoy" como parámetro, scripts
clásicos), `tests.html` (133 de 133 OK; pruebas nuevas antes de `mostrarResultados()`), `app.js` pinta.
- Pendientes (tareas aparte, preguntar antes):
  - Pasar racha, semana y mes a funciones puras (principios III y IV); hoy usan `sesiones` y `new Date()`.
  - Con lo guardado corrupto racha/semana/mes/lista dan errores de consola; el mapa sí se dibuja.
- SDD con GitHub Spec Kit (CLI 1.2.1, scripts sh): `.specify/`, skills `.claude/skills/speckit-*`,
constitución `.specify/memory/constitution.md` v1.0.0. Agentes en `.claude/agents/` (`coordinator`,
`planner`, `implementer`, `reviewer`). Dos aprobaciones del usuario (spec; plan+tareas). Los commits
los hace el usuario.

## Decisiones (y por qué)
- Manda Spec Kit: `docs/constitution.md` y la skill `sdd` quedan solo como referencia.
- Fecha editable con máximo hoy; una sesión futura no suma. Minutos solo enteros > 0.
- Mejor racha calculada, no guardada; oculta si es 0 (un récord de 0 no motiva). Semana y mes se
muestran aunque sean 0. Mes = mes natural. Minutos: "45 min" / "1 h 45 min" / "2 h".
- Google Fonts permitido (`<link>`, funciona con `file://`). Sin emojis en la interfaz propia; lo
que escribe el usuario (p. ej. la inicial de la insignia) se muestra tal cual (spec 002).
- Carpetas `001-heat-map` y `002-sprout-redesign` en inglés por decisión del usuario.
- Principio IV: criterios [manual] (visuales) sin prueba en `tests.html` (`file://` no carga
`index.html`); se verifican a mano. Excepción aceptada por el usuario (spec 001 y 002).

## Aprendizajes y errores a evitar
- Cifras: forzar `font-variant-numeric: lining-nums` (Georgia usa cifras antiguas).
- En móvil "3 h 10 min" se partía: valores con `nowrap` y letra menor.
- A 360 px el mapa mide 308 px fijos: relleno lateral total ≤ 26 px por lado.
- Una regla con `display` anula el atributo `hidden`: añadir `.x[hidden] { display: none; }`.
- No usar `node --test`: pruebas solo en `tests.html`. Para refactors sin tests: sembrar sesiones
relativas a hoy en `localStorage` (contexto aislado) y comparar el DOM.
- En `mostrarTodo()`, `mostrarMapa()` va primero: el mapa se dibuja aunque otro panel falle.
- Escribir con escapes (`\u0301`) los caracteres combinados en specs y pruebas: el editor los fusiona.
- Capturas: `google-chrome --headless=new --virtual-time-budget=3000 --screenshot=...`.
- `.mapa` lleva 5 px de relleno (y margen -5 px): el anillo de foco (3 px + 2 px de separación)
se recortaría en los días del borde, porque `.mapa` tiene `overflow-x: auto`.
- El botón del calendario de `input type=date` recibe un Tab sin `:focus-visible` en el campo
(comportamiento nativo de Chrome, ya pasaba antes del rediseño).

## Próximos pasos
- Rediseño Brote (spec 002, `specs/002-sprout-redesign/`): spec APROBADA (GATE 1, 2026-10-16) con
Clarificaciones; plan, research, data-model, contracts, quickstart y tasks (T001–T019) listos.
`/speckit-analyze` hecho y sus correcciones aplicadas (2026-10-16). GATE 2 aprobado (2026-10-16);
hechas T001-T008 (HTML en tarjetas, base de `styles.css`, mapa, formulario, tarjeta de la
racha y aparición suave). Faltan: columnas y cifras en fila (T009-T010), móvil (T011-T012: hoy a
360 px el número mide 72 px y el mapa tiene scroll), insignia (T013-T016) y cierre (T017-T019). Maquetas: https://claude.ai/artifact/ASECBHQh4dta4rmvLmTuVr (C · Brote).

# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1: registrar sesiones, racha actual, lista y fila Mejor racha / Esta semana / Este mes.
- Diseño "cuaderno de cuadros": fondo cuadriculado, margen rojo, tinta azul; Literata (títulos y
cifras) y Atkinson Hyperlegible (texto). Solo la racha es llamativa (fosforito animado una vez,
sin animación con `prefers-reduced-motion`). Colores en `:root`.
- Mapa de calor "Últimas 12 semanas" (spec 001) IMPLEMENTADO y cerrado (T1–T28): `logica.js` (funciones
puras con "hoy" como parámetro, scripts clásicos), `tests.html` (133 de 133 OK), `app.js` pinta
(`mostrarMapa()`, eventos delegados de ratón/clic/teclado), `styles.css`. Spec §8 marcada. README al día.
- Las pruebas se añaden en el `<script>` de `tests.html`, antes de `mostrarResultados()`.
- Pendientes (tareas aparte, preguntar antes):
  - Pasar racha, semana y mes a funciones puras (principios 3 y 4); hoy usan `sesiones` global y `new Date()`.
  - Con lo guardado corrupto (`{}`, `"texto"`, elementos rotos) racha/semana/mes/lista dan errores de consola
    (`sesiones.map is not a function`); el mapa sí se dibuja. Spec §7 lo acepta.
  - CA-7.1, 7.2 y 9.3 sin prueba automática (`tests.html` por `file://` no carga `index.html`); verificados a mano.
- Cambios de T28 sin commit: spec (estado y §8), `AGENTS.md` (Verificación) y este archivo.

## Decisiones (y por qué)
- Fecha editable con máximo hoy: permite apuntar días pasados; una sesión futura no suma.
- Minutos solo enteros > 0. Tras guardar, el formulario se vacía y la fecha vuelve a hoy.
- Mejor racha calculada, no guardada; oculta si es 0 (un récord de 0 no motiva). Sin
mensaje de récord ni fechas del tramo: el usuario no los quiso.
- Semana y mes se muestran aunque sean 0: son datos del periodo, no récords. Mes = mes
natural, sin "X de N días". Minutos: "45 min" / "1 h 45 min" / "2 h".
- Google Fonts permitido por el usuario: es un `<link>`, funciona con `file://` y sin
conexión usa las fuentes del sistema. Sin emojis en la interfaz (petición del usuario).
- Spec 001: la carpeta `001-heat-map` se queda en inglés por decisión del usuario (no
renombrar). Criterios marcados [auto], [manual] o [auto + manual] (este último, porque
`tests.html` con `file://` no puede cargar `index.html`).

## Aprendizajes y errores a evitar
- Cifras en serif: forzar `font-variant-numeric: lining-nums` (Georgia usa cifras antiguas).
- Si cambia la fuente, revisar los % del degradado de `.fosforito`.
- En móvil, "3 h 10 min" se partía: `.racha-datos dd` lleva `nowrap` y letra menor.
- En móvil (360 px) el contenido útil mide 310 px; el mapa ocupa 308.
- No usar `node --test` (prohibido en `AGENTS.md`): pruebas solo en `tests.html`. Para refactors sin
tests: sembrar sesiones relativas a hoy en `localStorage` (contexto aislado) y comparar el DOM.
- En `mostrarTodo()`, `mostrarMapa()` va primero: así el mapa se dibuja aunque otro panel falle.
- A 180 px (zoom 200 %) la fecha de la lista desbordaba: `.sesion-fecha { overflow-wrap: anywhere }`.
- Capturas: `google-chrome --headless=new --virtual-time-budget=3000 --screenshot=...`
(sin el time-budget la animación no se ve).

## Próximos pasos
- Elegir la siguiente tarea con el usuario (p. ej. racha/semana/mes como funciones puras).

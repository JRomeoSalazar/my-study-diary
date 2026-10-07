# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: registrar sesiones, racha actual y lista. Bajo la racha, fila con Mejor
racha / Esta semana / Este mes (JS solo escribe la cifra).
- Diseño "cuaderno de cuadros": fondo cuadriculado, margen rojo, tinta azul; Literata
(títulos y cifras) y Atkinson Hyperlegible (texto). La racha es lo único llamativo
(fosforito animado una vez, sin animación con `prefers-reduced-motion`). Colores en `:root`.
- El código aún no cumple los principios 3 y 4 de la constitución: las `calcular*` usan
`sesiones` global y `new Date()`, y no existe `tests.html`.
- Mapa de calor: spec y plan APROBADOS en `specs/001-heat-map/`, sin código todavía.
`tasks.md` creado (28 tareas, T1–T28, con RF y "Hecho cuando:"); seguir ese orden.
- T1 hecha: existe `logica.js` (script clásico cargado antes de `app.js`) con `fechaATexto`,
`textoAFecha`, `diaAnterior`, `inicioDeSemana` y `formatearMinutos`, movidas sin cambios.
`hoyTexto()` sigue en `app.js`. Racha, semana, mes y lista dan lo mismo que antes.
- T2 hecha: `tests.html` con `prueba(nombre, función)` e `igual(obtenido, esperado)`, resumen
"X de Y pruebas superadas" y 21 pruebas de las 5 funciones movidas (todas OK). Las pruebas
nuevas se añaden en el `<script>` de `tests.html`, antes de `mostrarResultados()`.
- T3 hecha: `logica.js` tiene `SEMANAS_MAPA`, `DIAS_CORTOS`, `MESES_CORTOS`, `TRAMOS_LEYENDA` y
`TEXTO_DETALLE_INICIAL` (valores de plan §2.2), con 5 pruebas en `tests.html` (26 de 26 OK). Siguiente: T4.
- T4 hecha: `esFechaValida` en `logica.js` (formato exacto + día real) con 5 pruebas; `tests.html`
31 de 31 OK. Siguiente: T5.
- T5 hecha: `esSesionValida` y `comoLista` en `logica.js` con 9 pruebas; `tests.html` 40 de 40 OK.
Siguiente: T6.
- T6 hecha: `sumarDias` y `lunesDeLaSemana` en `logica.js` con 9 pruebas; `tests.html` 49 de 49 OK
(también con TZ=Europe/Madrid). Siguiente: T7.
- T7 hecha: `calcularMinutosPorDia` en `logica.js` con 7 pruebas; `tests.html` 56 de 56 OK. Siguiente: T8.
- T8 hecha: `calcularNivel` en `logica.js` con 5 pruebas; `tests.html` 61 de 61 OK. Siguiente: T9.
- T9 hecha: `formatearFechaCorta` y `textoDetalle` en `logica.js` con 6 pruebas; `tests.html` 67 de 67 OK.
Siguiente: T10.
- T10 hecha: `calcularEtiquetasMes` en `logica.js` con 7 pruebas; `tests.html` 74 de 74 OK. Las semanas
son columnas = listas de días `{ fecha }` sin huecos (los huecos son días que no existen).
Siguiente: T11.
- T11 hecha: `calcularMapa(sesiones, hoy)` en `logica.js` → `{ semanas, etiquetasMes }` con 11 pruebas;
`tests.html` 85 de 85 OK. Aún no se usa desde `app.js`/`index.html`. Siguiente: T12.
- T12 hecha: solo pruebas (12) del modelo: periodo, huecos y fechas especiales con 10 "hoy" de referencia;
`tests.html` 97 de 97 OK en 4 zonas horarias; `logica.js` sin cambios. Siguiente: T13.
- T13 hecha: solo pruebas (10) del modelo: datos, niveles, texto y rendimiento (5 000 sesiones ≈ 5-7 ms);
`tests.html` 107 de 107 OK; `logica.js` sin cambios. Siguiente: T14.
- T14 hecha: `posicionDeFecha`, `textoLineaDetalle` y `fechaConParadaTab` en `logica.js` con 12 pruebas;
`tests.html` 119 de 119 OK. Las funciones reciben el mapa de `calcularMapa`. Siguiente: T15.
- T15 hecha: `moverPosicion` en `logica.js` con 11 pruebas; `tests.html` 130 de 130 OK. Cuando no hay
movimiento devuelve la misma posición recibida. Siguiente: T16 (empieza la interfaz).
- T16 hecha: `index.html` tiene la sección "Últimas 12 semanas" (`#mapa-titulo`, `#mapa`, `#mapa-detalle`,
`#mapa-leyenda`) entre la racha y "Registrar sesión", todavía vacía (solo el título se ve). Siguiente: T17.
- T17 hecha: `app.js` tiene `mostrarMapa()` (llamado desde `mostrarTodo()`): fila de meses, 7 filas con
`rowheader`, celdas `.dia.nivel-N` y `.hueco`, un solo `tabindex=0`. Sin estilos ni eventos aún: hasta
T19 el mapa se ve como texto apilado (lun…dom). Verificado con un guion de Playwright (19 comprobaciones,
`page.clock` para fijar "hoy"). Siguiente: T18.
- T18 hecha: `mostrarLeyenda()` en `app.js` (llamada desde `mostrarMapa()`): "Menos", 5 `span.leyenda-cuadro.nivel-N`
con `role=img`, `title` y `aria-label`, y "Más". Sin estilos aún. Verificado con guion de Playwright
(11 comprobaciones + árbol de accesibilidad). Siguiente: T19.
- T19 hecha: estilos del mapa en `styles.css` (escritorio): `--nivel-0…4`, `--tam-dia` 26px, `--ancho-etiqueta`
28px, rejilla por fila, huecos sin fondo, leyenda. Guion de Playwright (18 comprobaciones a 1280px).
Siguiente: T20.
- T20 hecha: móvil (`--tam-dia` 20px, etiquetas 0.7rem), `#mapa` con `overflow-x:auto` (relleno 3px y margen -3px
para no recortar el foco), `.dia.seleccionado` (contorno 2px grafito) y `.dia:focus-visible` (3px fosforito).
Guion de Playwright: 19 comprobaciones (360px, zoom 200% = 180px, foco con Tab). A 360px caben 308px de 310.
Pendiente aparte (no es del mapa): a 180px (zoom 200%) la lista de sesiones desborda la página. Siguiente: T21.
- T21 hecha: contraste medido con --papel (WCAG): nivel 0 = 1,63:1 (mín. 1,5) y nivel 4 = 9,86:1 (mín. 3), sin
cambios. Solo se oscureció `--nivel-1` (#a8bbe8 → #93abe3): entre el 0 y el 1 había 1,15:1; ahora todos los
pasos contiguos son ≥ 1,37:1. Guion t21 (5 comprobaciones). Siguiente: T22 (eventos de ratón).
- T22 hecha: `app.js` tiene `diaApuntado`, `mostrarLineaDetalle()`, `fechaDeCelda()` y dos escuchadores delegados en
`#mapa` (`mouseover` sobre `.dia`, `mouseleave`), añadidos una sola vez. Guion t22 (12 comprobaciones con ratón
real). Aún sin clic ni teclado: `diaSeleccionado` sigue siempre en null. Siguiente: T23.
- T23 hecha: `app.js` tiene los escuchadores `click` (da el foco al día) y `focusin` (selecciona: clase
`seleccionado`, `aria-selected`, único `tabindex=0`, actualiza la línea), delegados y añadidos una sola vez.
Guion t23 (19 comprobaciones con clics y Tab reales). Falta el teclado con flechas. Siguiente: T24.
- T24 hecha: `keydown` delegado en `#mapa` (`app.js`): las 4 flechas llaman a `moverPosicion` y dan el foco a la
nueva celda (el `focusin` la selecciona). `preventDefault()` en TODAS las flechas (también en bordes y huecos) para
que la página no se desplace; se ignoran con Alt/Ctrl/Meta. Guion t24 (24 comprobaciones con teclas reales).
Fase 3 (interfaz) completa. Siguiente: T25 (verificación manual) y cierre; `README.md` pendiente.
- T25 hecha (verificación con Playwright, no DevTools; guion t25: 32 comprobaciones, pasos 1-5 y 8 del plan §7.2).
BUG encontrado y corregido: con la clave en `{}`, `"texto"`, `42` o con una lista con elementos rotos, los paneles
antiguos (racha, semana, mes, lista) lanzaban una excepción en `mostrarTodo()` ANTES de `mostrarMapa()` y el mapa no
se dibujaba (CA-8.3). Arreglo mínimo: `mostrarMapa()` va el primero en `mostrarTodo()`. SIGUE PENDIENTE (spec §7 lo
acepta, pero el plan §7.2 paso 8 pide "sin errores"): con esos datos los paneles antiguos aún dan errores de consola
(`sesiones.map is not a function`); arreglarlo exigiría validar racha/semana/mes/lista (tarea aparte, preguntar).
Siguiente: T26.
- T26 hecha (Playwright; guion t26: 20 comprobaciones): 360x740, 740x360, 360x360, zoom 200% (180px) y 1280px; RNF-8
(5 000 sesiones: `mostrarMapa()` 6-11 ms; `mostrarTodo()` entero 600 ms por la lista); R-5 idéntico al código original
(commit 2f748c3) en 6 conjuntos de datos. Arreglo: `.sesion-fecha { overflow-wrap: anywhere }` (a 180px la lista
desbordaba la página 5px). Siguiente: T27 (pruebas completas + README) y T28.
- T27 hecha: `tests.html` 133 de 133 en verde (4 zonas horarias), sin errores de consola. Auditoría de cobertura:
30 de 34 criterios [auto]/[auto + manual] con prueba; se añadió CA-1.4 (3 pruebas; detecta un lunesDeLaSemana en UTC con
TZ=America/Los_Angeles). CA-7.1, 7.2 y 9.3 no tienen prueba automática (plan §7.3: `tests.html` por `file://` no carga
`index.html`); se verificaron a mano en T25. `README.md` actualizado: mapa, leyenda, detalle, ratón/clic/teclado,
pruebas y estructura. Pendiente de T28: spec §8, `AGENTS.md` (dice "no hay tests automáticos") y revisar etiquetas §7.3.

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
- En móvil (360 px) el contenido útil mide 310 px; el mapa planificado ocupa 308.
- No usar `node --test` (prohibido en `AGENTS.md`; las pruebas irán en `tests.html`). Para
refactors sin tests aún: sembrar sesiones relativas a hoy en `localStorage` (contexto
aislado), recargar y comparar las cifras del DOM antes y después.
- Capturas: `google-chrome --headless=new --virtual-time-budget=3000 --screenshot=...`
(sin el time-budget la animación no se ve).

## Próximos pasos
- Implementar el mapa siguiendo `specs/001-heat-map/tasks.md` (siguiente: T3,
constantes de texto). Con `tests.html`, actualizar "Verificación" en `AGENTS.md`.
- Después, en otra tarea: pasar racha, semana y mes a funciones puras (principio 3).

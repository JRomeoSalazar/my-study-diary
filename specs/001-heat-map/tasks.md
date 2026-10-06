# Tareas 001 — Mapa de calor de días estudiados

Spec: `specs/001-heat-map/spec.md` · Plan: `specs/001-heat-map/plan.md`

Cada tarea dura como máximo 20-30 min y se hace en este orden (cada una depende de las
anteriores). Una tarea no se marca hasta que se cumple su línea "Hecho cuando:".

Reglas que valen para todas las tareas:
- Antes de dar por buena una tarea de `logica.js`, abrir `tests.html` y comprobar que todas
  las pruebas pasan. Las pruebas se escriben en la misma tarea que la función (principio 4).
- Tras cada tarea que toque `index.html`, `app.js` o `styles.css`, abrir `index.html` con el
  MCP de Chrome DevTools en un contexto aislado (`isolatedContext`) y comprobar que la
  consola no muestra errores de la aplicación (se ignora "Unsafe attempt to load URL file://").
- No se usa `toISOString()`, `new Date("AAAA-MM-DD")` ni sumas de milisegundos; las funciones
  de `logica.js` no llaman a `new Date()` sin argumentos ni tocan el DOM o `localStorage`.
- Todos los textos, nombres y comentarios van en español.

---

## Fase 1 — Base: `logica.js` y `tests.html`

- [x] **T1. Crear `logica.js` con las 5 funciones movidas** (~20 min)
  Mover sin cambios `fechaATexto`, `textoAFecha`, `diaAnterior`, `inicioDeSemana` y
  `formatearMinutos` de `app.js` a `logica.js` (D-2). Cargar `logica.js` antes de `app.js` en
  `index.html`, como script clásico. `hoyTexto()` se queda en `app.js`.
  **Cubre:** base de RF-1 y RF-5 (CA-5.3) · RNF-1, RNF-2.
  **Hecho cuando:** `app.js` ya no define esas 5 funciones, `index.html` carga `logica.js`
  antes de `app.js` sin `type="module"`, y al abrir `index.html` la racha, la mejor racha,
  la semana, el mes y la lista muestran los mismos valores que antes (R-5) y la consola
  está limpia.

- [x] **T2. Crear `tests.html` con el comprobador y las pruebas de lo movido** (~25 min)
  Página con `prueba(nombre, función)` e `igual(obtenido, esperado)` (compara con
  `JSON.stringify`), resumen "X de Y pruebas superadas" en verde o rojo, lista de pruebas con
  "OK"/"FALLO" (con obtenido y esperado, y `console.error`). Añadir las pruebas de
  `formatearMinutos` (0, 45, 60, 105, 120, 1 000 000), `fechaATexto`/`textoAFecha`,
  `diaAnterior` e `inicioDeSemana`.
  **Cubre:** CA-5.3 · RNF-6.
  **Hecho cuando:** abriendo `tests.html` con doble clic se ve "N de N pruebas superadas" en
  verde; cambiar a mano un valor esperado hace que salga en rojo con el fallo detallado
  (se deshace después).

## Fase 2 — Lógica pura (cada función con sus pruebas)

- [x] **T3. Constantes de texto** (~15 min)
  Añadir a `logica.js`: `SEMANAS_MAPA`, `DIAS_CORTOS`, `MESES_CORTOS`, `TRAMOS_LEYENDA` y
  `TEXTO_DETALLE_INICIAL`, con los valores exactos de plan §2.2. Pruebas de igualdad con
  los textos de la spec.
  **Cubre:** RF-6 (CA-6.2, CA-6.6, CA-6.7, CA-6.8) · RF-5 (CA-5.2, CA-5.4).
  **Hecho cuando:** `tests.html` incluye pruebas "CA-6.2", "CA-6.6/6.7", "CA-6.8" y "CA-5.4"
  que comparan cada constante con el texto de la spec, y todas pasan.

- [x] **T4. `esFechaValida`** (~20 min)
  Texto con formato exacto `AAAA-MM-DD` y día existente (se construye con
  `new Date(año, mes - 1, día)` y se comparan año, mes y día).
  **Cubre:** RF-2 (definición, punto 2) · RF-8 (CA-8.2).
  **Hecho cuando:** pasan las pruebas: "2026-08-03" → `true`; "2026-8-3",
  "2026-08-03T10:00", `20260803`, `""`, `undefined`, `null` y "2026-02-30" → `false`;
  "2028-02-29" → `true` y "2027-02-29" → `false`.

- [x] **T5. `esSesionValida` y `comoLista`** (~20 min)
  `esSesionValida`: objeto no nulo, `fecha` válida y `minutos` de tipo número, entero y > 0.
  `comoLista`: devuelve el valor si es lista, y `[]` si no.
  **Cubre:** RF-2 (definición) · RF-8 (CA-8.2, CA-8.3).
  **Hecho cuando:** pasan las pruebas: `null`, números, `minutos` "45", 0, −5, 1,5, `NaN`,
  `minutos` ausente y claves en inglés (`date`/`minutes`) → no válida; sesión sin `tema` o
  con `id` repetido → válida; `comoLista` con `null`, `{}`, "texto" y 42 → `[]`.

- [x] **T6. `sumarDias` y `lunesDeLaSemana`** (~25 min)
  `sumarDias(texto, n)` con `new Date(año, mes - 1, día + n)` (n negativo permitido).
  `lunesDeLaSemana(texto)` devuelve el lunes de su semana como texto (apóyate en
  `inicioDeSemana`).
  **Cubre:** RF-1 (CA-1.3, CA-1.4, CA-1.5).
  **Hecho cuando:** pasan las pruebas: `lunesDeLaSemana("2026-10-05")` → "2026-10-05" (y no el
  domingo anterior); `lunesDeLaSemana("2026-10-04")` → "2026-09-28"; `sumarDias` cruza mes,
  año y 29-02-2028; sumar 1 día a "2026-03-28" y a "2026-10-24" (alrededor del cambio de
  hora) da el día siguiente, sin saltar ni repetir.

- [x] **T7. `calcularMinutosPorDia`** (~20 min)
  Devuelve `{ "AAAA-MM-DD": minutos }` con solo las sesiones válidas dentro del rango
  (ambos extremos incluidos). Sin modificar la lista de entrada.
  **Cubre:** RF-2 (CA-2.1, CA-2.3) · RF-8 (CA-8.2, CA-8.4).
  **Hecho cuando:** pasan las pruebas: 20 + 15 + 10 el mismo día → 45; dos sesiones idénticas
  → se suman las dos; una válida (30) y una no válida el mismo día → 30; una sesión del
  domingo anterior al primer lunes y otra posterior a "hasta" no aparecen; la lista de
  entrada es igual antes y después.

- [x] **T8. `calcularNivel`** (~10 min)
  **Cubre:** RF-3 (CA-3.1).
  **Hecho cuando:** pasan las pruebas 0 → 0; 1 → 1; 29 → 1; 30 → 2; 59 → 2; 60 → 3; 119 → 3;
  120 → 4; 900 → 4; 1 000 000 → 4.

- [x] **T9. `formatearFechaCorta` y `textoDetalle`** (~20 min)
  Fecha corta "lun 3 ago 2026" con `DIAS_CORTOS` y `MESES_CORTOS` (sin `toLocaleDateString`);
  `textoDetalle(fecha, minutos)` = fecha corta + ": " + `formatearMinutos`.
  **Cubre:** RF-5 (CA-5.1, CA-5.2) · RF-9 (CA-9.4).
  **Hecho cuando:** pasan las pruebas: `textoDetalle("2026-08-03", 75)` → "lun 3 ago 2026:
  1 h 15 min"; un ejemplo por cada día de la semana (incluido "mié") y por cada mes
  (incluido "sep"); "2026-01-05" → "lun 5 ene 2026" (sin cero inicial); 0 min → "…: 0 min".

- [x] **T10. `calcularEtiquetasMes`** (~25 min)
  Recibe las semanas del mapa (columnas con días o huecos) y devuelve 12 textos. Etiqueta de
  CA-6.3 (día 1 entre los días no hueco) y regla de CA-6.4 para la primera columna. Las
  pruebas construyen las semanas a mano con una función auxiliar de `tests.html`, ya que
  `calcularMapa` aún no existe.
  **Cubre:** RF-6 (CA-6.3, CA-6.4).
  **Hecho cuando:** pasan las pruebas con hoy `2026-10-04` (columnas 0 "jul", 2 "ago", 7 "sep",
  11 "oct"; el resto vacías), `2026-09-30` (columna 11 sin "oct"), `2026-06-01` (columna 11
  "jun"), `2027-01-01` (columna 11 "ene"), `2027-03-10` (columna 0 vacía, columna 1 "ene") y
  `2027-02-25` (columna 0 "dic").

- [x] **T11. `calcularMapa`** (~25 min)
  Modelo `{ semanas, etiquetasMes }` según plan §3.1: 12 columnas × 7 filas, hueco = sin
  elemento para días posteriores a hoy, cada día con `{ fecha, minutos, nivel, texto }`.
  **Cubre:** RF-1 (CA-1.1, CA-1.2, CA-1.3, CA-1.5) · RF-2 (CA-2.2) · RF-3 · RF-4 (CA-4.1) ·
  RF-8 (CA-8.1, CA-8.3).
  **Hecho cuando:** `calcularMapa([], "2026-10-04")` devuelve 12 columnas, el primer día es
  "2026-07-13", el último dibujado es "2026-10-04" y todos tienen nivel 0 y "0 min";
  `calcularMapa(null | {} | "texto" | 42, hoy)` da lo mismo que con `[]`; con hoy
  "2026-10-05" el primer día es "2026-07-20".

- [x] **T12. Pruebas del modelo: periodo, huecos y fechas especiales** (~25 min)
  Solo pruebas en `tests.html`, sin cambiar `logica.js` salvo que aparezca un fallo.
  **Cubre:** RF-1 (CA-1.1 a CA-1.5) · RF-4 (CA-4.1) · RF-7 (CA-7.3).
  **Hecho cuando:** pasan las pruebas: para cada "hoy" de referencia (`2026-10-04`,
  `2026-10-05`, `2026-09-30`, `2026-06-01`, `2027-01-01`, `2027-02-25`, `2027-03-10`,
  `2028-03-05`, `2026-04-05`, `2026-11-01`) las fechas no vacías son todas distintas, cada
  una es el día siguiente de la anterior y suman 77 + los días de la semana actual; el día
  de índice 0 de cada columna es lunes y el 6 es domingo; con hoy lunes las posiciones 1–6
  de la última columna son huecos, con hoy domingo no hay ninguno, y una sesión de mañana no
  rellena su hueco; los periodos de `2026-10-04` y `2026-10-05` son distintos.

- [x] **T13. Pruebas del modelo: datos, niveles, texto y rendimiento** (~25 min)
  Solo pruebas en `tests.html`.
  **Cubre:** RF-2 (CA-2.1 a CA-2.3) · RF-3 (CA-3.1) · RF-5 (CA-5.8) · RF-8 (CA-8.1 a CA-8.4) ·
  RF-9 (CA-9.4) · RNF-8.
  **Hecho cuando:** pasan las pruebas: llamar dos veces a `calcularMapa` con la misma entrada
  da el mismo resultado y la lista queda igual (copia antes/después); lista con sesiones no
  válidas mezcladas con válidas → solo cuentan las válidas, sin errores; sesiones repetidas
  cuentan todas; el `texto` de cada día es igual a `textoDetalle(fecha, minutos)`; 29 → nivel 1
  y 30 → nivel 2 en el modelo; una prueba informativa mide con `performance.now()` que
  `calcularMapa` con 5 000 sesiones tarda menos de 100 ms.

- [x] **T14. `posicionDeFecha`, `textoLineaDetalle` y `fechaConParadaTab`** (~25 min)
  **Cubre:** RF-5 (CA-5.4, CA-5.5, CA-5.6, parte automática de CA-5.7 y CA-5.9) ·
  RF-9 (CA-9.1).
  **Hecho cuando:** pasan las pruebas: `posicionDeFecha` devuelve `{ semana, dia }` para una
  fecha del mapa y `null` para una fuera o un hueco; `textoLineaDetalle` sin apuntada ni
  seleccionada → `TEXTO_DETALLE_INICIAL`, solo seleccionada → su texto, ambas → el de la
  apuntada, fecha fuera del mapa → se ignora; `fechaConParadaTab` sin selección → hoy, con
  selección en el mapa → la selección, con selección fuera del mapa → hoy.

- [x] **T15. `moverPosicion`** (~20 min)
  **Cubre:** RF-9 (CA-9.2).
  **Hecho cuando:** pasan las pruebas: las cuatro flechas en una celda central se mueven en
  su dirección (arriba/abajo = día, izquierda/derecha = semana); arriba desde lunes, abajo
  desde domingo, izquierda en la columna 0 y derecha en la 11 → misma posición; derecha o
  abajo hacia un hueco → misma posición; la entrada no se modifica.

## Fase 3 — Interfaz

- [x] **T16. Sección en `index.html`** (~15 min)
  Nueva `<section class="seccion">` justo después de la sección de la racha con
  `<h2 id="mapa-titulo">Últimas 12 semanas</h2>`, `<div id="mapa" class="mapa" role="grid"
  aria-labelledby="mapa-titulo">`, `<p id="mapa-detalle" class="mapa-detalle">` y
  `<div id="mapa-leyenda" class="mapa-leyenda">`, vacíos.
  **Cubre:** RF-6 (CA-6.1).
  **Hecho cuando:** en el navegador el título "Últimas 12 semanas" aparece entre la fila de
  mejor racha / esta semana / este mes y "Registrar sesión", con el mismo estilo que los
  demás `h2`, y la consola está limpia.

- [x] **T17. `mostrarMapa()`: filas, días, huecos y etiquetas** (~30 min)
  En `app.js`: `mostrarMapa()` llama a `calcularMapa(sesiones, hoyTexto())`, vacía `#mapa` y
  lo construye por filas con `createElement` + `textContent` (plan §4.2): fila de meses
  (`aria-hidden`), 7 filas `role="row"` con `rowheader` (`DIAS_CORTOS`) y 12 celdas. Día =
  `div.dia.nivel-N` con `role="gridcell"`, `aria-label` = `texto`, `data-semana`, `data-dia`
  y `tabindex` (0 solo en el de `fechaConParadaTab`, −1 en el resto); hueco = `div.hueco`
  con `aria-hidden="true"`. Escribir `TEXTO_DETALLE_INICIAL` en `#mapa-detalle`. Llamarlo
  desde `mostrarTodo()`. Sin eventos ni estilos todavía.
  **Cubre:** RF-1 · RF-4 (CA-4.1) · RF-6 (CA-6.2, CA-6.3, CA-6.4) · RF-7 (CA-7.1, CA-7.2,
  CA-7.3) · RF-9 (CA-9.1, CA-9.4).
  **Hecho cuando:** en `index.html` (sin sesiones) el DOM tiene 7 filas × 12 celdas, los días
  posteriores a hoy son `div.hueco`, hay exactamente un `tabindex="0"` (el de hoy), cada
  celda tiene su `aria-label` (p. ej. "dom 4 oct 2026: 0 min"), el texto inicial se ve bajo
  el mapa, y al guardar una sesión el mapa se repinta sin recargar con esa celda en su nivel.

- [x] **T18. Leyenda** (~15 min)
  Rellenar `#mapa-leyenda` en `mostrarMapa()`: "Menos", 5 cuadros `nivel-0`…`nivel-4` con
  `role="img"`, `title` y `aria-label` de `TRAMOS_LEYENDA`, y "Más".
  **Cubre:** RF-6 (CA-6.6, CA-6.7, CA-6.8).
  **Hecho cuando:** el DOM de la leyenda tiene "Menos", 5 cuadros en orden de 0 a 4 con los
  tramos "0 min", "1–29 min", "30–59 min", "60–119 min" y "120 min o más" en `title` y
  `aria-label`, y "Más"; el árbol de accesibilidad (snapshot de DevTools) los lista.

- [x] **T19. Estilos: colores de nivel y rejilla en escritorio** (~25 min)
  En `styles.css`: `--nivel-0`…`--nivel-4` en `:root`, rejilla por fila
  (`grid-template-columns: var(--ancho-etiqueta) repeat(12, var(--tam-dia))`, `gap: 4px`,
  `--tam-dia: 26px`, `--ancho-etiqueta: 28px`), celdas `.dia.nivel-N`, `.hueco` sin fondo ni
  borde, etiquetas de día y de mes (`nowrap`, sin recorte), línea de detalle sin `nowrap`
  y leyenda (cuadros de 12 px, texto `0.85rem`). Sin animaciones ni fosforito.
  **Cubre:** RF-3 (CA-3.2) · RF-4 (CA-4.1) · RF-6 (CA-6.5) · RNF-4 · RNF-7.
  **Hecho cuando:** a 1280 px el mapa se ve con 12 columnas, los 5 niveles son del mismo tono
  cada uno más oscuro, los huecos no tienen color, las etiquetas de mes pasan por encima de
  las columnas vacías, el mapa no se estira y queda alineado a la izquierda con el resto.

- [ ] **T20. Estilos: móvil, desplazamiento, selección y foco** (~25 min)
  `@media (max-width: 480px)`: `--tam-dia: 20px`, `--ancho-etiqueta: 20px`, etiquetas a
  `0.7rem`. `#mapa` con `overflow-x: auto`. Clase `.seleccionado` (contorno 2 px
  `--grafito`) y foco visible (contorno 3 px `--fosforito`, como los campos actuales).
  **Cubre:** RF-5 (CA-5.7, marca visual) · RF-9 (foco visible) · RNF-3 · RNF-7.
  **Hecho cuando:** a 360 × 740 el mapa completo se ve sin desplazamiento horizontal de la
  página (`document.documentElement.scrollWidth` ≤ 360), la distancia entre centros de dos
  días contiguos es 24 px, y con zoom al 200 % solo se desplaza el mapa, no la página.

- [ ] **T21. Comprobar y ajustar el contraste** (~15 min)
  Medir con el panel de contraste de DevTools y ajustar los valores de `--nivel-0` y
  `--nivel-4` si hace falta (R-2).
  **Cubre:** RF-3 (CA-3.3).
  **Hecho cuando:** `--nivel-0` tiene al menos 1,5:1 y `--nivel-4` al menos 3:1 respecto a
  `--papel`, anotados los valores medidos, y los 5 niveles siguen siendo distinguibles.

- [ ] **T22. Eventos de ratón** (~20 min)
  Un solo escuchador por evento en `#mapa` (delegación, D-10), añadido una sola vez. Variables
  `mapaActual`, `diaApuntado` y `diaSeleccionado`; `mostrarMapa()` las reinicia. `mouseover`
  sobre `.dia` → `diaApuntado`; `mouseleave` de `#mapa` → `null`; ambos actualizan la
  línea con `textoLineaDetalle`.
  **Cubre:** RF-5 (CA-5.5, CA-5.6, CA-5.8).
  **Hecho cuando:** al pasar el ratón por un día la línea muestra su detalle (p. ej. "lun 3
  ago 2026: 1 h 15 min"), al salir del mapa vuelve al texto inicial, y las sesiones de
  `localStorage` y la lista quedan idénticas.

- [ ] **T23. Selección con clic, toque y foco** (~25 min)
  `click` sobre `.dia` → dar el foco a su celda. `focusin` sobre `.dia` →
  `diaSeleccionado`, quitar clase, `aria-selected` y `tabindex="0"` al anterior (pasa a −1) y
  ponerlos en el nuevo; actualizar la línea. `mostrarMapa()` quita la selección (CA-5.9).
  **Cubre:** RF-5 (CA-5.7, CA-5.9) · RF-9 (CA-9.1, CA-9.3).
  **Hecho cuando:** clic en un día lo marca y fija su detalle aunque el ratón salga del mapa;
  clic en otro sustituye la selección; clic en el mismo día o fuera del mapa no la cambia;
  hay siempre un único `tabindex="0"` (el día seleccionado); al guardar una sesión la
  selección desaparece y vuelve el texto inicial.

- [ ] **T24. Teclado con flechas** (~20 min)
  `keydown` delegado: con una flecha llama a `moverPosicion`; si la posición cambia,
  `preventDefault()` y foco a la nueva celda (el `focusin` de T23 la selecciona).
  **Cubre:** RF-9 (CA-9.1, CA-9.2, CA-9.3).
  **Hecho cuando:** con Tab el foco llega a hoy y solo hay una parada del tabulador en el
  mapa; las flechas mueven el foco por filas y columnas; en los bordes y ante huecos el foco
  no se mueve; la página no se desplaza al pulsar flechas.

## Fase 4 — Verificación y cierre

- [ ] **T25. Verificación manual: funcionamiento** (~30 min)
  Con el MCP de Chrome DevTools en `isolatedContext`, seguir plan §7.2 pasos 1–5 y 8:
  mapa sin sesiones, guardar sesiones de 15, 45, 90 y 150 min en días distintos, ratón, clic,
  teclado, árbol de accesibilidad, y almacenamiento no válido (la clave no cambia).
  **Cubre:** RF-1 a RF-9 (partes [manual] y [auto + manual]: CA-5.4, 5.5 a 5.7, 5.9, 6.6, 7.1,
  7.2, 9.1, 9.3) · CA-8.3 · CA-8.4.
  **Hecho cuando:** cada paso se ha ejecutado y su resultado coincide con el esperado, la
  consola no muestra errores de la aplicación, y con la clave `diario-estudio-sesiones`
  puesta a `{}`, a `"texto"` o con JSON corrupto el mapa sale vacío (todo en nivel 0) y el
  valor guardado no cambia.

- [ ] **T26. Verificación manual: visual y móvil** (~25 min)
  Plan §7.2 pasos 6 y 7: 360 × 740 vertical y horizontal, zoom al 200 %, 1280 px; comprobar
  RNF-8 con 5 000 sesiones en la página y que racha, semana y mes siguen dando los mismos
  valores (R-5).
  **Cubre:** RF-3 (CA-3.2, CA-3.3) · RF-6 (CA-6.1, CA-6.5) · RNF-3 · RNF-4 · RNF-7 · RNF-8.
  **Hecho cuando:** sin desplazamiento horizontal de la página a 360 px (ni en horizontal ni
  con zoom al 200 %, donde solo se desplaza el mapa), 24 px entre centros, el mapa no se
  estira a 1280 px, el título no es mayor que los demás `h2` y no hay animaciones; con 5 000
  sesiones `mostrarMapa()` tarda menos de 100 ms.

- [ ] **T27. Pruebas completas y `README.md`** (~20 min)
  Abrir `tests.html` y ver que todo pasa; comprobar que cada criterio [auto] y [auto + manual]
  tiene al menos una prueba (plan §6.3). Actualizar `README.md`: el mapa de calor, el formato
  del detalle y cómo abrir `tests.html`.
  **Cubre:** RNF-6 · criterios de finalización de la spec §8.
  **Hecho cuando:** `tests.html` muestra "N de N pruebas superadas" en verde sin fallos ni
  errores en consola, y `README.md` explica el mapa, la leyenda, el uso con teclado y cómo
  ejecutar las pruebas, en español.

- [ ] **T28. Cierre: spec, `AGENTS.md` y `MEMORY.md`** (~20 min)
  - Spec: marcar los criterios de §8 cumplidos y revisar que no haya diferencias con el código
    (principio 2). Las etiquetas de plan §7.3 ya están aplicadas.
  - `AGENTS.md`: en "Verificación", sustituir "No hay tests automáticos" por abrir `tests.html`
    y comprobar que todo pasa.
  - `MEMORY.md`: estado actual, decisiones (con su porqué) y errores a evitar; máximo ~50 líneas.
  **Cubre:** principios 2 y 4 de la constitución · criterios de finalización de la spec §8.
  **Hecho cuando:** spec, código, `README.md`, `AGENTS.md` y `MEMORY.md` coinciden entre sí,
  `MEMORY.md` no pasa de ~50 líneas y deja anotado el pendiente de pasar racha, semana y mes
  a funciones puras; todos los cambios están listos para un único commit (no se hace el
  commit sin que el usuario lo pida).

---

## Cobertura de requisitos

| RF | Tareas |
|----|--------|
| RF-1 Periodo | T1, T6, T11, T12, T17 |
| RF-2 Sesiones válidas y minutos | T4, T5, T7, T11, T13 |
| RF-3 Nivel | T8, T11, T13, T19, T21 |
| RF-4 Huecos | T11, T12, T17, T19 |
| RF-5 Detalle | T1, T3, T9, T14, T20, T22, T23 |
| RF-6 Título, leyenda y etiquetas | T3, T10, T16, T17, T18, T19 |
| RF-7 Actualización | T12, T17, T25 |
| RF-8 Sin datos y datos no válidos | T4, T5, T7, T11, T13, T25 |
| RF-9 Teclado y lectores | T14, T15, T17, T20, T23, T24 |
| RNF-1 a RNF-8 | T1, T2, T13, T19, T20, T26, T27 |

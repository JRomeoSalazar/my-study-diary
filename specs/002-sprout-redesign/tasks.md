# Tareas 002 — Rediseño visual "Brote"

**Entrada**: `specs/002-sprout-redesign/` (spec aprobada, `plan.md`, `research.md`,
`data-model.md`, `contracts/`, `quickstart.md`).

**Pruebas**: solo en `tests.html` (nunca `node --test`). Las de `inicialDelTema` se escriben
**antes** que la función (principio IV y criterios [auto] CA-8.5 y CA-8.6). El resto de criterios
son [manual] y se verifican con `quickstart.md`.

**Formato**: `[ID] [P?] [Historia] Descripción`. `[P]` = se puede hacer en paralelo (archivo
distinto y sin depender de tareas pendientes). Historias: HU-1 a HU-5 de la spec (US1 a US5).
Una tarea no se marca hasta que se cumple su "Hecho cuando".

Reglas para todas las tareas:
- Tras cada tarea que toque `index.html`, `styles.css` o `app.js`, abrir `index.html` con el MCP
  de Chrome DevTools en un contexto aislado (`isolatedContext`) y comprobar que la consola no
  muestra errores de la aplicación (se ignora "Unsafe attempt to load URL file://").
- Tras cada tarea que toque `logica.js` o `tests.html`, abrir `tests.html`: "N de N pruebas
  superadas" en verde (las 133 anteriores incluidas). **Salvedad:** T013 termina en rojo a
  propósito (las pruebas nuevas fallan porque la función aún no existe); T014 lo pone en verde.
  T013 y T014 van en el mismo commit, para que ningún commit tenga pruebas en rojo.
- No cambian datos guardados, cálculos ni textos de la interfaz (RNF-1, RNF-2). No se escribe
  código nuevo de fechas.
- Sin dependencias, sin build, sin `type="module"`, sin `fetch`. Todo en español.
- No crear más archivos que los dos SVG autorizados.

---

## Fase 1 — Preparación

- [X] T001 [P] Crear `icono-brote.svg` en la raíz: brote dibujado con líneas (tallo + dos hojas,
  `fill="none"`, trazo redondeado), `viewBox` cuadrado, trazo `#FFFFFF` (va sobre el cuadrado
  verde bosque de la cabecera). La etiqueta raíz lleva `xmlns="http://www.w3.org/2000/svg"`
  (sin él, `<img>` no lo muestra). Sin scripts ni enlaces externos dentro del SVG.
  **Cubre:** CA-1.4 · `research.md` R-2.
  **Hecho cuando:** el archivo solo contiene `<svg xmlns="http://www.w3.org/2000/svg" ...>` con
  trazos, y tras T003/T004 el brote se ve **dentro de `index.html`** (cabecera), no solo abierto
  suelto.

- [ ] T002 [P] Crear `brote-racha.svg` en la raíz: el mismo dibujo de brote, más grande, con trazo
  `#2C6E4D` (verde algo más claro que `#1E5A3E`). La etiqueta raíz lleva
  `xmlns="http://www.w3.org/2000/svg"`. Sin scripts ni enlaces externos.
  **Cubre:** CA-3.3 · `research.md` R-2, R-4.
  **Hecho cuando:** abrir `brote-racha.svg` en Chrome muestra el brote verde, y tras T007 se ve
  **dentro de `index.html`**, en la tarjeta de la racha a 1280 px.

## Fase 2 — Base (bloquea todas las historias)

- [X] T003 Reorganizar `index.html` según `contracts/estructura-html.md` y `plan.md` D-2:
  `<link>` de Google Fonts a Bricolage Grotesque + Figtree (`research.md` R-7);
  `<header class="cabecera">` con `<span class="logo" aria-hidden="true"><img src="icono-brote.svg" alt=""></span>`
  y el `<h1>`; `<div class="columnas">` con `.columna-principal` (racha, cifras, mapa) y
  `.columna-lateral` (formulario, sesiones); clase `tarjeta` en cada parte; `<dl class="cifras">`
  fuera de la tarjeta de la racha con cada `<div>` como `tarjeta cifra` (y además `cifra-semana`
  en el de `#minutos-semana` y `cifra-mes` en el de `#dias-mes`); quitar la clase
  `fosforito` de `#racha-dias`; `<img class="racha-brote" src="brote-racha.svg" alt="">` dentro de
  la tarjeta de la racha. Mantener **todos** los ids y textos.
  **Cubre:** CA-1.3, CA-1.4, CA-2.2, CA-2.3, CA-3.3, CA-9.1 (HTML).
  **Hecho cuando:** todos los ids de `contracts/estructura-html.md` existen una sola vez; el orden
  del documento es racha, cifras, mapa, formulario, sesiones; no queda `fosforito` en el HTML; con
  sesiones sembradas, racha, mejor racha, semana, mes, mapa y lista muestran los mismos valores
  que antes y guardar una sesión sigue funcionando; consola limpia.

- [X] T004 Reescribir la base de `styles.css` (`plan.md` D-3): variables de `:root` con la paleta
  Brote, colores de `research.md` R-3/R-4 y las fuentes; `body` con fondo `--fondo` liso (sin
  cuadrícula); `.contenedor` sin margen rojo, `max-width: 1180px` y centrado; `.tarjeta` (blanco,
  radio ~16-20 px, relleno ~20-24 px); títulos en `--letra-titulos`; cabecera con `.logo`
  (cuadrado redondeado `--bosque`, imagen centrada); eliminar `.fosforito`, su `@keyframes` y las
  variables del cuaderno. Mantener las variables y reglas del mapa (`--tam-dia`, `.mapa`, `.dia`...).
  Para no dejar `var()` rotos, sustituir provisionalmente **todas** las referencias a variables
  antiguas por las nuevas (T005, T006 y T016 las afinan después):
  `--nivel-4: var(--tinta)` → `var(--bosque)`; `--fosforito` en `.dia:focus-visible`,
  `input:focus-visible` y `button:focus-visible` → `--foco`; `--margen` en `.error` → `--error`;
  `--tinta-oscura` en `button:hover` → `--texto` (o un verde más oscuro); `--tinta` → `--bosque`;
  `--grafito` → `--texto`; `--grafito-suave` → `--texto-suave`. Borrar `--grafito`,
  `--grafito-suave` y `--tinta-oscura`, y las reglas `.racha-datos`, `.racha-cifra`,
  `.racha-titulo` y `.seccion` si dejan de usarse en el HTML.
  **Cubre:** CA-1.1, CA-1.2, CA-1.3, CA-1.4, CA-1.5, CA-9.1.
  **Hecho cuando:** a 1280 px se ve fondo salvia liso, sin cuadrícula ni línea roja ni fosforito,
  cada parte en una tarjeta blanca y la cabecera con el icono en su cuadrado verde; `styles.css`
  no contiene `fosforito`, `--papel`, `--cuadricula`, `--tinta`, `--tinta-oscura`, `--grafito`,
  `--grafito-suave` ni `--margen` (buscar con Grep: cada `var(--...)` usado está definido en
  `:root`); consola limpia.

## Fase 3 — US1: colores tranquilos (HU-1)

**Objetivo:** mapa y formulario con el estilo Brote. **Prueba independiente:** escenarios 13 y 14
de `quickstart.md`.

- [ ] T005 [US1] Estilos del mapa en `styles.css`: niveles `--nivel-0` a `--nivel-4` de
  `research.md` R-3 (`#C4CFC7`, `#7FB592`, `#4F9A70`, `#2E7652`, `#1E5A3E`), `.dia` con radio
  ~5 px, `.mapa-detalle` como píldora con `--relleno`, `.dia.seleccionado` con contorno 2 px
  `--texto`, `.dia:focus-visible` con anillo 3 px `--foco` y `outline-offset: 2px`, seleccionado +
  foco con las dos marcas, leyenda con las mismas clases `.nivel-N`. Sin tocar tamaños ni scroll
  del mapa (spec 001).
  **Cubre:** RF-5 (CA-5.1–5.5), RF-6 (CA-6.1, CA-6.2).
  **Hecho cuando:** el escenario 14 de `quickstart.md` se cumple; con DevTools los niveles miden
  los contrastes de R-3; con teclado y clic se ven las marcas de CA-5.4; consola limpia.

- [ ] T006 [US1] Estilos del formulario en `styles.css`: `input` con fondo `--relleno`, borde 1 px,
  radio ~12 px, `min-height: 44px`, `::placeholder` en `--texto-suave`; foco (`:focus-visible`)
  de campos y botón con anillo 3 px `--foco`; botón píldora `--bosque` con texto blanco,
  `min-height: 44px` y a todo el ancho; `.error` en `--error` (`#B42318`).
  **Cubre:** RF-7 (CA-7.1–7.5), RNF-6.
  **Hecho cuando:** el escenario 13 de `quickstart.md` se cumple (campos y botón ≥ 44 px medidos
  en DevTools; minutos 0 muestra el error en rojo); mismos textos y validaciones que antes.

## Fase 4 — US2: la racha destaca (HU-2)

**Objetivo:** tarjeta verde bosque con el número más grande de la página. **Prueba
independiente:** escenarios 7, 8 y 9 de `quickstart.md`.

- [ ] T007 [US2] Tarjeta de la racha en `styles.css`: fondo `--bosque`; "Racha actual" y
  `#racha-texto` en `--bosque-claro`; `.racha-numero` blanco, `--letra-titulos`, `font-size: 6rem`,
  cifras `lining-nums tabular-nums`; `position: relative; overflow: hidden`; `.racha-brote` en
  posición absoluta a la derecha, visible solo desde 1024 px (`display: none` por debajo).
  **Cubre:** RF-3 (CA-3.1–3.3).
  **Hecho cuando:** el escenario 7 se cumple a 1280 px (número ≥ 96 px medido en DevTools, brote
  visible) y a 800 px el brote no se ve; "1 día seguido" / "N días seguidos" como antes.

- [ ] T008 [US2] Aparición suave en `styles.css`: `@keyframes aparecer` (de `opacity: 0;
  transform: translateY(8px)` a `opacity: 1; transform: none`), `0.5s ease-out` una vez en
  `.racha-numero`; `@media (prefers-reduced-motion: reduce)` → `animation: none`.
  **Cubre:** RF-9 (CA-9.2, CA-9.3), RNF-7.
  **Hecho cuando:** escenarios 8 y 9 de `quickstart.md`: al recargar aparece una vez; guardar una
  sesión no la repite; con "reducir movimiento" no hay animación; no queda ninguna otra animación
  en `styles.css`.

## Fase 5 — US3: todo de un vistazo en el ordenador (HU-3)

**Objetivo:** dos columnas y cifras en una fila. **Prueba independiente:** escenarios 1-4 y 6.

- [ ] T009 [US3] Columnas en `styles.css`: `.columnas` en una columna por defecto (separación
  entre tarjetas) y `@media (min-width: 1024px)` → `display: grid;
  grid-template-columns: minmax(0, 1fr) 390px`; `min-width: 0` en ambas columnas.
  **Cubre:** RF-2 (CA-2.1–2.3), §7 "Ventana justo en 1024 px".
  **Hecho cuando:** escenarios 1, 2 y 3: a 1280 px dos columnas (derecha ~390 px medida en
  DevTools) centradas en ≤ 1180 px; a 1024 px sin scroll horizontal; a 1023 px una columna en el
  orden de CA-2.2; Tab recorre formulario después del mapa.

- [ ] T010 [US3] Cifras en una fila en `styles.css`: `.cifras` en rejilla con
  `grid-auto-flow: column; grid-auto-columns: 1fr`; `.cifra` con etiqueta (`dt`) en
  `--texto-suave` y valor (`dd`) debajo, más grande, `--letra-titulos`, `white-space: nowrap`,
  cifras tabulares; añadir `.cifra[hidden] { display: none; }` (`research.md` R-5).
  Paso condicional: si entre 481 y ~560 px "12 h 30 min" no cabe en su tarjeta, reducir la letra
  de los valores solo en ese tramo (`@media (min-width: 481px) and (max-width: 560px)`); si
  cabe, no añadir nada.
  **Cubre:** RF-4 (CA-4.1, CA-4.2, CA-4.4 en > 480 px), CA-1.2.
  **Hecho cuando:** escenarios 1, 3, 4 y 6: tres tarjetas en fila a 1280, 600 y 481 px sin
  desbordar (probar "12 h 30 min"); sin sesiones, la mejor racha no se ve y Semana y Mes se
  reparten la fila sin hueco.

## Fase 6 — US4: cómodo en el móvil (HU-4)

**Objetivo:** todo se lee y se toca bien a 360-480 px. **Prueba independiente:** escenarios 5, 6
y 15.

- [ ] T011 [US4] Cifras a ≤ 480 px en `styles.css`: `grid-template-areas: "mejor mes" "semana semana"`
  (con `grid-area` en `#mejor-racha`, `.cifra-semana` y `.cifra-mes`, clases añadidas en T003) y
  `.cifras:has(#mejor-racha[hidden])` → `"semana mes"` en dos columnas iguales.
  **Archivos:** `styles.css`.
  **Cubre:** CA-4.3, CA-4.4 (≤ 480 px), CA-4.5.
  **Hecho cuando:** a 360 y 390 px: "Mejor racha | Este mes" arriba y "Esta semana" debajo a todo
  el ancho; sin sesiones, Semana y Mes en dos columnas iguales; ningún valor partido en dos
  líneas (probar "3 h 10 min" y "12 h 30 min").

- [ ] T012 [US4] Ajustes de móvil en `styles.css` (`@media (max-width: 480px)`): `.racha-numero`
  a `5rem`; relleno + borde lateral de `.contenedor` + `.tarjeta` de **26 px por lado como máximo**
  (p. ej. 12 + 14), porque el mapa mide 308 px fijos y a 360 px solo quedan 308 px; mantener
  `--tam-dia: 20px` y `--ancho-etiqueta: 20px` del mapa.
  **Cubre:** CA-3.2, RNF-5, §7 "Racha de 3 o más cifras", "Zoom al 200 %".
  **Hecho cuando:** escenarios 5 y 15: a 360 px sin scroll horizontal, número ≥ 80 px, "365"
  cabe en la tarjeta, mapa entero con ≥ 24 px entre centros de días, `.mapa` sin scroll
  horizontal a 360 px (`scrollWidth` = `clientWidth`, medido en DevTools); con zoom 200 % a 1280 px
  una columna y solo el mapa se desplaza.

## Fase 7 — US5: mis sesiones, igual que antes y con insignia (HU-5)

**Objetivo:** la lista en tarjeta con insignia de la inicial. **Prueba independiente:**
`tests.html` en verde y escenarios 10, 11 y 18.

- [ ] T013 [P] [US5] Escribir en `tests.html` (antes de `mostrarResultados()`) las pruebas de
  `inicialDelTema` con **todos** los ejemplos de `contracts/inicial-del-tema.md`, con nombres que
  empiecen por "CA-8.5:" o "CA-8.6:" (p. ej. `igual(inicialDelTema("  álgebra"), "Á")`,
  `igual(inicialDelTema("👩‍💻 Programar"), "👩‍💻")`, `igual(inicialDelTema("   "), "")`,
  `igual(inicialDelTema(null), "")`). El acento combinado se escribe **con escapes**, para que se
  vea qué se prueba: `igual(inicialDelTema("a\u0301lgebra"), "A\u0301")`.
  **Cubre:** CA-8.5, CA-8.6 (pruebas).
  **Hecho cuando:** `tests.html` muestra las 133 pruebas anteriores en "OK" y las nuevas en
  "FALLO" (la función aún no existe), con el resumen en rojo. No se hace commit hasta T014.

- [ ] T014 [US5] Añadir `inicialDelTema(tema)` a `logica.js` (sección "Sesiones: insignia")
  siguiendo `contracts/inicial-del-tema.md`: `""` si no es texto; `trimStart()`; `""` si queda
  vacío; primer grafema con `Intl.Segmenter("es", { granularity: "grapheme" })` (si no existe,
  `Array.from(texto)[0]`); `toLocaleUpperCase("es-ES")`. Función pura con comentario breve.
  Depende de T013.
  **Cubre:** CA-8.5, CA-8.6.
  **Hecho cuando:** `tests.html` muestra "N de N pruebas superadas" en verde (133 + las nuevas).
  T013 y T014 entran en el mismo commit.

- [ ] T015 [US5] En `app.js`, modificar solo `mostrarLista()` (`plan.md` D-4): calcular
  `inicialDelTema(sesion.tema)` y, si no es `""`, crear `<span class="sesion-insignia"
  aria-hidden="true">` con `textContent` (nunca `innerHTML`) y añadirlo al `<li>` antes del
  bloque del tema. Depende de T014.
  **Cubre:** CA-8.4, CA-8.6 (pintado), RNF-1.
  **Hecho cuando:** con las sesiones de prueba del apartado 2 de `quickstart.md`, cada sesión
  tiene su insignia ("M", "Á", "3", "📚", "👩‍💻") y la de tema `"   "` no tiene; en el árbol de
  accesibilidad la insignia no aparece; el resto de `app.js` sin cambios (revisar el diff).

- [ ] T016 [US5] Estilos de la lista en `styles.css`: `.sesion` en fila flex (insignia, texto,
  minutos) con línea fina entre sesiones; `.sesion-insignia` cuadrado redondeado ~36-40 px,
  fondo `--insignia` (`#DCEFE2`), texto `--bosque`, centrado, `flex-shrink: 0`; bloque de texto
  `flex: 1; min-width: 0`; `.sesion-tema` partible; `.sesion-fecha` en `--texto-suave` y con `overflow-wrap: anywhere` (evita desbordar con zoom al 200 %);
  `.sesion-minutos` como píldora (`--fondo`, texto `--bosque`, `font-variant-numeric:
  lining-nums tabular-nums`, radio 999px, `max-width: 100%`, `overflow-wrap: anywhere`);
  `.vacio` dentro de la tarjeta y `.vacio[hidden] { display: none; }` (o una regla general
  `[hidden] { display: none; }`). Sin altura fija ni scroll interno.
  **Cubre:** RF-8 (CA-8.1–8.3), §7 (tema largo, minutos enormes, muchas sesiones).
  **Hecho cuando:** escenario 10 de `quickstart.md` a 1280 y 360 px: tema largo partido sin
  ensanchar la página, "1000000 min" dentro de la tarjeta, minutos en verde bosque con cifras
  de ancho fijo; sin sesiones se ve el mensaje vacío en la tarjeta y **con sesiones no se ve**.

## Fase 8 — Cierre

- [ ] T017 Verificación completa con `quickstart.md` (escenarios 1-19) en el MCP de Chrome
  DevTools, contexto aislado: 1280, 1024, 1023, 600, 481, 390 y 360 px, teclado, zoom 200 %,
  reducir movimiento, sin conexión, contraste y sesiones guardadas antes del cambio. Corregir en
  `styles.css` / `index.html` lo que falle (sin añadir nada fuera de la spec).
  **Cubre:** §9 de la spec (todos los RF y RNF).
  **Hecho cuando:** los 19 escenarios se cumplen, `tests.html` en verde y la consola sin errores
  de la aplicación.

- [ ] T018 [P] Actualizar `README.md`: nuevo aspecto (Brote, dos columnas, insignia), archivos
  nuevos `icono-brote.svg` y `brote-racha.svg` en la estructura del proyecto, fuentes nuevas, y la
  función `inicialDelTema` en la parte de pruebas/funcionamiento si se listan las funciones.
  **Hecho cuando:** el README no menciona el estilo cuaderno, el fosforito ni las fuentes
  antiguas, y describe lo que hay.

- [ ] T019 Marcar los criterios de finalización (§9) en `specs/002-sprout-redesign/spec.md` y
  actualizar `MEMORY.md` (estado, decisiones con su porqué, errores a evitar; máximo ~50 líneas).
  Depende de T017 y T018.
  **Hecho cuando:** §9 marcada, `MEMORY.md` refleja el rediseño terminado y ya no describe el
  estilo cuaderno como actual.

---

## Dependencias

- Fase 1 (T001, T002) → T003 (el HTML enlaza los SVG).
- Fase 2 (T003 → T004) bloquea las fases 3-6.
- US1 (T005, T006), US2 (T007, T008), US3 (T009, T010) y US4 (T011, T012) tocan `styles.css`:
  se hacen en orden, una tras otra, para no pisarse. T011 va después de T010 (amplía la rejilla de
  cifras). T012 después de T007 (tamaño del número en móvil).
- US5: T013 no depende de nada y puede hacerse desde el principio [P]; T013 → T014 → T015 → T016
  (T016 necesita T004).
- Cierre: T017 tras todas; T018 [P] en paralelo con T017; T019 al final.

## Paralelo

- T001, T002 y T013 a la vez (archivos distintos: los dos SVG y `tests.html`).
- T014 (`logica.js`) y T015 (`app.js`) pueden ir en paralelo con las tareas de `styles.css` de
  las fases 3-6, siempre después de T013 y T003.
- T018 (`README.md`) en paralelo con T017.

## Estrategia

1. **Primero lo mínimo útil:** fases 1 y 2 + US2 (T001-T004, T007-T008): el diario ya se ve
   Brote con la racha destacada. Comprobar escenarios 1, 7 y 8.
2. Añadir US3 y US4 (distribución en ordenador y móvil), luego US1 (mapa y formulario) y US5
   (lista con insignia), comprobando cada historia con sus escenarios.
3. Cerrar con T017-T019.

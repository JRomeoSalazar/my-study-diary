# Plan 001 — Mapa de calor de días estudiados

Estado: aprobado · Fecha: 2026-10-04
Spec: `specs/001-heat-map/spec.md` · Constitución: `docs/constitution.md`

Este documento dice **cómo** se va a construir lo que pide la spec. No contiene código:
solo responsabilidades, nombres de funciones, pseudocódigo y decisiones.

> **Aprobaciones del usuario (2026-10-04):**
> - Crear `logica.js` y `tests.html`.
> - Mover sin cambios las 5 funciones de D-2.
> - Cambiar las etiquetas de §7.3 a [auto + manual]. Ya está aplicado en la spec.

---

## 1. Archivos y responsabilidades

| Archivo | Acción | Responsabilidad | RF |
|---------|--------|-----------------|----|
| `logica.js` | **Crear** | Solo funciones puras y constantes: validación, fechas, minutos por día, niveles, formatos, etiquetas de mes, navegación con flechas y textos del detalle. No toca el DOM ni `localStorage` y no llama a `new Date()` sin argumentos (principio 3). | RF-1, 2, 3, 4, 5, 6, 8, 9 |
| `tests.html` | **Crear** | Página de pruebas que se abre con doble clic. Carga `logica.js`, ejecuta las pruebas y muestra cuántas pasan y cuáles fallan (principio 4). | Todas las [auto] |
| `index.html` | Modificar | Añadir la sección "Últimas 12 semanas" entre la sección de la racha y "Registrar sesión", con el contenedor del mapa, la línea de detalle y el contenedor de la leyenda. Cargar `logica.js` **antes** de `app.js`. | RF-5, 6 |
| `app.js` | Modificar | Leer las sesiones, pedir a `logica.js` el modelo del mapa con la fecha de hoy, pintarlo y atender al ratón, al dedo y al teclado. Llamar al pintado desde `mostrarTodo()`, que ya se ejecuta al cargar la página y al guardar una sesión. Mover a `logica.js` las funciones puras que ya existen (ver D-2). | RF-5, 7, 9 |
| `styles.css` | Modificar | Colores de nivel en `:root`, rejilla del mapa, etiquetas, leyenda, línea de detalle, marca de día seleccionado y foco, y tamaños para móvil y escritorio. | RF-3, 4, 6 · RNF-3, 4, 7 |
| `README.md` | Modificar | Explicar el mapa de calor y cómo abrir `tests.html`. | — |
| `AGENTS.md` | Modificar | En "Verificación", cambiar "No hay tests automáticos" por "abrir `tests.html` y comprobar que todo pasa" (pendiente según `MEMORY.md`). | — |
| `MEMORY.md` | Modificar | Estado y decisiones al terminar. | — |
| `specs/001-heat-map/spec.md` | Ya modificada | Etiquetas de §7.3 cambiadas a [auto + manual]. Se incluye en el mismo commit que el código (principio 2). Hay que volver a tocarla si la implementación se aparta de ella. | — |

Orden de carga en `index.html`: primero `logica.js` y después `app.js`, como scripts clásicos.
Sin `type="module"`, para que siga funcionando con `file://` (principio 1). Los scripts
clásicos comparten las funciones globales, así que `app.js` puede usar todo lo que define
`logica.js`.

---

## 2. Funciones puras de `logica.js`

Convenciones:

- Todas las fechas entran y salen como **texto "AAAA-MM-DD"**.
- Por dentro solo se crean fechas con `new Date(año, mes - 1, día)`, en hora local.
  Nunca se usan `toISOString()` ni `new Date("AAAA-MM-DD")` ni sumas de milisegundos.
- **"hoy" siempre es un parámetro.**

### 2.1 Funciones que ya existen y se mueven sin cambios (D-2)

| Función | Qué hace | La usa |
|---------|----------|--------|
| `fechaATexto(fecha)` | `Date` → "AAAA-MM-DD" (local). | todo |
| `textoAFecha(texto)` | "AAAA-MM-DD" → `Date` local. | todo |
| `diaAnterior(fecha)` | Día anterior. | racha (sin cambios) |
| `inicioDeSemana(fecha)` | Lunes de la semana de esa fecha. | RF-1 |
| `formatearMinutos(total)` | "45 min" / "1 h 45 min" / "2 h". Ya da "0 min" con 0 y no tiene límite. | RF-5 (CA-5.3) |

`hoyTexto()` usa `new Date()`, así que **no** es pura: se queda en `app.js`.

### 2.2 Constantes nuevas

| Constante | Valor | RF |
|-----------|-------|----|
| `SEMANAS_MAPA` | `12` | RF-1 |
| `DIAS_CORTOS` | `["lun","mar","mié","jue","vie","sáb","dom"]` (empieza en lunes) | RF-5, RF-6 |
| `MESES_CORTOS` | `["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]` | RF-5, RF-6 |
| `TRAMOS_LEYENDA` | `["0 min","1–29 min","30–59 min","60–119 min","120 min o más"]` | RF-6 (CA-6.7) |
| `TEXTO_DETALLE_INICIAL` | `"Pasa el ratón o toca un día para ver sus minutos."` | RF-5 (CA-5.4) |

### 2.3 Funciones nuevas

| Función | Entrada → salida | RF / CA |
|---------|------------------|---------|
| `esFechaValida(texto)` | cualquier valor → `true` si es texto con el formato exacto `AAAA-MM-DD` y el día existe en el calendario. | RF-2, RF-8 (CA-8.2) |
| `esSesionValida(sesion)` | cualquier valor → `true` si es un objeto no nulo, tiene `fecha` válida y sus `minutos` son un número entero mayor que 0. | RF-2, RF-8 |
| `comoLista(valor)` | cualquier valor → el mismo valor si es una lista, o `[]` si no. | RF-8 (CA-8.3) |
| `sumarDias(texto, n)` | fecha y número de días (puede ser negativo) → la fecha resultante. | RF-1 (CA-1.5) |
| `lunesDeLaSemana(texto)` | fecha → el lunes de su semana. | RF-1 (CA-1.3) |
| `calcularMinutosPorDia(sesiones, desde, hasta)` | sesiones y rango (ambos incluidos) → objeto `{ "AAAA-MM-DD": minutos }` con solo las sesiones válidas del rango. | RF-2 |
| `calcularNivel(minutos)` | minutos → nivel 0–4. | RF-3 (CA-3.1) |
| `formatearFechaCorta(texto)` | fecha → "lun 3 ago 2026". | RF-5 (CA-5.2) |
| `textoDetalle(fecha, minutos)` | → "lun 3 ago 2026: 1 h 15 min". | RF-5 (CA-5.1), RF-9 (CA-9.4) |
| `calcularEtiquetasMes(semanas)` | semanas del mapa → lista de 12 textos (`""` o abreviatura de mes). | RF-6 (CA-6.3, CA-6.4) |
| `calcularMapa(sesiones, hoy)` | → modelo completo del mapa (ver 3.1). **Función principal.** | RF-1, 2, 3, 4, 6, 8 |
| `textoLineaDetalle(mapa, fechaApuntada, fechaSeleccionada)` | → texto que debe verse en la línea de detalle. | RF-5 (CA-5.4, 5.5, 5.6) |
| `posicionDeFecha(mapa, fecha)` | → `{ semana, dia }` o `null` si la fecha no está en el mapa. | RF-9 |
| `fechaConParadaTab(mapa, fechaSeleccionada, hoy)` | → la fecha del día que recibe el foco al entrar con Tab: la seleccionada si está en el mapa; si no, hoy. | RF-9 (CA-9.1) |
| `moverPosicion(mapa, posicion, tecla)` | posición actual y tecla de flecha → nueva posición, o la misma si en esa dirección hay borde o hueco. | RF-9 (CA-9.2) |

---

## 3. Algoritmo en pseudocódigo

### 3.1 Modelo del mapa (RF-1, 2, 3, 4, 6, 8)

```
función calcularMapa(sesiones, hoy):
    lista        ← comoLista(sesiones)                      # CA-8.3
    lunesActual  ← lunesDeLaSemana(hoy)
    primerDia    ← sumarDias(lunesActual, -(SEMANAS_MAPA - 1) * 7)   # CA-1.3: 77 días antes
    minutosDia   ← calcularMinutosPorDia(lista, primerDia, hoy)      # CA-2.1, 2.3

    semanas ← lista vacía
    para s desde 0 hasta SEMANAS_MAPA - 1:                  # CA-1.1: izquierda = más antigua
        columna ← lista vacía
        para d desde 0 hasta 6:                             # CA-1.2: lunes arriba
            fecha ← sumarDias(primerDia, s * 7 + d)         # CA-1.5
            si fecha > hoy:                                 # comparar texto AAAA-MM-DD es válido
                añadir NADA (hueco) a columna               # CA-4.1
            si no:
                minutos ← minutosDia[fecha] o 0 si no existe
                añadir { fecha, minutos,
                         nivel: calcularNivel(minutos),
                         texto: textoDetalle(fecha, minutos) } a columna
        añadir columna a semanas

    devolver { semanas, etiquetasMes: calcularEtiquetasMes(semanas) }
```

### 3.2 Funciones auxiliares

```
función esFechaValida(valor):
    si valor no es texto o no encaja con el patrón 4 cifras-2 cifras-2 cifras: devolver falso
    (año, mes, día) ← partes como números
    f ← new Date(año, mes - 1, día)
    devolver f.getFullYear() = año y f.getMonth() = mes - 1 y f.getDate() = día
    # "2026-02-30" pasa a ser 2 de marzo → los números no coinciden → falso

función esSesionValida(s):
    devolver s es un objeto y s no es null
         y esFechaValida(s.fecha)
         y typeof s.minutos = "number" y es entero y s.minutos > 0

función sumarDias(texto, n):
    (año, mes, día) ← partes de texto
    devolver fechaATexto(new Date(año, mes - 1, día + n))
    # se suma en días de calendario: un cambio de hora no salta ni repite días

función calcularMinutosPorDia(lista, desde, hasta):
    resultado ← objeto vacío
    para cada s en lista:
        si no esSesionValida(s): saltar                     # CA-8.2
        si s.fecha < desde o s.fecha > hasta: saltar        # CA-2.3
        resultado[s.fecha] ← (resultado[s.fecha] o 0) + s.minutos   # CA-2.1 (las repetidas también)
    devolver resultado

función calcularNivel(m):
    si m ≥ 120: 4;  si m ≥ 60: 3;  si m ≥ 30: 2;  si m ≥ 1: 1;  si no: 0

función formatearFechaCorta(texto):
    f ← textoAFecha(texto)
    devolver DIAS_CORTOS[(f.getDay() + 6) % 7] + " " + f.getDate() + " "
           + MESES_CORTOS[f.getMonth()] + " " + f.getFullYear()

función textoDetalle(fecha, minutos):
    devolver formatearFechaCorta(fecha) + ": " + formatearMinutos(minutos)

función calcularEtiquetasMes(semanas):
    etiquetas ← 12 textos vacíos
    para cada columna s:
        para cada día no hueco de la columna:               # CA-6.3: los huecos no cuentan
            si los dos últimos caracteres de día.fecha = "01":
                etiquetas[s] ← MESES_CORTOS[mes de día.fecha - 1]
    si etiquetas[0] = "" y etiquetas[1] = "":               # CA-6.4
        etiquetas[0] ← MESES_CORTOS[mes del lunes de la columna 0 - 1]
    devolver etiquetas
    # Dos días 1 siempre están al menos a 4 columnas, así que dos etiquetas
    # de CA-6.3 nunca chocan. El único choque posible es el de CA-6.4, y se evita.

función textoLineaDetalle(mapa, apuntada, seleccionada):
    para fecha en [apuntada, seleccionada]:                 # CA-5.5 tiene prioridad sobre la selección
        si fecha no es nula y posicionDeFecha(mapa, fecha) existe:
            devolver el texto de ese día
    devolver TEXTO_DETALLE_INICIAL                          # CA-5.4, CA-5.6

función moverPosicion(mapa, {semana, dia}, tecla):
    según tecla:  ArrowUp → dia - 1;  ArrowDown → dia + 1;
                  ArrowLeft → semana - 1;  ArrowRight → semana + 1
    si la nueva posición está fuera de 0..11 × 0..6 o es un hueco:
        devolver la posición original                       # CA-9.2
    devolver la nueva posición
```

Rendimiento (RNF-8): un solo recorrido de las sesiones más 84 días. Con 5 000 sesiones son
unas 5 000 operaciones sencillas, muy por debajo de 100 ms.

---

## 4. Cómo se pinta en la interfaz

### 4.1 HTML fijo (en `index.html`) — RF-5, RF-6 (CA-6.1)

Nueva `<section class="seccion">` justo después de la sección de la racha, que es donde
está la fila mejor racha / semana / mes:

- `<h2 id="mapa-titulo">Últimas 12 semanas</h2>`: mismo nivel y estilo que "Registrar
  sesión" y "Sesiones" (CA-6.1, RNF-7).
- `<div id="mapa" class="mapa" role="grid" aria-labelledby="mapa-titulo">`: vacío; lo
  rellena `app.js`.
- `<p id="mapa-detalle" class="mapa-detalle">`: la línea de detalle.
- `<div id="mapa-leyenda" class="mapa-leyenda">`: vacío; lo rellena `app.js` a partir de
  `TRAMOS_LEYENDA`.

### 4.2 Estructura que genera `app.js` — RF-1, 4, 6, 9

El mapa se construye **por filas** (una por día de la semana), porque así lo exige el
patrón *grid* de accesibilidad (D-5):

```
#mapa
├── fila de meses   (aria-hidden="true"): [hueco de etiqueta] + 12 etiquetas de mes
├── fila "lun"      (role="row"): [etiqueta "lun" (role="rowheader")] + 12 días
├── …
└── fila "dom"      (role="row"): [etiqueta "dom"] + 12 días
```

- **Día con datos:**
  - Elemento `div` con `role="gridcell"` y clases `dia nivel-N`.
  - `aria-label` = `texto` del modelo (CA-9.4, RNF-5).
  - `data-semana` y `data-dia` con su posición.
  - `tabindex="-1"`, salvo el que da `fechaConParadaTab`, que lleva `tabindex="0"`. Así el
    mapa es una sola parada del tabulador (CA-9.1).
- **Hueco:** `div` vacío con clase `hueco` y `aria-hidden="true"`, sin rol, sin tabindex y
  sin color (CA-4.1).
- **Etiquetas de día:** `DIAS_CORTOS` (CA-6.2). **Etiquetas de mes:** `etiquetasMes` (CA-6.3, 6.4).
- **Leyenda:** "Menos", 5 cuadros `nivel-0`…`nivel-4` con `title` y `aria-label`
  sacados de `TRAMOS_LEYENDA` y `role="img"`, y "Más" (CA-6.6, 6.7).
- Todo se crea con `document.createElement` y `textContent`, como ya hace `mostrarLista()`
  (D-9).

### 4.3 Estado y eventos en `app.js` — RF-5, RF-7, RF-9

- Variables: `mapaActual` (último modelo), `diaApuntado` y `diaSeleccionado` (fechas o `null`).
- `mostrarMapa()`:
  1. `mapaActual ← calcularMapa(sesiones, hoyTexto())`. Siempre con la fecha del momento (CA-7.3).
  2. `diaSeleccionado ← null`, `diaApuntado ← null` (CA-5.9).
  3. Vaciar `#mapa` y volver a construirlo; poner en la línea de detalle `TEXTO_DETALLE_INICIAL`.
- `mostrarTodo()` llama también a `mostrarMapa()`. Como `mostrarTodo()` ya se ejecuta al
  cargar la página y tras guardar una sesión, se cumplen CA-7.1 y CA-7.2 sin más cambios.
- **Un solo escuchador por evento en `#mapa`** (delegación, D-10), que no hay que volver a
  añadir cada vez que se repinta:

  | Evento | Acción | CA |
  |--------|--------|----|
  | `mouseover` sobre un `.dia` | `diaApuntado ← su fecha`; actualizar la línea con `textoLineaDetalle`. | 5.5 |
  | `mouseleave` de `#mapa` | `diaApuntado ← null`; actualizar la línea. | 5.6 |
  | `click` sobre un `.dia` (ratón o dedo) | Seleccionar ese día: dar el foco a su celda; el resto lo hace `focusin`. | 5.7 |
  | `focusin` sobre un `.dia` | `diaSeleccionado ← su fecha`. Quitar la marca y `tabindex="0"` del anterior y ponerlos en este (`aria-selected="true"`, clase `seleccionado`). Actualizar la línea. | 5.7, 9.3, 9.1 |
  | `keydown` con una flecha | `moverPosicion`; si cambia, `preventDefault()` (para que la página no se desplace) y dar el foco a la nueva celda. | 9.2 |

  - Tocar fuera del mapa o el mismo día no cambia la selección, porque no hay ninguna
    acción para eso (CA-5.7).
  - En un dispositivo con ratón y dedo a la vez, manda el último evento (caso límite).
  - Ninguno de estos eventos toca `sesiones`, `localStorage` ni la lista (CA-5.8, CA-8.4).
- La línea de detalle **no** lleva `aria-live`: el lector ya lee la etiqueta del día al
  recibir el foco, y con `aria-live` lo leería dos veces (D-11).

### 4.4 Estilos (`styles.css`) — RF-3, RF-6 · RNF-3, 4, 7

- **Colores en `:root`** (D-12). Los valores se ajustan al verificar el contraste con
  DevTools:

  | Variable | Valor propuesto | Contraste con `--papel` | CA |
  |----------|-----------------|-------------------------|----|
  | `--nivel-0` | `#c0c9d8` (gris azulado neutro) | ≈ 1,6:1 (mínimo 1,5:1) | 3.2, 3.3 |
  | `--nivel-1` | `#a8bbe8` | — | 3.2 |
  | `--nivel-2` | `#6f8fd6` | — | 3.2 |
  | `--nivel-3` | `#3d62bf` | — | 3.2 |
  | `--nivel-4` | `var(--tinta)` `#1d3b8f` | ≈ 10:1 (mínimo 3:1) | 3.2, 3.3 |

- **Rejilla:** cada fila es una rejilla CSS con las mismas columnas:
  `grid-template-columns: var(--ancho-etiqueta) repeat(12, var(--tam-dia))` y `gap: 4px`.
  - Móvil (≤ 480 px): `--tam-dia: 20px`, `--ancho-etiqueta: 20px` y etiquetas a `0.7rem`.
    La distancia entre centros es 20 + 4 = **24 px** (RNF-3).
  - Escritorio: `--tam-dia: 26px` y `--ancho-etiqueta: 28px`. Los tamaños son fijos, así
    que el mapa no se estira y queda alineado a la izquierda, como el resto (RNF-4).
  - **Cálculo del ancho en el móvil (360 px):** el contenido útil es
    360 − 12 (margen) − 2 (línea roja) − 20 − 16 (rellenos) = **310 px**.
    El mapa mide 20 + 4 + 12 × 20 + 11 × 4 = **308 px**. Cabe, pero con solo 2 px de
    sobra (ver riesgo R-1).
- **Zoom o letra grande:** `#mapa` lleva `overflow-x: auto`. Si no cabe, se desplaza el
  mapa, nunca la página (RNF-3).
- **Etiquetas de mes:** `white-space: nowrap` y sin recorte, para que pasen por encima de
  las columnas siguientes, que no tienen etiqueta (CA-6.5).
- **Hueco:** sin fondo ni borde (CA-4.1).
- **Seleccionado:** contorno de 2 px de `--grafito`. **Foco visible:** contorno de 3 px de
  `--fosforito`, igual que en los campos y el botón actuales.
- **Línea de detalle:** texto `--grafito`, sin `nowrap`, para que pueda partirse con
  minutos enormes (caso límite).
- **Leyenda:** en fila, cuadros de 12 px y texto de `0.85rem` en `--grafito-suave`.
- **Sin animaciones ni fosforito de relleno, y el título igual que los demás `h2`** (RNF-7).

---

## 5. Decisiones técnicas

| # | Decisión | Por qué | Alternativa descartada |
|---|----------|---------|------------------------|
| D-1 | Lógica pura en un archivo nuevo `logica.js`. | `tests.html` necesita cargar la lógica sin `app.js`, que nada más cargarse busca elementos de la página y añade escuchadores. Además cumple el principio 3. | Dejarlo todo en `app.js`: en `tests.html` fallaría al no encontrar los elementos. |
| D-2 | Mover sin cambios `fechaATexto`, `textoAFecha`, `diaAnterior`, `inicioDeSemana` y `formatearMinutos` a `logica.js`. | Las funciones nuevas las necesitan y deben poder probarse. Moverlas no cambia su comportamiento: los scripts clásicos comparten las funciones globales. | Copiarlas: habría dos versiones que acabarían siendo distintas. Adaptar también racha, semana y mes: la spec lo deja fuera. |
| D-3 | Fechas como texto "AAAA-MM-DD" en todas las funciones, y `new Date(a, m - 1, d)` solo dentro de ellas. | El texto se compara y se ordena directamente, y no depende de la zona horaria. Construir la fecha por partes es inmune a UTC y al cambio de hora. | Pasar objetos `Date` o sumar `86 400 000 ms`: el día del cambio de hora dura 23 o 25 horas, y eso salta o repite días. |
| D-4 | Abreviaturas con listas fijas (`DIAS_CORTOS` y `MESES_CORTOS`). | La spec exige "sep", sin comas ni puntos. | `toLocaleDateString("es-ES", …)`: da "sept", "lun, 3 ago 2026" y cambia según el navegador. |
| D-5 | El DOM se organiza por filas (día de la semana) con `role="grid"`, `row` y `gridcell`. | El patrón *grid* de accesibilidad exige filas, y las flechas tienen un significado estándar. Visualmente sigue habiendo columnas por semana. | Organizarlo por columnas: no encaja con el patrón *grid* y los lectores leerían mal la estructura. |
| D-6 | Una sola parada del tabulador con *roving tabindex* (`tabindex` 0 en un día y −1 en el resto). | Lo decide la spec (CA-9.1): 84 paradas con Tab serían agotadoras. | Un `tabindex="0"` en cada día. |
| D-7 | Línea de detalle fija y `aria-label` en cada día. | Lo decide la spec: no se corta en los bordes y sirve para ratón, dedo y teclado. | El atributo `title` como globo: no funciona con el dedo ni con el teclado. |
| D-8 | Volver a construir el mapa entero cada vez que se llama a `mostrarTodo()`. | Son 84 celdas: es instantáneo y mucho más fácil de entender. | Actualizar solo las celdas que cambian: más código y más fácil equivocarse. |
| D-9 | `createElement` + `textContent`. | Es lo que ya hace `mostrarLista()` y evita problemas con caracteres especiales. | Montar HTML como texto con `innerHTML`. |
| D-10 | Escuchadores delegados en `#mapa`, que se añaden una sola vez. | Como el mapa se repinta, los escuchadores puestos en cada celda se perderían o se duplicarían. | Un escuchador por celda. |
| D-11 | Sin `aria-live` en la línea de detalle. | El lector ya anuncia la etiqueta del día con foco; con `aria-live` lo diría dos veces. | `aria-live="polite"`. |
| D-12 | Colores de nivel como variables en `:root`. | Es la convención del proyecto (`MEMORY.md`) y facilita ajustar el contraste. | Colores escritos directamente en cada regla. |
| D-13 | Minutos por día en un objeto normal `{ fecha: minutos }`. | Es más fácil de leer para quien empieza. | `Map`: más correcto en teoría, pero sin ventaja con claves que siempre son texto. |
| D-14 | Leyenda generada a partir de `TRAMOS_LEYENDA`. | Una sola fuente para los textos, y se pueden probar en `tests.html`. | Escribir la leyenda a mano en `index.html`: los tramos no se podrían probar. |
| D-15 | Pruebas en `tests.html` con un mini comprobador propio. | Lo exige el principio 4 y lo confirmó el usuario. | `node --test`: obliga a instalar Node y a añadir `module.exports` (va contra los principios 1 y 4; ya se había descartado). Una librería de pruebas: está prohibida (sin dependencias). |
| D-16 | Validación propia del mapa (`esSesionValida`), sin tocar `cargarSesiones()`. | La spec deja fuera validar la racha, la semana, el mes y la lista. Cambiar la carga afectaría a todo. | Filtrar las sesiones no válidas al cargarlas: cambiaría las demás cifras. |

---

## 6. Estrategia de tests (`tests.html`)

### 6.1 Cómo funciona

- Se abre `tests.html` con doble clic, igual que `index.html`. No se instala nada.
- Carga `<script src="logica.js">` y después un `<script>` propio con:
  - `prueba(nombre, función)`: ejecuta la función y anota si pasa o falla. Si salta un
    error, cuenta como fallo.
  - `igual(obtenido, esperado)`: compara con `JSON.stringify` (sirve para textos, números,
    listas y objetos).
- La página muestra el resumen **"X de Y pruebas superadas"** en verde o en rojo y,
  debajo, cada prueba con "OK" o "FALLO". Para cada fallo enseña el valor obtenido y el
  esperado, y también lo escribe con `console.error`.
- Cada prueba empieza por el criterio que comprueba, por ejemplo
  `"CA-3.1: 29 min → nivel 1"`. Así se ve qué regla falla (principio 4).
- Siempre se pasa un "hoy" fijo: las pruebas no dependen del día en que se ejecutan.
- Antes de cada commit hay que abrir `tests.html` y ver que todas pasan.

### 6.2 Fechas de referencia

| "hoy" | Por qué |
|-------|---------|
| `2026-10-04` (domingo) | Semana actual completa. |
| `2026-10-05` (lunes) | Columna actual con 1 día y 6 huecos. |
| `2026-09-30` (miércoles) | El 1 de octubre cae en un hueco futuro. |
| `2026-06-01` (lunes, día 1) | La columna actual lleva la etiqueta "jun". |
| `2027-01-01` (viernes) | Cruce de año; etiqueta "ene" sin año. |
| `2027-02-25` | El 1 de diciembre queda fuera, pero la 1.ª columna lleva "dic" por CA-6.4. |
| `2027-03-10` | El 1 de enero cae en la 2.ª columna: la 1.ª se queda sin etiqueta y no hay "dic". |
| `2028-03-05` | El periodo incluye el 29 de febrero de 2028. |
| `2026-04-05` y `2026-11-01` | El periodo incluye un cambio de hora (en Europa: 29 de marzo y 25 de octubre de 2026). |

### 6.3 Pruebas por requisito

| RF | CA | Pruebas |
|----|----|---------|
| RF-1 | 1.1 | `calcularMapa([], hoy).semanas` tiene 12 columnas y la primera empieza en el lunes más antiguo. |
| | 1.2 | En cada columna, el día de índice 0 es lunes y el de índice 6 es domingo (comprobado con `formatearFechaCorta`). |
| | 1.3 | Con `2026-10-04`: el primer día es `2026-07-13` y el último dibujado es `2026-10-04`. Con `2026-10-05`: el primer día es `2026-07-20`. |
| | 1.4 | `lunesDeLaSemana` y `sumarDias` solo devuelven fechas construidas en hora local. Con hoy `2026-10-05` sale `2026-10-05`, y no el domingo anterior que daría UTC. |
| | 1.5 | Para cada fecha de referencia: las fechas no vacías son todas distintas, cada una es el día siguiente de la anterior y en total son 77 + (días de la semana actual). Incluye el 29-02-2028 y las fechas con cambio de hora. |
| RF-2 | definición | `esFechaValida`: "2026-08-03" → sí; "2026-8-3", "2026-08-03T10:00", 20260803, "", `undefined` y "2026-02-30" → no. `esSesionValida`: `null`, números, `minutos` "45", 0, −5, 1,5, `NaN` o ausentes y claves en inglés → no; sin tema o con `id` repetido → sí. |
| | 2.1 | Tres sesiones el mismo día (20 + 15 + 10) → 45. Dos sesiones idénticas → se suman las dos. Una válida (30) y una no válida el mismo día → 30. |
| | 2.2 | Llamar dos veces a `calcularMapa` con las mismas entradas da el mismo resultado y no modifica la lista de entrada (se compara una copia de antes y otra de después). |
| | 2.3 | Una sesión del domingo anterior al primer lunes y otra de mañana no aparecen. |
| RF-3 | 3.1 | `calcularNivel`: 0 → 0; 1 → 1; 29 → 1; 30 → 2; 59 → 2; 60 → 3; 119 → 3; 120 → 4; 900 → 4; 1 000 000 → 4. |
| RF-4 | 4.1 | Con hoy lunes, las posiciones 1–6 de la última columna están vacías (son huecos). Con hoy domingo no hay ningún hueco. Una sesión de mañana no rellena su hueco. |
| RF-5 | 5.1 | `textoDetalle("2026-08-03", 75)` → "lun 3 ago 2026: 1 h 15 min". |
| | 5.2 | `formatearFechaCorta` para cada día de la semana y cada mes (incluido "sep" y "mié"), y "2026-01-05" → "lun 5 ene 2026" (sin cero). |
| | 5.3 | `formatearMinutos`: 0 → "0 min"; 45 → "45 min"; 60 → "1 h"; 105 → "1 h 45 min"; 120 → "2 h"; 1 000 000 → "16666 h 40 min". |
| | 5.4–5.6 | `textoLineaDetalle`: sin apuntada ni seleccionada → texto inicial; solo seleccionada → su texto; apuntada y seleccionada → el de la apuntada; fecha que no está en el mapa → se ignora. |
| | 5.7, 5.9 | Lógica: `fechaConParadaTab` (ver 9.1). La conexión con la página se verifica a mano (7.2). |
| | 5.8 | `calcularMapa` y las funciones de navegación no modifican la lista de sesiones (copia antes y después). |
| RF-6 | 6.2 | `DIAS_CORTOS` es exactamente la lista de la spec. |
| | 6.3 | `2026-10-04` → "ago" en la columna 2 (27 jul–2 ago, donde cae el sábado 1), "sep" en la columna 7 (31 ago–6 sep) y "oct" en la columna 11 (28 sep–4 oct); las columnas 1, 3–6 y 8–10 vacías. `2026-09-30` → la columna 11 no tiene "oct" (el 1 de octubre es un hueco). `2026-06-01` → la columna 11 tiene "jun". `2027-01-01` → la columna 11 tiene "ene", sin año. |
| | 6.4 | `2026-10-04` → la columna 0 (empieza el 13 de julio) lleva "jul", porque ni ella ni la 1 tienen etiqueta. `2027-03-10` → la columna 1 (28 dic–3 ene) lleva "ene" y la columna 0 (21 dic) queda vacía: no hay "dic". `2027-02-25` → la columna 0 (empieza el 7 de diciembre) lleva "dic", porque el 1 de enero cae en la columna 3. |
| | 6.6, 6.7 | `TRAMOS_LEYENDA` tiene 5 textos, exactamente los de la spec y en orden. |
| | 6.8 | Todas las constantes de texto están en español (comprobado por igualdad con las de la spec). |
| RF-7 | 7.3 | `calcularMapa(s, "2026-10-04")` y `calcularMapa(s, "2026-10-05")` dan periodos distintos: el mapa depende del "hoy" que se le pasa. |
| RF-8 | 8.1 | `calcularMapa([], hoy)`: todos los días no vacíos tienen nivel 0 y "0 min". |
| | 8.2 | Una lista con elementos no válidos mezclados con válidos → solo cuentan los válidos, sin errores. |
| | 8.3 | `calcularMapa(valor, hoy)` con `null`, `{}`, `"texto"` y `42` → igual que con `[]`. |
| | 8.4 | Igual que 2.2: la entrada queda intacta. |
| RF-9 | 9.1 | `fechaConParadaTab`: sin selección → hoy; con una selección que está en el mapa → la selección; con una selección fuera del mapa → hoy. |
| | 9.2 | `moverPosicion`: las cuatro flechas en el centro; arriba desde el lunes, abajo desde el domingo, izquierda en la columna 0 y derecha en la 11 → no se mueve; derecha o abajo hacia un hueco → no se mueve. |
| | 9.4 | El `texto` de cada día del modelo es igual a `textoDetalle(fecha, minutos)`. |
| RNF-8 | — | Prueba informativa: `calcularMapa` con 5 000 sesiones generadas tarda menos de 100 ms (se mide con `performance.now()`). |

Una vez escritos, los casos límite de la sección 6 de la spec que se pueden calcular
quedan todos cubiertos por la tabla anterior.

---

## 7. Cobertura y verificación manual

### 7.1 Matriz de cobertura RF → partes del plan

| RF | Lógica (§2–3) | Interfaz (§4) | Tests (§6) | Manual (§7.2) |
|----|---------------|---------------|------------|---------------|
| RF-1 Periodo | `calcularMapa`, `lunesDeLaSemana`, `sumarDias` | Construcción por filas y columnas | ✔ | — |
| RF-2 Sesiones válidas y minutos | `esSesionValida`, `esFechaValida`, `calcularMinutosPorDia` | — | ✔ | — |
| RF-3 Nivel | `calcularNivel` | Clases `nivel-N` y variables de color | ✔ (3.1) | ✔ (3.2, 3.3) |
| RF-4 Huecos | `calcularMapa` (sin día = hueco) | `div.hueco` con `aria-hidden` | ✔ | ✔ (aspecto) |
| RF-5 Detalle | `textoDetalle`, `formatearFechaCorta`, `textoLineaDetalle` | `#mapa-detalle` y eventos | ✔ | ✔ (5.5–5.7, 5.9) |
| RF-6 Título y etiquetas | `calcularEtiquetasMes`, constantes | `h2`, fila de meses, leyenda | ✔ | ✔ (6.1, 6.5) |
| RF-7 Actualización | `calcularMapa(…, hoy)` | `mostrarMapa()` dentro de `mostrarTodo()` | ✔ (7.3) | ✔ (7.1, 7.2) |
| RF-8 Datos no válidos | `comoLista`, `esSesionValida` | — | ✔ | ✔ (almacenamiento bloqueado) |
| RF-9 Teclado y lector | `moverPosicion`, `fechaConParadaTab`, `posicionDeFecha` | *Roving tabindex*, `aria-label`, `role` | ✔ | ✔ (lector, Tab) |

### 7.2 Verificación manual (MCP de Chrome DevTools, contexto aislado)

1. Abrir `index.html` sin sesiones: el mapa está completo en nivel 0, los días futuros son
   huecos y la consola no muestra errores (CA-8.1).
2. Guardar sesiones de 15, 45, 90 y 150 minutos en días distintos: el mapa se repinta al
   momento con los niveles 1–4 y la selección se borra (CA-7.1, 7.2, 5.9).
3. Pasar el ratón, salir del mapa, hacer clic, volver a hacer clic en el mismo día y hacer
   clic fuera (CA-5.5–5.7).
4. Teclado: llegar con Tab al mapa (cae en hoy), recorrerlo con las flechas por los bordes
   y los huecos, y comprobar que la página no se desplaza (CA-9.1–9.3).
5. Árbol de accesibilidad: el título, el *grid*, la cabecera de cada fila, la etiqueta de
   cada día, los huecos ocultos y la leyenda con sus tramos (CA-9.4, 6.7).
6. Contraste de `--nivel-0` y `--nivel-4` con el panel de contraste de DevTools (CA-3.3).
7. Ver a 360 × 740: sin desplazamiento horizontal de la página y distancia entre centros
   de 24 px. Repetir en horizontal, con zoom al 200 % (solo se desplaza el mapa) y a
   1280 px (el mapa no se estira) (RNF-3, RNF-4).
8. Bloquear el almacenamiento o poner en la clave un valor que no sea una lista: el mapa
   sale vacío, sin errores, y la clave no cambia (CA-8.3, 8.4).
9. Abrir `tests.html`: todas las pruebas pasan.

### 7.3 Ajustes de etiquetas en la spec (mismo commit que el código)

`tests.html` no puede cargar `index.html` cuando se abre con `file://`: el navegador lo
impide por seguridad. Por eso la parte de "conectar con la página" de estos criterios no
se puede probar automáticamente. La lógica de la que dependen sí se prueba.

Propuesta: cambiar su etiqueta de [auto] a **[auto + manual]**.

| CA | Parte automática (en `tests.html`) | Parte manual |
|----|------------------------------------|--------------|
| 5.4 | El texto inicial (`textoLineaDetalle`). | Que el texto se muestre en la página. |
| 5.7 | — | Seleccionar con clic o dedo. |
| 5.9 | — | Que la selección se borre al repintar. |
| 6.6 | Los tramos de la leyenda. | Que la leyenda se pinte. |
| 7.1 | — | Que el mapa salga al cargar la página. |
| 7.2 | — | Que el mapa se repinte al guardar. |
| 9.1 | `fechaConParadaTab`. | Que el tabulador llegue a ese día. |
| 9.3 | — | Que recibir el foco seleccione el día. |

---

## 8. Riesgos

- **R-1. Margen mínimo en el móvil:** sobran solo 2 px a 360 px. Si cambia el relleno del
  `.contenedor` o la fuente de las etiquetas de día, la página podría desplazarse en
  horizontal. Se mitiga con el ancho fijo de la columna de etiquetas (20 px) y con
  `overflow-x: auto` en el mapa, y se comprueba en el paso 7 de la verificación manual.
- **R-2. Los colores propuestos se han estimado a mano.** Hay que medir los contrastes en
  DevTools antes de darlos por buenos.
- **R-3. Prueba del cambio de hora:** solo es significativa si el equipo tiene una zona
  horaria con horario de verano (por ejemplo, Europe/Madrid). En otras zonas pasa igual,
  pero no comprueba nada especial.
- **R-4. Años 0–99:** `new Date(a, m, d)` interpreta esos años como 1900–1999, así que
  `esFechaValida("0050-01-01")` dará `false`. No afecta al mapa, porque esas fechas siempre
  quedarían fuera del periodo, pero queda anotado.
- **R-5. D-2 toca código que ya funciona** (lo mueve, pero no lo cambia). Hay que
  comprobar en la verificación manual que la racha, la semana y el mes siguen dando los
  mismos valores.

## 9. Orden de implementación sugerido

1. Crear `logica.js` con las funciones movidas (D-2), cargarlo antes de `app.js` y
   comprobar que la aplicación sigue igual.
2. Crear `tests.html` con el comprobador y las pruebas de las funciones movidas.
3. Añadir las funciones puras nuevas, con sus pruebas al mismo tiempo (§6.3), hasta que
   todo pase.
4. Añadir la sección a `index.html` y `mostrarMapa()` a `app.js`, sin eventos.
5. Añadir los estilos (§4.4) y comprobarlos en el móvil y en escritorio.
6. Añadir los eventos de ratón, dedo y teclado (§4.3).
7. Hacer la verificación manual (§7.2). Actualizar la spec (§7.3), `README.md`,
   `AGENTS.md` y `MEMORY.md`. Hacer un único commit con la spec y el código juntos.

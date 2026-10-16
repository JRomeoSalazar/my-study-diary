# Plan de implementación: Rediseño visual "Brote"

**Rama**: `feature/sprout-redesign` (carpeta `002-sprout-redesign`) | **Fecha**: 2026-10-16 |
**Spec**: `specs/002-sprout-redesign/spec.md` (aprobada el 2026-10-16)

**Entrada**: spec aprobada con sus Clarificaciones (sesión 2026-10-16).

## Resumen

Cambiar el aspecto del diario del "cuaderno de cuadros" al estilo Brote: paleta verde, tarjetas
blancas redondeadas, Bricolage Grotesque + Figtree y dos columnas desde 1024 px. Es un cambio
casi solo de `index.html` (estructura en tarjetas y columnas) y `styles.css` (reescritura de
estilos). La única lógica nueva es la inicial de la insignia: una función pura
`inicialDelTema(tema)` en `logica.js`, con sus pruebas escritas antes en `tests.html`. En
`app.js` solo cambia `mostrarLista()` para pintar la insignia. Dos SVG nuevos (autorizados por
el usuario) para los iconos del brote. No cambian datos, cálculos ni textos.

## Contexto técnico

**Lenguaje**: HTML, CSS y JavaScript puros (scripts clásicos, sin `type="module"`).

**Dependencias**: ninguna. Google Fonts por `<link>`, como ya se hace (RNF-3).

**Almacenamiento**: `localStorage`, clave `diario-estudio-sesiones`, sin cambios (RNF-1).

**Pruebas**: `tests.html` (funciones `prueba()` e `igual()`, nuevas pruebas antes de
`mostrarResultados()`). Nunca `node --test`. El resto se verifica a mano con el MCP de Chrome
DevTools (`quickstart.md`).

**Plataforma**: navegador de escritorio y móvil abriendo `index.html` con doble clic (`file://`).

**Tipo de proyecto**: web estática de una página.

**Rendimiento**: sin objetivos nuevos; la animación es solo CSS y se ejecuta una vez.

**Restricciones**: `file://` (nada de `fetch` ni módulos), contraste WCAG (RNF-4, RF-6), 360 px
sin scroll horizontal (RNF-5), `prefers-reduced-motion` (RNF-7).

**Alcance**: 4 archivos modificados (`index.html`, `styles.css`, `logica.js`, `app.js`),
`tests.html` ampliado, 2 SVG nuevos, `README.md` y `MEMORY.md` actualizados. Documentación nueva
en `specs/002-sprout-redesign/`: `plan.md`, `research.md`, `data-model.md`, `quickstart.md`,
`tasks.md`, `contracts/inicial-del-tema.md` y `contracts/estructura-html.md`.

## Comprobación de la constitución

*Antes de la fase 0 y otra vez tras la fase 1.*

| Principio | ¿Cumple? | Cómo |
|-----------|----------|------|
| I. Stack mínimo | Sí | Solo HTML/CSS/JS. SVG con `<img src>` (funciona con `file://`, sin `fetch`). `Intl.Segmenter` y `:has()` son del navegador, no dependencias. Sin build ni `type="module"`. |
| II. La spec manda | Sí | Spec aprobada. Las tareas cierran §9 de la spec; spec y código van en el mismo commit (lo hace el usuario). |
| III. Lógica separada | Sí | `inicialDelTema(tema)` es pura en `logica.js`. `app.js` solo pinta. Los demás cálculos no se tocan. |
| IV. Cada regla tiene su test | Sí, con excepción aceptada por el usuario (ver "Seguimiento de complejidad") | CA-8.5 y CA-8.6 ([auto]) tienen pruebas en `tests.html`, escritas antes de la función. Los criterios [manual] (colores, distribución, animación) no se pueden comprobar desde `tests.html` por `file://`; se verifican con `quickstart.md`. Las 133 pruebas existentes deben seguir pasando (RNF-2). |
| V. Datos sagrados | Sí | No cambia el formato ni se guarda nada nuevo. La inicial se calcula al pintar. |
| VI. Todo en español | Sí | Nombres nuevos en español (`inicialDelTema`, `.tarjeta`, `.cifras`, `icono-brote.svg`...). La carpeta `002-sprout-redesign` es la excepción aceptada por el usuario. |

Reglas de fechas (`AGENTS.md`, skill `local-dates`): no se escribe código nuevo de fechas. Las
funciones de racha, semana, mes y mapa no se tocan.

**Resultado**: se puede seguir, con la excepción justificada del principio IV. Revisado de nuevo
tras la fase 1: sin cambios.

## Estructura del proyecto

### Documentación (esta funcionalidad)

```text
specs/002-sprout-redesign/
├── spec.md          # Spec aprobada (con Clarificaciones)
├── plan.md          # Este archivo
├── research.md      # Decisiones técnicas (fase 0)
├── data-model.md    # Datos: sin cambios + inicial calculada (fase 1)
├── quickstart.md    # Guía de verificación (fase 1)
├── contracts/
│   ├── inicial-del-tema.md   # Contrato de inicialDelTema()
│   └── estructura-html.md    # ids y orden que necesita app.js
└── tasks.md         # Lo crea /speckit-tasks
```

### Código (raíz del repositorio)

```text
index.html        # MODIFICAR: fuentes, cabecera con icono, columnas, tarjetas, quitar .fosforito
styles.css        # REESCRIBIR estilos: paleta, tarjetas, columnas, racha, cifras, mapa, formulario, lista
logica.js         # AÑADIR inicialDelTema(tema)
app.js            # MODIFICAR solo mostrarLista(): insignia
tests.html        # AÑADIR pruebas de inicialDelTema (antes que la función)
icono-brote.svg   # NUEVO (autorizado): brote de la cabecera
brote-racha.svg   # NUEVO (autorizado): brote grande de la tarjeta de la racha
README.md         # ACTUALIZAR: aspecto, archivos nuevos
MEMORY.md         # ACTUALIZAR al terminar
```

**Decisión de estructura**: se mantiene la estructura plana del proyecto; los dos SVG van en la
raíz, junto a `index.html`.

## Diseño

### D-1. Lógica: `inicialDelTema(tema)` (CA-8.5, CA-8.6)

En `logica.js`, sección nueva "Sesiones: insignia". Contrato y ejemplos en
`contracts/inicial-del-tema.md`; elección de `Intl.Segmenter` en `research.md` R-1. Primero se
escriben las pruebas en `tests.html` (fallan en rojo porque la función no existe) y después la
función.

### D-2. Estructura de `index.html` (RF-1, RF-2, CA-2.3)

Orden y ids en `contracts/estructura-html.md`. Puntos clave:
- `<header class="cabecera">` con `<span class="logo" aria-hidden="true"><img src="icono-brote.svg" alt=""></span>` y el `<h1>`.
- `<div class="columnas">` con `.columna-principal` (racha, cifras, mapa) y `.columna-lateral`
  (formulario, sesiones). Cada parte es una tarjeta (`.tarjeta`).
- Las tarjetas de semana y mes llevan las clases `cifra-semana` y `cifra-mes` (decisión del
  usuario), para colocarlas en la rejilla del móvil.
- Tarjeta de la racha: "Racha actual", `<p class="racha-numero"><span id="racha-dias">` (sin
  `fosforito`), `#racha-texto` y `<img class="racha-brote" src="brote-racha.svg" alt="">`.
- Las tres cifras salen de la racha a su propio `<dl class="cifras">`; cada `<div>` lleva
  `class="tarjeta cifra"` y se mantienen `#mejor-racha` (con `hidden`), `#mejor-racha-valor`,
  `#minutos-semana` y `#dias-mes`.
- El `<link>` de Google Fonts pasa a Bricolage Grotesque + Figtree (`research.md` R-7).

### D-3. Estilos (`styles.css`)

- **Sin `var()` rotos**: al cambiar las variables, toda referencia a una variable antigua se
  sustituye por la nueva (`--tinta` → `--bosque`, `--tinta-oscura` → `--texto` o un verde más
  oscuro, `--fosforito` → `--foco`, `--margen` → `--error`, `--grafito` → `--texto`,
  `--grafito-suave` → `--texto-suave`).
- **Variables en `:root`** (paleta de la spec §4 + `research.md` R-3 y R-4): `--fondo #EDF1EC`,
  `--tarjeta #FFFFFF`, `--texto #15241C`, `--texto-suave #56645B`, `--bosque #1E5A3E`,
  `--bosque-claro #CFE8D7`, `--relleno #F4F7F4`, `--insignia #DCEFE2`, `--error #B42318`,
  `--foco #2E8B57`, `--nivel-0` … `--nivel-4`, y las fuentes `--letra-titulos` y `--letra-texto`.
  Se mantienen `--tam-dia`, `--ancho-etiqueta` y `--espacio-dia` del mapa.
- **Se eliminan**: cuadrícula del `body`, `border-left` rojo de `.contenedor`, `.fosforito` y su
  `@keyframes`, las variables del cuaderno (`--papel`, `--cuadricula`, `--tinta`, `--tinta-oscura`,
  `--grafito`, `--grafito-suave`, `--margen`, `--fosforito`) y las reglas `.racha-datos`,
  `.racha-cifra`, `.racha-titulo` y `.seccion` si dejan de usarse.
- **`hidden`**: `.vacio[hidden]` (o una regla general `[hidden] { display: none; }`) para que el
  mensaje vacío no reaparezca si su regla le da `display`.
- **Tarjeta** (`.tarjeta`): fondo blanco, `border-radius` ~16-20 px, relleno ~20-24 px (menos en
  móvil), sombra o borde muy suave.
- **Columnas** (`research.md` R-5): una columna por defecto; `@media (min-width: 1024px)` →
  `grid-template-columns: minmax(0, 1fr) 390px`. `.contenedor` con `max-width: 1180px` centrado.
  `min-width: 0` en las columnas para que el mapa y los temas largos no ensanchen la página.
- **Relleno en el móvil (≤ 480 px)**: el relleno lateral de `.contenedor` + `.tarjeta` suma
  como máximo 26 px por lado (p. ej. 12 + 14), porque el mapa mide 308 px fijos y a 360 px
  quedan 360 − 2 × 26 = 308 px. Así el mapa no necesita scroll horizontal a 360 px.
- **Racha** (RF-3): fondo `--bosque`; etiqueta y "días seguidos" en `--bosque-claro`; número en
  blanco, `font-size: 6rem` (96 px) y `5rem` (80 px) a ≤ 480 px; `position: relative` y
  `overflow: hidden` para el `.racha-brote` (absoluto a la derecha). `.racha-brote` con
  `display: none` por debajo de 1024 px (CA-3.3).
- **Animación** (`research.md` R-6): `@keyframes aparecer` en `.racha-numero`; anulada con
  `prefers-reduced-motion: reduce`.
- **Cifras** (RF-4, `research.md` R-5): `.cifras` en rejilla; > 480 px una fila
  (`grid-auto-flow: column; grid-auto-columns: 1fr`); ≤ 480 px áreas `"mejor mes" "semana semana"`
  (asignadas con `#mejor-racha` y las clases `.cifra-semana` y `.cifra-mes` del HTML)
  y, con `.cifras:has(#mejor-racha[hidden])`, `"semana mes"`. Regla `.cifra[hidden] { display: none; }`.
  Valores con `white-space: nowrap` y cifras de ancho fijo (CA-1.2, CA-4.5).
- **Mapa** (RF-5, RF-6): tarjeta; colores de nivel nuevos; `.dia` con `border-radius` ~5 px;
  `.mapa-detalle` como píldora (`--relleno`, `border-radius: 999px`); `.dia.seleccionado` →
  `outline: 2px solid var(--texto)`; `.dia:focus-visible` → anillo de 3 px `--foco` con
  `outline-offset: 2px`; seleccionado + foco → `box-shadow: inset 0 0 0 2px var(--texto)` + el
  anillo (como hoy). Leyenda con las mismas clases `.nivel-N`. Se mantiene todo lo de la spec 001
  (scroll del mapa, tamaños en móvil).
- **Formulario** (RF-7): `input` con fondo `--relleno`, borde 1 px, radio ~12 px, `min-height: 44px`,
  `::placeholder` en `--texto-suave`; foco con anillo de 3 px `--foco`; botón píldora `--bosque`
  a todo el ancho (`align-self: stretch`), `min-height: 44px`; `.error` en `--error`.
- **Lista** (RF-8): `.sesion` en fila flex: `.sesion-insignia` (cuadrado ~36-40 px, `--insignia`,
  texto `--bosque`, `flex-shrink: 0`), bloque de texto con `flex: 1; min-width: 0`, y
  `.sesion-minutos` como píldora (`--fondo`, texto `--bosque`,
  `font-variant-numeric: lining-nums tabular-nums`, `max-width: 100%`, `overflow-wrap: anywhere`).
  Separación con línea fina (`border-top` desde la segunda sesión). Sin altura fija ni scroll
  interno (§7).

### D-4. `app.js`: solo `mostrarLista()` (CA-8.4)

Antes de añadir `info` al `<li>`, calcular `const inicial = inicialDelTema(sesion.tema)`; si no
es `""`, crear `<span class="sesion-insignia" aria-hidden="true">` con `textContent = inicial`
(nunca `innerHTML`: el tema lo escribe el usuario) y añadirlo primero. El resto del archivo no se
toca.

## Riesgos

- **`hidden` anulado por CSS**: si `.cifra` tiene `display`, la mejor racha 0 se vería. Mitigación:
  regla `.cifra[hidden]` y escenario 6 de `quickstart.md`.
- **Cifras estrechas entre 481 y ~560 px** (tres en fila) y a 360 px con la mejor racha oculta
  (Semana y Mes a media anchura): "12 h 30 min" podría no caber. Mitigación: tamaño de letra de
  los valores algo menor en esos anchos **solo si no cabe** y comprobar a 481, 360 px
  (escenarios 4-6).
- **Fuentes**: si Bricolage no trae cifras tabulares, CA-1.2 no se cumpliría del todo; se
  comprueba en el escenario 1.

## Seguimiento de complejidad

| Incumplimiento | Por qué hace falta | Alternativa más simple descartada porque |
|----------------|--------------------|------------------------------------------|
| Principio IV: los criterios [manual] (colores, contraste, distribución, tamaños, foco, animación, iconos) no tienen prueba en `tests.html`. | Son reglas visuales: `tests.html`, abierto con `file://`, no puede cargar `index.html` ni medir su CSS. Se verifican con los 19 escenarios de `quickstart.md` (T017). Es la misma excepción que en la spec 001 (criterios [manual] y [auto + manual], verificados a mano). | Probarlos de forma automática exigiría un servidor o un ejecutor de pruebas (prohibidos por el principio I y por `AGENTS.md`). |

**Aceptación**: el usuario aceptó expresamente esta excepción el 2026-10-16, tras
`/speckit-analyze`. Los criterios [auto] (CA-8.5, CA-8.6) sí tienen pruebas en `tests.html`.

## Decisiones a revisar por el usuario

1. Los dos SVG (`icono-brote.svg`, `brote-racha.svg`) van en la raíz del proyecto, no en una
   carpeta `img/`.
2. A ≤ 480 px las cifras se ven "Mejor racha | Este mes" y debajo "Esta semana" (CA-4.3), pero en
   el HTML el orden sigue siendo Mejor racha, Esta semana, Este mes (el de la pantalla ancha). Un
   lector de pantalla lee "Esta semana" antes que "Este mes" aunque en el móvil se vea al revés.
   No afecta al teclado (las cifras no reciben foco).
3. Los colores del mapa (`research.md` R-3) y del anillo de foco (`#2E8B57`) no estaban en la
   maqueta: son los más cercanos a ella que cumplen RF-6 y CA-5.4.

# 📖 Diario de Estudio

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Dependencias: 0](https://img.shields.io/badge/dependencias-0-brightgreen)
![Sin build](https://img.shields.io/badge/build-no%20necesario-blue)
[![Built with OpenCode](https://img.shields.io/badge/Built%20with-OpenCode-000000?logo=opencode&logoColor=white)](https://opencode.ai/)

Web estática para **registrar tus sesiones de estudio** y motivarte viendo tu **racha de días seguidos**. Sin instalaciones, sin servidor y sin cuentas: abres `index.html` y empiezas a apuntar.

Es además un **proyecto didáctico**: el código está escrito para que pueda entenderlo alguien que empieza a programar.

## Contenido

- [Funcionalidades](#funcionalidades)
- [Por qué usarlo](#por-qué-usarlo)
- [Primeros pasos](#primeros-pasos)
- [Cómo se usa](#cómo-se-usa)
- [Mapa de calor](#mapa-de-calor)
- [Pruebas](#pruebas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Cómo funciona por dentro](#cómo-funciona-por-dentro)
- [Ayuda y documentación](#ayuda-y-documentación)
- [Mantenimiento y contribuciones](#mantenimiento-y-contribuciones)

## Funcionalidades

- 📝 **Registrar sesiones** con fecha, tema y minutos estudiados.
- 🔥 **Racha actual**: días consecutivos con al menos una sesión.
- 🏆 **Mejor racha**: el tramo más largo de días seguidos de todo tu historial.
- 📚 **Total de la semana**: minutos estudiados de lunes a domingo (por ejemplo, `1 h 45 min`).
- 📅 **Días de este mes**: cuántos días distintos has estudiado desde el día 1 del mes hasta hoy.
- 🟦 **Mapa de calor de las últimas 12 semanas**: un cuadrito por día, más oscuro cuanto más estudias. Se puede recorrer con el ratón, el dedo o el teclado.
- 🗂️ **Lista de sesiones** ordenada de la más reciente a la más antigua.
- 📅 **Días pasados**: puedes apuntar sesiones de días anteriores (nunca futuras).
- 📱 **Diseño responsive**, pensado también para el móvil.

## Por qué usarlo

- **Cero configuración**: HTML, CSS y JavaScript puros. Sin frameworks, sin npm y sin paso de build.
- **Funciona sin conexión** y directamente desde el disco (`file://`). Las fuentes (Literata y Atkinson Hyperlegible) se cargan de Google Fonts; sin internet se usan las del sistema y todo sigue funcionando.
- **Tus datos se quedan en tu navegador** (`localStorage`); no se envían a ningún sitio.
- **Fechas fiables**: todo se calcula con tu fecha local, sin desfases por zonas horarias.
- **Código fácil de leer**: ideal para aprender o para usarlo como base de tus propios proyectos.

## Primeros pasos

### Requisitos

Solo un navegador moderno (Chrome, Edge, Firefox, Safari…).

### Instalación

```bash
git clone https://github.com/JRomeoSalazar/my-diary-study.git
cd my-diary-study
```

### Abrir la aplicación

Haz doble clic en `index.html` o ábrelo desde la terminal:

```bash
# Linux
xdg-open index.html

# macOS
open index.html

# Windows
start index.html
```

No hace falta servidor. Si aun así prefieres usar uno (opcional):

```bash
python3 -m http.server 8000
# Abre http://localhost:8000
```

> [!NOTE]
> Si usas **Firefox instalado como snap** (Ubuntu), al abrir el archivo desde ciertas rutas como `/var/www` puede no cargar el CSS ni el JS. No es un fallo del código: prueba con otro navegador o con el servidor local de arriba.

## Cómo se usa

1. En **Registrar sesión**, elige la fecha (por defecto, hoy), escribe el tema y los minutos.
2. Pulsa **Guardar sesión**.
3. El bloque de la racha, arriba del todo, y el [mapa de calor](#mapa-de-calor) se actualizan al momento:

```text
Racha actual
5 días seguidos

Mejor racha    Esta semana    Este mes
12 días        3 h 20 min     9 días
```

### Reglas de la racha

| Situación | Resultado |
| --- | --- |
| Varias sesiones el mismo día | Cuentan como **un solo día** |
| Hoy aún no hay sesión, pero ayer sí | La racha **sigue viva** y se cuenta desde ayer |
| Un día sin sesiones (sin contar hoy) | La racha **se rompe** |
| Sesiones con fecha futura | **No suman** (el formulario no las permite) |

### Empezar de cero

Abre DevTools → **Application** → **Local Storage** y borra la clave `diario-estudio-sesiones`. O desde la consola:

```js
localStorage.removeItem("diario-estudio-sesiones");
```

## Mapa de calor

Bajo la racha, la sección **Últimas 12 semanas** dibuja un cuadrito por cada día:

- Cada **columna es una semana** (de lunes a domingo, con el lunes arriba): la de la izquierda es la más antigua y la de la derecha, la semana actual. El mapa empieza en el lunes de hace 11 semanas y termina hoy.
- Los **días posteriores a hoy** quedan como huecos, sin color.
- Encima de las columnas aparece la abreviatura del **mes** donde empieza cada uno, y a la izquierda la del **día de la semana**.
- El color depende de los **minutos de ese día** (si hay varias sesiones, se suman). La **leyenda** de debajo, de "Menos" a "Más", enseña los 5 niveles; pasa el ratón por un color para ver su tramo:

| Nivel | Minutos del día |
| --- | --- |
| 0 | 0 min |
| 1 | 1–29 min |
| 2 | 30–59 min |
| 3 | 60–119 min |
| 4 | 120 min o más |

El color nunca es lo único que informa: cada día tiene su **detalle** en texto, bajo el mapa, con este formato (día de la semana, día, mes y año, en minúsculas y sin puntos ni comas):

```text
lun 3 ago 2026: 1 h 15 min
```

### Cómo moverse por el mapa

| Acción | Qué pasa |
| --- | --- |
| Pasar el ratón por un día | Se ve su detalle; al salir del mapa vuelve el del día seleccionado, o el texto "Pasa el ratón o toca un día para ver sus minutos." |
| Clic o toque en un día | Queda **seleccionado** (con contorno) y su detalle se mantiene. Solo hay uno seleccionado; tocar otro lo sustituye, y tocar el mismo o fuera del mapa no cambia nada |
| `Tab` | El mapa es **una sola parada** del tabulador: el foco cae en el día seleccionado o, si no hay ninguno, en hoy |
| Flechas `↑` `↓` `←` `→` | Mueven el foco al día de al lado (arriba/abajo, día anterior/siguiente; izquierda/derecha, la misma fila en la semana anterior/siguiente). El día con el foco queda seleccionado. En los bordes y ante un hueco el foco no se mueve y la página no se desplaza |

Al guardar una sesión, o al recargar la página, el mapa se dibuja de nuevo con la fecha de ese momento y se **borra la selección**. Los lectores de pantalla anuncian cada día con el mismo texto del detalle. En el móvil el mapa cabe entero en 360 px de ancho; con zoom o letra grande se desplaza solo el mapa, no la página.

El mapa **solo lee** las sesiones: no guarda nada nuevo ni cambia el formato de los datos. Ignora las sesiones no válidas (sin fecha `AAAA-MM-DD` real o con minutos que no sean un entero mayor que 0) y, si lo guardado no es una lista, se muestra vacío.

## Pruebas

Las pruebas de la lógica (fechas, minutos, niveles, textos y navegación del mapa) están en `tests.html`. No hace falta instalar nada: **haz doble clic en `tests.html`** y se ejecutan en el navegador. Arriba verás un resumen en verde, por ejemplo **"133 de 133 pruebas superadas"**; si alguna falla, el resumen sale en rojo y esa prueba aparece como `FALLO` con el valor obtenido y el esperado (y también en la consola).

Para añadir una prueba, escribe en el `<script>` de `tests.html`, antes de `mostrarResultados()`:

```js
prueba("CA-5.1: textoDetalle de 75 minutos", () =>
  igual(textoDetalle("2026-08-03", 75), "lun 3 ago 2026: 1 h 15 min"));
```

Cada prueba empieza por el criterio de la spec que comprueba (`CA-5.1`…). Lo que depende de la página (dibujar el mapa, el ratón, el foco) no se puede probar desde `tests.html` abierto con doble clic, así que se comprueba a mano abriendo `index.html`.

## Estructura del proyecto

```text
.
├── index.html   # Estructura de la página
├── styles.css   # Estilos (responsive)
├── logica.js    # Funciones puras: fechas, minutos, niveles y textos del mapa (sin tocar la página)
├── app.js       # Racha, semana, mes, formulario, localStorage y dibujo del mapa
├── tests.html   # Pruebas de la lógica: ábrelo con doble clic
├── docs/        # Constitución del proyecto (principios innegociables)
├── specs/       # Especificaciones de cada funcionalidad (spec, plan y tareas)
├── AGENTS.md    # Normas del proyecto (convenciones, reglas de fechas y racha)
└── MEMORY.md    # Estado actual y decisiones tomadas
```

## Cómo funciona por dentro

Las sesiones se guardan en `localStorage` bajo la clave `diario-estudio-sesiones` como un array de objetos:

```json
[
  { "id": 1759490000000, "fecha": "2026-10-03", "tema": "Matemáticas", "minutos": 30 }
]
```

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `id` | número | `Date.now()` al guardar; desempata sesiones del mismo día |
| `fecha` | texto | Fecha local en formato `AAAA-MM-DD` |
| `tema` | texto | Lo que has estudiado |
| `minutos` | entero | Duración de la sesión (mayor que 0) |

La racha, la mejor racha, el total semanal, los días del mes y el mapa de calor **no se guardan**: se calculan siempre a partir de las sesiones.

Los cálculos del mapa viven en `logica.js` como funciones puras (reciben las sesiones y la fecha de hoy, y devuelven un valor sin tocar la página ni `localStorage`); `app.js` solo las llama y dibuja el resultado. Por eso se pueden probar en `tests.html`.

Las fechas se manejan siempre en hora local con funciones propias (`fechaATexto` y `textoAFecha` en `logica.js`). Se evitan a propósito `toISOString()` y `new Date("AAAA-MM-DD")`, porque trabajan en UTC y pueden desplazar el día.

## Ayuda y documentación

- 🐛 **Errores y sugerencias**: abre un issue en [GitHub](https://github.com/JRomeoSalazar/my-diary-study/issues).
- 📏 **Normas del proyecto**: [`AGENTS.md`](AGENTS.md) (stack, convenciones, formato de datos y reglas de fechas y racha).
- 🧠 **Estado y decisiones**: [`MEMORY.md`](MEMORY.md) explica qué está hecho y por qué se tomó cada decisión.

## Mantenimiento y contribuciones

Mantenido por [@JRomeoSalazar](https://github.com/JRomeoSalazar).

¡Las contribuciones son bienvenidas! Antes de abrir un pull request, lee [`AGENTS.md`](AGENTS.md). En resumen:

- **Nada de dependencias**, frameworks ni paso de build.
- Debe seguir funcionando con doble clic (`file://`): sin módulos ES ni `fetch` a archivos locales.
- Textos de la interfaz en **español**.
- Cambios pequeños y enfocados, con código sencillo y nombres descriptivos.
- Si cambias el formato de los datos, **mantén la compatibilidad** con las sesiones ya guardadas.
- Cada regla tiene su prueba en `tests.html`, y antes de cada commit **todas tienen que pasar**. Además, prueba los cambios abriendo `index.html` en el navegador (también en tamaño móvil). No hay lint.
- Cada funcionalidad tiene su spec en `specs/`; si cambias una, spec y código cambian en el mismo commit. Los principios del proyecto están en [`docs/constitution.md`](docs/constitution.md).

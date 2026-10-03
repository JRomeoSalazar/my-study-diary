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
- 🗂️ **Lista de sesiones** ordenada de la más reciente a la más antigua.
- 📅 **Días pasados**: puedes apuntar sesiones de días anteriores (nunca futuras).
- 📱 **Diseño responsive**, pensado también para el móvil.

## Por qué usarlo

- **Cero configuración**: HTML, CSS y JavaScript puros. Sin frameworks, sin npm y sin paso de build.
- **Funciona sin conexión** y directamente desde el disco (`file://`).
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
3. La tarjeta superior se actualiza al momento:

```text
Racha actual
🔥 5
días seguidos
🏆 Mejor racha: 12 días
📚 Esta semana: 3 h 20 min
📅 Este mes: 9 días
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

## Estructura del proyecto

```text
.
├── index.html   # Estructura de la página
├── styles.css   # Estilos (responsive)
├── app.js       # Lógica: fechas, racha, semana, mes, formulario y localStorage
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

La racha, la mejor racha, el total semanal y los días del mes **no se guardan**: se calculan siempre a partir de las sesiones.

Las fechas se manejan siempre en hora local con funciones propias (`fechaATexto` y `textoAFecha` en `app.js`). Se evitan a propósito `toISOString()` y `new Date("AAAA-MM-DD")`, porque trabajan en UTC y pueden desplazar el día.

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
- Prueba los cambios abriendo `index.html` en el navegador (también en tamaño móvil); no hay tests ni lint.

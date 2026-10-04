# Spec 001 — Mapa de calor de días estudiados

Estado: revisada (QA) y aclarada, lista para el plan · Fecha: 2026-10-04

> Nota: la carpeta de esta spec se llama `001-heat-map` por decisión del usuario, aunque el
> resto del proyecto va en español (principio 6). Es una excepción consciente.

## 1. Contexto y objetivo

El Diario de Estudio ya muestra la racha actual, la mejor racha, el total de la semana y
los días estudiados del mes. Son cifras sueltas: dicen *cuánto*, pero no dejan ver *cómo*
se ha repartido el estudio en el tiempo (huecos, semanas flojas, días intensos).

**Objetivo:** mostrar un mapa de calor, al estilo del de GitHub, con los días de las
últimas 12 semanas. Cada día es una celda y su color es más intenso cuantos más minutos
se estudiaron ese día. Así el usuario ve de un vistazo su constancia y su esfuerzo, y se
motiva a no dejar huecos.

## 2. Usuarios

- **Estudiante que usa el diario** (único tipo de usuario): registra sus sesiones a diario
  o de vez en cuando, desde el ordenador o el móvil. No tiene por qué saber nada técnico.
- **Usuario de lector de pantalla, de teclado o con dificultad para distinguir colores**:
  debe poder conocer la fecha y los minutos de cada día sin depender del color ni del ratón.

## 3. Historias de usuario

- **HU-1.** Como estudiante, quiero ver mis últimas 12 semanas de un vistazo para saber
  qué días estudié y cuáles no.
- **HU-2.** Como estudiante, quiero que los días con más minutos se vean más intensos para
  distinguir los días flojos de los días fuertes.
- **HU-3.** Como estudiante, quiero consultar la fecha y los minutos exactos de un día
  concreto del mapa para no tener que buscarlo en la lista de sesiones.
- **HU-4.** Como estudiante, quiero que el mapa se actualice en cuanto apunto una sesión
  para ver mi progreso al momento.
- **HU-5.** Como estudiante que entra desde el móvil, quiero que el mapa se vea entero y
  se pueda consultar con el dedo.

## 4. Requisitos funcionales

Notación EARS: *El sistema deberá…* (siempre), *Cuando…* (evento), *Mientras…* (estado),
*Si… entonces…* (situación no deseada), *Donde…* (característica opcional).

Cada criterio lleva una etiqueta de cómo se comprueba (ver RNF-6):
**[auto]** = prueba automática en el navegador; **[manual]** = verificación manual en el
navegador (aspecto visual o interacción física).

### RF-1. Periodo mostrado

El mapa cubre 12 semanas de lunes a domingo según la fecha local del usuario: la semana
actual y las 11 anteriores.

- **CA-1.1.** [auto] El sistema deberá mostrar 12 columnas, una por semana, ordenadas de la
  más antigua (izquierda) a la actual (derecha).
- **CA-1.2.** [auto] El sistema deberá ordenar los días de cada columna de lunes (arriba) a
  domingo (abajo).
- **CA-1.3.** [auto] El sistema deberá empezar el periodo en el lunes situado 11 semanas
  antes del lunes de la semana actual y terminarlo en el día de hoy, ambos incluidos.
- **CA-1.4.** [auto] El sistema deberá determinar "hoy", el día de la semana y el inicio de
  cada semana con la fecha local del usuario, nunca con la hora universal (UTC).
- **CA-1.5.** [auto] El sistema deberá mostrar cada día natural del periodo exactamente una
  vez, también cuando el periodo incluya un cambio de mes, de año, un 29 de febrero o un
  cambio de horario de verano.

### RF-2. Sesiones válidas y minutos de cada día

Una **sesión válida para el mapa** es un elemento guardado que cumple las tres condiciones:

1. Es un objeto.
2. Su `fecha` es un texto con el formato exacto `AAAA-MM-DD` (4, 2 y 2 cifras separadas por
   guiones, sin hora) y corresponde a un día que existe en el calendario.
3. Sus `minutos` son un número (no un texto) entero mayor que 0.

El tema y el `id` no influyen en el mapa: una sesión sin tema o con `id` repetido sigue
contando si cumple lo anterior.

- **CA-2.1.** [auto] El sistema deberá calcular los minutos de cada día como la suma de los
  minutos de todas las sesiones válidas con esa fecha, incluidas las repetidas.
- **CA-2.2.** [auto] El sistema deberá calcular los minutos a partir de las sesiones
  guardadas cada vez que se muestre el mapa, sin guardar ningún dato nuevo.
- **CA-2.3.** [auto] El sistema deberá ignorar en el mapa las sesiones cuya fecha quede
  fuera del periodo de RF-1 (anteriores al primer lunes o posteriores a hoy).

### RF-3. Nivel de intensidad

Cada día tiene uno de 5 niveles fijos según sus minutos:

| Nivel | Minutos del día |
|-------|-----------------|
| 0     | 0               |
| 1     | 1 – 29          |
| 2     | 30 – 59         |
| 3     | 60 – 119        |
| 4     | 120 o más       |

- **CA-3.1.** [auto] El sistema deberá asignar a cada día el nivel que corresponde a sus
  minutos según la tabla anterior, sin depender de los demás días del mapa.
- **CA-3.2.** [manual] El sistema deberá mostrar el nivel 0 con un color neutro y los
  niveles 1 a 4 con un mismo tono de la paleta del diario, cada uno más oscuro que el
  anterior.
- **CA-3.3.** [manual] El sistema deberá mostrar el nivel 0 con un contraste de al menos
  1,5:1 respecto al fondo, y el nivel 4 con un contraste de al menos 3:1 respecto al fondo.

### RF-4. Días posteriores a hoy

- **CA-4.1.** [auto] El sistema deberá dejar como hueco los días de la semana actual
  posteriores a hoy. Un hueco ocupa su sitio (la columna conserva sus 7 filas), pero no
  tiene color, no se puede seleccionar y los lectores de pantalla no lo anuncian.

### RF-5. Detalle de cada día

El detalle se muestra en una **línea de detalle** fija, justo debajo del mapa, siempre
visible y de una sola línea de texto (puede partirse en dos si no cabe).

- **CA-5.1.** [auto] El sistema deberá escribir el detalle de un día con el formato
  `<fecha>: <minutos>`, por ejemplo "lun 3 ago 2026: 1 h 15 min".
- **CA-5.2.** [auto] El sistema deberá escribir la fecha del detalle con este formato
  exacto: día de la semana abreviado, espacio, día del mes sin cero inicial, espacio, mes
  abreviado, espacio, año con 4 cifras. En minúsculas, sin puntos ni comas.
  Abreviaturas (únicas válidas):

  | Días | lun, mar, mié, jue, vie, sáb, dom |
  |------|-----------------------------------|
  | Meses | ene, feb, mar, abr, may, jun, jul, ago, sep, oct, nov, dic |

- **CA-5.3.** [auto] El sistema deberá escribir los minutos así: menos de 60 → "45 min";
  60 o más → "1 h 45 min"; horas exactas → "2 h"; 0 → "0 min". Sin límite superior
  (p. ej. 1 000 000 → "16666 h 40 min").
- **CA-5.4.** [auto] Mientras no haya ningún día seleccionado, el sistema deberá mostrar en
  la línea de detalle el texto "Pasa el ratón o toca un día para ver sus minutos.".
- **CA-5.5.** [manual] Cuando el puntero del ratón entre en un día, el sistema deberá
  mostrar el detalle de ese día en la línea de detalle.
- **CA-5.6.** [manual] Cuando el puntero del ratón salga del mapa, el sistema deberá volver
  a mostrar el detalle del día seleccionado o, si no hay ninguno, el texto de CA-5.4.
- **CA-5.7.** [auto] Cuando el usuario haga clic o toque un día, el sistema deberá
  seleccionar ese día, marcarlo visualmente y mostrar su detalle. Solo puede haber un día
  seleccionado; seleccionar otro sustituye al anterior. Tocar el mismo día o fuera del
  mapa no cambia la selección.
- **CA-5.8.** [auto] Cuando el usuario seleccione un día, el sistema deberá dejar intactas
  las sesiones guardadas y la lista de sesiones tal como estaba.
- **CA-5.9.** [auto] Cuando el mapa se vuelva a dibujar (al guardar una sesión o recargar),
  el sistema deberá quitar la selección y mostrar el texto de CA-5.4.

### RF-6. Título, posición, leyenda y etiquetas

- **CA-6.1.** [manual] El sistema deberá mostrar el mapa en una sección con el título
  visible "Últimas 12 semanas", con el mismo nivel y estilo que los demás títulos de
  sección, situada justo debajo de la fila de mejor racha / esta semana / este mes.
- **CA-6.2.** [auto] El sistema deberá mostrar junto a cada fila la abreviatura de su día:
  "lun", "mar", "mié", "jue", "vie", "sáb" y "dom".
- **CA-6.3.** [auto] El sistema deberá mostrar sobre una columna la abreviatura del mes
  (las de CA-5.2, sin año) cuando esa columna contenga, entre sus días ya dibujados (no
  huecos), el día 1 de un mes.
- **CA-6.4.** [auto] Si la primera columna no tiene etiqueta según CA-6.3 y la segunda
  tampoco, entonces el sistema deberá mostrar sobre la primera columna el mes de su lunes.
- **CA-6.5.** [manual] El sistema deberá permitir que una etiqueta de mes ocupe más ancho
  que su columna, por encima de las columnas siguientes sin etiqueta.
- **CA-6.6.** [auto] El sistema deberá mostrar debajo del mapa una leyenda con el texto
  "Menos", los 5 colores de nivel en orden de 0 a 4 y el texto "Más".
- **CA-6.7.** [auto] El sistema deberá ofrecer para cada color de la leyenda su tramo
  ("0 min", "1–29 min", "30–59 min", "60–119 min", "120 min o más") al pasar el ratón por
  encima y a los lectores de pantalla.
- **CA-6.8.** [auto] El sistema deberá escribir todos los textos del mapa en español.

### RF-7. Actualización

- **CA-7.1.** [auto] Cuando se cargue la página, el sistema deberá mostrar el mapa con las
  sesiones guardadas.
- **CA-7.2.** [auto] Cuando el usuario guarde una sesión nueva, el sistema deberá volver a
  dibujar el mapa sin recargar la página.
- **CA-7.3.** [auto] Cuando se cargue la página o el usuario guarde una sesión, el sistema
  deberá calcular el periodo del mapa con la fecha de hoy de ese momento.

### RF-8. Sin datos y datos no válidos

- **CA-8.1.** [auto] Mientras no haya sesiones válidas en el periodo, el sistema deberá
  mostrar el mapa con todos los días hasta hoy en nivel 0 (los días posteriores a hoy
  siguen siendo huecos).
- **CA-8.2.** [auto] Si un elemento guardado no es una sesión válida (RF-2), entonces el
  sistema deberá ignorarlo en el mapa y seguir mostrando las demás.
- **CA-8.3.** [auto] Si lo guardado no se puede leer, no es una lista o el almacenamiento
  del navegador no está disponible, entonces el sistema deberá mostrar el mapa como si no
  hubiera sesiones (CA-8.1).
- **CA-8.4.** [auto] El sistema deberá limitarse a leer las sesiones guardadas, sin
  modificar ni borrar ninguna, tampoco las no válidas.

### RF-9. Teclado y lectores de pantalla

- **CA-9.1.** [auto] El sistema deberá hacer que el mapa sea una sola parada del
  tabulador: al llegar con Tab, el foco va al día seleccionado o, si no hay ninguno, a hoy.
- **CA-9.2.** [auto] Mientras el foco esté en el mapa, cuando el usuario pulse una flecha,
  el sistema deberá mover el foco al día de al lado en esa dirección (arriba/abajo = día
  anterior/siguiente; izquierda/derecha = misma fila en la semana anterior/siguiente). Si
  en esa dirección no hay día (borde o hueco), el foco no se mueve.
- **CA-9.3.** [auto] Cuando un día reciba el foco, el sistema deberá seleccionarlo como en
  CA-5.7.
- **CA-9.4.** [auto] El sistema deberá anunciar a los lectores de pantalla el título del
  mapa y, para cada día, el mismo texto que su detalle (CA-5.1).

## 5. Requisitos no funcionales

- **RNF-1. Datos intactos.** La funcionalidad solo lee las sesiones: no cambia su formato
  ni añade datos guardados. Las sesiones existentes se ven en el mapa sin migración.
- **RNF-2. Sin dependencias.** Funciona abriendo la página con doble clic, sin conexión,
  sin instalar nada y sin librerías externas.
- **RNF-3. Móvil.** [manual] Con 360 px de ancho y zoom al 100 %, el mapa completo se ve
  sin desplazamiento horizontal. Entre los centros de dos días contiguos hay al menos
  24 px, para poder tocarlos con el dedo. Con zoom de 200 % o letra grande se permite
  desplazamiento horizontal dentro del mapa, nunca en la página entera. En horizontal se
  aplican las mismas reglas.
- **RNF-4. Pantallas anchas.** [manual] El mapa no se estira para ocupar el ancho
  disponible: los días mantienen un tamaño cómodo y el mapa se alinea con el resto del
  contenido.
- **RNF-5. Accesibilidad.** El color nunca es el único medio para conocer los minutos: la
  línea de detalle (RF-5) y el teclado y los lectores de pantalla (RF-9) dan la misma
  información en texto.
- **RNF-6. Comprobable (principios 3 y 4 de la constitución).**
  - Estos cálculos son funciones puras: reciben las sesiones y la fecha de hoy como datos
    y no tocan la página ni el almacenamiento.
    - Qué elementos son sesiones válidas.
    - Los días del periodo y sus huecos.
    - Los minutos y el nivel de cada día.
    - Las etiquetas de mes.
    - El texto de la fecha y de los minutos.
  - Cada criterio **[auto]** tiene al menos una prueba automática en la página de pruebas
    del proyecto, que se abre en el navegador. Esa página aún no existe y crearla requiere
    permiso del usuario.
  - Los criterios **[manual]** son de aspecto visual o de interacción física y no se
    pueden comprobar con una función pura. Se verifican en el navegador según la
    verificación del proyecto y quedan anotados en la lista del plan.
- **RNF-7. Coherencia visual.** [manual] El mapa usa la paleta y las fuentes del diario.
  No tiene animaciones ni el efecto de fosforito, y su título no es mayor que los demás
  títulos de sección: la racha sigue siendo lo más llamativo.
- **RNF-8. Rendimiento.** [manual] Con 5 000 sesiones guardadas, dibujar el mapa no tarda
  más de 100 ms en un portátil normal.

## 6. Casos límite

| Caso | Comportamiento esperado |
|------|-------------------------|
| Hoy es lunes | La columna actual tiene 1 día (hoy) y 6 huecos. |
| Hoy es domingo | La columna actual tiene sus 7 días. |
| Hoy es lunes y día 1 de mes | La columna actual lleva la etiqueta de ese mes. |
| Hoy es 1 de enero | Etiqueta "ene" (sin año); el detalle muestra el año. |
| El día 1 de un mes cae en un hueco futuro | Esa columna no lleva etiqueta de mes. |
| El periodo empieza a mitad de mes y el mes siguiente empieza en la 2.ª columna | La 1.ª columna no lleva etiqueta; la 2.ª sí. |
| El periodo empieza a mitad de mes y el mes siguiente empieza en la 3.ª columna o después | La 1.ª columna lleva el mes de su lunes. |
| Periodo que cruza fin de año | Cada día aparece una vez; las etiquetas siguen CA-6.3 y CA-6.4 (puede que diciembre no tenga etiqueta si su día 1 queda fuera). |
| Periodo con 29 de febrero | El día aparece una vez en su posición. |
| Cambio de horario de verano dentro del periodo | No se salta ni se repite ningún día. |
| Varias sesiones el mismo día | Se suman sus minutos en un solo día. |
| Sesiones repetidas (mismo `id` o idénticas) | Cuentan todas. |
| Un día con sesiones válidas y no válidas | Solo suman las válidas. |
| Minutos en los límites | 29 → 1, 30 → 2, 59 → 2, 60 → 3, 119 → 3, 120 → 4. |
| Minutos enormes (p. ej. 1 000 000) | Nivel 4; detalle "16666 h 40 min", que puede partirse en dos líneas. |
| Sesión del domingo anterior al primer lunes | No aparece. |
| Sesión con fecha futura | Se ignora; el día futuro es un hueco. |
| Días anteriores a la primera sesión del usuario | Se muestran como días normales en nivel 0 ("0 min"). |
| Sin ninguna sesión guardada | Todos los días hasta hoy en nivel 0. |
| Fecha mal formada ("2026-8-3", "2026-08-03T10:00", número, vacía) o inexistente ("2026-02-30") | Esa sesión se ignora. |
| Minutos 0, negativos, decimales, texto (también "45") o ausentes | Esa sesión se ignora; no se borra. |
| Elemento que no es un objeto (`null`, número) | Se ignora. |
| Sesiones con los campos en inglés (`date`, `minutes`) | Se ignoran (no consta que existan: la app siempre ha guardado `fecha`/`minutos`). |
| Lo guardado no es una lista, está corrupto o el almacenamiento no está disponible | Mapa como sin sesiones. |
| Se apunta una sesión de un día pasado dentro del periodo | El color de ese día cambia al guardar. |
| La página sigue abierta al pasar la medianoche | El mapa no cambia hasta recargar la página o guardar una sesión. |
| Se guarda una sesión en otra pestaña | Esta pestaña no se entera hasta recargar o guardar. |
| Cambio de zona horaria o reloj del dispositivo mal puesto | Se usa la fecha local del dispositivo al cargar o guardar, sin corregirla. |
| Dispositivo con ratón y pantalla táctil a la vez | Manda la última acción (pasar el ratón o tocar). |
| Día en el borde derecho del mapa en el móvil | El detalle se ve completo, porque sale en la línea fija bajo el mapa. |

## 7. Fuera de alcance (esta versión)

- Elegir otro periodo (más o menos semanas, un año completo) o navegar a semanas anteriores.
- Filtrar la lista de sesiones, editar o borrar sesiones desde el mapa.
- Niveles relativos al máximo o por cuartiles; configurar los tramos de minutos.
- Filtrar el mapa por tema.
- Totales por semana o por mes dentro del mapa.
- Guardar cualquier dato nuevo o cambiar el formato de las sesiones.
- Exportar o compartir el mapa como imagen.
- Animaciones del mapa.
- Actualizar el mapa por el simple paso de la medianoche (sin recargar ni guardar), o por
  cambios hechos en otra pestaña.
- Aplicar la regla de "sesión válida" a la racha, la semana, el mes o la lista. Hoy esas
  cifras no validan las sesiones. Con datos corruptos (que el formulario nunca crea), un
  día podría contar en la racha y salir vacío en el mapa. Se acepta.
- Unificar formatos con la lista de sesiones: la lista sigue mostrando "90 min" y
  "sábado, 3 de octubre de 2026". El mapa usa "1 h 30 min" (como "Esta semana") y la fecha
  corta "lun 3 ago 2026", elegida por el usuario.
- Adaptar los cálculos ya existentes (racha, semana, mes) al principio 3 de la
  constitución: es una tarea aparte.
- Migrar datos con otros nombres de campo.

## 8. Criterios de finalización

- [ ] Se cumplen todos los criterios de aceptación de RF-1 a RF-9.
- [ ] Cada criterio [auto] tiene al menos una prueba automática y todas pasan en el
      navegador, incluidos los casos límite de la sección 6 que se puedan calcular.
- [ ] Cada criterio [manual] está verificado en el navegador: en escritorio, en el móvil a
      360 px, con teclado y con zoom al 200 %.
- [ ] La consola no muestra errores de la aplicación.
- [ ] Las sesiones guardadas antes del cambio siguen intactas y se ven en el mapa.
- [x] Todas las dudas marcadas como [NECESITA ACLARACIÓN] están resueltas y la spec
      actualizada.
- [ ] README y memoria del proyecto actualizados.

## 9. Dudas abiertas

Ninguna.

Decisiones del usuario (2026-10-04):
- Día sin estudio: "0 min".
- Las 7 etiquetas de día.
- Fecha "lun 3 ago 2026".
- No avanza solo a medianoche: se actualiza al recargar o al guardar.
- Posición bajo la fila de cifras.
- Título "Últimas 12 semanas".

Decisiones tomadas en la revisión QA, delegadas por el usuario (2026-10-04):
- Detalle en una línea fija bajo el mapa, en vez de un globo junto al día.
- Teclado con una sola parada del tabulador y flechas.
- Definición estricta de sesión válida (los minutos en texto no valen).
- Etiquetas de mes según CA-6.3 y CA-6.4.
- Separación entre criterios [auto] y [manual].
- Umbrales de contraste, de espacio entre días y de rendimiento.

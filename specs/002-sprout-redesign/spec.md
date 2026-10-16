# Spec 002 — Rediseño visual "Brote"

Estado: aprobada (2026-10-16) · Fecha: 2026-10-11

> Nota: la carpeta se llama `002-sprout-redesign`, como la rama, por decisión del usuario
> (misma excepción consciente al principio 6 que la spec 001).

## 1. Contexto y objetivo

El diario tiene hoy un estilo de "cuaderno de cuadros": fondo cuadriculado, margen rojo,
tinta azul y un trazo de fosforito amarillo bajo la racha. Al usuario no le gustan ni ese
estilo ni sus colores.

Se prepararon tres propuestas en Claude Design y el usuario eligió la **C · Brote**
(https://claude.ai/artifact/ASECBHQh4dta4rmvLmTuVr, mesas "C · Brote — escritorio" y
"C · Brote — móvil"). Según el usuario, es la que mejor reparte la información, la que mejor
se entiende y la que transmite más calma.

**Objetivo:** cambiar el aspecto y la distribución del diario al estilo Brote: tonos verdes
serenos, tarjetas blancas redondeadas y, en pantallas anchas, dos columnas. Todo lo que el
diario hace, calcula, guarda y escribe sigue igual. **Es un cambio solo visual.**

## Clarificaciones

### Sesión 2026-10-16

- P: ¿CA-1.5 ("sin emojis") choca con §7, donde la insignia muestra el emoji con que empieza un tema? → R: CA-1.5 se refiere solo a la interfaz propia (textos y adornos). Lo que escribe el usuario, incluida su inicial en la insignia (aunque sea un emoji, entero), se muestra tal cual.
- P: ¿Cómo se colocan las tarjetas de cifras entre 481 y 1023 px de ancho? → R: En una fila, como en la pantalla ancha.
- P: A 480 px o menos, con la mejor racha oculta (CA-4.4), ¿cómo se reparten "Esta semana" y "Este mes"? → R: En una fila de dos columnas iguales.
- P: ¿Cómo se incluyen los iconos del brote (CA-1.4 y CA-3.3)? → R: Cada icono en su propio archivo de imagen SVG aparte (el usuario autoriza crear esos archivos nuevos). Deben verse al abrir la página con doble clic (`file://`), sin cargarlos con `fetch`, y ser decorativos (texto alternativo vacío / ocultos a lectores de pantalla).
- P: En pantalla ancha (máx. 1180 px), ¿qué proporción tienen las dos columnas de CA-2.1? → R: Columna derecha de ancho fijo (unos 380-400 px); la izquierda ocupa el resto.

## 2. Usuarios

- **Estudiante que usa el diario** desde el ordenador o el móvil.
- **Usuario de teclado, de lector de pantalla o con baja visión**: el rediseño no puede
  empeorar lo que ya funciona (foco visible, textos alternativos, contraste).

## 3. Historias de usuario

- **HU-1.** Como estudiante, quiero un diario con colores tranquilos para que apetezca
  abrirlo cada día.
- **HU-2.** Como estudiante, quiero que la racha destaque por encima de todo para
  motivarme a no romperla.
- **HU-3.** Como estudiante en el ordenador, quiero ver de un vistazo mis cifras y el
  formulario sin tener que bajar mucho.
- **HU-4.** Como estudiante en el móvil, quiero que todo se lea y se toque con comodidad.
- **HU-5.** Como estudiante, quiero seguir viendo todas mis sesiones guardadas igual que
  antes del cambio.

## 4. Definiciones

- **Tarjeta:** bloque con fondo propio y esquinas redondeadas que agrupa una parte de la
  página.
- **Pantalla ancha:** ventana de al menos 1024 px de ancho. **Pantalla estrecha:** por
  debajo de 1024 px.
- **Paleta Brote** (valores de referencia de la propuesta C):

  | Uso | Color |
  |-----|-------|
  | Fondo de la página | verde salvia muy claro `#EDF1EC` |
  | Fondo de las tarjetas | blanco `#FFFFFF` |
  | Texto principal | verde casi negro `#15241C` |
  | Texto secundario | verde grisáceo `#56645B` |
  | Color principal (racha, botón, iconos) | verde bosque `#1E5A3E` |
  | Texto sobre el verde bosque | blanco y verde claro `#CFE8D7` |
  | Rellenos suaves (fondo de campos, píldoras) | `#F4F7F4` y `#EDF1EC` |

  Los verdes del mapa de calor de la propuesta se pueden ajustar para cumplir RF-6.
- **Tipografía Brote:** Bricolage Grotesque para títulos y cifras, y Figtree para el resto
  del texto. Si no cargan, se usan las fuentes del sistema.

## 5. Requisitos funcionales

Cada criterio indica cómo se comprueba: **[manual]** = verificación en el navegador;
**[auto]** = prueba automática en la página de pruebas del proyecto.

### RF-1. Estilo general

- **CA-1.1.** [manual] EL SISTEMA mostrará la página con la paleta Brote (§4) sobre un fondo
  liso, sin cuadrícula, sin línea de margen roja, sin tinta azul y sin fosforito.
- **CA-1.2.** [manual] EL SISTEMA usará la tipografía Brote (§4). Las cifras (racha, mejor
  racha, semana, mes, minutos) usarán números de ancho fijo y alineados en la línea base.
- **CA-1.3.** [manual] EL SISTEMA agrupará cada parte de la página en su propia tarjeta:
  la racha, cada una de las tres cifras, el mapa, el formulario y la lista de sesiones.
- **CA-1.4.** [manual] EL SISTEMA mostrará en la cabecera un icono de brote dibujado con
  líneas, dentro de un cuadrado redondeado verde bosque, junto al título "Diario de
  Estudio". El icono es decorativo: los lectores de pantalla no lo anuncian. Es un
  archivo de imagen aparte que se ve al abrir la página con doble clic (ver Clarificaciones).
- **CA-1.5.** [manual] EL SISTEMA no mostrará emojis en la interfaz propia (textos y
  adornos). Lo que escribe el usuario, incluida la inicial de la insignia (CA-8.4), se
  muestra tal cual, aunque sea un emoji (entero, sin partir).

### RF-2. Distribución

- **CA-2.1.** [manual] MIENTRAS la pantalla sea ancha, EL SISTEMA mostrará dos columnas:
  a la izquierda la racha, las cifras y el mapa; a la derecha el formulario y la lista de
  sesiones. La columna derecha tendrá un ancho fijo (unos 380-400 px) y la izquierda ocupará
  el resto. El contenido no superará los 1180 px de ancho y quedará centrado.
- **CA-2.2.** [manual] MIENTRAS la pantalla sea estrecha, EL SISTEMA mostrará una sola
  columna en este orden: racha, cifras, mapa, formulario, sesiones.
- **CA-2.3.** [manual] EL SISTEMA mantendrá ese mismo orden (racha, cifras, mapa,
  formulario, sesiones) para el teclado y los lectores de pantalla en cualquier ancho.

### RF-3. Racha

- **CA-3.1.** [manual] EL SISTEMA mostrará la racha en una tarjeta con fondo verde bosque:
  arriba "Racha actual" en verde claro y debajo el número en blanco, con el texto "día
  seguido" o "días seguidos" (como hoy).
- **CA-3.2.** [manual] EL SISTEMA mostrará el número de la racha como el texto más grande
  de la página (al menos 96 px en pantalla ancha y 80 px a 360 px de ancho).
- **CA-3.3.** [manual] MIENTRAS la pantalla sea ancha, EL SISTEMA mostrará en la tarjeta
  de la racha un brote grande y decorativo en un verde algo más claro que el fondo de la
  tarjeta, que los lectores de pantalla no anuncian. Es un archivo de imagen aparte, como el
  de CA-1.4.

### RF-4. Cifras: mejor racha, esta semana y este mes

- **CA-4.1.** [manual] EL SISTEMA mostrará cada cifra en su propia tarjeta blanca, con la
  etiqueta en texto secundario y el valor debajo, más grande.
- **CA-4.2.** [manual] MIENTRAS la pantalla mida más de 480 px (pantalla ancha y también
  estrecha entre 481 y 1023 px), EL SISTEMA mostrará las tarjetas visibles en una fila.
- **CA-4.3.** [manual] MIENTRAS la pantalla mida 480 px o menos, EL SISTEMA mostrará
  "Mejor racha" y "Este mes" en dos columnas, y "Esta semana" debajo, a todo el ancho.
- **CA-4.4.** [manual] SI la mejor racha es 0 (y por tanto está oculta, como hoy),
  ENTONCES EL SISTEMA repartirá las tarjetas restantes sin dejar un hueco vacío. A 480 px o
  menos, "Esta semana" y "Este mes" irán en una fila de dos columnas iguales.
- **CA-4.5.** [manual] EL SISTEMA no partirá un valor en dos líneas (p. ej. "3 h 10 min")
  a 360 px de ancho.

### RF-5. Mapa de calor

Se mantiene todo el comportamiento de la spec 001: periodo, niveles, detalle, ratón,
teclado, leyenda y textos.

- **CA-5.1.** [manual] EL SISTEMA mostrará el mapa dentro de una tarjeta blanca con el
  título "Últimas 12 semanas".
- **CA-5.2.** [manual] EL SISTEMA mostrará los días como cuadrados con las esquinas
  redondeadas, en el nivel 0 con un gris verdoso y en los niveles 1 a 4 con verdes cada
  vez más oscuros. El nivel 4 será el verde bosque o uno muy parecido.
- **CA-5.3.** [manual] EL SISTEMA mostrará la línea de detalle dentro de una píldora con
  relleno suave.
- **CA-5.4.** [manual] EL SISTEMA marcará el día seleccionado con un contorno de 2 px en el
  color del texto principal, y el foco del teclado con un anillo de al menos 3 px claramente
  distinto del anterior. Si un día está seleccionado y tiene el foco, se verán las dos marcas.
- **CA-5.5.** [manual] EL SISTEMA usará en los cuadros de la leyenda los mismos colores que
  en los días.

### RF-6. Contraste del mapa (sustituye a los valores de color de la spec 001)

- **CA-6.1.** [manual] EL SISTEMA mostrará el nivel 0 con un contraste de al menos 1,5:1
  respecto al fondo de su tarjeta, y el nivel 4 con al menos 3:1.
- **CA-6.2.** [manual] EL SISTEMA mostrará cada nivel con un contraste de al menos 1,4:1
  respecto al nivel contiguo, para que se distingan sin depender del tono.

### RF-7. Formulario "Registrar sesión"

- **CA-7.1.** [manual] EL SISTEMA mostrará el formulario en una tarjeta blanca con los
  mismos campos, etiquetas, textos de ejemplo, validaciones y mensajes de error que hoy.
- **CA-7.2.** [manual] EL SISTEMA mostrará los campos con relleno suave, borde fino y
  esquinas redondeadas, de al menos 44 px de alto.
- **CA-7.3.** [manual] CUANDO un campo o el botón reciba el foco del teclado, EL SISTEMA
  mostrará un anillo de foco visible de al menos 3 px.
- **CA-7.4.** [manual] EL SISTEMA mostrará el botón "Guardar sesión" como una píldora
  verde bosque con texto blanco, de al menos 44 px de alto y a todo el ancho de la tarjeta.
- **CA-7.5.** [manual] SI hay un error de validación, ENTONCES EL SISTEMA mostrará el
  mensaje en un color rojo con contraste de al menos 4,5:1 sobre blanco.

### RF-8. Lista de sesiones

- **CA-8.1.** [manual] EL SISTEMA mostrará la lista en una tarjeta blanca titulada
  "Sesiones", con cada sesión separada por una línea fina.
- **CA-8.2.** [manual] EL SISTEMA mostrará en cada sesión el tema, debajo la fecha en texto
  secundario (el mismo texto que hoy) y a la derecha los minutos dentro de una píldora
  ("45 min", como hoy).
- **CA-8.3.** [manual] MIENTRAS no haya sesiones, EL SISTEMA mostrará dentro de la tarjeta
  el mensaje actual "Todavía no has registrado ninguna sesión.".
- **CA-8.4.** [manual] EL SISTEMA mostrará delante de cada sesión una insignia: un cuadrado
  redondeado verde claro con la inicial del tema en verde bosque. Es decorativa: los lectores
  de pantalla no la anuncian (ya leen el tema completo).
- **CA-8.5.** [auto] EL SISTEMA calculará la inicial como el primer carácter del tema sin los
  espacios del principio, en mayúscula (p. ej. "  álgebra" → "Á"). Un carácter que ocupa
  más de una posición en el texto (p. ej. un emoji) cuenta como uno solo y no se parte.
- **CA-8.6.** [auto] SI el tema está vacío o solo tiene espacios, ENTONCES EL SISTEMA no
  mostrará la insignia en esa sesión.

### RF-9. Animación

- **CA-9.1.** [manual] EL SISTEMA no mostrará la animación del fosforito.
- **CA-9.2.** [manual] CUANDO se cargue la página, EL SISTEMA mostrará el número de la racha
  con una aparición suave: pasa de transparente a visible mientras sube unos 8 px, en unos
  0,5 s y una sola vez. Guardar una sesión no la repite.
- **CA-9.3.** [manual] MIENTRAS el usuario tenga activada la preferencia "reducir
  movimiento", EL SISTEMA mostrará el número de la racha sin animación.

## 6. Requisitos no funcionales

- **RNF-1. Datos intactos.** No cambia el formato de las sesiones ni se guarda nada nuevo.
  Las sesiones guardadas se ven igual que antes del cambio.
- **RNF-2. Comportamiento intacto.** No cambian los cálculos, los textos ni los formatos.
  Todas las pruebas automáticas que ya existen siguen pasando.
- **RNF-3. Sin dependencias.** Funciona abriendo la página con doble clic, sin instalar
  nada. Las fuentes llegan como hoy, mediante un enlace a Google Fonts, y sin conexión se
  usan las del sistema.
- **RNF-4. Contraste.** [manual] Todo el texto tiene un contraste de al menos 4,5:1 con su
  fondo (3:1 a partir de 24 px), también el verde claro sobre el verde bosque y los textos
  de ejemplo de los campos.
- **RNF-5. Móvil.** [manual] A 360 px de ancho y zoom al 100 % no hay desplazamiento
  horizontal, y el mapa se ve entero cumpliendo la separación entre días de la spec 001
  (al menos 24 px entre los centros de dos días contiguos). Con zoom al 200 % solo se
  desplaza el mapa, nunca la página.
- **RNF-6. Zonas táctiles.** [manual] Los campos y el botón miden al menos 44 px de alto.
- **RNF-7. Movimiento reducido.** [manual] La única animación es la de CA-9.2 y desaparece
  con la preferencia "reducir movimiento" (CA-9.3).

## 7. Casos límite

| Caso | Comportamiento esperado |
|------|-------------------------|
| Mejor racha 0 (oculta) | Las tarjetas de semana y mes ocupan el espacio sin hueco; a 480 px o menos, en dos columnas iguales (CA-4.4). |
| Sin sesiones | Mapa con todos los días en nivel 0 y la tarjeta de sesiones con el mensaje vacío. |
| Tema muy largo sin espacios | Se parte dentro de la tarjeta, sin ensanchar la página. |
| Minutos enormes (p. ej. 1 000 000) | La píldora de minutos no se sale de la tarjeta. Como hoy, la lista muestra "1000000 min". |
| Racha de 3 o más cifras | El número cabe en la tarjeta a 360 px. |
| Ventana justo en 1024 px | Dos columnas sin desplazamiento horizontal. |
| Zoom al 200 % o letra grande | Se pasa a una columna. Solo el mapa se desplaza en horizontal. |
| Sin conexión | Fuentes del sistema; la página se ve bien y nada se descoloca. |
| Tema que empieza por minúscula, acento o número | "matemáticas" → "M", "álgebra" → "Á", "3D" → "3". |
| Tema que empieza por un emoji | La insignia muestra el emoji entero (es texto del usuario; CA-1.5 no lo impide). |
| Tema vacío o solo espacios (datos antiguos o corruptos) | La sesión se ve sin insignia. |
| Lista con muchas sesiones | La tarjeta crece hacia abajo. La página hace scroll de forma normal, sin scroll interno. |

## 8. Fuera de alcance

- Cualquier funcionalidad nueva, y cambios en cálculos, textos, formatos o datos guardados
  (la insignia de CA-8.4 es la única pieza nueva y es decorativa).
- Modo oscuro.
- Elegir el color de acento desde la interfaz (en la maqueta solo era una prueba de diseño).
- Unificar los formatos de fecha o minutos de la lista con los del mapa (sigue fuera de
  alcance, como en la spec 001).
- Arreglar los errores de consola con datos corruptos (pendiente aparte en la memoria).

## 9. Criterios de finalización

- [ ] Se cumplen todos los criterios de RF-1 a RF-9.
- [ ] `tests.html` muestra todas las pruebas superadas.
- [ ] Verificado en el navegador: en escritorio a 1280 px, en el móvil a 360 px y 390 px,
      con teclado y con zoom al 200 %.
- [ ] La consola no muestra errores de la aplicación.
- [ ] Las sesiones guardadas antes del cambio siguen intactas y se ven.
- [ ] Todas las dudas marcadas como [NECESITA ACLARACIÓN] están resueltas.
- [ ] README y MEMORY actualizados.

## 10. Dudas abiertas

Ninguna.

Decisiones del usuario (2026-10-16): ver Clarificaciones. Spec aprobada (GATE 1).

Decisiones del usuario (2026-10-11):
- Propuesta elegida: C · Brote.
- Rama `feature/sprout-redesign` y carpeta `002-sprout-redesign`.
- Sí a la insignia con la inicial del tema (CA-8.4 a CA-8.6).
- Aparición suave del número de la racha en lugar del fosforito (CA-9.2 y CA-9.3).

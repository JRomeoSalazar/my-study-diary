# Spec 001 — Mapa de calor de días estudiados

Estado: aclarada, lista para el plan · Fecha: 2026-10-04

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
- **Usuario de lector de pantalla o con dificultad para distinguir colores**: debe poder
  conocer los minutos de cada día sin depender del color.

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

### RF-1. Periodo mostrado

El mapa cubre 12 semanas de lunes a domingo según la fecha local del usuario: la semana
actual y las 11 anteriores.

- **CA-1.1.** El sistema deberá mostrar 12 columnas, una por semana, ordenadas de la más
  antigua (izquierda) a la actual (derecha).
- **CA-1.2.** El sistema deberá ordenar los días de cada columna de lunes (arriba) a
  domingo (abajo).
- **CA-1.3.** El sistema deberá empezar el periodo en el lunes de hace 11 semanas
  respecto al lunes de la semana actual y terminarlo en el día de hoy.
- **CA-1.4.** El sistema deberá determinar "hoy", el día de la semana y el inicio de cada
  semana con la fecha local del usuario, nunca con la hora universal (UTC).
- **CA-1.5.** Cuando el periodo cruce un cambio de mes, de año, un 29 de febrero o un
  cambio de horario de verano, el sistema deberá mostrar cada día natural exactamente una
  vez, sin saltar ni repetir ninguno.

### RF-2. Minutos de cada día

- **CA-2.1.** El sistema deberá calcular los minutos de cada día como la suma de los
  minutos de todas las sesiones válidas con esa fecha.
- **CA-2.2.** El sistema deberá calcular los minutos a partir de las sesiones guardadas
  cada vez que se muestre el mapa, sin guardar ningún dato nuevo.
- **CA-2.3.** El sistema deberá ignorar las sesiones cuya fecha quede fuera del periodo
  mostrado.

### RF-3. Nivel de intensidad

Cada día tiene uno de 5 niveles fijos según sus minutos:

| Nivel | Minutos del día |
|-------|-----------------|
| 0     | 0 (sin estudio) |
| 1     | 1 – 29          |
| 2     | 30 – 59         |
| 3     | 60 – 119        |
| 4     | 120 o más       |

- **CA-3.1.** El sistema deberá asignar a cada día el nivel que corresponde a sus minutos
  según la tabla anterior.
- **CA-3.2.** El sistema deberá mostrar cada nivel con un color distinto, más intenso
  cuanto mayor es el nivel, y el nivel 0 con un color neutro que se distinga del fondo.
- **CA-3.3.** El sistema deberá asignar siempre el mismo nivel a los mismos minutos, sin
  depender de los demás días del mapa.

### RF-4. Días posteriores a hoy

- **CA-4.1.** El sistema deberá dejar como hueco vacío (sin celda) los días de la semana
  actual posteriores a hoy.
- **CA-4.2.** Si hay sesiones guardadas con fecha posterior a hoy, entonces el sistema
  deberá ignorarlas en el mapa.

### RF-5. Detalle de cada día

- **CA-5.1.** Cuando el usuario pase el ratón por encima de un día, el sistema deberá
  mostrar la fecha de ese día y sus minutos totales (p. ej. "lun 3 ago 2026: 1 h 15 min").
- **CA-5.2.** Cuando el usuario toque un día en una pantalla táctil, el sistema deberá
  mostrar la misma información que en CA-5.1.
- **CA-5.3.** El sistema deberá ofrecer a los lectores de pantalla la fecha y los minutos
  de cada día, sin depender del color.
- **CA-5.4.** El sistema deberá escribir los minutos con el mismo formato que el total
  semanal: menos de 60 → "45 min"; 60 o más → "1 h 45 min"; horas exactas → "2 h".
- **CA-5.5.** Mientras un día tenga 0 minutos, el sistema deberá indicarlo como día sin
  estudio. Texto exacto: "0 min".
- **CA-5.6.** Cuando el usuario pulse un día, el sistema no deberá filtrar, editar ni
  borrar sesiones.
- **CA-5.7.** El sistema deberá escribir la fecha del detalle como día de la semana
  abreviado, día del mes sin cero inicial, mes abreviado y año, en minúsculas:
  "lun 3 ago 2026". Días: lun, mar, mié, jue, vie, sáb, dom. Meses: ene, feb, mar, abr,
  may, jun, jul, ago, sep, oct, nov, dic.

### RF-6. Título, posición, leyenda y etiquetas

- **CA-6.0.** El sistema deberá mostrar el mapa en una sección con el título visible
  "Últimas 12 semanas", situada justo debajo de la fila de mejor racha / esta semana /
  este mes.

- **CA-6.1.** El sistema deberá mostrar una leyenda "Menos → Más" con los 5 colores de
  nivel en orden.
- **CA-6.2.** El sistema deberá mostrar junto a cada fila la abreviatura en español del
  día correspondiente: "lun", "mar", "mié", "jue", "vie", "sáb" y "dom".
- **CA-6.3.** El sistema deberá mostrar sobre las columnas el nombre abreviado del mes en
  la primera semana en la que empieza cada mes dentro del periodo.
- **CA-6.4.** El sistema deberá escribir todos los textos del mapa en español.

### RF-7. Actualización

- **CA-7.1.** Cuando el usuario guarde una sesión nueva, el sistema deberá actualizar el
  mapa sin recargar la página.
- **CA-7.2.** Cuando se cargue la página, el sistema deberá mostrar el mapa con las
  sesiones guardadas.
- **CA-7.3.** Cuando se cargue la página o el usuario guarde una sesión, el sistema deberá
  calcular el periodo del mapa con la fecha de hoy de ese momento.

### RF-8. Sin datos y datos no válidos

- **CA-8.1.** Mientras no haya sesiones en el periodo mostrado, el sistema deberá mostrar
  el mapa completo con todos los días en nivel 0.
- **CA-8.2.** Si una sesión guardada tiene una fecha mal formada o inexistente (p. ej.
  "2026-02-30"), entonces el sistema deberá ignorarla en el mapa.
- **CA-8.3.** Si una sesión guardada tiene unos minutos que no son un entero mayor que 0,
  entonces el sistema deberá ignorarla en el mapa.
- **CA-8.4.** Si hay sesiones no válidas, entonces el sistema deberá seguir mostrando el
  mapa con las demás y no deberá modificar ni borrar ninguna sesión guardada.

## 5. Requisitos no funcionales

- **RNF-1. Datos intactos.** La funcionalidad solo lee las sesiones: no cambia su formato
  ni añade datos guardados. Las sesiones ya existentes se ven en el mapa sin migración.
- **RNF-2. Sin dependencias.** Funciona abriendo la página con doble clic, sin conexión,
  sin instalar nada y sin librerías externas.
- **RNF-3. Móvil.** En una pantalla de 360 px de ancho el mapa completo (12 semanas) se ve
  sin desplazamiento horizontal y cada día se puede tocar con el dedo.
- **RNF-4. Accesibilidad.** El color no es el único medio para conocer los minutos
  (ver CA-5.3). Los colores de nivel tienen suficiente contraste con el fondo para
  distinguirse entre sí y del nivel 0.
- **RNF-5. Coherencia visual.** El mapa respeta el diseño actual del diario y no compite
  con la racha, que sigue siendo el elemento más llamativo.
- **RNF-6. Comprobable.** El cálculo de los días del periodo, sus minutos y su nivel recibe
  las sesiones y la fecha de hoy como datos, para poder comprobarlo con cualquier fecha.
  Cada regla de esta spec tiene al menos una prueba automática que se ejecuta en el
  navegador.
- **RNF-7. Rendimiento.** Con varios miles de sesiones guardadas, el mapa se muestra y se
  actualiza sin retraso perceptible.

## 6. Casos límite

| Caso | Comportamiento esperado |
|------|-------------------------|
| Hoy es lunes | La columna actual tiene solo 1 celda (hoy); el resto son huecos. |
| Hoy es domingo | La columna actual está completa (7 celdas). |
| Varias sesiones el mismo día | Se suman sus minutos; cuenta como una sola celda. |
| Minutos justo en el límite (29/30, 59/60, 119/120) | 29 → nivel 1, 30 → nivel 2, 59 → nivel 2, 60 → nivel 3, 119 → nivel 3, 120 → nivel 4. |
| Día con muchísimos minutos (p. ej. 900) | Nivel 4. |
| Sesión del día anterior al primer lunes del periodo | No aparece. |
| Sesión con fecha futura | Se ignora; el día futuro es un hueco. |
| Periodo que cruza fin de año (p. ej. dic → ene) | Cada día aparece una vez; las etiquetas de mes muestran ambos meses. |
| Periodo con 29 de febrero | El día aparece una vez en su posición. |
| Cambio de horario de verano dentro del periodo | No se salta ni se repite ningún día. |
| Sin ninguna sesión guardada | Mapa completo en nivel 0. |
| Fecha mal formada, inexistente o vacía | Esa sesión se ignora; el resto del mapa se ve bien. |
| Minutos 0, negativos, decimales o no numéricos | Esa sesión se ignora; no se borra. |
| Se apunta una sesión de un día pasado dentro del periodo | El color de ese día se actualiza al momento. |
| La página sigue abierta al pasar la medianoche | El mapa deberá actualizarse al recargar la página o al guardar una nueva sesión. No será necesario que se actualice automáticamente al pasar la medianoche. |

## 7. Fuera de alcance (esta versión)

- Elegir otro periodo (más o menos semanas, un año completo) o navegar a semanas anteriores.
- Filtrar la lista de sesiones, editar o borrar sesiones desde el mapa.
- Niveles relativos al máximo o por cuartiles; configurar los tramos de minutos.
- Filtrar el mapa por tema.
- Totales por semana o por mes dentro del mapa.
- Guardar cualquier dato nuevo o cambiar el formato de las sesiones.
- Exportar o compartir el mapa como imagen.
- Animaciones del mapa.
- Que el mapa avance solo al pasar la medianoche sin recargar la página.

## 8. Criterios de finalización

- [ ] Se cumplen todos los criterios de aceptación de RF-1 a RF-8.
- [ ] Cada regla de esta spec tiene al menos una prueba automática y todas pasan en el
      navegador, incluidos los casos límite de la sección 6.
- [ ] Verificado en el navegador: el mapa se ve con datos reales, se actualiza al guardar
      una sesión y la consola no muestra errores de la aplicación.
- [ ] Verificado en vista móvil (360 px): sin desplazamiento horizontal y detalle al tocar.
- [ ] Las sesiones guardadas antes del cambio siguen intactas y se ven en el mapa.
- [x] Todas las dudas marcadas como [NECESITA ACLARACIÓN] están resueltas y la spec
      actualizada.
- [ ] README y memoria del proyecto actualizados.

## 9. Dudas abiertas

Ninguna. Resueltas el 2026-10-04:

- Texto de un día sin estudio: "0 min" (CA-5.5).
- Etiquetas de días: los 7 (CA-6.2).
- Formato de fecha del detalle: "lun 3 ago 2026" (CA-5.7).
- Medianoche con la página abierta: no avanza solo; se actualiza al recargar o al guardar
  una sesión (sección 6 y fuera de alcance).
- Posición: bajo la fila de mejor racha / semana / mes (CA-6.0).
- Título: "Últimas 12 semanas" (CA-6.0).

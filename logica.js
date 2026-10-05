// Funciones puras: no tocan la página (DOM) ni localStorage.
// Se cargan antes que app.js, que las usa.

// ---------- Constantes del mapa de calor ----------

// Número de semanas (columnas) que dibuja el mapa
const SEMANAS_MAPA = 12;

// Abreviaturas de los días; empieza en lunes
const DIAS_CORTOS = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"];

// Abreviaturas de los meses
const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// Texto de cada color de la leyenda, del nivel 0 al 4
const TRAMOS_LEYENDA = ["0 min", "1–29 min", "30–59 min", "60–119 min", "120 min o más"];

// Texto del detalle cuando no hay ningún día seleccionado
const TEXTO_DETALLE_INICIAL = "Pasa el ratón o toca un día para ver sus minutos.";

// ---------- Fechas (siempre en hora local, nunca UTC) ----------

// Convierte un objeto Date en texto "AAAA-MM-DD" usando la fecha local
function fechaATexto(fecha) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return anio + "-" + mes + "-" + dia;
}

// Convierte un texto "AAAA-MM-DD" en un objeto Date local
function textoAFecha(texto) {
  const partes = texto.split("-");
  return new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
}

// Comprueba que un valor es un texto "AAAA-MM-DD" con un día que existe en el calendario.
// "2026-02-30" no vale: new Date lo convierte en el 2 de marzo y los números no coinciden.
function esFechaValida(valor) {
  if (typeof valor !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    return false;
  }
  const partes = valor.split("-");
  const anio = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);
  const fecha = new Date(anio, mes - 1, dia);
  return fecha.getFullYear() === anio && fecha.getMonth() === mes - 1 && fecha.getDate() === dia;
}

// Suma n días a un texto "AAAA-MM-DD" (n puede ser negativo) y devuelve otro texto.
// Se suma al día del mes, no con milisegundos: el día del cambio de hora no dura 24 h.
function sumarDias(texto, n) {
  const partes = texto.split("-");
  const fecha = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]) + n);
  return fechaATexto(fecha);
}

// Devuelve el lunes de la semana de un texto "AAAA-MM-DD", también como texto
function lunesDeLaSemana(texto) {
  return fechaATexto(inicioDeSemana(textoAFecha(texto)));
}

// ---------- Textos del detalle de un día ----------

// Escribe una fecha "AAAA-MM-DD" como "lun 3 ago 2026" (sin toLocaleDateString,
// que cambia según el navegador). getDay() da 0 para el domingo, y DIAS_CORTOS
// empieza en lunes, por eso se desplaza con (getDay() + 6) % 7.
function formatearFechaCorta(texto) {
  const fecha = textoAFecha(texto);
  const dia = DIAS_CORTOS[(fecha.getDay() + 6) % 7];
  const mes = MESES_CORTOS[fecha.getMonth()];
  return dia + " " + fecha.getDate() + " " + mes + " " + fecha.getFullYear();
}

// Texto del detalle de un día, por ejemplo "lun 3 ago 2026: 1 h 15 min"
function textoDetalle(fecha, minutos) {
  return formatearFechaCorta(fecha) + ": " + formatearMinutos(minutos);
}

// ---------- Etiquetas de mes del mapa ----------

// Recibe las columnas del mapa (listas de días { fecha }; los huecos no existen) y
// devuelve 12 textos: la abreviatura del mes sobre la columna donde cae un día 1, o "".
function calcularEtiquetasMes(semanas) {
  const etiquetas = [];
  semanas.forEach((columna) => {
    let etiqueta = "";
    columna.forEach((dia) => {
      // Los dos últimos caracteres de "AAAA-MM-DD" son el día del mes
      if (dia.fecha.slice(8) === "01") {
        etiqueta = MESES_CORTOS[Number(dia.fecha.slice(5, 7)) - 1];
      }
    });
    etiquetas.push(etiqueta);
  });
  // Si ni la primera ni la segunda columna tienen etiqueta, la primera lleva el mes de su lunes
  if (etiquetas[0] === "" && etiquetas[1] === "") {
    etiquetas[0] = MESES_CORTOS[Number(semanas[0][0].fecha.slice(5, 7)) - 1];
  }
  return etiquetas;
}

// ---------- Modelo completo del mapa ----------

// Construye el mapa a partir de las sesiones guardadas y de la fecha de hoy.
// Devuelve { semanas, etiquetasMes }:
// - semanas: 12 columnas (de la más antigua a la actual), cada una con sus días de lunes a
//   domingo como { fecha, minutos, nivel, texto }. Los días posteriores a hoy son huecos:
//   no existen en la lista, así que la última columna puede tener menos de 7 elementos.
// - etiquetasMes: 12 textos con el mes que se escribe sobre cada columna ("" si no hay).
function calcularMapa(sesiones, hoy) {
  const lista = comoLista(sesiones);
  const primerDia = sumarDias(lunesDeLaSemana(hoy), -(SEMANAS_MAPA - 1) * 7);
  const minutosPorDia = calcularMinutosPorDia(lista, primerDia, hoy);

  const semanas = [];
  for (let semana = 0; semana < SEMANAS_MAPA; semana++) {
    const columna = [];
    for (let dia = 0; dia < 7; dia++) {
      const fecha = sumarDias(primerDia, semana * 7 + dia);
      if (fecha <= hoy) {
        const minutos = minutosPorDia[fecha] || 0;
        columna.push({
          fecha: fecha,
          minutos: minutos,
          nivel: calcularNivel(minutos),
          texto: textoDetalle(fecha, minutos)
        });
      }
    }
    semanas.push(columna);
  }

  return { semanas: semanas, etiquetasMes: calcularEtiquetasMes(semanas) };
}

// ---------- Selección y teclado en el mapa ----------

// Busca una fecha en el mapa y devuelve su posición { semana, dia } (columna y fila),
// o null si no está (fuera del periodo, hueco o valor que no es una fecha)
function posicionDeFecha(mapa, fecha) {
  for (let semana = 0; semana < mapa.semanas.length; semana++) {
    for (let dia = 0; dia < mapa.semanas[semana].length; dia++) {
      if (mapa.semanas[semana][dia].fecha === fecha) {
        return { semana: semana, dia: dia };
      }
    }
  }
  return null;
}

// Texto que se ve en la línea de detalle. El día apuntado con el ratón gana al
// seleccionado; una fecha que no esté en el mapa se ignora.
function textoLineaDetalle(mapa, fechaApuntada, fechaSeleccionada) {
  const candidatas = [fechaApuntada, fechaSeleccionada];
  for (let i = 0; i < candidatas.length; i++) {
    const posicion = posicionDeFecha(mapa, candidatas[i]);
    if (posicion !== null) {
      return mapa.semanas[posicion.semana][posicion.dia].texto;
    }
  }
  return TEXTO_DETALLE_INICIAL;
}

// Fecha del día que recibe el foco al entrar en el mapa con Tab:
// la seleccionada si está en el mapa; si no, hoy
function fechaConParadaTab(mapa, fechaSeleccionada, hoy) {
  return posicionDeFecha(mapa, fechaSeleccionada) !== null ? fechaSeleccionada : hoy;
}

// ---------- Nivel de color de cada día ----------

// Devuelve el nivel de color (0 a 4) que corresponde a los minutos de un día
function calcularNivel(minutos) {
  if (minutos >= 120) {
    return 4;
  }
  if (minutos >= 60) {
    return 3;
  }
  if (minutos >= 30) {
    return 2;
  }
  if (minutos >= 1) {
    return 1;
  }
  return 0;
}

// ---------- Sesiones guardadas ----------

// Comprueba que un elemento guardado sirve para el mapa: es un objeto, tiene una
// fecha válida y sus minutos son un número entero mayor que 0. El tema y el id no importan.
function esSesionValida(sesion) {
  return (
    typeof sesion === "object" &&
    sesion !== null &&
    esFechaValida(sesion.fecha) &&
    typeof sesion.minutos === "number" &&
    Number.isInteger(sesion.minutos) &&
    sesion.minutos > 0
  );
}

// Devuelve el valor si es una lista; si no (null, texto, objeto...), una lista vacía
function comoLista(valor) {
  return Array.isArray(valor) ? valor : [];
}

// Suma los minutos de cada día entre "desde" y "hasta" (ambos incluidos).
// Devuelve un objeto { "AAAA-MM-DD": minutos }. Ignora las sesiones no válidas y
// no modifica la lista que recibe.
function calcularMinutosPorDia(sesiones, desde, hasta) {
  const minutosPorDia = {};
  sesiones.forEach((sesion) => {
    if (!esSesionValida(sesion)) {
      return;
    }
    // Las fechas son texto "AAAA-MM-DD", así que se comparan directamente
    if (sesion.fecha < desde || sesion.fecha > hasta) {
      return;
    }
    minutosPorDia[sesion.fecha] = (minutosPorDia[sesion.fecha] || 0) + sesion.minutos;
  });
  return minutosPorDia;
}

// Devuelve el día anterior a una fecha (objeto Date)
function diaAnterior(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - 1);
}

// Devuelve el lunes de la semana de una fecha (objeto Date).
// getDay() da 0 para el domingo, 1 para el lunes... así que calculamos
// cuántos días hay que retroceder para llegar al lunes.
function inicioDeSemana(fecha) {
  const diasDesdeLunes = (fecha.getDay() + 6) % 7;
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - diasDesdeLunes);
}

// ---------- Minutos ----------

// Convierte minutos en texto: "45 min", "1 h 45 min" o "2 h"
function formatearMinutos(totalMinutos) {
  if (totalMinutos < 60) {
    return totalMinutos + " min";
  }

  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;

  if (minutos === 0) {
    return horas + " h";
  }
  return horas + " h " + minutos + " min";
}

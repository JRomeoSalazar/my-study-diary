// Funciones puras: no tocan la página (DOM) ni localStorage.
// Se cargan antes que app.js, que las usa.

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

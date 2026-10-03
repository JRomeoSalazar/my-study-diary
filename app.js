// Nombre con el que guardamos los datos en localStorage
const CLAVE_STORAGE = "diario-estudio-sesiones";

// Elementos de la página
const formulario = document.getElementById("formulario");
const inputFecha = document.getElementById("fecha");
const inputTema = document.getElementById("tema");
const inputMinutos = document.getElementById("minutos");
const textoError = document.getElementById("error");
const rachaDias = document.getElementById("racha-dias");
const rachaTexto = document.getElementById("racha-texto");
const mejorRacha = document.getElementById("mejor-racha");
const lista = document.getElementById("lista");
const mensajeVacio = document.getElementById("vacio");

// Lista de sesiones. Cada sesión es: { id, fecha: "AAAA-MM-DD", tema, minutos }
let sesiones = cargarSesiones();

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

// Devuelve la fecha de hoy como "AAAA-MM-DD"
function hoyTexto() {
  return fechaATexto(new Date());
}

// Devuelve el día anterior a una fecha (objeto Date)
function diaAnterior(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - 1);
}

// Muestra una fecha bonita, por ejemplo: "sábado, 3 de octubre de 2026"
function formatearFecha(texto) {
  return textoAFecha(texto).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ---------- localStorage ----------

function cargarSesiones() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    return [];
  }
}

function guardarSesiones() {
  localStorage.setItem(CLAVE_STORAGE, JSON.stringify(sesiones));
}

// ---------- Racha ----------

function calcularRacha() {
  // Guardamos los días que tienen al menos una sesión
  const diasConSesion = new Set(sesiones.map((sesion) => sesion.fecha));

  let dia = new Date();

  // Si hoy aún no hay sesión, empezamos a contar desde ayer
  // (la racha no se rompe hasta que termina el día)
  if (!diasConSesion.has(fechaATexto(dia))) {
    dia = diaAnterior(dia);
  }

  // Contamos hacia atrás mientras haya sesión ese día
  let racha = 0;
  while (diasConSesion.has(fechaATexto(dia))) {
    racha++;
    dia = diaAnterior(dia);
  }

  return racha;
}

// La racha más larga de todo el historial
function calcularMejorRacha() {
  const hoy = hoyTexto();

  // Días únicos con sesión, sin fechas futuras, de más antiguo a más reciente.
  // Las fechas "AAAA-MM-DD" se pueden ordenar como texto.
  const dias = [...new Set(sesiones.map((sesion) => sesion.fecha))]
    .filter((fecha) => fecha <= hoy)
    .sort();

  let mejor = 0;
  let actual = 0;
  let diaPrevio = "";

  dias.forEach((dia) => {
    const ayerDeEseDia = fechaATexto(diaAnterior(textoAFecha(dia)));

    // Si el día anterior también tenía sesión, la racha continúa; si no, empieza otra
    if (ayerDeEseDia === diaPrevio) {
      actual++;
    } else {
      actual = 1;
    }

    if (actual > mejor) {
      mejor = actual;
    }
    diaPrevio = dia;
  });

  return mejor;
}

// ---------- Pintar la página ----------

function mostrarRacha() {
  const racha = calcularRacha();
  rachaDias.textContent = racha;
  rachaTexto.textContent = racha === 1 ? "día seguido" : "días seguidos";

  // La mejor racha solo se muestra cuando hay al menos un día que cuente
  const mejor = calcularMejorRacha();
  mejorRacha.hidden = mejor === 0;
  mejorRacha.textContent = "🏆 Mejor racha: " + mejor + (mejor === 1 ? " día" : " días");
}

function mostrarLista() {
  // Ordenamos de la más reciente a la más antigua.
  // Si dos sesiones tienen la misma fecha, va primero la última que se añadió.
  const ordenadas = [...sesiones].sort((a, b) => {
    if (a.fecha !== b.fecha) {
      return a.fecha < b.fecha ? 1 : -1;
    }
    return b.id - a.id;
  });

  lista.innerHTML = "";

  ordenadas.forEach((sesion) => {
    const elemento = document.createElement("li");
    elemento.className = "sesion";

    const info = document.createElement("div");

    const tema = document.createElement("p");
    tema.className = "sesion-tema";
    tema.textContent = sesion.tema;

    const fecha = document.createElement("p");
    fecha.className = "sesion-fecha";
    fecha.textContent = formatearFecha(sesion.fecha);

    const minutos = document.createElement("span");
    minutos.className = "sesion-minutos";
    minutos.textContent = sesion.minutos + " min";

    info.appendChild(tema);
    info.appendChild(fecha);
    elemento.appendChild(info);
    elemento.appendChild(minutos);
    lista.appendChild(elemento);
  });

  mensajeVacio.hidden = sesiones.length > 0;
}

function prepararFormulario() {
  inputFecha.value = hoyTexto();
  inputFecha.max = hoyTexto();
  inputTema.value = "";
  inputMinutos.value = "";
  textoError.textContent = "";
}

function mostrarTodo() {
  mostrarRacha();
  mostrarLista();
}

// ---------- Formulario ----------

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const fecha = inputFecha.value;
  const tema = inputTema.value.trim();
  const minutos = Number(inputMinutos.value);

  if (!fecha) {
    textoError.textContent = "Elige una fecha.";
    return;
  }
  if (fecha > hoyTexto()) {
    textoError.textContent = "La fecha no puede ser posterior a hoy.";
    return;
  }
  if (tema === "") {
    textoError.textContent = "Escribe el tema que has estudiado.";
    return;
  }
  if (!Number.isInteger(minutos) || minutos <= 0) {
    textoError.textContent = "Los minutos deben ser un número entero mayor que 0.";
    return;
  }

  sesiones.push({
    id: Date.now(),
    fecha: fecha,
    tema: tema,
    minutos: minutos,
  });

  guardarSesiones();
  prepararFormulario();
  mostrarTodo();
});

// ---------- Inicio ----------

prepararFormulario();
mostrarTodo();

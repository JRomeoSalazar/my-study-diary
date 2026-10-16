# Guía de verificación 002 — Rediseño visual "Brote"

Cómo comprobar que el rediseño funciona. Detalles de diseño en `plan.md` y `research.md`;
contratos en `contracts/`.

## Requisitos

- Chrome (y el MCP de Chrome DevTools). Nada que instalar.
- Abrir las páginas con el MCP en un **contexto aislado** (`isolatedContext`) para no tocar las
  sesiones reales. Ignorar el error "Unsafe attempt to load URL file://..." (lo provoca el MCP).

## 1. Pruebas automáticas

Abrir `tests.html` (doble clic o MCP). Debe verse "N de N pruebas superadas" en verde: las 133
anteriores más las de `inicialDelTema` (CA-8.5, CA-8.6). Nunca usar `node --test`.

## 2. Datos de prueba

En el contexto aislado, guardar en `localStorage["diario-estudio-sesiones"]` sesiones con fechas
calculadas **relativas a hoy** (hoy, ayer, hace 2 días, hace 20 días...), con temas como
"matemáticas", "  álgebra", "3D", "📚 Lectura", "👩‍💻 Programar", un tema de 80 letras sin
espacios, un tema `"   "` y una sesión de 1000000 minutos. Recargar.

## 3. Escenarios

| # | Qué hacer | Resultado esperado | Criterios |
|---|-----------|--------------------|-----------|
| 1 | Ventana a 1280 px | Fondo salvia liso, tarjetas blancas, cabecera con icono de brote; dos columnas (derecha ~390 px), contenido centrado ≤ 1180 px; sin cuadrícula, margen rojo ni fosforito | CA-1.1–1.4, 2.1, 9.1 |
| 2 | Ventana a 1024 px | Dos columnas sin scroll horizontal | §7 |
| 3 | Ventana a 1023 px y a 600 px | Una columna: racha, cifras, mapa, formulario, sesiones; las cifras en una fila | CA-2.2, 4.2 |
| 4 | Ventana a 481 px | Cifras en una fila, sin texto partido ni desbordado | CA-4.2 |
| 5 | Móvil 390 y 360 px | Sin scroll horizontal; cifras: Mejor racha + Este mes arriba, Esta semana debajo a todo el ancho; número de la racha ≥ 80 px; mapa entero | CA-4.3, 4.5, 3.2, RNF-5 |
| 6 | Sin sesiones (borrar la clave) | Mejor racha oculta sin hueco: en ancho, Semana y Mes reparten la fila; a ≤ 480 px, dos columnas iguales; tarjeta de sesiones con "Todavía no has registrado ninguna sesión." | CA-4.4, 8.3 |
| 7 | Tarjeta de la racha | Fondo verde bosque, "Racha actual" verde claro, número blanco (≥ 96 px en ancho), "día seguido"/"días seguidos"; brote grande solo en pantalla ancha | RF-3 |
| 8 | Recargar | El número aparece suave una vez (~0,5 s, sube ~8 px). Guardar una sesión no repite la animación | CA-9.2 |
| 9 | DevTools → Rendering → `prefers-reduced-motion: reduce` y recargar | Sin animación | CA-9.3, RNF-7 |
| 10 | Lista de sesiones | Insignia verde claro con la inicial ("M", "Á", "3", "📚", "👩‍💻"); la sesión de tema `"   "` sin insignia; fecha debajo en gris verdoso; minutos en píldora; "1000000 min" dentro de la tarjeta; tema largo partido sin ensanchar | RF-8, §7 |
| 11 | Lector de pantalla / árbol de accesibilidad | Los iconos y las insignias no se anuncian; orden: racha, cifras, mapa, formulario, sesiones | CA-1.4, 3.3, 8.4, 2.3 |
| 12 | Teclado (Tab y flechas) | Anillo de foco ≥ 3 px en campos, botón y días; el día seleccionado con contorno de 2 px; con los dos a la vez se ven ambas marcas | CA-5.4, 7.3 |
| 13 | Formulario | Campos con relleno suave y ≥ 44 px de alto; botón píldora verde a todo el ancho ≥ 44 px; error en rojo (probar con minutos 0) | RF-7, RNF-6 |
| 14 | Mapa | Cuadros redondeados, niveles de `research.md` R-3, leyenda con los mismos colores, detalle en píldora | RF-5, RF-6 |
| 15 | Zoom 200 % a 1280 px | Una columna; solo el mapa se desplaza en horizontal | RNF-5, §7 |
| 16 | Sin conexión (DevTools → Network → Offline) | Fuentes del sistema; nada se descoloca | RNF-3 |
| 17 | Contraste | Comprobar con DevTools (selector de color) los pares de `research.md` R-3 y R-4 | RNF-4, CA-6.x, 7.5 |
| 18 | Sesiones guardadas antes del cambio | Se ven todas, con los mismos valores de racha, semana, mes y mapa que antes | RNF-1, RNF-2 |
| 19 | Consola | Sin errores de la aplicación | §9 |

## 4. Capturas (opcional)

`google-chrome --headless=new --virtual-time-budget=3000 --window-size=1280,900 --screenshot=...`
(sin el time-budget la animación no se ve).

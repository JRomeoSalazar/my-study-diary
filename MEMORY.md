# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: registrar sesiones, racha actual y lista. Bajo la racha, fila con Mejor
racha / Esta semana / Este mes (JS solo escribe la cifra).
- Diseño "cuaderno de cuadros": fondo cuadriculado, margen rojo, tinta azul; Literata
(títulos y cifras) y Atkinson Hyperlegible (texto). La racha es lo único llamativo
(fosforito animado una vez, sin animación con `prefers-reduced-motion`). Colores en `:root`.
- El código aún no cumple los principios 3 y 4 de la constitución: las `calcular*` usan
`sesiones` global y `new Date()`, y no existe `tests.html`.
- Mapa de calor: spec y plan APROBADOS en `specs/001-heat-map/`, sin código todavía.
`tasks.md` creado (28 tareas, T1–T28, con RF y "Hecho cuando:"); seguir ese orden.
- T1 hecha: existe `logica.js` (script clásico cargado antes de `app.js`) con `fechaATexto`,
`textoAFecha`, `diaAnterior`, `inicioDeSemana` y `formatearMinutos`, movidas sin cambios.
`hoyTexto()` sigue en `app.js`. Racha, semana, mes y lista dan lo mismo que antes.
- T2 hecha: `tests.html` con `prueba(nombre, función)` e `igual(obtenido, esperado)`, resumen
"X de Y pruebas superadas" y 21 pruebas de las 5 funciones movidas (todas OK). Las pruebas
nuevas se añaden en el `<script>` de `tests.html`, antes de `mostrarResultados()`.
- T3 hecha: `logica.js` tiene `SEMANAS_MAPA`, `DIAS_CORTOS`, `MESES_CORTOS`, `TRAMOS_LEYENDA` y
`TEXTO_DETALLE_INICIAL` (valores de plan §2.2), con 5 pruebas en `tests.html` (26 de 26 OK). Siguiente: T4.
- T4 hecha: `esFechaValida` en `logica.js` (formato exacto + día real) con 5 pruebas; `tests.html`
31 de 31 OK. Siguiente: T5.
- T5 hecha: `esSesionValida` y `comoLista` en `logica.js` con 9 pruebas; `tests.html` 40 de 40 OK.
Siguiente: T6.
- T6 hecha: `sumarDias` y `lunesDeLaSemana` en `logica.js` con 9 pruebas; `tests.html` 49 de 49 OK
(también con TZ=Europe/Madrid). Siguiente: T7.
- T7 hecha: `calcularMinutosPorDia` en `logica.js` con 7 pruebas; `tests.html` 56 de 56 OK. Siguiente: T8.
- T8 hecha: `calcularNivel` en `logica.js` con 5 pruebas; `tests.html` 61 de 61 OK. Siguiente: T9.
- T9 hecha: `formatearFechaCorta` y `textoDetalle` en `logica.js` con 6 pruebas; `tests.html` 67 de 67 OK.
Siguiente: T10.
- T10 hecha: `calcularEtiquetasMes` en `logica.js` con 7 pruebas; `tests.html` 74 de 74 OK. Las semanas
son columnas = listas de días `{ fecha }` sin huecos (los huecos son días que no existen).
Siguiente: T11.
- T11 hecha: `calcularMapa(sesiones, hoy)` en `logica.js` → `{ semanas, etiquetasMes }` con 11 pruebas;
`tests.html` 85 de 85 OK. Aún no se usa desde `app.js`/`index.html`. Siguiente: T12.
- T12 hecha: solo pruebas (12) del modelo: periodo, huecos y fechas especiales con 10 "hoy" de referencia;
`tests.html` 97 de 97 OK en 4 zonas horarias; `logica.js` sin cambios. Siguiente: T13.
- T13 hecha: solo pruebas (10) del modelo: datos, niveles, texto y rendimiento (5 000 sesiones ≈ 5-7 ms);
`tests.html` 107 de 107 OK; `logica.js` sin cambios. Siguiente: T14.

## Decisiones (y por qué)
- Fecha editable con máximo hoy: permite apuntar días pasados; una sesión futura no suma.
- Minutos solo enteros > 0. Tras guardar, el formulario se vacía y la fecha vuelve a hoy.
- Mejor racha calculada, no guardada; oculta si es 0 (un récord de 0 no motiva). Sin
mensaje de récord ni fechas del tramo: el usuario no los quiso.
- Semana y mes se muestran aunque sean 0: son datos del periodo, no récords. Mes = mes
natural, sin "X de N días". Minutos: "45 min" / "1 h 45 min" / "2 h".
- Google Fonts permitido por el usuario: es un `<link>`, funciona con `file://` y sin
conexión usa las fuentes del sistema. Sin emojis en la interfaz (petición del usuario).
- Spec 001: la carpeta `001-heat-map` se queda en inglés por decisión del usuario (no
renombrar). Criterios marcados [auto], [manual] o [auto + manual] (este último, porque
`tests.html` con `file://` no puede cargar `index.html`).

## Aprendizajes y errores a evitar
- Cifras en serif: forzar `font-variant-numeric: lining-nums` (Georgia usa cifras antiguas).
- Si cambia la fuente, revisar los % del degradado de `.fosforito`.
- En móvil, "3 h 10 min" se partía: `.racha-datos dd` lleva `nowrap` y letra menor.
- En móvil (360 px) el contenido útil mide 310 px; el mapa planificado ocupa 308.
- No usar `node --test` (prohibido en `AGENTS.md`; las pruebas irán en `tests.html`). Para
refactors sin tests aún: sembrar sesiones relativas a hoy en `localStorage` (contexto
aislado), recargar y comparar las cifras del DOM antes y después.
- Capturas: `google-chrome --headless=new --virtual-time-budget=3000 --screenshot=...`
(sin el time-budget la animación no se ve).

## Próximos pasos
- Implementar el mapa siguiendo `specs/001-heat-map/tasks.md` (siguiente: T3,
constantes de texto). Con `tests.html`, actualizar "Verificación" en `AGENTS.md`.
- Después, en otra tarea: pasar racha, semana y mes a funciones puras (principio 3).

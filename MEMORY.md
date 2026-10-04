# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual y lista de
sesiones.
- Bajo la racha, fila `<dl class="racha-datos">` con Mejor racha / Esta semana / Este mes
(etiqueta + cifra). JS solo escribe el valor ("4 días", "3 h 10 min"); la mejor racha
oculta su `div#mejor-racha` y escribe en `#mejor-racha-valor`.
- Diseño "cuaderno de cuadros": fondo cuadriculado (CSS), margen rojo a la izquierda,
tinta azul. Fuentes de Google Fonts: Literata (títulos y cifras) y Atkinson Hyperlegible
(texto), con fuentes del sistema de respaldo. La racha es lo único llamativo: número
grande con trazo de fosforito animado una vez al cargar (desactivado con
`prefers-reduced-motion`). Colores en variables `:root`. Sin emojis en la interfaz.
- Las secciones usan la clase `.seccion` (ya no hay tarjetas).
- `README.md` en español. No hay `LICENSE` ni `CONTRIBUTING.md`: el README remite a `AGENTS.md`.
- `docs/constitution.md`: 6 principios innegociables (stack, spec, lógica/interfaz, tests,
datos, español). El código aún no cumple el 3 (las `calcular*` usan `sesiones` global y
`new Date()`) ni el 4 (no hay `tests.html` ni `specs/`).

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- Fecha máxima = hoy: una sesión futura no tiene sentido y no sumaría a la racha.
- Minutos solo enteros (> 0). Tras guardar, el formulario se vacía y la fecha vuelve a hoy.
- Mejor racha calculada, no guardada: no cambia el formato de datos y se corrige sola si se
apuntan días pasados que unen rachas.
- Mejor racha oculta si es 0 (un récord de 0 no motiva). Sin mensaje de récord ni fechas
del tramo: el usuario no los quiso.
- Total semanal calculado, no guardado. Se muestra aunque sea 0 ("0 min"). Formato: < 60 →
"45 min"; ≥ 60 → "1 h 45 min"; horas exactas → "2 h" (sin "0 min").
- Días del mes: mes natural (día 1 a hoy), no "últimos 30 días". Se muestra aunque sea 0
("0 días"), como la semana: es un dato del periodo, no un récord. Sin "X de N días".
- Google Fonts permitido por el usuario (excepción a "sin dependencias"): es un `<link>`,
funciona con `file://` y sin conexión cae a las fuentes del sistema.
- Emojis quitados a petición del usuario: el fosforito es el único acento visual.
- Tests en `tests.html` (navegador), no con `node --test`: el usuario lo descartó por no
encajar con el proyecto. Specs en `specs/NNN-*/` en la raíz, no en `docs/`.

## Aprendizajes y errores a evitar
- Los campos guardados están en español (`fecha`, `tema`, `minutos`); `AGENTS.md` llegó a
decir `date/topic/minutes`. Contrastar siempre la documentación con `app.js`.
- Para filtrar por mes basta comparar el prefijo "AAAA-MM" de la fecha (sin `Date`, sin UTC).
- Algunas serif (Georgia) usan cifras "de estilo antiguo": forzar `font-variant-numeric:
lining-nums` en cifras serif.
- El trazo de fosforito depende de las proporciones de la fuente: si cambia la fuente,
revisar los % del degradado de `.fosforito`.
- En móvil, "3 h 10 min" se partía: `.racha-datos dd` lleva `nowrap` y letra menor.
- Capturas para revisar: `google-chrome --headless=new --virtual-time-budget=3000
--screenshot=...` (sin el time-budget la animación no se ve).
- Pruebas con el MCP de Chrome DevTools: abrir con `isolatedContext` para no tocar las
sesiones reales. El error de consola "Unsafe attempt to load URL file://..." lo provoca el
MCP al abrir `file://`, no la app (no sale al abrir Chrome normal). Ignorarlo.

## Próximos pasos
- Adaptar el código a la constitución (pedir permiso antes: crea archivos): funciones puras
con la fecha de hoy como parámetro, `tests.html` y specs en `specs/`.
- Cuando exista `tests.html`, cambiar "No hay tests automáticos" en Verificación de `AGENTS.md`.
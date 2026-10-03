# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.

## Estado actual
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual y lista de
sesiones.
- Mejor racha (🏆) en la tarjeta de la racha, como línea pequeña bajo la racha actual.
- Total de minutos de la semana (📚, lunes a domingo) en la tarjeta de la racha, bajo la 🏆.
- Datos en localStorage.

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

## Aprendizajes y errores a evitar
- Los campos guardados están en español (`fecha`, `tema`, `minutos`); `AGENTS.md` llegó a
decir `date/topic/minutes`. Contrastar siempre la documentación con `app.js`.

## Próximos pasos
- (vacío por ahora)
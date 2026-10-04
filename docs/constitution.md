# Constitución del Diario de Estudio
Principios innegociables. Un cambio que incumpla alguno no se acepta.

1. **Stack mínimo.** Solo HTML, CSS y JavaScript puros: sin npm, frameworks, build ni
   módulos ES. `index.html` funciona abierto con doble clic (`file://`).
2. **La spec manda.** Cada funcionalidad tiene su spec en `specs/`. Spec y código cambian
   en el mismo commit; si no coinciden, es un error.
3. **Lógica separada de la interfaz.** Los cálculos (racha, semana, mes, formatos) son funciones
   puras: reciben las sesiones y la fecha de hoy, devuelven un valor y no tocan ni el DOM ni localStorage.
4. **Cada regla tiene su test.** Cada regla de una spec tiene al menos un test en `tests.html`,
   que se abre en el navegador sin instalar nada. Antes de cada commit, todos tienen que pasar.
5. **Los datos del usuario son sagrados.** Ningún cambio puede perder ni romper lo guardado en
   `diario-estudio-sesiones`. Si cambia el formato, se pregunta antes y se siguen leyendo los datos antiguos.
6. **Todo en español.** Los textos de la interfaz, los nombres de variables y funciones, los
   comentarios y la documentación van en español, escritos para quien empieza a programar.

# Constitución del Diario de Estudio

Principios innegociables. Un cambio que incumpla alguno no se acepta.

## Principios

### I. Stack mínimo

Solo HTML, CSS y JavaScript puros: sin npm, frameworks, build ni módulos ES. `index.html`
funciona abierto con doble clic (`file://`).

### II. La spec manda

Cada funcionalidad tiene su spec en `specs/`. Spec y código cambian en el mismo commit; si no
coinciden, es un error.

### III. Lógica separada de la interfaz

Los cálculos (racha, semana, mes, formatos) son funciones puras: reciben las sesiones y la fecha
de hoy, devuelven un valor y no tocan ni el DOM ni localStorage.

### IV. Cada regla tiene su test

Cada regla de una spec tiene al menos un test en `tests.html`, que se abre en el navegador sin
instalar nada. Antes de cada commit, todos tienen que pasar.

### V. Los datos del usuario son sagrados

Ningún cambio puede perder ni romper lo guardado en `diario-estudio-sesiones`. Si cambia el
formato, se pregunta antes y se siguen leyendo los datos antiguos.

### VI. Todo en español

Los textos de la interfaz, los nombres de variables y funciones, los comentarios y la
documentación van en español, escritos para quien empieza a programar.

## Gobierno

- Esta constitución está por encima de cualquier otra norma del proyecto. Cada spec, plan y
  conjunto de tareas debe comprobar que la cumple.
- Cambiarla requiere la aprobación explícita del usuario y se hace con `/speckit-constitution`.
- Versionado semántico: MAYOR si se elimina o redefine un principio, MENOR si se añade un
  principio o sección, PARCHE si solo se aclara la redacción.
- Las normas de trabajo del día a día (convenciones, reglas de fechas, verificación) están en
  `AGENTS.md`.

**Versión**: 1.0.0 | **Ratificada**: 2026-10-04 | **Última modificación**: 2026-10-16

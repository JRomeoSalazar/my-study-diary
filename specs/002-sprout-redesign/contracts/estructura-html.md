# Contrato: estructura de `index.html` que usa `app.js`

El rediseño reorganiza `index.html` en tarjetas y columnas, pero `app.js` busca estos
elementos por `id` y **todos deben seguir existiendo, con el mismo id y el mismo tipo de
contenido**:

| id | Qué es | Lo usa |
|----|--------|--------|
| `formulario`, `fecha`, `tema`, `minutos`, `error` | Formulario y mensaje de error | eventos y `prepararFormulario()` |
| `racha-dias`, `racha-texto` | Número y texto de la racha | `mostrarRacha()` |
| `mejor-racha` (con `hidden`), `mejor-racha-valor` | Tarjeta y valor de la mejor racha | `mostrarRacha()` |
| `minutos-semana` | Valor "Esta semana" | `mostrarSemana()` |
| `dias-mes` | Valor "Este mes" | `mostrarMes()` |
| `mapa`, `mapa-titulo`, `mapa-detalle`, `mapa-leyenda` | Mapa de calor (spec 001) | `mostrarMapa()` y eventos |
| `lista`, `vacio` | Lista de sesiones y mensaje vacío | `mostrarLista()` |

## Orden del documento (CA-2.2, CA-2.3)

```text
main.contenedor
├── header.cabecera            icono-brote.svg (decorativo) + h1 "Diario de Estudio"
└── div.columnas
    ├── div.columna-principal  racha → cifras (Mejor racha, Esta semana, Este mes) → mapa
    └── div.columna-lateral    formulario → sesiones
```

## Cambios permitidos en el HTML

- La lista `<dl class="racha-datos">` sale de la tarjeta de la racha y pasa a ser su propio
  bloque de tarjetas (`.cifras`), con cada `<div>` como tarjeta (`.cifra`). Se mantienen `dt`/`dd`.
- `#racha-dias` deja la clase `fosforito` (CA-9.1).
- Imágenes decorativas: `<img src="icono-brote.svg" alt="">` y `<img src="brote-racha.svg" alt="">`.
- En `app.js`, solo `mostrarLista()` cambia: añade la insignia
  (`<span class="sesion-insignia" aria-hidden="true">`) delante del tema cuando
  `inicialDelTema(sesion.tema) !== ""`. Nada más de `app.js` cambia.

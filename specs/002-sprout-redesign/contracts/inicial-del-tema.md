# Contrato: `inicialDelTema(tema)`

Archivo: `logica.js` (script clásico, sin `export`). Función pura: no toca el DOM ni
`localStorage` y no modifica lo que recibe (principio III).

## Entrada

- `tema`: normalmente un texto. Puede llegar cualquier valor desde datos antiguos o corruptos.

## Salida

- Un texto con **un solo grafema** (lo que la persona ve como un carácter) en mayúscula, o `""`.

## Reglas

1. Si `tema` no es un texto → `""`.
2. Se quitan los espacios del principio (`trimStart()`: espacios, tabuladores, saltos de línea,
   espacio duro).
3. Si no queda nada → `""` (CA-8.6).
4. Se toma el primer grafema con `Intl.Segmenter("es", { granularity: "grapheme" })`; si el
   navegador no lo tiene, `Array.from(texto)[0]` (ver `research.md`, R-1).
5. Se devuelve en mayúscula con `toLocaleUpperCase("es-ES")` (CA-8.5).

## Ejemplos (cada uno es una prueba en `tests.html`)

| Entrada | Salida | Criterio |
|---------|--------|----------|
| `"matemáticas"` | `"M"` | CA-8.5 |
| `"  álgebra"` | `"Á"` | CA-8.5 |
| `"3D"` | `"3"` | CA-8.5 |
| `"ñandú"` | `"Ñ"` | CA-8.5 |
| `"\tHistoria"` | `"H"` | CA-8.5 |
| `"Física"` | `"F"` | CA-8.5 |
| `"a\u0301lgebra"` (a + tilde aparte; en `tests.html` se escribe **con escapes**: `igual(inicialDelTema("a\u0301lgebra"), "A\u0301")`) | `"A\u0301"` | CA-8.5 (no se parte) |
| `"📚 Lectura"` | `"📚"` | CA-8.5 (emoji entero) |
| `"👩‍💻 Programar"` | `"👩‍💻"` | CA-8.5 (emoji compuesto entero) |
| `"🇪🇸 Español"` | `"🇪🇸"` | CA-8.5 (bandera entera) |
| `"❤️ Música"` | `"❤️"` | CA-8.5 (emoji con selector de variante) |
| `""` | `""` | CA-8.6 |
| `"   "` | `""` | CA-8.6 |
| `"\t \n"` | `""` | CA-8.6 |
| `undefined`, `null`, `42`, `{}` | `""` | CA-8.6 (datos corruptos) |

## Fuera de alcance

- Los caracteres invisibles que `trimStart()` no quita, como el espacio de ancho cero (U+200B):
  un tema que empiece por uno daría ese carácter invisible como inicial. No se trata en esta
  spec.

## Quién la usa

- `mostrarLista()` en `app.js`: si devuelve `""`, no crea la insignia.

# Investigación 002 — Rediseño visual "Brote"

Spec: `specs/002-sprout-redesign/spec.md` · Plan: `specs/002-sprout-redesign/plan.md`

No quedaban dudas abiertas en la spec (ver Clarificaciones 2026-10-16). Aquí se recogen las
decisiones técnicas que la spec deja en manos del plan.

## R-1. Cómo sacar la inicial sin partir emojis (CA-8.5)

- **Decisión:** `Intl.Segmenter` con `granularity: "grapheme"` para tomar el primer carácter
  "visible" (grafema) del tema sin espacios iniciales (`trimStart()`), y
  `toLocaleUpperCase("es-ES")` para la mayúscula. Si el navegador no tiene `Intl.Segmenter`,
  se usa `Array.from(texto)[0]` (no parte las parejas de emoji normales, aunque sí los emojis
  compuestos).
- **Por qué:** `texto[0]` y `charAt(0)` parten los emojis en dos mitades ("�"). `Array.from`
  respeta los emojis sencillos (📚), pero parte los compuestos (👩‍💻, 🇪🇸, ❤️) y los acentos
  escritos como letra + tilde aparte ("a" + "\u0301", la tilde como carácter aparte). `Intl.Segmenter` es parte del navegador
  (Chrome 87+, Safari 14.1+, Firefox 125+): no es una dependencia y funciona con `file://`.
- **Alternativas descartadas:** expresiones regulares con `\p{Extended_Pictographic}` (difíciles
  de leer para quien empieza y no cubren banderas ni secuencias); una librería (prohibido,
  principio I).

## R-2. Iconos del brote (CA-1.4, CA-3.3)

- **Decisión:** dos archivos SVG nuevos en la raíz, junto a `index.html`: `icono-brote.svg`
  (cabecera) y `brote-racha.svg` (brote grande de la tarjeta de la racha). Se cargan con
  `<img src="..." alt="">`, que funciona con `file://`. Cada SVG lleva su color escrito dentro
  (una imagen cargada con `<img>` no hereda colores del CSS).
- **Por qué:** decisión del usuario (un archivo por icono, creación autorizada). `<img>` no
  necesita `fetch` ni servidor. `alt=""` hace que los lectores de pantalla lo ignoren.
- **Alternativas descartadas:** SVG dentro del HTML (el usuario pidió archivos aparte);
  `fetch` del SVG (no funciona con `file://`); una carpeta `img/` (más estructura para solo dos
  archivos; ver "Decisiones a revisar" en el plan).

## R-3. Colores del mapa (RF-6)

Los verdes de la maqueta no cumplen el 1,4:1 entre niveles contiguos. Valores calculados con
la fórmula de contraste de WCAG sobre el blanco de la tarjeta (`#FFFFFF`):

| Nivel | Color | Contraste con blanco | Con el nivel anterior |
|-------|-------|----------------------|-----------------------|
| 0 | `#C4CFC7` | 1,60:1 (mín. 1,5) | — |
| 1 | `#7FB592` | 2,35:1 | 1,47:1 |
| 2 | `#4F9A70` | 3,39:1 | 1,44:1 |
| 3 | `#2E7652` | 5,48:1 | 1,62:1 |
| 4 | `#1E5A3E` (verde bosque) | 8,12:1 (mín. 3) | 1,48:1 |

- **Decisión:** usar esta tabla. El nivel 4 es exactamente el verde bosque (CA-5.2).
- **Alternativas descartadas:** los verdes de la maqueta (nivel 0 → 1 por debajo de 1,4:1).

## R-4. Contraste del resto de colores (RNF-4, CA-7.5)

| Texto | Fondo | Contraste |
|-------|-------|-----------|
| `#15241C` texto principal | blanco / `#F4F7F4` | 16,14 / 14,96 |
| `#56645B` texto secundario y textos de ejemplo | blanco / `#F4F7F4` / `#EDF1EC` | 6,23 / 5,77 / 5,46 |
| blanco (número de la racha) | `#1E5A3E` | 8,12 |
| `#CFE8D7` ("Racha actual", "días seguidos") | `#1E5A3E` | 6,25 |
| `#1E5A3E` (inicial de la insignia) | `#DCEFE2` (fondo de la insignia) | 6,76 |
| `#1E5A3E` (minutos en la píldora) | `#EDF1EC` | 7,11 |
| `#B42318` (mensaje de error) | blanco | 6,57 (mín. 4,5) |

- **Anillo de foco:** `#2E8B57`, 3 px y separado 2 px del elemento. Contraste 4,25:1 con el
  blanco y 3,8:1 con el contorno de "seleccionado" (`#15241C`, 2 px): se distinguen por grosor,
  separación y color (CA-5.4, CA-7.3).
- **Brote grande:** `#2C6E4D` sobre `#1E5A3E` (1,33:1). Es decorativo y debe ser sutil, así que
  no necesita contraste mínimo.

## R-5. Distribución y tarjetas de cifras

- **Dos columnas (CA-2.1):** `display: grid` con `grid-template-columns: minmax(0, 1fr) 390px`
  desde 1024 px; contenedor con `max-width: 1180px` y `margin: 0 auto`. El orden del HTML no
  cambia (izquierda: racha, cifras, mapa; derecha: formulario, sesiones), así que el teclado y
  los lectores siguen el orden de CA-2.3. Con zoom al 200 % en 1280 px la ventana mide 640 px
  "CSS" y se pasa sola a una columna.
- **Cifras en una fila (CA-4.2, > 480 px):** `grid-auto-flow: column` + `grid-auto-columns: 1fr`:
  las tarjetas visibles se reparten la fila y una oculta no deja hueco (CA-4.4).
- **Cifras a 480 px o menos (CA-4.3):** `grid-template-areas: "mejor mes" "semana semana"`.
  Con la mejor racha oculta (CA-4.4 y Clarificaciones), `.cifras:has(#mejor-racha[hidden])` pasa
  a `"semana mes"` (dos columnas iguales). `:has()` está en Chrome 105+, Safari 15.4+ y
  Firefox 121+, y evita tocar `app.js`.
- **Ojo con `hidden`:** una regla como `.cifra { display: flex }` anula el atributo `hidden`.
  Hay que añadir `.cifra[hidden] { display: none; }`.
- **Alternativa descartada:** que `app.js` ponga una clase "sin-mejor-racha" en el contenedor
  (más código JS para algo que el CSS ya resuelve).

## R-6. Aparición suave de la racha (CA-9.2, CA-9.3)

- **Decisión:** `@keyframes` de `opacity: 0; transform: translateY(8px)` a
  `opacity: 1; transform: none`, `0.5s ease-out` aplicada una vez a `.racha-numero`. Con
  `prefers-reduced-motion: reduce`, `animation: none`.
- **Por qué no se repite al guardar:** `mostrarRacha()` (en `app.js`) solo cambia el
  `textContent` de `#racha-dias`; el elemento no se vuelve a crear, así que la animación CSS no
  se reinicia.

## R-7. Fuentes

- **Decisión:** cambiar el `<link>` de Google Fonts por Bricolage Grotesque (títulos y cifras,
  700) y Figtree (texto, 400 y 600), con `display=swap`. Por ejemplo:
  `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;600&display=swap`
  (comprobar en la pestaña Red de DevTools que responde 200 y que las fuentes se aplican).
- Pilas de reserva: `"Bricolage Grotesque", system-ui, "Segoe UI", Roboto, sans-serif` y
  `Figtree, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.
- Cifras: `font-variant-numeric: lining-nums tabular-nums` (CA-1.2). Comprobar que Bricolage las
  aplica; si no, se nota en que "111" y "888" ocupan distinto ancho.

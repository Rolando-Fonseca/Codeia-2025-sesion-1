# Especificación del kit UI (shadcn/ui + Tailwind)

UI mínima para aplicación tipo Netflix usando la librería `shadcn/ui` sobre Tailwind.

## 1. Catálogo de componentes y estados

- **Navbar**
  - Estados: `idle`, `focus` (campo de búsqueda), `loading` (spinner en búsqueda).

- **Grid/ScrollArea**
  - Estados: `idle`, `loading` (skeletons visibles), `empty` (mensaje "No hay resultados").

- **MovieCard / SeriesCard**
  - Estados: `idle`, `hover` (elevación + sombreado), `focus` (outline accesible), `loading` (skeleton interno).

- **Detail Pane**
  - Estados: `idle`, `loading` (skeletons en texto e imagen), `error` (mensaje de fallo de carga).

- **Dialog**
  - Estados: `open`, `closed`, `loading` (trailer preparando) y `error`.

- **Buttons, Inputs, DropdownMenu** se comportan como en shadcn/ui con estados estándar (`idle`, `hover`, `focus`, `disabled`).

## 2. Variants necesarias

- **Card**
  - `compact`: solo imagen y título (para filas horizontales).
  - `wide`: muestra también rating/genre badge y breve overview.

- **Badge**
  - `rating`: fondo amarillo/verde, texto oscuro, rounded-full.
  - `genre`: fondo semitransparente oscuro, texto claro, small size.

- **Dialog**: `trailer` (video), `info` (texto con botones).

## 3. Tokens de Tailwind

- Colores (ya definidos en design_tokens):
  - `bg-base`: `#0b0b0f`
  - `bg-surface`: `#11131a` / `#151827`
  - `text-primary`: `#f2f2f7`

- Espaciado:
  - `spacing-1` → `0.25rem` (4px)
  - `spacing-2` → `0.5rem` (8px)
  - `spacing-3` → `0.75rem` (12px)
  - `spacing-4` → `1rem` (16px)
  - `spacing-6` → `1.5rem` (24px)

- Bordes:
  - `rounded-2xl`, `rounded-md`.

- Sombras:
  - `shadow-sm`, `shadow-md` suaves.

- Tipografía:
  - `text-base`, `text-sm`, `text-lg`, `text-xl`, `text-2xl`.
  - `tracking-tight` para títulos.

## 4. Reglas de accesibilidad

1. **Navbar:** campo de búsqueda con `aria-label`, botón claramente nombrado. Menú de filtros con roles y `aria-haspopup`.
2. **Foco visible:** todos los elementos interactivos deben tener outline de mínimo 2px de contraste 3:1.
3. **MovieCard:** el `hover` no debe ser único mecanismo de acceso; también recibir focus y click con teclado.
4. **Dialog:** manejar foco trampa dentro cuando abierto y retorno al elemento disparador al cerrarse.
5. **Contrast ratios:** texto vs fondo > 4.5:1 (AA) en contenido normal y 3:1 en grandes títulos.
6. **Ale‑reflow:** evitar cambios de layout repentinos al cargar datos; usar skeletons con tamaño fijo.
7. **Notificaciones (Toast):** accesibles mediante `role="status"` y `aria-live="polite"`.
8. **Imágenes:** incluir `alt` descriptivo en pósters; si faltan usar `aria-hidden="true"` y un texto alternativo en el card.

> Esta especificación sirve para guiar el desarrollo con shadcn/ui/Tailwind, garantizando consistencia, variantes y cumplimiento de accesibilidad.

## 5. Patrones de Netflix vs shadcn/ui + Tailwind

| Patrón típico             | Componentes/Utilidades                                                             | Riesgos                                        | Mitigaciones                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --- |
| Fila por género/categoría | `ScrollArea` horizontal con `grid-cols-2 sm:3 md:4 lg:6`, cada ítem `Card compact` | Carga excesiva en cliente, scroll jerky        | Limitar items pre-cargados, usar placeholder y lazy-load; aplicar `scroll-smooth` y `snap-x` si conviene |
| Card hover con elevación  | `Card` + `shadow-md` on `hover`, `transition-shadow`                               | Conflicto con modo táctil (sin hover)          | Añadir `focus` con misma elevación; aplicar `motion-reduce` para usuarios sensibles                      |
| Trailer modal             | `Dialog` con visualización de vídeo/`iframe`; `DialogTrigger` en botón             | Auto-play rompe accesibilidad; tamaño variable | Desactivar auto-play, proveer controles nativos; `aria-describedby` del vídeo                            |
| Badges de madurez/rating  | `Badge` variants (rating/genre) con clases de color dinámico                       | Contraste insuficiente en dark mode            | Comprobar ratio y ajustar color; ofrecer texto alternativo para iconos                                   | >   |

> Esta tabla ayuda a traducir patrones visuales conocidos en implementaciones concretas usando la librería de componentes y utilidades de Tailwind.

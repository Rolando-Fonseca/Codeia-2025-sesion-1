# Componentes UI

Lista de componentes pensados para la aplicación tipo Netflix.

## Layout

- **Card**: tarjeta para películas/series con título, póster y rating.
- **Separator**: línea o espacio delimitador entre secciones.
- **ScrollArea**: contenedor con scroll personalizado para listas largas.

## Interacción

- **Button**: botón primario/ secundario para acciones.
- **Dialog**: modal de confirmación o detalles (se usa para el detalle de película).
- **Tabs**: pestañas para navegar entre categorías (p.ej. "Trending", "Popular").
- **DropdownMenu**: menú emergente para filtros y opciones.

## Entrada

- **Input**: campo de texto estándar.
- **Command (buscador)**: componente de búsqueda con auto‑completado.
- **Badge**: etiqueta visual para rating, género u otros indicadores.

## Feedback

- **Skeleton**: placeholders durante la carga de datos.
- **Toast**: notificaciones breves (errores, confirmaciones).

## Media/Ratio

- **AspectRatio**: contenedor que mantiene la proporción para imágenes de pósters.

## Layout y patrones

- **Navbar**: barra superior sticky (`top-0`) con `backdrop-blur`, `px-4 py-3`. Contiene botón (logo/home), campo de búsqueda y `DropdownMenu` de filtros.
- **Home Page**:
  - Secciones por categoría (Trending, Popular, etc.).
  - Cada sección es una fila con título y `ScrollArea` horizontal.
  - Grid principal: `grid gap-6 grid-cols-2 sm:3 md:4 lg:6` dentro de cada fila.
- **MovieCard / SeriesCard**:
  - Componente `Card` con `Badge` para rating/género.
  - Usa `AspectRatio` para el póster.
  - Skeleton interno para carga.
  - Estilo: `rounded-2xl overflow-hidden`, `hover` eleva con sombra.
- **Detail view**:
  - Contenedor central `max-w-4xl space-y-6`.
  - Usa `Dialog` para reproducir trailer.
  - Incluye badges y botones de acción.
  - Debe ser accesible y legible (focus, contrastes).

## Skeleton Patterns

- **MovieCard**:
  - Tamaño: 150x225px (proporción 2/3) placeholder con `rounded-2xl`.
  - Elementos: rectángulo para póster, barra para título (80% width), círculo pequeño para rating.
  - Timing: mostrar inmediatamente al iniciar fetch; durar mínimo 500 ms para evitar parpadeo.
  - Usar efecto **shimmer** cuando la consulta tarde más de 300 ms.
- **Detail**:
  - Placeholder completo de poster grande (w-full h-64) + bloques de texto (título, badges, overview).
  - Timing: mantener hasta que todos los datos esenciales estén listos.
  - Shimmer si el backend responde lentamente (>500 ms).

### 🧾 Checklist Skeleton vs. estados vacíos

- [ ] Mostrar **Skeleton** cuando se está esperando respuesta inicial de API (primer load o cambio de filtro/página).
- [ ] Si la petición completa y retorna lista vacía (`results: []`), reemplazar skeleton por estado **empty** con mensaje "No hay resultados".
- [ ] No usar skeleton para fallos (mostrar toast/alerta).
- [ ] En navegación interna (por ejemplo, seleccionar una card) usar skeleton en Detail, no en Home.
- [ ] Evitar skeleton repetitivos en scroll infinito; usa placeholders en la zona de carga incremental.

## Experiencia de búsqueda (Command)

- **Atajo de teclado**: `Ctrl+K` o `/` abre la caja `Command` en foco.
- **Resultados**:
  - Mostrar lista de `title (year) – rating`.
  - Cada elemento es un `button`/`link` con `role="option"` dentro de un `listbox` (`role="listbox"`).
- **Interacción por teclado**:
  - `ArrowDown`/`ArrowUp` navegan entre opciones; el elemento enfocado usa `aria-selected="true"` y outline visible.
  - `Enter` selecciona y redirige a la Detail.
  - `Esc` cierra el command box y retorna foco al campo de búsqueda en Navbar.
- **Estados vacíos y errores**:
  - Si no hay resultados, mostrar texto "No se encontraron coincidencias" con `role="alert"` y `aria-live="polite"`.
  - En caso de error (429, red), desplegar toast con el mensaje y mantener command abierto para reintentar.
- **Criterios de foco y ARIA**:
  - Caja de búsqueda tiene `role="combobox"` y `aria-expanded` dinámico.
  - Campo de entrada usa `aria-autocomplete="list"` y `aria-controls` apuntando al `listbox`.
  - Asegurar que el `listbox` es descrito con `aria-label="Resultados de búsqueda"`.
  - Todos los elementos interactivos deben ser alcanzables por tabulación y manejar focus visible.
- **Accesibilidad adicional**:
  - Si el command se abre con atajo, el foco entra directamente en el input y el teclado no debe haber saltos de scroll inesperados.
  - Los textos de error/empty se leen automáticamente por lectores con `aria-live`.

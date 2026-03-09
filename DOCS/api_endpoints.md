# API Endpoints TMDB

| Endpoint | Description | Rate Limit | Example Request | Example Response |
|----------|-------------|------------|-----------------|------------------|
| `/movie/{id}` | Get movie details | 40 req/10s | `GET /movie/550?api_key=API_KEY` | `{ "id": 550, "title": "Fight Club" }` |
| `/search/movie` | Search movies | 40 req/10s | `GET /search/movie?query=Inception&api_key=API_KEY` | `{ "results": [...] }` |
| `/search/tv` | Search TV series | 40 req/10s | `GET /search/tv?query=Breaking+Bad&api_key=API_KEY` | `{ "results": [...] }` |
| `/trending/{media_type}/{time_window}` | Trending movies/TV | 40 req/10s | `GET /trending/all/day?api_key=API_KEY` | `{ "results": [...] }` |

*Límites sujetos a cambios según política de TMDB.*

## Notas de UI

La aplicación cliente debe soportar los siguientes elementos comunes:

- **Filtros**: género, año, calificación, tipo (movie/series) y otros parámetros admitidos por `/discover`.
- **Buscador**: utiliza los endpoints `/search/movie` y `/search/tv` con paginación.
- **Paginación**: manejar `page` y `total_pages` en las respuestas; cargar más al desplazarse.
- **Cards**:
  - MovieCard y SeriesCard con título, póster, año y rating.
- **Skeleton de carga**: visualización de placeholders mientras se obtienen datos.
- **Modal de detalles**: abrir overlay con información completa al hacer click en una card; datos obtenidos de `/{type}/{id}`.

Estos elementos deben diseñarse pensando en rendimiento y accesibilidad.

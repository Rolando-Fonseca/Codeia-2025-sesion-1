# Modelo de Datos Normalizado

Se debe mantener una estructura normalizada para películas, actores y géneros.

## Entidades

- **Movie**: id, title, release_date, genre_ids[], overview
- **Genre**: id, name
- **Actor**: id, name, character, movie_id

## Reglas de transformación

1. Convertir `release_date` a formato ISO.
2. Mapear `genre_ids` a nombres mediante la tabla `Genre`.
3. Eliminar campos nulos o vacíos.
4. Unificar mayúsculas/minúsculas en `title`.
   data_model.md :{ "id": 123, "title": "Ejemplo", "poster_path": "/abc.jpg", "vote_average": 8.56 }
   { "id": 123, "title": "Ejemplo", "poster": "https://image.tmdb.org/t/p/w500/abc.jpg", "rating": 8.6 }
   git add DOCS/data_model.md
   git commit -m "docs: definir modelo de datos normaliza
   git add ../DOCS/data_model.md ../DOCS/plan_commits.md

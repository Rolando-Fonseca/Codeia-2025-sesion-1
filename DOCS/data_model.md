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

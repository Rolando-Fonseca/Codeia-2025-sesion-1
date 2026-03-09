# Contrato de Datos - Modelo Normalizado

Define el esquema y las reglas que debe cumplir cualquier objeto `Movie` transformado en la aplicación.

## Esquema
```ts
interface Movie {
  id: number;                    // requerido, entero positivo
  title: string;                 // requerido, no vacío
  overview: string;              // opcional, cadena ("" si falta)
  poster: string | null;         // opcional, URL completa o null
  year: number | null;           // opcional, YYYY o null si desconocido
  genres: string[];              // requerido, al menos un elemento
  rating: number | null;         // opcional, 0..1 o null si no disponible
}
```

### Reglas de validación
- `id` debe venir del API y no puede duplicarse entre registros.
- `title` se normaliza (trim + capitalización simple) y no puede quedar vacío.
- `overview` se limpia de HTML y se recorta a 1000 caracteres max.
- `poster` se construye con base en `poster_path`; si no existe, queda `null`.
- `year` se extrae de `release_date` o `first_air_date`; si no hay valor válido, `null`.
- `genres` se mapean a nombres; si la lista queda vacía, se coloca `['Unknown']`.
- `rating` = `vote_average / 10`; si `vote_count < 50` o valor ausente, puede ser `null`.
- Todos los campos adicionales deben ser eliminados previamente (no permitir objetos adyacentes).

## Casos límite y respuestas esperadas
1. **Pelicula sin poster**
   - Entrada: `{..., poster_path: null, ...}`
   - Salida: `poster: null` en el artefacto y la documentación debe reflejar que `poster` es nullable.
2. **Rating nulo o insuficiente**
   - Entrada: `{vote_average: 0, vote_count: 0}` o `vote_average` ausente.
   - Salida: `rating: null`; documento menciona que rating es opcional y la lógica de `vote_count` se registra.
3. **Año desconocido**
   - Entrada: `{release_date: ""}` o campo faltante.
   - Salida: `year: null`; se registra en documentación la posibilidad y efecto en UI.
4. **Paginación incompleta (API devuelve menos items que `pageSize`)**
   - Artefacto: lista de `Movie[]` potencialmente vacía; la API client debe documentar `total_pages` y permitir el soft-fall.
   - La documentación indica manejar arrays vacíos y proseguir con siguiente página hasta `page === total_pages`.
5. **Error 429 (rate limit)**
   - No produce artefacto `Movie`; el contrato documenta que el `httpClient` retrowarrea un error específico (`RateLimitError`) y el flujo debe reintentar/exponer al llamador.

> Este contrato se usa para validar las transformaciones y generar tests automáticos; cualquier desvío debe bloquear la integración.

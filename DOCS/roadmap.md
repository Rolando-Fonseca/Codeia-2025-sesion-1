# Roadmap MVP

## Milestones (semanales)

1. **Semana 1 (2026-03-10)** - Configuración inicial
   - Estructura del proyecto, dependencias.
   - httpClient y normalizer básicos.
2. **Semana 2 (2026-03-17)** - Consumo y visualización de películas
   - Home con Grid y MovieCard.
3. **Semana 3 (2026-03-24)** - Detalle y navegación
   - Detail view y selección de tarjeta.
4. **Semana 4 (2026-03-31)** - Calidad y despliegue
   - Validación de datos, tests, release v1.0.0.

## Backlog priorizado

| Prioridad | Issue                   | Etiqueta | Objetivo                                   | DoD                                              | Dependencia previa |
| --------- | ----------------------- | -------- | ------------------------------------------ | ------------------------------------------------ | ------------------ |
| 1         | Inicializar repo        | chore    | Crear esqueleto con README y archivos base | Repo con estructura mínima y scripts de arranque | -                  |
| 2         | Añadir httpClient       | feat     | Implementar wrapper de llamadas TMDB       | Capa funcional con tests simulado                | Inicializar repo   |
| 3         | Añadir normalizer       | feat     | Transformar JSON a modelo estándar         | Funciones con ejemplos y tests                   | httpClient         |
| 4         | Crear App clase         | feat     | Estado global y carga de datos             | App que monta Home y carga movies                | Normalizer         |
| 5         | Home + Grid             | feat     | Mostrar lista de películas                 | UI con tarjetas en rejilla                       | App clase          |
| 6         | MovieCard               | feat     | Componente para cada película              | Renderiza título, poster y rating                | Home + Grid        |
| 7         | Detail view             | feat     | Mostrar información completa               | Página detallada con datos normalizados          | MovieCard          |
| 8         | Documentación inicial   | docs     | Añadir documentación de API y modelos      | DOCS/\*.md completados                           | Inicializar repo   |
| 9         | Accesibilidad teclado   | a11y     | Navegación mediante teclado en Grid        | Pasos de foco y pruebas                          | Home + Grid        |
| 10        | Actualizar dependencias | chore    | Bump de versiones seguras                  | Dependencias actualizadas sin errores            | -                  |

## Calendario de seguimiento

Se usará **GitHub Projects** con columnas:

- To do
- In progress
- Review
- Done

Se creará un tablero llamado **MVP Roadmap** y se programarán revisiones semanales cada lunes para actualizar el estado de las tarjetas según el avance en los milestones y backlog.

> Cada issue será etiquetado con `milestone:X` correspondiente a su semana de entrega.

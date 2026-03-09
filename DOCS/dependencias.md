# Política de Dependencias

1. Mantener revisiones mensuales de dependencias críticas y trimestrales del resto.
2. Utilizar herramientas como `npm outdated`, `yarn audit`, Dependabot o Renovate para detectar actualizaciones y vulnerabilidades.
3. Valorar **seguridad** como prioridad máxima; parchear inmediatamente cuando se descubran CVEs.
4. Documentar siempre el cambio y ejecutar los tests completos.
5. Evitar rangos amplios (`*`, `^` con mayor libertad); preferir versiones exactas o `~` para parches.
6. Registrar en un archivo `DEPENDENCIES.md` los motivos de actualizaciones importantes.

## Frecuencia y criterios de actualización
- **Revisión mensual** usando bot automático para dependencias de build/herramientas.
- **Revisión trimestral** para librerías de runtime (React, utilidades).  

### Criterios
a. **Seguridad**: CVE o advisory → bump patch de inmediato.
b. **Compatibilidad**: cambio en API que puede romper (major) → planificar y testear.
c. **Rendimiento/bug**: mejoras internas → minor si añade funcionalidad, patch si es corrección.

## Matriz de Riesgos
| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| CVE en dep crítica | Alto | Actualizar inmediatamente, revisión de código. |
| Cambio mayor en React | Alto | Probar en entorno staging, actualización escalonada. |
| Dep obsoleta descontinuada | Medio | Buscar alternativa, refactor necesario. |
| Bump fallido rompe build | Medio | Test en CI, rollback rápido. |

## Plan de version bump controlado
- **Patch**: corregir campo nulo detectado en normalizer → bump patch (e.g. 0.2.1 → 0.2.2).
- **Minor**: agregar nueva categoría TMDB u opción de idioma → bump minor (0.2.1 → 0.3.0).
- **Major**: cambiar la forma en que se almacena el estado global → bump major.

## Checklist de validación post-bump (conceptual)
- [ ] Ejecutar suite de tests completa (unit + integración).
- [ ] Cargar la app legacy en entorno local/staging y navegar por Home, Detail, etc.
- [ ] Verificar que no aparecen errores en consola/browser.
- [ ] Comprobar que el normalizer produce los campos esperados (ids, poster URL, año).
- [ ] Validar performance básica (tiempo de carga de grid). 
- [ ] Revisión de accesibilidad mínima (estructura DOM intacta).
- [ ] Asegurar build y deploy sin fallos.

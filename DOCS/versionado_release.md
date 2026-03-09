# Política de Versionado y Releases

Se adopta [SemVer](https://semver.org): `MAJOR.MINOR.PATCH`.

- Incrementar **MAJOR** cuando se hagan cambios incompatibles.
- Incrementar **MINOR** para nuevas funcionalidades compatibles.
- Incrementar **PATCH** para correcciones y mantenimiento.

## Estrategia para el MVP

- Etiquetas comienzan con `v0.x.y` durante el desarrollo del MVP. Ejemplos:
  - `v0.1.0` - primer esqueleto funcional.
  - `v0.1.1` - bugfix menor de interfaz.
  - `v0.2.0` - agregada vista detalle (nueva funcionalidad compatible).
  - `v0.2.1` - parche de rendimiento en Grid.

- **Minor vs Patch**:
  - Subir minor al añadir características significativas que no rompen la API (p.ej. nuevo endpoint, componente UI).
  - Subir patch para correcciones de bugs, documentación o ajustes internos.

## Nombres de tags
Usar siempre el prefijo `v` seguido de la versión semántica: `v0.1.0`, `v0.1.1`, `v0.2.0`, etc.

## Política de releases
1. Crear un **draft release** en GitHub vinculado al tag. Incluye título (ej. "v0.2.0 – Feature detail view") y descripción preliminar.
2. Completar el cuerpo con notas generadas (ver siguiente sección).
3. Publicar el release cuando los artefactos estén listos.

## Generar CHANGELOG desde commits
- Usar [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) o `git log --pretty` con convención.
- Ejemplo comando:
  ```bash
  npx conventional-changelog -p angular -i CHANGELOG.md -s
  ```
- El changelog se actualiza automáticamente durante cada release draft.

## Criterios de release notes
- **Resumen**: una breve descripción general de los cambios más importantes.
- **Breaking changes**: listar explicitamente cambios incompatibles.
- **Riesgos**: cualquier efecto secundario potencial, puntos de atención o pasos de migración.

---
## ✅ Checklist operativo

### Pre-tag
- [ ] Todos los commits del milestone fusionados en `main`.
- [ ] Versión en `package.json` y/o `version.txt` actualizada.
- [ ] Changelog generado y revisado.
- [ ] Tests pasan y build limpio.
- [ ] QA básica completada.

### Tag
- [ ] Crear tag `git tag -a vX.Y.Z -m "Release vX.Y.Z"`.
- [ ] Push tag: `git push origin vX.Y.Z`.
- [ ] Iniciar draft release en GitHub.

### Post-release
- [ ] Promover draft a release pública.
- [ ] Añadir notas finales y enlaces (artifacts, docs).
- [ ] Mover tareas/reservas al siguiente milestone.
- [ ] Actualizar dependencias internas si aplica (ej. bump en otros repos).

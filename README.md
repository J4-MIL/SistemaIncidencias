# Sistema de Gestión de Incidencias - HTML + CSS + JavaScript + Supabase

Proyecto web académico para TechSolutions S.A.C. conectado a Supabase/PostgreSQL.

## Cómo probar
1. Ejecuta `sql/schema.sql` en el SQL Editor de Supabase.
2. Revisa `assets/js/config/supabase.js` y confirma la URL y Publishable Key.
3. Abre la carpeta con VS Code.
4. Usa Live Server sobre `login.html` o ejecuta:

```bash
npm install
npm run serve
```

5. Usuarios de prueba:
- ADMIN: `admin@empresa.com` / `admin123`
- EMPLEADO: `jamil@empresa.com` / `123456`
- TECNICO: `alfred@empresa.com` / `123456`

## Flujo demostrado
Empleado crea incidencia → Admin asigna técnico → Técnico actualiza estado y seguimiento → Admin revisa reportes.


## Registro de usuarios

El proyecto incluye `register.html`, una pantalla de registro conectada a Supabase.

Flujo:

1. El usuario entra a `register.html`.
2. Selecciona rol: `ADMIN`, `EMPLEADO` o `TECNICO`.
3. Si el rol es `EMPLEADO`, se solicita área.
4. Si el rol es `TECNICO`, se solicita especialidad y nivel de soporte.
5. El sistema guarda en `usuarios` y, si corresponde, también en `tecnicos`.
6. Al registrar correctamente, redirige automáticamente a `login.html`.

Archivo principal de esta función:

```text
assets/js/app-register.js
```
@ZDR1257 

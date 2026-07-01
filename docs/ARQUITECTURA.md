# Arquitectura del Sistema

El sistema se organiza con una arquitectura tipo MVC adaptada a JavaScript puro:

- **Models:** representan entidades del dominio: Usuario, Técnico, Incidencia, Asignación y Seguimiento.
- **Views:** páginas HTML que contienen la interfaz visible.
- **Controllers:** coordinan validación, servicios, sesión y respuesta visual.
- **Services:** contienen la comunicación directa con Supabase/PostgreSQL.
- **Validators:** validan formularios antes de guardar datos.
- **Components:** generan elementos reutilizables: sidebar, navbar, tablas, tarjetas y modales.
- **Utils:** funciones auxiliares como sesión, fechas, alertas y exportación.

Flujo principal: empleado crea incidencia → administrador asigna técnico → técnico cambia estado → seguimiento se guarda en Supabase → reportes se actualizan.

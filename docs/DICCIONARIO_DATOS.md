# Diccionario de Datos

## usuarios
- id: identificador único.
- nombre: nombre completo.
- correo: correo único de acceso.
- contrasena: contraseña académica del prototipo.
- rol: ADMIN, EMPLEADO o TECNICO.
- area: área del usuario.
- activo: permite o bloquea el acceso.

## tecnicos
- id: identificador técnico.
- usuario_id: referencia a usuarios.
- especialidad: área técnica.
- nivel_soporte: 1, 2 o 3.
- disponible: estado operativo.

## incidencias
- id, codigo, titulo, descripcion, categoria, prioridad, estado, nivel_soporte, usuario_id, fecha_creacion.

## asignaciones
- vincula incidencias con técnicos responsables.

## seguimientos
- historial de comentarios y cambios de estado.

## auditoria
- registra acciones importantes del sistema.

## notificaciones
- avisos internos para usuarios.

export function validarUsuario(u){

  if(!u.nombre?.trim()) return 'El nombre es obligatorio.';

  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(u.correo||'')) return 'Correo no válido.';

  if(!u.id && (!u.contrasena || u.contrasena.length<6)) return 'La contraseña debe tener mínimo 6 caracteres.';

  if(!['ADMIN','EMPLEADO','TECNICO'].includes(u.rol)) return 'Rol no válido.';

  if(u.rol==='EMPLEADO' && !u.area?.trim()) return 'El área es obligatoria para empleados.';

  if(u.rol==='TECNICO' && (!u.especialidad?.trim() || ![1,2,3].includes(Number(u.nivel_soporte)))) return 'Especialidad y nivel son obligatorios para técnicos.';

  return null;

}


export function validarLogin(correo, contrasena){

  if(!correo || !contrasena) return 'Completa correo y contraseña.';

  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) return 'Correo no válido.';

  if(contrasena.length<6) return 'La contraseña debe tener mínimo 6 caracteres.';

  return null;

}


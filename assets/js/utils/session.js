export function saveSession(usuario) {
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Alias compatible: nombre esperado por otros módulos
export const setSession = saveSession;

export function getSession() {
  const usuario = localStorage.getItem('usuario');

  if (!usuario) return null;

  try {
    return JSON.parse(usuario);
  } catch (error) {
    console.error('Error al leer la sesión:', error);
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem('usuario');
}

export function logout() {
  clearSession();
  window.location.href = 'login.html';
}

/* Alias en español para otros archivos */
export const guardarSesion = setSession;
export const obtenerSesion = getSession;
export const cerrarSesion = clearSession;
export const cerrarSesionYRedirigir = logout;

export function estaAutenticado() {
  return getSession() !== null;
}

export function verificarRol(rolesPermitidos = []) {
  const usuario = getSession();

  if (!usuario) {
    window.location.href = 'login.html';
    return false;
  }

  if (rolesPermitidos.length > 0 && !rolesPermitidos.includes(usuario.rol)) {
    window.location.href = 'login.html';
    return false;
  }

  return true;
  
}

export function redirectByRole(usuario) {
  let target = 'login.html';

  if (usuario && usuario.rol) {
    const rol = String(usuario.rol).toUpperCase();
    if (rol === 'ADMIN') target = 'admin.html';
    else if (rol === 'EMPLEADO') target = 'empleado.html';
    else if (rol === 'TECNICO') target = 'tecnico.html';
    else target = 'login.html';
  }

  window.location.href = target;
  return target;
}

// Compatibilidad: función utilizada por los módulos de la app
export function requireRole(rolesPermitidos = []) {
  const usuario = getSession();
  if (!usuario) {
    window.location.href = 'login.html';
    return null;
  }

  if (rolesPermitidos && rolesPermitidos.length > 0) {
    const rol = String(usuario.rol || '').toUpperCase();
    const allowed = rolesPermitidos.map(r => String(r).toUpperCase());
    if (!allowed.includes(rol)) {
      window.location.href = 'login.html';
      return null;
    }
  }

  return usuario;
}
import {
  usuarioService
} from '../services/usuarioService.js';

import {
  registrarConAuth
} from '../services/authService.js';

import {
  supabase
} from '../config/supabase.js';

import {
  validarUsuario
} from '../validators/usuarioValidator.js';

import {
  toast, error, confirmar
} from '../utils/alerts.js';

export const usuarioController = {

  async listar() {
    return await usuarioService.listar();
  },

  async registrarPublico(datos) {
    const v = validarUsuario({ ...datos, rol: 'EMPLEADO' });
    if (v) return { ok: false, error: v };

    return await registrarConAuth({
      correo: datos.correo,
      contrasena: datos.contrasena,
      nombre: datos.nombre,
      area: datos.area || null
    });
  },

  async crear(datos) {
    const v = validarUsuario(datos);
    if (v) return { ok: false, error: v };

    const { data, error: fnError } = await supabase.functions.invoke(
      'admin-create-user',
      {
        body: {
          nombre: datos.nombre,
          correo: datos.correo,
          contrasena: datos.contrasena,
          rol: datos.rol,
          area: datos.area || null,
          especialidad: datos.especialidad,
          nivel_soporte: datos.nivel_soporte
        }
      }
    );

    if (fnError) return { ok: false, error: fnError.message || 'No se pudo crear el usuario.' };
    if (data?.error) return { ok: false, error: data.error };

    return { ok: true, data: data?.usuario ?? data, error: null };
  },

  async actualizar(id, datos) {
    const payload = {
      nombre: datos.nombre,
      correo: datos.correo,
      rol: datos.rol,
      area: datos.area,
      activo: datos.activo
    };
    return await usuarioService.actualizar(id, payload);
  },

  async enviarRestablecerContrasena(correo) {
    const { error: e } = await supabase.auth.resetPasswordForEmail(correo, {
      redirectTo: `${window.location.origin}/login.html`
    });
    if (e) return { ok: false, error: e.message };
    toast('Se envió un correo para restablecer la contraseña.');
    return { ok: true };
  },

  async alternarActivo(id, activo) {
    return await usuarioService.activar(id, activo);
  },

  async eliminar(id) {
    if (!await confirmar('¿Eliminar usuario?')) return { ok: false, error: 'Cancelado' };
    const r = await usuarioService.eliminar(id);
    if (r.ok) toast('Usuario eliminado');
    else error(r.error);
    return r;
  }

};
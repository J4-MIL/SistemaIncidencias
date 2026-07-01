import { supabase } from '../config/supabase.js';

export async function login(correo, contrasena) {

  try {

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: correo,
        password: contrasena
      });

    if (authError) throw authError;

    // El trigger on_auth_user_created ya garantiza que existe
    // una fila en public.usuarios ligada por auth_id.
    const { data: perfil, error: perfilError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('auth_id', authData.user.id)
      .single();

    if (perfilError) throw perfilError;

    return { ok: true, data: perfil, error: null };

  } catch (e) {
    return {
      ok: false,
      data: null,
      error: 'Correo o contraseña incorrectos.'
    };
  }
}

export async function registrarConAuth({ correo, contrasena, nombre, area }) {

  try {

    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contrasena,
      options: {
        // Solo van datos no sensibles a user_metadata: el rol NUNCA
        // se define aquí (lo fuerza el trigger a EMPLEADO).
        data: { nombre, area: area || null }
      }
    });

    if (error) throw error;

    return { ok: true, data, error: null };

  } catch (e) {
    return { ok: false, data: null, error: e.message || 'No se pudo registrar.' };
  }
}
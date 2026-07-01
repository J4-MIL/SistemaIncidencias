import { usuarioController } from './controllers/usuarioController.js';

const form = document.getElementById('registerForm');
const alertBox = document.getElementById('registerAlert');
const btnRegister = document.getElementById('btnRegister');

function mostrarError(mensaje) {
    alertBox.innerHTML = `
        <div class="alert alert-error">
            ${mensaje}
        </div>
    `;
}

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    alertBox.innerHTML = '';

    const datos = Object.fromEntries(
        new FormData(form).entries()
    );

    if (datos.contrasena !== datos.confirmar) {
        mostrarError('Las contraseñas no coinciden.');
        return;
    }

    delete datos.confirmar;

    // El registro público solo crea cuentas de tipo EMPLEADO.
    // Cuentas de TECNICO o ADMIN se crean desde el panel de administración (usuarios.html).
    datos.rol = 'EMPLEADO';
    datos.activo = true;

    btnRegister.disabled = true;
    btnRegister.textContent = 'Registrando...';

    try {

        const respuesta = await usuarioController.registrarPublico(datos);

        if (!respuesta.ok) {

            const mensaje = String(respuesta.error || '');

            if (
                mensaje.toLowerCase().includes('already registered') ||
                mensaje.toLowerCase().includes('user already exists') ||
                mensaje.includes('duplicate key') ||
                mensaje.includes('usuarios_correo_key') ||
                mensaje.includes('23505')
            ) {

                mostrarError(
                    'Este correo ya está registrado. Inicia sesión o utiliza otro correo.'
                );

                return;
            }

            mostrarError(
                mensaje || 'No se pudo registrar el usuario.'
            );

            return;
        }

        // Si tu proyecto de Supabase tiene "Confirm email" activado,
        // respuesta.data.session viene null hasta que el usuario confirme
        // su correo; si está desactivado, ya queda logueado de una vez.
        const requiereConfirmacion = !respuesta.data?.session;

        if (window.Swal) {

            await Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: requiereConfirmacion
                    ? 'Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.'
                    : 'Tu cuenta fue creada correctamente.',
                confirmButtonText: 'Ir al login'
            });

        }

        window.location.href = 'login.html';

    } catch (error) {

        console.error(error);

        const mensaje = String(
            error?.message || error || ''
        );

        if (
            mensaje.includes('duplicate key') ||
            mensaje.includes('usuarios_correo_key') ||
            mensaje.includes('23505')
        ) {

            mostrarError(
                'Este correo ya está registrado.'
            );

            return;
        }

        mostrarError(
            'Ocurrió un error inesperado durante el registro.'
        );

    } finally {

        btnRegister.disabled = false;
        btnRegister.textContent = 'Registrarme';

    }

});
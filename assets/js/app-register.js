import { usuarioController } from './controllers/usuarioController.js';

const form = document.getElementById('registerForm');
const alertBox = document.getElementById('registerAlert');
const rolSelect = document.getElementById('rol');
const camposEmpleado = document.getElementById('camposEmpleado');
const camposTecnico = document.getElementById('camposTecnico');
const btnRegister = document.getElementById('btnRegister');

function mostrarCamposPorRol() {
    const rol = rolSelect.value;

    camposEmpleado.style.display = rol === 'EMPLEADO' ? 'block' : 'none';
    camposTecnico.style.display = rol === 'TECNICO' ? 'block' : 'none';

    document.getElementById('area').required = rol === 'EMPLEADO';
    document.getElementById('especialidad').required = rol === 'TECNICO';
    document.getElementById('nivel_soporte').required = rol === 'TECNICO';
}

function mostrarError(mensaje) {
    alertBox.innerHTML = `
        <div class="alert alert-error">
            ${mensaje}
        </div>
    `;
}

function limpiarFormulario(datos) {

    if (datos.rol !== 'TECNICO') {
        datos.especialidad = null;
        datos.nivel_soporte = null;
    }

    if (datos.rol !== 'EMPLEADO') {
        datos.area = datos.rol === 'ADMIN'
            ? 'Administración'
            : null;
    }

    return datos;
}

rolSelect.addEventListener('change', mostrarCamposPorRol);
mostrarCamposPorRol();

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

    datos.activo = true;

    limpiarFormulario(datos);

    btnRegister.disabled = true;
    btnRegister.textContent = 'Registrando...';

    try {

        const respuesta = await usuarioController.crear(datos);

        if (!respuesta.ok) {

            const mensaje = String(respuesta.error || '');

            if (
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

        if (window.Swal) {

            await Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta fue creada correctamente.',
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
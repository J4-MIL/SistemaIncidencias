import { incidenciaController } from './controllers/incidenciaController.js';
import { obtenerSesion } from './utils/session.js';
import { renderLayout } from './components/layout.js';

const app = document.getElementById('app');
const usuario = obtenerSesion();

if (!usuario) {
  window.location.href = 'login.html';
}

function renderizarCrearIncidencia() {
  const contenido = `
    <div class="section-title"><h2>Registrar nuevo ticket</h2></div>
    <section class="panel">
      <form id="incidenciaForm" class="form-grid">
        <div class="form-group">
          <label for="titulo">Título del problema</label>
          <input type="text" id="titulo" name="titulo" placeholder="Ejemplo: No tengo internet" required>
        </div>

        <div class="form-group">
          <label for="descripcion">Descripción del problema</label>
          <textarea id="descripcion" name="descripcion" rows="5" placeholder="Describe el problema con detalle" required></textarea>
        </div>

        <div class="form-group">
          <label for="categoria">Categoría</label>
          <input type="text" id="categoria" name="categoria" value="General">
        </div>

        <div class="form-group">
          <label for="prioridad">Prioridad</label>
          <select id="prioridad" name="prioridad" required>
            <option value="BAJA">BAJA</option>
            <option value="MEDIA">MEDIA</option>
            <option value="ALTA">ALTA</option>
            <option value="CRITICA">CRÍTICA</option>
          </select>
        </div>

        <div class="form-group">
          <label for="nivel_soporte">Nivel de soporte requerido</label>
          <select id="nivel_soporte" name="nivel_soporte" required>
            <option value="1">Nivel 1</option>
            <option value="2">Nivel 2</option>
            <option value="3">Nivel 3</option>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" id="btnGuardar" class="btn btn-primary">Guardar incidencia</button>
          <a href="mis-incidencias.html" class="btn btn-secondary">Ver mis incidencias</a>
        </div>
      </form>
    </section>
  `;

  renderLayout({ titulo: 'Crear Incidencia', usuario, contenido });
  configurarFormulario();
}

function configurarFormulario() {
  const form = document.getElementById('incidenciaForm');
  const btnGuardar = document.getElementById('btnGuardar');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const incidencia = {
      titulo: formData.get('titulo')?.trim(),
      descripcion: formData.get('descripcion')?.trim(),
      categoria: formData.get('categoria')?.trim() || 'General',
      prioridad: formData.get('prioridad'),
      nivel_soporte: Number(formData.get('nivel_soporte'))
    };

    if (!incidencia.titulo) {
      Swal.fire('Error', 'El título es obligatorio.', 'error');
      return;
    }

    if (!incidencia.descripcion) {
      Swal.fire('Error', 'La descripción es obligatoria.', 'error');
      return;
    }

    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';

    try {
      const respuesta = await incidenciaController.crear(incidencia, usuario);

      if (!respuesta.ok) {
        Swal.fire(
          'Error',
          respuesta.error || 'No se pudo crear la incidencia.',
          'error'
        );
        return;
      }

      await Swal.fire({
        icon: 'success',
        title: 'Incidencia registrada',
        text: 'Tu ticket fue creado correctamente.',
        confirmButtonText: 'Ver mis incidencias'
      });

      window.location.href = 'mis-incidencias.html';

    } catch (error) {
      console.error(error);
      Swal.fire(
        'Error',
        'Ocurrió un error inesperado al registrar la incidencia.',
        'error'
      );
    } finally {
      btnGuardar.disabled = false;
      btnGuardar.textContent = 'Guardar incidencia';
    }
  });
}

renderizarCrearIncidencia();
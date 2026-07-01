import { requireRole } from './utils/session.js';
import { renderLayout } from './components/layout.js';
import { incidenciaController } from './controllers/incidenciaController.js';
import { seguimientoController } from './controllers/seguimientoController.js';
import { fecha, badgeEstado } from './utils/format.js';

const usuario = requireRole(['ADMIN', 'TECNICO']);
if (usuario) cargar();

async function cargar() {
  const r = usuario.rol === 'TECNICO'
    ? await incidenciaController.asignadas(usuario.id)
    : await incidenciaController.listar();

  const incs = usuario.rol === 'TECNICO'
    ? (r.data || []).map(x => x.incidencias)
    : (r.data || []);

  renderLayout({
    titulo: 'Seguimientos',
    usuario,
    contenido: `
      <div class="section-title"><h2>Historial por incidencia</h2></div>
      <div id="lista"></div>
    `
  });

  const html = await Promise.all(incs.slice(0, 20).map(async inc => {
    const seg = await seguimientoController.porIncidencia(inc.id);
    const items = (seg.data || []);

    const timelineHtml = items.length
      ? items.map(s => `
          <div class="timeline-item">
            <span class="timeline-user">${s.usuarios?.nombre || 'Usuario'}</span>
            <span class="timeline-date">${fecha(s.fecha)}</span>
            <p class="timeline-comment">${s.comentario}</p>
          </div>
        `).join('')
      : `<p class="timeline-empty">Sin registros.</p>`;

    return `
      <div class="card inc-card">
        <h3 class="inc-card-head">
          <span class="codigo">${inc.codigo || inc.id}</span>
          ${inc.titulo}
          ${badgeEstado(inc.estado)}
        </h3>
        <div class="timeline">
          ${timelineHtml}
        </div>
      </div>
    `;
  }));

  document.getElementById('lista').innerHTML = html.join('');
}
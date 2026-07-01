import {
 requireRole 
}
 from './utils/session.js';
import {
 renderLayout 
}
 from './components/layout.js';
import {
 statCard 
}
 from './components/cards.js';
import {
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 tabla 
}
 from './components/table.js';
import {
 badgeEstado,badgePrioridad,fecha 
}
 from './utils/format.js';

const usuario = requireRole(['EMPLEADO']);
if (!usuario) {
	// requireRole ya hizo la redirección o negó acceso; no continuar
} else {
	init();
}

async function init() {
	try {
		await cargar(usuario);
	} catch (err) {
		console.error('Error iniciando panel del empleado:', err);
		renderLayout({
			titulo: 'Panel del Empleado',
			usuario,
			contenido: `<div class="section-title"><h2>Error</h2><div class="alert alert-error">Ocurrió un error al cargar el panel. Revisa la consola.</div></div>`
		});
	}
}

async function cargar(usuarioParam) {
	// Mostrar estado de carga inmediato
	renderLayout({
		titulo: 'Panel del Empleado',
		usuario: usuarioParam,
		contenido: `<div class="section-title"><h2>Cargando...</h2></div>`
	});

	const r = await incidenciaController.porUsuario(usuarioParam?.id);
	if (!r || !r.ok) {
		const msg = r && r.error ? r.error : 'No se pudieron obtener las incidencias.';
		renderLayout({
			titulo: 'Panel del Empleado',
			usuario: usuarioParam,
			contenido: `<div class="section-title"><h2>Error</h2><div class="alert alert-error">${msg}</div></div>`
		});
		return;
	}

	const rows = r.data || [];
	const contenido = buildContenido(rows);
	renderLayout({ titulo: 'Panel del Empleado', usuario: usuarioParam, contenido });
}

function buildContenido(rows) {
	return `
		<div class="grid grid-4">
			${statCard('Mis incidencias', rows.length, '🎫')}
			${statCard('Abiertas', rows.filter(x => x.estado === 'ABIERTO').length, '📌')}
			${statCard('En proceso', rows.filter(x => x.estado === 'EN_PROCESO').length, '🔧')}
			${statCard('Cerradas', rows.filter(x => x.estado === 'CERRADO').length, '✅')}
		</div>
		<div class="section-title">
			<h2>Últimas incidencias</h2>
			<a class="btn btn-primary" href="crear-incidencia.html">Crear incidencia</a>
		</div>
		${tabla({
			columns: [
				{ label: 'Código', render: x => x.codigo || x.id },
				{ label: 'Título', key: 'titulo' },
				{ label: 'Prioridad', render: x => badgePrioridad(x.prioridad) },
				{ label: 'Estado', render: x => badgeEstado(x.estado) },
				{ label: 'Fecha', render: x => fecha(x.fecha_creacion) }
			],
			rows: rows.slice(0, 10)
		})}
	`;
}


import {
 requireRole 
}
 from './utils/session.js';
import {
 renderLayout 
}
 from './components/layout.js';
import {
 tabla 
}
 from './components/table.js';
import {
 openModal,closeModal 
}
 from './components/modal.js';
import {
 select,textarea,formData 
}
 from './components/forms.js';
import {
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 tecnicoController 
}
 from './controllers/tecnicoController.js';
import {
 seguimientoController 
}
 from './controllers/seguimientoController.js';
import {
 badgeEstado,badgePrioridad,fecha 
}
 from './utils/format.js';
import {
 toast,error 
}
 from './utils/alerts.js';

const usuario=requireRole(['ADMIN']);
 let incidencias=[],tecnicos=[];
 if(usuario) cargar();

async function cargar(){
 const [i,t]=await Promise.all([incidenciaController.listar(),tecnicoController.listar()]);
 incidencias=i.data||[];
 tecnicos=t.data||[];
 console.log('Técnicos cargados:', tecnicos);
 renderLayout({
titulo:'Gestión de Incidencias',usuario,contenido:`<div class="section-title"><h2>Incidencias registradas</h2><button class="btn btn-light" id="refrescar">Actualizar</button></div><div class="toolbar"><select id="fEstado"><option value="">Todos los estados</option><option>ABIERTO</option><option>ASIGNADO</option><option>EN_PROCESO</option><option>RESUELTO</option><option>CERRADO</option></select><select id="fPrioridad"><option value="">Todas las prioridades</option><option>BAJA</option><option>MEDIA</option><option>ALTA</option><option>CRITICA</option></select></div><div id="tablaInc"></div>`
}
);
 pintar(incidencias);
 document.getElementById('refrescar').onclick=cargar;
 document.getElementById('fEstado').onchange=filtrar;
 document.getElementById('fPrioridad').onchange=filtrar;

}

function filtrar(){
const e=document.getElementById('fEstado').value,p=document.getElementById('fPrioridad').value;
 pintar(incidencias.filter(x=>(!e||x.estado===e)&&(!p||x.prioridad===p)));

}

function pintar(rows){
document.getElementById('tablaInc').innerHTML=tabla({
columns:[{
label:'Código',render:x=>x.codigo||x.id
}
,{
label:'Título',key:'titulo'
}
,{
label:'Empleado',render:x=>x.usuarios?.nombre||'-'
}
,{
label:'Prioridad',render:x=>badgePrioridad(x.prioridad)
}
,{
label:'Estado',render:x=>badgeEstado(x.estado)
}
,{
label:'Fecha',render:x=>fecha(x.fecha_creacion)
}
,{
label:'Acciones',render:x=>`<div class="actions"><button class="icon-btn" data-asignar="${
x.id
}
">Asignar</button><button class="icon-btn" data-seg="${
x.id
}
">Historial</button></div>`
}
],rows
}
);
 document.querySelectorAll('[data-asignar]').forEach(b=>b.onclick=()=>modalAsignar(incidencias.find(x=>x.id==b.dataset.asignar)));
 document.querySelectorAll('[data-seg]').forEach(b=>b.onclick=()=>modalSeguimientos(b.dataset.seg));

}

function modalAsignar(inc){
	// build options with id as value to avoid parsing
	const optionsHtml = tecnicos.map(t => `
		<option value="${t.id}">${t.id} | ${t.usuarios?.nombre || 'Técnico'} - Nivel ${t.nivel_soporte}</option>
	`).join('');

	openModal('Asignar técnico', `<form id="formAsignar"><div class="form-group"><label for="tecnico">Técnico</label><select id="tecnico" name="tecnico">${optionsHtml}</select></div><button class="btn btn-primary">Asignar</button></form>`);

	const form = document.getElementById('formAsignar');
	if (!form) {
		console.error('formAsignar no encontrado en el modal');
		return;
	}

	form.onsubmit = async e => {
		e.preventDefault();
		const selected = e.target.tecnico?.value;
		if (!selected) {
			error('Seleccione un técnico');
			return;
		}
		const id = Number(selected);
		const tec = tecnicos.find(t => t.id === id);
		if (!tec) {
			error('Técnico no válido');
			return;
		}

		const r = await incidenciaController.asignar(inc, tec, usuario);
		if (r.ok) {
			toast('Incidencia asignada');
			closeModal();
			cargar();
		} else {
			error(r.error);
		}
	};

}

async function modalSeguimientos(id){
 const r=await seguimientoController.porIncidencia(id);
 openModal('Historial de seguimiento',`<div>${
(r.data||[]).map(s=>`<div class="card" style="margin-bottom:10px"><b>${
s.usuarios?.nombre||'Usuario'
}
</b> <span class="pill">${
s.estado_nuevo||''
}
</span><p>${
s.comentario
}
</p><small>${
fecha(s.fecha)
}
</small></div>`).join('')||'<div class="empty">Sin seguimientos</div>'
}
</div>`);
 
}


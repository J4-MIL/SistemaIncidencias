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
 badgeEstado,badgePrioridad,fecha 
}
 from './utils/format.js';
import {
 toast,error 
}
 from './utils/alerts.js';

const usuario=requireRole(['TECNICO']);
 let rows=[];
 if(usuario) cargar();

async function cargar(){
 const r=await incidenciaController.asignadas(usuario.id);
 rows=(r.data||[]).map(x=>x.incidencias);
 renderLayout({
titulo:'Atención de Incidencias',usuario,contenido:`<div class="section-title"><h2>Mis tickets asignados</h2><button class="btn btn-light" id="actualizar">Actualizar</button></div><div id="tablaTec"></div>`
}
);
 pintar(rows);
 document.getElementById('actualizar').onclick=cargar;

}

function pintar(datos){
document.getElementById('tablaTec').innerHTML=tabla({
columns:[{
label:'Código',render:x=>x.codigo||x.id
}
,{
label:'Título',key:'titulo'
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
label:'Acción',render:x=>`<button class="icon-btn" data-atender="${
x.id
}
">Atender</button>`
}
],rows:datos
}
);
 document.querySelectorAll('[data-atender]').forEach(b=>b.onclick=()=>modalAtender(rows.find(x=>x.id==b.dataset.atender)));

}

function modalAtender(inc){
 openModal('Actualizar incidencia',`<form id="formAtender">${
select('estado','Nuevo estado',['EN_PROCESO','RESUELTO','CERRADO'])
}
${
textarea('comentario','Comentario de seguimiento')
}
<button class="btn btn-primary">Guardar seguimiento</button></form>`);
 document.getElementById('formAtender').onsubmit=async e=>{
e.preventDefault();
 const d=formData(e.target);
 const r=await incidenciaController.cambiarEstado(inc,d.estado,d.comentario,usuario);
 if(r.ok){
toast('Seguimiento registrado');
 closeModal();
 cargar();

}
 else error(r.error);

}
;

}


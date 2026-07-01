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

const usuario=requireRole(['TECNICO']);
 if(usuario) cargar();

async function cargar(){
 const r=await incidenciaController.asignadas(usuario.id);
 const rows=(r.data||[]).map(x=>x.incidencias);
 renderLayout({
titulo:'Panel del Técnico',usuario,contenido:`<div class="grid grid-4">${
statCard('Asignadas',rows.length,'🛠')
}
${
statCard('Abiertas',rows.filter(x=>x.estado==='ASIGNADO').length,'📌')
}
${
statCard('En proceso',rows.filter(x=>x.estado==='EN_PROCESO').length,'🔧')
}
${
statCard('Resueltas',rows.filter(x=>x.estado==='RESUELTO').length,'✅')
}
</div><div class="section-title"><h2>Incidencias asignadas</h2><a class="btn btn-primary" href="tecnico-incidencias.html">Atender</a></div>${
tabla({
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
],rows:rows.slice(0,8)
}
)
}
`
}
);

}


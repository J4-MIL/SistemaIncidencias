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
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 badgeEstado,badgePrioridad,fecha 
}
 from './utils/format.js';

const usuario=requireRole(['EMPLEADO']);
 if(usuario) cargar();

async function cargar(){
 const r=await incidenciaController.porUsuario(usuario.id);
 renderLayout({
titulo:'Mis Incidencias',usuario,contenido:`<div class="section-title"><h2>Tickets reportados</h2><a class="btn btn-primary" href="crear-incidencia.html">Nuevo</a></div>${
tabla({
columns:[{
label:'Código',render:x=>x.codigo||x.id
}
,{
label:'Título',key:'titulo'
}
,{
label:'Categoría',key:'categoria'
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
],rows:r.data||[]
}
)
}
`
}
);

}


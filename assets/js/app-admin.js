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
 tabla 
}
 from './components/table.js';
import {
 reporteController 
}
 from './controllers/reporteController.js';
import {
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 badgeEstado,badgePrioridad,fecha 
}
 from './utils/format.js';

const usuario=requireRole(['ADMIN']);
 if(usuario) cargar();

async function cargar(){
 const [res,inc]=await Promise.all([reporteController.resumen(),incidenciaController.listar()]);
 const r=res.data||{

}
;
 renderLayout({
titulo:'Dashboard Administrador',usuario,contenido:`<div class="grid grid-4">${
statCard('Usuarios',r.usuarios,'👥')
}
${
statCard('Técnicos',r.tecnicos,'🛠')
}
${
statCard('Incidencias',r.incidencias,'🎫')
}
${
statCard('Cerradas',r.cerradas,'✅')
}
</div><div class="grid grid-2" style="margin-top:18px"><div class="card"><h2>Incidencias por estado</h2><div class="chart-box"><canvas id="chartEstado"></canvas></div></div><div class="card"><h2>Incidencias por prioridad</h2><div class="chart-box"><canvas id="chartPrioridad"></canvas></div></div></div><div class="section-title"><h2>Últimas incidencias</h2><a class="btn btn-primary" href="incidencias.html">Gestionar</a></div>${
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
],rows:(inc.data||[]).slice(0,8)
}
)
}
`
}
);
 graficar('chartEstado',r.porEstado||{

}
);
 graficar('chartPrioridad',r.porPrioridad||{

}
);
 
}

function graficar(id,obj){
 new Chart(document.getElementById(id),{
type:'doughnut',data:{
labels:Object.keys(obj),datasets:[{
data:Object.values(obj)
}
]
}
,options:{
maintainAspectRatio:false
}

}
);

}


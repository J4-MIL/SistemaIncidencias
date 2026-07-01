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
 reporteController 
}
 from './controllers/reporteController.js';
import {
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 exportarCSV 
}
 from './utils/export.js';

const usuario=requireRole(['ADMIN']);
 if(usuario) cargar();

async function cargar(){
 const [res,inc]=await Promise.all([reporteController.resumen(),incidenciaController.listar()]);
 const r=res.data||{

}
, filas=inc.data||[];
 renderLayout({
titulo:'Reportes',usuario,contenido:`<div class="grid grid-4">${
statCard('Total incidencias',r.incidencias,'🎫')
}
${
statCard('Abiertas',r.abiertas,'📌')
}
${
statCard('En proceso',r.proceso,'🔧')
}
${
statCard('Cerradas',r.cerradas,'✅')
}
</div><div class="section-title"><h2>Gráficos de gestión</h2><button class="btn btn-success" id="exportar">Exportar CSV</button></div><div class="grid grid-2"><div class="card"><h3>Por estado</h3><div class="chart-box"><canvas id="c1"></canvas></div></div><div class="card"><h3>Por prioridad</h3><div class="chart-box"><canvas id="c2"></canvas></div></div></div>`
}
);
 chart('c1',r.porEstado||{

}
);
 chart('c2',r.porPrioridad||{

}
);
 document.getElementById('exportar').onclick=()=>exportarCSV('incidencias.csv',filas.map(x=>({
codigo:x.codigo,titulo:x.titulo,prioridad:x.prioridad,estado:x.estado,nivel:x.nivel_soporte
}
)));
 
}

function chart(id,obj){
 new Chart(document.getElementById(id),{
type:'bar',data:{
labels:Object.keys(obj),datasets:[{
label:'Cantidad',data:Object.values(obj)
}
]
}
,options:{
maintainAspectRatio:false
}

}
);

}


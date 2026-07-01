import {
 requireRole 
}
 from './utils/session.js';
import {
 renderLayout 
}
 from './components/layout.js';
import {
 incidenciaController 
}
 from './controllers/incidenciaController.js';
import {
 seguimientoController 
}
 from './controllers/seguimientoController.js';
import {
 fecha,badgeEstado 
}
 from './utils/format.js';

const usuario=requireRole(['ADMIN','TECNICO']);
 if(usuario) cargar();

async function cargar(){
 const r= usuario.rol==='TECNICO'? await incidenciaController.asignadas(usuario.id): await incidenciaController.listar();
 const incs=usuario.rol==='TECNICO'?(r.data||[]).map(x=>x.incidencias):(r.data||[]);
 renderLayout({
titulo:'Seguimientos',usuario,contenido:`<div class="section-title"><h2>Historial por incidencia</h2></div><div id="lista"></div>`
}
);
 const html=await Promise.all(incs.slice(0,20).map(async inc=>{
 const seg=await seguimientoController.porIncidencia(inc.id);
 return `<div class="card" style="margin-bottom:14px"><h3>${
inc.codigo||inc.id
}
 - ${
inc.titulo
}
 ${
badgeEstado(inc.estado)
}
</h3>${
(seg.data||[]).map(s=>`<div style="border-left:3px solid #2563eb;
padding-left:12px;
margin:10px 0"><b>${
s.usuarios?.nombre||'Usuario'
}
</b> <small>${
fecha(s.fecha)
}
</small><p>${
s.comentario
}
</p></div>`).join('')||'<p class="footer-note">Sin registros.</p>'
}
</div>`
}
));
 document.getElementById('lista').innerHTML=html.join('');
 
}


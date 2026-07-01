import {
 authController 
}
 from '../controllers/authController.js';

const menus={

 ADMIN:[['admin.html','📊','Dashboard'],['usuarios.html','👥','Usuarios'],['incidencias.html','🎫','Incidencias'],['seguimientos.html','📝','Seguimientos'],['reportes.html','📈','Reportes'],['perfil.html','👤','Perfil']],
 EMPLEADO:[['empleado.html','🏠','Inicio'],['crear-incidencia.html','➕','Crear incidencia'],['mis-incidencias.html','🎫','Mis incidencias'],['perfil.html','👤','Perfil']],
 TECNICO:[['tecnico.html','📊','Dashboard'],['tecnico-incidencias.html','🛠','Incidencias asignadas'],['seguimientos.html','📝','Seguimientos'],['perfil.html','👤','Perfil']]

}
;

export function renderSidebar(usuario){

 const actual=location.pathname.split('/').pop();
 const items=(menus[usuario.rol]||[]).map(([href,ico,txt])=>`<a class="${
actual===href?'active':''
}
" href="${
href
}
"><span>${
ico
}
</span><span>${
txt
}
</span></a>`).join('');

 return `<aside class="sidebar"><div class="brand"><div class="brand-icon">TS</div><div class="brand-text"><h3>TechSolutions</h3><small>Soporte Multinivel</small></div></div><div class="menu"><div class="menu-title">Menú principal</div>${
items
}
<div class="menu-title">Sesión</div><a href="#" id="btnLogout">🚪 <span>Cerrar sesión</span></a></div></aside>`;

}

export function bindLogout(){
 document.getElementById('btnLogout')?.addEventListener('click',e=>{
e.preventDefault();
authController.salir();

}
);
 
}


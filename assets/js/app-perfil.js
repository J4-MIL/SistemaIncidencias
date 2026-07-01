import {
 requireRole 
}
 from './utils/session.js';
import {
 renderLayout 
}
 from './components/layout.js';
import {
 iniciales,fecha 
}
 from './utils/format.js';

const usuario=requireRole(['ADMIN','EMPLEADO','TECNICO']);
 if(usuario) renderLayout({
titulo:'Mi Perfil',usuario,contenido:`<div class="card profile-card"><div class="avatar" style="width:84px;
height:84px;
font-size:26px">${
iniciales(usuario.nombre)
}
</div><div><h2>${
usuario.nombre
}
</h2><p>${
usuario.correo
}
</p><span class="pill">${
usuario.rol
}
</span><span class="pill">${
usuario.area||'Sin área'
}
</span><p class="footer-note">Registro: ${
fecha(usuario.fecha_registro)
}
</p></div></div>`
}
);


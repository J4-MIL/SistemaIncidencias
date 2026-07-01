import {
 iniciales 
}
 from '../utils/format.js';

export function renderNavbar(titulo, usuario){
 return `<header class="navbar"><div><button id="sidebarToggle" class="icon-btn" title="Menu">☰</button><h1>${
titulo
}
</h1><small>Gestión de incidencias de soporte técnico</small></div><div class="userbox"><span class="pill">${
usuario.rol
}
</span><div class="avatar">${
iniciales(usuario.nombre)
}
</div><div><b>${
usuario.nombre
}
</b><br><small>${
usuario.correo
}
</small></div></div></header>`;
 
}


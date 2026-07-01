import {
 renderSidebar, bindLogout 
}
 from './sidebar.js';

import {
 renderNavbar 
}
 from './navbar.js';

export function renderLayout({
titulo,usuario,contenido
}
){
 document.body.innerHTML=`<div class="app">${
renderSidebar(usuario)
}
<main class="content">${
renderNavbar(titulo,usuario)
}
<section class="page">${
contenido
}
</section></main></div>`;
 bindLogout();
	// sidebar toggle for small screens: add/remove `sidebar-open` on body
	document.getElementById('sidebarToggle')?.addEventListener('click', () => {
		document.body.classList.toggle('sidebar-open');
	});

	// close sidebar when clicking a menu link (mobile)
	document.querySelectorAll('.menu a').forEach(a => {
		a.addEventListener('click', () => {
			if (document.body.classList.contains('sidebar-open')) document.body.classList.remove('sidebar-open');
		});
	});
 
}


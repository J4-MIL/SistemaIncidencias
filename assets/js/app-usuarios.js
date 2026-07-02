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
 input,select,formData 
}
 from './components/forms.js';
import {
 usuarioController 
}
 from './controllers/usuarioController.js';
import {
 toast,error 
}
 from './utils/alerts.js';
import {
 fecha 
}
 from './utils/format.js';

const usuario=requireRole(['ADMIN']);
 if(usuario) cargar();

async function cargar(){
 const r=await usuarioController.listar();
 renderLayout({
titulo:'Gestión de Usuarios',usuario,contenido:`<div class="section-title"><h2>Usuarios del sistema</h2><button class="btn btn-primary" id="nuevo">➕ Nuevo usuario</button></div><div class="toolbar"><input class="input" id="buscar" placeholder="Buscar por nombre o correo"></div><div id="tablaUsuarios"></div>`
}
);
 pintar(r.data||[]);
 document.getElementById('nuevo').onclick=()=>modalUsuario();
 document.getElementById('buscar').oninput=e=>pintar((r.data||[]).filter(x=>(x.nombre+x.correo).toLowerCase().includes(e.target.value.toLowerCase())));

}

function pintar(rows){
 document.getElementById('tablaUsuarios').innerHTML=tabla({
columns:[{
label:'Nombre',key:'nombre'
}
,{
label:'Correo',key:'correo'
}
,{
label:'Rol',key:'rol'
}
,{
label:'Área',key:'area'
}
,{
label:'Activo',render:x=>x.activo?'Sí':'No'
}
,{
label:'Registro',render:x=>fecha(x.fecha_registro)
}
,{
label:'Acciones',render:x=>`<button class="icon-btn" data-toggle="${
x.id
}
" data-activo="${
!x.activo
}
">${
x.activo?'Desactivar':'Activar'
}
</button>`
}
],rows
}
);
 document.querySelectorAll('[data-toggle]').forEach(b=>b.onclick=async()=>{
const r=await usuarioController.alternarActivo(b.dataset.toggle,b.dataset.activo==='true');
 if(r.ok){
toast('Estado actualizado');
 cargar();

}
 else error(r.error);

}
);

}

function modalUsuario(){
  openModal('Registrar usuario', `
    <form id="formUsuario">
      ${input('nombre', 'Nombre completo')}
      ${input('correo', 'Correo', 'email')}
      ${input('contrasena', 'Contraseña', 'password')}
      ${select('rol', 'Rol', ['ADMIN', 'EMPLEADO', 'TECNICO'])}
      
      <!-- Campos dinámicos ocultos/visibles por CSS para no romper el DOM -->
      <div id="campo-area" style="display:none;">
        ${input('area', 'Área')}
      </div>
      <div id="campos-tecnico" style="display:none;">
        ${input('especialidad', 'Especialidad')}
        ${select('nivel_soporte', 'Nivel soporte', [1, 2, 3])}
      </div>
      
      <button class="btn btn-primary w-full" style="margin-top: 15px;">Guardar usuario</button>
    </form>
  `);

  const rol = document.getElementById('rol');
  const divArea = document.getElementById('campo-area');
  const divTecnico = document.getElementById('campos-tecnico');

  // Función limpia para mostrar/ocultar contenedores sin sobreescribir el HTML
  const alternarCampos = () => {
    const valorRol = rol.value;
    
    if (valorRol === 'EMPLEADO') {
      divArea.style.display = 'block';
      divTecnico.style.display = 'none';
    } else if (valorRol === 'TECNICO') {
      divArea.style.display = 'block';
      divTecnico.style.display = 'block';
    } else {
      divArea.style.display = 'none';
      divTecnico.style.display = 'none';
    }
  };

  rol.onchange = alternarCampos;
  alternarCampos(); // Ejecución inicial

  document.getElementById('formUsuario').onsubmit = async e => {
    e.preventDefault();
    
    // Recolectamos los datos de forma segura
    const datos = formData(e.target);
    datos.activo = true;

    // Limpieza preventiva: si no es Técnico o Empleado, enviamos nulls explícitos
    if (rol.value === 'ADMIN') {
      datos.area = null;
      datos.especialidad = null;
      datos.nivel_soporte = 1;
    } else if (rol.value === 'EMPLEADO') {
      datos.especialidad = null;
      datos.nivel_soporte = 1;
    }

    const r = await usuarioController.crear(datos);
    if(r.ok){
      toast('Usuario registrado con éxito');
      closeModal();
      cargar();
    } else {
      error(r.error);
    }
  };
}

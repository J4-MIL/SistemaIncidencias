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
 openModal('Registrar usuario',`<form id="formUsuario">${
input('nombre','Nombre completo')
}
${
input('correo','Correo','email')
}
${
input('contrasena','Contraseña','password')
}
${
select('rol','Rol',['ADMIN','EMPLEADO','TECNICO'])
}
<div id="extras"></div><button class="btn btn-primary w-full">Guardar usuario</button></form>`);
 const rol=document.getElementById('rol');
 const extras=()=>{
document.getElementById('extras').innerHTML=rol.value==='EMPLEADO'?input('area','Área'):rol.value==='TECNICO'?input('area','Área')+input('especialidad','Especialidad')+select('nivel_soporte','Nivel soporte',[1,2,3]):''
}
;
 rol.onchange=extras;
 extras();
 document.getElementById('formUsuario').onsubmit=async e=>{
e.preventDefault();
 const datos=formData(e.target);
 datos.activo=true;
 const r=await usuarioController.crear(datos);
 if(r.ok){
toast('Usuario registrado');
 closeModal();
 cargar();

}
 else error(r.error);

}
;

}


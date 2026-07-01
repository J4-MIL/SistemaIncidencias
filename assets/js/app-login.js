import {
 authController 
}
 from './controllers/authController.js';

import {
 redirectByRole, getSession 
}
 from './utils/session.js';

const activo=getSession();
 if(activo) redirectByRole(activo);

const form=document.getElementById('loginForm');
 const alertBox=document.getElementById('loginAlert');

const toggleButton=document.getElementById('togglePass');
toggleButton.onclick=()=>{
 const p=document.getElementById('contrasena');
 p.type=p.type==='password'?'text':'password';
 toggleButton.textContent=p.type==='password'?'Ver':'Ocultar';
};

form.addEventListener('submit',async e=>{
 e.preventDefault();
 alertBox.innerHTML='';
 const btn=document.getElementById('btnLogin');
 btn.textContent='Ingresando...';
 btn.disabled=true;
 try{
 const fd=new FormData(form);
 const correo=String(fd.get('correo')||'').trim();
 const contrasena=String(fd.get('contrasena')||'');
 const r=await authController.iniciarSesion(correo,contrasena);
 if(!r.ok){
 alertBox.innerHTML=`<div class="alert alert-error">${r.error}</div>`;
 return;
 }
 authController.redirigir(r.data);
 }
 catch(error){
 alertBox.innerHTML=`<div class="alert alert-error">Ocurrió un error al iniciar sesión. Intenta de nuevo.</div>`;
 console.error(error);
 }
 finally{
 btn.textContent='Ingresar';
 btn.disabled=false;
 }
});


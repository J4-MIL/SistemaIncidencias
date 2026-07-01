import {
 login 
}
 from '../services/authService.js';

import {
 validarLogin 
}
 from '../validators/authValidator.js';

import {
 setSession, clearSession, redirectByRole 
}
 from '../utils/session.js';

export const authController={

 async iniciarSesion(correo,contrasena){
 const v=validarLogin(correo,contrasena);
 if(v) return {
ok:false,error:v
}
;
 const r=await login(correo,contrasena);
 if(!r.ok) return r;
 if(!r.data.activo) return {
ok:false,error:'Usuario inactivo. Contacte al administrador.'
}
;
 setSession(r.data);
 return {
ok:true,data:r.data
}
;
 
}
,
 salir(){
 clearSession();
 location.href='login.html';
 
}
,
 redirigir(usuario){
 redirectByRole(usuario);
 
}

}
;


import {
 usuarioService, registrarUsuarioConTecnico 
}
 from '../services/usuarioService.js';

import {
 validarUsuario 
}
 from '../validators/usuarioValidator.js';

import {
 toast, error, confirmar 
}
 from '../utils/alerts.js';

export const usuarioController={

 async listar(){
return await usuarioService.listar();

}
,
 async crear(datos){
 const v=validarUsuario(datos);
 if(v) return {
ok:false,error:v
}
;
 const usuario={
nombre:datos.nombre,correo:datos.correo,contrasena:datos.contrasena,rol:datos.rol,area:datos.area||null,activo:datos.activo??true
}
;
 const tecnico={
especialidad:datos.especialidad,nivel_soporte:Number(datos.nivel_soporte),disponible:true
}
;
 return await registrarUsuarioConTecnico(usuario,tecnico);

}
,
 async actualizar(id,datos){
 const payload={
nombre:datos.nombre,correo:datos.correo,rol:datos.rol,area:datos.area,activo:datos.activo
}
;
 if(datos.contrasena) payload.contrasena=datos.contrasena;
 return await usuarioService.actualizar(id,payload);

}
,
 async alternarActivo(id,activo){
 return await usuarioService.activar(id,activo);

}
,
 async eliminar(id){
 if(!await confirmar('¿Eliminar usuario?')) return {
ok:false,error:'Cancelado'
}
;
 const r=await usuarioService.eliminar(id);
 if(r.ok) toast('Usuario eliminado');
 else error(r.error);
 return r;

}

}
;


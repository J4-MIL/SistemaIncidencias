import {
 incidenciaService 
}
 from '../services/incidenciaService.js';

import {
 asignacionService 
}
 from '../services/asignacionService.js';

import {
 seguimientoService 
}
 from '../services/seguimientoService.js';

import {
 auditoriaService 
}
 from '../services/auditoriaService.js';

import {
 notificacionService 
}
 from '../services/notificacionService.js';

import {
 validarIncidencia 
}
 from '../validators/incidenciaValidator.js';

export const incidenciaController={

 listar:()=>incidenciaService.listar(),
 porUsuario:(id)=>incidenciaService.porUsuario(id),
 asignadas:(id)=>incidenciaService.asignadas(id),
 async crear(datos,usuario){
 const v=validarIncidencia(datos);
 if(v) return {
ok:false,error:v
}
;
 const r=await incidenciaService.crear({
...datos,usuario_id:usuario.id,estado:'ABIERTO'
}
);
 if(r.ok){
 await seguimientoService.crear({
incidencia_id:r.data.id,usuario_id:usuario.id,comentario:'Incidencia creada por el empleado.',estado_nuevo:'ABIERTO'
}
);
 await auditoriaService.registrar({
usuario_id:usuario.id,accion:'CREAR_INCIDENCIA',tabla:'incidencias',registro_id:r.data.id,descripcion:r.data.titulo
}
);
 
}
 return r;
 
}
,
 async asignar(incidencia,tecnico,admin){
 await asignacionService.cerrarPrevias(incidencia.id);
 const r=await asignacionService.crear({
incidencia_id:incidencia.id,tecnico_id:tecnico.id
}
);
 if(r.ok){
 await incidenciaService.cambiarEstado(incidencia.id,'ASIGNADO');
 await seguimientoService.crear({
incidencia_id:incidencia.id,usuario_id:admin.id,comentario:`Asignado a técnico ${
tecnico.usuarios?.nombre||tecnico.id
}
`,estado_nuevo:'ASIGNADO'
}
);
 if(tecnico.usuario_id) await notificacionService.crear({
usuario_id:tecnico.usuario_id,titulo:'Nueva incidencia asignada',mensaje:`Se te asignó la incidencia ${
incidencia.codigo||incidencia.id
}
`
}
);
 
}
 return r;

}
,
 async cambiarEstado(incidencia,estado,comentario,usuario){
 const r=await incidenciaService.cambiarEstado(incidencia.id,estado);
 if(r.ok){
 await seguimientoService.crear({
incidencia_id:incidencia.id,usuario_id:usuario.id,comentario:comentario||`Estado cambiado a ${
estado
}
`,estado_nuevo:estado
}
);
 await auditoriaService.registrar({
usuario_id:usuario.id,accion:'CAMBIAR_ESTADO',tabla:'incidencias',registro_id:incidencia.id,descripcion:estado
}
);
 
}
 return r;

}

}
;


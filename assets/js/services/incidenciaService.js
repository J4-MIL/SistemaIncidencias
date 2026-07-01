import {
 supabase 
}
 from '../config/supabase.js';

import {
 db 
}
 from './baseService.js';

export const incidenciaService={

 async listar(){
   const r = await db(s=>s.from('incidencias').select('*, usuarios(nombre,correo,area)').order('id',{ascending:false}));
   if (!r.ok && String(r.error).toLowerCase().includes('usuario_id')) {
     return db(s=>s.from('incidencias').select('*').order('id',{ascending:false}));
   }
   return r;
 },
 async porUsuario(usuario_id){
   const r = await db(s=>s.from('incidencias').select('*').eq('usuario_id',usuario_id).order('id',{ascending:false}));
   if (!r.ok && String(r.error).toLowerCase().includes('usuario_id')) {
     return db(s=>s.from('incidencias').select('*').order('id',{ascending:false}));
   }
   return r;
 },
 async crear(i){
 	// Intento normal
 	let r = await db(s => s.from('incidencias').insert(i).select().single());
 	if (!r.ok && typeof r.error === 'string') {
 		const err = r.error.toLowerCase();
 		if (err.includes('categoria')) {
 			console.warn("Inserción falló por 'categoria' ausente en el esquema, reintentando sin ese campo.");
 			const copy = { ...i };
 			delete copy.categoria;
 			r = await db(s => s.from('incidencias').insert(copy).select().single());
 		}
 		if (!r.ok && err.includes('usuario_id')) {
 			console.warn("Inserción falló por 'usuario_id' ausente en el esquema, reintentando sin ese campo.");
 			const copy = { ...i };
 			delete copy.usuario_id;
 			r = await db(s => s.from('incidencias').insert(copy).select().single());
 		}
 	}
  if(r.ok && !r.data.codigo){
  await supabase.from('incidencias').update({
 codigo:`INC-${
 String(r.data.id).padStart(4,'00')
 }
 `
 }
 ).eq('id',r.data.id);
  r.data.codigo=`INC-${
 String(r.data.id).padStart(4,'00')
 }
 `;
 
 }
  return r;
 },
 async actualizar(id,i){
   const payload={...i,fecha_actualizacion:new Date().toISOString()};
   let r = await db(s=>s.from('incidencias').update(payload).eq('id',id).select().maybeSingle());
   if (!r.ok && String(r.error).toLowerCase().includes('fecha_actualizacion')) {
     const {fecha_actualizacion, ...payloadFallback} = payload;
     r = await db(s=>s.from('incidencias').update(payloadFallback).eq('id',id).select().maybeSingle());
   }
   return r;
 },

 async cambiarEstado(id,estado){
   const payload = {estado, fecha_actualizacion:new Date().toISOString()};
   let r = await db(s=>s.from('incidencias').update(payload).eq('id',id).select().maybeSingle());
   const err = String(r.error || '').toLowerCase();
   if (!r.ok && (err.includes('fecha_actualizacion') || err.includes('does not exist') || err.includes('column'))) {
     r = await db(s=>s.from('incidencias').update({estado}).eq('id',id).select().maybeSingle());
   }
   return r;
 },
 asignadas:async(usuario_id)=>{
 const {
data:tec,error
}
=await supabase.from('tecnicos').select('id').eq('usuario_id',usuario_id).single();
 if(error) return {
ok:false,error:error.message,data:[]
}
;
  const r = await db(s=>s.from('asignaciones').select('*, incidencias(*, usuarios(nombre,correo))').eq('tecnico_id',tec.id).eq('activo',true).order('id',{ascending:false}));
  const err = String(r.error || '').toLowerCase();
  if (!r.ok && (err.includes('activo') || err.includes('does not exist') || err.includes('column')) ) {
    return db(s=>s.from('asignaciones').select('*, incidencias(*, usuarios(nombre,correo))').eq('tecnico_id',tec.id).order('id',{ascending:false}));
  }
  return r;
 }
 ,
 eliminar:(id)=>db(s=>s.from('incidencias').delete().eq('id',id))

}
;


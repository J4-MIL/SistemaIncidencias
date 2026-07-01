import {
 db 
}
 from './baseService.js';

export const asignacionService={

 crear:(a)=>db(s=>s.from('asignaciones').insert(a).select().single()),
 async porIncidencia(incidencia_id){
   const r = await db((s)=>s.from('asignaciones').select('*, tecnicos(*, usuarios(*))').eq('incidencia_id',incidencia_id).eq('activo',true));
   const err = String(r.error || '').toLowerCase();
   if (!r.ok && (err.includes('activo') || err.includes('does not exist') || err.includes('column')) ) {
     return db((s)=>s.from('asignaciones').select('*, tecnicos(*, usuarios(*))').eq('incidencia_id',incidencia_id));
   }
   return r;
 },
 async cerrarPrevias(incidencia_id){
   const r = await db((s)=>s.from('asignaciones').update({activo:false}).eq('incidencia_id',incidencia_id));
   if (!r.ok && String(r.error).toLowerCase().includes('activo') && String(r.error).toLowerCase().includes('column')) {
     return {ok:true,data:[],error:null};
   }
   return r;
 }
};

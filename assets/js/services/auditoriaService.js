import {
 db 
}
 from './baseService.js';

export const auditoriaService={
 async registrar(a){
   const r = await db(s=>s.from('auditoria').insert(a));
   if (!r.ok) {
     const err = String(r.error).toLowerCase();
     if (err.includes('auditoria')) {
       return {ok:true,data:[],error:null};
     }
   }
   return r;
 },
 async listar(){
   const r = await db(s=>s.from('auditoria').select('*, usuarios(nombre)').order('fecha',{ascending:false}).limit(50));
   if (!r.ok && String(r.error).toLowerCase().includes('auditoria')) {
     return {ok:true,data:[],error:null};
   }
   return r;
 } };
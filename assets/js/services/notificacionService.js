import {
 db 
}
 from './baseService.js';

export const notificacionService={
 async crear(n){
   const r = await db(s=>s.from('notificaciones').insert(n));
   if (!r.ok) {
     const err = String(r.error).toLowerCase();
     if (err.includes('notificaciones')) {
       return {ok:true,data:[],error:null};
     }
     if (err.includes('usuario_id') && err.includes('column')) {
       const { usuario_id, ...fallback } = n;
       return db(s=>s.from('notificaciones').insert(fallback));
     }
   }
   return r;
 },
 async porUsuario(usuario_id){
   const r = await db(s=>s.from('notificaciones').select('*').eq('usuario_id',usuario_id).order('fecha',{ascending:false}));
   if (!r.ok && String(r.error).toLowerCase().includes('notificaciones')) {
     return {ok:true,data:[],error:null};
   }
   return r;
 },
 async leida(id){
   const r = await db(s=>s.from('notificaciones').update({
 leida:true
 }
 ).eq('id',id));
   if (!r.ok && String(r.error).toLowerCase().includes('notificaciones')) {
     return {ok:true,data:[],error:null};
   }
   return r;
 } };
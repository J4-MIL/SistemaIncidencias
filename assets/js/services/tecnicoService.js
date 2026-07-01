import {
 db 
}
 from './baseService.js';

export const tecnicoService={

 async listar(){
   const r = await db(s=>s.from('tecnicos').select('*, usuarios(*)').order('id',{ascending:false}));
   const err = String(r.error || '').toLowerCase();
   if (!r.ok && (err.includes('usuarios') || err.includes('does not exist') || err.includes('column'))) {
     return db(s=>s.from('tecnicos').select('*').order('id',{ascending:false}));
   }
   return r;
 },
 async porUsuario(usuario_id){
   const r = await db(s=>s.from('tecnicos').select('*, usuarios(*)').eq('usuario_id',usuario_id).single());
   const err = String(r.error || '').toLowerCase();
   if (!r.ok && (err.includes('usuarios') || err.includes('does not exist') || err.includes('column'))) {
     return db(s=>s.from('tecnicos').select('*').eq('usuario_id',usuario_id).single());
   }
   return r;
 },
 crear:(t)=>db(s=>s.from('tecnicos').insert(t).select().single()),
 actualizar:(id,t)=>db(s=>s.from('tecnicos').update(t).eq('id',id).select().single())

}
;


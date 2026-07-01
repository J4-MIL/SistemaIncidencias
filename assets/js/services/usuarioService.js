import {
 supabase 
}
 from '../config/supabase.js';

import {
 db 
}
 from './baseService.js';

export const usuarioService={

  listar:()=>db(s=>s.from('usuarios').select('*').order('id',{
ascending:false
}
)),
  buscar:(txt)=>db(s=>s.from('usuarios').select('*').or(`nombre.ilike.%${
txt
}
%,correo.ilike.%${
txt
}
%`).order('id',{
ascending:false
}
)),
  crear:(u)=>db(s=>s.from('usuarios').insert(u).select().single()),
  actualizar:(id,u)=>db(s=>s.from('usuarios').update(u).eq('id',id).select().single()),
  eliminar:(id)=>db(s=>s.from('usuarios').delete().eq('id',id)),
  activar:(id,activo)=>db(s=>s.from('usuarios').update({
activo
}
).eq('id',id)),
  porId:(id)=>db(s=>s.from('usuarios').select('*').eq('id',id).single())

}
;

export async function registrarUsuarioConTecnico(usuario, tecnico){

 const r=await usuarioService.crear(usuario);
 if(!r.ok) return r;

 if(usuario.rol==='TECNICO'){
 const t=await supabase.from('tecnicos').insert({
...tecnico,usuario_id:r.data.id
}
).select().single();
 if(t.error) return {
ok:false,error:t.error.message
}
;
 
}

 return r;

}


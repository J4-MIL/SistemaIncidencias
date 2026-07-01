import {
 supabase 
}
 from '../config/supabase.js';

export async function db(op){
 try{
 const {
data,error
}
=await op(supabase);
 if(error) throw error;
 return {
ok:true,data,error:null
}
;
 
}
 catch(e){
 console.error(e);
 return {
ok:false,data:null,error:e.message||'Error en la operación'
}
;
 
}
 
}


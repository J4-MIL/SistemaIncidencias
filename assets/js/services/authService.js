import {
 supabase 
}
 from '../config/supabase.js';

export async function login(correo, contrasena){

 try{
 const {
data,error
}
=await supabase.from('usuarios').select('*').eq('correo',correo).eq('contrasena',contrasena).single();
 if(error) throw error;
 return {
ok:true,data,error:null
}
;
 
}
catch(e){
 return {
ok:false,data:null,error:'Correo o contraseña incorrectos.'
}
;
 
}

}


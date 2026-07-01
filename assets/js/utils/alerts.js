export function toast(titulo, icon='success'){
 if(window.Swal){
 Swal.fire({
toast:true,position:'top-end',timer:2500,showConfirmButton:false,icon,title:titulo
}
);
 
}
 else alert(titulo);
 
}

export function error(msg){
 if(window.Swal){
 Swal.fire('Error', msg, 'error');
 
}
 else alert(msg);
 
}

export async function confirmar(texto='¿Confirmar acción?'){
 if(!window.Swal) return confirm(texto);
 const r=await Swal.fire({
title:texto,icon:'question',showCancelButton:true,confirmButtonText:'Sí',cancelButtonText:'Cancelar'
}
);
 return r.isConfirmed;
 
}


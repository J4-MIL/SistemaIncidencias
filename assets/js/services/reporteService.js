import {
 supabase 
}
 from '../config/supabase.js';

export const reporteService={

 async resumen(){
 const [u,t,i]=await Promise.all([supabase.from('usuarios').select('id,rol,activo'),supabase.from('tecnicos').select('id'),supabase.from('incidencias').select('id,estado,prioridad,nivel_soporte')]);
 const inc=i.data||[];
 return {
ok:true,data:{
usuarios:(u.data||[]).length,tecnicos:(t.data||[]).length,incidencias:inc.length,abiertas:inc.filter(x=>x.estado==='ABIERTO').length,proceso:inc.filter(x=>x.estado==='EN_PROCESO').length,cerradas:inc.filter(x=>x.estado==='CERRADO').length,porEstado:contar(inc,'estado'),porPrioridad:contar(inc,'prioridad')
}

}
;

}

}
;

function contar(arr,campo){
return arr.reduce((a,x)=>{
a[x[campo]]=(a[x[campo]]||0)+1;
return a;

}
,{

}
);

}


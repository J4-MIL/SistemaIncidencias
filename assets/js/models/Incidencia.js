export class Incidencia{
constructor(data){
Object.assign(this,{
id:data.id,codigo:data.codigo,titulo:data.titulo,descripcion:data.descripcion,categoria:data.categoria||'General',prioridad:data.prioridad,estado:data.estado||'ABIERTO',nivel_soporte:Number(data.nivel_soporte),usuario_id:data.usuario_id,fecha_creacion:data.fecha_creacion
}
);

}
 estaAbierta(){
return ['ABIERTO','ASIGNADO','EN_PROCESO'].includes(this.estado)
}
 cerrar(){
this.estado='CERRADO'
}

}


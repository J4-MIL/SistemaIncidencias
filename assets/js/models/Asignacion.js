export class Asignacion{
constructor({
id,incidencia_id,tecnico_id,fecha_asignacion,activo=true
}
){
Object.assign(this,{
id,incidencia_id,tecnico_id,fecha_asignacion,activo
}
);

}

}


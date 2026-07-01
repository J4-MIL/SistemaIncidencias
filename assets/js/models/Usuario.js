export class Usuario{
constructor({
id,nombre,correo,contrasena,rol,area,activo=true
}
){
Object.assign(this,{
id,nombre,correo,contrasena,rol,area,activo
}
);

}
 esAdmin(){
return this.rol==='ADMIN'
}
 esEmpleado(){
return this.rol==='EMPLEADO'
}
 esTecnico(){
return this.rol==='TECNICO'
}

}

export class Empleado extends Usuario{
constructor(data){
super({
...data,rol:'EMPLEADO'
}
);
this.area=data.area;

}

}

export class Administrador extends Usuario{
constructor(data){
super({
...data,rol:'ADMIN'
}
);

}

}


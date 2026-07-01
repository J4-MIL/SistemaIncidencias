import {
 Usuario 
}
 from './Usuario.js';

export class Tecnico extends Usuario{
constructor(data){
super({
...data,rol:'TECNICO'
}
);
this.especialidad=data.especialidad;
this.nivel_soporte=Number(data.nivel_soporte);
this.disponible=data.disponible??true;

}

}


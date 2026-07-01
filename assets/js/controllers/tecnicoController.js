import {
 tecnicoService 
}
 from '../services/tecnicoService.js';

export const tecnicoController={
 listar:()=>tecnicoService.listar(), porUsuario:(id)=>tecnicoService.porUsuario(id) 
}
;


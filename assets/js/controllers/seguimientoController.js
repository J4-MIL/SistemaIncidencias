import {
 seguimientoService 
}
 from '../services/seguimientoService.js';

export const seguimientoController={
 porIncidencia:(id)=>seguimientoService.porIncidencia(id), crear:(s)=>seguimientoService.crear(s) 
}
;


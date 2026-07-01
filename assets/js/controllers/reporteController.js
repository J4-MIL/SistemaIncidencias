import {
 reporteService 
}
 from '../services/reporteService.js';

export const reporteController={
 resumen:()=>reporteService.resumen() 
}
;


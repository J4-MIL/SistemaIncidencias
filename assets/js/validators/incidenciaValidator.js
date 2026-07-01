export function validarIncidencia(i){

  if(!i.titulo?.trim()) return 'El título es obligatorio.';

  if(!i.descripcion?.trim()) return 'La descripción es obligatoria.';

  if(!['BAJA','MEDIA','ALTA','CRITICA'].includes(i.prioridad)) return 'Prioridad no válida.';

  if(![1,2,3].includes(Number(i.nivel_soporte))) return 'Nivel de soporte no válido.';

  return null;

}


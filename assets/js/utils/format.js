export function fecha(valor){
 if(!valor) return '-';
 return new Intl.DateTimeFormat('es-PE',{
dateStyle:'medium',timeStyle:'short'
}
).format(new Date(valor));
 
}

export function codigo(id){
 return `INC-${
String(id).padStart(4,'0')
}
`;
 
}

export function iniciales(nombre='U'){
 return nombre.split(' ').filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase();
 
}

export function badgeEstado(estado){
 return `<span class="badge badge-${
estado
}
">${
(estado||'-').replace('_',' ')
}
</span>`;
 
}

export function badgePrioridad(p){
 return `<span class="badge badge-${
p
}
">${
p||'-'
}
</span>`;
 
}


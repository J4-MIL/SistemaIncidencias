export function statCard(label,value,icon='📌'){
 return `<div class="card stat"><div><div class="label">${
label
}
</div><div class="value">${
value??0
}
</div></div><div class="icon">${
icon
}
</div></div>`;
 
}


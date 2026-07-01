export function tabla({
columns,rows,empty='No hay registros'
}
){
 if(!rows?.length) return `<div class="table-wrap"><div class="empty">${
empty
}
</div></div>`;
 return `<div class="table-wrap"><table><thead><tr>${
columns.map(c=>`<th>${
c.label
}
</th>`).join('')
}
</tr></thead><tbody>${
rows.map(r=>`<tr>${
columns.map(c=>`<td>${
typeof c.render==='function'?c.render(r):(r[c.key]??'-')
}
</td>`).join('')
}
</tr>`).join('')
}
</tbody></table></div>`;
 
}


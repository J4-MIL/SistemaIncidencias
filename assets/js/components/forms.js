export function input(name, label, type = 'text', value = '') {
  return `<div class="form-group"><label for="${name}">${label}</label><input class="input" id="${name}" name="${name}" type="${type}" value="${value ?? ''}"></div>`;
}

export function select(name, label, options = [], value = '') {
  return `<div class="form-group"><label for="${name}">${label}</label><select id="${name}" name="${name}">${options.map(o => `<option value="${o}" ${String(o) === String(value) ? 'selected' : ''}>${o}</option>`).join('')}</select></div>`;
}

export function textarea(name, label, value = '') {
  return `<div class="form-group"><label for="${name}">${label}</label><textarea id="${name}" name="${name}">${value ?? ''}</textarea></div>`;
}

export function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}
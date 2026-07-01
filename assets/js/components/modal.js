export function createModal(id = 'modalGlobal') {
  if (document.getElementById(id)) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-backdrop" id="${id}">
      <div class="modal">
        <div class="modal-head">
          <h2 id="${id}-title">Modal</h2>
          <button id="${id}-close" class="icon-btn">✕</button>
        </div>
        <div id="${id}-body"></div>
      </div>
    </div>
  `);

  const closeBtn = document.getElementById(`${id}-close`);
  if (closeBtn) closeBtn.onclick = () => closeModal(id);
}

export function openModal(title, body, id = 'modalGlobal') {
  createModal(id);
  document.getElementById(`${id}-title`).textContent = title;
  document.getElementById(`${id}-body`).innerHTML = body;
  document.getElementById(id).classList.add('show');
}

export function closeModal(id = 'modalGlobal') {
  document.getElementById(id)?.classList.remove('show');
}

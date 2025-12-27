// ui.js — DOM wiring and rendering for counters app
import { increment, decrement, reset, getCount, entries } from './counters.js';

const dom = {
  usernameInput: () => document.getElementById('username'),
  incBtn: () => document.getElementById('incBtn'),
  decBtn: () => document.getElementById('decBtn'),
  resetBtn: () => document.getElementById('resetBtn'),
  countersBody: () => document.getElementById('countersBody'),
  year: () => document.getElementById('year'),
};

function getName() {
  const input = dom.usernameInput();
  return input ? input.value.trim() : '';
}

function renderSelected() {
  const name = getName();
  const value = name ? getCount(name) : null;
  const dec = dom.decBtn();
  const inc = dom.incBtn();
  const resetBtn = dom.resetBtn();

  // Small UX: show inline placeholder in the input when empty
  if (inc) inc.disabled = !name;
  if (dec) dec.disabled = !name || value <= 0;
  if (resetBtn) resetBtn.disabled = !name || value === 0;
}

function renderTable() {
  const tbody = dom.countersBody();
  if (!tbody) return;
  tbody.innerHTML = '';
  const items = entries();
  if (items.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.setAttribute('colspan', '2');
    td.textContent = 'No counters yet';
    td.style.textAlign = 'center';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  items.sort((a, b) => a[0].localeCompare(b[0]));
  for (const [name, count] of items) {
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = name;
    const countTd = document.createElement('td');
    countTd.textContent = String(count);
    tr.appendChild(nameTd);
    tr.appendChild(countTd);
    // make row clickable: fills username input for convenience
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', () => {
      const input = dom.usernameInput();
      if (input) {
        input.value = name;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    tbody.appendChild(tr);
  }
}

function bind() {
  const input = dom.usernameInput();
  const inc = dom.incBtn();
  const dec = dom.decBtn();
  const resetBtn = dom.resetBtn();
  const yearEl = dom.year();

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (input) {
    input.addEventListener('input', () => {
      renderSelected();
    });
  }

  if (inc) {
    inc.addEventListener('click', () => {
      const name = getName();
      if (!name) return;
      increment(name);
      renderSelected();
      renderTable();
    });
  }

  if (dec) {
    dec.addEventListener('click', () => {
      const name = getName();
      if (!name) return;
      decrement(name);
      renderSelected();
      renderTable();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const name = getName();
      if (!name) return;
      reset(name);
      renderSelected();
      renderTable();
    });
  }
}

export function initUI() {
  bind();
  renderSelected();
  renderTable();
}

export default { initUI };

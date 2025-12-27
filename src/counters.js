// counters.js — logic for managing named counters
const counters = {};
const STORAGE_KEY = 'practice:counters:v1';

function save() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(counters));
    }
  } catch (err) {
    // ignore storage errors
  }
}

export function load() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        if (data && typeof data === 'object') {
          // copy keys
          for (const k of Object.keys(data)) {
            const v = Number(data[k]);
            counters[k] = Number.isFinite(v) ? v : 0;
          }
        }
      }
    }
  } catch (err) {
    // ignore
  }
}

export function ensureCounter(name) {
  if (!Object.prototype.hasOwnProperty.call(counters, name)) counters[name] = 0;
}

export function increment(name) {
  ensureCounter(name);
  counters[name] += 1;
  save();
  return counters[name];
}

export function decrement(name) {
  ensureCounter(name);
  counters[name] = Math.max(0, counters[name] - 1);
  save();
  return counters[name];
}

export function reset(name) {
  ensureCounter(name);
  counters[name] = 0;
  save();
  return counters[name];
}

export function getCount(name) {
  return Object.prototype.hasOwnProperty.call(counters, name) ? counters[name] : 0;
}

export function entries() {
  return Object.entries(counters);
}

export function clearAll() {
  for (const k of Object.keys(counters)) delete counters[k];
  save();
}

export default {
  load,
  ensureCounter,
  increment,
  decrement,
  reset,
  getCount,
  entries,
  clearAll,
};

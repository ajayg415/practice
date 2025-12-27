// DEPRECATED: counters.js (archived). The React app uses its own state and
// persistence. A backup of the original counters implementation is available
// at `legacy/src/counters.js`.

// Provide no-op implementations so accidental imports don't break.
export function load() {
  return;
}

export function ensureCounter() {
  return;
}

export function increment() {
  return 0;
}

export function decrement() {
  return 0;
}

export function reset() {
  return 0;
}

export function getCount() {
  return 0;
}

export function entries() {
  return [];
}

export function clearAll() {
  return;
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

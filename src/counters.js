// counters.js — logic for managing named counters
const counters = {};

export function ensureCounter(name) {
  if (!Object.prototype.hasOwnProperty.call(counters, name)) counters[name] = 0;
}

export function increment(name) {
  ensureCounter(name);
  counters[name] += 1;
  return counters[name];
}

export function decrement(name) {
  ensureCounter(name);
  counters[name] = Math.max(0, counters[name] - 1);
  return counters[name];
}

export function reset(name) {
  ensureCounter(name);
  counters[name] = 0;
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
}

export default {
  ensureCounter,
  increment,
  decrement,
  reset,
  getCount,
  entries,
  clearAll,
};

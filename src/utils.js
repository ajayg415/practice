export const STORAGE_KEY = "practice:counters:v1";

export function loadCounters() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? parsed : {};
  } catch (e) {
    return {};
  }
}

export function saveCounters(obj) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch (e) {
    // ignore
  }
}

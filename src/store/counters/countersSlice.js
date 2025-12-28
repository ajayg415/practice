// DEPRECATED: counters slice archived to legacy. Export no-op placeholders to avoid import errors.
export const resetAll = () => ({ type: 'deprecated/resetAll' });
export const reset = (name) => ({ type: 'deprecated/reset', payload: name });
export const addCounter = (name) => ({ type: 'deprecated/addCounter', payload: name });
export const increment = (name) => ({ type: 'deprecated/increment', payload: name });
export const decrement = (name) => ({ type: 'deprecated/decrement', payload: name });
export const createCounters = (data) => ({ type: 'deprecated/createCounters', payload: data });

export default function reducer(state = {}) { return state; }
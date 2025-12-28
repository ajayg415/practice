// LEGACY: archived counters slice (content removed). See project history for previous implementation.
export default function reducer(state = {}) { return state; }
export const resetAll = () => ({ type: 'legacy/resetAll' });
export const reset = (name) => ({ type: 'legacy/reset', payload: name });
export const addCounter = (name) => ({ type: 'legacy/addCounter', payload: name });
export const increment = (name) => ({ type: 'legacy/increment', payload: name });
export const decrement = (name) => ({ type: 'legacy/decrement', payload: name });
export const createCounters = (data) => ({ type: 'legacy/createCounters', payload: data });

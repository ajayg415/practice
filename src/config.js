// Configurable API endpoint. You can override by setting NODE_API_URL at build time
export const API_URL = (typeof process !== 'undefined' && process.env && process.env.API_URL) ||
  'https://jsonplaceholder.typicode.com/todos?_limit=20';

export default { API_URL };

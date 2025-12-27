// entry point for webpack bundle
import { initUI } from './ui.js';

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => initUI());
} else {
  initUI();
}

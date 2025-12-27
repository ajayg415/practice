import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../app.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
} else {
  // fallback: mount to body
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);
  const root = createRoot(div);
  root.render(<App />);
}

import React from "react";
import { store } from "./store/store.js";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "../app.css";

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  // fallback: mount to body
  const div = document.createElement("div");
  div.id = "root";
  document.body.appendChild(div);
  const root = createRoot(div);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

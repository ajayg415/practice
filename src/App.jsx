import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCounter,
  increment,
  decrement,
  reset as resetCounter,
  createCounters,
  resetAll,
} from "./store/counters/countersSlice.js";
import { loadCounters, saveCounters } from "./utils.js";
import {
  fetchCountersFromFirestore,
  saveCountersToFirestore,
} from "./firebase.js";

export default function App() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  // initialize counters from localStorage once
  useEffect(() => {
    let mounted = true;

    async function init() {
      // Try Firestore first, fall back to localStorage
      const remote = await fetchCountersFromFirestore();
      console.log(remote)
      if (!mounted) return;
      const local = loadCounters();
      // Choose remote if it has any keys, otherwise use local
      const initial = Object.keys(remote).length ? remote : local;
      dispatch(createCounters(initial));
    }

    init();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const counters = useSelector((state) => state.counters);

  useEffect(() => {
    // Persist to Firestore (async) and always keep localStorage in sync as a fast fallback.
    // saveCountersToFirestore(counters);
    saveCounters(counters);
  }, [counters]);

  const currentValue =
    name && counters[name] !== undefined ? counters[name] : 0;

  function ensure(nameKey) {
    if (!nameKey) return;
    if (counters[nameKey] === undefined) {
      // setCounters(prev => ({ ...prev, [nameKey]: 0 }));
      dispatch(addCounter(nameKey));
    }
  }

  function inc() {
    if (!name) return;
    ensure(name);
    // setCounters(prev => ({ ...prev, [name]: (prev[name] || 0) + 1 }));
    dispatch(increment(name));
  }

  function dec() {
    if (!name) return;
    ensure(name);
    // setCounters(prev => ({ ...prev, [name]: Math.max(0, (prev[name] || 0) - 1) }));
    dispatch(decrement(name));
  }

  function reset() {
    if (!name) return;
    ensure(name);
    // setCounters(prev => ({ ...prev, [name]: 0 }));
    dispatch(resetCounter(name));
  }

  function selectRow(selectedName) {
    setName(selectedName);
  }

  const entries = Object.entries(counters).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  const saveToDb = () => {
    saveCountersToFirestore(counters);
  }

  return (
    <div className="wrap">
      <main className="card" role="main" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading">React Counter</h1>
        <p className="lead">
          Per-user counters — enter a name, then use the controls.
        </p>

        <div className="controls">
          <div className="control-row">
            <input
              id="username"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span id="selectedCount" className="selected-count">
              {name ? currentValue : "—"}
            </span>
            <div className="actions">
              <button onClick={dec} disabled={!name || currentValue <= 0}>
                −
              </button>
              <button onClick={inc} disabled={!name}>
                +
              </button>
              <button onClick={reset} disabled={!name || currentValue === 0}>
                Reset
              </button>
              <button onClick={() => dispatch(resetAll())}>Reset All</button>
              <button onClick={saveToDb}>Save</button>
            </div>
          </div>
        </div>

        <div className="table-wrap">
          <h2 className="table-heading">All counters</h2>
          <table className="counters-table" aria-describedby="counters-desc">
            <caption id="counters-desc" className="visually-hidden">
              List of user counters
            </caption>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={2} style={{ textAlign: "center" }}>
                    No counters yet
                  </td>
                </tr>
              ) : (
                entries.map(([n, c]) => (
                  <tr
                    key={n}
                    className={n === name ? "selected" : ""}
                    onClick={() => selectRow(n)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{n}</td>
                    <td>{c}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer>
          Built for practice — <span id="year">{new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}

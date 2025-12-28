import React, { useEffect, useState, useMemo } from "react";
import { API_URL } from "./config";

const TODOS_KEY = "practice:todos:v1";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchTodos() {
      setLoading(true);
      setError(null);
      try {
        // Fetch from configured API endpoint
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        // hydrate with local overrides if available
        const localRaw = window.localStorage.getItem(TODOS_KEY);
        const local = localRaw ? JSON.parse(localRaw) : null;
        if (local && Array.isArray(local) && local.length) {
          // prefer local saved todos (user interactions)
          setTodos(local);
        } else {
          setTodos(data);
        }
      } catch (e) {
        if (!mounted) return;
        setError(e.message || "Failed to fetch todos");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchTodos();
    return () => {
      mounted = false;
    };
  }, []);

  // search/filter state
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return todos;
    const q = query.toLowerCase();
    return todos.filter((t) => (t.title || "").toLowerCase().includes(q));
  }, [todos, query]);

  // toggle complete locally
  function toggleComplete(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  // persist todos locally with debounce
  useEffect(() => {
    const handle = setTimeout(() => {
      try {
        window.localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
      } catch (e) {
        // ignore
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [todos]);

  return (
    <div className="wrap">
      <main className="card" role="main" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading">Todos</h1>
        <p className="lead">Fetch and display todos from a test API.</p>

        <div style={{ marginBottom: 12 }}>
          <input
            aria-label="Search todos"
            placeholder="Search todos"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: 6, width: '100%', maxWidth: 400 }}
          />
        </div>
        {loading && <p>Loading todos…</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <h2 className="table-heading">Todo list</h2>
            <table className="counters-table" aria-describedby="todos-desc">
              <caption id="todos-desc" className="visually-hidden">
                List of todos fetched from API
              </caption>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Completed</th>
                </tr>
              </thead>
              <tbody>
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: "center" }}>
                      No todos
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => (
                    <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => toggleComplete(t.id)}>
                      <td>{t.id}</td>
                      <td>{t.title}</td>
                      <td>{t.completed ? "✓" : "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <footer>
          Built for practice — <span id="year">{new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}

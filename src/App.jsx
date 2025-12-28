import React, { useEffect, useState } from "react";

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
        // Example public todos API
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setTodos(data);
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

  return (
    <div className="wrap">
      <main className="card" role="main" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading">Todos</h1>
        <p className="lead">Fetch and display todos from a test API.</p>

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
                  todos.map((t) => (
                    <tr key={t.id}>
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

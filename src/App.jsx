import React, { useState, useMemo } from "react";
import { useGetTodosQuery, useUpdateTodoMutation } from "./store/api";

export default function App() {
  const { data: todos = [], isLoading, isError, error } = useGetTodosQuery();
  const [updateTodo] = useUpdateTodoMutation();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return todos || [];
    const q = query.toLowerCase();
    return (todos || []).filter((t) => (t.title || "").toLowerCase().includes(q));
  }, [todos, query]);

  async function toggleComplete(id) {
    const item = (todos || []).find((t) => t.id === id);
    if (!item) return;
    try {
      await updateTodo({ id, completed: !item.completed }).unwrap();
    } catch (e) {
      // show error via console; UI already optimistically updated
      console.error('Failed to update todo:', e);
    }
  }

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
        {isLoading && <p>Loading todos…</p>}
        {isError && <p style={{ color: "red" }}>Error: {error?.toString()}</p>}

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
                {(todos || []).length === 0 ? (
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

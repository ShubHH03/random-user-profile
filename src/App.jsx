import { useEffect, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import "./App.css";

const LIMIT = 9;


function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");
  pages.push(total);

  return pages;
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
      try {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=${LIMIT}`,
        );
        const data = await response.json();
        setUsers(data.data.data);
        setTotalPages(data.data.totalPages);
      } catch (err) {
        console.error("Error fetching users", err);
        setError("Failed to load user profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]); // re-runs every time page changes

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Random User Profiles</h1>
        <p className="app__subtitle">Discover people from around the world</p>
      </header>

      <main className="app__main">
        {loading && (
          <div className="state-container">
            <div className="spinner" />
            <p className="state-text">Fetching profiles…</p>
          </div>
        )}

        {error && (
          <div className="state-container state-container--error">
            <span className="state-icon">⚠</span>
            <p className="state-text">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid">
              {users.map((user) => (
                <ProfileCard key={user.id} user={user} />
              ))}
            </div>

            <nav className="pagination" aria-label="Page navigation">
              <button
                className="pagination__btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                ← Prev
              </button>

              <div className="pagination__pages">
                {getPageNumbers(page, totalPages).map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`ellipsis-${i}`}
                      className="pagination__ellipsis"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      className={`pagination__page ${p === page ? "pagination__page--active" : ""}`}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ),
                )}
              </div>

              <button
                className="pagination__btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
              >
                Next →
              </button>
            </nav>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

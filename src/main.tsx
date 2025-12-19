import { useAuth } from './app/context/AuthContext';

export function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav>
      {/* common links */}
      <a href="/problems">Problems</a>
      <a href="/leaderboard">Leaderboard</a>

      {role === 'admin' && (
        <a href="/admin" className="text-warning">
          Admin
        </a>
      )}

      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Sign Up</a>
        </>
      )}
    </nav>
  );
}

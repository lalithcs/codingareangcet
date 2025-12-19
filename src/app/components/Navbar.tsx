import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <nav className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
        <Code className="w-5 h-5 text-primary" />
        CodeArena
      </Link>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Link to="/problems">Problems</Link>
        <Link to="/leaderboard">Leaderboard</Link>

        {role === 'admin' && (
          <Link to="/admin" className="text-warning">
            Admin
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <button
              onClick={logout}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link
              to="/register"
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

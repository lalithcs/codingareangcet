import { Link, useNavigate } from 'react-router-dom';
import { Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-6">
      {/* ===== LOGO ===== */}
      <Link
        to={isAuthenticated ? '/problems' : '/'}
        className="flex items-center gap-2 text-lg font-semibold"
      >
        <Code className="w-5 h-5 text-primary" />
        CodeArena
      </Link>

      {/* ===== RIGHT SIDE ===== */}
      <div className="flex items-center gap-4">
        <ThemeToggle />

        {/* Common links */}
        <Link
          to="/leaderboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Leaderboard
        </Link>

        {isAuthenticated && (
          <Link
            to="/problems"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Problems
          </Link>
        )}

        {/* Admin only */}
        {role === 'admin' && (
          <Link
            to="/admin"
            className="text-sm text-warning hover:opacity-80 transition-colors"
          >
            Admin
          </Link>
        )}

        {/* Auth actions */}
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

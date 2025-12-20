/**
 * ======================================================
 * Navbar
 * ======================================================
 * - Visible only when authenticated
 * - Hidden on /login and /register
 * - Admin link shown only for admin users
 *
 * BACKEND:
 * POST /auth/logout
 * ======================================================
 */

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code, LogOut, Shield } from 'lucide-react';

import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

export function Navbar({
  showWhenUnauthenticated = false,
  publicView = false,
}: {
  showWhenUnauthenticated?: boolean;
  publicView?: boolean;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  /* ===================== HIDE NAVBAR ===================== */
  // If user is unauthenticated and we are not asked to show navbar, hide it.
  if (!isAuthenticated && !showWhenUnauthenticated) return null;

  // If unauthenticated and asked for public view, render simplified landing navbar.
  if (!isAuthenticated && showWhenUnauthenticated && publicView) {
    return (
      <nav className="h-16 border-b border-border bg-card">
        <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            <span className="text-lg font-semibold">CodeArena</span>
          </Link>

          <div className="flex items-center gap-4 text-sm">
            <Link to="/login" className="text-muted-foreground hover:text-foreground">
              Login
            </Link>

            <Link
              to="/register"
              className="px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Sign Up
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </nav>
    );
  }

  /* ===================== LOGOUT ===================== */
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="h-16 border-b border-border bg-card">
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
        {/* ===== LEFT ===== */}
        <Link to="/problems" className="flex items-center gap-2">
          <Code className="w-6 h-6 text-primary" />
          <span className="text-lg font-semibold">CodeArena</span>
        </Link>

        {/* ===== RIGHT ===== */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            to="/problems"
            className="text-muted-foreground hover:text-foreground"
          >
            Problems
          </Link>

          <Link
            to="/leaderboard"
            className="text-muted-foreground hover:text-foreground"
          >
            Leaderboard
          </Link>

          <Link
            to="/profile"
            className="text-muted-foreground hover:text-foreground"
          >
            Profile
          </Link>

          {/* ===== ADMIN ONLY ===== */}
          {role === 'admin' && (
            <Link
              to="/admin"
              className="flex items-center gap-1 text-warning hover:text-warning/80"
            >
              <Shield className="w-4 h-4" />
              Admin
            </Link>
          )}

          <ThemeToggle />

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

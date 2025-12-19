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
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();

  /* ===================== HIDE NAVBAR ===================== */
  if (
    !isAuthenticated ||
    location.pathname === '/login' ||
    location.pathname === '/register'
  ) {
    return null;
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

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

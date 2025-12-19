/**
 * ======================================================
 * AuthContext
 * ======================================================
 * BACKEND CONTRACT:
 *
 * GET  /auth/me
 *   → returns:
 *     {
 *       id: number,
 *       email: string,
 *       username: string,
 *       role: 'user' | 'admin'
 *     }
 *
 * POST /auth/logout
 *   → clears session cookie
 *
 * NOTES:
 * - Session is cookie-based
 * - Frontend does NOT store tokens
 * - Backend is source of truth
 * ======================================================
 */

import React, { createContext, useContext, useEffect, useState } from 'react';

/* ===================== TYPES ===================== */

export type Role = 'user' | 'admin';

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  role: Role | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

/* ===================== CONTEXT ===================== */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ===================== PROVIDER ===================== */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  /* ===================== LOAD SESSION ===================== */
  const refreshUser = async () => {
    setLoading(true);

    try {
      /**
       * BACKEND: GET /auth/me
       * credentials: 'include' is REQUIRED
       */
      // const res = await fetch('/auth/me', {
      //   credentials: 'include',
      // });

      // if (!res.ok) {
      //   setUser(null);
      //   return;
      // }

      // const data = await res.json();
      // setUser(data);

      /* ================= MOCK DATA (REMOVE WHEN BACKEND READY) ================= */
      setUser({
        id: 1,
        email: 'student@college.edu',
        username: 'lalith',
        role: 'user', // change to 'admin' to test admin UI
      });
      /* ======================================================================== */

    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== LOGOUT ===================== */
  const logout = async () => {
    try {
      /**
       * BACKEND: POST /auth/logout
       */
      // await fetch('/auth/logout', {
      //   method: 'POST',
      //   credentials: 'include',
      // });

    } catch (err) {
      // ignore errors on logout
    } finally {
      setUser(null);
    }
  };

  /* ===================== INIT ===================== */
  useEffect(() => {
    refreshUser();
  }, []);

  /* ===================== CONTEXT VALUE ===================== */

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    role: user?.role ?? null,
    loading,
    refreshUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ===================== HOOK ===================== */

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}

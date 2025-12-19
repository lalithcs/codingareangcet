import React, { createContext, useContext, useState } from 'react';

type Role = 'user' | 'admin';

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role?: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('auth') === 'true'
  );

  const [role, setRole] = useState<Role | null>(
    (localStorage.getItem('role') as Role) || null
  );

  const login = (userRole: Role = 'user') => {
    setIsAuthenticated(true);
    setRole(userRole);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('role', userRole);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'user' | 'admin' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(
    (localStorage.getItem('role') as Role) || null
  );

  const login = (r: Role) => {
    setRole(r);
    localStorage.setItem('role', r || '');
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!role,
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

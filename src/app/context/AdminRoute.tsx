import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function AdminRoute({ children }: { children: React.ReactElement }) {
  const { user } = useAuth();
  return user?.role === 'admin'
    ? children
    : <Navigate to="/problems" replace />;
}

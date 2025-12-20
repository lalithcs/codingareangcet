import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import React from 'react';

export function AdminRoute({ children }: { children: React.ReactElement }) {
  const { loading, isAuthenticated, role } = useAuth();

  if (loading) return null;

  if (!isAuthenticated || role !== 'admin') {
    return <Navigate to="/problems" replace />;
  }

  return children;
}

import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useAuth } from './context/AuthContext';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/register';

  return (
    <div className="min-h-screen bg-background">
      {!hideNavbar && (
        <Navbar
        />
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/problems" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/problems" />} />

        <Route path="/problems" element={isAuthenticated ? <ProblemsPage /> : <Navigate to="/login" />} />
        <Route path="/problems/:id" element={isAuthenticated ? <ProblemDetailPage /> : <Navigate to="/login" />} />

        <Route path="/submission/:id" element={isAuthenticated ? <SubmissionPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* ADMIN ONLY */}
        <Route
          path="/admin"
          element={
            role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

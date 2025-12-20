import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './context/ProtectedRoute';
import { AdminRoute } from './context/AdminRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { ProblemDetailPage } from './pages/ProblemDetailPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProblemForm } from './pages/AdminProblemsForm';
import { AdminProblemsPage } from './pages/AdminProblemsPage';
import { AdminTestCaseEditor } from './pages/AdminTestCaseEditor';
import { AdminContestForm } from './pages/AdminContestForm';
import { AdminContestsPage } from './pages/AdminContestsPage';
import { AdminSubmissionsPage } from './pages/AdminSubmissionsPage';
import { AdminStatsPage } from './pages/AdminStatsPage';
import { AdminLayout } from './layout/AdminLayout';

export default function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/problems"
          element={
            <ProtectedRoute>
              <ProblemsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/problems/:id"
          element={
            <ProtectedRoute>
              <ProblemDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/submission/:id"
          element={
            <ProtectedRoute>
              <SubmissionPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={<LeaderboardPage />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="problems" element={<AdminProblemsPage />} />
          <Route path="problems/new" element={<AdminProblemForm />} />
          <Route path="problems/:id" element={<AdminProblemForm />} />
          <Route path="problems/:id/testcases" element={<AdminTestCaseEditor />} />
          <Route path="contests" element={<AdminContestsPage />} />
          <Route path="contests/new" element={<AdminContestForm />} />
          <Route path="contests/:id" element={<AdminContestForm />} />
          <Route path="submissions" element={<AdminSubmissionsPage />} />
          <Route path="stats" element={<AdminStatsPage />} />
        </Route>



        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

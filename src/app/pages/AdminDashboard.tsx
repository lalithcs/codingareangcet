import React from 'react';
import { RefreshCcw, Users, FileCode, Activity } from 'lucide-react';
import { Button } from '../components/Button';

/* ===================== TYPES ===================== */

interface PlatformStats {
  users: number;
  problems: number;
  submissions: number;
  activeToday: number;
}

/* ===================== MOCK DATA (UI ONLY) ===================== */

const stats: PlatformStats = {
  users: 1240,
  problems: 210,
  submissions: 18432,
  activeToday: 312,
};

/* ===================== COMPONENT ===================== */

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background px-6 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform overview and administrative actions.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-4 mb-10">
        <Stat
          icon={<Users className="w-5 h-5" />}
          label="Total Users"
          value={stats.users}
        />
        <Stat
          icon={<FileCode className="w-5 h-5" />}
          label="Problems"
          value={stats.problems}
        />
        <Stat
          icon={<Activity className="w-5 h-5" />}
          label="Submissions"
          value={stats.submissions}
        />
        <Stat
          icon={<Users className="w-5 h-5" />}
          label="Active Today"
          value={stats.activeToday}
        />
      </section>

      {/* Actions */}
      <section className="border border-border p-4 mb-10">
        <h2 className="text-lg font-medium mb-2">Administrative Actions</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Use these actions carefully. They affect live submissions.
        </p>

        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCcw className="w-4 h-4" />
            Rejudge Problem
          </Button>
          <Button variant="outline">
            View System Logs
          </Button>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-medium mb-3">Recent Activity</h2>

        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="text-left px-3 py-2">Event</th>
                <th className="text-left px-3 py-2">User</th>
                <th className="text-left px-3 py-2">Time</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2">Submission Accepted</td>
                <td className="px-3 py-2">arjun_ace</td>
                <td className="px-3 py-2 text-muted-foreground">
                  2 minutes ago
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2">Problem Rejudged</td>
                <td className="px-3 py-2">admin</td>
                <td className="px-3 py-2 text-muted-foreground">
                  10 minutes ago
                </td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2">New User Registered</td>
                <td className="px-3 py-2">new_student</td>
                <td className="px-3 py-2 text-muted-foreground">
                  30 minutes ago
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="border border-border p-4 flex items-center gap-4">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

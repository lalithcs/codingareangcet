/**
 * ======================================================
 * AdminDashboard
 * ======================================================
 * BACKEND:
 * GET /admin/stats
 * ======================================================
 */

import { Card } from './../components/Card';

export function AdminDashboard() {
  /**
   * MOCK DATA
   * REMOVE WHEN BACKEND READY
   */
  const stats = {
    users: 1247,
    problems: 165,
    submissions: 45892,
    contests: 12,
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl">Admin Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Users" value={stats.users} />
        <StatCard label="Problems" value={stats.problems} />
        <StatCard label="Submissions" value={stats.submissions} />
        <StatCard label="Contests" value={stats.contests} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-2xl mt-2">{value}</p>
    </Card>
  );
}

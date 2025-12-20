/**
 * ======================================================
 * AdminStatsPage
 * ======================================================
 *
 * NOTE: This page uses MOCK data for local development. Replace
 * the mock data with real API calls when the backend is ready.
 * Relevant endpoint:
 * - GET /admin/stats
 *
 * Integration steps:
 * - Replace `stats` mock with a fetch to `GET /admin/stats`.
 * - Show loading/error states and handle auth (credentials/headers).
 */

import { Card } from './../components/Card';
import { useEffect, useState } from 'react';

type Stats = {
  users: number;
  problems: number;
  submissions: number;
  contests: number;
};

const MOCK_STATS: Stats = {
  users: 1247,
  problems: 165,
  submissions: 45892,
  contests: 12,
};

export function AdminStatsPage() {
  const [stats, setStats] = useState<Stats | null>(MOCK_STATS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example integration:
    // setLoading(true);
    // fetch('/api/admin/stats', { credentials: 'include' })
    //   .then(r => r.json())
    //   .then(setStats)
    //   .catch(() => {/* handle error */})
    //   .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return <p className="p-6">Loading…</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl">Stats</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Users</p>
          <p className="text-2xl mt-2">{stats.users}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Problems</p>
          <p className="text-2xl mt-2">{stats.problems}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Submissions</p>
          <p className="text-2xl mt-2">{stats.submissions}</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Contests</p>
          <p className="text-2xl mt-2">{stats.contests}</p>
        </Card>
      </div>
    </div>
  );
}

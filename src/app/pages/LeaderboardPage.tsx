/**
 * ======================================================
 * LeaderboardPage
 * ======================================================
 * BACKEND CONTRACT:
 *
 * GET /leaderboard/global
 * GET /leaderboard/weekly
 * ======================================================
 */

import React, { useEffect, useState } from 'react';
import { Tabs } from '../components/Tabs';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

/* ===================== TYPES ===================== */

interface LeaderboardEntry {
  id: number;
  user_id: number;
  username: string; // MOCK ONLY
  score: number;
}

/* ===================== MOCK DATA ===================== */
/* REMOVE THIS BLOCK WHEN BACKEND IS CONNECTED */
const MOCK_GLOBAL: LeaderboardEntry[] = [
  { id: 1, user_id: 1, username: 'lalith', score: 1520 },
  { id: 2, user_id: 2, username: 'ram', score: 1430 },
  { id: 3, user_id: 3, username: 'sai', score: 1390 },
  { id: 4, user_id: 4, username: 'kiran', score: 1200 },
];

const MOCK_WEEKLY: LeaderboardEntry[] = [
  { id: 5, user_id: 3, username: 'sai', score: 420 },
  { id: 6, user_id: 1, username: 'lalith', score: 400 },
  { id: 7, user_id: 2, username: 'ram', score: 380 },
];
/* =================================================== */

export function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);

  /* ===================== LOADERS ===================== */

  const loadGlobal = async () => {
    setLoading(true);

    try {
      /**
       * BACKEND:
       * GET /leaderboard/global
       */
      // const res = await fetch('/leaderboard/global', {
      //   credentials: 'include',
      // });
      // const data = await res.json();
      // setEntries(data);

      await new Promise((r) => setTimeout(r, 500));
      setEntries(MOCK_GLOBAL);
    } finally {
      setLoading(false);
    }
  };

  const loadWeekly = async () => {
    setLoading(true);

    try {
      /**
       * BACKEND:
       * GET /leaderboard/weekly
       */
      // const res = await fetch('/leaderboard/weekly', {
      //   credentials: 'include',
      // });
      // const data = await res.json();
      // setEntries(data);

      await new Promise((r) => setTimeout(r, 500));
      setEntries(MOCK_WEEKLY);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <h1 className="text-2xl mb-6">Leaderboard</h1>

      <Tabs
        tabs={[
          {
            id: 'global',
            label: 'Global',
            content: (
              <LeaderboardTable
                entries={entries}
                loading={loading}
                onMount={loadGlobal}
              />
            ),
          },
          {
            id: 'weekly',
            label: 'Weekly',
            content: (
              <LeaderboardTable
                entries={entries}
                loading={loading}
                onMount={loadWeekly}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

/* ===================== TABLE ===================== */

function LeaderboardTable({
  entries,
  loading,
  onMount,
}: {
  entries: LeaderboardEntry[];
  loading: boolean;
  onMount: () => void;
}) {
  useEffect(() => {
    onMount();
  }, [onMount]);

  if (loading) {
    return <p className="text-muted-foreground">Loading leaderboard…</p>;
  }

  return (
    <Card className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="text-left p-3">Rank</th>
            <th className="text-left p-3">User</th>
            <th className="text-right p-3">Score</th>
          </tr>
        </thead>

        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id} className="border-t border-border">
              <td className="p-3">
                {index < 3 ? (
                  <Badge variant="success">#{index + 1}</Badge>
                ) : (
                  `#${index + 1}`
                )}
              </td>
              <td className="p-3">{entry.username}</td>
              <td className="p-3 text-right">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

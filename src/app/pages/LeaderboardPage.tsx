import React from 'react';
import { Trophy } from 'lucide-react';

/* ===================== TYPES ===================== */

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  isYou?: boolean;
}

/* ===================== MOCK DATA ===================== */

const leaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'arjun_ace', score: 980 },
  { rank: 2, username: 'code_warrior', score: 945 },
  { rank: 3, username: 'byte_master', score: 920 },
  { rank: 4, username: 'logic_loop', score: 880 },
  { rank: 5, username: 'you', score: 860, isYou: true },
  { rank: 6, username: 'stack_over', score: 830 },
];

/* ===================== COMPONENT ===================== */

export function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Rankings based on problem solving performance.
        </p>
      </header>

      {/* Top 3 */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((u) => (
          <div
            key={u.rank}
            className="border border-border p-4 text-center"
          >
            <Trophy
              className={`mx-auto mb-2 ${
                u.rank === 1
                  ? 'text-yellow-400'
                  : u.rank === 2
                  ? 'text-gray-400'
                  : 'text-orange-400'
              }`}
            />
            <div className="font-medium">{u.username}</div>
            <div className="text-sm text-muted-foreground">
              {u.score} pts
            </div>
          </div>
        ))}
      </section>

      {/* Rest of leaderboard */}
      <section className="border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground">
            <tr>
              <th className="text-left px-3 py-2 w-16">Rank</th>
              <th className="text-left px-3 py-2">User</th>
              <th className="text-right px-3 py-2 w-24">Score</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.slice(3).map((u) => (
              <tr
                key={u.rank}
                className={`border-t border-border ${
                  u.isYou ? 'bg-muted/30 font-medium' : ''
                }`}
              >
                <td className="px-3 py-2">#{u.rank}</td>
                <td className="px-3 py-2">{u.username}</td>
                <td className="px-3 py-2 text-right">{u.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

import React from 'react';
import { User, CheckCircle, Clock } from 'lucide-react';

/* ===================== TYPES ===================== */

interface UserStats {
  solved: number;
  attempted: number;
  submissions: number;
  accuracy: number;
}

interface Submission {
  id: number;
  problem: string;
  verdict: 'AC' | 'WA' | 'TLE';
  language: string;
}

/* ===================== MOCK DATA ===================== */

const stats: UserStats = {
  solved: 42,
  attempted: 58,
  submissions: 120,
  accuracy: 72,
};

const submissions: Submission[] = [
  { id: 1, problem: 'Two Sum', verdict: 'AC', language: 'C++' },
  { id: 2, problem: 'Add Two Numbers', verdict: 'WA', language: 'Java' },
  { id: 3, problem: 'Longest Substring', verdict: 'AC', language: 'Python' },
  { id: 4, problem: 'Median of Arrays', verdict: 'TLE', language: 'C++' },
];

/* ===================== COMPONENT ===================== */

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-background px-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <User className="w-6 h-6 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">your_username</h1>
          <p className="text-sm text-muted-foreground">
            Coding Arena Profile
          </p>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-4 mb-10">
        <Stat label="Solved" value={stats.solved} />
        <Stat label="Attempted" value={stats.attempted} />
        <Stat label="Submissions" value={stats.submissions} />
        <Stat label="Accuracy" value={`${stats.accuracy}%`} />
      </section>

      {/* Submissions */}
      <section>
        <h2 className="text-lg font-medium mb-3">Recent Submissions</h2>

        <div className="border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground">
              <tr>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Problem</th>
                <th className="text-left px-3 py-2">Language</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-3 py-2">
                    <VerdictIcon verdict={s.verdict} />
                  </td>
                  <td className="px-3 py-2">{s.problem}</td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {s.language}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function VerdictIcon({ verdict }: { verdict: 'AC' | 'WA' | 'TLE' }) {
  if (verdict === 'AC')
    return <CheckCircle className="w-4 h-4 text-green-500" />;
  if (verdict === 'WA')
    return <Clock className="w-4 h-4 text-yellow-500" />;
  return <Clock className="w-4 h-4 text-red-500" />;
}

/**
 * ======================================================
 * AdminSubmissionsPage
 * ======================================================
 *
 * NOTE: This page uses MOCK data for local development. Replace
 * the mock data and TODOs with real API calls when the backend is ready.
 * Relevant endpoints:
 * - GET /submissions (or GET /problems/{id}/submissions)
 * - GET /submissions/{id}
 * - POST /submissions/{id}/run, POST /submissions/{id}/submit
 *
 * Integration steps:
 * - Replace `MOCK_SUBMISSIONS` with a fetch to `GET /submissions` (admin-only)
 *   or filter by problem/user as needed.
 * - Add loading/error states; send credentials or auth headers.
 * - Wire action buttons to API endpoints (run, re-evaluate, view details).
 */

import { useNavigate } from 'react-router-dom';
import { Button } from './../components/Button';
import { Card } from './../components/Card';
import { useEffect, useState } from 'react';

type Submission = {
  id: number;
  user: string;
  problem: string;
  status: string;
  runtime_ms?: number | null;
};

const MOCK_SUBMISSIONS: Submission[] = [
  { id: 101, user: 'alice', problem: 'Two Sum', status: 'Accepted', runtime_ms: 12 },
  { id: 102, user: 'bob', problem: 'Longest Substring', status: 'Wrong Answer', runtime_ms: null },
];

export function AdminSubmissionsPage() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example integration:
    // setLoading(true);
    // fetch('/api/admin/submissions', { credentials: 'include' })
    //   .then(r => r.json())
    //   .then(setSubmissions)
    //   .catch(() => {/* handle error */})
    //   .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Submissions</h1>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        submissions.map((s) => (
          <Card key={s.id} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">#{s.id} — {s.problem}</p>
              <p className="text-sm text-muted-foreground">by {s.user} — {s.status}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/admin/submissions/${s.id}`)}>
                View
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // TODO: trigger re-run via POST /submissions/{id}/run
                }}
              >
                Re-run
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

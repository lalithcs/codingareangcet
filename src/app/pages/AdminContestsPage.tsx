/**
 * ======================================================
 * AdminContestsPage
 * ======================================================
 *
 * NOTE: This page currently uses MOCK data (`MOCK_CONTESTS`) for local
 * development and visual testing. When integrating with the backend:
 * - Replace `MOCK_CONTESTS` with a fetch to `GET /admin/contests` or
 *   a public `GET /contests` endpoint (depending on your API design).
 * - Implement creation via `POST /admin/contests` (or `POST /contests`).
 * - Use `PATCH /contests/{id}` and `DELETE /contests/{id}` for edit/delete.
 * - Add proper loading/error states and handle authentication/authorization
 *   (the frontend should send credentials or appropriate auth headers).
 */

import { useNavigate } from 'react-router-dom';
import { Button } from './../components/Button';
import ConfirmDialog from './../components/ConfirmDialog';
import { Card } from './../components/Card';
import { useEffect, useState } from 'react';

type Contest = { id: number; title: string };

// MOCK DATA: replace with API call when backend is ready.
const MOCK_CONTESTS: Contest[] = [
  { id: 1, title: 'Weekly Challenge #12' },
  { id: 2, title: 'Monthly Marathon' },
];

export function AdminContestsPage() {
  const navigate = useNavigate();
  const [contests, setContests] = useState<Contest[]>(MOCK_CONTESTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Example fetch when integrating backend:
    // setLoading(true);
    // fetch('/api/contests', { credentials: 'include' })
    //   .then((r) => r.json())
    //   .then(setContests)
    //   .catch(() => {/* handle error */})
    //   .finally(() => setLoading(false));
    
    // Currently using MOCK_CONTESTS for display.
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Manage Contests</h1>
        <Button onClick={() => navigate('/admin/contests/new')}>
          Create Contest
        </Button>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : (
        contests.map((c) => (
          <Card key={c.id} className="p-4 flex justify-between items-center">
            <div>
              <p>{c.title}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(`/admin/contests/${c.id}`)}>
                Edit
              </Button>

              <ConfirmDialog
                title={`Delete ${c.title}?`}
                description="This will permanently remove the contest and cannot be undone."
                confirmLabel="Delete"
                onConfirm={async () => {
                  // TODO: call DELETE /contests/{id} then remove from state
                  // Example integration:
                  // await fetch(`/api/contests/${c.id}`, { method: 'DELETE', credentials: 'include' });
                  setContests((s) => s.filter((x) => x.id !== c.id));
                }}
              >
                <Button variant="destructive" size="sm">Delete</Button>
              </ConfirmDialog>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}

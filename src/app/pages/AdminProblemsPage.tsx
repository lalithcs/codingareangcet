/**
 * ======================================================
 * AdminProblemsPage
 * ======================================================
 * BACKEND:
 * GET /problems
 * DELETE /problems/{id}
 * ======================================================
 */

import { useNavigate } from 'react-router-dom';
import { Button } from './../components/Button';
import ConfirmDialog from './../components/ConfirmDialog';
import { Card } from './../components/Card';

const MOCK_PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'easy' },
  { id: 2, title: 'Longest Substring', difficulty: 'medium' },
];

export function AdminProblemsPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Manage Problems</h1>
        <Button onClick={() => navigate('/admin/problems/new')}>
          Add Problem
        </Button>
      </div>

      {MOCK_PROBLEMS.map((p) => (
        <Card key={p.id} className="p-4 flex justify-between items-center">
          <div>
            <p>{p.title}</p>
            <p className="text-sm text-muted-foreground">
              Difficulty: {p.difficulty}
            </p>
          </div>

            <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/admin/problems/${p.id}`)}
            >
              Edit
            </Button>

              <ConfirmDialog
                title={`Delete ${p.title}?`}
                description="This will permanently remove the problem and its test-cases."
                confirmLabel="Delete"
                onConfirm={async () => {
                  // TODO: call DELETE /problems/{id} then update list
                  // Example:
                  // await fetch(`/api/problems/${p.id}`, { method: 'DELETE', credentials: 'include' });
                  // remove from local mock list (if using real data, re-fetch instead)
                }}
              >
                <Button variant="destructive" size="sm">Delete</Button>
              </ConfirmDialog>
          </div>
        </Card>
      ))}
    </div>
  );
}

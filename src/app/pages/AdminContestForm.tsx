/**
 * ======================================================
 * AdminContestForm
 * ======================================================
 * BACKEND CONTRACT (FUTURE):
 *
 * POST /contests
 * {
 *   title: string
 *   description: string
 *   start_time: ISO string
 *   end_time: ISO string
 *   problem_ids: number[]
 * }
 * ======================================================
 */

import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from './../components/Card';
import { Input } from './../components/Input';
import { Button } from './../components/Button';

const MOCK_PROBLEMS = [
  { id: 1, title: 'Two Sum' },
  { id: 2, title: 'Longest Substring' },
  { id: 3, title: 'Binary Search' },
];

export function AdminContestForm() {
  const params = useParams();
  const id = params.id;
  const isEdit = !!id;

  // Controlled form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedProblems, setSelectedProblems] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleProblem = (pid: number) => {
    setSelectedProblems((prev) => (prev.includes(pid) ? prev.filter((p) => p !== pid) : [...prev, pid]));
  };

  useEffect(() => {
    if (!isEdit) return;

    // MOCK: load contest details when editing. Replace with GET /contests/{id}
    setLoading(true);
    const mock = {
      id: Number(id),
      title: `Weekly Contest #${id}`,
      description: `Mock description for contest ${id}`,
      start_time: '2025-12-20T10:00',
      end_time: '2025-12-20T12:00',
      problem_ids: [1, 3],
    };

    // Simulate fetch
    setTimeout(() => {
      setTitle(mock.title);
      setDescription(mock.description);
      setStartTime(mock.start_time);
      setEndTime(mock.end_time);
      setSelectedProblems(mock.problem_ids);
      setLoading(false);
    }, 300);
  }, [id, isEdit]);

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <h1 className="text-2xl">{isEdit ? 'Edit Contest' : 'Create Contest'}</h1>

      <Card className="p-6 space-y-4">
        {loading ? (
          <p>Loading…</p>
        ) : (
          <>
            <Input label="Contest Title" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)} placeholder="Weekly Contest #12" />

            <Input
              label="Description"
              as="textarea"
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.currentTarget.value)}
              placeholder="This contest focuses on arrays and hashing."
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Time" type="datetime-local" value={startTime} onChange={(e: ChangeEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)} />
              <Input label="End Time" type="datetime-local" value={endTime} onChange={(e: ChangeEvent<HTMLInputElement>) => setEndTime(e.currentTarget.value)} />
            </div>

            <div>
              <h3 className="mb-2">Select Problems</h3>

              <div className="space-y-2">
                {MOCK_PROBLEMS.map((p) => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={selectedProblems.includes(p.id)} onChange={() => toggleProblem(p.id)} />
                    <span>{p.title}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button variant="primary">
              {isEdit ? 'Save Changes' : 'Create Contest'}
            </Button>

            {/*
              BACKEND INTEGRATION:
              - Create: POST /contests with body { title, description, start_time, end_time, problem_ids }
              - Edit: PATCH /contests/{id} with updated fields
              - On success navigate back to /admin/contests and refresh list
            */}
          </>
        )}
      </Card>
    </div>
  );
}

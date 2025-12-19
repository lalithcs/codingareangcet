/**
 * ======================================================
 * ProblemsPage
 * ======================================================
 * BACKEND CONTRACT:
 *
 * GET /problems
 *
 * Returns:
 * [
 *   {
 *     id: number,
 *     title: string,
 *     difficulty: 'easy' | 'medium' | 'hard'
 *   }
 * ]
 * ======================================================
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

/* ===================== TYPES ===================== */

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/* ===================== MOCK DATA ===================== */
/* REMOVE THIS BLOCK WHEN BACKEND IS CONNECTED */
const MOCK_PROBLEMS: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'easy' },
  { id: 2, title: 'Reverse Linked List', difficulty: 'medium' },
  { id: 3, title: 'Longest Palindromic Substring', difficulty: 'hard' },
];
/* =================================================== */

export function ProblemsPage() {
  const navigate = useNavigate();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProblems = async () => {
      setLoading(true);

      try {
        /**
         * BACKEND: GET /problems
         */
        // const res = await fetch('/problems', {
        //   credentials: 'include',
        // });
        // const data = await res.json();
        // setProblems(data);

        /* ============== MOCK ============== */
        await new Promise((r) => setTimeout(r, 600));
        setProblems(MOCK_PROBLEMS);
        /* ================================= */

      } catch (err) {
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };

    loadProblems();
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-6">
      <h1 className="text-2xl mb-6">Problems</h1>

      {loading ? (
        <p className="text-muted-foreground">Loading problems…</p>
      ) : (
        <div className="grid gap-4">
          {problems.map((problem) => (
            <Card
              key={problem.id}
              className="p-4 cursor-pointer hover:bg-accent transition"
              onClick={() => navigate(`/problems/${problem.id}`)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Problem #{problem.id}
                  </p>
                </div>

                <Badge variant={problem.difficulty}>
                  {problem.difficulty.toUpperCase()}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

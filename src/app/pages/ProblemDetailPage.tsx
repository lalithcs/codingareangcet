/**
 * ======================================================
 * ProblemDetailPage
 * ======================================================
 * BACKEND CONTRACT:
 *
 * GET /problems/{id}
 *
 * Returns:
 * {
 *   id: number,
 *   title: string,
 *   difficulty: 'easy' | 'medium' | 'hard',
 *   description: string,
 *   constraints: string
 * }
 * ======================================================
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Send } from 'lucide-react';

import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Tabs } from '../components/Tabs';
import { Select } from '../components/Select';
import { CodeEditor } from '../components/CodeEditor';

/* ===================== TYPES ===================== */

interface Problem {
  id: number;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  constraints: string;
}

/* ===================== MOCK DATA ===================== */
/* REMOVE THIS BLOCK WHEN BACKEND IS CONNECTED */
const MOCK_PROBLEM: Problem = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'easy',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  constraints:
    '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹',
};
/* =================================================== */

export function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState('// write your code here');

  /* ===================== LOAD PROBLEM ===================== */
  useEffect(() => {
    const loadProblem = async () => {
      setLoading(true);

      try {
        /**
         * BACKEND: GET /problems/{id}
         */
        // const res = await fetch(`/problems/${id}`, {
        //   credentials: 'include',
        // });
        // const data = await res.json();
        // setProblem(data);

        /* ============== MOCK ============== */
        await new Promise((r) => setTimeout(r, 600));
        setProblem(MOCK_PROBLEM);
        /* ================================= */

      } catch {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 text-muted-foreground">Loading problem…</div>
    );
  }

  if (!problem) {
    return (
      <div className="p-6 text-destructive">Problem not found</div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* ================= HEADER ================= */}
      <div className="border-b border-border px-6 py-4">
        <button
          onClick={() => navigate('/problems')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Problems
        </button>

        <div className="flex items-center gap-3">
          <h1 className="text-xl">{problem.title}</h1>
          <Badge variant={problem.difficulty}>
            {problem.difficulty.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* ===== LEFT: PROBLEM ===== */}
        <div className="w-[45%] overflow-y-auto border-r border-border p-6">
          <Tabs
            tabs={[
              {
                id: 'problem',
                label: 'Problem',
                content: (
                  <div className="space-y-4">
                    <p>{problem.description}</p>

                    <Card className="p-4">
                      <h3 className="mb-2">Constraints</h3>
                      <pre className="text-sm whitespace-pre-wrap">
                        {problem.constraints}
                      </pre>
                    </Card>
                  </div>
                ),
              },
              {
                id: 'solutions',
                label: 'Solutions',
                content: (
                  <p className="text-muted-foreground">
                    Community solutions will appear here.
                  </p>
                ),
              },
              {
                id: 'discussions',
                label: 'Discussions',
                content: (
                  <p className="text-muted-foreground">
                    Discussions will appear here.
                  </p>
                ),
              },
            ]}
          />
        </div>

        {/* ===== RIGHT: EDITOR ===== */}
        <div className="w-[55%] flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-border p-3 flex items-center justify-between">
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              options={[
                { value: 'cpp', label: 'C++' },
                { value: 'java', label: 'Java' },
                { value: 'python', label: 'Python' },
              ]}
              className="w-32"
            />

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Play className="w-4 h-4" />
                Run
              </Button>

              <Button variant="primary" size="sm">
                <Send className="w-4 h-4" />
                Submit
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 p-4">
            <CodeEditor
              value={code}
              onChange={setCode}
              language={language}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

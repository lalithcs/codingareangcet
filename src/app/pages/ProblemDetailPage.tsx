/**
 * ======================================================
 * ProblemDetailPage
 * ======================================================
 * BACKEND CONTRACT:
 *
 * GET /problems/{id}
 * POST /submissions/{id}/run
 * POST /submissions/{id}/submit
 * ======================================================
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Send, Terminal } from 'lucide-react';

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

type ExecutionState = 'idle' | 'running' | 'finished';

interface ExecutionResult {
  logs: string[];
  verdict?: string;
}

/* ===================== STARTER CODE ===================== */

const STARTER_CODE: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    // write your code here

    return 0;
}
`,
  java: `import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {

        // write your code here

    }
}
`,
  python: `def main():
    # write your code here
    pass

if __name__ == "__main__":
    main()
`,
};

/* ===================== MOCK PROBLEM ===================== */

const MOCK_PROBLEM: Problem = {
  id: 1,
  title: 'Two Sum',
  difficulty: 'easy',
  description:
    'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  constraints:
    '2 ≤ nums.length ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹',
};

/* ===================== COMPONENT ===================== */

export function ProblemDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);

  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(STARTER_CODE.cpp);
  const [isDirty, setIsDirty] = useState(false);

  const [execState, setExecState] = useState<ExecutionState>('idle');
  const [result, setResult] = useState<ExecutionResult>({
    logs: ['Click Run to execute your code'],
  });

  /* ===================== LOAD PROBLEM ===================== */
  useEffect(() => {
    const loadProblem = async () => {
      setLoading(true);

      try {
        /**
         * BACKEND: GET /problems/{id}
         */
        // const res = await fetch(`/problems/${id}`, { credentials: 'include' });
        // const data = await res.json();
        // setProblem(data);

        await new Promise((r) => setTimeout(r, 600));
        setProblem(MOCK_PROBLEM);
      } catch {
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  /* ===================== LANGUAGE CHANGE ===================== */
  useEffect(() => {
    if (!isDirty) {
      setCode(STARTER_CODE[language]);
    }
  }, [language]);

  /* ===================== RUN (MOCK) ===================== */
  const runCode = () => {
    setExecState('running');
    setResult({ logs: ['▶ Running test cases…'] });

    setTimeout(() => {
      setExecState('finished');
      setResult({
        verdict: 'Accepted',
        logs: [
          '✔ Test case 1 passed',
          '✔ Test case 2 passed',
          '✔ All test cases passed',
          'Runtime: 4 ms',
          'Memory: 10.2 MB',
        ],
      });
    }, 1500);
  };

  /* ===================== SUBMIT (MOCK) ===================== */
  const submitCode = () => {
    setExecState('running');
    setResult({ logs: ['▶ Submitting solution…'] });

    setTimeout(() => {
      setExecState('finished');
      setResult({
        verdict: 'Accepted',
        logs: [
          '✔ Submission accepted',
          'Runtime: 4 ms',
          'Memory: 10.2 MB',
        ],
      });
    }, 1800);
  };

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading problem…</div>;
  }

  if (!problem) {
    return <div className="p-6 text-destructive">Problem not found</div>;
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
        {/* LEFT */}
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
              { id: 'solutions', label: 'Solutions', content: 'Coming soon' },
              { id: 'discussions', label: 'Discussions', content: 'Coming soon' },
            ]}
          />
        </div>

        {/* RIGHT */}
        <div className="w-[55%] flex flex-col">
          {/* Toolbar */}
          <div className="border-b border-border p-3 flex items-center justify-between">
            <Select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setIsDirty(false);
              }}
              options={[
                { value: 'cpp', label: 'C++' },
                { value: 'java', label: 'Java' },
                { value: 'python', label: 'Python' },
              ]}
              className="w-32"
            />

            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={runCode}>
                <Play className="w-4 h-4" /> Run
              </Button>
              <Button variant="primary" size="sm" onClick={submitCode}>
                <Send className="w-4 h-4" /> Submit
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 p-4">
            <CodeEditor
              value={code}
              onChange={(v) => {
                setCode(v);
                setIsDirty(true);
              }}
              language={language}
              className="h-full"
            />
          </div>

          {/* Console */}
          <div className="h-44 bg-black text-green-400 font-mono text-sm p-3 border-t border-border overflow-y-auto">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Terminal className="w-4 h-4" />
              Execution Console
            </div>

            {result.logs.map((line, i) => (
              <div key={i}>{line}</div>
            ))}

            {execState === 'running' && <div className="animate-pulse">▍</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

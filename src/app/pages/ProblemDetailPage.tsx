import React, { useState } from 'react';
import { Play, Send, ChevronLeft, Terminal } from 'lucide-react';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { CodeEditor } from '../components/CodeEditor';
import { Tabs } from '../components/Tabs';

/* ===================== TYPES ===================== */

type ExecutionState = 'idle' | 'compiling' | 'running' | 'finished' | 'error';

interface ExecutionResult {
  verdict?: 'AC' | 'WA' | 'TLE' | 'RE';
  runtime?: number;
  memory?: number;
  logs: string[];
}

/* ===================== DATA ===================== */
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
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

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

  javascript: `const fs = require("fs");

function main() {
    // write your code here
}

main();
`,

  c: `#include <stdio.h>

int main() {
    // write your code here
    return 0;
}
`,
};


/* ===================== COMPONENT ===================== */

export function ProblemDetailPage({ problemId, onBack }: any) {
  const [language, setLanguage] = useState('cpp');
  const [code, setCode] = useState(STARTER_CODE.cpp);
  const [isDirty, setIsDirty] = useState(false);


  const [state, setState] = useState<ExecutionState>('idle');
  const [result, setResult] = useState<ExecutionResult>({ logs: [] });

  /* ===================== RUN ===================== */
  const runCode = () => {
    setState('compiling');
    setResult({ logs: ['▶ Compiling…'] });

    setTimeout(() => {
      setState('running');
      setResult(r => ({
        ...r,
        logs: [
          ...r.logs,
          '✔ Compilation successful',
          '▶ Running test cases…',
        ],
      }));
    }, 1200);

    setTimeout(() => {
      setState('finished');
      setResult(r => ({
        ...r,
        verdict: 'AC',
        runtime: 4,
        memory: 10.2,
        logs: [
          ...r.logs,
          '✔ Test case 1 passed',
          '✔ Test case 2 passed',
          '✔ All test cases passed',
        ],
      }));
    }, 3000);
  };

  /* ===================== SUBMIT ===================== */
  const submitCode = () => {
    setState('running');
    setResult({ logs: ['▶ Submitting solution…'] });

    setTimeout(() => {
      setState('finished');
      setResult({
        verdict: 'AC',
        runtime: 4,
        memory: 10.2,
        logs: [
          '✔ Accepted',
          'Runtime: 4 ms',
          'Memory: 10.2 MB',
        ],
      });
    }, 2500);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Problems
          </button>

          <div className="flex items-center gap-3 mt-1">
            <h1 className="text-lg font-medium">{problemId}. Two Sum</h1>
            <Badge variant="easy">Easy</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Select
            options={[
              { value: 'cpp', label: 'C++' },
              { value: 'java', label: 'Java' },
              { value: 'python', label: 'Python' },
            ]}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-36"
          />
          <Button variant="outline" size="sm" onClick={runCode}>
            <Play className="w-4 h-4" /> Run
          </Button>
          <Button variant="primary" size="sm" onClick={submitCode}>
            <Send className="w-4 h-4" /> Submit
          </Button>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex flex-1 overflow-hidden">
        {/* ===== EDITOR (65%) ===== */}
        <section className="w-[65%] flex flex-col border-r border-border">

  {/* ===== EDITOR TOOLBAR ===== */}
  <div className="h-12 px-4 flex items-center justify-between border-b border-border bg-card">
    <Select
      options={[
        { value: 'cpp', label: 'C++' },
        { value: 'java', label: 'Java' },
        { value: 'python', label: 'Python' },
      ]}
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="w-32"
    />

    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={runCode}>
        <Play className="w-4 h-4" />
        Run
      </Button>
      <Button variant="primary" size="sm" onClick={submitCode}>
        <Send className="w-4 h-4" />
        Submit
      </Button>
    </div>
  </div>

  {/* ===== EDITOR ===== */}
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

  {/* ===== CONSOLE ===== */}
  <ExecutionConsole state={state} result={result} />

</section>

        {/* ===== PROBLEM (35%) ===== */}
        <aside className="w-[35%] overflow-y-auto p-6 text-sm">
          <Tabs
            tabs={[
              {
                id: 'problem',
                label: 'Problem',
                content: (
                  <div className="space-y-4 leading-relaxed">
                    <p>
                      Given an array of integers <code>nums</code> and an integer{' '}
                      <code>target</code>, return indices of the two numbers such
                      that they add up to target.
                    </p>
                    <p>
                      You may assume exactly one solution exists and the same
                      element cannot be used twice.
                    </p>
                    <p className="text-muted-foreground">
                      Constraints: 2 ≤ nums.length ≤ 10⁴
                    </p>
                  </div>
                ),
              },
              { id: 'solutions', label: 'Solutions', content: <p>Community solutions</p> },
              { id: 'discussions', label: 'Discussions', content: <p>Discussions</p> },
            ]}
          />
        </aside>
      </main>
    </div>
  );
}

/* ===================== CONSOLE ===================== */

function ExecutionConsole({
  state,
  result,
}: {
  state: ExecutionState;
  result: ExecutionResult;
}) {
  if (state === 'idle') return null;

  return (
    <div className="h-52 bg-black text-green-400 font-mono text-sm p-3 border-t border-border overflow-y-auto">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
        <Terminal className="w-4 h-4" />
        Execution Console
      </div>

      {result.logs.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      {state === 'running' && (
        <div className="animate-pulse">▍</div>
      )}
    </div>
  );
}

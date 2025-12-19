import React from 'react';
import { ChevronLeft, Terminal } from 'lucide-react';
import { Button } from '../components/Button';

/* ===================== TYPES ===================== */

type Verdict = 'AC' | 'WA' | 'TLE' | 'RE';

interface SubmissionResult {
  verdict: Verdict;
  runtime: number;
  memory: number;
  language: string;
  submittedAt: string;
  logs: string[];
  code: string;
}

/* ===================== MOCK DATA (UI ONLY) ===================== */

const result: SubmissionResult = {
  verdict: 'AC',
  runtime: 4,
  memory: 10.2,
  language: 'C++',
  submittedAt: 'Just now',
  logs: [
    '▶ Compiling…',
    '✔ Compilation successful',
    '▶ Running test cases…',
    '✔ Test case 1 passed',
    '✔ Test case 2 passed',
    '✔ All test cases passed',
  ],
  code: `vector<int> twoSum(vector<int>& nums, int target) {
  unordered_map<int,int> mp;
  for(int i=0;i<nums.size();i++){
    if(mp.count(target-nums[i]))
      return {mp[target-nums[i]], i};
    mp[nums[i]] = i;
  }
  return {};
}`,
};

/* ===================== COMPONENT ===================== */

export function SubmissionPage({ onBack }: any) {
  return (
    <div className="min-h-screen bg-background px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Problem
        </button>
      </div>

      {/* Verdict */}
      <section className="mb-6">
        <h1
          className={`text-3xl font-semibold ${
            result.verdict === 'AC'
              ? 'text-green-500'
              : 'text-red-500'
          }`}
        >
          {verdictLabel(result.verdict)}
        </h1>

        <div className="mt-2 text-sm text-muted-foreground">
          Runtime: {result.runtime} ms • Memory: {result.memory} MB •{' '}
          {result.language} • {result.submittedAt}
        </div>
      </section>

      {/* Console */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Terminal className="w-4 h-4" />
          Execution Log
        </div>

        <div className="bg-black text-green-400 font-mono text-sm p-4 border border-border">
          {result.logs.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
      </section>

      {/* Submitted Code */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-muted-foreground">
            Submitted Code (read-only)
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigator.clipboard.writeText(result.code)}
          >
            Copy
          </Button>
        </div>

        <pre className="bg-code-bg border border-code-border text-sm p-4 overflow-x-auto font-mono">
          {result.code}
        </pre>
      </section>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function verdictLabel(v: Verdict) {
  switch (v) {
    case 'AC':
      return 'Accepted';
    case 'WA':
      return 'Wrong Answer';
    case 'TLE':
      return 'Time Limit Exceeded';
    case 'RE':
      return 'Runtime Error';
    default:
      return 'Result';
  }
}

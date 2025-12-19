interface ExecutionResult {
  verdict?: 'AC' | 'WA' | 'TLE' | 'RE';
  runtime?: number;
  memory?: number;
  logs: string[];
}

export function SubmissionResultPage({ result }: { result: ExecutionResult }) {
  return (
    <div className="max-w-5xl mx-auto py-8 px-6">
      <h1
        className={`text-3xl font-semibold ${
          result.verdict === 'AC'
            ? 'text-green-500'
            : 'text-red-500'
        }`}
      >
        {result.verdict === 'AC' ? 'Accepted' : 'Wrong Answer'}
      </h1>

      <div className="text-sm text-muted-foreground mt-2 mb-6">
        Runtime: {result.runtime} ms • Memory: {result.memory} MB
      </div>

      <div className="bg-black text-green-400 font-mono text-sm p-4">
        {result.logs.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </div>
  );
}

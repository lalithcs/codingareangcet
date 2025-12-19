import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Badge } from '../components/Badge';

/* ===================== TYPES ===================== */

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  solved: boolean;
  attempted: boolean;
}

/* ===================== MOCK DATA ===================== */

const problems: Problem[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: true, attempted: false },
  { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', solved: false, attempted: true },
  { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', solved: false, attempted: false },
  { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', solved: false, attempted: false },
];

/* ===================== COMPONENT ===================== */

export function ProblemsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background px-6 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Problems</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Practice problems to sharpen your problem-solving skills.
        </p>
      </header>

      {/* Table */}
      <div className="border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="text-muted-foreground">
              <th className="text-left px-3 py-2 w-12">Status</th>
              <th className="text-left px-3 py-2">Title</th>
              <th className="text-left px-3 py-2 w-32">Difficulty</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((p) => (
              <tr
                key={p.id}
                onClick={() => navigate(`/problems/${p.id}`)}
                className="border-t border-border hover:bg-muted/30 cursor-pointer"
              >
                {/* Status */}
                <td className="px-3 py-2">
                  {p.solved ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : p.attempted ? (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted-foreground" />
                  )}
                </td>

                {/* Title */}
                <td className="px-3 py-2">
                  <span className="font-medium">{p.id}. {p.title}</span>
                </td>

                {/* Difficulty */}
                <td className="px-3 py-2">
                  <DifficultyBadge difficulty={p.difficulty} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===================== HELPERS ===================== */

function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  if (difficulty === 'Easy') return <Badge variant="easy">Easy</Badge>;
  if (difficulty === 'Medium') return <Badge variant="medium">Medium</Badge>;
  return <Badge variant="hard">Hard</Badge>;
}

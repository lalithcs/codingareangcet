/**
 * ======================================================
 * AdminTestCaseEditor
 * ======================================================
 * BACKEND CONTRACT:
 *
 * POST /problems/{id}/testcases
 * PATCH /problems/{id}/testcases/{tc_id}
 * DELETE /problems/{id}/testcases/{tc_id}
 * ======================================================
 */

import { useState, type ChangeEvent } from 'react';
import { Card } from './../components/Card';
import { Button } from './../components/Button';
import { Input } from './../components/Input';

interface TestCase {
  id: number;
  input: string;
  output: string;
  hidden: boolean;
}

export function AdminTestCaseEditor() {
  const [testCases, setTestCases] = useState<TestCase[]>([
    {
      id: 1,
      input: '2 7 11 15\n9',
      output: '0 1',
      hidden: false,
    },
  ]);

  const addTestCase = () => {
    setTestCases((prev) => [
      ...prev,
      {
        id: Date.now(),
        input: '',
        output: '',
        hidden: false,
      },
    ]);
  };

  const updateTestCase = (
    id: number,
    field: keyof TestCase,
    value: any
  ) => {
    setTestCases((prev) =>
      prev.map((tc) =>
        tc.id === id ? { ...tc, [field]: value } : tc
      )
    );
  };

  const removeTestCase = (id: number) => {
    setTestCases((prev) => prev.filter((tc) => tc.id !== id));
  };

  return (
    <div className="p-6 space-y-4 max-w-5xl">
      <h1 className="text-2xl">Test Case Editor</h1>

      {testCases.map((tc, index) => (
        <Card key={tc.id} className="p-4 space-y-3">
          <h3>Test Case #{index + 1}</h3>

          <Input
            label="Input"
            as="textarea"
            value={tc.input}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              updateTestCase(tc.id, 'input', e.currentTarget.value)
            }
          />

          <Input
            label="Expected Output"
            as="textarea"
            value={tc.output}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              updateTestCase(tc.id, 'output', e.currentTarget.value)
            }
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={tc.hidden}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                updateTestCase(tc.id, 'hidden', e.currentTarget.checked)
              }
            />
            Hidden Test Case
          </label>

          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeTestCase(tc.id)}
          >
            Delete Test Case
          </Button>

          {/* BACKEND:
              POST   /problems/{id}/testcases
              PATCH  /problems/{id}/testcases/{tc_id}
              DELETE /problems/{id}/testcases/{tc_id}
          */}
        </Card>
      ))}

      <Button onClick={addTestCase}>Add Test Case</Button>
    </div>
  );
}

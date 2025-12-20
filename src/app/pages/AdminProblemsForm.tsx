/**
 * ======================================================
 * AdminProblemForm
 * ======================================================
 * BACKEND:
 * POST  /problems
 * PATCH /problems/{id}
 * ======================================================
 */

import { useParams } from 'react-router-dom';
import { Input } from './../components/Input';
import { Button } from './../components/Button';
import { Card } from './../components/Card';
import { Select } from './../components/Select';

export function AdminProblemForm() {
  const { id } = useParams();

  const isEdit = Boolean(id);

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl mb-4">
        {isEdit ? 'Edit Problem' : 'Create Problem'}
      </h1>

      <Card className="p-6 space-y-4">
        <Input label="Title" placeholder="Two Sum" />

        <Select
          label="Difficulty"
          options={[
            { value: 'easy', label: 'Easy' },
            { value: 'medium', label: 'Medium' },
            { value: 'hard', label: 'Hard' },
          ]}
        />

        <Input label="Description" as="textarea" />
        <Input label="Constraints" as="textarea" />

        <Button variant="primary">
          {isEdit ? 'Update Problem' : 'Create Problem'}
        </Button>

        {/* BACKEND:
            POST /problems
            PATCH /problems/{id}
        */}
      </Card>
    </div>
  );
}

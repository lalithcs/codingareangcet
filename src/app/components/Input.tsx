import React from 'react';
import { cn } from './ui/utils';

type InputHTML = React.InputHTMLAttributes<HTMLInputElement>;
type TextareaHTML = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type SharedProps = {
  label?: string;
  as?: 'input' | 'textarea';
  // onChange can be for input or textarea — allow any ChangeEvent to avoid narrow handler mismatches
  onChange?: React.ChangeEventHandler<any>;
  className?: string;
};

// Use a union for element-specific attributes to avoid conflicts (e.g. autoComplete)
type InputProps = SharedProps & (InputHTML | TextareaHTML);

export function Input({
  label,
  as = 'input',
  className,
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      {as === 'textarea' ? (
        <textarea
          className={cn(
            'w-full rounded-md border bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]',
            className
          )}
          {...(props as TextareaHTML)}
        />
      ) : (
        <input
          className={cn(
            'w-full rounded-md border bg-input-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring',
            className
          )}
          {...(props as InputHTML)}
        />
      )}
    </div>
  );
}

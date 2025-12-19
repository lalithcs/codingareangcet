import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm text-foreground">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-2 bg-input-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-destructive">{error}</span>
      )}
    </div>
  );
}

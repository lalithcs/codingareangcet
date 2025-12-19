import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'easy' | 'medium' | 'hard' | 'success' | 'warning' | 'info' | 'secondary';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    easy: 'bg-easy/10 text-easy border border-easy/20',
    medium: 'bg-medium/10 text-medium border border-medium/20',
    hard: 'bg-hard/10 text-hard border border-hard/20',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-warning/10 text-warning border border-warning/20',
    info: 'bg-info/10 text-info border border-info/20',
    secondary: 'bg-secondary text-secondary-foreground',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

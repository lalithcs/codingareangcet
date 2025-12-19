import React from 'react';
import { cn } from './ui/utils';

/* ================= ROOT CARD ================= */

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground',
        className
      )}
      {...props}
    />
  );
}

/* ================= HEADER ================= */

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('p-6 pb-3 flex flex-col space-y-1', className)}
      {...props}
    />
  );
}

/* ================= CONTENT ================= */

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  );
}

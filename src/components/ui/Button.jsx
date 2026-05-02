import React from 'react';
import { cn } from '@/utils/cn';

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
  const variants = {
    primary: 'bg-primary text-background hover:bg-primary-hover font-semibold shadow-lg shadow-primary/20',
    secondary: 'bg-surface text-text hover:bg-surface-elevated border border-white/5',
    ghost: 'bg-transparent text-text hover:bg-white/5',
  };

  const sizes = {
    default: 'h-12 px-6 py-2',
    sm: 'h-9 px-4 text-sm',
    lg: 'h-14 px-8 text-lg',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

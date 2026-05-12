import { cn } from '@utils/cn';
import type { Variant, Size } from '@/types/common.types';

export interface BadgeProps {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  secondary: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  info: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  ghost: 'bg-transparent text-gray-600 dark:text-gray-400',
  outline: 'border border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400',
};

const dotColors: Record<Variant, string> = {
  primary: 'bg-indigo-500',
  secondary: 'bg-gray-500',
  success: 'bg-emerald-500',
  danger: 'bg-red-500',
  warning: 'bg-amber-500',
  info: 'bg-sky-500',
  ghost: 'bg-gray-400',
  outline: 'bg-gray-400',
};

const sizeStyles: Record<Size, string> = {
  xs: 'px-1.5 py-0.5 text-xs',
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1 text-sm',
  xl: 'px-3.5 py-1.5 text-sm',
};

export function Badge({
  variant = 'secondary',
  size = 'md',
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} aria-hidden="true" />
      )}
      {children}
    </span>
  );
}

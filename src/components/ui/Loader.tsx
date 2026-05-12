import { cn } from '@utils/cn';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
  label?: string;
  fullScreen?: boolean;
}

const spinnerSizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

export function Loader({
  size = 'md',
  variant = 'spinner',
  className,
  label = 'Loading...',
  fullScreen = false,
}: LoaderProps) {
  const content = (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      {variant === 'spinner' && (
        <div
          className={cn(
            'animate-spin rounded-full border-2 border-gray-200 border-t-indigo-600',
            spinnerSizes[size]
          )}
          role="status"
          aria-label={label}
        />
      )}
      {variant === 'dots' && (
        <div className="flex gap-1.5" role="status" aria-label={label}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-2 w-2 animate-bounce rounded-full bg-indigo-600"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}
      {variant === 'pulse' && (
        <div
          className={cn('animate-pulse rounded-full bg-indigo-600', spinnerSizes[size])}
          role="status"
          aria-label={label}
        />
      )}
      {label && <span className="sr-only">{label}</span>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 text-white">
        {content}
      </div>
    );
  }

  return content;
}

/** Skeleton loader for content placeholders */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200 dark:bg-gray-700', className)}
      aria-hidden="true"
    />
  );
}

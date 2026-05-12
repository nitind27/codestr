import { cn } from '@utils/cn';
import { getInitials } from '@utils/format';
import type { Size } from '@/types/common.types';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: Size;
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeStyles: Record<Size, string> = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const statusColors = {
  online: 'bg-emerald-500',
  offline: 'bg-gray-400',
  away: 'bg-amber-500',
  busy: 'bg-red-500',
};

const statusSizes: Record<Size, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-2 w-2',
  md: 'h-2.5 w-2.5',
  lg: 'h-3 w-3',
  xl: 'h-3.5 w-3.5',
};

export function Avatar({ src, name, size = 'md', className, status }: AvatarProps) {
  return (
    <div className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={cn('rounded-full object-cover', sizeStyles[size])}
        />
      ) : (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
            sizeStyles[size]
          )}
          aria-label={name}
        >
          {name ? getInitials(name) : '?'}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-800',
            statusColors[status],
            statusSizes[size]
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

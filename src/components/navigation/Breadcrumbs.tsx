import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@utils/cn';
import type { BreadcrumbItem } from '@/types/common.types';

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Home"
          >
            <Home size={14} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <ChevronRight
              size={14}
              className="text-gray-300 dark:text-gray-600"
              aria-hidden="true"
            />
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <span
                className="flex items-center gap-1 font-medium text-gray-900 dark:text-gray-100"
                aria-current="page"
              >
                {item.icon}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

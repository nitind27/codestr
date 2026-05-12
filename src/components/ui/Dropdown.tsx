import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@utils/cn';
import { useDisclosure } from '@hooks/useDisclosure';
import type { SelectOption } from '@/types/common.types';

export interface DropdownProps<T = string> {
  trigger?: React.ReactNode;
  label?: string;
  items: SelectOption<T>[];
  onSelect: (value: T) => void;
  selectedValue?: T;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Dropdown<T = string>({
  trigger,
  label,
  items,
  onSelect,
  selectedValue,
  placeholder = 'Select option',
  disabled = false,
  className,
}: DropdownProps<T>) {
  const { isOpen, toggle, close } = useDisclosure();
  const ref = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((i) => i.value === selectedValue);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [close]);

  return (
    <div ref={ref} className={cn('relative inline-block', className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
          'focus:outline-none focus:ring-2 focus:ring-indigo-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
        )}
      >
        {trigger || (
          <span className={cn(!selectedItem && 'text-gray-400')}>
            {selectedItem?.label || placeholder}
          </span>
        )}
        <ChevronDown
          size={16}
          className={cn('shrink-0 text-gray-400 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className="absolute z-20 mt-1 w-full min-w-[160px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            {items.map((item) => (
              <li
                key={String(item.value)}
                role="option"
                aria-selected={item.value === selectedValue}
                onClick={() => {
                  if (!item.disabled) {
                    onSelect(item.value);
                    close();
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition-colors',
                  'hover:bg-gray-50 dark:hover:bg-gray-700',
                  item.value === selectedValue &&
                    'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
                  item.disabled && 'cursor-not-allowed opacity-50'
                )}
              >
                {item.icon}
                {item.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

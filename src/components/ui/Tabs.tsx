import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'bordered';
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, variant = 'underline', className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      <div
        role="tablist"
        className={cn(
          'flex',
          variant === 'underline' && 'border-b border-gray-200 dark:border-gray-700',
          variant === 'pills' && 'gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800',
          variant === 'bordered' &&
            'gap-0 border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700'
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              variant === 'underline' && [
                'border-b-2 -mb-px',
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
              ],
              variant === 'pills' && [
                'rounded-md',
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400',
              ],
              variant === 'bordered' && [
                'flex-1 justify-center border-r last:border-r-0 border-gray-200 dark:border-gray-700',
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                  : 'bg-white text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
              ]
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && (
              <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400">
                {tab.badge}
              </span>
            )}
            {variant === 'underline' && activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
              />
            )}
          </button>
        ))}
      </div>

      <div id={`panel-${activeTab}`} role="tabpanel" className="mt-4">
        {activeContent}
      </div>
    </div>
  );
}

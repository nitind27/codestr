import { ChevronUp, ChevronDown, ChevronsUpDown, Search, X } from 'lucide-react';
import { cn } from '@utils/cn';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Loader, Skeleton } from '@components/ui/Loader';
import { Pagination } from '@components/ui/Pagination';
import { EmptyState } from '@components/ui/EmptyState';
import type { TableColumn, TableAction, SortDirection } from '@/types/table.types';
import type { PaginationMeta } from '@/types/api.types';

export interface DataTableProps<T extends { id: string }> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  meta?: PaginationMeta;
  onPageChange?: (page: number) => void;
  onSort?: (column: string) => void;
  sortBy?: string;
  sortOrder?: SortDirection;
  searchValue?: string;
  onSearch?: (value: string) => void;
  selectedRows?: string[];
  onRowSelect?: (id: string) => void;
  onSelectAll?: (ids: string[]) => void;
  actions?: TableAction<T>[];
  emptyTitle?: string;
  emptyDescription?: string;
  toolbar?: React.ReactNode;
}

function SortIcon({
  column,
  sortBy,
  sortOrder,
}: {
  column: string;
  sortBy?: string;
  sortOrder?: SortDirection;
}) {
  if (sortBy !== column) return <ChevronsUpDown size={14} className="text-gray-400" />;
  if (sortOrder === 'asc') return <ChevronUp size={14} className="text-indigo-600" />;
  if (sortOrder === 'desc') return <ChevronDown size={14} className="text-indigo-600" />;
  return <ChevronsUpDown size={14} className="text-gray-400" />;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading = false,
  meta,
  onPageChange,
  onSort,
  sortBy,
  sortOrder,
  searchValue = '',
  onSearch,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  actions,
  emptyTitle = 'No results found',
  emptyDescription = 'Try adjusting your search or filters.',
  toolbar,
}: DataTableProps<T>) {
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && !allSelected;

  const handleSelectAll = () => {
    if (allSelected) onSelectAll?.([]);
    else onSelectAll?.(data.map((r) => r.id));
  };

  const columnsWithActions = actions?.length
    ? [...columns, { key: '__actions__', label: 'Actions', align: 'right' as const }]
    : columns;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {onSearch && (
          <div className="relative w-full sm:max-w-xs">
            <Input
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              leftIcon={<Search size={16} />}
              rightIcon={
                searchValue ? (
                  <button onClick={() => onSearch('')} aria-label="Clear search">
                    <X size={14} />
                  </button>
                ) : undefined
              }
            />
          </div>
        )}
        {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
      </div>

      {/* Selected rows indicator */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
          <span>{selectedRows.length} row(s) selected</span>
          <button
            onClick={() => onSelectAll?.([])}
            className="ml-auto text-xs underline hover:no-underline"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/60">
              <tr>
                {onRowSelect && (
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someSelected;
                      }}
                      onChange={handleSelectAll}
                      aria-label="Select all rows"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                )}
                {columnsWithActions.map((col) => (
                  <th
                    key={String(col.key)}
                    className={cn(
                      'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400',
                      col.align === 'center' && 'text-center',
                      col.align === 'right' && 'text-right',
                      col.sortable &&
                        'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200'
                    )}
                    style={{ width: col.width }}
                    onClick={() => col.sortable && onSort?.(String(col.key))}
                  >
                    <div
                      className={cn(
                        'flex items-center gap-1',
                        col.align === 'right' && 'justify-end',
                        col.align === 'center' && 'justify-center'
                      )}
                    >
                      {col.label}
                      {col.sortable && (
                        <SortIcon column={String(col.key)} sortBy={sortBy} sortOrder={sortOrder} />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {onRowSelect && (
                      <td className="px-4 py-3">
                        <Skeleton className="h-4 w-4" />
                      </td>
                    )}
                    {columnsWithActions.map((col) => (
                      <td key={String(col.key)} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columnsWithActions.length + (onRowSelect ? 1 : 0)} className="p-0">
                    <EmptyState
                      title={emptyTitle}
                      description={emptyDescription}
                      className="rounded-none border-0"
                    />
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50',
                      selectedRows.includes(row.id) && 'bg-indigo-50/50 dark:bg-indigo-900/10'
                    )}
                  >
                    {onRowSelect && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => onRowSelect(row.id)}
                          aria-label={`Select row ${row.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className={cn(
                          'px-4 py-3 text-gray-700 dark:text-gray-300',
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {col.render
                          ? col.render(row[col.key as keyof T], row)
                          : String(row[col.key as keyof T] ?? '')}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {actions
                            .filter((a) => !a.hidden?.(row))
                            .map((action, i) => (
                              <Button
                                key={i}
                                variant={action.variant || 'ghost'}
                                size="xs"
                                onClick={() => action.onClick(row)}
                                title={action.label}
                              >
                                {action.icon}
                                <span className="sr-only">{action.label}</span>
                              </Button>
                            ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {meta && onPageChange && !isLoading && data.length > 0 && (
        <Pagination meta={meta} onPageChange={onPageChange} />
      )}

      {isLoading && (
        <div className="flex justify-center py-2">
          <Loader size="sm" />
        </div>
      )}
    </div>
  );
}

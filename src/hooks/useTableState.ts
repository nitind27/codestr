import { useState, useCallback } from 'react';
import type { TableState, SortDirection } from '@/types/table.types';
import { DEFAULT_PAGE_SIZE } from '@constants/app.constants';

export function useTableState(initialState?: Partial<TableState>) {
  const [state, setState] = useState<TableState>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    sortBy: '',
    sortOrder: null,
    search: '',
    selectedRows: [],
    ...initialState,
  });

  const setPage = useCallback((page: number) => setState((s) => ({ ...s, page })), []);
  const setLimit = useCallback((limit: number) => setState((s) => ({ ...s, limit, page: 1 })), []);
  const setSearch = useCallback(
    (search: string) => setState((s) => ({ ...s, search, page: 1 })),
    []
  );

  const setSort = useCallback((sortBy: string, sortOrder: SortDirection) => {
    setState((s) => ({ ...s, sortBy, sortOrder }));
  }, []);

  const toggleSort = useCallback((column: string) => {
    setState((s) => {
      if (s.sortBy !== column) return { ...s, sortBy: column, sortOrder: 'asc' };
      if (s.sortOrder === 'asc') return { ...s, sortOrder: 'desc' };
      return { ...s, sortBy: '', sortOrder: null };
    });
  }, []);

  const toggleRowSelection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedRows: s.selectedRows.includes(id)
        ? s.selectedRows.filter((r) => r !== id)
        : [...s.selectedRows, id],
    }));
  }, []);

  const selectAllRows = useCallback((ids: string[]) => {
    setState((s) => ({ ...s, selectedRows: ids }));
  }, []);

  const clearSelection = useCallback(() => {
    setState((s) => ({ ...s, selectedRows: [] }));
  }, []);

  return {
    state,
    setPage,
    setLimit,
    setSearch,
    setSort,
    toggleSort,
    toggleRowSelection,
    selectAllRows,
    clearSelection,
  };
}

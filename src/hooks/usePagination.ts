import { useState, useCallback } from 'react';
import { DEFAULT_PAGE_SIZE } from '@constants/app.constants';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
}

export function usePagination({
  initialPage = 1,
  initialLimit = DEFAULT_PAGE_SIZE,
}: UsePaginationOptions = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const goToPage = useCallback((newPage: number) => setPage(newPage), []);
  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  return { page, limit, goToPage, nextPage, prevPage, changeLimit, reset };
}

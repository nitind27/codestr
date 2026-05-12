import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch(initialValue = '') {
  const [searchInput, setSearchInput] = useState(initialValue);
  const debouncedSearch = useDebounce(searchInput);

  const handleSearch = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const clearSearch = useCallback(() => setSearchInput(''), []);

  return {
    searchInput,
    debouncedSearch,
    handleSearch,
    clearSearch,
  };
}

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn<T = Record<string, unknown>> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface TableState {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortDirection;
  search: string;
  selectedRows: string[];
}

export interface TableAction<T = Record<string, unknown>> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  variant?: 'primary' | 'danger' | 'secondary';
  hidden?: (row: T) => boolean;
}

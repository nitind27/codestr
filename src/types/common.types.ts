export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost'
  | 'outline';
export type ColorScheme = 'light' | 'dark' | 'system';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavItem[];
  roles?: string[];
}

export interface ToastOptions {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalRevenue: number;
  growthRate: number;
}

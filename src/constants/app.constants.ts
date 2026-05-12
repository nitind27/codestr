export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Enterprise App';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token';
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY || 'refresh_token';
export const USER_KEY = 'auth_user';

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

export const DEBOUNCE_DELAY = 300;

export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  VIEWER: 'viewer',
} as const;

export const STATUS_COLORS = {
  active: 'success',
  inactive: 'secondary',
  suspended: 'danger',
  pending: 'warning',
} as const;

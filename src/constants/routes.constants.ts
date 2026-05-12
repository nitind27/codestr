export const ROUTES = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',

  // Dashboard
  DASHBOARD: '/dashboard',

  // Users
  USERS: '/dashboard/users',
  USER_DETAILS: '/dashboard/users/:id',
  USER_CREATE: '/dashboard/users/create',

  // Profile & Settings
  PROFILE: '/dashboard/profile',
  SETTINGS: '/dashboard/settings',

  // Errors
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];

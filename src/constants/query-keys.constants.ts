export const QUERY_KEYS = {
  // Auth
  AUTH_ME: ['auth', 'me'],

  // Users
  USERS: ['users'],
  USER: (id: string) => ['users', id],

  // Dashboard
  DASHBOARD_STATS: ['dashboard', 'stats'],
  RECENT_ACTIVITY: ['dashboard', 'activity'],
} as const;

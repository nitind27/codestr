/**
 * Mock API layer for demo purposes.
 * Replace with real API calls when a backend is available.
 */
import type { AuthUser, AuthTokens } from '@/types/auth.types';

const MOCK_USER: AuthUser = {
  id: '1',
  name: 'Alice Johnson',
  email: 'admin@example.com',
  role: 'admin',
  permissions: ['users:read', 'users:write', 'users:delete', 'settings:write'],
};

const MOCK_TOKENS: AuthTokens = {
  accessToken: 'mock-access-token-xyz',
  refreshToken: 'mock-refresh-token-xyz',
  expiresIn: 3600,
};

const DEMO_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'Admin123!',
};

/** Simulates network latency */
const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAuth = {
  async login(email: string, password: string) {
    await delay();
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      return { user: MOCK_USER, tokens: MOCK_TOKENS };
    }
    throw new Error('Invalid email or password');
  },

  async register(name: string, email: string) {
    await delay();
    return {
      user: { ...MOCK_USER, name, email, id: String(Date.now()) },
      tokens: MOCK_TOKENS,
    };
  },

  async forgotPassword() {
    await delay();
    return { message: 'Reset link sent' };
  },

  async getMe() {
    await delay(200);
    return MOCK_USER;
  },
};

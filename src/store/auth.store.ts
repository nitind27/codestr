import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AuthUser, AuthTokens } from '@/types/auth.types';
import { storage } from '@utils/storage';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@constants/app.constants';

interface AuthStore {
  user: AuthUser | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  setUser: (user: AuthUser) => void;
  setTokens: (tokens: AuthTokens) => void;
  setLoading: (loading: boolean) => void;
  login: (user: AuthUser, tokens: AuthTokens) => void;
  logout: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        tokens: null,
        isAuthenticated: false,
        isLoading: false,

        setUser: (user) => set({ user }),

        setTokens: (tokens) => {
          storage.set(TOKEN_KEY, tokens.accessToken);
          storage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
          set({ tokens });
        },

        setLoading: (isLoading) => set({ isLoading }),

        login: (user, tokens) => {
          storage.set(TOKEN_KEY, tokens.accessToken);
          storage.set(REFRESH_TOKEN_KEY, tokens.refreshToken);
          storage.set(USER_KEY, user);
          set({ user, tokens, isAuthenticated: true });
        },

        logout: () => {
          storage.remove(TOKEN_KEY);
          storage.remove(REFRESH_TOKEN_KEY);
          storage.remove(USER_KEY);
          set({ user: null, tokens: null, isAuthenticated: false });
        },

        updateUser: (updates) =>
          set((state) => ({
            user: state.user ? { ...state.user, ...updates } : null,
          })),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          tokens: state.tokens,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: 'AuthStore' }
  )
);

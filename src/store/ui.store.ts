import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ColorScheme } from '@/types/common.types';

interface UIStore {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  theme: ColorScheme;

  // Actions
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebarCollapsed: () => void;
  setTheme: (theme: ColorScheme) => void;
}

export const useUIStore = create<UIStore>()(
  devtools(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      theme: 'light',

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebarCollapsed: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTheme: (theme) => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        set({ theme });
      },
    }),
    { name: 'UIStore' }
  )
);

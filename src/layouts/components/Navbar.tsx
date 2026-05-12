import { Menu, Bell, Sun, Moon, Search } from 'lucide-react';
import { useUIStore } from '@store/ui.store';
import { useAuth } from '@hooks/useAuth';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { useDisclosure } from '@hooks/useDisclosure';
import { cn } from '@utils/cn';

export function Navbar() {
  const { toggleSidebar, theme, setTheme } = useUIStore();
  const { user, logout } = useAuth();
  const { isOpen: profileOpen, toggle: toggleProfile, close: closeProfile } = useDisclosure();

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-800 md:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="hidden items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-400 dark:border-gray-700 dark:bg-gray-700 md:flex">
          <Search size={14} />
          <span>Search...</span>
          <kbd className="ml-4 rounded border border-gray-200 px-1.5 py-0.5 text-xs dark:border-gray-600">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="User menu"
            aria-expanded={profileOpen}
          >
            <Avatar src={user?.avatar} name={user?.name} size="sm" />
            <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-300 md:block">
              {user?.name}
            </span>
          </button>

          {profileOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={closeProfile} />
              <div
                className={cn(
                  'absolute right-0 top-full z-20 mt-1 w-56 rounded-xl border border-gray-200 bg-white py-1 shadow-lg',
                  'dark:border-gray-700 dark:bg-gray-800'
                )}
              >
                <div className="border-b border-gray-100 px-4 py-3 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
                <div className="py-1">
                  <a
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Settings
                  </a>
                </div>
                <div className="border-t border-gray-100 py-1 dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="w-full justify-start px-4 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

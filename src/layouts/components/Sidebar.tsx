import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  LogOut,
} from 'lucide-react';
import { cn } from '@utils/cn';
import { useUIStore } from '@store/ui.store';
import { useAuth } from '@hooks/useAuth';
import { Avatar } from '@components/ui/Avatar';
import { APP_NAME } from '@constants/app.constants';
import type { NavItem } from '@/types/common.types';

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: <Users size={18} />,
    roles: ['admin', 'manager'],
  },
  { label: 'Profile', href: '/dashboard/profile', icon: <User size={18} /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={18} /> },
];

export function Sidebar() {
  const { sidebarOpen, sidebarCollapsed, setSidebarOpen, toggleSidebarCollapsed } = useUIStore();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
          'transition-all duration-300',
          sidebarCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          {!sidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-sm font-black text-white">E</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white">{APP_NAME}</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-sm font-black text-white">E</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
          <button
            onClick={toggleSidebarCollapsed}
            className="hidden rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 lg:block"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Main navigation">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  to={item.href}
                  end={item.href === '/dashboard'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100',
                      sidebarCollapsed && 'justify-center px-2'
                    )
                  }
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!sidebarCollapsed && <span>{item.label}</span>}
                  {!sidebarCollapsed && item.badge && (
                    <span className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-3 dark:border-gray-700">
          <div className={cn('flex items-center gap-3', sidebarCollapsed && 'justify-center')}>
            <Avatar src={user?.avatar} name={user?.name} size="sm" status="online" />
            {!sidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            )}
            {!sidebarCollapsed && (
              <button
                onClick={logout}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-700"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}

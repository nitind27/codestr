import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { useUIStore } from '@store/ui.store';
import { cn } from '@utils/cn';

export function DashboardLayout() {
  const { sidebarOpen, sidebarCollapsed } = useUIStore();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-all duration-300',
          sidebarOpen && !sidebarCollapsed && 'lg:ml-64',
          sidebarOpen && sidebarCollapsed && 'lg:ml-20'
        )}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

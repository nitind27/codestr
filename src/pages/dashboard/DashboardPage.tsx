import { Users, TrendingUp, DollarSign, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { Avatar } from '@components/ui/Avatar';
import { Skeleton } from '@components/ui/Loader';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';
import { dashboardService } from '@services/dashboard.service';
import { QUERY_KEYS } from '@constants/query-keys.constants';
import { formatCurrency, formatCompactNumber, formatRelativeTime } from '@utils/format';
import { useAuth } from '@hooks/useAuth';

const statCards = [
  {
    title: 'Total Users',
    key: 'totalUsers' as const,
    icon: Users,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    format: formatCompactNumber,
    trend: '+12%',
    trendUp: true,
  },
  {
    title: 'Active Users',
    key: 'activeUsers' as const,
    icon: Activity,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    format: formatCompactNumber,
    trend: '+8%',
    trendUp: true,
  },
  {
    title: 'Total Revenue',
    key: 'totalRevenue' as const,
    icon: DollarSign,
    color: 'text-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    format: formatCurrency,
    trend: '+23%',
    trendUp: true,
  },
  {
    title: 'Growth Rate',
    key: 'growthRate' as const,
    icon: TrendingUp,
    color: 'text-sky-600',
    bg: 'bg-sky-50 dark:bg-sky-900/20',
    format: (v: number) => `${v}%`,
    trend: '+4%',
    trendUp: true,
  },
];

// Mock data for demo (replace with real API)
const mockStats = { totalUsers: 12480, activeUsers: 9320, totalRevenue: 284500, growthRate: 18.4 };
const mockActivity = [
  {
    id: '1',
    user: 'Alice Johnson',
    action: 'created a new user',
    target: 'Bob Smith',
    time: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: '2',
    user: 'Charlie Brown',
    action: 'updated settings for',
    target: 'Project Alpha',
    time: new Date(Date.now() - 20 * 60000).toISOString(),
  },
  {
    id: '3',
    user: 'Diana Prince',
    action: 'deleted record',
    target: '#4521',
    time: new Date(Date.now() - 60 * 60000).toISOString(),
  },
  {
    id: '4',
    user: 'Ethan Hunt',
    action: 'exported report',
    target: 'Q4 Summary',
    time: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    id: '5',
    user: 'Fiona Green',
    action: 'invited',
    target: 'grace@example.com',
    time: new Date(Date.now() - 5 * 3600000).toISOString(),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD_STATS,
    queryFn: () => dashboardService.getStats(),
    // Use mock data as placeholder
    placeholderData: { data: mockStats, message: 'ok', success: true, statusCode: 200 },
  });

  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: QUERY_KEYS.RECENT_ACTIVITY,
    queryFn: () => dashboardService.getRecentActivity(),
    placeholderData: { data: mockActivity, message: 'ok', success: true, statusCode: 200 },
  });

  const stats = statsData?.data || mockStats;
  const activity = activityData?.data || mockActivity;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />

      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Good morning, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {statCards.map((stat) => {
          const Icon = stat.icon;
          const value = stats[stat.key];
          return (
            <motion.div key={stat.key} variants={itemVariants}>
              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {stat.title}
                    </p>
                    {statsLoading ? (
                      <Skeleton className="mt-2 h-8 w-24" />
                    ) : (
                      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {stat.format(value)}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-1">
                      <Badge variant={stat.trendUp ? 'success' : 'danger'} size="xs" dot>
                        {stat.trend} this month
                      </Badge>
                    </div>
                  </div>
                  <div className={`rounded-xl p-3 ${stat.bg}`}>
                    <Icon size={22} className={stat.color} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader
              title="Recent Activity"
              description="Latest actions across your platform"
              action={
                <Badge variant="secondary" size="sm">
                  Live
                </Badge>
              }
            />
            <div className="mt-4 space-y-4">
              {activityLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="flex-1 space-y-1.5">
                        <Skeleton className="h-3.5 w-3/4" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                    </div>
                  ))
                : activity.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <Avatar name={item.user} size="sm" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{item.user}</span> {item.action}{' '}
                          <span className="font-medium text-indigo-600 dark:text-indigo-400">
                            {item.target}
                          </span>
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          {formatRelativeTime(item.time)}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </Card>
        </div>

        {/* Quick stats sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader title="Platform Health" />
            <div className="mt-4 space-y-3">
              {[
                { label: 'API Uptime', value: '99.9%', color: 'bg-emerald-500', width: '99%' },
                { label: 'Response Time', value: '142ms', color: 'bg-indigo-500', width: '85%' },
                { label: 'Error Rate', value: '0.1%', color: 'bg-amber-500', width: '5%' },
                { label: 'Cache Hit Rate', value: '94%', color: 'bg-sky-500', width: '94%' },
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">{metric.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {metric.value}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: metric.width }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full ${metric.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="User Roles" />
            <div className="mt-4 space-y-2">
              {[
                { role: 'Admin', count: 12, color: 'bg-indigo-500' },
                { role: 'Manager', count: 48, color: 'bg-sky-500' },
                { role: 'User', count: 1240, color: 'bg-emerald-500' },
                { role: 'Viewer', count: 380, color: 'bg-amber-500' },
              ].map((r) => (
                <div key={r.role} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${r.color}`} />
                    <span className="text-gray-600 dark:text-gray-400">{r.role}</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {formatCompactNumber(r.count)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

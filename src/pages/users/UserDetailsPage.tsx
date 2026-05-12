import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Mail, Phone, Building2, Calendar } from 'lucide-react';
import { Card, CardHeader } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { Skeleton } from '@components/ui/Loader';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';
import { Tabs } from '@components/ui/Tabs';
import { userService } from '@services/user.service';
import { QUERY_KEYS } from '@constants/query-keys.constants';
import { formatDate } from '@utils/format';
import type { Variant } from '@/types/common.types';

const statusVariant: Record<string, Variant> = {
  active: 'success',
  inactive: 'secondary',
  suspended: 'danger',
  pending: 'warning',
};

// Mock user for demo
const mockUser = {
  id: '1',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'admin' as const,
  status: 'active' as const,
  department: 'Engineering',
  phone: '+1 555-0100',
  createdAt: new Date(Date.now() - 90 * 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.USER(id!),
    queryFn: () => userService.getUserById(id!),
    enabled: !!id,
    placeholderData: { data: mockUser, message: 'ok', success: true, statusCode: 200 },
  });

  const user = data?.data || mockUser;

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { icon: Mail, label: 'Email', value: user.email },
            { icon: Phone, label: 'Phone', value: user.phone || 'Not provided' },
            { icon: Building2, label: 'Department', value: user.department || 'Not assigned' },
            { icon: Calendar, label: 'Joined', value: formatDate(user.createdAt) },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <Icon size={16} className="text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{value}</p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'activity',
      label: 'Activity',
      content: (
        <div className="space-y-3">
          {['Logged in', 'Updated profile', 'Changed password', 'Invited a team member'].map(
            (action, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="h-2 w-2 rounded-full bg-indigo-500" />
                <span className="text-gray-700 dark:text-gray-300">{action}</span>
                <span className="ml-auto text-gray-400">{i + 1}d ago</span>
              </div>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Users', href: '/dashboard/users' },
          { label: isLoading ? '...' : user.name },
        ]}
      />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        leftIcon={<ArrowLeft size={16} />}
      >
        Back to Users
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            {isLoading ? (
              <>
                <Skeleton className="h-20 w-20 rounded-full" />
                <Skeleton className="mt-3 h-5 w-32" />
                <Skeleton className="mt-1 h-4 w-40" />
              </>
            ) : (
              <>
                <Avatar name={user.name} size="xl" status="online" />
                <h2 className="mt-3 text-lg font-bold text-gray-900 dark:text-gray-100">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                <div className="mt-3 flex gap-2">
                  <Badge variant="primary" size="sm">
                    {user.role}
                  </Badge>
                  <Badge variant={statusVariant[user.status]} size="sm" dot>
                    {user.status}
                  </Badge>
                </div>
              </>
            )}
          </div>
          <div className="mt-6 flex gap-2">
            <Button variant="outline" size="sm" fullWidth>
              Message
            </Button>
            <Button size="sm" fullWidth>
              Edit
            </Button>
          </div>
        </Card>

        {/* Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="User Details" />
            <div className="mt-4">
              <Tabs tabs={tabs} variant="underline" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

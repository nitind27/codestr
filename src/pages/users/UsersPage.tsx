import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, Pencil, Trash2, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { DataTable } from '@components/table/DataTable';
import { Badge } from '@components/ui/Badge';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';
import { userService } from '@services/user.service';
import { QUERY_KEYS } from '@constants/query-keys.constants';
import { useTableState } from '@hooks/useTableState';
import { useDebounce } from '@hooks/useDebounce';
import { useDisclosure } from '@hooks/useDisclosure';
import { formatDate } from '@utils/format';
import type { User } from '@/types/user.types';
import type { TableColumn, TableAction } from '@/types/table.types';
import type { Variant } from '@/types/common.types';

const statusVariant: Record<string, Variant> = {
  active: 'success',
  inactive: 'secondary',
  suspended: 'danger',
  pending: 'warning',
};

// Mock data for demo
const mockUsers: User[] = Array.from({ length: 25 }, (_, i) => ({
  id: String(i + 1),
  name: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt'][i % 5],
  email: `user${i + 1}@example.com`,
  role: (['admin', 'manager', 'user', 'viewer'] as const)[i % 4],
  status: (['active', 'inactive', 'suspended', 'pending'] as const)[i % 4],
  department: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'][i % 5],
  createdAt: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updatedAt: new Date().toISOString(),
}));

export default function UsersPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { state, setPage, setSearch, toggleSort, toggleRowSelection, selectAllRows } =
    useTableState();
  const debouncedSearch = useDebounce(state.search);
  const { isOpen: deleteOpen, open: openDelete, close: closeDelete } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [
      ...QUERY_KEYS.USERS,
      state.page,
      state.limit,
      debouncedSearch,
      state.sortBy,
      state.sortOrder,
    ],
    queryFn: () =>
      userService.getUsers({
        page: state.page,
        limit: state.limit,
        search: debouncedSearch,
        sortBy: state.sortBy,
        sortOrder: state.sortOrder || undefined,
      }),
    // Use mock data as placeholder
    placeholderData: {
      data: mockUsers.slice((state.page - 1) * state.limit, state.page * state.limit),
      meta: {
        total: mockUsers.length,
        page: state.page,
        limit: state.limit,
        totalPages: Math.ceil(mockUsers.length / state.limit),
        hasNextPage: state.page < Math.ceil(mockUsers.length / state.limit),
        hasPrevPage: state.page > 1,
      },
      message: 'ok',
      success: true,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userService.deleteUser(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS });
      closeDelete();
    },
    onError: () => toast.error('Failed to delete user'),
  });

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      label: 'Usernitin',
      sortable: true,
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
      render: (value) => (
        <Badge variant="primary" size="sm">
          {String(value)}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value) => (
        <Badge variant={statusVariant[String(value)] || 'secondary'} size="sm" dot>
          {String(value)}
        </Badge>
      ),
    },
    {
      key: 'department',
      label: 'Department',
      render: (value) => (
        <span className="text-gray-600 dark:text-gray-400">{String(value || '—')}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      sortable: true,
      render: (value) => <span className="text-gray-500">{formatDate(String(value))}</span>,
    },
  ];

  const actions: TableAction<User>[] = [
    {
      label: 'View',
      icon: <Eye size={14} />,
      onClick: (row) => navigate(`/dashboard/users/${row.id}`),
    },
    {
      label: 'Edit',
      icon: <Pencil size={14} />,
      onClick: (row) => navigate(`/dashboard/users/${row.id}`),
    },
    {
      label: 'Delete',
      icon: <Trash2 size={14} />,
      variant: 'danger',
      onClick: (row) => {
        setSelectedUser(row);
        openDelete();
      },
    },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Users' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Users</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your team members and their roles
          </p>
        </div>
        <Button
          leftIcon={<UserPlus size={16} />}
          onClick={() => navigate('/dashboard/users/create')}
        >
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
        meta={data?.meta}
        onPageChange={setPage}
        onSort={toggleSort}
        sortBy={state.sortBy}
        sortOrder={state.sortOrder}
        searchValue={state.search}
        onSearch={setSearch}
        selectedRows={state.selectedRows}
        onRowSelect={toggleRowSelection}
        onSelectAll={selectAllRows}
        actions={actions}
        emptyTitle="No users found"
        emptyDescription="Try adjusting your search or add a new user."
      />

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteOpen}
        onClose={closeDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.name}? This action cannot be undone.`}
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={closeDelete}>
              Cancel
            </Button>
            <Button
              variant="danger"
              isLoading={deleteMutation.isPending}
              onClick={() => selectedUser && deleteMutation.mutate(selectedUser.id)}
            >
              Delete
            </Button>
          </>
        }
      >
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <Avatar name={selectedUser?.name} size="md" />
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">{selectedUser?.name}</p>
            <p className="text-sm text-gray-500">{selectedUser?.email}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

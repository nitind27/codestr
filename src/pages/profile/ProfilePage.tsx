import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera } from 'lucide-react';
import { Card, CardHeader, CardDivider } from '@components/ui/Card';
import { Avatar } from '@components/ui/Avatar';
import { Button } from '@components/ui/Button';
import { FormInput } from '@components/form/FormField';
import { Badge } from '@components/ui/Badge';
import { Breadcrumbs } from '@components/navigation/Breadcrumbs';
import { useAuth } from '@hooks/useAuth';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  department: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = (_data: ProfileFormData) => {
    // In a real app, call updateUser mutation
    toast.success('Profile updated successfully');
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Profile' }]} />

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Profile</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avatar card */}
        <Card className="flex flex-col items-center text-center">
          <div className="relative">
            <Avatar name={user?.name} src={user?.avatar} size="xl" />
            <button
              className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
              aria-label="Change avatar"
            >
              <Camera size={14} />
            </button>
          </div>
          <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-2">
            <Badge variant="primary" size="sm">
              {user?.role}
            </Badge>
          </div>
        </Card>

        {/* Profile form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Personal Information" description="Update your profile details" />
            <CardDivider />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormInput
                  label="Full name"
                  registration={register('name')}
                  error={errors.name}
                  isRequired
                />
                <FormInput
                  label="Email address"
                  type="email"
                  registration={register('email')}
                  error={errors.email}
                  isRequired
                />
                <FormInput
                  label="Phone number"
                  type="tel"
                  registration={register('phone')}
                  error={errors.phone}
                  placeholder="+1 555-0100"
                />
                <FormInput
                  label="Department"
                  registration={register('department')}
                  error={errors.department}
                  placeholder="Engineering"
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" disabled={!isDirty}>
                  Save changes
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

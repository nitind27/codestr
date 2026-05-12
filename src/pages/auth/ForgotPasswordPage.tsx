import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@validations/auth.schema';
import { mockAuth } from '@api/mock';
import { Button } from '@components/ui/Button';
import { FormInput } from '@components/form/FormField';
import { ROUTES } from '@constants/routes.constants';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (_data: ForgotPasswordFormData) => mockAuth.forgotPassword(),
    onSuccess: () => {
      toast.success('Reset link sent! Check your email.');
      reset();
    },
    onError: () => toast.error('Failed to send reset link. Please try again.'),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {isSuccess ? (
        <div className="rounded-xl bg-emerald-50 p-6 text-center dark:bg-emerald-900/20">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
            <Mail size={24} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="font-semibold text-emerald-800 dark:text-emerald-300">Check your email</h3>
          <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
            We've sent a password reset link to your email address.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-5" noValidate>
          <FormInput
            label="Email address"
            type="email"
            placeholder="you@example.com"
            registration={register('email')}
            error={errors.email}
            leftIcon={<Mail size={16} />}
            isRequired
          />
          <Button type="submit" fullWidth isLoading={isPending} size="lg">
            Send reset link
          </Button>
        </form>
      )}

      <div className="mt-6 text-center">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </motion.div>
  );
}

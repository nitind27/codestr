import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { loginSchema, type LoginFormData } from '@validations/auth.schema';
import { useAuth } from '@hooks/useAuth';
import { Button } from '@components/ui/Button';
import { FormInput } from '@components/form/FormField';
import { ROUTES } from '@constants/routes.constants';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoginLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          registration={register('email')}
          error={errors.email}
          leftIcon={<Mail size={16} />}
          isRequired
          autoComplete="email"
        />

        <FormInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          registration={register('password')}
          error={errors.password}
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          isRequired
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <input
              type="checkbox"
              {...register('rememberMe')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            Remember me
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isLoginLoading} size="lg">
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Create one
        </Link>
      </p>

      {/* Demo credentials hint */}
      <div className="mt-6 rounded-lg bg-indigo-50 p-4 text-xs text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
        <p className="font-semibold">Demo credentials</p>
        <p>Email: admin@example.com</p>
        <p>Password: Admin123!</p>
      </div>
    </motion.div>
  );
}

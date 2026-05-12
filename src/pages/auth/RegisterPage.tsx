import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { registerSchema, type RegisterFormData } from '@validations/auth.schema';
import { useAuth } from '@hooks/useAuth';
import { Button } from '@components/ui/Button';
import { FormInput } from '@components/form/FormField';
import { ROUTES } from '@constants/routes.constants';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isRegisterLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => registerUser(data);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an account</h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Get started with your free account today
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormInput
          label="Full name"
          type="text"
          placeholder="John Doe"
          registration={register('name')}
          error={errors.name}
          leftIcon={<User size={16} />}
          isRequired
          autoComplete="name"
        />

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
          placeholder="Min. 8 characters"
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
          hint="Must be 8+ chars with uppercase and number"
        />

        <FormInput
          label="Confirm password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Repeat your password"
          registration={register('confirmPassword')}
          error={errors.confirmPassword}
          leftIcon={<Lock size={16} />}
          isRequired
        />

        <Button type="submit" fullWidth isLoading={isRegisterLoading} size="lg">
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          Sign in
        </Link>
      </p>
    </motion.div>
  );
}

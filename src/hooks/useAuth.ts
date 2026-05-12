import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '@store/auth.store';
import { mockAuth } from '@api/mock';
import { ROUTES } from '@constants/routes.constants';
import type { LoginCredentials, RegisterCredentials } from '@/types/auth.types';

export function useAuth() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, login, logout: storeLogout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      mockAuth.login(credentials.email, credentials.password),
    onSuccess: (data) => {
      login(data.user, data.tokens);
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterCredentials) => mockAuth.register(payload.name, payload.email),
    onSuccess: (data) => {
      login(data.user, data.tokens);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });

  const logoutFn = useCallback(() => {
    storeLogout();
    navigate(ROUTES.LOGIN);
    toast.success('Logged out successfully');
  }, [storeLogout, navigate]);

  const hasRole = useCallback(
    (roles: string | string[]) => {
      if (!user) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(user.role);
    },
    [user]
  );

  const hasPermission = useCallback(
    (permission: string) => {
      if (!user) return false;
      return user.permissions.includes(permission);
    },
    [user]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    logout: logoutFn,
    hasRole,
    hasPermission,
  };
}

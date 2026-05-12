import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import { ROUTES } from '@constants/routes.constants';
import { Loader } from '@components/ui/Loader';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

/**
 * Guards routes that require authentication.
 * Optionally restricts access by role.
 */
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  if (isLoading) return <Loader fullScreen />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }

  return <Outlet />;
}

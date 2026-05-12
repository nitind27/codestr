import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/auth.store';
import { ROUTES } from '@constants/routes.constants';

/**
 * Redirects authenticated users away from public-only pages (login, register).
 */
export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
}

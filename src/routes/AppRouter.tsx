import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthLayout } from '@layouts/AuthLayout';
import { DashboardLayout } from '@layouts/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { ErrorBoundary } from './ErrorBoundary';
import { Loader } from '@components/ui/Loader';

// Lazy-loaded pages
const LoginPage = lazy(() => import('@pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('@pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('@pages/auth/ForgotPasswordPage'));
const DashboardPage = lazy(() => import('@pages/dashboard/DashboardPage'));
const UsersPage = lazy(() => import('@pages/users/UsersPage'));
const UserDetailsPage = lazy(() => import('@pages/users/UserDetailsPage'));
const ProfilePage = lazy(() => import('@pages/profile/ProfilePage'));
const SettingsPage = lazy(() => import('@pages/settings/SettingsPage'));
const NotFoundPage = lazy(() => import('@pages/errors/NotFoundPage'));
const UnauthorizedPage = lazy(() => import('@pages/errors/UnauthorizedPage'));

const PageLoader = () => <Loader fullScreen />;

const router = createBrowserRouter([
  // Redirect root to dashboard
  { path: '/', element: <Navigate to="/dashboard" replace /> },

  // Auth routes (public only)
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/login',
            element: (
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            ),
          },
          {
            path: '/auth/register',
            element: (
              <Suspense fallback={<PageLoader />}>
                <RegisterPage />
              </Suspense>
            ),
          },
          {
            path: '/auth/forgot-password',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ForgotPasswordPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Protected dashboard routes
  {
    element: <ProtectedRoute />,
    errorElement: (
      <ErrorBoundary>
        <NotFoundPage />
      </ErrorBoundary>
    ),
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: (
              <Suspense fallback={<PageLoader />}>
                <DashboardPage />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/users',
            element: (
              <Suspense fallback={<PageLoader />}>
                <UsersPage />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/users/:id',
            element: (
              <Suspense fallback={<PageLoader />}>
                <UserDetailsPage />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/profile',
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProfilePage />
              </Suspense>
            ),
          },
          {
            path: '/dashboard/settings',
            element: (
              <Suspense fallback={<PageLoader />}>
                <SettingsPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },

  // Error pages
  {
    path: '/401',
    element: (
      <Suspense fallback={<PageLoader />}>
        <UnauthorizedPage />
      </Suspense>
    ),
  },
  {
    path: '/404',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  { path: '*', element: <Navigate to="/404" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

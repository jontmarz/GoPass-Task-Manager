import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '@/components/layout/AuthLayout';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: (
          <AppLayout>
            <DashboardPage />
          </AppLayout>
        ),
      },
      {
        path: '/projects/:id',
        element: (
          <AppLayout>
            <ProjectDetailPage />
          </AppLayout>
        ),
      },
    ],
  },
]);

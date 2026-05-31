import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  // Podríamos añadir una pantalla de carga aquí mientras se verifica el token

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
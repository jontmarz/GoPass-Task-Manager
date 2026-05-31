import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginRequest, registerRequest, profileRequest } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/features/auth/schemas/auth.schema';

export const useAuth = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => loginRequest(data),
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // Aquí se podría mostrar una notificación de error al usuario
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormValues) => registerRequest(data),
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const logoutAction = () => {
    logout();
    queryClient.clear(); // Limpia la caché de react-query
    navigate('/login');
  };

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isPending,
    logout: logoutAction,
  };
};
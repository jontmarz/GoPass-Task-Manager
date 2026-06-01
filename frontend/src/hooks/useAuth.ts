import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginRequest, registerRequest } from '@/api/auth.api';
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
    onError: (error: any) => {
      console.error('Login failed:', error);
      if (error?.response?.status === 404) {
        alert('El usuario no existe');
        navigate('/signup');
      } else {
        alert('Error al iniciar sesión');
      }
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
import { api } from './axios';
import {
  LoginFormValues,
  RegisterFormValues,
} from '@/features/auth/schemas/auth.schema';
import { AuthResponse, User } from '@/types';

export const loginRequest = async (data: LoginFormValues) => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const registerRequest = async (data: RegisterFormValues) => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const profileRequest = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};
import { api } from './axios';
import { Task, TaskStatus } from '@/types';
import {
  TaskFormInputs,
  TaskFormValues,
} from '@/features/tasks/schemas/task.schema';

export const createTaskRequest = async (
  data: TaskFormValues,
): Promise<Task> => {
  const response = await api.post('/tasks', data);
  return response.data;
};

export const updateTaskStatusRequest = async (
  taskId: string,
  status: TaskStatus,
): Promise<Task> => {
  const response = await api.patch(`/tasks/${taskId}`, { status });
  return response.data;
};

export const updateTaskRequest = async (
  taskId: string,
  data: TaskFormInputs,
): Promise<Task> => {
  const response = await api.patch(`/tasks/${taskId}`, data);
  return response.data;
};
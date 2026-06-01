import { api } from './axios';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { TaskFormInputs } from '@/features/tasks/schemas/task.schema';

// Se unifica el payload para la creación de tareas.
// Usado tanto por el formulario manual como por las sugerencias de IA.
export interface CreateTaskPayload {
  title: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  projectId: string;
}

/**
 * Llama al endpoint del backend para crear una nueva tarea.
 * Esta función unificada reemplaza a la anterior `createTaskRequest`.
 */
export const createTask = async (task: CreateTaskPayload): Promise<Task> => {
  const { data } = await api.post<Task>('/tasks', task);
  return data;
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
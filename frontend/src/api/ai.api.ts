import { TaskPriority } from '@/types';
import { api } from './axios';

// Este tipo representa una tarea sugerida por la IA.
// Coincide con la estructura que devuelve el backend.
export interface SuggestedTask {
  title: string;
  description: string;
  priority: TaskPriority;
  status: 'PENDING';
}

export const suggestTasks = async (projectId: string): Promise<SuggestedTask[]> => {
  const { data } = await api.post<SuggestedTask[]>(`/projects/${projectId}/suggest-tasks`);
  return data;
};

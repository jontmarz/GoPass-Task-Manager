import { api } from './axios';
import { Project } from '@/types';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProjectRequest = async (
  data: ProjectFormValues,
): Promise<Project> => {
  const response = await api.post('/projects', data);
  return response.data;
};

export const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};
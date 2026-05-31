import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProjectsRequest,
  createProjectRequest,
  getProjectByIdRequest,
} from '@/api/projects.api';
import { ProjectFormValues } from '@/features/projects/schemas/project.schema';

export const useProjects = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjectsRequest,
    retry: 1,
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: ProjectFormValues) => createProjectRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Project creation failed:', error);
      // Aquí se podría mostrar una notificación de error al usuario
    },
  });

  return {
    projects: data,
    isLoading,
    isError,
    error,
    createProject: createProjectMutation.mutate,
    isCreatingProject: createProjectMutation.isPending,
  };
};

export const useProject = (id: string) => {
  const {
    data: project,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['project', id],
    queryFn: () => getProjectByIdRequest(id),
    retry: 1,
    enabled: !!id, // Only run the query if the id is available
  });

  return { project, isLoading, isError, error };
};
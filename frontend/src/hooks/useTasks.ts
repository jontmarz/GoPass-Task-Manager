import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTaskRequest,
  updateTaskStatusRequest,
  updateTaskRequest,
} from '@/api/tasks.api';
import {
  TaskFormInputs,
  TaskFormValues,
} from '@/features/tasks/schemas/task.schema';
import { Project, TaskStatus } from '@/types';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation({
    mutationFn: (data: TaskFormValues) => createTaskRequest(data),
    onSuccess: (newTask) => {
      // Invalidate the specific project query to refetch its tasks
      queryClient.invalidateQueries({ queryKey: ['project', newTask.projectId] });
    },
    onError: (error) => {
      console.error('Task creation failed:', error);
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, data }: { taskId: string; data: TaskFormInputs }) =>
      updateTaskRequest(taskId, data),
    onSuccess: (updatedTask) => {
      // Invalidate both the project and the main projects list (for task counts)
      queryClient.invalidateQueries({ queryKey: ['project', updatedTask.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Task update failed:', error);
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      updateTaskStatusRequest(taskId, status),
    onMutate: async ({
      taskId,
      status,
      projectId,
    }: {
      taskId: string;
      status: TaskStatus;
      projectId: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: ['project', projectId] });
      const previousProject = queryClient.getQueryData<Project>(['project', projectId]);

      if (previousProject) {
        queryClient.setQueryData<Project>(['project', projectId], {
          ...previousProject,
          tasks: previousProject.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task,
          ),
        });
      }
      return { previousProject };
    },
    onError: (err, variables, context) => {
      if (context?.previousProject) {
        queryClient.setQueryData(['project', context.previousProject.id], context.previousProject);
      }
    },
    onSettled: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['project', data.projectId] });
      }
    },
  });

  return {
    createTask: createTaskMutation.mutate,
    isCreatingTask: createTaskMutation.isPending,
    updateTaskStatus: updateTaskStatusMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    isUpdatingTask: updateTaskMutation.isPending,
  };
};
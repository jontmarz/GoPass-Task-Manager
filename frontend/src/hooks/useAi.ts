import { useMutation } from '@tanstack/react-query';
import * as aiApi from '@/api/ai.api';

/**
 * Hook para solicitar sugerencias de tareas a la IA para un proyecto específico.
 */
export const useSuggestTasks = () => {
  const mutation = useMutation({
    mutationFn: aiApi.suggestTasks,
  });

  return mutation;
};

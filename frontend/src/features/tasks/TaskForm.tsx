import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  taskFormSchema,
  TaskFormInputs,
} from './schemas/task.schema';
import { useTasks } from '@/hooks/useTasks';
import { useUiStore } from '@/store/uiStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface TaskFormProps {
  projectId: string;
}

export default function TaskForm({ projectId }: TaskFormProps) {
  const { createTask, isCreatingTask, updateTask, isUpdatingTask } = useTasks();
  const { closeTaskModal, editingTask } = useUiStore((state) => ({
    closeTaskModal: state.closeTaskModal,
    editingTask: state.editingTask,
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskFormSchema),
  });

  useEffect(() => {
    if (editingTask) {
      const formattedDueDate = editingTask.dueDate
        ? new Date(editingTask.dueDate).toISOString().split('T')[0]
        : '';
      reset({
        title: editingTask.title,
        description: editingTask.description || '',
        priority: editingTask.priority,
        dueDate: formattedDueDate,
      });
    } else {
      // Reset to default values for creating a new task
      reset({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
    }
  }, [editingTask, reset]);

  const onSubmit = (data: TaskFormInputs) => {
    const apiData = { ...data };
    if (apiData.dueDate) {
      apiData.dueDate = new Date(`${apiData.dueDate}T00:00:00Z`).toISOString();
    } else {
      apiData.dueDate = null;
    }

    if (editingTask) {
      updateTask(
        { taskId: editingTask.id, data: apiData },
        { onSuccess: closeTaskModal },
      );
    } else {
      createTask({ ...apiData, projectId }, { onSuccess: closeTaskModal });
    }
  };

  const isSubmitting = isCreatingTask || isUpdatingTask;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título de la Tarea</Label>
        <Input
          id="title"
          type="text"
          placeholder="Ej: Investigar sobre..."
          {...register('title')}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Añade más detalles sobre la tarea..."
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridad</Label>
          <select
            id="priority"
            {...register('priority')}
            className="w-full p-2 border rounded-md bg-white"
            defaultValue="MEDIUM"
          >
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Fecha Límite (Opcional)</Label>
          <Input id="dueDate" type="date" {...register('dueDate')} />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={closeTaskModal}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? editingTask ? 'Guardando...' : 'Creando...'
            : editingTask ? 'Guardar Cambios' : 'Crear Tarea'}
        </Button>
      </div>
    </form>
  );
}
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, ProjectFormValues } from './schemas/project.schema';
import { useProjects } from '@/hooks/useProjects';
import { useUiStore } from '@/store/uiStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProjectForm() {
  const { createProject, isCreatingProject } = useProjects();
  const closeProjectModal = useUiStore((state) => state.closeProjectModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: ProjectFormValues) => {
    createProject(data, {
      onSuccess: () => {
        closeProjectModal();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre del Proyecto</Label>
        <Input
          id="name"
          type="text"
          placeholder="Ej: Diseño de la nueva App"
          {...register('name')}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción (Opcional)</Label>
        <Textarea
          id="description"
          placeholder="Describe de qué trata tu proyecto..."
          {...register('description')}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={closeProjectModal}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isCreatingProject}>
          {isCreatingProject ? 'Creando...' : 'Crear Proyecto'}
        </Button>
      </div>
    </form>
  );
}
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProjectById } from '@/api/projects.api';
import { useSuggestTasks } from '@/hooks/useAi'; // Asegúrate que este archivo exista en frontend/src/hooks/useAi.ts
import { useTasks } from '@/hooks/useTasks';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { SuggestedTask } from '@/api/ai.api';
import { Loader2, Wand2 } from 'lucide-react';
import TaskList from '@/features/tasks/TaskList';
import { useUiStore } from '@/store/uiStore';
import Modal from '@/components/ui/Modal';
import TaskForm from '@/features/tasks/TaskForm';
import { ArrowLeftIcon } from '@/components/ui/ArrowLeftIcon';
import { Checkbox } from '@/components/ui/checkbox';

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const projectId = id!;

  // Hook para el modal de "Añadir/Editar Tarea"
  const { isTaskModalOpen, openTaskModal, closeTaskModal, editingTask } =
    useUiStore();

  // 1. Hook para obtener los datos del proyecto
  const {
    data: project,
    isLoading: isProjectLoading,
    isError,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId),
  });

  // 2. Estado para el modal y las sugerencias
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [suggestedTasks, setSuggestedTasks] = useState<SuggestedTask[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<SuggestedTask[]>([]);

  // 3. Hooks de mutación para la IA y para crear tareas
  const suggestTasksMutation = useSuggestTasks();
  const { createTaskMutation } = useTasks();

  // 4. Función para manejar la solicitud de sugerencias
  const handleSuggestTasks = () => {
    suggestTasksMutation.mutate(projectId, {
      onSuccess: (data) => {
        if (data && data.length > 0) {
          setSuggestedTasks(data);
          setSelectedTasks(data); // Pre-seleccionar todas las tareas
          setIsAiModalOpen(true);
          toast.success('¡Sugerencias de IA generadas con éxito!');
        } else {
          toast.info('La IA no pudo generar sugerencias para este proyecto.');
        }
      },
      onError: (error) => {
        // Notificación clara al usuario en caso de fallo del agente
        toast.error('Error al generar sugerencias', {
          description:
            'El asistente virtual no pudo procesar la solicitud. Por favor, inténtalo de nuevo más tarde.',
        });
        console.error('AI Suggestion Error:', error);
      },
    });
  };

  // 5. Función para añadir las tareas seleccionadas por el usuario
  const handleAddTasks = async (tasksToAdd: SuggestedTask[]) => {
    const creationPromises = tasksToAdd.map((task) => createTaskMutation.mutateAsync({ ...task, projectId }));

    try {
      await Promise.all(creationPromises);
      toast.success(`${tasksToAdd.length} tarea(s) añadidas correctamente.`);
      setIsAiModalOpen(false);
    } catch (error) {
      toast.error('Error al añadir una o más tareas.');
      console.error('Task Creation Error:', error);
    }
  };

  // 6. Handler para los checkboxes de las tareas sugeridas
  const handleCheckboxChange = (task: SuggestedTask, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task]);
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.title !== task.title));
    }
  };

  if (isProjectLoading) return <div className="text-center mt-10">Cargando proyecto...</div>;
  if (isError) return <div className="text-center mt-10 text-red-500">Error al cargar el proyecto.</div>;
  if (!project) return <div className="text-center mt-10">Proyecto no encontrado.</div>;

  return (
    <div className="p-4 md:p-8">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Volver al Dashboard
      </Link>
      <header className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{project.name}</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">{project.description}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={() => openTaskModal()}>Añadir Tarea</Button>
          <Button
            onClick={handleSuggestTasks}
            disabled={suggestTasksMutation.isPending}
            variant="outline"
          >
            {suggestTasksMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Sugerir tareas
          </Button>
        </div>
      </header>

      {project.tasks && project.tasks.length > 0 ? (
        <TaskList tasks={project.tasks} projectId={projectId} />
      ) : (
        <div className="mt-12 flex flex-col items-center text-center p-10 bg-white rounded-lg shadow-sm border-2 border-dashed">
          <h2 className="text-2xl font-semibold text-gray-700">
            Este proyecto no tiene tareas
          </h2>
          <p className="mt-2 text-gray-500 max-w-md">
            ¡Empieza a organizar tu trabajo! Crea tu primera tarea o pide sugerencias a la IA.
          </p>
          <Button className="mt-6" onClick={() => openTaskModal()}>
            Crear primera tarea
          </Button>
        </div>
      )}

      {/* Modal para sugerencias de IA */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="Sugerencias de Tareas con IA ✨"
        className="sm:max-w-[625px]"
      >
        <div>
          <p className="text-sm text-gray-500 mb-4">
            La IA ha generado las siguientes tareas para tu proyecto. Selecciona las que quieras añadir.
          </p>
          <div className="grid gap-4 py-4 max-h-[50vh] overflow-y-auto pr-2">
            {suggestedTasks.map((task, index) => (
              <div key={index} className="flex items-start p-4 space-x-4 border rounded-md">
                <Checkbox
                  id={`task-${index}`}
                  checked={selectedTasks.some((t) => t.title === task.title)}
                  onCheckedChange={(checked: boolean | 'indeterminate') => handleCheckboxChange(task, !!checked)}
                  className="mt-1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor={`task-${index}`} className="text-sm font-medium">
                    {task.title}
                  </label>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-xs text-muted-foreground">Prioridad: {task.priority}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsAiModalOpen(false)}
              disabled={createTaskMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleAddTasks(selectedTasks)}
              disabled={createTaskMutation.isPending || selectedTasks.length === 0}
            >
              {createTaskMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {createTaskMutation.isPending ? 'Añadiendo...' : `Añadir ${selectedTasks.length} tareas`}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal para añadir/editar tareas manualmente */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        title={editingTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      >
        <TaskForm projectId={projectId} />
      </Modal>
    </div>
  );
}
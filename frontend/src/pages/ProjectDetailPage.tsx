import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { ArrowLeftIcon } from '@/components/ui/ArrowLeftIcon';
import TaskForm from '@/features/tasks/TaskForm';
import TaskList from '@/features/tasks/TaskList';
import { useProject } from '@/hooks/useProjects';
import { useUiStore } from '@/store/uiStore';
import { Link, useParams } from 'react-router-dom';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isTaskModalOpen, openTaskModal, closeTaskModal, editingTask } =
    useUiStore();

  if (!id) {
    return <p>ID de proyecto no válido.</p>;
  }

  const { project, isLoading, isError } = useProject(id);

  if (isLoading) return <p className="text-center mt-10">Cargando proyecto...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        Error al cargar el proyecto.
      </p>
    );
  if (!project)
    return <p className="text-center mt-10">Proyecto no encontrado.</p>;

  return (
    <div>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Volver al Dashboard
      </Link>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">{project.name}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">{project.description}</p>
        </div>
        <Button onClick={() => openTaskModal()}>Añadir Tarea</Button>
      </div>

      {project.tasks && project.tasks.length > 0 ? (
        <TaskList tasks={project.tasks} projectId={project.id} />
      ) : (
        <div className="mt-12 flex flex-col items-center text-center p-10 bg-white rounded-lg shadow-sm border-2 border-dashed">
          <h2 className="text-2xl font-semibold text-gray-700">
            Este proyecto no tiene tareas
          </h2>
          <p className="mt-2 text-gray-500 max-w-md">
            ¡Empieza a organizar tu trabajo! Crea tu primera tarea para este
            proyecto.
          </p>
          <Button className="mt-6" onClick={() => openTaskModal()}>
            Crear primera tarea
          </Button>
        </div>
      )}

      <Modal
        isOpen={isTaskModalOpen}
        onClose={closeTaskModal}
        title={editingTask ? 'Editar Tarea' : 'Añadir Nueva Tarea'}
      >
        <TaskForm projectId={id} />
      </Modal>
    </div>
  );
}
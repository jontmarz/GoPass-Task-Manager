import { useAuthStore } from '@/store/authStore';
import { useProjects } from '@/hooks/useProjects';
import ProjectList from '@/features/projects/ProjectList';
import { Button } from '@/components/ui/button';
import Modal from '@/components/ui/Modal';
import { useUiStore } from '@/store/uiStore';
import ProjectForm from '@/features/projects/ProjectForm';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { projects, isLoading, isError } = useProjects();
  const { isProjectModalOpen, openProjectModal, closeProjectModal } =
    useUiStore();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Bienvenido de nuevo, {user?.name}!
          </p>
        </div>
        <Button onClick={openProjectModal}>Crear Nuevo Proyecto</Button>
      </div>

      {isLoading && <p className="text-center mt-20">Cargando proyectos...</p>}

      {isError && (
        <p className="text-center mt-20 text-red-500">
          Error al cargar los proyectos.
        </p>
      )}

      {projects && projects.length > 0 && <ProjectList projects={projects} />}

      {projects && projects.length === 0 && !isLoading && (
        <div className="mt-20 flex flex-col items-center text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold">No tienes proyectos todavía</h2>
          <p className="mt-2 text-gray-500 max-w-md">
            ¡Empieza a organizar tu trabajo creando tu primer proyecto! Es fácil y rápido.
          </p>
          <Button className="mt-6" onClick={openProjectModal}>
            Crear mi primer proyecto
          </Button>
        </div>
      )}

      <Modal
        isOpen={isProjectModalOpen}
        onClose={closeProjectModal}
        title="Crear Nuevo Proyecto"
      >
        <ProjectForm />
      </Modal>
    </div>
  );
}
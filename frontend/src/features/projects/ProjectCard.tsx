import { Project } from '@/types';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <h3 className="text-xl font-bold mb-2 truncate">{project.name}</h3>
      <p className="text-gray-600 text-sm h-10 overflow-hidden text-ellipsis">
        {project.description || 'Este proyecto no tiene descripción.'}
      </p>
      <div className="mt-4 border-t pt-3 space-y-3">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>
            Total: <strong>{project._count?.tasks ?? 0}</strong> tareas
          </span>
          <span>Creado: {new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="font-medium p-1 rounded bg-yellow-100 text-yellow-800">
            <p>Pendientes</p>
            <p className="font-bold text-base">{project._count?.pending ?? 0}</p>
          </div>
          <div className="font-medium p-1 rounded bg-blue-100 text-blue-800">
            <p>En Progreso</p>
            <p className="font-bold text-base">{project._count?.inProgress ?? 0}</p>
          </div>
          <div className="font-medium p-1 rounded bg-green-100 text-green-800">
            <p>Hechas</p>
            <p className="font-bold text-base">{project._count?.done ?? 0}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
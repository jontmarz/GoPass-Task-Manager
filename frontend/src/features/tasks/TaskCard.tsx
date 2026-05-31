import { Task, TaskPriority, TaskStatus } from '@/types';
import { cn } from '@/lib/utils';
import { useUiStore } from '@/store/uiStore';

interface TaskCardProps {
  task: Task;
}

const statusStyles: Record<TaskStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  DONE: 'bg-green-100 text-green-800',
};

const priorityStyles: Record<TaskPriority, string> = {
  LOW: 'border-l-gray-400',
  MEDIUM: 'border-l-orange-400',
  HIGH: 'border-l-red-500',
};

export default function TaskCard({ task }: TaskCardProps) {
  const openTaskModal = useUiStore((state) => state.openTaskModal);

  return (
    <div
      role="button"
      onClick={() => openTaskModal(task)}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openTaskModal(task)}
      className={cn(
        'bg-white p-4 rounded-lg shadow-sm border-l-4 w-full text-left hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-900',
        priorityStyles[task.priority],
      )}
    >
      <h4 className="font-bold">{task.title}</h4>
      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      <div className="flex justify-between items-center mt-3 text-xs">
        <span className={cn('px-2 py-1 rounded-full font-semibold', statusStyles[task.status])}>{task.status}</span>
        {task.dueDate && <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>
    </div>
  );
}
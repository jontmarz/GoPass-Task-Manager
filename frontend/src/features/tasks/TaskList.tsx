import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useTasks } from '@/hooks/useTasks';

interface TaskListProps {
  tasks: Task[];
  projectId: string;
}

const statusLabels: Record<TaskStatus, string> = {
  PENDING: 'Pendiente',
  IN_PROGRESS: 'En Progreso',
  DONE: 'Hecho',
};

export default function TaskList({ tasks, projectId }: TaskListProps) {
  const { updateTaskStatus } = useTasks();

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    updateTaskStatus({ taskId: draggableId, status: newStatus, projectId });
  };

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>,
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {Object.entries(statusLabels).map(([status, label]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-200/50 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg mb-4 px-1">{label}</h3>
                <div className="space-y-4">
                  {(groupedTasks[status as TaskStatus] || []).map(
                    (task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ),
                  )}
                  {provided.placeholder}
                  {(!groupedTasks[status as TaskStatus] || groupedTasks[status as TaskStatus].length === 0) && (
                    <p className="text-sm text-gray-500 px-1">No hay tareas en este estado.</p>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
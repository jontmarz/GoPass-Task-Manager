import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { SuggestedTask } from '@/api/ai.api';
import { Loader2 } from 'lucide-react';

interface SuggestedTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestedTasks: SuggestedTask[];
  onAddTasks: (tasks: SuggestedTask[]) => void;
  isAdding: boolean;
}

export const SuggestedTasksModal = ({
  isOpen,
  onClose,
  suggestedTasks,
  onAddTasks,
  isAdding,
}: SuggestedTasksModalProps) => {
  // Por defecto, todas las tareas sugeridas están pre-seleccionadas.
  const [selectedTasks, setSelectedTasks] = useState<SuggestedTask[]>(suggestedTasks);

  const handleCheckboxChange = (task: SuggestedTask, checked: boolean) => {
    if (checked) {
      setSelectedTasks((prev) => [...prev, task]);
    } else {
      setSelectedTasks((prev) => prev.filter((t) => t.title !== task.title));
    }
  };

  const handleAddClick = () => {
    onAddTasks(selectedTasks);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Sugerencias de Tareas con IA ✨</DialogTitle>
          <DialogDescription>
            La IA ha generado las siguientes tareas para tu proyecto. Selecciona las que quieras añadir.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
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
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isAdding}>Cancelar</Button>
          <Button onClick={handleAddClick} disabled={isAdding || selectedTasks.length === 0}>
            {isAdding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {isAdding ? 'Añadiendo...' : `Añadir ${selectedTasks.length} tareas`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
import { create } from 'zustand';
import { Task } from '@/types';

interface UiState {
  isProjectModalOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;

  isTaskModalOpen: boolean;
  editingTask: Task | null;
  openTaskModal: (task?: Task) => void;
  closeTaskModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isProjectModalOpen: false,
  openProjectModal: () => set({ isProjectModalOpen: true }),
  closeProjectModal: () => set({ isProjectModalOpen: false }),

  isTaskModalOpen: false,
  editingTask: null,
  openTaskModal: (task) => set({ isTaskModalOpen: true, editingTask: task || null }),
  closeTaskModal: () => set({ isTaskModalOpen: false, editingTask: null }),
}));
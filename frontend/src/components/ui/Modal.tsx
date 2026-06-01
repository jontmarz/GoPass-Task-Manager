import React from 'react';
import ReactDOM from 'react-dom';
import { XIcon } from './XIcon';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className={cn('bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative', className)}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Cerrar modal"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('root')!,
  );
}
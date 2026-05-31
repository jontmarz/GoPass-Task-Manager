import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex-shrink-0 font-bold text-xl">
                GoPass Task Manager
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 hidden sm:block">Hola, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
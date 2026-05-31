import { Link, useLocation } from 'react-router-dom';
import RegisterForm from '@/features/auth/RegisterForm';

export default function RegisterPage() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <>
      {message && (
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded-md"
          role="alert"
        >
          <p className="font-bold">Información</p>
          <p>{message}</p>
        </div>
      )}
      <h1 className="text-3xl font-bold text-center mb-1">Crear Cuenta</h1>
      <p className="text-gray-500 text-center mb-6">
        Completa el formulario para registrarte.
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
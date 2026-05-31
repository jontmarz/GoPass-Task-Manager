import { Link } from 'react-router-dom';
import RegisterForm from '@/features/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-1">Crear Cuenta</h1>
      <p className="text-gray-500 text-center mb-6">
        Completa el formulario para registrarte.
      </p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
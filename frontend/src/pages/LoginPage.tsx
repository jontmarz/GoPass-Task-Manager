import LoginForm from '@/features/auth/LoginForm';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-1">Iniciar Sesión</h1>
      <p className="text-gray-500 text-center mb-6">
        Ingresa tus credenciales para acceder a tus proyectos.
      </p>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link
          to="/signup"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Regístrate aquí
        </Link>
      </p>
    </>
  );
}

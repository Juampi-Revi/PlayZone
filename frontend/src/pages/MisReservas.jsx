import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MisReservas = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.tipo.toLowerCase() === 'jugador') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Reservas</h1>
              <p className="text-xl text-gray-600">Gestiona tus reservas de canchas deportivas</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-6">📅</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Sistema de Reservas en Desarrollo</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Pronto podrás ver tus reservas activas, historial y gestionar tus horarios.
              </p>
              <div className="space-y-4">
                <Link to="/canchas" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Buscar Canchas</Link>
                <div className="text-sm text-gray-500">Mientras tanto, puedes explorar las canchas disponibles</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user.tipo.toLowerCase() === 'club') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Canchas y Turnos</h1>
              <p className="text-xl text-gray-600">Gestiona tus canchas, turnos y reservas de tus clientes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-6">🏟️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Club en Desarrollo</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Pronto podrás ver tus canchas, horarios ocupados/libres y administrar reservas.
              </p>
              <div className="space-y-4">
                <Link to="/administracion" className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">Ir a Administración</Link>
                <div className="text-sm text-gray-500">Mientras tanto, puedes gestionar tus canchas desde el panel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MisReservas; 
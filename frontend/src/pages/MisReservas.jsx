import { Link } from 'react-router-dom';

const MisReservas = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Mis Reservas
            </h1>
            <p className="text-xl text-gray-600">
              Gestiona tus reservas de canchas deportivas
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-6">📅</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sistema de Reservas en Desarrollo
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Estamos trabajando en el sistema de reservas para que puedas reservar canchas 
              de forma rápida y fácil. Próximamente podrás ver tus reservas activas, 
              historial de reservas y gestionar tus horarios.
            </p>
            
            <div className="space-y-4">
              <Link 
                to="/canchas"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Buscar Canchas
              </Link>
              <div className="text-sm text-gray-500">
                Mientras tanto, puedes explorar las canchas disponibles
              </div>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Reservas Rápidas</h3>
              <p className="text-gray-600 text-sm">
                Reserva canchas en segundos con nuestro sistema simplificado
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Notificaciones</h3>
              <p className="text-gray-600 text-sm">
                Recibe recordatorios y confirmaciones de tus reservas
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Historial</h3>
              <p className="text-gray-600 text-sm">
                Mantén un registro de todas tus actividades deportivas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas; 
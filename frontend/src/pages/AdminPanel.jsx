import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const adminCards = [
    {
      title: 'Agregar Cancha',
      description: 'Crear una nueva cancha en el sistema',
      icon: '🏟️',
      link: '/administracion/agregar',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Gestionar Canchas',
      description: 'Ver y gestionar todas las canchas existentes',
      icon: '📋',
      link: '/administracion/listado',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Reservas',
      description: 'Ver y gestionar las reservas de tus canchas',
      icon: '📅',
      link: '#',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Estadísticas',
      description: 'Ver métricas y reportes de tu club',
      icon: '📊',
      link: '#',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Panel de Administración
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Gestiona tus canchas deportivas, revisa reservas y configura tu club
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-gray-600">Canchas Totales</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">Canchas Activas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
            <div className="text-gray-600">Reservas del Mes</div>
          </div>
        </div>
      </div>

      {/* Admin Cards */}
      <div className="container mx-auto px-4 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Funciones de Administración
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Selecciona la función que deseas realizar para gestionar tu club deportivo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className={`${card.color} text-white rounded-lg shadow-md p-6 text-center transition-all duration-200 transform hover:scale-105 hover:shadow-lg`}
            >
              <div className="text-4xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm opacity-90">{card.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Actividad Reciente
          </h3>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">🏟️</div>
              <p className="text-gray-600">
                No hay actividad reciente. Comienza agregando tu primera cancha.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Acciones Rápidas
          </h3>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/administracion/agregar"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Agregar Cancha Rápido
            </Link>
            <Link
              to="/administracion/listado"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Ver Todas las Canchas
            </Link>
            <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              Exportar Datos
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              ¿Necesitas Ayuda?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta
              sobre la administración de tu club deportivo.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Contactar Soporte
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Ver Documentación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
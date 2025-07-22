import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-3xl">R</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            ReservApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            La plataforma que conecta clubes deportivos con jugadores. 
            Gestiona tus canchas, encuentra rivales y vive el deporte como nunca antes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/canchas"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Buscar Canchas
            </Link>
            <Link 
              to="/registrar-club"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Registrar Mi Club
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              ¿Por qué elegir ReservApp?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La plataforma más completa para la gestión de canchas deportivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🏟️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Para Clubes</h3>
              <p className="text-gray-600">
                Gestiona tus canchas de forma profesional, optimiza reservas y aumenta tus ingresos con nuestra plataforma integral.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚽</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Para Jugadores</h3>
              <p className="text-gray-600">
                Encuentra canchas disponibles, reserva horarios y conoce nuevos rivales para tus partidos favoritos.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Tecnología Avanzada</h3>
              <p className="text-gray-600">
                Sistema moderno con pagos integrados, notificaciones automáticas y gestión inteligente de horarios.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* For Clubs Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                ¿Eres propietario de un club deportivo?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Únete a ReservApp y transforma la gestión de tus canchas. Llega a más clientes, 
                optimiza tus horarios y aumenta tus ingresos de forma significativa.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Panel de administración completo</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Sistema de pagos integrado</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Reportes y estadísticas detalladas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Soporte técnico especializado</span>
                </div>
              </div>
              <Link 
                to="/registrar-club"
                className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors text-lg"
              >
                Registrar Mi Club
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Resultados Comprobados</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">+40%</div>
                    <div className="text-gray-600">Aumento en reservas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">+60%</div>
                    <div className="text-gray-600">Nuevos clientes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Players Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-blue-50 rounded-lg p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Comunidad Deportiva</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Canchas disponibles</span>
                      <span className="font-semibold">500+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Deportes</span>
                      <span className="font-semibold">15+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Jugadores activos</span>
                      <span className="font-semibold">10,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                ¿Eres un jugador apasionado?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Encuentra las mejores canchas, reserva tus horarios favoritos y conoce nuevos 
                rivales para llevar tu juego al siguiente nivel.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Búsqueda rápida de canchas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Reservas 24/7</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Sistema de calificaciones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-gray-700">Comunidad de jugadores</span>
                </div>
              </div>
              <Link 
                to="/canchas"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
              >
                Explorar Canchas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a la comunidad deportiva más grande del país y transforma 
            la forma en que juegas y gestionas canchas deportivas.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/canchas"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Buscar Canchas
            </Link>
            <Link 
              to="/registrar-club"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-lg"
            >
              Registrar Club
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 
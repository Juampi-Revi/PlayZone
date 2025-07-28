import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import PerfilJugador from './jugador/PerfilJugador';
import FavoritosJugador from './jugador/FavoritosJugador';
import PartidosJugados from './jugador/PartidosJugados';
import PagosJugador from './jugador/PagosJugador';

const DashboardJugador = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState({
    reservasActivas: 0,
    partidosJugados: 0,
    canchasFavoritas: 0,
    proximaReserva: null
  });

  const menuItems = [
    {
      path: '/dashboard/jugador',
      label: 'Resumen',
      icon: '📊'
    },
    {
      path: '/dashboard/jugador/perfil',
      label: 'Mi Perfil',
      icon: '👤'
    },
    {
      path: '/dashboard/jugador/reservas',
      label: 'Mis Reservas',
      icon: '📅',
      badge: stats.reservasActivas > 0 ? stats.reservasActivas : null
    },
    {
      path: '/dashboard/jugador/favoritos',
      label: 'Mis Favoritos',
      icon: '❤️'
    },
    {
      path: '/dashboard/jugador/pagos',
      label: 'Mis Pagos',
      icon: '💳'
    },
    {
      path: '/dashboard/jugador/partidos',
      label: 'Partidos Jugados',
      icon: '⚽'
    }
  ];

  useEffect(() => {
    // Cargar estadísticas del jugador
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      // Aquí harías las llamadas a la API para obtener las estadísticas
      // Por ahora usamos datos de ejemplo
      setStats({
        reservasActivas: 2,
        partidosJugados: 15,
        canchasFavoritas: 3,
        proximaReserva: {
          fecha: '2024-01-15',
          hora: '18:00',
          cancha: 'Cancha Central'
        }
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  // Si estamos en la ruta base del dashboard, mostrar el resumen
  const isMainDashboard = location.pathname === '/dashboard/jugador';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              menuItems={menuItems} 
              title="Dashboard Jugador"
            />
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {isMainDashboard ? (
              <div className="space-y-8">
                {/* Header de Bienvenida */}
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold mb-2">
                    ¡Bienvenido, {user?.nombre}! 👋
                  </h1>
                  <p className="text-emerald-100">
                    Aquí tienes un resumen de tu actividad deportiva
                  </p>
                </div>

                {/* Estadísticas Rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      {stats.reservasActivas}
                    </div>
                    <div className="text-gray-600">Reservas Activas</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stats.partidosJugados}
                    </div>
                    <div className="text-gray-600">Partidos Jugados</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      {stats.canchasFavoritas}
                    </div>
                    <div className="text-gray-600">Canchas Favoritas</div>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      4.8
                    </div>
                    <div className="text-gray-600">Rating Promedio</div>
                  </div>
                </div>

                {/* Próxima Reserva */}
                {stats.proximaReserva && (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">🎯</span>
                      Próxima Reserva
                    </h3>
                    <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-emerald-800">
                            {stats.proximaReserva.cancha}
                          </p>
                          <p className="text-emerald-600">
                            {stats.proximaReserva.fecha} a las {stats.proximaReserva.hora}
                          </p>
                        </div>
                        <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Acciones Rápidas */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">⚡</span>
                    Acciones Rápidas
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-emerald-500 text-white p-4 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2">
                      <span>🏟️</span>
                      <span>Buscar Canchas</span>
                    </button>
                    <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                      <span>📅</span>
                      <span>Nueva Reserva</span>
                    </button>
                    <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2">
                      <span>⭐</span>
                      <span>Calificar Partido</span>
                    </button>
                  </div>
                </div>

                {/* Actividad Reciente */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="mr-2">📈</span>
                    Actividad Reciente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-green-500">✅</span>
                      <div>
                        <p className="font-medium">Partido completado</p>
                        <p className="text-sm text-gray-600">Cancha Central - Hace 2 días</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-500">📅</span>
                      <div>
                        <p className="font-medium">Nueva reserva creada</p>
                        <p className="text-sm text-gray-600">Cancha Norte - Hace 3 días</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-red-500">❤️</span>
                      <div>
                        <p className="font-medium">Cancha agregada a favoritos</p>
                        <p className="text-sm text-gray-600">Cancha Sur - Hace 1 semana</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {location.pathname === '/dashboard/jugador/perfil' && <PerfilJugador />}
                {location.pathname === '/dashboard/jugador/favoritos' && <FavoritosJugador />}
                {location.pathname === '/dashboard/jugador/pagos' && <PagosJugador />}
                {location.pathname === '/dashboard/jugador/partidos' && <PartidosJugados />}
                {!['perfil', 'favoritos', 'pagos', 'partidos'].some(section => location.pathname.includes(section)) && <Outlet />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardJugador;
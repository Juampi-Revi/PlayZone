import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import FavoritosJugador from './jugador/FavoritosJugador';
import PagosJugador from './jugador/PagosJugador';
import PartidosJugados from './jugador/PartidosJugados';
import PerfilJugador from './jugador/PerfilJugador';
import MisReservas from './MisReservas';

const DashboardJugador = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [stats, setStats] = useState({
    reservasActivas: 0,
    partidosJugados: 0,
    canchasFavoritas: 0,
    proximaReserva: null,
    totalGastado: 0,
    ratingPromedio: 0
  });

  const [ultimasReservas, setUltimasReservas] = useState([]);
  const [partidosRecientes, setPartidosRecientes] = useState([]);
  const [proximosPartidos, setProximosPartidos] = useState([]);

  const menuItems = [
    {
      path: '/dashboard/jugador',
      label: 'Resumen',
      icon: 'overview'
    },
    {
      path: '/dashboard/jugador/perfil',
      label: 'Mi Perfil',
      icon: 'profile'
    },
    {
      path: '/dashboard/jugador/reservas',
      label: 'Mis Reservas',
      icon: 'reservas',
      badge: stats.reservasActivas > 0 ? stats.reservasActivas : null
    },
    {
      path: '/dashboard/jugador/favoritos',
      label: 'Mis Favoritos',
      icon: 'favorites'
    },
    {
      path: '/dashboard/jugador/pagos',
      label: 'Mis Pagos',
      icon: 'payments'
    },
    {
      path: '/dashboard/jugador/partidos',
      label: 'Partidos Jugados',
      icon: 'matches'
    }
  ];

  useEffect(() => {
    cargarEstadisticas();
    cargarDatosRecientes();
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const cargarEstadisticas = async () => {
    try {
      // Aquí harías las llamadas a la API para obtener las estadísticas reales
      setStats({
        reservasActivas: 8,
        partidosJugados: 15,
        canchasFavoritas: 3,
        totalGastado: 45000,
        ratingPromedio: 4.8,
        proximaReserva: {
          fecha: '2024-01-15',
          hora: '18:00',
          cancha: 'Cancha Central',
          deporte: 'Fútbol',
          duracion: '90 min'
        }
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const cargarDatosRecientes = async () => {
    try {
      // Datos de ejemplo para últimas reservas
      setUltimasReservas([
        {
          id: 1,
          cancha: 'Cancha Central',
          deporte: 'Fútbol',
          fecha: '2024-01-20',
          hora: '20:00',
          estado: 'Confirmada',
          precio: 2500
        },
        {
          id: 2,
          cancha: 'Tennis Club Premium',
          deporte: 'Tenis',
          fecha: '2024-01-18',
          hora: '16:00',
          estado: 'Completada',
          precio: 3000
        },
        {
          id: 3,
          cancha: 'Pádel Elite',
          deporte: 'Pádel',
          fecha: '2024-01-15',
          hora: '19:00',
          estado: 'Completada',
          precio: 1800
        }
      ]);

      // Datos de ejemplo para partidos recientes
      setPartidosRecientes([
        {
          id: 1,
          cancha: 'Cancha Norte',
          deporte: 'Fútbol',
          fecha: '2024-01-18',
          resultado: 'Victoria',
          duracion: '90 min',
          rating: 5
        },
        {
          id: 2,
          cancha: 'Tennis Club Premium',
          deporte: 'Tenis',
          fecha: '2024-01-15',
          resultado: 'Empate',
          duracion: '60 min',
          rating: 4
        },
        {
          id: 3,
          cancha: 'Pádel Elite',
          deporte: 'Pádel',
          fecha: '2024-01-12',
          resultado: 'Victoria',
          duracion: '90 min',
          rating: 5
        }
      ]);

      // Datos de ejemplo para próximos partidos
      setProximosPartidos([
        {
          id: 1,
          cancha: 'Cancha Central',
          deporte: 'Fútbol',
          fecha: '2024-01-25',
          hora: '18:00',
          duracion: '90 min'
        },
        {
          id: 2,
          cancha: 'Tennis Club Premium',
          deporte: 'Tenis',
          fecha: '2024-01-28',
          hora: '16:00',
          duracion: '60 min'
        }
      ]);
    } catch (error) {
      console.error('Error al cargar datos recientes:', error);
    }
  };

  const handleAccionRapida = (accion) => {
    switch (accion) {
      case 'buscar':
        navigate('/buscar-canchas');
        break;
      case 'reserva':
        navigate('/buscar-canchas');
        break;
      case 'organizar':
        navigate('/organizar-partido');
        break;
      case 'amigos':
        navigate('/dashboard/jugador/amigos');
        break;
      default:
        break;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Confirmada':
        return 'bg-green-100 text-green-800';
      case 'Completada':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultadoColor = (resultado) => {
    switch (resultado) {
      case 'Victoria':
        return 'bg-green-100 text-green-800';
      case 'Empate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Derrota':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Si estamos en la ruta base del dashboard, mostrar el resumen
  const isMainDashboard = location.pathname === '/dashboard/jugador';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems} 
        title="Dashboard Jugador"
        isPlayerDashboard={true}
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
      />
      
      {/* Contenido Principal */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {isMainDashboard ? (
            <div className="space-y-8">
              {/* Header de Bienvenida */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                      ¡Hola, {user?.nombre?.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-600">
                      Gestiona tu actividad deportiva desde tu panel personal.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      ${stats.totalGastado.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">Total gastado</div>
                  </div>
                </div>
              </div>

              {/* Estadísticas Rápidas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {stats.reservasActivas}
                      </div>
                      <div className="text-gray-600 text-sm">Reservas Activas</div>
                    </div>
                    <div className="text-blue-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600 mb-1">
                        {stats.partidosJugados}
                      </div>
                      <div className="text-gray-600 text-sm">Partidos Jugados</div>
                    </div>
                    <div className="text-green-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-yellow-600 mb-1">
                        {stats.canchasFavoritas}
                      </div>
                      <div className="text-gray-600 text-sm">Canchas Favoritas</div>
                    </div>
                    <div className="text-yellow-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600 mb-1">
                        {stats.ratingPromedio}
                      </div>
                      <div className="text-gray-600 text-sm">Rating Promedio</div>
                    </div>
                    <div className="text-purple-500">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido Principal en Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Últimas Reservas */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Últimas Reservas</h3>
                    <button 
                      onClick={() => navigate('/dashboard/jugador/reservas')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver todas
                    </button>
                  </div>
                  <div className="space-y-3">
                    {ultimasReservas.map((reserva) => (
                      <div key={reserva.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{reserva.cancha}</div>
                            <div className="text-sm text-gray-500">{reserva.deporte} • {reserva.fecha} {reserva.hora}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(reserva.estado)}`}>
                            {reserva.estado}
                          </span>
                          <div className="text-sm text-gray-600 mt-1">${reserva.precio}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partidos Jugados */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Partidos Jugados</h3>
                    <button 
                      onClick={() => navigate('/dashboard/jugador/partidos')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver todos
                    </button>
                  </div>
                  <div className="space-y-3">
                    {partidosRecientes.map((partido) => (
                      <div key={partido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{partido.cancha}</div>
                            <div className="text-sm text-gray-500">{partido.deporte} • {partido.fecha}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResultadoColor(partido.resultado)}`}>
                            {partido.resultado}
                          </span>
                          <div className="text-sm text-gray-600 mt-1">{partido.duracion}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Próximos Partidos */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Próximos Partidos</h3>
                    <button 
                      onClick={() => navigate('/dashboard/jugador/reservas')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Ver todas
                    </button>
                  </div>
                  <div className="space-y-3">
                    {proximosPartidos.map((partido) => (
                      <div key={partido.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{partido.cancha}</div>
                            <div className="text-sm text-gray-500">{partido.deporte} • {partido.fecha} {partido.hora}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{partido.duracion}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acciones Rápidas */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => handleAccionRapida('buscar')}
                      className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Buscar Canchas</span>
                    </button>
                    
                    <button 
                      onClick={() => handleAccionRapida('organizar')}
                      className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Organizar Partido</span>
                    </button>
                    
                    <button 
                      onClick={() => handleAccionRapida('amigos')}
                      className="flex items-center space-x-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Mis Amigos</span>
                    </button>
                    
                    <button 
                      onClick={() => navigate('/dashboard/jugador/favoritos')}
                      className="flex items-center space-x-3 p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                    >
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <span className="font-medium text-gray-900">Mis Favoritos</span>
                    </button>
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
              {location.pathname === '/dashboard/jugador/reservas' && <MisReservas />}
              {!['perfil', 'favoritos', 'pagos', 'partidos', 'reservas'].some(section => location.pathname.includes(section)) && <Outlet />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardJugador;
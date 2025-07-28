import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import GestionClub from './admin/GestionClub';
import GestionReservas from './admin/GestionReservas';
import FinanzasReportes from './admin/FinanzasReportes';

const DashboardAdmin = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState({
    totalCanchas: 0,
    canchasActivas: 0,
    reservasHoy: 0,
    ingresosMes: 0,
    reservasPendientes: 0
  });

  const menuItems = [
    {
      path: '/dashboard/admin',
      label: 'Resumen',
      icon: '📊'
    },
    {
      path: '/dashboard/admin/club',
      label: 'Mi Club',
      icon: '🏢'
    },
    {
      path: '/dashboard/admin/canchas',
      label: 'Mis Canchas',
      icon: '🏟️'
    },
    {
      path: '/dashboard/admin/horarios',
      label: 'Configurar Horarios',
      icon: '⏰'
    },
    {
      path: '/dashboard/admin/reservas',
      label: 'Gestionar Reservas',
      icon: '📅',
      badge: stats.reservasPendientes > 0 ? stats.reservasPendientes : null
    },
    {
      path: '/dashboard/admin/finanzas',
      label: 'Finanzas',
      icon: '💰'
    },
    {
      path: '/dashboard/admin/reportes',
      label: 'Reportes',
      icon: '📈'
    }
  ];

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      // Aquí harías las llamadas a la API para obtener las estadísticas
      // Por ahora usamos datos de ejemplo
      setStats({
        totalCanchas: 5,
        canchasActivas: 4,
        reservasHoy: 12,
        ingresosMes: 45000,
        reservasPendientes: 3
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const isMainDashboard = location.pathname === '/dashboard/admin';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar 
              menuItems={menuItems} 
              title="Dashboard Admin"
            />
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-3">
            {isMainDashboard ? (
              <div className="space-y-8">
                {/* Header de Bienvenida */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-lg shadow-lg">
                  <h1 className="text-3xl font-bold mb-2">
                    Panel de Administración 🎯
                  </h1>
                  <p className="text-blue-100">
                    Gestiona tu club y canchas desde aquí, {user?.nombre}
                  </p>
                </div>

                {/* Estadísticas Principales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {stats.totalCanchas}
                        </div>
                        <div className="text-gray-600">Total Canchas</div>
                      </div>
                      <div className="text-4xl text-blue-500">🏟️</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {stats.canchasActivas}
                        </div>
                        <div className="text-gray-600">Canchas Activas</div>
                      </div>
                      <div className="text-4xl text-green-500">✅</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-orange-600 mb-2">
                          {stats.reservasHoy}
                        </div>
                        <div className="text-gray-600">Reservas Hoy</div>
                      </div>
                      <div className="text-4xl text-orange-500">📅</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          ${stats.ingresosMes.toLocaleString()}
                        </div>
                        <div className="text-gray-600">Ingresos del Mes</div>
                      </div>
                      <div className="text-4xl text-purple-500">💰</div>
                    </div>
                  </div>
                </div>

                {/* Alertas y Notificaciones */}
                {stats.reservasPendientes > 0 && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-yellow-400 mr-3">⚠️</div>
                      <div>
                        <p className="font-medium text-yellow-800">
                          Tienes {stats.reservasPendientes} reservas pendientes de confirmación
                        </p>
                        <p className="text-yellow-700 text-sm">
                          Revisa la sección de reservas para gestionarlas
                        </p>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <button className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex flex-col items-center space-y-2">
                      <span className="text-2xl">🏟️</span>
                      <span className="text-sm font-medium">Agregar Cancha</span>
                    </button>
                    <button className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors flex flex-col items-center space-y-2">
                      <span className="text-2xl">⏰</span>
                      <span className="text-sm font-medium">Config. Horarios</span>
                    </button>
                    <button className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors flex flex-col items-center space-y-2">
                      <span className="text-2xl">📊</span>
                      <span className="text-sm font-medium">Ver Reportes</span>
                    </button>
                    <button className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors flex flex-col items-center space-y-2">
                      <span className="text-2xl">💳</span>
                      <span className="text-sm font-medium">Gestionar Pagos</span>
                    </button>
                  </div>
                </div>

                {/* Gráfico de Reservas (Placeholder) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Reservas de la Semana
                    </h3>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Gráfico de reservas</p>
                        <p className="text-sm">(Próximamente)</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Canchas Más Populares
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                        <div>
                          <p className="font-medium">Cancha Central</p>
                          <p className="text-sm text-gray-600">85% ocupación</p>
                        </div>
                        <div className="text-emerald-600 font-bold">🥇</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium">Cancha Norte</p>
                          <p className="text-sm text-gray-600">72% ocupación</p>
                        </div>
                        <div className="text-blue-600 font-bold">🥈</div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                        <div>
                          <p className="font-medium">Cancha Sur</p>
                          <p className="text-sm text-gray-600">68% ocupación</p>
                        </div>
                        <div className="text-orange-600 font-bold">🥉</div>
                      </div>
                    </div>
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
                      <span className="text-green-500">💰</span>
                      <div>
                        <p className="font-medium">Pago recibido</p>
                        <p className="text-sm text-gray-600">$2,500 - Reserva Cancha Central</p>
                      </div>
                      <div className="ml-auto text-xs text-gray-500">Hace 1 hora</div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-blue-500">📅</span>
                      <div>
                        <p className="font-medium">Nueva reserva</p>
                        <p className="text-sm text-gray-600">Cancha Norte - Mañana 18:00</p>
                      </div>
                      <div className="ml-auto text-xs text-gray-500">Hace 2 horas</div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-purple-500">⚙️</span>
                      <div>
                        <p className="font-medium">Horarios actualizados</p>
                        <p className="text-sm text-gray-600">Cancha Sur - Nuevos turnos disponibles</p>
                      </div>
                      <div className="ml-auto text-xs text-gray-500">Hace 1 día</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

// Player components
import PerfilJugador from './jugador/PerfilJugador';
import FavoritosJugador from './jugador/FavoritosJugador';
import PagosJugador from './jugador/PagosJugador';
import PartidosJugados from './jugador/PartidosJugados';

// Admin components
import GestionClub from './admin/GestionClub';
import GestionReservas from './admin/GestionReservas';
import FinanzasReportes from './admin/FinanzasReportes';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    if (user?.tipo === 'CLUB') {
      return [
        { id: 'overview', label: 'Resumen General' },
        { id: 'club-management', label: 'Gestión del Club' },
        { id: 'reservations', label: 'Gestión de Reservas' },
        { id: 'finances', label: 'Finanzas y Reportes' },
        { id: 'profile', label: 'Perfil' }
      ];
    } else {
      return [
        { id: 'overview', label: 'Resumen General' },
        { id: 'profile', label: 'Mi Perfil' },
        { id: 'favorites', label: 'Favoritos' },
        { id: 'matches', label: 'Partidos Jugados' },
        { id: 'payments', label: 'Pagos' }
      ];
    }
  };

  const renderOverview = () => {
    if (user?.tipo === 'CLUB') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bienvenido, {user.nombre}
            </h2>
            <p className="text-gray-600 mb-6">
              Gestiona tu club deportivo desde este panel de control.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">🏟️</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Canchas</h3>
                    <p className="text-3xl font-bold text-blue-600">5</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Reservas Hoy</h3>
                    <p className="text-3xl font-bold text-green-600">12</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Ingresos del Mes</h3>
                    <p className="text-3xl font-bold text-purple-600">$2,450</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveSection('club-management')}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-xl mb-2 block">🏢</span>
                Gestionar Club
              </button>
              <button
                onClick={() => setActiveSection('reservations')}
                className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="text-xl mb-2 block">📅</span>
                Ver Reservas
              </button>
              <button
                onClick={() => setActiveSection('finances')}
                className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span className="text-xl mb-2 block">💰</span>
                Ver Reportes
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Bienvenido, {user.nombre}
            </h2>
            <p className="text-gray-600 mb-6">
              Gestiona tu actividad deportiva desde tu panel personal.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Reservas</h3>
                    <p className="text-3xl font-bold text-blue-600">8</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">⚽</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Partidos</h3>
                    <p className="text-3xl font-bold text-green-600">15</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <span className="text-2xl">❤️</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Favoritos</h3>
                    <p className="text-3xl font-bold text-purple-600">3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => window.location.href = '/canchas'}
                className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-xl mb-2 block">🔍</span>
                Buscar Canchas
              </button>
              <button
                onClick={() => setActiveSection('matches')}
                className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <span className="text-xl mb-2 block">⚽</span>
                Mis Partidos
              </button>
              <button
                onClick={() => setActiveSection('favorites')}
                className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <span className="text-xl mb-2 block">❤️</span>
                Mis Favoritos
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      
      // Player sections
      case 'profile':
        return user?.rol === 'club' ? <PerfilJugador /> : <PerfilJugador />;
      case 'favorites':
        return <FavoritosJugador />;
      case 'matches':
        return <PartidosJugados />;
      case 'payments':
        return <PagosJugador />;
      
      // Admin sections
      case 'club-management':
        return <GestionClub />;
      case 'reservations':
        return <GestionReservas />;
      case 'finances':
        return <FinanzasReportes />;
      
      default:
        return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        menuItems={getMenuItems()} 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        user={user}
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
      />
      <div 
        className={`flex-1 overflow-auto transition-all duration-300 ease-in-out ${
          sidebarExpanded ? 'ml-64' : 'ml-16'
        }`}
      >
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
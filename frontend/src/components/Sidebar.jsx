import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ menuItems, activeSection, onSectionChange, isExpanded, onToggle, title, isPlayerDashboard }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Icon components
  const icons = {
    overview: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    resumen: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    club: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    canchas: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={2}/>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3c2.5 2 2.5 6 0 8s-2.5 6 0 8M3 12c2 2.5 6 2.5 8 0s6-2.5 8 0"/>
      </svg>
    ),
    horarios: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    reservas: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    finanzas: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    reportes: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    profile: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    favorites: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    matches: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    payments: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    'club-management': (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    reservations: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    finances: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    )
  };

  const getIcon = (iconName) => {
    // Si es un emoji, lo renderizamos como texto
    if (iconName && iconName.length <= 2 && /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(iconName)) {
      return <span className="text-xl">{iconName}</span>;
    }
    
    // Si es un ID de icono, usamos el sistema de iconos
    return icons[iconName] || icons.overview;
  };

  // Determinar si es el panel de jugador basándose en las props o la ruta
  const isPlayer = isPlayerDashboard || (title && title.includes('Jugador')) || location.pathname.includes('/jugador');

  // Para el panel de jugador, usar navegación simple
  if (isPlayer) {
    return (
      <div className={`min-h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative ${
        isExpanded ? 'w-64' : 'w-16'
      }`}>
        {/* Toggle Button */}
        <div className="absolute -right-3 top-6 z-10">
          <button
            onClick={onToggle}
            className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
          >
            <svg 
              className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <div className={`border-b border-gray-200 ${isExpanded ? 'p-6' : 'p-3'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-lg">
                {user?.nombre?.charAt(0)?.toUpperCase() || 'J'}
              </span>
            </div>
            {isExpanded && (
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-gray-900 truncate">{title || 'Dashboard Jugador'}</h2>
                <p className="text-sm text-gray-500 truncate">{user?.nombre}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${isExpanded ? 'p-4' : 'p-2'}`}>
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={index}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 ml-0'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                    title={!isExpanded ? item.label : ''}
                  >
                    <div className="flex-shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    {isExpanded && (
                      <>
                        <span className="font-medium truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className={`border-t border-gray-200 ${isExpanded ? 'p-4' : 'p-2'}`}>
          {isExpanded ? (
            <div className="text-center text-xs text-gray-400">
              <p>PlayZone Dashboard</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          ) : (
            <div className="text-center text-xs text-gray-400">
              <p>PZ</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Para el panel de administración, usar el sistema original
  return (
    <div className={`min-h-screen bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out relative ${
      isExpanded ? 'w-64' : 'w-16'
    }`}>
      {/* Toggle Button */}
      <div className="absolute -right-3 top-6 z-10">
        <button
          onClick={onToggle}
          className="w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50"
        >
          <svg 
            className={`w-3 h-3 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Header */}
      <div className={`border-b border-gray-200 ${isExpanded ? 'p-6' : 'p-3'}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          {isExpanded && (
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">Panel de Administración</h2>
              <p className="text-sm text-gray-500 truncate">{user?.nombre}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isExpanded ? 'p-4' : 'p-2'}`}>
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const isActive = activeSection === item.id;
            return (
              <li key={index}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center ${isExpanded ? 'space-x-3 px-3' : 'justify-center px-2'} py-2.5 rounded-lg text-left transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 ml-0'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={!isExpanded ? item.label : ''}
                >
                  <div className="flex-shrink-0">
                    {getIcon(item.id)}
                  </div>
                  {isExpanded && (
                    <>
                      <span className="font-medium truncate">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isExpanded && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-[80]">
                      {item.label}
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="text-center text-xs text-gray-400">
            <p>PlayZone Dashboard</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
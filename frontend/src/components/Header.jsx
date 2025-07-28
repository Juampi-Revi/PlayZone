import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 shadow-2xl border-b border-emerald-400/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm border border-white border-opacity-30 group-hover:bg-opacity-30">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight">
                Play<span className="text-yellow-300">Zone</span>
              </span>
              <span className="text-xs text-emerald-100 font-medium">Tu cancha, tu momento</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link 
              to="/" 
              className="group text-white hover:text-yellow-300 font-semibold px-4 py-2.5 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Inicio</span>
            </Link>
            <Link 
              to="/canchas" 
              className="group text-white hover:text-yellow-300 font-semibold px-4 py-2.5 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform"
            >
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Buscar Canchas</span>
            </Link>
            
            {/* Dashboard link for authenticated users */}
            {user && (
              <Link 
                to={user.tipo === 'CLUB' ? '/dashboard-admin' : '/dashboard-jugador'}
                className="group text-white hover:text-yellow-300 font-semibold px-4 py-2.5 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-2 hover:scale-105 transform"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>
            )}
            
            <div className="h-8 w-px bg-white bg-opacity-30 mx-3"></div>
            
            {/* Mostrar login o usuario logueado */}
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/registrar" 
                  className="group bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 flex items-center space-x-2 shadow-xl hover:shadow-emerald-400/25 transform hover:scale-105"
                >
                  <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Únete Gratis</span>
                </Link>
                <Link 
                  to="/login" 
                  className="group bg-white bg-opacity-20 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2 border border-white border-opacity-30 hover:scale-105 transform"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Iniciar Sesión</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white border-opacity-30">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center">
                    <span className="text-gray-900 font-bold text-sm">
                      {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm">{user.nombre}</span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="group bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-bold hover:bg-red-500 hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2 border border-white border-opacity-30 hover:scale-105 transform"
                >
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Salir</span>
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 rounded-xl text-white hover:bg-white hover:bg-opacity-10 transition-all duration-300 hover:scale-110 transform"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white border-opacity-20 bg-gradient-to-b from-transparent to-black to-opacity-10">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="group text-white hover:text-yellow-300 font-semibold px-4 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-3 hover:scale-105 transform"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Inicio</span>
              </Link>
              <Link 
                to="/canchas" 
                className="group text-white hover:text-yellow-300 font-semibold px-4 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-3 hover:scale-105 transform"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Buscar Canchas</span>
              </Link>
              
              {/* Dashboard link for authenticated users */}
              {user && (
                <Link 
                  to={user.tipo === 'CLUB' ? '/dashboard-admin' : '/dashboard-jugador'}
                  className="group text-white hover:text-yellow-300 font-semibold px-4 py-3 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center space-x-3 hover:scale-105 transform"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>
              )}
              

              
              <div className="h-px bg-white bg-opacity-20 my-4"></div>
              
              {!user ? (
                <>
                  <Link 
                    to="/registrar" 
                    className="group bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-4 py-3 rounded-xl font-bold hover:from-emerald-300 hover:to-emerald-400 transition-all duration-300 flex items-center space-x-3 shadow-xl hover:scale-105 transform"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Únete Gratis</span>
                  </Link>
                  <Link 
                    to="/login" 
                    className="group bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3 border border-white border-opacity-30 hover:scale-105 transform"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span>Iniciar Sesión</span>
                  </Link>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-3 rounded-xl border border-white border-opacity-30">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center">
                      <span className="text-gray-900 font-bold">
                        {user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold">{user.nombre}</span>
                      <span className="text-emerald-200 text-sm font-medium bg-emerald-500 bg-opacity-30 px-2 py-1 rounded-full">
                        {user.tipo}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="group w-full bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-bold hover:bg-red-500 hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center space-x-3 border border-white border-opacity-30 hover:scale-105 transform"
                  >
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Play<span className="text-yellow-300">Zone</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-emerald-100 max-w-4xl mx-auto font-medium flex items-center justify-center gap-3">
            <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            La plataforma #1 para reservar canchas deportivas
          </p>
          <p className="text-lg mb-12 text-emerald-200 max-w-3xl mx-auto">
            Conectamos jugadores apasionados con las mejores canchas. Reserva en segundos, juega sin límites.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Link 
              to="/canchas"
              className="group bg-yellow-400 text-gray-900 px-10 py-5 rounded-2xl font-bold hover:bg-yellow-300 transition-all duration-300 text-lg shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transform"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Buscar Canchas Ahora
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/registrar"
              className="group border-3 border-white text-white px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-emerald-600 transition-all duration-300 text-lg hover:scale-105 transform"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Únete Gratis
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-200">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-semibold">4.9/5</span>
              <span className="text-sm">en reseñas</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="font-semibold">10,000+</span>
              <span className="text-sm">jugadores activos</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-semibold">500+</span>
              <span className="text-sm">canchas disponibles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              ¿Por qué elegir <span className="text-emerald-600">PlayZone</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              La experiencia más completa para deportistas y propietarios de canchas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="group text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-emerald-400/25">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Clubes</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Maximiza tus ingresos con nuestro sistema inteligente de gestión. 
                <span className="text-emerald-600 font-semibold">+40% más reservas</span> garantizado.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-blue-400/25">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Para Jugadores</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Encuentra tu cancha perfecta en segundos. 
                <span className="text-blue-600 font-semibold">Reserva instantánea</span> las 24 horas.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:shadow-purple-400/25">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tecnología Avanzada</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Pagos seguros, notificaciones inteligentes y 
                <span className="text-purple-600 font-semibold">soporte 24/7</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Visual Section */}
      <div className="py-24 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-16">
            <h2 className="text-5xl font-black mb-6">Todos los Deportes en un Solo Lugar</h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
              Desde fútbol hasta tenis, encuentra la cancha perfecta para tu deporte favorito
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { 
                name: 'Fútbol', 
                color: 'bg-green-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 12h8"/>
                  <path d="M12 8v8"/>
                </svg>
              },
              { 
                name: 'Tenis', 
                color: 'bg-yellow-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 2v20"/>
                  <path d="M2 12h20"/>
                </svg>
              },
              { 
                name: 'Basketball', 
                color: 'bg-orange-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              },
              { 
                name: 'Vóley', 
                color: 'bg-blue-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16 8l-8 8"/>
                  <path d="M8 8l8 8"/>
                </svg>
              },
              { 
                name: 'Ping Pong', 
                color: 'bg-red-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M9 9h6v6H9z"/>
                </svg>
              },
              { 
                name: 'Hockey', 
                color: 'bg-purple-500',
                icon: <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3l18 18"/>
                  <path d="M21 3L3 21"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              }
            ].map((sport, index) => (
              <div key={index} className="group text-center hover:scale-110 transition-all duration-300">
                <div className={`w-16 h-16 ${sport.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:shadow-2xl`}>
                  {sport.icon}
                </div>
                <p className="text-white font-semibold">{sport.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For Clubs Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                💼 Para Propietarios
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Transforma tu Club en un <span className="text-emerald-600">Negocio Digital</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Únete a la revolución digital del deporte. Gestiona reservas, aumenta ingresos y 
                llega a miles de jugadores con nuestra plataforma todo-en-uno.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>, text: 'Dashboard con analytics en tiempo real', color: 'text-blue-600' },
                  { icon: <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>, text: 'Pagos automáticos y seguros', color: 'text-green-600' },
                  { icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>, text: 'App móvil para gestión remota', color: 'text-purple-600' },
                  { icon: <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, text: 'Marketing automático para tus canchas', color: 'text-orange-600' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      {feature.icon}
                    </div>
                    <span className={`text-lg font-semibold ${feature.color}`}>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/registrar"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 text-lg shadow-xl hover:shadow-emerald-400/25 hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Empezar Gratis Ahora
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Resultados Reales</h3>
                  <p className="text-gray-600">Datos promedio de nuestros clubes</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-black text-emerald-600 mb-2">+65%</div>
                    <div className="text-gray-600 font-semibold">Más Reservas</div>
                  </div>
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-black text-blue-600 mb-2">+80%</div>
                    <div className="text-gray-600 font-semibold">Nuevos Clientes</div>
                  </div>
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-black text-purple-600 mb-2">-50%</div>
                    <div className="text-gray-600 font-semibold">Tiempo Gestión</div>
                  </div>
                  <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
                    <div className="text-4xl font-black text-orange-600 mb-2">24/7</div>
                    <div className="text-gray-600 font-semibold">Disponibilidad</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section for Clubs */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              💰 Planes para Clubes
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-6">
              Elige el Plan <span className="text-emerald-600">Perfecto</span> para tu Club
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Desde clubes pequeños hasta grandes complejos deportivos. Tenemos el plan ideal para hacer crecer tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Plan Básico */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:scale-105">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Básico</h3>
                <p className="text-gray-600 mb-6">Perfecto para empezar</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-gray-900">$0</span>
                  <span className="text-gray-600 text-lg">/mes</span>
                </div>
                <p className="text-sm text-gray-500">Gratis para siempre</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Hasta 2 canchas',
                  'Gestión básica de reservas',
                  'Dashboard simple',
                  'Soporte por email',
                  'Comisión 8% por reserva'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/registrar"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all duration-300 text-center block"
              >
                Empezar Gratis
              </Link>
            </div>

            {/* Plan Pro - Destacado */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-400/25 transition-all duration-300 text-white relative hover:scale-105 transform">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold">
                  🔥 MÁS POPULAR
                </span>
              </div>
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-emerald-100 mb-6">Para clubes en crecimiento</p>
                <div className="mb-6">
                  <span className="text-5xl font-black">$49</span>
                  <span className="text-emerald-200 text-lg">/mes</span>
                </div>
                <p className="text-sm text-emerald-200">Facturación mensual</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Hasta 10 canchas',
                  'Gestión avanzada de reservas',
                  'Dashboard con analytics',
                  'Configuración de horarios',
                  'Soporte prioritario',
                  'Comisión 5% por reserva',
                  'Reportes detallados',
                  'Integración con pagos'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-yellow-300 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/registrar"
                className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 text-center block"
              >
                Empezar Prueba Gratis
              </Link>
            </div>

            {/* Plan Enterprise */}
            <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:scale-105">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600 mb-6">Para grandes complejos</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-gray-900">$149</span>
                  <span className="text-gray-600 text-lg">/mes</span>
                </div>
                <p className="text-sm text-gray-500">Funcionalidades premium</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  'Canchas ilimitadas',
                  'Gestión multi-sede',
                  'Analytics avanzados',
                  'API personalizada',
                  'Soporte 24/7',
                  'Comisión 3% por reserva',
                  'White-label disponible',
                  'Manager dedicado'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/registrar"
                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold hover:bg-purple-700 transition-all duration-300 text-center block"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6">
              ¿Necesitas algo personalizado? <Link to="/contacto" className="text-emerald-600 font-semibold hover:underline">Contáctanos</Link>
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Sin permanencia</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Pagos seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Soporte incluido</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* For Players Section */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">Comunidad Activa</h3>
                  <p className="text-gray-600">Miles de jugadores ya confían en nosotros</p>
                </div>
                
                <div className="space-y-6">
                  {[
                    { label: 'Canchas Verificadas', value: '500+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>, color: 'text-emerald-600' },
                    { label: 'Deportes Disponibles', value: '15+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>, color: 'text-blue-600' },
                    { label: 'Jugadores Activos', value: '10K+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, color: 'text-purple-600' },
                    { label: 'Reservas Exitosas', value: '50K+', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, color: 'text-orange-600' }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-lg hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {stat.icon}
                        </div>
                        <span className="text-gray-700 font-semibold">{stat.label}</span>
                      </div>
                      <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎮 Para Jugadores
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6">
                Tu Próximo <span className="text-blue-600">Partido</span> te Espera
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Descubre canchas increíbles, conecta con otros jugadores y vive la experiencia 
                deportiva que siempre soñaste. Todo en una sola app.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { icon: <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>, text: 'Búsqueda inteligente por ubicación y deporte', color: 'text-emerald-600' },
                  { icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, text: 'Reservas instantáneas sin complicaciones', color: 'text-blue-600' },
                  { icon: <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, text: 'Sistema de reseñas y calificaciones', color: 'text-yellow-600' },
                  { icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, text: 'Conecta con jugadores de tu nivel', color: 'text-purple-600' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 group hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      {feature.icon}
                    </div>
                    <span className={`text-lg font-semibold ${feature.color}`}>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/canchas"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-lg shadow-xl hover:shadow-blue-400/25 hover:scale-105 transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Explorar Canchas
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-ping"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            ¿Listo para <span className="text-yellow-300">Jugar</span>?
          </h2>
          <p className="text-xl text-emerald-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Únete a la revolución deportiva. Miles de jugadores y cientos de clubes ya están 
            transformando su experiencia deportiva con PlayZone.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
            <Link 
              to="/canchas"
              className="group bg-yellow-400 text-gray-900 px-12 py-6 rounded-2xl font-black hover:bg-yellow-300 transition-all duration-300 text-xl shadow-2xl hover:shadow-yellow-400/25 hover:scale-105 transform"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buscar Canchas
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
            <Link 
              to="/registrar"
              className="group border-3 border-white text-white px-12 py-6 rounded-2xl font-black hover:bg-white hover:text-emerald-600 transition-all duration-300 text-xl hover:scale-105 transform"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Registrar Club
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-emerald-200">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-semibold">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="font-semibold">Gratis para Empezar</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold">Soporte 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl"></div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl border border-emerald-300/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-3xl font-black tracking-tight">
                  Play<span className="text-yellow-400">Zone</span>
                </h3>
                <p className="text-emerald-200 font-medium">Tu cancha, tu momento</p>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-lg text-lg leading-relaxed">
              La plataforma líder para reservar canchas deportivas. Conectamos clubes con jugadores 
              para que puedas disfrutar de tu deporte favorito cuando quieras, donde quieras.
            </p>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">500+</div>
                <div className="text-sm text-gray-400">Canchas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">10K+</div>
                <div className="text-sm text-gray-400">Usuarios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">50K+</div>
                <div className="text-sm text-gray-400">Reservas</div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-90 transition-all duration-300 border border-white border-opacity-20 hover:scale-110 transform">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-600 hover:bg-opacity-90 transition-all duration-300 border border-white border-opacity-20 hover:scale-110 transform">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-pink-600 hover:bg-opacity-90 transition-all duration-300 border border-white border-opacity-20 hover:scale-110 transform">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-700 hover:bg-opacity-90 transition-all duration-300 border border-white border-opacity-20 hover:scale-110 transform">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-emerald-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/canchas" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar Canchas
                </Link>
              </li>
              <li>
                <Link to="/reservas" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Mis Reservas
                </Link>
              </li>
              <li>
                <Link to="/registrar-club" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Registrar Club
                </Link>
              </li>
              <li>
                <Link to="/login" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                  <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Iniciar Sesión
                </Link>
              </li>
            </ul>
          </div>

          {/* Deportes */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-emerald-300 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10v18a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8l4 4z" />
              </svg>
              Deportes
            </h4>
            <ul className="space-y-3">
               <li>
                 <a href="#" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                   <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M8 12h8"/>
                     <path d="M12 8v8"/>
                   </svg>
                   Fútbol
                 </a>
               </li>
               <li>
                 <a href="#" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                   <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M12 2v20"/>
                     <path d="M2 12h20"/>
                   </svg>
                   Tenis
                 </a>
               </li>
               <li>
                 <a href="#" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                   <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                     <path d="M9 9h6v6H9z"/>
                   </svg>
                   Pádel
                 </a>
               </li>
               <li>
                 <a href="#" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                   <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                     <line x1="9" y1="9" x2="9.01" y2="9"/>
                     <line x1="15" y1="9" x2="15.01" y2="9"/>
                   </svg>
                   Basketball
                 </a>
               </li>
               <li>
                 <a href="#" className="group flex items-center text-gray-300 hover:text-yellow-400 transition-all duration-300 hover:translate-x-1">
                   <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <circle cx="12" cy="12" r="10"/>
                     <path d="M16 8l-8 8"/>
                     <path d="M8 8l8 8"/>
                   </svg>
                   Vóley
                 </a>
               </li>
             </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 p-8 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl border border-emerald-400/20 backdrop-blur-sm">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white flex items-center justify-center">
              <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              ¡Mantente al día con PlayZone!
            </h3>
            <p className="text-emerald-200 mb-6">
              Recibe las últimas noticias, ofertas especiales y tips para mejorar tu experiencia deportiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email aquí..."
                className="flex-1 px-4 py-3 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-xl hover:shadow-yellow-400/25 transform hover:scale-105">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gradient-to-r from-transparent via-emerald-400/20 to-transparent mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              © 2024 PlayZone. Hecho con amor para los deportistas.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors hover:underline">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors hover:underline">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors hover:underline">
                Centro de Ayuda
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors hover:underline">
                Contacto
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
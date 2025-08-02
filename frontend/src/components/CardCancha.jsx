import { Link } from 'react-router-dom';

const CardCancha = ({ cancha, user, configuracionHorarios }) => {
  const { id, nombre, descripcion, deporte, ubicacion, precioPorHora, horario, imagenes, disponible } = cancha;
  
  // Imagen por defecto si no hay imágenes
  const imagenPrincipal = imagenes && imagenes.length > 0 
    ? imagenes[0] 
    : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  // Iconos por deporte
  const getDeporteIcon = (deporte) => {
    const iconos = {
      'Fútbol': '⚽',
      'Tenis': '🎾',
      'Pádel': '🏓',
      'Basketball': '🏀',
      'Básquet': '🏀', // Agregado para compatibilidad
      'Vóley': '🏐',
      'Squash': '🏸',
      'Pelota Paleta': '🏓',
      'Hockey': '🏒',
      'Rugby': '🏉',
      'Beisbol': '⚾',
      'Otro': '🏟️'
    };
    return iconos[deporte] || '🏟️';
  };

  // Función para formatear el horario basado en la configuración
  const formatearHorario = () => {
    if (!configuracionHorarios) {
      return horario; // Fallback al horario de texto libre si no hay configuración
    }

    const { horaApertura, horaCierre, diasDisponibles } = configuracionHorarios;
    
    // Convertir días disponibles de string a array
    const diasArray = diasDisponibles.split(',').map(d => parseInt(d.trim()));
    
    // Mapear números a nombres de días
    const nombresDias = {
      1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 
      5: 'Vie', 6: 'Sáb', 7: 'Dom'
    };
    
    // Verificar si son todos los días
    const todosDias = diasArray.length === 7 && diasArray.sort().join(',') === '1,2,3,4,5,6,7';
    
    if (todosDias) {
      return `Todos los días: ${horaApertura.substring(0, 5)} - ${horaCierre.substring(0, 5)}`;
    } else {
      const diasTexto = diasArray.map(d => nombresDias[d]).join(', ');
      return `${diasTexto}: ${horaApertura.substring(0, 5)} - ${horaCierre.substring(0, 5)}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imagenPrincipal} 
          alt={nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Error+Imagen';
          }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <div className="flex items-center space-x-1 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow-lg">
            <span className="text-lg">{getDeporteIcon(deporte)}</span>
            <span className="text-sm font-semibold text-gray-800">{deporte}</span>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            disponible 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {disponible ? '✅ Disponible' : '❌ Ocupada'}
          </div>
        </div>

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 bg-white bg-opacity-95 px-3 py-2 rounded-lg shadow-lg">
          <div className="text-sm text-gray-600">Precio</div>
          <div className="text-lg font-bold text-green-600">${precioPorHora?.toLocaleString()}/hora</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {descripcion || 'Sin descripción disponible'}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</div>
              <div className="text-sm font-medium text-gray-800 truncate">{ubicacion}</div>
            </div>
          </div>

          {(configuracionHorarios || horario) && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Horario</div>
                <div className="text-sm font-medium text-gray-800 truncate">{formatearHorario()}</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link 
            to={`/detalle/${id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center transform hover:scale-105 shadow-lg hover:shadow-xl mr-3"
          >
            Ver Detalles
          </Link>
          
          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            ID: {id}
          </div>
        </div>

        {/* Quick actions on hover */}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            {user ? (
              <button className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors duration-200">
                Reservar Ahora
              </button>
            ) : (
              <a href="/login" className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200 text-center">
                Inicia sesión para reservar
              </a>
            )}
            <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-200">
              Favorito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCancha;
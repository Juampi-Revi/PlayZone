import { Link } from 'react-router-dom';

const CardCancha = ({ cancha }) => {
  const { id, nombre, descripcion, deporte, ubicacion, precioPorHora, horario, imagenes, disponible } = cancha;
  
  // Imagen por defecto si no hay imágenes
  const imagenPrincipal = imagenes && imagenes.length > 0 
    ? imagenes[0] 
    : 'https://via.placeholder.com/300x200?text=Sin+Imagen';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imagenPrincipal} 
          alt={nombre}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Error+Imagen';
          }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {deporte}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            disponible 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            {disponible ? 'Disponible' : 'Ocupada'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {nombre}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {descripcion || 'Sin descripción disponible'}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{ubicacion}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-semibold text-green-600">${precioPorHora?.toLocaleString()}/hora</span>
          </div>

          {horario && (
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{horario}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/detalle/${id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Ver Detalles
          </Link>
          
          <div className="text-xs text-gray-500">
            ID: {id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCancha; 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FavoritosJugador = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarFavoritos();
  }, []);

  const cargarFavoritos = async () => {
    try {
      // Aquí harías la llamada a la API para obtener los favoritos
      // Por ahora usamos datos de ejemplo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFavoritos([
        {
          id: 1,
          nombre: 'Cancha Central',
          ubicacion: 'Centro, Buenos Aires',
          deporte: 'Fútbol',
          precioPorHora: 2500,
          rating: 4.8,
          imagen: '/api/placeholder/300/200',
          fechaAgregado: '2024-01-10'
        },
        {
          id: 2,
          nombre: 'Club Deportivo Norte',
          ubicacion: 'Belgrano, Buenos Aires',
          deporte: 'Tenis',
          precioPorHora: 3000,
          rating: 4.6,
          imagen: '/api/placeholder/300/200',
          fechaAgregado: '2024-01-08'
        },
        {
          id: 3,
          nombre: 'Complejo Sur',
          ubicacion: 'San Telmo, Buenos Aires',
          deporte: 'Pádel',
          precioPorHora: 2800,
          rating: 4.9,
          imagen: '/api/placeholder/300/200',
          fechaAgregado: '2024-01-05'
        }
      ]);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarFavorito = async (canchaId) => {
    try {
      // Aquí harías la llamada a la API para eliminar de favoritos
      setFavoritos(prev => prev.filter(cancha => cancha.id !== canchaId));
    } catch (error) {
      console.error('Error al eliminar favorito:', error);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">❤️</span>
              Mis Favoritos
            </h1>
            <p className="text-gray-600">
              Canchas que has marcado como favoritas ({favoritos.length})
            </p>
          </div>
          <Link
            to="/canchas"
            className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Buscar Más Canchas
          </Link>
        </div>
      </div>

      {favoritos.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tienes canchas favoritas aún
          </h3>
          <p className="text-gray-600 mb-6">
            Explora nuestras canchas y marca las que más te gusten
          </p>
          <Link
            to="/canchas"
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors inline-flex items-center space-x-2"
          >
            <span>🔍</span>
            <span>Explorar Canchas</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritos.map((cancha) => (
            <div key={cancha.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Imagen de la cancha */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={cancha.imagen}
                  alt={cancha.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwTDEyMCA4MEwxODAgODBMMTUwIDEwMFoiIGZpbGw9IiM5Q0E0QUYiLz4KPHN2Zz4K';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => eliminarFavorito(cancha.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Eliminar de favoritos"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    {cancha.deporte}
                  </span>
                </div>
              </div>

              {/* Información de la cancha */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {cancha.nombre}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">📍</span>
                    <span>{cancha.ubicacion}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">💰</span>
                    <span>${cancha.precioPorHora}/hora</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">⭐</span>
                    <span>{cancha.rating} estrellas</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 text-sm">
                    <span className="mr-2">❤️</span>
                    <span>Agregado el {formatearFecha(cancha.fechaAgregado)}</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <Link
                    to={`/cancha/${cancha.id}`}
                    className="flex-1 bg-emerald-500 text-white py-2 px-3 rounded-lg hover:bg-emerald-600 transition-colors text-center text-sm font-medium"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    to={`/cancha/${cancha.id}/reservar`}
                    className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-center text-sm font-medium"
                  >
                    Reservar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas de favoritos */}
      {favoritos.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Estadísticas de Favoritos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600 mb-1">
                {favoritos.length}
              </div>
              <div className="text-sm text-gray-600">Total Favoritos</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {(favoritos.reduce((sum, cancha) => sum + cancha.rating, 0) / favoritos.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Rating Promedio</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${Math.round(favoritos.reduce((sum, cancha) => sum + cancha.precioPorHora, 0) / favoritos.length)}
              </div>
              <div className="text-sm text-gray-600">Precio Promedio</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {[...new Set(favoritos.map(cancha => cancha.deporte))].length}
              </div>
              <div className="text-sm text-gray-600">Deportes Diferentes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritosJugador;
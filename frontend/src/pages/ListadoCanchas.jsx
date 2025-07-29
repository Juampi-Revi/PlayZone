import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ListadoCanchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterDeporte, setFilterDeporte] = useState('');
  const [filterDisponible, setFilterDisponible] = useState('');
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    fetchCanchas();
    fetchDeportes();
  }, []);

  const fetchCanchas = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/api/canchas');
      setCanchas(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching canchas:', err);
      setError('Error al cargar las canchas');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeportes = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/canchas/deportes');
      setDeportes(response.data);
    } catch (err) {
      console.error('Error fetching deportes:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta cancha?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8082/api/canchas/${id}`);
      setCanchas(canchas.filter(cancha => cancha.id !== id));
    } catch (err) {
      console.error('Error deleting cancha:', err);
      alert('Error al eliminar la cancha');
    }
  };

  const handleToggleDisponibilidad = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8082/api/canchas/${id}/toggle-disponibilidad`);
      setCanchas(canchas.map(cancha => 
        cancha.id === id ? response.data : cancha
      ));
    } catch (err) {
      console.error('Error toggling disponibilidad:', err);
      alert('Error al cambiar la disponibilidad');
    }
  };

  const filteredCanchas = canchas.filter(cancha => {
    const matchesDeporte = !filterDeporte || cancha.deporte === filterDeporte;
    const matchesDisponible = !filterDisponible || 
      (filterDisponible === 'disponible' && cancha.disponible) ||
      (filterDisponible === 'no-disponible' && !cancha.disponible);
    
    return matchesDeporte && matchesDisponible;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando canchas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Administrar Canchas
              </h1>
              <p className="text-gray-600">
                Gestiona todas las canchas deportivas del sistema
              </p>
            </div>
            <Link
              to="/administracion/agregar"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              + Agregar Cancha
            </Link>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deporte
                </label>
                <select
                  value={filterDeporte}
                  onChange={(e) => setFilterDeporte(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos los deportes</option>
                  {deportes.map(deporte => (
                    <option key={deporte} value={deporte}>{deporte}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disponibilidad
                </label>
                <select
                  value={filterDisponible}
                  onChange={(e) => setFilterDisponible(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todas</option>
                  <option value="disponible">Disponibles</option>
                  <option value="no-disponible">No disponibles</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterDeporte('');
                    setFilterDisponible('');
                  }}
                  className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-2xl font-bold text-blue-600">{canchas.length}</div>
              <div className="text-sm text-gray-600">Total Canchas</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-2xl font-bold text-green-600">
                {canchas.filter(c => c.disponible).length}
              </div>
              <div className="text-sm text-gray-600">Disponibles</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-2xl font-bold text-red-600">
                {canchas.filter(c => !c.disponible).length}
              </div>
              <div className="text-sm text-gray-600">No Disponibles</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-2xl font-bold text-purple-600">{deportes.length}</div>
              <div className="text-sm text-gray-600">Deportes</div>
            </div>
          </div>
        </div>

        {/* Canchas List */}
        {filteredCanchas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No se encontraron canchas
            </h3>
            <p className="text-gray-600 mb-4">
              {canchas.length === 0 
                ? 'Aún no hay canchas registradas en el sistema.'
                : 'No hay canchas que coincidan con los filtros aplicados.'
              }
            </p>
            {canchas.length === 0 && (
              <Link
                to="/administracion/agregar"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Agregar Primera Cancha
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCanchas.map((cancha) => (
              <div key={cancha.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cancha.imagenes && cancha.imagenes.length > 0 
                      ? cancha.imagenes[0] 
                      : 'https://via.placeholder.com/400x300?text=Sin+Imagen'
                    }
                    alt={cancha.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Error+Imagen';
                    }}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {cancha.deporte}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cancha.disponible 
                        ? 'bg-green-600 text-white' 
                        : 'bg-red-600 text-white'
                    }`}>
                      {cancha.disponible ? 'Disponible' : 'Ocupada'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {cancha.nombre}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {cancha.descripcion || 'Sin descripción'}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{cancha.ubicacion}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="font-semibold text-green-600">${cancha.precioPorHora?.toLocaleString()}/hora</span>
                    </div>

                    {cancha.horario && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="truncate">{cancha.horario}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Link
                        to={`/detalle/${cancha.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        Ver
                      </Link>
                      <Link
                        to={`/administracion/editar/${cancha.id}`}
                        className="bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700 transition-colors"
                      >
                        Editar
                      </Link>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleToggleDisponibilidad(cancha.id)}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          cancha.disponible
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {cancha.disponible ? 'Ocupar' : 'Liberar'}
                      </button>
                      <button
                        onClick={() => handleDelete(cancha.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListadoCanchas;
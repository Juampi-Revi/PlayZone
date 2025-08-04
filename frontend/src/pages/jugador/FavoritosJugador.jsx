import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavoritos } from '../../hooks/useFavoritos';

const FavoritosJugador = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    favoritos, 
    loading, 
    error, 
    removerFavorito, 
    actualizarNotas 
  } = useFavoritos();

  const [filterDeporte, setFilterDeporte] = useState('');
  const [sortBy, setSortBy] = useState('fecha');
  const [editingNotas, setEditingNotas] = useState(null);
  const [nuevasNotas, setNuevasNotas] = useState('');

  // Obtener deportes únicos de los favoritos
  const deportesUnicos = [...new Set(favoritos.map(f => f.cancha.deporte))];

  // Filtrar y ordenar favoritos
  const favoritosFiltrados = favoritos
    .filter(favorito => 
      filterDeporte === '' || favorito.cancha.deporte === filterDeporte
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'nombre':
          return a.cancha.nombre.localeCompare(b.cancha.nombre);
        case 'precio':
          return a.cancha.precioPorHora - b.cancha.precioPorHora;
        case 'fecha':
        default:
          return new Date(b.fechaAgregado) - new Date(a.fechaAgregado);
      }
    });

  const handleEliminarFavorito = async (canchaId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta cancha de tus favoritos?')) {
      const resultado = await removerFavorito(canchaId);
      if (resultado.success) {
        // El hook ya actualiza la lista automáticamente
      }
    }
  };

  const handleReservar = (canchaId) => {
    navigate(`/cancha/${canchaId}`);
  };

  const handleEditarNotas = (favorito) => {
    setEditingNotas(favorito.id);
    setNuevasNotas(favorito.notas || '');
  };

  const handleGuardarNotas = async (canchaId) => {
    const resultado = await actualizarNotas(canchaId, nuevasNotas);
    if (resultado.success) {
      setEditingNotas(null);
      setNuevasNotas('');
    }
  };

  const handleCancelarEdicion = () => {
    setEditingNotas(null);
    setNuevasNotas('');
  };

  if (loading && favoritos.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mis Favoritos</h1>
            <p className="text-gray-600 mt-1">
              Tus canchas favoritas ({favoritos.length} canchas)
            </p>
          </div>
          <button
            onClick={() => navigate('/buscar-canchas')}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Buscar Más Canchas
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filtrar por Deporte
            </label>
            <select
              value={filterDeporte}
              onChange={(e) => setFilterDeporte(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="">Todos los deportes</option>
              {deportesUnicos.map(deporte => (
                <option key={deporte} value={deporte}>{deporte}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ordenar por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              <option value="fecha">Fecha agregado</option>
              <option value="nombre">Nombre</option>
              <option value="precio">Precio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Favoritos */}
      {favoritosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritosFiltrados.map((favorito) => (
            <div key={favorito.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Imagen de la cancha */}
              <div className="h-48 bg-gray-200 relative">
                {favorito.cancha.imagenes && favorito.cancha.imagenes.length > 0 ? (
                  <img
                    src={favorito.cancha.imagenes[0]}
                    alt={favorito.cancha.nombre}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => handleEliminarFavorito(favorito.cancha.id)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    title="Eliminar de favoritos"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Información de la cancha */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{favorito.cancha.nombre}</h3>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium">
                    {favorito.cancha.deporte}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-3">{favorito.cancha.descripcion}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {favorito.cancha.ubicacion}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    ${favorito.cancha.precioPorHora}/hora
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Agregado: {new Date(favorito.fechaAgregado).toLocaleDateString()}
                  </div>
                </div>

                {/* Notas */}
                {editingNotas === favorito.id ? (
                  <div className="mb-4">
                    <textarea
                      value={nuevasNotas}
                      onChange={(e) => setNuevasNotas(e.target.value)}
                      placeholder="Agregar notas sobre esta cancha..."
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 text-sm"
                      rows="2"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleGuardarNotas(favorito.cancha.id)}
                        className="px-3 py-1 bg-emerald-500 text-white rounded text-sm hover:bg-emerald-600 transition-colors"
                      >
                        Guardar
                      </button>
                      <button
                        onClick={handleCancelarEdicion}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    {favorito.notas ? (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-700">{favorito.notas}</p>
                        <button
                          onClick={() => handleEditarNotas(favorito)}
                          className="text-emerald-600 text-xs hover:text-emerald-800 mt-1"
                        >
                          Editar notas
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEditarNotas(favorito)}
                        className="text-emerald-600 text-sm hover:text-emerald-800"
                      >
                        + Agregar notas
                      </button>
                    )}
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleReservar(favorito.cancha.id)}
                    className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors text-sm font-medium"
                  >
                    Reservar
                  </button>
                  <button
                    onClick={() => navigate(`/cancha/${favorito.cancha.id}`)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes favoritos aún</h3>
          <p className="text-gray-600 mb-6">
            {filterDeporte 
              ? `No tienes canchas de ${filterDeporte} en tus favoritos`
              : 'Comienza agregando canchas a tus favoritos para tenerlas a mano'
            }
          </p>
          <button
            onClick={() => navigate('/buscar-canchas')}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium"
          >
            Buscar Canchas
          </button>
        </div>
      )}
    </div>
  );
};

export default FavoritosJugador;
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardCancha from '../components/CardCancha';

const BuscarCanchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [deportes, setDeportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filtros
  const [filtroDeporte, setFiltroDeporte] = useState('');
  const [filtroDisponible, setFiltroDisponible] = useState('');
  const [filtroPrecio, setFiltroPrecio] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('nombre');

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

  // Filtrar y ordenar canchas
  const canchasFiltradas = canchas
    .filter(cancha => {
      const matchesDeporte = !filtroDeporte || cancha.deporte === filtroDeporte;
      const matchesDisponible = !filtroDisponible || 
        (filtroDisponible === 'disponible' && cancha.disponible) ||
        (filtroDisponible === 'no-disponible' && !cancha.disponible);
      const matchesPrecio = !filtroPrecio || 
        (filtroPrecio === 'bajo' && cancha.precioPorHora <= 50) ||
        (filtroPrecio === 'medio' && cancha.precioPorHora > 50 && cancha.precioPorHora <= 100) ||
        (filtroPrecio === 'alto' && cancha.precioPorHora > 100);
      const matchesBusqueda = !busqueda || 
        cancha.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        cancha.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
        cancha.deporte.toLowerCase().includes(busqueda.toLowerCase());
      
      return matchesDeporte && matchesDisponible && matchesPrecio && matchesBusqueda;
    })
    .sort((a, b) => {
      switch (ordenarPor) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'precio-asc':
          return a.precioPorHora - b.precioPorHora;
        case 'precio-desc':
          return b.precioPorHora - a.precioPorHora;
        case 'deporte':
          return a.deporte.localeCompare(b.deporte);
        default:
          return 0;
      }
    });

  const limpiarFiltros = () => {
    setFiltroDeporte('');
    setFiltroDisponible('');
    setFiltroPrecio('');
    setBusqueda('');
    setOrdenarPor('nombre');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Buscando canchas deportivas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Encuentra tu Cancha Ideal
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Descubre las mejores canchas deportivas cerca de ti. Reserva fácilmente y disfruta de tu deporte favorito.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por nombre, ubicación o deporte..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-6 py-4 text-gray-800 rounded-lg text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:mb-0">
              Filtros y Ordenamiento
            </h2>
            <button
              onClick={limpiarFiltros}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Limpiar Filtros</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro Deporte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deporte
              </label>
              <select
                value={filtroDeporte}
                onChange={(e) => setFiltroDeporte(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los deportes</option>
                {deportes.map(deporte => (
                  <option key={deporte} value={deporte}>{deporte}</option>
                ))}
              </select>
            </div>

            {/* Filtro Disponibilidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidad
              </label>
              <select
                value={filtroDisponible}
                onChange={(e) => setFiltroDisponible(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas</option>
                <option value="disponible">Solo disponibles</option>
                <option value="no-disponible">Solo ocupadas</option>
              </select>
            </div>

            {/* Filtro Precio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Precio
              </label>
              <select
                value={filtroPrecio}
                onChange={(e) => setFiltroPrecio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los precios</option>
                <option value="bajo">Hasta $50/hora</option>
                <option value="medio">$51 - $100/hora</option>
                <option value="alto">Más de $100/hora</option>
              </select>
            </div>

            {/* Ordenamiento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ordenar por
              </label>
              <select
                value={ordenarPor}
                onChange={(e) => setOrdenarPor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="nombre">Nombre A-Z</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="deporte">Deporte</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{canchas.length}</div>
            <div className="text-gray-600">Total Canchas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {canchas.filter(c => c.disponible).length}
            </div>
            <div className="text-gray-600">Disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{deportes.length}</div>
            <div className="text-gray-600">Deportes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{canchasFiltradas.length}</div>
            <div className="text-gray-600">Resultados</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Results */}
        {canchasFiltradas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No se encontraron canchas
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {canchas.length === 0 
                ? 'Aún no hay canchas registradas en el sistema.'
                : 'No hay canchas que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.'
              }
            </p>
            {canchas.length === 0 ? (
              <button
                onClick={() => window.location.href = '/administracion/agregar'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Agregar Primera Cancha
              </button>
            ) : (
              <button
                onClick={limpiarFiltros}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
                Canchas Encontradas ({canchasFiltradas.length})
              </h3>
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Vista:</span>
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Tarjetas
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300">
                  Lista
                </button>
              </div>
            </div>

            {/* Canchas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {canchasFiltradas.map((cancha) => (
                <CardCancha key={cancha.id} cancha={cancha} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuscarCanchas; 
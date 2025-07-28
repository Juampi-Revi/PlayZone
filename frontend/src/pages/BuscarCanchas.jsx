import axios from 'axios';
import { useEffect, useState } from 'react';
import CardCancha from '../components/CardCancha';
import { useAuth } from '../context/AuthContext';

const BuscarCanchas = () => {
  const [courts, setCourts] = useState([]);
  const [sports, setSports] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [sportFilter, setSportFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('nombre');

  const { user } = useAuth();

  useEffect(() => {
    fetchCourts();
    fetchSports();
    fetchLocations();
  }, []);

  const fetchCourts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8082/api/canchas');
      setCourts(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching courts:', err);
      setError('Error al cargar las canchas');
    } finally {
      setLoading(false);
    }
  };

  const fetchSports = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/canchas/deportes');
      setSports(response.data);
    } catch (err) {
      console.error('Error fetching sports:', err);
    }
  };

  const fetchLocations = async () => {
    try {
      // Extract unique locations from courts data
      const response = await axios.get('http://localhost:8082/api/canchas');
      const courtsData = response.data;
      
      // Extract unique cities, provinces, and countries
      const uniqueCities = [...new Set(courtsData.map(court => court.ciudad).filter(Boolean))];
      const uniqueProvinces = [...new Set(courtsData.map(court => court.provincia).filter(Boolean))];
      const uniqueCountries = [...new Set(courtsData.map(court => court.pais).filter(Boolean))];
      
      setCities(uniqueCities);
      setProvinces(uniqueProvinces);
      setCountries(uniqueCountries);
    } catch (err) {
      console.error('Error fetching locations:', err);
    }
  };

  // Filter and sort courts
  const filteredCourts = courts
    .filter(court => {
      const matchesSport = !sportFilter || court.deporte === sportFilter;
      const matchesAvailability = !availabilityFilter || 
        (availabilityFilter === 'disponible' && court.disponible) ||
        (availabilityFilter === 'no-disponible' && !court.disponible);
      const matchesPrice = !priceFilter || 
        (priceFilter === 'bajo' && court.precioPorHora <= 50) ||
        (priceFilter === 'medio' && court.precioPorHora > 50 && court.precioPorHora <= 100) ||
        (priceFilter === 'alto' && court.precioPorHora > 100);
      const matchesCity = !cityFilter || court.ciudad === cityFilter;
      const matchesProvince = !provinceFilter || court.provincia === provinceFilter;
      const matchesCountry = !countryFilter || court.pais === countryFilter;
      const matchesSearch = !searchQuery || 
        court.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.ubicacion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        court.deporte.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (court.ciudad && court.ciudad.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (court.provincia && court.provincia.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (court.pais && court.pais.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesSport && matchesAvailability && matchesPrice && 
             matchesCity && matchesProvince && matchesCountry && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'precio-asc':
          return a.precioPorHora - b.precioPorHora;
        case 'precio-desc':
          return b.precioPorHora - a.precioPorHora;
        case 'deporte':
          return a.deporte.localeCompare(b.deporte);
        case 'ubicacion':
          return a.ubicacion.localeCompare(b.ubicacion);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSportFilter('');
    setAvailabilityFilter('');
    setPriceFilter('');
    setCityFilter('');
    setProvinceFilter('');
    setCountryFilter('');
    setSearchQuery('');
    setSortBy('nombre');
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
              onClick={clearFilters}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Limpiar Filtros</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {/* Filtro Deporte */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deporte
              </label>
              <select
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los deportes</option>
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            {/* Filtro País */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                País
              </label>
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos los países</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            {/* Filtro Provincia */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provincia
              </label>
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las provincias</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            {/* Filtro Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad
              </label>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todas las ciudades</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Filtro Disponibilidad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Disponibilidad
              </label>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
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
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
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
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="nombre">Nombre A-Z</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="deporte">Deporte</option>
                <option value="ubicacion">Ubicación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{courts.length}</div>
            <div className="text-gray-600">Total Canchas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {courts.filter(c => c.disponible).length}
            </div>
            <div className="text-gray-600">Disponibles</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{sports.length}</div>
            <div className="text-gray-600">Deportes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{filteredCourts.length}</div>
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
        {filteredCourts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              No se encontraron canchas
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {courts.length === 0 
                ? 'Aún no hay canchas registradas en el sistema.'
                : 'No hay canchas que coincidan con los filtros aplicados. Intenta ajustar tus criterios de búsqueda.'
              }
            </p>
            {courts.length === 0 ? (
              <button
                onClick={() => window.location.href = '/administracion/agregar'}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Agregar Primera Cancha
              </button>
            ) : (
              <button
                onClick={clearFilters}
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
                Canchas Encontradas ({filteredCourts.length})
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
              {filteredCourts.map((cancha) => (
                <CardCancha key={cancha.id} cancha={cancha} user={user} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuscarCanchas;
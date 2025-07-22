import axios from 'axios';
import { useEffect, useState } from 'react';
import CardCancha from '../components/CardCancha';

const Home = () => {
  const [canchas, setCanchas] = useState([]);
  const [canchasFiltradas, setCanchasFiltradas] = useState([]);
  const [deportes, setDeportes] = useState([]);
  const [deporteSeleccionado, setDeporteSeleccionado] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCanchas = async () => {
      try {
        setLoading(true);
        const [canchasResponse, deportesResponse] = await Promise.all([
          axios.get('http://localhost:8082/api/canchas'),
          axios.get('http://localhost:8082/api/canchas/deportes')
        ]);
        
        setCanchas(canchasResponse.data);
        setCanchasFiltradas(canchasResponse.data);
        setDeportes(deportesResponse.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar canchas:', err);
        setError('Error al cargar las canchas. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchCanchas();
  }, []);

  const filtrarPorDeporte = (deporte) => {
    setDeporteSeleccionado(deporte);
    if (deporte === '') {
      setCanchasFiltradas(canchas);
    } else {
      const filtradas = canchas.filter(cancha => cancha.deporte === deporte);
      setCanchasFiltradas(filtradas);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando canchas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            ReservApp
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Reserva tu cancha deportiva favorita de forma rápida y fácil
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Reservar Ahora
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Ver Canchas
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Filtrar por Deporte</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => filtrarPorDeporte('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                deporteSeleccionado === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            {deportes.map((deporte) => (
              <button
                key={deporte}
                onClick={() => filtrarPorDeporte(deporte)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  deporteSeleccionado === deporte 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {deporte}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Canchas Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {deporteSeleccionado ? `Canchas de ${deporteSeleccionado}` : 'Todas las Canchas'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra la cancha perfecta para tu deporte favorito y reserva tu horario
          </p>
        </div>

        {canchasFiltradas.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏟️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {deporteSeleccionado ? `No hay canchas de ${deporteSeleccionado}` : 'No hay canchas disponibles'}
            </h3>
            <p className="text-gray-600">
              {deporteSeleccionado 
                ? 'Prueba con otro deporte o contacta al administrador.'
                : 'Por favor, vuelve más tarde o contacta al administrador.'
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {canchasFiltradas.map((cancha) => (
              <CardCancha key={cancha.id} cancha={cancha} />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{canchas.length}</div>
              <div className="text-gray-300">Canchas Disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{deportes.length}</div>
              <div className="text-gray-300">Deportes Diferentes</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{canchas.filter(c => c.disponible).length}</div>
              <div className="text-gray-300">Canchas Libres</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            ¿Eres propietario de canchas?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Únete a nuestra plataforma y gestiona tus canchas de forma profesional
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Registrar Canchas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; 
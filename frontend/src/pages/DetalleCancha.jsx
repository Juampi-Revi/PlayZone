import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import GaleriaImagenes from '../components/GaleriaImagenes';
import FormularioReserva from '../components/FormularioReserva';
import { useAuth } from '../context/AuthContext';

const DetalleCancha = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cancha, setCancha] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormularioReserva, setMostrarFormularioReserva] = useState(false);

  useEffect(() => {
    const fetchCancha = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8082/api/canchas/${id}`);
        setCancha(response.data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar la cancha:', err);
        if (err.response?.status === 404) {
          setError('Cancha no encontrada');
        } else {
          setError('Error al cargar la cancha. Por favor, intenta de nuevo.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCancha();
  }, [id]);

  const handleReservarCancha = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.tipo.toLowerCase() !== 'jugador') {
      alert('Solo los jugadores pueden hacer reservas');
      return;
    }

    setMostrarFormularioReserva(true);
  };

  const cerrarFormularioReserva = () => {
    setMostrarFormularioReserva(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cancha...</p>
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
          <Link 
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  if (!cancha) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🏟️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Cancha no encontrada
          </h2>
          <p className="text-gray-600 mb-4">
            La cancha que buscas no existe o ha sido eliminada.
          </p>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Canchas
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-gray-800 font-medium">
              {cancha.nombre}
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Galería de Imágenes */}
            <div>
              <GaleriaImagenes imagenes={cancha.imagenes} />
            </div>

            {/* Información de la Cancha */}
            <div className="space-y-6">
              <div className="flex space-x-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cancha.deporte}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  cancha.disponible 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {cancha.disponible ? 'Disponible' : 'Ocupada'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800">
                {cancha.nombre}
              </h1>

              <div className="text-gray-600">
                <p className="text-lg leading-relaxed">
                  {cancha.descripcion || 'Sin descripción disponible'}
                </p>
              </div>

              {/* Información Detallada */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-800">Ubicación</h3>
                    <p className="text-gray-600">{cancha.ubicacion}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-gray-800">Precio por Hora</h3>
                    <p className="text-2xl font-bold text-green-600">${cancha.precioPorHora?.toLocaleString()}</p>
                  </div>
                </div>

                {cancha.horario && (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h3 className="font-semibold text-gray-800">Horario</h3>
                      <p className="text-gray-600">{cancha.horario}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="flex space-x-4 pt-6">
                <button 
                  onClick={handleReservarCancha}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    cancha.disponible
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                  disabled={!cancha.disponible}
                >
                  {cancha.disponible ? 'Reservar Cancha' : 'No Disponible'}
                </button>
                <button className="flex-1 border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contactar Propietario
                </button>
              </div>

              {/* Información adicional */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Información Adicional</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Cancha verificada y de calidad profesional</li>
                  <li>• Reservas disponibles 24/7</li>
                  <li>• Cancelación gratuita hasta 24h antes</li>
                  <li>• Soporte técnico disponible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Canchas Relacionadas */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Otras Canchas de {cancha.deporte}
          </h2>
          <div className="text-center py-8 bg-gray-100 rounded-lg">
            <p className="text-gray-600">
              Próximamente: Canchas similares y recomendaciones
            </p>
          </div>
        </div>
      </div>

      {/* Formulario de Reserva Modal */}
      {mostrarFormularioReserva && (
        <FormularioReserva 
          cancha={cancha}
          onClose={cerrarFormularioReserva}
        />
      )}
    </div>
  );
};

export default DetalleCancha;
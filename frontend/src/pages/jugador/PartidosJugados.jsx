import { useState, useEffect } from 'react';

const PartidosJugados = () => {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // todos, pendientes, calificados
  const [modalCalificacion, setModalCalificacion] = useState(null);

  useEffect(() => {
    cargarPartidos();
  }, []);

  const cargarPartidos = async () => {
    try {
      // Aquí harías la llamada a la API para obtener los partidos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPartidos([
        {
          id: 1,
          fecha: '2024-01-20',
          hora: '18:00',
          cancha: 'Cancha Central',
          deporte: 'Fútbol',
          duracion: 90,
          precio: 2500,
          estado: 'completado',
          calificado: false,
          jugadores: ['Juan Pérez', 'Carlos López', 'Ana García'],
          resultado: '3-2'
        },
        {
          id: 2,
          fecha: '2024-01-18',
          hora: '20:00',
          cancha: 'Club Norte',
          deporte: 'Tenis',
          duracion: 60,
          precio: 3000,
          estado: 'completado',
          calificado: true,
          calificaciones: {
            cancha: 5,
            servicio: 4,
            jugadores: 4
          },
          jugadores: ['María Rodríguez'],
          resultado: '6-4, 6-2'
        },
        {
          id: 3,
          fecha: '2024-01-15',
          hora: '16:00',
          cancha: 'Complejo Sur',
          deporte: 'Pádel',
          duracion: 90,
          precio: 2800,
          estado: 'completado',
          calificado: false,
          jugadores: ['Pedro Martín', 'Laura Silva'],
          resultado: '6-3, 4-6, 6-4'
        }
      ]);
    } catch (error) {
      console.error('Error al cargar partidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const partidosFiltrados = partidos.filter(partido => {
    if (filtro === 'pendientes') return !partido.calificado;
    if (filtro === 'calificados') return partido.calificado;
    return true;
  });

  const abrirModalCalificacion = (partido) => {
    setModalCalificacion({
      ...partido,
      calificaciones: {
        cancha: 0,
        servicio: 0,
        jugadores: 0
      },
      comentario: ''
    });
  };

  const cerrarModalCalificacion = () => {
    setModalCalificacion(null);
  };

  const actualizarCalificacion = (tipo, valor) => {
    setModalCalificacion(prev => ({
      ...prev,
      calificaciones: {
        ...prev.calificaciones,
        [tipo]: valor
      }
    }));
  };

  const enviarCalificacion = async () => {
    try {
      // Aquí harías la llamada a la API para enviar la calificación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Actualizar el partido en la lista
      setPartidos(prev => prev.map(partido => 
        partido.id === modalCalificacion.id 
          ? { ...partido, calificado: true, calificaciones: modalCalificacion.calificaciones }
          : partido
      ));
      
      cerrarModalCalificacion();
    } catch (error) {
      console.error('Error al enviar calificación:', error);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderEstrellas = (rating, onRate = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate && onRate(star)}
            className={`text-2xl ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${onRate ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
            disabled={!onRate}
          >
            ⭐
          </button>
        ))}
      </div>
    );
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">⚽</span>
              Partidos Jugados
            </h1>
            <p className="text-gray-600">
              Revisa y califica tus partidos completados
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'todos'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos ({partidos.length})
          </button>
          <button
            onClick={() => setFiltro('pendientes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'pendientes'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pendientes ({partidos.filter(p => !p.calificado).length})
          </button>
          <button
            onClick={() => setFiltro('calificados')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'calificados'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Calificados ({partidos.filter(p => p.calificado).length})
          </button>
        </div>
      </div>

      {/* Lista de partidos */}
      <div className="space-y-4">
        {partidosFiltrados.map((partido) => (
          <div key={partido.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">
                  {partido.deporte === 'Fútbol' ? '⚽' : 
                   partido.deporte === 'Tenis' ? '🎾' : 
                   partido.deporte === 'Pádel' ? '🏓' : '🏀'}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {partido.cancha}
                  </h3>
                  <p className="text-gray-600">
                    {formatearFecha(partido.fecha)} - {partido.hora}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                {partido.calificado ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    ✅ Calificado
                  </span>
                ) : (
                  <button
                    onClick={() => abrirModalCalificacion(partido)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Calificar Partido
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Duración:</span>
                <p className="text-gray-600">{partido.duracion} minutos</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Precio:</span>
                <p className="text-gray-600">${partido.precio}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Resultado:</span>
                <p className="text-gray-600">{partido.resultado}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Jugadores:</span>
                <p className="text-gray-600">{partido.jugadores.join(', ')}</p>
              </div>
            </div>

            {partido.calificado && partido.calificaciones && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">Tu calificación:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Cancha</p>
                    {renderEstrellas(partido.calificaciones.cancha)}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Servicio</p>
                    {renderEstrellas(partido.calificaciones.servicio)}
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Jugadores</p>
                    {renderEstrellas(partido.calificaciones.jugadores)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {partidosFiltrados.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {filtro === 'pendientes' ? 'No hay partidos pendientes de calificar' :
             filtro === 'calificados' ? 'No has calificado ningún partido aún' :
             'No has jugado ningún partido aún'}
          </h3>
          <p className="text-gray-600">
            {filtro === 'todos' ? 'Reserva una cancha y comienza a jugar' : 
             'Completa algunos partidos para poder calificarlos'}
          </p>
        </div>
      )}

      {/* Modal de Calificación */}
      {modalCalificacion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Calificar Partido
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Califica la Cancha</h4>
                {renderEstrellas(
                  modalCalificacion.calificaciones.cancha,
                  (rating) => actualizarCalificacion('cancha', rating)
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Califica el Servicio</h4>
                {renderEstrellas(
                  modalCalificacion.calificaciones.servicio,
                  (rating) => actualizarCalificacion('servicio', rating)
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Califica a los Jugadores</h4>
                {renderEstrellas(
                  modalCalificacion.calificaciones.jugadores,
                  (rating) => actualizarCalificacion('jugadores', rating)
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comentario (opcional)
                </label>
                <textarea
                  value={modalCalificacion.comentario}
                  onChange={(e) => setModalCalificacion(prev => ({
                    ...prev,
                    comentario: e.target.value
                  }))}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Comparte tu experiencia..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cerrarModalCalificacion}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={enviarCalificacion}
                disabled={
                  modalCalificacion.calificaciones.cancha === 0 ||
                  modalCalificacion.calificaciones.servicio === 0 ||
                  modalCalificacion.calificaciones.jugadores === 0
                }
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar Calificación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartidosJugados;
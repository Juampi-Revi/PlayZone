import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const GestionReservas = () => {
  const { user } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: 'todas',
    cancha: 'todas',
    fecha: '',
    busqueda: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const estados = [
    { value: 'todas', label: 'Todas las reservas', color: 'gray' },
    { value: 'confirmada', label: 'Confirmadas', color: 'green' },
    { value: 'pendiente', label: 'Pendientes', color: 'yellow' },
    { value: 'cancelada', label: 'Canceladas', color: 'red' },
    { value: 'completada', label: 'Completadas', color: 'blue' }
  ];

  const canchas = [
    { id: 'todas', nombre: 'Todas las canchas' },
    { id: 1, nombre: 'Cancha de Fútbol 1' },
    { id: 2, nombre: 'Cancha de Fútbol 2' },
    { id: 3, nombre: 'Cancha de Tenis 1' },
    { id: 4, nombre: 'Cancha de Básquet' }
  ];

  useEffect(() => {
    cargarReservas();
  }, [filtros]);

  const cargarReservas = async () => {
    setLoading(true);
    try {
      // Aquí harías la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const reservasEjemplo = [
        {
          id: 1,
          jugador: 'Juan Pérez',
          email: 'juan@email.com',
          telefono: '+54 11 1234-5678',
          cancha: 'Cancha de Fútbol 1',
          fecha: '2024-01-15',
          horaInicio: '14:00',
          horaFin: '15:30',
          duracion: 90,
          precio: 3500,
          estado: 'confirmada',
          fechaReserva: '2024-01-10',
          metodoPago: 'Tarjeta de crédito',
          observaciones: 'Cumpleaños, necesito decoración'
        },
        {
          id: 2,
          jugador: 'María García',
          email: 'maria@email.com',
          telefono: '+54 11 9876-5432',
          cancha: 'Cancha de Tenis 1',
          fecha: '2024-01-15',
          horaInicio: '16:00',
          horaFin: '17:00',
          duracion: 60,
          precio: 2500,
          estado: 'pendiente',
          fechaReserva: '2024-01-12',
          metodoPago: 'Transferencia',
          observaciones: ''
        },
        {
          id: 3,
          jugador: 'Carlos López',
          email: 'carlos@email.com',
          telefono: '+54 11 5555-1234',
          cancha: 'Cancha de Básquet',
          fecha: '2024-01-14',
          horaInicio: '18:00',
          horaFin: '19:30',
          duracion: 90,
          precio: 4000,
          estado: 'cancelada',
          fechaReserva: '2024-01-08',
          metodoPago: 'Efectivo',
          observaciones: 'Cancelado por lluvia'
        }
      ];
      
      setReservas(reservasEjemplo);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarReservas = () => {
    return reservas.filter(reserva => {
      const cumpleFiltroEstado = filtros.estado === 'todas' || reserva.estado === filtros.estado;
      const cumpleFiltroCancha = filtros.cancha === 'todas' || reserva.cancha.includes(filtros.cancha);
      const cumpleFiltroFecha = !filtros.fecha || reserva.fecha === filtros.fecha;
      const cumpleFiltroBusqueda = !filtros.busqueda || 
        reserva.jugador.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        reserva.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
      
      return cumpleFiltroEstado && cumpleFiltroCancha && cumpleFiltroFecha && cumpleFiltroBusqueda;
    });
  };

  const cambiarEstadoReserva = async (reservaId, nuevoEstado) => {
    try {
      // Aquí harías la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReservas(prev => prev.map(reserva => 
        reserva.id === reservaId 
          ? { ...reserva, estado: nuevoEstado }
          : reserva
      ));
      
      setShowModal(false);
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const getEstadoColor = (estado) => {
    const estadoInfo = estados.find(e => e.value === estado);
    return estadoInfo ? estadoInfo.color : 'gray';
  };

  const getEstadoClasses = (color) => {
    const classes = {
      green: 'bg-green-100 text-green-800 border-green-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      gray: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return classes[color] || classes.gray;
  };

  const reservasFiltradas = filtrarReservas();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">📅</span>
          Gestión de Reservas
        </h1>
        <p className="text-gray-600">Administra todas las reservas de tus canchas</p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {estados.slice(1).map((estado) => {
          const count = reservas.filter(r => r.estado === estado.value).length;
          return (
            <div key={estado.value} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{estado.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getEstadoClasses(estado.color)}`}>
                  <span className="text-xl">
                    {estado.value === 'confirmada' && '✅'}
                    {estado.value === 'pendiente' && '⏳'}
                    {estado.value === 'cancelada' && '❌'}
                    {estado.value === 'completada' && '🏆'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estado
            </label>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {estados.map((estado) => (
                <option key={estado.value} value={estado.value}>
                  {estado.label}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cancha
            </label>
            <select
              value={filtros.cancha}
              onChange={(e) => setFiltros(prev => ({ ...prev, cancha: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {canchas.map((cancha) => (
                <option key={cancha.id} value={cancha.id}>
                  {cancha.nombre}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <input
              type="date"
              value={filtros.fecha}
              onChange={(e) => setFiltros(prev => ({ ...prev, fecha: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Buscar
            </label>
            <input
              type="text"
              placeholder="Nombre o email..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Lista de Reservas */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">
            Reservas ({reservasFiltradas.length})
          </h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando reservas...</p>
          </div>
        ) : reservasFiltradas.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No se encontraron reservas con los filtros aplicados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jugador
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cancha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservasFiltradas.map((reserva) => (
                  <tr key={reserva.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {reserva.jugador}
                        </div>
                        <div className="text-sm text-gray-500">
                          {reserva.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reserva.cancha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(reserva.fecha).toLocaleDateString('es-ES')}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reserva.horaInicio} - {reserva.horaFin}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reserva.duracion} min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${reserva.precio.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getEstadoClasses(getEstadoColor(reserva.estado))}`}>
                        {estados.find(e => e.value === reserva.estado)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setSelectedReserva(reserva);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      {showModal && selectedReserva && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Detalles de la Reserva #{selectedReserva.id}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Información del jugador */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Información del Jugador</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Nombre:</strong> {selectedReserva.jugador}</div>
                  <div><strong>Email:</strong> {selectedReserva.email}</div>
                  <div><strong>Teléfono:</strong> {selectedReserva.telefono}</div>
                  <div><strong>Fecha de reserva:</strong> {new Date(selectedReserva.fechaReserva).toLocaleDateString('es-ES')}</div>
                </div>
              </div>
              
              {/* Información de la reserva */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Información de la Reserva</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Cancha:</strong> {selectedReserva.cancha}</div>
                  <div><strong>Fecha:</strong> {new Date(selectedReserva.fecha).toLocaleDateString('es-ES')}</div>
                  <div><strong>Hora:</strong> {selectedReserva.horaInicio} - {selectedReserva.horaFin}</div>
                  <div><strong>Duración:</strong> {selectedReserva.duracion} minutos</div>
                  <div><strong>Precio:</strong> ${selectedReserva.precio.toLocaleString()}</div>
                  <div><strong>Método de pago:</strong> {selectedReserva.metodoPago}</div>
                </div>
              </div>
              
              {/* Observaciones */}
              {selectedReserva.observaciones && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Observaciones</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {selectedReserva.observaciones}
                  </p>
                </div>
              )}
              
              {/* Estado actual */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Estado Actual</h4>
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getEstadoClasses(getEstadoColor(selectedReserva.estado))}`}>
                  {estados.find(e => e.value === selectedReserva.estado)?.label}
                </span>
              </div>
              
              {/* Acciones */}
              <div>
                <h4 className="text-md font-semibold text-gray-800 mb-3">Cambiar Estado</h4>
                <div className="flex flex-wrap gap-2">
                  {estados.slice(1).map((estado) => (
                    <button
                      key={estado.value}
                      onClick={() => cambiarEstadoReserva(selectedReserva.id, estado.value)}
                      disabled={selectedReserva.estado === estado.value}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                        selectedReserva.estado === estado.value
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : `${getEstadoClasses(estado.color)} hover:opacity-80 cursor-pointer`
                      }`}
                    >
                      {estado.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionReservas;
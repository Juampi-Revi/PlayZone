import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useReservas } from '../hooks/useReservas';

const MisReservas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { reservas, loading, error, cancelarReserva } = useReservas();
  
  console.log('MisReservas - User:', user);
  console.log('MisReservas - Reservas:', reservas);
  console.log('MisReservas - Loading:', loading);
  console.log('MisReservas - Error:', error);
  const [filtroEstado, setFiltroEstado] = useState('todas');
  const [ordenarPor, setOrdenarPor] = useState('fecha');

  // Filtrar y ordenar reservas
  const reservasFiltradas = reservas
    .filter(reserva => {
      if (filtroEstado === 'todas') return true;
      if (filtroEstado === 'activas') return reserva.estado === 'CONFIRMADA' && reserva.estadoPago === 'PAGADO';
      if (filtroEstado === 'pendientes') return reserva.estadoPago === 'PENDIENTE';
      if (filtroEstado === 'canceladas') return reserva.estado === 'CANCELADA';
      if (filtroEstado === 'completadas') return reserva.estado === 'COMPLETADA';
      return true;
    })
    .sort((a, b) => {
      if (ordenarPor === 'fecha') {
        return new Date(b.fechaHoraInicio) - new Date(a.fechaHoraInicio);
      }
      if (ordenarPor === 'precio') {
        return b.montoTotal - a.montoTotal;
      }
      if (ordenarPor === 'cancha') {
        return a.cancha.nombre.localeCompare(b.cancha.nombre);
      }
      return 0;
    });

  const handleCancelarReserva = async (reservaId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      const result = await cancelarReserva(reservaId);
      if (result.success) {
        alert('Reserva cancelada exitosamente');
      } else {
        alert(`Error: ${result.message}`);
      }
    }
  };

  const getEstadoColor = (estado, estadoPago) => {
    if (estado === 'CANCELADA') return 'bg-gray-100 text-gray-800';
    if (estado === 'COMPLETADA') return 'bg-green-100 text-green-800';
    if (estadoPago === 'PAGADO') return 'bg-blue-100 text-blue-800';
    if (estadoPago === 'PENDIENTE') return 'bg-yellow-100 text-yellow-800';
    if (estadoPago === 'FALLIDO') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getEstadoTexto = (estado, estadoPago) => {
    if (estado === 'CANCELADA') return 'Cancelada';
    if (estado === 'COMPLETADA') return 'Completada';
    if (estadoPago === 'PAGADO') return 'Pagado';
    if (estadoPago === 'PENDIENTE') return 'Pago Pendiente';
    if (estadoPago === 'FALLIDO') return 'Pago Fallido';
    return estado;
  };

  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatHora = (fecha) => {
    return new Date(fecha).toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    console.log('MisReservas - No hay usuario, redirigiendo a login');
    return <Navigate to="/login" replace />;
  }

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando reservas...</p>
        </div>
      </div>
    );
  }

  if (user.tipo.toLowerCase() === 'club') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Gestión de Reservas</h1>
              <p className="text-xl text-gray-600">Administra las reservas de tus canchas</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-6">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Club en Desarrollo</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Pronto podrás ver y gestionar todas las reservas de tus canchas desde aquí.
              </p>
              <div className="space-y-4">
                <Link 
                  to="/administracion" 
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Ir a Administración
                </Link>
                <div className="text-sm text-gray-500">
                  Mientras tanto, puedes gestionar tus canchas desde el panel de administración
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Reservas</h1>
            <p className="text-xl text-gray-600">Gestiona tus reservas de canchas deportivas</p>
          </div>

          {/* Filtros y Ordenamiento */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filtrar por Estado
                </label>
                <select
                  value={filtroEstado}
                  onChange={(e) => setFiltroEstado(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todas">Todas las reservas</option>
                  <option value="activas">Reservas activas</option>
                  <option value="pendientes">Pago pendiente</option>
                  <option value="canceladas">Canceladas</option>
                  <option value="completadas">Completadas</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={ordenarPor}
                  onChange={(e) => setOrdenarPor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fecha">Fecha más reciente</option>
                  <option value="precio">Precio más alto</option>
                  <option value="cancha">Nombre de cancha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Cargando tus reservas...</p>
            </div>
          )}

          {/* Sin Reservas */}
          {!loading && reservasFiltradas.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 mb-6">
                <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {reservas.length === 0 ? 'No tienes reservas aún' : 'No hay reservas con ese filtro'}
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                {reservas.length === 0 
                  ? 'Comienza a reservar canchas para tus actividades deportivas.'
                  : 'Intenta cambiar los filtros para ver más reservas.'
                }
              </p>
              <Link 
                to="/buscar-canchas" 
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Buscar Canchas
              </Link>
            </div>
          )}

          {/* Lista de Reservas */}
          {!loading && reservasFiltradas.length > 0 && (
            <div className="space-y-6">
              {reservasFiltradas.map((reserva) => (
                <div key={reserva.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Información Principal */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {reserva.cancha?.nombre || 'Cancha no disponible'}
                          </h3>
                          <p className="text-gray-600 mb-1">
                            {reserva.cancha?.deporte} • {reserva.cancha?.ubicacion}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFecha(reserva.fechaHoraInicio)} • {formatHora(reserva.fechaHoraInicio)} - {formatHora(reserva.fechaHoraFin)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(reserva.estado, reserva.estadoPago)}`}>
                          {getEstadoTexto(reserva.estado, reserva.estadoPago)}
                        </span>
                      </div>

                      {/* Detalles */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Duración:</span>
                          <p className="font-medium">
                            {Math.round((new Date(reserva.fechaHoraFin) - new Date(reserva.fechaHoraInicio)) / (1000 * 60))} minutos
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500">Precio por hora:</span>
                          <p className="font-medium">${reserva.cancha?.precioPorHora?.toLocaleString('es-AR')}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Total:</span>
                          <p className="font-medium text-lg text-blue-600">${reserva.montoTotal?.toLocaleString('es-AR')}</p>
                        </div>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-2">
                      {reserva.estadoPago === 'PENDIENTE' && reserva.estado !== 'CANCELADA' && (
                        <button
                          onClick={() => navigate(`/pagar-reserva/${reserva.id}`)}
                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium"
                        >
                          Pagar Ahora
                        </button>
                      )}
                      
                      {reserva.estado !== 'CANCELADA' && reserva.estado !== 'COMPLETADA' && (
                        <button
                          onClick={() => handleCancelarReserva(reserva.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
                        >
                          Cancelar
                        </button>
                      )}

                      <button
                        onClick={() => navigate(`/detalle-cancha/${reserva.cancha?.id}`)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
                      >
                        Ver Cancha
                      </button>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                    Reserva creada el {formatFecha(reserva.fechaCreacion)} • ID: {reserva.id}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botón Nueva Reserva */}
          <div className="mt-8 text-center">
            <Link 
              to="/buscar-canchas" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Hacer Nueva Reserva
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MisReservas;
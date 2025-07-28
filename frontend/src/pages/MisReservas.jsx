import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const MisReservas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && user.tipo.toLowerCase() === 'jugador') {
      fetchReservas();
    }
  }, [user]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get('/api/reservas');
      setReservas(response.data);
    } catch (error) {
      console.error('Error cargando reservas:', error);
      setError('Error al cargar las reservas');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarReserva = async (reservaId) => {
    if (window.confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      try {
        await axios.delete(`/api/reservas/${reservaId}`);
        setReservas(reservas.filter(r => r.id !== reservaId));
      } catch (error) {
        console.error('Error cancelando reserva:', error);
        alert('Error al cancelar la reserva');
      }
    }
  };

  const getEstadoColor = (estado, estadoPago) => {
    if (estadoPago === 'PAGADO') return 'bg-green-100 text-green-800';
    if (estadoPago === 'PENDIENTE') return 'bg-yellow-100 text-yellow-800';
    if (estadoPago === 'FALLIDO') return 'bg-red-100 text-red-800';
    if (estado === 'CANCELADA') return 'bg-gray-100 text-gray-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getEstadoTexto = (estado, estadoPago) => {
    if (estadoPago === 'PAGADO') return 'Pagado';
    if (estadoPago === 'PENDIENTE') return 'Pago Pendiente';
    if (estadoPago === 'FALLIDO') return 'Pago Fallido';
    if (estado === 'CANCELADA') return 'Cancelada';
    return estado;
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.tipo.toLowerCase() === 'jugador') {
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando tus reservas...</p>
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
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Reservas</h1>
              <p className="text-xl text-gray-600">Gestiona tus reservas de canchas deportivas</p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {reservas.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="text-gray-400 text-6xl mb-6">📅</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">No tienes reservas aún</h2>
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  Comienza a reservar canchas para tus actividades deportivas.
                </p>
                <Link 
                  to="/canchas" 
                  className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Buscar Canchas
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {reservas.map((reserva) => (
                  <div key={reserva.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">{reserva.canchaNombre}</h3>
                            <p className="text-gray-600">{reserva.canchaDeporte} • {reserva.canchaUbicacion}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(reserva.estado, reserva.estadoPago)}`}>
                            {getEstadoTexto(reserva.estado, reserva.estadoPago)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Fecha:</span>
                            <p className="font-medium">
                              {new Date(reserva.fechaInicio).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Horario:</span>
                            <p className="font-medium">
                              {new Date(reserva.fechaInicio).toLocaleTimeString('es-AR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} - {new Date(reserva.fechaFin).toLocaleTimeString('es-AR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Total:</span>
                            <p className="font-medium text-lg">${reserva.montoTotal?.toLocaleString('es-AR')}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row gap-2">
                        {reserva.estadoPago === 'PENDIENTE' && reserva.estado !== 'CANCELADA' && (
                          <button
                            onClick={() => navigate(`/pagar/${reserva.id}`)}
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
                          onClick={() => navigate(`/detalle/${reserva.canchaId}`)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors font-medium"
                        >
                          Ver Cancha
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                      Reserva creada el {new Date(reserva.fechaCreacion).toLocaleDateString('es-AR')} • ID: {reserva.id}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <Link 
                to="/canchas" 
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Hacer Nueva Reserva
              </Link>
            </div>
          </div>
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
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Mis Canchas y Turnos</h1>
              <p className="text-xl text-gray-600">Gestiona tus canchas, turnos y reservas de tus clientes</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-400 text-6xl mb-6">🏟️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Panel de Club en Desarrollo</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Pronto podrás ver tus canchas, horarios ocupados/libres y administrar reservas.
              </p>
              <div className="space-y-4">
                <Link to="/administracion" className="inline-block bg-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">Ir a Administración</Link>
                <div className="text-sm text-gray-500">Mientras tanto, puedes gestionar tus canchas desde el panel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MisReservas;
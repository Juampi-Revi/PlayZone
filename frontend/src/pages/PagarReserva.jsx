import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from '../components/StripeCheckout';

const PagarReserva = () => {
  const { reservaId } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`/api/reservas/${reservaId}`);
        if (response.data.success) {
          setReserva(response.data.reserva);
        } else {
          setError('No se pudo cargar la información de la reserva');
        }
      } catch (error) {
        console.error('Error cargando reserva:', error);
        setError('Error al cargar la reserva');
      } finally {
        setLoading(false);
      }
    };

    if (reservaId) {
      fetchReserva();
    }
  }, [reservaId]);

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Confirmar el pago en el backend
      await axios.post('/api/pagos/confirm-payment', {
        paymentIntentId: paymentIntent.id,
        reservaId: reservaId
      });

      setPaymentSuccess(true);
      
      // Redirigir a mis reservas después de 3 segundos
      setTimeout(() => {
        navigate('/mis-reservas');
      }, 3000);
    } catch (error) {
      console.error('Error confirmando pago:', error);
      setError('Error al confirmar el pago. Contacta con soporte.');
    }
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información de la reserva...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/mis-reservas')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver a Mis Reservas
          </button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-green-500 text-5xl mb-4">✅</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-600 mb-4">
            Tu reserva ha sido confirmada y el pago procesado correctamente.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Serás redirigido a tus reservas en unos segundos...
          </p>
          <button
            onClick={() => navigate('/mis-reservas')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Ver Mis Reservas
          </button>
        </div>
      </div>
    );
  }

  if (!reserva) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Reserva no encontrada</h2>
          <p className="text-gray-600 mb-4">
            No se pudo encontrar la información de la reserva.
          </p>
          <button
            onClick={() => navigate('/mis-reservas')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver a Mis Reservas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Completar Pago</h1>
          <p className="text-gray-600">Finaliza tu reserva completando el pago</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información de la Reserva */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Detalles de la Reserva</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800">{reserva.canchaNombre}</h3>
                <p className="text-gray-600">{reserva.canchaDeporte}</p>
                <p className="text-gray-600">{reserva.canchaUbicacion}</p>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Fecha y Hora:</span>
                  <span className="font-medium">
                    {new Date(reserva.fechaInicio).toLocaleDateString('es-AR')}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Hora de inicio:</span>
                  <span className="font-medium">
                    {new Date(reserva.fechaInicio).toLocaleTimeString('es-AR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Hora de fin:</span>
                  <span className="font-medium">
                    {new Date(reserva.fechaFin).toLocaleTimeString('es-AR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">
                    {Math.round((new Date(reserva.fechaFin) - new Date(reserva.fechaInicio)) / (1000 * 60 * 60))} hora(s)
                  </span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Precio por hora:</span>
                  <span className="font-medium">${reserva.canchaPrecioPorHora?.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">${reserva.montoTotal?.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Estado:</strong> {reserva.estado} - {reserva.estadoPago}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Reserva ID: {reserva.id}
                </p>
              </div>
            </div>
          </div>

          {/* Formulario de Pago */}
          <div>
            <StripeCheckout
              reservaId={reserva.id}
              montoTotal={reserva.montoTotal}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/mis-reservas')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Volver a Mis Reservas
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagarReserva;
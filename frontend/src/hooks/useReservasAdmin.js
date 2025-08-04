import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';


export const useReservasAdmin = () => {
  const { user, token } = useAuth();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuración de axios con token
  const api = axios.create({
    
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Obtener todas las reservas (admin)
  const getReservasAdmin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/api/reservas/admin/todas');
      if (response.data.success) {
        setReservas(response.data.data || []);
        return { success: true, data: response.data.data };
      } else {
        setError(response.data.message || 'Error al cargar reservas');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      console.error('Error cargando reservas:', err);
      const errorMessage = err.response?.data?.message || 'Error al cargar reservas';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Confirmar reserva
  const confirmarReserva = async (reservaId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.patch(`/api/reservas/${reservaId}/confirmar`);
      if (response.data.success) {
        // Recargar reservas
        await getReservasAdmin();
        return { success: true, data: response.data };
      } else {
        setError(response.data.message || 'Error al confirmar reserva');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      console.error('Error confirmando reserva:', err);
      const errorMessage = err.response?.data?.message || 'Error al confirmar reserva';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Completar reserva
  const completarReserva = async (reservaId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.patch(`/api/reservas/${reservaId}/completar`);
      if (response.data.success) {
        // Recargar reservas
        await getReservasAdmin();
        return { success: true, data: response.data };
      } else {
        setError(response.data.message || 'Error al completar reserva');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      console.error('Error completando reserva:', err);
      const errorMessage = err.response?.data?.message || 'Error al completar reserva';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cancelar reserva
  const cancelReserva = async (reservaId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/api/reservas/${reservaId}`);
      if (response.data.success) {
        // Recargar reservas
        await getReservasAdmin();
        return { success: true, data: response.data };
      } else {
        setError(response.data.message || 'Error al cancelar reserva');
        return { success: false, error: response.data.message };
      }
    } catch (err) {
      console.error('Error cancelando reserva:', err);
      const errorMessage = err.response?.data?.message || 'Error al cancelar reserva';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Limpiar error
  const clearError = () => setError(null);

  return {
    reservas,
    loading,
    error,
    getReservasAdmin,
    confirmarReserva,
    completarReserva,
    cancelReserva,
    clearError
  };
}; 
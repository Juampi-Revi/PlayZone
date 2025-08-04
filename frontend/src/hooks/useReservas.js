import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


export const useReservas = () => {
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

  // Cargar reservas del usuario
  const cargarReservas = async () => {
    console.log('useReservas - cargarReservas iniciado');
    if (!token) {
      console.log('useReservas - No hay token disponible');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('useReservas - Haciendo petición a /api/reservas/mis-reservas');
      const response = await api.get('/api/reservas/mis-reservas');
      console.log('useReservas - Respuesta recibida:', response.data);
      if (response.data.success) {
        setReservas(response.data.reservas || []);
        console.log('useReservas - Reservas cargadas:', response.data.reservas);
      } else {
        setError(response.data.message || 'Error al cargar reservas');
        console.log('useReservas - Error en respuesta:', response.data.message);
      }
    } catch (err) {
      console.error('useReservas - Error cargando reservas:', err);
      setError(err.response?.data?.message || 'Error al cargar reservas');
    } finally {
      setLoading(false);
      console.log('useReservas - Carga completada');
    }
  };

  // Cancelar reserva
  const cancelarReserva = async (reservaId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/api/reservas/${reservaId}`);
      if (response.data.success) {
        // Actualizar la lista de reservas
        setReservas(prevReservas => prevReservas.filter(r => r.id !== reservaId));
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al cancelar reserva');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error cancelando reserva:', err);
      const errorMessage = err.response?.data?.message || 'Error al cancelar reserva';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cargar reservas al inicializar
  useEffect(() => {
    cargarReservas();
  }, [token]);

  return {
    reservas,
    loading,
    error,
    cargarReservas,
    cancelarReserva
  };
};
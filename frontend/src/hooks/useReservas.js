import { useState } from 'react';
import axios from 'axios';

export const useReservasAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllReservas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/reservas');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener reservas');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener reservas' };
    }
  };

  const getMisReservas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/reservas/mis-reservas');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener mis reservas');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener mis reservas' };
    }
  };

  const createReserva = async (reservaData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/reservas', reservaData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear reserva');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al crear reserva' };
    }
  };

  const cancelReserva = async (reservaId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/reservas/${reservaId}/cancelar`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cancelar reserva');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al cancelar reserva' };
    }
  };

  const getHorariosDisponibles = async (canchaId, fecha) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/reservas/horarios-disponibles/${canchaId}?fecha=${fecha}`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener horarios disponibles');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener horarios disponibles' };
    }
  };

  return {
    getAllReservas,
    getMisReservas,
    createReserva,
    cancelReserva,
    getHorariosDisponibles,
    loading,
    error,
    clearError: () => setError(null)
  };
};
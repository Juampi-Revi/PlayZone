import { useState } from 'react';
import axios from 'axios';

export const useCalendarioMaestroAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCalendarioMaestro = async (clubId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/calendario-maestro/club/${clubId}`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener calendario maestro');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener calendario maestro' };
    }
  };

  const getConfiguracionesPorDeporte = async (clubId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/calendario-maestro/configuraciones/club/${clubId}`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener configuraciones por deporte');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener configuraciones por deporte' };
    }
  };

  const getEstadisticasCalendario = async (clubId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/calendario-maestro/estadisticas/club/${clubId}`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener estadísticas del calendario');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener estadísticas del calendario' };
    }
  };

  return {
    getCalendarioMaestro,
    getConfiguracionesPorDeporte,
    getEstadisticasCalendario,
    loading,
    error,
    clearError: () => setError(null)
  };
};
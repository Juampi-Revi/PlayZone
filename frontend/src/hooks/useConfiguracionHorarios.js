import { useState } from 'react';
import axios from 'axios';

export const useConfiguracionHorariosAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setError(null);

  const getConfiguracion = async (canchaId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/configuracion-horarios/cancha/${canchaId}`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al obtener configuración';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const saveConfiguracion = async (canchaId, configuracionData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`/api/configuracion-horarios/cancha/${canchaId}`, configuracionData);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al guardar configuración';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const createConfiguracionPorDefecto = async (canchaId) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post(`/api/configuracion-horarios/cancha/${canchaId}/por-defecto`);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear configuración por defecto';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  const getHorariosDisponibles = async (canchaId, fecha) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/api/configuracion-horarios/cancha/${canchaId}/horarios-disponibles`, {
        params: { fecha }
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al obtener horarios disponibles';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    clearError,
    getConfiguracion,
    saveConfiguracion,
    createConfiguracionPorDefecto,
    getHorariosDisponibles
  };
};
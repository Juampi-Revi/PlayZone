import { useState } from 'react';
import axios from 'axios';

export const useAuthAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el login');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error en el login' };
    }
  };

  const register = async (nombre, email, password, tipo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', { nombre, email, password, tipo });
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error en el registro' };
    }
  };

  const getMe = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/auth/me');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener usuario');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener usuario' };
    }
  };

  return {
    login,
    register,
    getMe,
    loading,
    error,
    clearError: () => setError(null)
  };
};
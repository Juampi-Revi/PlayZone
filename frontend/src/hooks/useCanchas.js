import { useState } from 'react';
import axios from 'axios';

export const useCanchasAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMisCanchas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/configuracion-horarios/mis-canchas');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener canchas');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener canchas' };
    }
  };

  const getAllCanchas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/canchas');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener canchas');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener canchas' };
    }
  };

  const createCancha = async (canchaData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/canchas', canchaData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear cancha');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al crear cancha' };
    }
  };

  const createCanchaAdmin = async (canchaData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/canchas/admin', canchaData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear cancha');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al crear cancha' };
    }
  };

  const deleteCancha = async (canchaId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/canchas/${canchaId}`);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar cancha');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al eliminar cancha' };
    }
  };

  const toggleDisponibilidad = async (canchaId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/canchas/${canchaId}/toggle-disponibilidad`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar disponibilidad');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al cambiar disponibilidad' };
    }
  };

  const getCanchaById = async (canchaId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/canchas/${canchaId}`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener cancha');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener cancha' };
    }
  };

  const updateCancha = async (canchaId, canchaData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/canchas/admin/${canchaId}`, canchaData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar cancha');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al actualizar cancha' };
    }
  };

  const getDeportes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/canchas/deportes');
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener deportes');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener deportes' };
    }
  };

  return {
    getMisCanchas,
    getAllCanchas,
    createCancha,
    createCanchaAdmin,
    updateCancha,
    deleteCancha,
    toggleDisponibilidad,
    getCanchaById,
    getDeportes,
    loading,
    error,
    clearError: () => setError(null)
  };
};
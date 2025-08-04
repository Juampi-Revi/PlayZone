import axios from 'axios';
import { useState } from 'react';


export const useClubAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMiClub = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/clubes/mi-club`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener club');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener club' };
    }
  };

  const createClub = async (clubData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/clubes`, clubData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear club');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al crear club' };
    }
  };

  const updateClub = async (clubId, clubData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/clubes/${clubId}`, clubData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar club');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al actualizar club' };
    }
  };

  const getAllClubes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/clubes`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener clubes');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener clubes' };
    }
  };

  return {
    getMiClub,
    createClub,
    updateClub,
    getAllClubes,
    loading,
    error,
    clearError: () => setError(null)
  };
};
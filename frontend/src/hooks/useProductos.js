import axios from 'axios';
import { useState } from 'react';


export const useProductosAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllProductos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/api/productos`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener productos');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al obtener productos' };
    }
  };

  const createProducto = async (productoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`/api/productos`, productoData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear producto');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al crear producto' };
    }
  };

  const updateProducto = async (productoId, productoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`/api/productos/${productoId}`, productoData);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al actualizar producto');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al actualizar producto' };
    }
  };

  const deleteProducto = async (productoId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`/api/productos/${productoId}`);
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar producto');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al eliminar producto' };
    }
  };

  const toggleDisponibilidad = async (productoId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(`/api/productos/${productoId}/toggle-disponibilidad`);
      setLoading(false);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cambiar disponibilidad');
      setLoading(false);
      return { success: false, error: err.response?.data?.message || 'Error al cambiar disponibilidad' };
    }
  };

  return {
    getAllProductos,
    createProducto,
    updateProducto,
    deleteProducto,
    toggleDisponibilidad,
    loading,
    error,
    clearError: () => setError(null)
  };
};
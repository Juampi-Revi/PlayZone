import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const useFavoritos = () => {
  const { user, token } = useAuth();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favoritosIds, setFavoritosIds] = useState(new Set()); // Para verificar rápidamente si una cancha es favorita

  // Configuración de axios con token
  const api = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Cargar favoritos del usuario
  const cargarFavoritos = async () => {
    console.log('Cargando favoritos...', { token: token ? 'existe' : 'no existe', user });
    
    if (!token) {
      console.log('No hay token disponible');
      // Si no hay token, simplemente inicializar con arrays vacíos
      setFavoritos([]);
      setFavoritosIds(new Set());
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/api/favoritos/mis-favoritos');
      if (response.data.success) {
        setFavoritos(response.data.favoritos || []);
        // Crear un Set con los IDs de las canchas favoritas para verificación rápida
        const ids = new Set((response.data.favoritos || []).map(f => f.cancha.id));
        setFavoritosIds(ids);
      } else {
        // Si la respuesta no es exitosa, inicializar con arrays vacíos
        setFavoritos([]);
        setFavoritosIds(new Set());
        setError(null); // No mostrar error si simplemente no hay favoritos
      }
    } catch (err) {
      console.error('Error cargando favoritos:', err);
      // Si es un error 401 (no autorizado) o similar, no mostrar error
      if (err.response?.status === 401 || err.response?.status === 403) {
        setFavoritos([]);
        setFavoritosIds(new Set());
        setError(null);
      } else {
        setError(err.response?.data?.message || 'Error al cargar favoritos');
      }
    } finally {
      setLoading(false);
    }
  };

  // Agregar cancha a favoritos
  const agregarFavorito = async (canchaId, notas = null) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/favoritos/agregar', {
        canchaId,
        notas
      });
      
      if (response.data.success) {
        // Recargar favoritos para obtener la lista actualizada
        await cargarFavoritos();
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al agregar favorito');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error agregando favorito:', err);
      const errorMessage = err.response?.data?.message || 'Error al agregar favorito';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Remover cancha de favoritos
  const removerFavorito = async (canchaId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/api/favoritos/remover/${canchaId}`);
      
      if (response.data.success) {
        // Recargar favoritos para obtener la lista actualizada
        await cargarFavoritos();
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al remover favorito');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error removiendo favorito:', err);
      const errorMessage = err.response?.data?.message || 'Error al remover favorito';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Verificar si una cancha es favorita
  const esFavorito = (canchaId) => {
    return favoritosIds.has(canchaId);
  };

  // Alternar estado de favorito (agregar/remover)
  const toggleFavorito = async (canchaId, notas = null) => {
    if (esFavorito(canchaId)) {
      return await removerFavorito(canchaId);
    } else {
      return await agregarFavorito(canchaId, notas);
    }
  };

  // Actualizar notas de un favorito
  const actualizarNotas = async (canchaId, notas) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/api/favoritos/actualizar-notas/${canchaId}`, {
        notas
      });
      
      if (response.data.success) {
        // Recargar favoritos para obtener la lista actualizada
        await cargarFavoritos();
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al actualizar notas');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error actualizando notas:', err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar notas';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Contar favoritos
  const contarFavoritos = async () => {
    try {
      const response = await api.get('/api/favoritos/contar');
      if (response.data.success) {
        return response.data.total;
      }
      return 0;
    } catch (err) {
      console.error('Error contando favoritos:', err);
      return 0;
    }
  };

  // Cargar favoritos al inicializar
  useEffect(() => {
    cargarFavoritos();
  }, [token]);

  return {
    favoritos,
    loading,
    error,
    favoritosIds,
    cargarFavoritos,
    agregarFavorito,
    removerFavorito,
    esFavorito,
    toggleFavorito,
    actualizarNotas,
    contarFavoritos
  };
}; 
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


export const usePerfilJugador = () => {
  const { user, token } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adjetivosDisponibles, setAdjetivosDisponibles] = useState([]);
  const [deportesDisponibles, setDeportesDisponibles] = useState([]);

  // Configuración de axios con token
  const api = axios.create({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  // Cargar perfil del jugador
  const cargarPerfil = async () => {
    if (!token) {
      console.log('No hay token disponible');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Intentando cargar perfil con token:', token.substring(0, 20) + '...');
      const response = await api.get('/api/perfil-jugador/mi-perfil');
      console.log('Respuesta del servidor:', response.data);
      if (response.data.success) {
        setPerfil(response.data.perfil);
      } else {
        setError(response.data.message || 'Error al cargar el perfil');
      }
    } catch (err) {
      console.error('Error cargando perfil:', err);
      console.error('Detalles del error:', err.response?.data);
      if (err.response?.status === 401) {
        setError('Token expirado o inválido. Por favor, inicia sesión nuevamente.');
      } else {
        setError(err.response?.data?.message || 'Error al cargar el perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  // Guardar perfil
  const guardarPerfil = async (datosPerfil) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/perfil-jugador/guardar', datosPerfil);
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al guardar el perfil');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error guardando perfil:', err);
      const errorMessage = err.response?.data?.message || 'Error al guardar el perfil';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Agregar deporte
  const agregarDeporte = async (deporte, puntuacion, posicion, anosExperiencia, nivel) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/perfil-jugador/deportes/agregar', {
        deporte,
        puntuacion,
        posicion,
        anosExperiencia,
        nivel
      });
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al agregar deporte');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error agregando deporte:', err);
      const errorMessage = err.response?.data?.message || 'Error al agregar deporte';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar puntuación de deporte
  const actualizarPuntuacionDeporte = async (deporte, nuevaPuntuacion) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/api/perfil-jugador/deportes/${deporte}/puntuacion`, {
        puntuacion: nuevaPuntuacion
      });
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al actualizar puntuación');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error actualizando puntuación:', err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar puntuación';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar deporte completo
  const actualizarDeporte = async (deporteOriginal, deporteActualizado) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.put(`/api/perfil-jugador/deportes/${encodeURIComponent(deporteOriginal)}`, deporteActualizado);
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al actualizar deporte');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error actualizando deporte:', err);
      const errorMessage = err.response?.data?.message || 'Error al actualizar deporte';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar deporte
  const eliminarDeporte = async (deporte) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/api/perfil-jugador/deportes/${encodeURIComponent(deporte)}`);
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al eliminar deporte');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error eliminando deporte:', err);
      const errorMessage = err.response?.data?.message || 'Error al eliminar deporte';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Agregar adjetivo
  const agregarAdjetivo = async (adjetivo) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.post('/api/perfil-jugador/adjetivos/agregar', {
        adjetivo
      });
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al agregar adjetivo');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error agregando adjetivo:', err);
      const errorMessage = err.response?.data?.message || 'Error al agregar adjetivo';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Remover adjetivo
  const removerAdjetivo = async (adjetivo) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.delete(`/api/perfil-jugador/adjetivos/${encodeURIComponent(adjetivo)}`);
      
      if (response.data.success) {
        setPerfil(response.data.perfil);
        return { success: true, message: response.data.message };
      } else {
        setError(response.data.message || 'Error al remover adjetivo');
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error removiendo adjetivo:', err);
      const errorMessage = err.response?.data?.message || 'Error al remover adjetivo';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Cargar adjetivos disponibles
  const cargarAdjetivosDisponibles = async () => {
    try {
      const response = await api.get('/api/perfil-jugador/adjetivos-disponibles');
      if (response.data.success) {
        setAdjetivosDisponibles(response.data.adjetivos);
      }
    } catch (err) {
      console.error('Error cargando adjetivos disponibles:', err);
    }
  };

  // Cargar deportes disponibles
  const cargarDeportesDisponibles = async () => {
    try {
      const response = await api.get('/api/perfil-jugador/deportes-disponibles');
      if (response.data.success) {
        setDeportesDisponibles(response.data.deportes);
      }
    } catch (err) {
      console.error('Error cargando deportes disponibles:', err);
    }
  };

  // Buscar jugadores por deporte
  const buscarJugadoresPorDeporte = async (deporte) => {
    try {
      const response = await api.get(`/api/perfil-jugador/buscar/deporte/${encodeURIComponent(deporte)}`);
      if (response.data.success) {
        return { success: true, jugadores: response.data.jugadores };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error buscando jugadores:', err);
      return { success: false, message: 'Error al buscar jugadores' };
    }
  };

  // Buscar jugadores por adjetivo
  const buscarJugadoresPorAdjetivo = async (adjetivo) => {
    try {
      const response = await api.get(`/api/perfil-jugador/buscar/adjetivo/${encodeURIComponent(adjetivo)}`);
      if (response.data.success) {
        return { success: true, jugadores: response.data.jugadores };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error buscando jugadores:', err);
      return { success: false, message: 'Error al buscar jugadores' };
    }
  };

  // Obtener top jugadores por rating
  const obtenerTopJugadores = async () => {
    try {
      const response = await api.get('/api/perfil-jugador/top/rating');
      if (response.data.success) {
        return { success: true, jugadores: response.data.jugadores };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error obteniendo top jugadores:', err);
      return { success: false, message: 'Error al obtener top jugadores' };
    }
  };

  // Obtener estadísticas
  const obtenerEstadisticas = async () => {
    try {
      const response = await api.get('/api/perfil-jugador/estadisticas');
      if (response.data.success) {
        return { success: true, estadisticas: response.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (err) {
      console.error('Error obteniendo estadísticas:', err);
      return { success: false, message: 'Error al obtener estadísticas' };
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    if (token) {
      cargarPerfil();
      cargarAdjetivosDisponibles();
      cargarDeportesDisponibles();
    }
  }, [token]);

  return {
    perfil,
    loading,
    error,
    adjetivosDisponibles,
    deportesDisponibles,
    cargarPerfil,
    guardarPerfil,
    agregarDeporte,
    actualizarPuntuacionDeporte,
    actualizarDeporte,
    eliminarDeporte,
    agregarAdjetivo,
    removerAdjetivo,
    buscarJugadoresPorDeporte,
    buscarJugadoresPorAdjetivo,
    obtenerTopJugadores,
    obtenerEstadisticas
  };
}; 
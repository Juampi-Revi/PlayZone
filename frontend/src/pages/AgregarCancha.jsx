import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCanchasAPI, useClubAPI } from '../hooks';

const AgregarCancha = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const canchasAPI = useCanchasAPI();
  const clubAPI = useClubAPI();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    deporte: '',
    ubicacion: '',
    precioPorTurno: '',
    duracionTurno: '60', // Duración en minutos, por defecto 60
    horario: '',
    imagenes: '',
    disponible: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [miClub, setMiClub] = useState(null);
  const [loadingClub, setLoadingClub] = useState(true);

  // Deportes disponibles basados en los servicios del club
  const getDeportesDisponibles = () => {
    if (!miClub || !miClub.servicios) {
      return [
        { value: 'FUTBOL', label: 'Fútbol' },
        { value: 'TENIS', label: 'Tenis' },
        { value: 'BASQUET', label: 'Básquet' },
        { value: 'PADDLE', label: 'Paddle' },
        { value: 'VOLEY', label: 'Vóley' },
        { value: 'HOCKEY', label: 'Hockey' },
        { value: 'RUGBY', label: 'Rugby' },
        { value: 'OTRO', label: 'Otro' }
      ];
    }

    // Mapear servicios del club a deportes
    const deportesDelClub = miClub.servicios.map(servicio => {
      const deporteNormalizado = servicio.toLowerCase();
      if (deporteNormalizado.includes('futbol') || deporteNormalizado.includes('fútbol')) {
        return { value: 'FUTBOL', label: 'Fútbol' };
      } else if (deporteNormalizado.includes('tenis')) {
        return { value: 'TENIS', label: 'Tenis' };
      } else if (deporteNormalizado.includes('basquet') || deporteNormalizado.includes('básquet')) {
        return { value: 'BASQUET', label: 'Básquet' };
      } else if (deporteNormalizado.includes('paddle') || deporteNormalizado.includes('pádel')) {
        return { value: 'PADDLE', label: 'Paddle' };
      } else if (deporteNormalizado.includes('voley') || deporteNormalizado.includes('vóley') || deporteNormalizado.includes('voleibol')) {
        return { value: 'VOLEY', label: 'Vóley' };
      } else if (deporteNormalizado.includes('hockey')) {
        return { value: 'HOCKEY', label: 'Hockey' };
      } else if (deporteNormalizado.includes('rugby')) {
        return { value: 'RUGBY', label: 'Rugby' };
      } else {
        return { value: 'OTRO', label: servicio };
      }
    });

    // Eliminar duplicados
    const deportesUnicos = deportesDelClub.filter((deporte, index, self) => 
      index === self.findIndex(d => d.value === deporte.value)
    );

    return deportesUnicos.length > 0 ? deportesUnicos : [
      { value: 'FUTBOL', label: 'Fútbol' },
      { value: 'TENIS', label: 'Tenis' },
      { value: 'BASQUET', label: 'Básquet' },
      { value: 'PADDLE', label: 'Paddle' },
      { value: 'VOLEY', label: 'Vóley' },
      { value: 'HOCKEY', label: 'Hockey' },
      { value: 'RUGBY', label: 'Rugby' },
      { value: 'OTRO', label: 'Otro' }
    ];
  };

  useEffect(() => {
    if (user && user.tipo === 'CLUB') {
      cargarMiClub();
    }
  }, [user]);

  useEffect(() => {
    // Pre-rellenar formulario con información del club cuando se carga
    if (miClub) {
      setFormData(prev => ({
        ...prev,
        ubicacion: miClub.direccion || '',
        horario: miClub.horarioAtencion || ''
      }));
    }
  }, [miClub]);

  const cargarMiClub = async () => {
    try {
      setLoadingClub(true);
      const result = await clubAPI.getMiClub();
      
      if (result.success) {
        setMiClub(result.data);
      } else {
        setError('Error al cargar información del club');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar información del club');
    } finally {
      setLoadingClub(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!miClub) {
      setError('No se pudo cargar la información del club');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Preparar los datos para enviar
      const canchaData = {
        ...formData,
        clubId: miClub.id,
        // Convertir precio por turno a precio por hora para compatibilidad con backend
        precioPorHora: parseFloat(formData.precioPorTurno) * (60 / parseInt(formData.duracionTurno)),
        imagenes: formData.imagenes ? formData.imagenes.split(',').map(img => img.trim()).filter(img => img) : []
      };

      const result = await canchasAPI.createCancha(canchaData);
      
      if (result.success) {
        setSuccess('Cancha creada exitosamente');
        setTimeout(() => {
          navigate('/mis-canchas');
        }, 2000);
      } else {
        setError(result.error || 'Error al crear la cancha');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear la cancha');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/mis-canchas');
  };

  if (loadingClub) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando información del club...</p>
        </div>
      </div>
    );
  }

  if (!miClub) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error: No se pudo cargar la información del club</p>
          <button 
            onClick={() => navigate('/mis-canchas')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Agregar Nueva Cancha</h1>
            <p className="mt-2 text-gray-600">
              Club: <span className="font-semibold text-blue-600">{miClub.nombre}</span>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Cancha *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Cancha de Fútbol 1"
                />
              </div>

              <div>
                <label htmlFor="deporte" className="block text-sm font-medium text-gray-700 mb-2">
                  Deporte *
                </label>
                <select
                  id="deporte"
                  name="deporte"
                  value={formData.deporte}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Seleccionar deporte</option>
                  {getDeportesDisponibles().map((deporte) => (
                    <option key={deporte.value} value={deporte.value}>
                      {deporte.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción de la cancha..."
              />
            </div>

            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                Ubicación *
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Sector A, Cancha 1"
              />
              {miClub && miClub.direccion && (
                <p className="text-sm text-gray-500 mt-1">
                  Dirección del club: {miClub.direccion}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="precioPorTurno" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio por Turno ($) *
                </label>
                <input
                  type="number"
                  id="precioPorTurno"
                  name="precioPorTurno"
                  value={formData.precioPorTurno}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label htmlFor="duracionTurno" className="block text-sm font-medium text-gray-700 mb-2">
                  Duración del Turno (minutos) *
                </label>
                <select
                  id="duracionTurno"
                  name="duracionTurno"
                  value={formData.duracionTurno}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="30">30 minutos</option>
                  <option value="45">45 minutos</option>
                  <option value="60">60 minutos</option>
                  <option value="90">90 minutos</option>
                  <option value="120">120 minutos</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Funcionamiento
              </label>
              <input
                type="text"
                id="horario"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Lunes a Viernes 8:00 - 22:00, Sábados y Domingos 9:00 - 20:00"
              />
              {miClub && miClub.horarioAtencion && (
                <p className="text-sm text-gray-500 mt-1">
                  Horario del club: {miClub.horarioAtencion}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-2">
                URLs de Imágenes
              </label>
              <textarea
                id="imagenes"
                name="imagenes"
                value={formData.imagenes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese las URLs de las imágenes separadas por comas..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Separe múltiples URLs con comas
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="disponible"
                name="disponible"
                checked={formData.disponible}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
                Cancha disponible para reservas
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creando...
                  </div>
                ) : (
                  'Crear Cancha'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgregarCancha;
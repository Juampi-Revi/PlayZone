import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCanchasAPI, useClubAPI } from '../hooks';
import ConfiguracionHorarios from '../components/configuracionhorarios';
import GestionTurnos from '../components/GestionTurnos';
import axios from 'axios';

// Componente para agregar cancha inline
const FormularioAgregarCancha = ({ onCancel, onSuccess }) => {
  const canchasAPI = useCanchasAPI();
  const clubAPI = useClubAPI();
  
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    deporte: '',
    precioPorTurno: '',
    duracionTurno: '60',
    imagenes: '',
    disponible: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [miClub, setMiClub] = useState(null);
  const [loadingClub, setLoadingClub] = useState(true);

  // Deportes disponibles basados en los servicios del club
  const getDeportesDisponibles = () => {
    // Lista completa de deportes disponibles
    const deportesCompletos = [
      { value: 'FUTBOL', label: 'Fútbol' },
      { value: 'TENIS', label: 'Tenis' },
      { value: 'BASQUET', label: 'Básquet' },
      { value: 'PADDLE', label: 'Paddle' },
      { value: 'VOLEY', label: 'Vóley' },
      { value: 'HOCKEY', label: 'Hockey' },
      { value: 'RUGBY', label: 'Rugby' },
      { value: 'OTRO', label: 'Otro' }
    ];

    // Si no hay club o servicios, devolver todos los deportes
    if (!miClub || !miClub.servicios || !Array.isArray(miClub.servicios) || miClub.servicios.length === 0) {
      return deportesCompletos;
    }

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
        // No incluir servicios que no son deportes (como estacionamiento, vestuarios, etc.)
        return null;
      }
    }).filter(Boolean); // Filtrar valores nulos o undefined

    const deportesUnicos = deportesDelClub.filter((deporte, index, self) => 
      index === self.findIndex(d => d.value === deporte.value)
    );

    // Si no se encontraron deportes válidos, devolver la lista completa
    return deportesUnicos.length > 0 ? deportesUnicos : deportesCompletos;
  };

  useEffect(() => {
    cargarMiClub();
  }, []);

  const cargarMiClub = async () => {
    try {
      setLoadingClub(true);
      const result = await clubAPI.getMiClub();
      
      if (result.success) {
        setMiClub(result.data.club);
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

    console.log('miClub completo:', miClub);
    console.log('miClub.id:', miClub.id);

    setLoading(true);
    setError('');

    try {
      const canchaData = {
        ...formData,
        clubId: miClub.id,
        ubicacion: miClub.direccion, // Usar automáticamente la dirección del club
        horario: miClub.horarioAtencion, // Usar automáticamente el horario del club
        precioPorHora: parseFloat(formData.precioPorTurno) * (60 / parseInt(formData.duracionTurno)),
        imagenes: formData.imagenes || '' // Enviar como string, el backend lo convierte a lista
      };

      const result = await canchasAPI.createCanchaAdmin(canchaData);
      
      if (result.success) {
        onSuccess('Cancha creada exitosamente');
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

  if (loadingClub) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Cargando información del club...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agregar Nueva Cancha</h2>
          <p className="mt-1 text-gray-600">
            Club: <span className="font-semibold text-blue-600">{miClub?.nombre}</span>
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ✕
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
            {loadingClub ? (
              <span className="text-gray-500">🔄 Cargando ubicación del club...</span>
            ) : miClub && miClub.direccion ? (
              miClub.direccion
            ) : miClub ? (
              <span className="text-orange-600">⚠️ El club no tiene dirección registrada</span>
            ) : (
              <span className="text-red-600">❌ Error al cargar información del club</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            📍 La ubicación se toma automáticamente de la dirección del club
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="precioPorTurno" className="block text-sm font-medium text-gray-700 mb-2">
              Precio por Turno (ARS) *
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Horario de Funcionamiento
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700">
            {loadingClub ? (
              <span className="text-gray-500">🔄 Cargando horario del club...</span>
            ) : miClub && miClub.horarioAtencion ? (
              miClub.horarioAtencion
            ) : miClub ? (
              <span className="text-orange-600">⚠️ El club no tiene horario registrado</span>
            ) : (
              <span className="text-red-600">❌ Error al cargar información del club</span>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            🕒 El horario se toma automáticamente del horario de atención del club
          </p>
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
            onClick={onCancel}
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
            {loading ? 'Creando...' : 'Crear Cancha'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente modal para editar canchas
const EditarCanchaModal = ({ cancha, onClose, onSave }) => {
  const canchasAPI = useCanchasAPI();
  const [formData, setFormData] = useState({
    nombre: cancha.nombre || '',
    descripcion: cancha.descripcion || '',
    deporte: cancha.deporte || '',
    ubicacion: cancha.ubicacion || '',
    precioPorHora: cancha.precioPorHora || '',
    imagenes: cancha.imagenes ? cancha.imagenes.join(', ') : '',
    disponible: cancha.disponible !== undefined ? cancha.disponible : true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deportes = [
    'Fútbol', 'Tenis', 'Pádel', 'Basketball', 'Vóley', 'Squash', 
    'Pelota Paleta', 'Hockey', 'Rugby', 'Beisbol', 'Otro'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validaciones
      if (!formData.nombre.trim()) {
        throw new Error('El nombre de la cancha es obligatorio');
      }
      if (!formData.deporte) {
        throw new Error('Debe seleccionar un deporte');
      }
      if (!formData.ubicacion.trim()) {
        throw new Error('La ubicación es obligatoria');
      }
      if (!formData.precioPorHora || parseFloat(formData.precioPorHora) <= 0) {
        throw new Error('El precio por turno debe ser mayor a 0');
      }

      const updateData = {
        nombre: formData.nombre.trim(),
        descripcion: formData.descripcion.trim(),
        deporte: formData.deporte,
        ubicacion: formData.ubicacion.trim(),
        precioPorHora: parseFloat(formData.precioPorHora),
        imagenes: formData.imagenes.trim() || null,
        disponible: formData.disponible
      };

      // Actualizar la cancha
      const result = await canchasAPI.updateCancha(cancha.id, updateData);
      
      if (result.success) {
        onSave();
      } else {
        setError(result.message || 'Error al actualizar la cancha');
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar la cancha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Editar Cancha</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Cancha *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Deporte */}
            <div>
              <label htmlFor="deporte" className="block text-sm font-medium text-gray-700 mb-1">
                Deporte *
              </label>
              <select
                id="deporte"
                name="deporte"
                value={formData.deporte}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecciona un deporte</option>
                {deportes.map(deporte => (
                  <option key={deporte} value={deporte}>{deporte}</option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Ubicación */}
            <div>
              <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                Ubicación *
              </label>
              <input
                type="text"
                id="ubicacion"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Precio por Turno */}
            <div>
              <label htmlFor="precioPorHora" className="block text-sm font-medium text-gray-700 mb-1">
                Precio por Turno (ARS) *
              </label>
              <input
                type="number"
                id="precioPorHora"
                name="precioPorHora"
                value={formData.precioPorHora}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Precio fijo por turno, independientemente de la duración
              </p>
            </div>

            {/* Imágenes */}
            <div>
              <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-1">
                URLs de Imágenes
              </label>
              <textarea
                id="imagenes"
                name="imagenes"
                value={formData.imagenes}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Separa múltiples URLs con comas
              </p>
            </div>

            {/* Disponible */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="disponible"
                name="disponible"
                checked={formData.disponible}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
                Cancha disponible para reservas
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MisCanchas = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const canchasAPI = useCanchasAPI();
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [configurandoCancha, setConfigurandoCancha] = useState(null);
  const [editandoCancha, setEditandoCancha] = useState(null);
  const [eliminandoCancha, setEliminandoCancha] = useState(null);
  const [configuracionesHorarios, setConfiguracionesHorarios] = useState({});
  const [gestionandoTurnos, setGestionandoTurnos] = useState(null);

  useEffect(() => {
    if (user && user.tipo === 'CLUB') {
      cargarMisCanchas();
    }
  }, [user]);

  const cargarMisCanchas = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await canchasAPI.getMisCanchas();

      if (result.success) {
        const canchasData = result.data.canchas || [];
        setCanchas(canchasData);
        
        // Cargar configuraciones de horarios para cada cancha
        const configuraciones = {};
        for (const cancha of canchasData) {
          try {
            const configResponse = await axios.get(`/api/configuracion-horarios/cancha/${cancha.id}`);
            if (configResponse.data.existe) {
              configuraciones[cancha.id] = configResponse.data;
            }
          } catch (error) {
            console.error(`Error al cargar configuración para cancha ${cancha.id}:`, error);
          }
        }
        setConfiguracionesHorarios(configuraciones);
      } else {
        setError(result.message || 'Error al cargar las canchas');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar las canchas');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el precio por turno (precio fijo)
  const calcularPrecioPorTurno = (cancha) => {
    return Math.round(cancha.precioPorHora);
  };

  // Función para formatear el horario basado en la configuración
  const formatearHorario = (canchaId) => {
    const config = configuracionesHorarios[canchaId];
    if (!config || !config.existe) {
      return null;
    }

    const { horaApertura, horaCierre, diasDisponibles } = config;
    
    // Convertir días disponibles de string a array
    const diasArray = diasDisponibles.split(',').map(d => parseInt(d.trim()));
    
    // Mapear números a nombres de días
    const nombresDias = {
      1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 
      5: 'Vie', 6: 'Sáb', 7: 'Dom'
    };
    
    // Verificar si son todos los días
    const todosDias = diasArray.length === 7 && diasArray.sort().join(',') === '1,2,3,4,5,6,7';
    
    if (todosDias) {
      return `Todos los días: ${horaApertura.substring(0, 5)} - ${horaCierre.substring(0, 5)}`;
    } else {
      const diasTexto = diasArray.map(d => nombresDias[d]).join(', ');
      return `${diasTexto}: ${horaApertura.substring(0, 5)} - ${horaCierre.substring(0, 5)}`;
    }
  };

  const toggleDisponibilidad = async (canchaId) => {
    try {
      const result = await canchasAPI.toggleDisponibilidad(canchaId);

      if (result.success) {
        setSuccess('Disponibilidad actualizada correctamente');
        cargarMisCanchas(); // Recargar la lista
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Error al cambiar disponibilidad');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cambiar disponibilidad');
    }
  };

  const eliminarCancha = async (canchaId) => {
    try {
      const result = await canchasAPI.deleteCancha(canchaId);

      if (result.success) {
        setSuccess('Cancha eliminada correctamente');
        cargarMisCanchas();
        setEliminandoCancha(null);
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Error al eliminar la cancha');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al eliminar la cancha');
    }
  };

  const crearPrimeraCancha = () => {
    setMostrarFormulario(true);
  };

  const handleFormularioCancel = () => {
    setMostrarFormulario(false);
  };

  const handleFormularioSuccess = (mensaje) => {
    setMostrarFormulario(false);
    cargarMisCanchas(); // Recargar la lista de canchas
    setSuccess(mensaje);
    setTimeout(() => setSuccess(''), 3000);
  };

  if (!user || user.tipo !== 'CLUB') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Solo los usuarios tipo CLUB pueden acceder a esta sección.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mis Canchas</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Total: {canchas.length} cancha{canchas.length !== 1 ? 's' : ''}
          </div>
          <button
          onClick={() => setMostrarFormulario(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Agregar Cancha
        </button>
        </div>
      </div>

      {/* Formulario inline para agregar cancha */}
      {mostrarFormulario && (
        <FormularioAgregarCancha
          onCancel={handleFormularioCancel}
          onSuccess={handleFormularioSuccess}
        />
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
          <button 
            onClick={() => setError('')}
            className="float-right text-red-700 hover:text-red-900"
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {success}
          <button 
            onClick={() => setSuccess('')}
            className="float-right text-green-700 hover:text-green-900"
          >
            ✕
          </button>
        </div>
      )}

      {canchas.length === 0 && !mostrarFormulario ? (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">
              <svg className="w-16 h-16 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Crea tu primera cancha!</h3>
            <p className="text-gray-600 mb-6">
              Aún no tienes canchas registradas. Comienza agregando tu primera cancha deportiva 
              para que los jugadores puedan hacer reservas.
            </p>
            <button
              onClick={crearPrimeraCancha}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 font-medium"
            >
              <svg className="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Crear Mi Primera Cancha
            </button>
          </div>
        </div>
      ) : null}

      {canchas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canchas.map((cancha) => {
            // Función para obtener imagen por defecto según el deporte
            const getImagenPorDefecto = (deporte) => {
              const imagenesDeporte = {
                'Pádel': 'https://tn.com.ar/resizer/v2/cada-vez-hay-mas-oferta-de-canchas-en-todo-el-pais-atc-GZPZVOLNVJAWLBPNTTYBPEVF6Q.jpg?auth=92e56f551e4fc1f6159f24d690bc99cf13307ba51f23a455c65349c0dc771756&width=1440',
                'Paddle': 'https://tn.com.ar/resizer/v2/cada-vez-hay-mas-oferta-de-canchas-en-todo-el-pais-atc-GZPZVOLNVJAWLBPNTTYBPEVF6Q.jpg?auth=92e56f551e4fc1f6159f24d690bc99cf13307ba51f23a455c65349c0dc771756&width=1440',
                'Fútbol': 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Tenis': 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Basketball': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Básquet': 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Vóley': 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Squash': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
                'Otro': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
              };
              return imagenesDeporte[deporte] || imagenesDeporte['Otro'];
            };

            return (
              <div key={cancha.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                {/* Imagen de la cancha */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cancha.imagenes && cancha.imagenes.length > 0 ? cancha.imagenes[0] : getImagenPorDefecto(cancha.deporte)}
                    alt={cancha.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = getImagenPorDefecto(cancha.deporte);
                    }}
                  />
                  
                  {/* Badge de disponibilidad */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      cancha.disponible 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      {cancha.disponible ? 'Disponible' : 'No disponible'}
                    </span>
                  </div>

                  {/* Deporte badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-md text-xs font-medium border border-gray-200">
                      {cancha.deporte}
                    </span>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-4">
                  {/* Título y descripción */}
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{cancha.nombre}</h3>
                    {cancha.descripcion && (
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {cancha.descripcion}
                      </p>
                    )}
                  </div>

                  {/* Información básica */}
                  <div className="space-y-2 mb-4">
                    {/* Ubicación */}
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {cancha.ubicacion}
                    </div>

                    {/* Precio */}
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                      ${calcularPrecioPorTurno(cancha)?.toLocaleString()} por turno
                    </div>

                    {/* Horario */}
                    {formatearHorario(cancha.id) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {formatearHorario(cancha.id)}
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="space-y-2">
                    {/* Botón principal - Configurar horarios */}
                    <button
                      onClick={() => setConfigurandoCancha(cancha.id)}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-sm font-medium"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                      Configurar Horarios
                    </button>

                    {/* Botón Ver Turnos */}
                    <button
                      onClick={() => setGestionandoTurnos(cancha)}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-sm font-medium mb-2"
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      Ver Turnos
                    </button>

                    {/* Botones secundarios */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setEditandoCancha(cancha)}
                        className="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-xs font-medium"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Editar
                      </button>

                      <button
                        onClick={() => toggleDisponibilidad(cancha.id)}
                        className={`py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-xs font-medium ${
                          cancha.disponible
                            ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-500'
                        }`}
                      >
                        {cancha.disponible ? (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                            </svg>
                            Pausar
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Activar
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => eliminarCancha(cancha.id)}
                        className="bg-red-100 text-red-700 py-2 px-3 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center text-xs font-medium"
                      >
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clipRule="evenodd" />
                        </svg>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de configuración de horarios */}
      {configurandoCancha && (
        <ConfiguracionHorarios
          canchaId={configurandoCancha}
          onClose={() => setConfigurandoCancha(null)}
          onSave={(config) => {
            console.log('Configuración guardada:', config);
            setConfigurandoCancha(null);
            cargarMisCanchas(); // Recargar canchas y configuraciones
            setSuccess('Configuración de horarios guardada correctamente');
            setTimeout(() => setSuccess(''), 3000);
          }}
        />
      )}

      {/* Modal de gestión de turnos */}
      {gestionandoTurnos && (
        <GestionTurnos
          cancha={gestionandoTurnos}
          onClose={() => setGestionandoTurnos(null)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {eliminandoCancha && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ¿Eliminar cancha?
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar la cancha "{eliminandoCancha.nombre}"? 
              Esta acción no se puede deshacer y se eliminarán todas las reservas asociadas.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setEliminandoCancha(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminarCancha(eliminandoCancha.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editandoCancha && (
        <EditarCanchaModal
          cancha={editandoCancha}
          onClose={() => setEditandoCancha(null)}
          onSave={() => {
            setEditandoCancha(null);
            cargarMisCanchas();
            setSuccess('Cancha actualizada correctamente');
            setTimeout(() => setSuccess(''), 3000);
          }}
        />
      )}
    </div>
  );
};

export default MisCanchas;
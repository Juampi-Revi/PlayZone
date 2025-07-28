import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FormularioReserva = ({ cancha, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fecha: '',
    horaInicio: '',
    horaFin: '',
    nombreJugador: '',
    telefono: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [verificandoDisponibilidad, setVerificandoDisponibilidad] = useState(false);
  const [configuracionHorario, setConfiguracionHorario] = useState(null);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);

  // Cargar configuración de horarios al montar el componente
  useEffect(() => {
    const cargarConfiguracionHorario = async () => {
      try {
        const response = await axios.get(`/api/configuracion-horarios/cancha/${cancha.id}`);
        if (response.data.success) {
          setConfiguracionHorario(response.data.configuracion);
        }
      } catch (error) {
        console.error('Error cargando configuración de horarios:', error);
        // Si no hay configuración, usar valores por defecto
        setConfiguracionHorario({
          horaApertura: '09:00',
          horaCierre: '22:00',
          duracionTurnoMinutos: 60,
          diasDisponibles: '1,2,3,4,5,6,7'
        });
      }
    };

    cargarConfiguracionHorario();
  }, [cancha.id]);

  // Cargar horarios disponibles cuando cambia la fecha
  useEffect(() => {
    if (formData.fecha && configuracionHorario) {
      cargarHorariosDisponibles();
    }
  }, [formData.fecha, configuracionHorario]);

  const cargarHorariosDisponibles = async () => {
    if (!formData.fecha || !configuracionHorario) return;

    setLoadingHorarios(true);
    try {
      const response = await axios.get(`/api/configuracion-horarios/horarios-disponibles/${cancha.id}`, {
        params: { fecha: formData.fecha }
      });
      
      if (response.data.success) {
        setHorariosDisponibles(response.data.horarios);
      }
    } catch (error) {
      console.error('Error cargando horarios disponibles:', error);
      setHorariosDisponibles([]);
    } finally {
      setLoadingHorarios(false);
    }
  };

  const seleccionarHorario = (horario) => {
    setFormData(prev => ({
      ...prev,
      horaInicio: horario.horaInicio,
      horaFin: horario.horaFin
    }));
    setDisponibilidad(null); // Limpiar disponibilidad anterior
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar disponibilidad cuando cambian los datos
    if (['fecha', 'horaInicio', 'horaFin'].includes(name)) {
      setDisponibilidad(null);
    }
  };

  const verificarDisponibilidad = async () => {
    if (!formData.fecha || !formData.horaInicio || !formData.horaFin) {
      setError('Por favor completa fecha, hora de inicio y hora de fin');
      return;
    }

    setVerificandoDisponibilidad(true);
    setError('');

    try {
      // Combinar fecha con horas para crear fechas completas en formato ISO
      const fechaInicio = `${formData.fecha}T${formData.horaInicio}:00`;
      const fechaFin = `${formData.fecha}T${formData.horaFin}:00`;

      const response = await axios.get('/api/reservas/disponibilidad', {
        params: {
          canchaId: cancha.id,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin
        }
      });

      setDisponibilidad(response.data);
    } catch (error) {
      console.error('Error verificando disponibilidad:', error);
      setError('Error al verificar disponibilidad');
      setDisponibilidad(null);
    } finally {
      setVerificandoDisponibilidad(false);
    }
  };

  const calcularMontoTotal = () => {
    if (!formData.horaInicio || !formData.horaFin || !cancha.precioPorHora) {
      return 0;
    }

    const inicio = new Date(`2000-01-01T${formData.horaInicio}`);
    const fin = new Date(`2000-01-01T${formData.horaFin}`);
    const minutos = (fin - inicio) / (1000 * 60);
    
    // Calcular precio basado en minutos
    return minutos > 0 ? (minutos / 60) * cancha.precioPorHora : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!disponibilidad || !disponibilidad.disponible) {
      setError('Por favor verifica la disponibilidad primero');
      return;
    }

    if (!formData.nombreJugador || !formData.telefono) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Combinar fecha con horas para crear fechas completas en formato ISO
      const fechaInicio = `${formData.fecha}T${formData.horaInicio}:00`;
      const fechaFin = `${formData.fecha}T${formData.horaFin}:00`;

      const reservaData = {
        canchaId: cancha.id,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin
      };

      const response = await axios.post('/api/reservas', reservaData);
      
      // Redirigir a la página de pago
      navigate(`/pagar/${response.data.reserva.id}`);
    } catch (error) {
      console.error('Error creando reserva:', error);
      setError(error.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  const montoTotal = calcularMontoTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Reservar Cancha</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-800">{cancha.nombre}</h3>
            <p className="text-gray-600">{cancha.deporte} • {cancha.ubicacion}</p>
            <p className="text-green-600 font-semibold">${cancha.precioPorHora?.toLocaleString()}/hora</p>
            
            {configuracionHorario && (
              <div className="mt-3 text-sm text-gray-600">
                <p>🕐 Horario: {configuracionHorario.horaApertura} - {configuracionHorario.horaCierre}</p>
                <p>⏱️ Duración de turnos: {configuracionHorario.duracionTurnoMinutos} minutos</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Horarios disponibles */}
            {formData.fecha && configuracionHorario && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horarios Disponibles
                </label>
                
                {loadingHorarios ? (
                  <div className="text-center py-4">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-600 mt-2">Cargando horarios...</p>
                  </div>
                ) : horariosDisponibles.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                    {horariosDisponibles.map((horario, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => seleccionarHorario(horario)}
                        className={`p-2 text-sm rounded-md border transition-colors ${
                          formData.horaInicio === horario.horaInicio && formData.horaFin === horario.horaFin
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                        }`}
                      >
                        {horario.horaInicio} - {horario.horaFin}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No hay horarios disponibles para esta fecha</p>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Inicio
                </label>
                <input
                  type="time"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora Fin
                </label>
                <input
                  type="time"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {formData.fecha && configuracionHorario && (
              <div className="text-xs text-gray-500 text-center">
                💡 Puedes seleccionar un horario de arriba o ingresar manualmente
              </div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={verificarDisponibilidad}
                disabled={verificandoDisponibilidad || !formData.fecha || !formData.horaInicio || !formData.horaFin}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {verificandoDisponibilidad ? 'Verificando...' : 'Verificar Disponibilidad'}
              </button>
            </div>

            {disponibilidad && (
              <div className={`p-3 rounded-md ${
                disponibilidad.disponible 
                  ? 'bg-green-100 border border-green-400 text-green-700'
                  : 'bg-red-100 border border-red-400 text-red-700'
              }`}>
                {disponibilidad.disponible 
                  ? '✅ Horario disponible' 
                  : '❌ Horario no disponible'
                }
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Jugador
              </label>
              <input
                type="text"
                name="nombreJugador"
                value={formData.nombreJugador}
                onChange={handleInputChange}
                placeholder="Nombre completo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Número de teléfono"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {montoTotal > 0 && (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total a pagar:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${montoTotal.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || !disponibilidad?.disponible}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Creando...' : 'Reservar y Pagar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioReserva;
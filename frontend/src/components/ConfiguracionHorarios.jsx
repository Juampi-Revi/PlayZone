import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ConfiguracionHorarios = ({ canchaId, onClose, onSave }) => {
  const { user } = useAuth();
  const [configuracion, setConfiguracion] = useState({
    horaApertura: '09:00',
    horaCierre: '22:00',
    duracionTurnoMinutos: 60,
    diasDisponibles: '1,2,3,4,5,6,7',
    anticipacionMinimaHoras: 1,
    anticipacionMaximaDias: 30
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const diasSemana = [
    { valor: '1', nombre: 'Lunes' },
    { valor: '2', nombre: 'Martes' },
    { valor: '3', nombre: 'Miércoles' },
    { valor: '4', nombre: 'Jueves' },
    { valor: '5', nombre: 'Viernes' },
    { valor: '6', nombre: 'Sábado' },
    { valor: '7', nombre: 'Domingo' }
  ];

  const duracionesComunes = [
    { valor: 30, texto: '30 minutos' },
    { valor: 60, texto: '1 hora' },
    { valor: 90, texto: '1 hora 30 minutos' },
    { valor: 120, texto: '2 horas' },
    { valor: 180, texto: '3 horas' }
  ];

  useEffect(() => {
    if (canchaId) {
      cargarConfiguracion();
    }
  }, [canchaId]);

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/configuracion-horarios/cancha/${canchaId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.existe) {
          setConfiguracion({
            horaApertura: data.horaApertura,
            horaCierre: data.horaCierre,
            duracionTurnoMinutos: data.duracionTurnoMinutos,
            diasDisponibles: data.diasDisponibles,
            anticipacionMinimaHoras: data.anticipacionMinimaHoras,
            anticipacionMaximaDias: data.anticipacionMaximaDias
          });
        }
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      setError('Error al cargar la configuración');
    } finally {
      setLoading(false);
    }
  };

  const handleDiaChange = (diaValor) => {
    const diasActuales = configuracion.diasDisponibles.split(',').filter(d => d);
    let nuevosDias;

    if (diasActuales.includes(diaValor)) {
      nuevosDias = diasActuales.filter(d => d !== diaValor);
    } else {
      nuevosDias = [...diasActuales, diaValor].sort();
    }

    setConfiguracion({
      ...configuracion,
      diasDisponibles: nuevosDias.join(',')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/configuracion-horarios/cancha/${canchaId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(configuracion)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Configuración guardada exitosamente');
        if (onSave) onSave(data);
        setTimeout(() => {
          if (onClose) onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al guardar la configuración');
      }
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      setError('Error al guardar la configuración');
    } finally {
      setLoading(false);
    }
  };

  const crearConfiguracionPorDefecto = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/configuracion-horarios/cancha/${canchaId}/por-defecto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Configuración por defecto creada');
        cargarConfiguracion();
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error al crear configuración por defecto');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al crear configuración por defecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Configuración de Horarios</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Horarios de apertura y cierre */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Apertura
              </label>
              <input
                type="time"
                value={configuracion.horaApertura}
                onChange={(e) => setConfiguracion({...configuracion, horaApertura: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hora de Cierre
              </label>
              <input
                type="time"
                value={configuracion.horaCierre}
                onChange={(e) => setConfiguracion({...configuracion, horaCierre: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Duración del turno */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duración de cada turno
            </label>
            <select
              value={configuracion.duracionTurnoMinutos}
              onChange={(e) => setConfiguracion({...configuracion, duracionTurnoMinutos: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {duracionesComunes.map(duracion => (
                <option key={duracion.valor} value={duracion.valor}>
                  {duracion.texto}
                </option>
              ))}
            </select>
          </div>

          {/* Días disponibles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Días disponibles
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {diasSemana.map(dia => (
                <label key={dia.valor} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={configuracion.diasDisponibles.includes(dia.valor)}
                    onChange={() => handleDiaChange(dia.valor)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{dia.nombre}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Anticipación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anticipación mínima (horas)
              </label>
              <input
                type="number"
                min="0"
                max="168"
                value={configuracion.anticipacionMinimaHoras}
                onChange={(e) => setConfiguracion({...configuracion, anticipacionMinimaHoras: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Anticipación máxima (días)
              </label>
              <input
                type="number"
                min="1"
                max="365"
                value={configuracion.anticipacionMaximaDias}
                onChange={(e) => setConfiguracion({...configuracion, anticipacionMaximaDias: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar Configuración'}
            </button>

            <button
              type="button"
              onClick={crearConfiguracionPorDefecto}
              disabled={loading}
              className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Configuración por Defecto
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfiguracionHorarios;
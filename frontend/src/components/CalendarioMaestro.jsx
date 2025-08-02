import React, { useState, useEffect } from 'react';
import { useClubAPI, useCalendarioMaestroAPI } from '../hooks';

const CalendarioMaestro = () => {
  const [calendarioData, setCalendarioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [vistaActual, setVistaActual] = useState('resumen'); // 'resumen', 'configuraciones', 'estadisticas'
  const [clubId, setClubId] = useState(null);
  
  const clubAPI = useClubAPI();
  const calendarioAPI = useCalendarioMaestroAPI();

  useEffect(() => {
    obtenerClubId();
  }, []);

  useEffect(() => {
    if (clubId) {
      cargarCalendarioMaestro();
    }
  }, [clubId]);

  const obtenerClubId = async () => {
    try {
      const result = await clubAPI.getMiClub();
      if (result.success && result.data.club) {
        setClubId(result.data.club.id);
      } else {
        setError('No se pudo obtener la información del club');
      }
    } catch (err) {
      console.error('Error al obtener club:', err);
      setError('Error al obtener la información del club');
    }
  };

  const cargarCalendarioMaestro = async () => {
    try {
      setLoading(true);
      const result = await calendarioAPI.getCalendarioMaestro(clubId);
      
      if (result.success) {
        setCalendarioData(result.data.data);
        setError(null);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al cargar el calendario maestro');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatearHora = (hora) => {
    return hora ? hora.substring(0, 5) : 'No configurado';
  };

  const obtenerColorDeporte = (deporte) => {
    const colores = {
      'FUTBOL': 'bg-green-100 text-green-800 border-green-200',
      'PADEL': 'bg-blue-100 text-blue-800 border-blue-200',
      'TENIS': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'BASQUET': 'bg-orange-100 text-orange-800 border-orange-200',
      'VOLEY': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colores[deporte] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const renderResumen = () => {
    if (!calendarioData) return null;

    const { canchasPorDeporte, estadisticas } = calendarioData;

    return (
      <div className="space-y-6">
        {/* Estadísticas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Total Canchas</h3>
            <p className="text-2xl font-bold text-gray-900">{estadisticas.totalCanchas}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Disponibles</h3>
            <p className="text-2xl font-bold text-green-600">{estadisticas.canchasDisponibles}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">Configuradas</h3>
            <p className="text-2xl font-bold text-blue-600">{estadisticas.canchasConfiguradas}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <h3 className="text-sm font-medium text-gray-500">% Configuradas</h3>
            <p className="text-2xl font-bold text-purple-600">
              {Math.round(estadisticas.porcentajeConfiguradas)}%
            </p>
          </div>
        </div>

        {/* Canchas por Deporte */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Canchas por Deporte</h2>
          
          {Object.entries(canchasPorDeporte).map(([deporte, canchas]) => (
            <div key={deporte} className={`border rounded-lg p-4 ${obtenerColorDeporte(deporte)}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">{deporte}</h3>
                <span className="text-sm font-medium">
                  {canchas.length} cancha{canchas.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {canchas.map((cancha) => (
                  <div key={cancha.id} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{cancha.nombre}</h4>
                      <span className={`text-xs px-2 py-1 rounded ${
                        cancha.disponible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cancha.disponible ? 'Disponible' : 'No disponible'}
                      </span>
                    </div>
                    
                    {cancha.configuracion.configurada ? (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Horario:</span> {' '}
                          {formatearHora(cancha.configuracion.horaApertura)} - {' '}
                          {formatearHora(cancha.configuracion.horaCierre)}
                        </p>
                        <p>
                          <span className="font-medium">Duración:</span> {' '}
                          {cancha.configuracion.duracionTurnoMinutos} min
                        </p>
                        <p>
                          <span className="font-medium">Precio:</span> ${cancha.precioPorHora}/turno
                        </p>
                      </div>
                    ) : (
                      <div className="text-sm text-orange-600">
                        <p className="font-medium">⚠️ Sin configurar</p>
                        <p>Se usarán valores por defecto</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConfiguraciones = () => {
    if (!calendarioData) return null;

    const { canchasPorDeporte } = calendarioData;

    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Configuraciones Detalladas</h2>
        
        {Object.entries(canchasPorDeporte).map(([deporte, canchas]) => (
          <div key={deporte} className="bg-white rounded-lg shadow border">
            <div className={`p-4 border-b ${obtenerColorDeporte(deporte)}`}>
              <h3 className="text-lg font-semibold">{deporte}</h3>
            </div>
            
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Cancha
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Horario
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Duración Turno
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Precio/Turno
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {canchas.map((cancha) => (
                      <tr key={cancha.id}>
                        <td className="px-4 py-2 text-sm font-medium text-gray-900">
                          {cancha.nombre}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {cancha.configuracion.configurada ? (
                            `${formatearHora(cancha.configuracion.horaApertura)} - ${formatearHora(cancha.configuracion.horaCierre)}`
                          ) : (
                            <span className="text-orange-600">Sin configurar</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          {cancha.configuracion.configurada ? (
                            `${cancha.configuracion.duracionTurnoMinutos} min`
                          ) : (
                            <span className="text-orange-600">Por defecto</span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          ${cancha.precioPorHora}
                        </td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 text-xs rounded ${
                            cancha.disponible 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {cancha.disponible ? 'Disponible' : 'No disponible'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
            <button
              onClick={cargarCalendarioMaestro}
              className="mt-2 text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navegación de pestañas */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setVistaActual('resumen')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              vistaActual === 'resumen'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Resumen por Deporte
          </button>
          <button
            onClick={() => setVistaActual('configuraciones')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              vistaActual === 'configuraciones'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Configuraciones Detalladas
          </button>
        </nav>
      </div>

      {/* Contenido según la vista actual */}
      {vistaActual === 'resumen' && renderResumen()}
      {vistaActual === 'configuraciones' && renderConfiguraciones()}
    </div>
  );
};

export default CalendarioMaestro;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionTurnos = ({ canchaId, cancha, onClose }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [turnos, setTurnos] = useState([]);
  const [configuracion, setConfiguracion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [reservas, setReservas] = useState([]);

  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  useEffect(() => {
    if (canchaId) {
      cargarConfiguracion();
      cargarTurnos();
    }
  }, [canchaId, fechaSeleccionada]);

  const cargarConfiguracion = async () => {
    try {
      const response = await axios.get(`/api/configuracion-horarios/cancha/${canchaId}`);
      if (response.data.existe) {
        setConfiguracion(response.data);
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
      setError('Error al cargar la configuración de horarios');
    }
  };

  const cargarTurnos = async () => {
    if (!fechaSeleccionada) return;
    
    setLoading(true);
    try {
      // Cargar horarios disponibles
      const horariosResponse = await axios.get(`/api/configuracion-horarios/cancha/${canchaId}/horarios-disponibles`, {
        params: { fecha: fechaSeleccionada }
      });

      // Cargar reservas existentes para esa fecha
      const reservasResponse = await axios.get(`/api/reservas/cancha/${canchaId}`, {
        params: { fecha: fechaSeleccionada }
      });

      const horariosDisponibles = horariosResponse.data.horarios || [];
      const reservasExistentes = reservasResponse.data || [];

      // Generar turnos con estado
      const turnosGenerados = generarTurnosConEstado(horariosDisponibles, reservasExistentes);
      setTurnos(turnosGenerados);
      setReservas(reservasExistentes);
    } catch (error) {
      console.error('Error al cargar turnos:', error);
      setError('Error al cargar los turnos');
    } finally {
      setLoading(false);
    }
  };

  const generarTurnosConEstado = (horariosDisponibles, reservasExistentes) => {
    if (!configuracion) return [];

    const turnos = [];
    const { horaApertura, horaCierre, duracionTurnoMinutos } = configuracion;

    // Convertir horas a minutos para facilitar cálculos
    const [horaAperturaH, horaAperturaM] = horaApertura.split(':').map(Number);
    const [horaCierreH, horaCierreM] = horaCierre.split(':').map(Number);
    
    const minutosApertura = horaAperturaH * 60 + horaAperturaM;
    const minutosCierre = horaCierreH * 60 + horaCierreM;

    // Generar todos los turnos posibles
    for (let minutos = minutosApertura; minutos < minutosCierre; minutos += duracionTurnoMinutos) {
      const horaInicio = Math.floor(minutos / 60);
      const minutoInicio = minutos % 60;
      const horaFin = Math.floor((minutos + duracionTurnoMinutos) / 60);
      const minutoFin = (minutos + duracionTurnoMinutos) % 60;

      const horaInicioStr = `${horaInicio.toString().padStart(2, '0')}:${minutoInicio.toString().padStart(2, '0')}`;
      const horaFinStr = `${horaFin.toString().padStart(2, '0')}:${minutoFin.toString().padStart(2, '0')}`;

      // Verificar si hay una reserva para este turno
      const reservaExistente = reservasExistentes.find(reserva => {
        const horaInicioReserva = new Date(reserva.fechaInicio).toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        return horaInicioReserva === horaInicioStr;
      });

      let estado = 'disponible';
      let detalleReserva = null;

      if (reservaExistente) {
        estado = reservaExistente.estado === 'CONFIRMADA' ? 'ocupado' : 'pendiente';
        detalleReserva = reservaExistente;
      }

      turnos.push({
        id: `${fechaSeleccionada}-${horaInicioStr}`,
        horaInicio: horaInicioStr,
        horaFin: horaFinStr,
        estado,
        reserva: detalleReserva,
        precio: cancha?.precioPorHora || 0
      });
    }

    return turnos;
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'disponible':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'ocupado':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'pendiente':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'bloqueado':
        return 'bg-gray-100 border-gray-300 text-gray-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'disponible':
        return '✅ Disponible';
      case 'ocupado':
        return '🔴 Ocupado';
      case 'pendiente':
        return '⏳ Pendiente';
      case 'bloqueado':
        return '🚫 Bloqueado';
      default:
        return '❓ Desconocido';
    }
  };

  const cambiarFecha = (dias) => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + dias);
    setFechaSeleccionada(nuevaFecha.toISOString().split('T')[0]);
  };

  const fechaObj = new Date(fechaSeleccionada + 'T00:00:00');
  const diaSemana = diasSemana[fechaObj.getDay()];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Gestión de Turnos</h2>
                <p className="text-purple-100">{cancha?.nombre}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors duration-200 p-1 rounded-lg hover:bg-white hover:bg-opacity-20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-700 font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Selector de fecha */}
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => cambiarFecha(-1)}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="text-center">
                  <input
                    type="date"
                    value={fechaSeleccionada}
                    onChange={(e) => setFechaSeleccionada(e.target.value)}
                    className="text-lg font-semibold bg-transparent border-none focus:outline-none"
                  />
                  <p className="text-sm text-gray-600">{diaSemana}</p>
                </div>

                <button
                  onClick={() => cambiarFecha(1)}
                  className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span>Disponible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span>Ocupado</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span>Pendiente</span>
                </div>
              </div>
            </div>
          </div>

          {/* Información de configuración */}
          {configuracion && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-4 text-sm text-blue-800">
                <span><strong>Horario:</strong> {configuracion.horaApertura} - {configuracion.horaCierre}</span>
                <span><strong>Duración:</strong> {configuracion.duracionTurnoMinutos} min</span>
                <span><strong>Total turnos:</strong> {turnos.length}</span>
                <span><strong>Disponibles:</strong> {turnos.filter(t => t.estado === 'disponible').length}</span>
              </div>
            </div>
          )}

          {/* Grid de turnos */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {turnos.map((turno) => (
                <div
                  key={turno.id}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getEstadoColor(turno.estado)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-lg">
                        {turno.horaInicio} - {turno.horaFin}
                      </div>
                      <div className="text-sm opacity-75">
                        ${turno.precio.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-xs font-medium">
                      {getEstadoTexto(turno.estado)}
                    </div>
                  </div>

                  {turno.reserva && (
                    <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                      <div className="text-xs space-y-1">
                        <div><strong>Cliente:</strong> {turno.reserva.jugador}</div>
                        <div><strong>Estado:</strong> {turno.reserva.estado}</div>
                        {turno.reserva.telefono && (
                          <div><strong>Tel:</strong> {turno.reserva.telefono}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {turno.estado === 'disponible' && (
                    <div className="mt-3 pt-3 border-t border-current border-opacity-20">
                      <button className="w-full text-xs bg-white bg-opacity-50 hover:bg-opacity-75 px-2 py-1 rounded transition-colors">
                        Bloquear turno
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {turnos.length === 0 && !loading && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">No hay turnos configurados</p>
              <p className="text-sm">Configura primero los horarios de la cancha</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionTurnos;
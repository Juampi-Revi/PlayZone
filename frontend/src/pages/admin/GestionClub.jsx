import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClubAPI } from '../../hooks';

const GestionClub = () => {
  const { user } = useAuth();
  const clubAPI = useClubAPI();
  const [clubData, setClubData] = useState({
    nombre: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    horarioAtencion: '',
    horaApertura: '08:00',
    horaCierre: '22:00',
    diasAbierto: [0, 1, 2, 3, 4, 5, 6], // Lunes a Domingo por defecto
    servicios: [],
    politicasCancelacion: '',
    reglasGenerales: ''
  });
  const [clubId, setClubId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [hasClub, setHasClub] = useState(false);

  const serviciosDisponibles = [
    'Estacionamiento',
    'Vestuarios',
    'Duchas',
    'Cafetería',
    'Tienda deportiva',
    'Alquiler de equipos',
    'Entrenador personal',
    'Primeros auxilios',
    'WiFi gratuito',
    'Aire acondicionado'
  ];

  // Funciones auxiliares para el manejo de horarios
  const generarOpcionesHora = () => {
    const opciones = [];
    for (let hora = 6; hora <= 23; hora++) {
      for (let minuto = 0; minuto < 60; minuto += 30) {
        const horaStr = hora.toString().padStart(2, '0');
        const minutoStr = minuto.toString().padStart(2, '0');
        opciones.push(`${horaStr}:${minutoStr}`);
      }
    }
    return opciones;
  };

  const formatearHorario = (data) => {
    if (!data.horaApertura || !data.horaCierre || !data.diasAbierto) {
      return 'No especificado';
    }

    const diasNombres = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const diasSeleccionados = data.diasAbierto.map(index => diasNombres[index]);
    
    if (diasSeleccionados.length === 7) {
      return `Todos los días: ${data.horaApertura} - ${data.horaCierre}`;
    } else if (diasSeleccionados.length === 0) {
      return 'Cerrado';
    } else {
      return `${diasSeleccionados.join(', ')}: ${data.horaApertura} - ${data.horaCierre}`;
    }
  };

  const parseHorarioExistente = (horarioTexto) => {
    // Intentar parsear el horario existente en texto libre
    if (!horarioTexto) return { horaApertura: '08:00', horaCierre: '22:00', diasAbierto: [0, 1, 2, 3, 4, 5, 6] };
    
    // Buscar patrones de hora (ej: "8:00", "08:00", "8.00")
    const horaRegex = /(\d{1,2})[:.]\d{2}/g;
    const horas = horarioTexto.match(horaRegex);
    
    if (horas && horas.length >= 2) {
      return {
        horaApertura: horas[0].replace('.', ':').padStart(5, '0'),
        horaCierre: horas[1].replace('.', ':').padStart(5, '0'),
        diasAbierto: [0, 1, 2, 3, 4, 5, 6] // Por defecto todos los días
      };
    }
    
    return { horaApertura: '08:00', horaCierre: '22:00', diasAbierto: [0, 1, 2, 3, 4, 5, 6] };
  };

  const handleHorarioChange = (e) => {
    const { name, value } = e.target;
    setClubData(prev => {
      const newData = { ...prev, [name]: value };
      // Actualizar el horarioAtencion con el formato legible
      newData.horarioAtencion = formatearHorario(newData);
      return newData;
    });
  };

  const handleDiaToggle = (diaIndex) => {
    setClubData(prev => {
      const newDiasAbierto = prev.diasAbierto.includes(diaIndex)
        ? prev.diasAbierto.filter(d => d !== diaIndex)
        : [...prev.diasAbierto, diaIndex].sort();
      
      const newData = { ...prev, diasAbierto: newDiasAbierto };
      // Actualizar el horarioAtencion con el formato legible
      newData.horarioAtencion = formatearHorario(newData);
      return newData;
    });
  };

  useEffect(() => {
    cargarDatosClub();
  }, [user]);

  const cargarDatosClub = async () => {
    if (!user) return;
    
    setInitialLoading(true);
    setMessage('');
    try {
      const result = await clubAPI.getMiClub();

      if (result.success) {
        const club = result.data.club || result.data;
        const horarioParsed = parseHorarioExistente(club.horarioAtencion);
        
        setClubData({
          nombre: club.nombre || '',
          descripcion: club.descripcion || '',
          direccion: club.direccion || '',
          telefono: club.telefono || '',
          email: club.email || '',
          sitioWeb: club.sitioWeb || '',
          horarioAtencion: club.horarioAtencion || '',
          horaApertura: horarioParsed.horaApertura,
          horaCierre: horarioParsed.horaCierre,
          diasAbierto: horarioParsed.diasAbierto,
          servicios: Array.isArray(club.servicios) ? club.servicios : (club.servicios ? club.servicios.split(',').filter(s => s.trim()) : []),
          politicasCancelacion: club.politicasCancelacion || '',
          reglasGenerales: club.reglasGenerales || ''
        });
        setClubId(club.id);
        setHasClub(true);
      } else {
        // El usuario no tiene un club registrado
        setHasClub(false);
        setIsEditing(true); // Activar modo edición para crear el club
      }
    } catch (error) {
      console.error('Error al cargar datos del club:', error);
      setHasClub(false);
      setIsEditing(true); // Activar modo edición si hay error
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClubData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServicioToggle = (servicio) => {
    setClubData(prev => ({
      ...prev,
      servicios: prev.servicios.includes(servicio)
        ? prev.servicios.filter(s => s !== servicio)
        : [...prev.servicios, servicio]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const clubPayload = {
        ...clubData,
        servicios: clubData.servicios,
        propietarioId: user.id
      };

      let result;
      if (hasClub && clubId) {
        // Actualizar club existente
        result = await clubAPI.updateClub(clubId, clubPayload);
      } else {
        // Crear nuevo club
        result = await clubAPI.createClub(clubPayload);
      }

      if (result.success) {
        const club = result.data;
        setClubId(club.id);
        setHasClub(true);
        setMessage(hasClub ? 'Información del club actualizada correctamente' : 'Club creado correctamente');
        setIsEditing(false);
        
        // Notificar al dashboard que debe actualizar el onboarding
        window.dispatchEvent(new CustomEvent('clubInfoUpdated'));
      } else {
        throw new Error(result.error || 'Error al guardar el club');
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Loader inicial */}
      {initialLoading ? (
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Cargando información del club...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {hasClub ? 'Gestión del Club' : 'Configura tu club'}
                </h1>
                <p className="text-gray-600">
                  {hasClub ? 'Administra la información de tu club' : 'Completa la información para configurar tu club'}
                </p>
              </div>
              {hasClub && !isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
                >
                  Editar Información
                </button>
              )}
            </div>
          </div>

          {/* Mensaje de estado */}
          {message && (
            <div className={`p-4 rounded-lg ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          {/* Vista Previa del Club */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Vista Previa Pública
            </h2>
            
            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{clubData.nombre || 'Nombre del Club'}</h3>
              <p className="text-gray-600 mb-4">{clubData.descripcion || 'Descripción del club'}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong>Dirección:</strong> {clubData.direccion || 'No especificada'}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span><strong>Teléfono:</strong> {clubData.telefono || 'No especificado'}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span><strong>Email:</strong> {clubData.email || 'No especificado'}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span><strong>Horarios:</strong> {clubData.horarioAtencion || 'No especificados'}</span>
                </div>
              </div>
              
              {clubData.servicios.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <strong className="text-sm">Servicios:</strong>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {clubData.servicios.map((servicio) => (
                      <span
                        key={servicio}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Información Básica
              </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Club
              </label>
              <input
                type="text"
                name="nombre"
                value={clubData.nombre}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={clubData.descripcion}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Describe tu club..."
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                value={clubData.direccion}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={clubData.telefono}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={clubData.email}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sitio Web
              </label>
              <input
                type="url"
                name="sitioWeb"
                value={clubData.sitioWeb}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Atención
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Hora de Apertura
                    </label>
                    <select
                      name="horaApertura"
                      value={clubData.horaApertura || '08:00'}
                      onChange={handleHorarioChange}
                      disabled={!isEditing && hasClub}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    >
                      {generarOpcionesHora().map(hora => (
                        <option key={hora} value={hora}>{hora}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Hora de Cierre
                    </label>
                    <select
                      name="horaCierre"
                      value={clubData.horaCierre || '22:00'}
                      onChange={handleHorarioChange}
                      disabled={!isEditing && hasClub}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                    >
                      {generarOpcionesHora().map(hora => (
                        <option key={hora} value={hora}>{hora}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((dia, index) => (
                    <label key={dia} className="flex flex-col items-center">
                      <span className="text-xs text-gray-600 mb-1">{dia}</span>
                      <input
                        type="checkbox"
                        checked={clubData.diasAbierto ? clubData.diasAbierto.includes(index) : true}
                        onChange={() => handleDiaToggle(index)}
                        disabled={!isEditing && hasClub}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
                {clubData.horaApertura && clubData.horaCierre && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    <strong>Horario:</strong> {formatearHorario(clubData)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Servicios Disponibles
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {serviciosDisponibles.map((servicio) => (
              <label
                key={servicio}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  clubData.servicios.includes(servicio)
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-700'
                } ${!isEditing && hasClub ? 'cursor-not-allowed opacity-60' : 'hover:bg-blue-50'}`}
              >
                <input
                  type="checkbox"
                  checked={clubData.servicios.includes(servicio)}
                  onChange={() => handleServicioToggle(servicio)}
                  disabled={!isEditing && hasClub}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{servicio}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Políticas y Reglas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Políticas y Reglas
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Políticas de Cancelación
              </label>
              <textarea
                name="politicasCancelacion"
                value={clubData.politicasCancelacion}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Describe las políticas de cancelación..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reglas Generales
              </label>
              <textarea
                name="reglasGenerales"
                value={clubData.reglasGenerales}
                onChange={handleInputChange}
                disabled={!isEditing && hasClub}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Describe las reglas generales del club..."
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        {(isEditing || !hasClub) && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-end space-x-4">
              {hasClub && isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    cargarDatosClub(); // Recargar datos originales
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>{loading ? 'Guardando...' : hasClub ? 'Guardar Cambios' : 'Guardar Información'}</span>
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  )}
</div>
);
};

export default GestionClub;
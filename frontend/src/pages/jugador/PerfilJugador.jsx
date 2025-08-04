import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePerfilJugador } from '../../hooks/usePerfilJugador';

const PerfilJugador = () => {
  const { user } = useAuth();
  const {
    perfil,
    loading,
    error,
    adjetivosDisponibles,
    deportesDisponibles,
    guardarPerfil,
    agregarDeporte,
    actualizarDeporte,
    eliminarDeporte,
    agregarAdjetivo,
    removerAdjetivo
  } = usePerfilJugador();

  const [formData, setFormData] = useState({
    fechaNacimiento: '',
    altura: '',
    peso: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [showDeporteModal, setShowDeporteModal] = useState(false);
  const [showAdjetivoModal, setShowAdjetivoModal] = useState(false);
  const [editingDeporte, setEditingDeporte] = useState(null);
  
  const [nuevoDeporte, setNuevoDeporte] = useState({
    deporte: '',
    puntuacion: 3.0,
    posicion: '',
    anosExperiencia: 0,
    nivel: 'INTERMEDIO'
  });

  const [nuevoAdjetivo, setNuevoAdjetivo] = useState('');

  // Cargar datos del perfil cuando se actualice
  useEffect(() => {
    if (perfil) {
      setFormData({
        fechaNacimiento: perfil.fechaNacimiento || '',
        altura: perfil.altura || '',
        peso: perfil.peso || ''
      });
    }
  }, [perfil]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const resultado = await guardarPerfil(formData);
    if (resultado.success) {
      setMessage(resultado.message);
      setIsEditing(false);
    } else {
      setMessage(resultado.message);
    }
  };

  const handleAgregarDeporte = async (e) => {
    e.preventDefault();
    setMessage('');

    const resultado = await agregarDeporte(
      nuevoDeporte.deporte,
      nuevoDeporte.puntuacion,
      nuevoDeporte.posicion,
      nuevoDeporte.anosExperiencia,
      nuevoDeporte.nivel
    );

    if (resultado.success) {
      setMessage(resultado.message);
      setShowDeporteModal(false);
      setNuevoDeporte({
        deporte: '',
        puntuacion: 3.0,
        posicion: '',
        anosExperiencia: 0,
        nivel: 'INTERMEDIO'
      });
    } else {
      setMessage(resultado.message);
    }
  };

  const handleEditarDeporte = (deporte) => {
    setEditingDeporte(deporte);
    setNuevoDeporte({
      deporte: deporte.deporte,
      puntuacion: deporte.puntuacion,
      posicion: deporte.posicion || '',
      anosExperiencia: deporte.anosExperiencia || 0,
      nivel: deporte.nivel || 'INTERMEDIO'
    });
    setShowDeporteModal(true);
  };

  const handleActualizarDeporte = async (e) => {
    e.preventDefault();
    setMessage('');

    const resultado = await actualizarDeporte(
      editingDeporte.deporte,
      nuevoDeporte
    );

    if (resultado.success) {
      setMessage(resultado.message);
      setShowDeporteModal(false);
      setEditingDeporte(null);
      setNuevoDeporte({
        deporte: '',
        puntuacion: 3.0,
        posicion: '',
        anosExperiencia: 0,
        nivel: 'INTERMEDIO'
      });
    } else {
      setMessage(resultado.message);
    }
  };

  const handleEliminarDeporte = async (deporte) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar ${deporte.deporte} de tus deportes?`)) {
      const resultado = await eliminarDeporte(deporte.deporte);
      if (resultado.success) {
        setMessage(resultado.message);
      } else {
        setMessage(resultado.message);
      }
    }
  };

  const handleAgregarAdjetivo = async (e) => {
    e.preventDefault();
    setMessage('');

    const resultado = await agregarAdjetivo(nuevoAdjetivo);
    if (resultado.success) {
      setMessage(resultado.message);
      setShowAdjetivoModal(false);
      setNuevoAdjetivo('');
    } else {
      setMessage(resultado.message);
    }
  };

  const handleRemoverAdjetivo = async (adjetivo) => {
    const resultado = await removerAdjetivo(adjetivo);
    if (resultado.success) {
      setMessage(resultado.message);
    } else {
      setMessage(resultado.message);
    }
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return '';
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      return edad - 1;
    }
    return edad;
  };

  if (loading && !perfil) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mi Perfil</h1>
            <p className="text-gray-600 mt-1">
              Gestiona tu información personal y preferencias deportivas
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>
      </div>

      {/* Mensaje de estado */}
      {message && (
        <div className={`p-4 rounded-lg border ${
          message.includes('Error') 
            ? 'bg-red-50 text-red-700 border-red-200' 
            : 'bg-green-50 text-green-700 border-green-200'
        }`}>
          <div className="flex items-center">
            <svg className={`w-5 h-5 mr-2 ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`} fill="currentColor" viewBox="0 0 20 20">
              {message.includes('Error') ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              ) : (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              )}
            </svg>
            {message}
          </div>
        </div>
      )}

      {/* Error general */}
      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Personal */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center mb-6">
            <div className="bg-emerald-100 p-3 rounded-lg mr-4">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
              <p className="text-gray-600">Datos básicos de tu perfil</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={user?.nombre || ''}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={user?.telefono || ''}
                disabled
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-500"
                placeholder="+54 9 11 1234-5678"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isEditing 
                    ? 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                    : 'border-gray-200 bg-gray-50'
                } transition-colors`}
              />
              {formData.fechaNacimiento && (
                <p className="text-sm text-gray-500 mt-1">
                  Edad: {calcularEdad(formData.fechaNacimiento)} años
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                name="altura"
                value={formData.altura}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isEditing 
                    ? 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                    : 'border-gray-200 bg-gray-50'
                } transition-colors`}
                placeholder="175"
                min="100"
                max="250"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                name="peso"
                value={formData.peso}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 rounded-lg border ${
                  isEditing 
                    ? 'border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                    : 'border-gray-200 bg-gray-50'
                } transition-colors`}
                placeholder="70"
                min="30"
                max="200"
              />
            </div>
          </div>
        </div>

        {/* Mis Deportes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Mis Deportes</h3>
                <p className="text-gray-600">Tus deportes y puntuaciones</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowDeporteModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Deporte
            </button>
          </div>
          
          {perfil?.deportes && perfil.deportes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {perfil.deportes.map((deporte, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{deporte.deporte}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {deporte.puntuacion}/5.0
                      </span>
                      <div className="flex space-x-1">
                        <button
                          type="button"
                          onClick={() => handleEditarDeporte(deporte)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Editar deporte"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEliminarDeporte(deporte)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Eliminar deporte"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Posición:</span> {deporte.posicion || 'No especificada'}</p>
                    <p><span className="font-medium">Nivel:</span> {deporte.nivel || 'No especificado'}</p>
                    <p><span className="font-medium">Experiencia:</span> {deporte.anosExperiencia} años</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
              </svg>
              <p className="text-lg font-medium">No tienes deportes agregados aún.</p>
              <p className="text-sm">Agrega tu primer deporte para comenzar.</p>
            </div>
          )}
        </div>

        {/* Mis Adjetivos */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Mis Adjetivos</h3>
                <p className="text-gray-600">Características que te describen</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAdjetivoModal(true)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Agregar Adjetivo
            </button>
          </div>
          
          {perfil?.adjetivos && perfil.adjetivos.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {perfil.adjetivos.map((adjetivo, index) => (
                <div key={index} className="flex items-center bg-purple-100 text-purple-800 px-3 py-2 rounded-lg border border-purple-200">
                  <span className="mr-2 font-medium">{adjetivo}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoverAdjetivo(adjetivo)}
                    className="text-purple-600 hover:text-purple-800 text-sm font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <p className="text-lg font-medium">No tienes adjetivos agregados aún.</p>
              <p className="text-sm">Agrega adjetivos que te describan como jugador.</p>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {perfil && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Estadísticas</h3>
                <p className="text-gray-600">Tu rendimiento y actividad</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">{perfil.ratingPromedio?.toFixed(1) || '0.0'}</div>
                <div className="text-sm text-gray-600">Rating Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{perfil.partidosJugados || 0}</div>
                <div className="text-sm text-gray-600">Partidos Jugados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{perfil.partidosGanados || 0}</div>
                <div className="text-sm text-gray-600">Partidos Ganados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  {perfil.partidosJugados > 0 
                    ? ((perfil.partidosGanados / perfil.partidosJugados) * 100).toFixed(1)
                    : '0.0'
                  }%
                </div>
                <div className="text-sm text-gray-600">% Victoria</div>
              </div>
            </div>
          </div>
        )}

        {/* Botones de Acción */}
        {isEditing && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Guardando...
                  </>
                ) : (
                  'Guardar Cambios'
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Modal para agregar/editar deporte */}
      {showDeporteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-6">
              {editingDeporte ? 'Editar Deporte' : 'Agregar Deporte'}
            </h3>
            <form onSubmit={editingDeporte ? handleActualizarDeporte : handleAgregarDeporte} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deporte
                </label>
                <select
                  value={nuevoDeporte.deporte}
                  onChange={(e) => setNuevoDeporte(prev => ({ ...prev, deporte: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  required
                >
                  <option value="">Seleccionar deporte</option>
                  {deportesDisponibles.map(deporte => (
                    <option key={deporte} value={deporte}>{deporte}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Puntuación (0.0 - 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={nuevoDeporte.puntuacion}
                  onChange={(e) => setNuevoDeporte(prev => ({ ...prev, puntuacion: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posición
                </label>
                <input
                  type="text"
                  value={nuevoDeporte.posicion}
                  onChange={(e) => setNuevoDeporte(prev => ({ ...prev, posicion: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  placeholder="Ej: Delantero, Derecha, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={nuevoDeporte.anosExperiencia}
                  onChange={(e) => setNuevoDeporte(prev => ({ ...prev, anosExperiencia: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel
                </label>
                <select
                  value={nuevoDeporte.nivel}
                  onChange={(e) => setNuevoDeporte(prev => ({ ...prev, nivel: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  required
                >
                  <option value="PRINCIPIANTE">Principiante</option>
                  <option value="INTERMEDIO">Intermedio</option>
                  <option value="AVANZADO">Avanzado</option>
                  <option value="PROFESIONAL">Profesional</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeporteModal(false);
                    setEditingDeporte(null);
                    setNuevoDeporte({
                      deporte: '',
                      puntuacion: 3.0,
                      posicion: '',
                      anosExperiencia: 0,
                      nivel: 'INTERMEDIO'
                    });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {loading ? (editingDeporte ? 'Actualizando...' : 'Agregando...') : (editingDeporte ? 'Actualizar Deporte' : 'Agregar Deporte')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para agregar adjetivo */}
      {showAdjetivoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-6">Agregar Adjetivo</h3>
            <form onSubmit={handleAgregarAdjetivo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar Adjetivo
                </label>
                <select
                  value={nuevoAdjetivo}
                  onChange={(e) => setNuevoAdjetivo(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  required
                >
                  <option value="">Seleccionar adjetivo</option>
                  {adjetivosDisponibles.map(adjetivo => (
                    <option key={adjetivo} value={adjetivo}>{adjetivo}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAdjetivoModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Agregando...' : 'Agregar Adjetivo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilJugador;
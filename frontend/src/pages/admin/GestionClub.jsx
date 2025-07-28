import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const GestionClub = () => {
  const { user } = useAuth();
  const [clubData, setClubData] = useState({
    nombre: '',
    descripcion: '',
    direccion: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    horarioAtencion: '',
    servicios: [],
    politicasCancelacion: '',
    reglasGenerales: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

  useEffect(() => {
    cargarDatosClub();
  }, []);

  const cargarDatosClub = async () => {
    try {
      // Aquí harías la llamada a la API para obtener los datos del club
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setClubData({
        nombre: 'Club Deportivo Central',
        descripcion: 'Un club moderno con las mejores instalaciones deportivas de la ciudad.',
        direccion: 'Av. Corrientes 1234, Buenos Aires',
        telefono: '+54 11 1234-5678',
        email: 'info@clubcentral.com',
        sitioWeb: 'www.clubcentral.com',
        horarioAtencion: 'Lunes a Domingo: 6:00 - 24:00',
        servicios: ['Estacionamiento', 'Vestuarios', 'Duchas', 'Cafetería'],
        politicasCancelacion: 'Cancelación gratuita hasta 2 horas antes del turno.',
        reglasGenerales: 'Uso obligatorio de calzado deportivo. Prohibido fumar en las instalaciones.'
      });
    } catch (error) {
      console.error('Error al cargar datos del club:', error);
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
      // Aquí harías la llamada a la API para actualizar los datos del club
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Información del club actualizada correctamente');
      setIsEditing(false);
    } catch (error) {
      setMessage('Error al actualizar la información del club');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">🏢</span>
              Gestión del Club
            </h1>
            <p className="text-gray-600">Administra la información de tu club</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isEditing
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isEditing ? 'Cancelar' : 'Editar Información'}
          </button>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información Básica */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📋</span>
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horario de Atención
              </label>
              <input
                type="text"
                name="horarioAtencion"
                value={clubData.horarioAtencion}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Ej: Lunes a Viernes: 8:00 - 22:00"
              />
            </div>
          </div>
        </div>

        {/* Servicios */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🛠️</span>
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
                } ${!isEditing ? 'cursor-not-allowed opacity-60' : 'hover:bg-blue-50'}`}
              >
                <input
                  type="checkbox"
                  checked={clubData.servicios.includes(servicio)}
                  onChange={() => handleServicioToggle(servicio)}
                  disabled={!isEditing}
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
            <span className="mr-2">📜</span>
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
                disabled={!isEditing}
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
                disabled={!isEditing}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50"
                placeholder="Describe las reglas generales del club..."
              />
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        {isEditing && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Vista Previa del Club */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">👁️</span>
          Vista Previa Pública
        </h2>
        
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{clubData.nombre}</h3>
          <p className="text-gray-600 mb-4">{clubData.descripcion}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>📍 Dirección:</strong> {clubData.direccion}
            </div>
            <div>
              <strong>📞 Teléfono:</strong> {clubData.telefono}
            </div>
            <div>
              <strong>📧 Email:</strong> {clubData.email}
            </div>
            <div>
              <strong>🕒 Horarios:</strong> {clubData.horarioAtencion}
            </div>
          </div>
          
          {clubData.servicios.length > 0 && (
            <div className="mt-4">
              <strong className="text-sm">🛠️ Servicios:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
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
    </div>
  );
};

export default GestionClub;
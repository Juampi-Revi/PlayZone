import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ConfiguracionHorarios from '../components/ConfiguracionHorarios';

const MisCanchas = () => {
  const { user } = useAuth();
  const [canchas, setCanchas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [configurandoCancha, setConfigurandoCancha] = useState(null);

  useEffect(() => {
    if (user && user.tipo === 'CLUB') {
      cargarMisCanchas();
    }
  }, [user]);

  const cargarMisCanchas = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/configuracion-horarios/mis-canchas', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCanchas(data.canchas);
      } else {
        setError('Error al cargar las canchas');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cargar las canchas');
    } finally {
      setLoading(false);
    }
  };

  const verificarConfiguracion = async (canchaId) => {
    try {
      const response = await fetch(`/api/configuracion-horarios/cancha/${canchaId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.existe;
      }
      return false;
    } catch (error) {
      console.error('Error al verificar configuración:', error);
      return false;
    }
  };

  const obtenerHorariosDisponibles = async (canchaId, fecha) => {
    try {
      const response = await fetch(`/api/configuracion-horarios/cancha/${canchaId}/horarios-disponibles?fecha=${fecha}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.horarios;
      }
      return [];
    } catch (error) {
      console.error('Error al obtener horarios:', error);
      return [];
    }
  };

  const toggleDisponibilidad = async (canchaId) => {
    try {
      const response = await fetch(`/api/canchas/${canchaId}/toggle-disponibilidad`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        cargarMisCanchas(); // Recargar la lista
      } else {
        setError('Error al cambiar disponibilidad');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al cambiar disponibilidad');
    }
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
        <div className="text-sm text-gray-600">
          Total: {canchas.length} cancha{canchas.length !== 1 ? 's' : ''}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {canchas.length === 0 ? (
        <div className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-8 rounded text-center">
          <h3 className="text-xl font-semibold mb-2">No tienes canchas registradas</h3>
          <p className="text-gray-600 mb-4">Contacta al administrador para registrar tus canchas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canchas.map((cancha) => (
            <div key={cancha.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagen de la cancha */}
              {cancha.imagenes && cancha.imagenes.length > 0 && (
                <img
                  src={cancha.imagenes[0]}
                  alt={cancha.nombre}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{cancha.nombre}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cancha.disponible 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {cancha.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-2">{cancha.deporte}</p>
                <p className="text-gray-600 text-sm mb-2">{cancha.ubicacion}</p>
                <p className="text-lg font-semibold text-blue-600 mb-4">
                  ${cancha.precioPorHora}/hora
                </p>

                {cancha.descripcion && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {cancha.descripcion}
                  </p>
                )}

                {/* Horario actual (legacy) */}
                {cancha.horario && (
                  <p className="text-gray-600 text-sm mb-4">
                    <span className="font-medium">Horario:</span> {cancha.horario}
                  </p>
                )}

                {/* Botones de acción */}
                <div className="space-y-2">
                  <button
                    onClick={() => setConfigurandoCancha(cancha.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  >
                    ⚙️ Configurar Horarios
                  </button>

                  <button
                    onClick={() => toggleDisponibilidad(cancha.id)}
                    className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${
                      cancha.disponible
                        ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                        : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                    }`}
                  >
                    {cancha.disponible ? '🚫 Deshabilitar' : '✅ Habilitar'}
                  </button>

                  <button
                    onClick={() => {
                      const fecha = new Date().toISOString().split('T')[0];
                      obtenerHorariosDisponibles(cancha.id, fecha).then(horarios => {
                        alert(`Horarios disponibles hoy: ${horarios.length > 0 ? horarios.join(', ') : 'Ninguno'}`);
                      });
                    }}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                  >
                    📅 Ver Horarios Hoy
                  </button>
                </div>
              </div>
            </div>
          ))}
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
          }}
        />
      )}
    </div>
  );
};

export default MisCanchas;
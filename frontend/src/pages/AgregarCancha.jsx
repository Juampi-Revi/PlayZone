import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarCancha = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    deporte: '',
    ubicacion: '',
    precioPorHora: '',
    horario: '',
    imagenes: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const deportes = [
    'Fútbol', 'Tenis', 'Pádel', 'Basketball', 'Vóley', 'Squash', 
    'Pelota Paleta', 'Hockey', 'Rugby', 'Beisbol', 'Otro'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
    setFormData(prev => ({
      ...prev,
      imagenes: urls
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

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
        throw new Error('El precio por hora debe ser mayor a 0');
      }

      const canchaData = {
        ...formData,
        precioPorHora: parseFloat(formData.precioPorHora),
        disponible: true
      };

      const response = await axios.post('http://localhost:8082/api/canchas', canchaData);
      
      setSuccess('¡Cancha agregada exitosamente!');
      setTimeout(() => {
        navigate('/administracion/listado');
      }, 2000);
    } catch (err) {
      if (err.response?.data?.errors) {
        const validationErrors = err.response.data.errors;
        const errorMessages = validationErrors.map(error => error.defaultMessage).join(', ');
        setError(`Errores de validación: ${errorMessages}`);
      } else {
        setError(err.message || 'Error al agregar la cancha');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Agregar Nueva Cancha
            </h1>
            <p className="text-gray-600">
              Completa el formulario para agregar una nueva cancha deportiva
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre de la Cancha *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Cancha Central de Fútbol"
                  required
                />
              </div>

              {/* Deporte */}
              <div>
                <label htmlFor="deporte" className="block text-sm font-medium text-gray-700 mb-2">
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
                <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe las características de la cancha..."
                />
              </div>

              {/* Ubicación */}
              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación *
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Av. San Martín 1234, Buenos Aires"
                  required
                />
              </div>

              {/* Precio por Hora */}
              <div>
                <label htmlFor="precioPorHora" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio por Hora (USD) *
                </label>
                <input
                  type="number"
                  id="precioPorHora"
                  name="precioPorHora"
                  value={formData.precioPorHora}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Horario */}
              <div>
                <label htmlFor="horario" className="block text-sm font-medium text-gray-700 mb-2">
                  Horario de Funcionamiento
                </label>
                <input
                  type="text"
                  id="horario"
                  name="horario"
                  value={formData.horario}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: Lunes a Domingo 8:00 - 22:00"
                />
              </div>

              {/* Imágenes */}
              <div>
                <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-2">
                  URLs de Imágenes
                </label>
                <textarea
                  id="imagenes"
                  name="imagenes"
                  value={formData.imagenes.join(', ')}
                  onChange={handleImageChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Separa múltiples URLs con comas
                </p>
              </div>

              {/* Error y Success Messages */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                  {success}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/administracion/listado')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Agregando...' : 'Agregar Cancha'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarCancha;
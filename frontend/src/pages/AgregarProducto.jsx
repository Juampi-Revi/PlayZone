import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    tipo: '',
    imagenes: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImagenesChange = (e) => {
    const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
    setFormData(prev => ({
      ...prev,
      imagenes: urls
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8082/api/products', formData);
      console.log('Producto creado:', response.data);
      setSuccess(true);
      
      // Limpiar formulario
      setFormData({
        nombre: '',
        descripcion: '',
        tipo: '',
        imagenes: []
      });

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/administracion/listado');
      }, 2000);

    } catch (err) {
      console.error('Error al crear producto:', err);
      if (err.response?.data) {
        // Error de validación del backend
        const validationErrors = err.response.data;
        const errorMessages = Object.values(validationErrors).join(', ');
        setError(`Error de validación: ${errorMessages}`);
      } else {
        setError('Error al crear el producto. Por favor, intenta de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const tiposProducto = [
    'Electrónicos',
    'Ropa',
    'Hogar',
    'Deportes',
    'Libros',
    'Juguetes',
    'Automotriz',
    'Salud',
    'Belleza',
    'Otros'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Agregar Nuevo Producto
          </h1>
          <p className="text-gray-600">
            Completa el formulario para agregar un nuevo producto al catálogo
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <div className="text-green-500 mr-2">✓</div>
              <span className="font-semibold">¡Producto creado exitosamente!</span>
            </div>
            <p className="text-sm mt-1">Redirigiendo al listado de productos...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex items-center">
              <div className="text-red-500 mr-2">⚠</div>
              <span className="font-semibold">Error:</span>
            </div>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                minLength={2}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: iPhone 15 Pro Max"
              />
              <p className="text-xs text-gray-500 mt-1">
                Mínimo 2 caracteres, máximo 100 caracteres
              </p>
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
                maxLength={1000}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe las características y beneficios del producto..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Máximo 1000 caracteres. {formData.descripcion.length}/1000
              </p>
            </div>

            {/* Tipo */}
            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo/Categoría *
              </label>
              <select
                id="tipo"
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una categoría</option>
                {tiposProducto.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
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
                onChange={handleImagenesChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen1.jpg, https://ejemplo.com/imagen2.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separa múltiples URLs con comas. Deja vacío si no tienes imágenes.
              </p>
            </div>

            {/* Preview de imágenes */}
            {formData.imagenes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vista Previa de Imágenes
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.imagenes.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150x100?text=Error+Imagen';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creando Producto...
                  </div>
                ) : (
                  'Crear Producto'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/administracion')}
                className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-md font-semibold hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-2">💡 Consejos</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Usa nombres descriptivos y claros para tus productos</li>
            <li>• Incluye información detallada en la descripción</li>
            <li>• Selecciona la categoría más apropiada</li>
            <li>• Las imágenes deben ser URLs válidas y accesibles</li>
            <li>• Puedes agregar múltiples imágenes separadas por comas</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto; 
import { useState } from 'react';

const GaleriaImagenes = ({ imagenes }) => {
  const [imagenActual, setImagenActual] = useState(0);

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  const imagenAnterior = () => {
    setImagenActual((prev) => 
      prev === 0 ? imagenes.length - 1 : prev - 1
    );
  };

  const imagenSiguiente = () => {
    setImagenActual((prev) => 
      prev === imagenes.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative">
      {/* Imagen principal */}
      <div className="relative h-96 overflow-hidden rounded-lg">
        <img 
          src={imagenes[imagenActual]} 
          alt={`Imagen ${imagenActual + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Error+Imagen';
          }}
        />
        
        {/* Controles de navegación */}
        {imagenes.length > 1 && (
          <>
            <button
              onClick={imagenAnterior}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
              aria-label="Imagen anterior"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={imagenSiguiente}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
              aria-label="Imagen siguiente"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Indicadores */}
        {imagenes.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {imagenes.map((_, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === imagenActual 
                    ? 'bg-white' 
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Miniaturas */}
      {imagenes.length > 1 && (
        <div className="mt-4 flex space-x-2 overflow-x-auto">
          {imagenes.map((imagen, index) => (
            <button
              key={index}
              onClick={() => setImagenActual(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === imagenActual 
                  ? 'border-blue-600' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img 
                src={imagen} 
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x80?text=Error';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GaleriaImagenes; 
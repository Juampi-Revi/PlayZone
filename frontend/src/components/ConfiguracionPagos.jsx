import React, { useState } from 'react';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  BuildingLibraryIcon,
  ClockIcon,
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const ConfiguracionPagos = ({ onComplete }) => {
  const [configuracion, setConfiguracion] = useState({
    mediosPago: {
      tarjetaCredito: { activo: true, comision: 3.5, nombre: 'Tarjeta de Crédito' },
      transferencia: { activo: true, comision: 0, nombre: 'Transferencia Bancaria' },
      efectivo: { activo: true, comision: 0, nombre: 'Efectivo' }
    },
    preciosPorHorario: [
      { horario: '06:00-12:00', nombre: 'Horario Matutino', descuento: 20 },
      { horario: '12:00-18:00', nombre: 'Horario Tarde', descuento: 0 },
      { horario: '18:00-23:00', nombre: 'Horario Prime', descuento: -15 }
    ],
    descuentosPorPago: {
      tarjetaCredito: 0,
      transferencia: 5,
      efectivo: 10
    }
  });

  const [guardado, setGuardado] = useState(false);

  const handleMedioPagoChange = (medio, campo, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      mediosPago: {
        ...prev.mediosPago,
        [medio]: {
          ...prev.mediosPago[medio],
          [campo]: valor
        }
      }
    }));
  };

  const handleHorarioChange = (index, campo, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      preciosPorHorario: prev.preciosPorHorario.map((horario, i) => 
        i === index ? { ...horario, [campo]: valor } : horario
      )
    }));
  };

  const handleDescuentoPagoChange = (medio, valor) => {
    setConfiguracion(prev => ({
      ...prev,
      descuentosPorPago: {
        ...prev.descuentosPorPago,
        [medio]: valor
      }
    }));
  };

  const agregarHorario = () => {
    setConfiguracion(prev => ({
      ...prev,
      preciosPorHorario: [
        ...prev.preciosPorHorario,
        { horario: '', nombre: '', descuento: 0 }
      ]
    }));
  };

  const eliminarHorario = (index) => {
    setConfiguracion(prev => ({
      ...prev,
      preciosPorHorario: prev.preciosPorHorario.filter((_, i) => i !== index)
    }));
  };

  const guardarConfiguracion = () => {
    // Aquí se guardaría en el backend
    console.log('Configuración guardada:', configuracion);
    setGuardado(true);
    
    // Simular guardado
    setTimeout(() => {
      onComplete && onComplete();
    }, 1500);
  };

  if (guardado) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Configuración Guardada!
          </h2>
          <p className="text-gray-600 mb-6">
            Los medios de pago y precios diferenciados han sido configurados correctamente.
          </p>
          <button
            onClick={() => onComplete && onComplete()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continuar al Dashboard de Finanzas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-2 flex items-center">
          <CreditCardIcon className="h-8 w-8 mr-3" />
          Configuración de Medios de Pago y Precios
        </h1>
        <p className="text-teal-100 mb-3">
          Define cómo tus clientes pueden pagar y establece precios inteligentes según el horario
        </p>
        <div className="bg-white bg-opacity-20 rounded-lg p-3">
          <p className="text-sm text-teal-50">
            💡 <strong>¿Qué estás configurando?</strong> Los métodos de pago que aceptarás (tarjeta, transferencia, efectivo) 
            y cómo variarán tus precios según la hora del día para maximizar tus ingresos.
          </p>
        </div>
      </div>

      {/* Medios de Pago */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
          <CreditCardIcon className="h-6 w-6 mr-2 text-teal-600" />
          Medios de Pago Disponibles
        </h2>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>¿Qué configuras aquí?</strong> Los métodos de pago que aceptarás en tu club.
              </p>
              <ul className="text-xs text-blue-600 mt-2 space-y-1">
                <li>• <strong>Comisión:</strong> Lo que te cobra el procesador de pagos (ej: Mercado Pago cobra ~3.5% por tarjeta)</li>
                <li>• <strong>Descuento al cliente:</strong> Incentivo que ofreces para promover ese método de pago</li>
                <li>• <strong>Efectivo:</strong> Sin comisiones, pero puedes dar descuentos para tener liquidez inmediata</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(configuracion.mediosPago).map(([key, medio]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {key === 'tarjetaCredito' && <CreditCardIcon className="h-5 w-5 mr-2 text-blue-600" />}
                  {key === 'transferencia' && <BuildingLibraryIcon className="h-5 w-5 mr-2 text-green-600" />}
                  {key === 'efectivo' && <BanknotesIcon className="h-5 w-5 mr-2 text-yellow-600" />}
                  <span className="font-medium text-gray-800">{medio.nombre}</span>
                </div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={medio.activo}
                    onChange={(e) => handleMedioPagoChange(key, 'activo', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Activo</span>
                </label>
              </div>
              
              {medio.activo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comisión que pagas (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={medio.comision}
                      onChange={(e) => handleMedioPagoChange(key, 'comision', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Ej: 3.5 para tarjeta"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lo que te descuenta el procesador</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descuento que ofreces (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={configuracion.descuentosPorPago[key]}
                      onChange={(e) => handleDescuentoPagoChange(key, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Ej: 10 para efectivo"
                    />
                    <p className="text-xs text-gray-500 mt-1">Incentivo para el cliente</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Precios por Horario */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <ClockIcon className="h-6 w-6 mr-2 text-teal-600" />
            Precios Diferenciados por Horario
          </h2>
          <button
            onClick={agregarHorario}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Agregar Horario
          </button>
        </div>
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>¿Qué configuras aquí?</strong> Cómo varían tus precios según la hora del día para maximizar ingresos.
              </p>
              <ul className="text-xs text-green-600 mt-2 space-y-1">
                <li>• <strong>Horario Matutino:</strong> Menos demanda = precios más bajos (descuentos)</li>
                <li>• <strong>Horario Prime:</strong> Alta demanda = precios más altos (recargos)</li>
                <li>• <strong>Ajuste positivo:</strong> Descuento al cliente (ej: +20% = 20% menos)</li>
                <li>• <strong>Ajuste negativo:</strong> Recargo al precio base (ej: -15% = 15% más caro)</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          {configuracion.preciosPorHorario.map((horario, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rango Horario
                  </label>
                  <input
                    type="text"
                    value={horario.horario}
                    onChange={(e) => handleHorarioChange(index, 'horario', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: 09:00-12:00"
                  />
                  <p className="text-xs text-gray-500 mt-1">Formato: HH:MM-HH:MM</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del Período
                  </label>
                  <input
                    type="text"
                    value={horario.nombre}
                    onChange={(e) => handleHorarioChange(index, 'nombre', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: Horario Matutino"
                  />
                  <p className="text-xs text-gray-500 mt-1">Nombre descriptivo del período</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Modificación del Precio (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={horario.descuento}
                    onChange={(e) => handleHorarioChange(index, 'descuento', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Ej: -15 para recargo del 15%"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="text-green-600">Positivo = descuento</span> | <span className="text-red-600">Negativo = recargo</span>
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => eliminarHorario(index)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 border-2 border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
          <CurrencyDollarIcon className="h-5 w-5 mr-2 text-teal-600" />
          Resumen de tu Configuración
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Así quedará configurado tu sistema de pagos y precios:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <CreditCardIcon className="h-4 w-4 mr-2 text-blue-600" />
              Métodos de Pago que Aceptarás:
            </h4>
            <ul className="space-y-2 text-sm">
              {Object.entries(configuracion.mediosPago).filter(([_, medio]) => medio.activo).map(([key, medio]) => (
                <li key={key} className="bg-blue-50 p-2 rounded border-l-3 border-blue-400">
                  <div className="font-medium text-blue-800">{medio.nombre}</div>
                  <div className="text-blue-600 text-xs">
                    Pagas {medio.comision}% de comisión • Ofreces {configuracion.descuentosPorPago[key]}% de descuento
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-700 mb-3 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2 text-green-600" />
              Precios según Horario:
            </h4>
            <ul className="space-y-2 text-sm">
              {configuracion.preciosPorHorario.map((horario, index) => (
                <li key={index} className="bg-green-50 p-2 rounded border-l-3 border-green-400">
                  <div className="font-medium text-green-800">
                    {horario.horario} - {horario.nombre}
                  </div>
                  <div className="text-green-600 text-xs">
                    {horario.descuento > 0 
                      ? `${horario.descuento}% de descuento (precio más bajo)` 
                      : horario.descuento < 0 
                        ? `${Math.abs(horario.descuento)}% de recargo (precio más alto)`
                        : 'Precio base (sin modificación)'
                    }
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="flex justify-end">
        <button
          onClick={guardarConfiguracion}
          className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors flex items-center text-lg font-medium"
        >
          <CheckCircleIcon className="h-5 w-5 mr-2" />
          Guardar Configuración
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionPagos;
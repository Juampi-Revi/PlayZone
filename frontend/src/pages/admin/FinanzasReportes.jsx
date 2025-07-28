import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const FinanzasReportes = () => {
  const { user } = useAuth();
  const [periodo, setPeriodo] = useState('mes');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [datosFinancieros, setDatosFinancieros] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    cargarDatosFinancieros();
  }, [periodo, fechaInicio, fechaFin]);

  const cargarDatosFinancieros = async () => {
    setLoading(true);
    try {
      // Aquí harías la llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDatosFinancieros({
        resumen: {
          ingresosTotales: 125000,
          reservasCompletadas: 45,
          reservasCanceladas: 8,
          promedioReserva: 2778,
          crecimientoMensual: 12.5
        },
        ingresosPorCancha: [
          { cancha: 'Cancha de Fútbol 1', ingresos: 45000, reservas: 18, promedio: 2500 },
          { cancha: 'Cancha de Fútbol 2', ingresos: 38000, reservas: 15, promedio: 2533 },
          { cancha: 'Cancha de Tenis 1', ingresos: 25000, reservas: 10, promedio: 2500 },
          { cancha: 'Cancha de Básquet', ingresos: 17000, reservas: 2, promedio: 8500 }
        ],
        ingresosPorDia: [
          { dia: 'Lunes', ingresos: 15000, reservas: 6 },
          { dia: 'Martes', ingresos: 12000, reservas: 5 },
          { dia: 'Miércoles', ingresos: 18000, reservas: 7 },
          { dia: 'Jueves', ingresos: 20000, reservas: 8 },
          { dia: 'Viernes', ingresos: 25000, reservas: 9 },
          { dia: 'Sábado', ingresos: 22000, reservas: 7 },
          { dia: 'Domingo', ingresos: 13000, reservas: 3 }
        ],
        metodosPago: [
          { metodo: 'Tarjeta de crédito', cantidad: 25, porcentaje: 55.6, ingresos: 69500 },
          { metodo: 'Transferencia', cantidad: 12, porcentaje: 26.7, ingresos: 33350 },
          { metodo: 'Efectivo', cantidad: 8, porcentaje: 17.8, ingresos: 22150 }
        ],
        horariosPopulares: [
          { hora: '18:00-19:00', reservas: 12, ingresos: 30000 },
          { hora: '19:00-20:00', reservas: 10, ingresos: 25000 },
          { hora: '20:00-21:00', reservas: 8, ingresos: 20000 },
          { hora: '17:00-18:00', reservas: 7, ingresos: 17500 },
          { hora: '16:00-17:00', reservas: 5, ingresos: 12500 }
        ]
      });
    } catch (error) {
      console.error('Error al cargar datos financieros:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportarReporte = (formato) => {
    // Aquí implementarías la lógica para exportar el reporte
    console.log(`Exportando reporte en formato ${formato}`);
    alert(`Reporte exportado en formato ${formato}`);
  };

  if (loading || !datosFinancieros) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-gray-600">Cargando datos financieros...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">💰</span>
              Finanzas y Reportes
            </h1>
            <p className="text-gray-600">Análisis financiero y reportes de tu club</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => exportarReporte('PDF')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              📄 Exportar PDF
            </button>
            <button
              onClick={() => exportarReporte('Excel')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              📊 Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Filtros de período */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Período de Análisis</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Período
            </label>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="semana">Esta semana</option>
              <option value="mes">Este mes</option>
              <option value="trimestre">Este trimestre</option>
              <option value="año">Este año</option>
              <option value="personalizado">Personalizado</option>
            </select>
          </div>
          
          {periodo === 'personalizado' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  value={fechaInicio}
                  onChange={(e) => setFechaInicio(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha fin
                </label>
                <input
                  type="date"
                  value={fechaFin}
                  onChange={(e) => setFechaFin(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-green-600">
                ${datosFinancieros.resumen.ingresosTotales.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💵</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm text-green-600">
              +{datosFinancieros.resumen.crecimientoMensual}% vs mes anterior
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reservas Completadas</p>
              <p className="text-2xl font-bold text-blue-600">
                {datosFinancieros.resumen.reservasCompletadas}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reservas Canceladas</p>
              <p className="text-2xl font-bold text-red-600">
                {datosFinancieros.resumen.reservasCanceladas}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❌</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promedio por Reserva</p>
              <p className="text-2xl font-bold text-purple-600">
                ${datosFinancieros.resumen.promedioReserva.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Cancelación</p>
              <p className="text-2xl font-bold text-orange-600">
                {((datosFinancieros.resumen.reservasCanceladas / (datosFinancieros.resumen.reservasCompletadas + datosFinancieros.resumen.reservasCanceladas)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ingresos por cancha */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🏟️</span>
          Ingresos por Cancha
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cancha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ingresos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reservas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {datosFinancieros.ingresosPorCancha.map((cancha, index) => {
                const participacion = (cancha.ingresos / datosFinancieros.resumen.ingresosTotales * 100).toFixed(1);
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {cancha.cancha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${cancha.ingresos.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {cancha.reservas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${cancha.promedio.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${participacion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{participacion}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingresos por día */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📅</span>
            Ingresos por Día de la Semana
          </h2>
          
          <div className="space-y-3">
            {datosFinancieros.ingresosPorDia.map((dia, index) => {
              const maxIngresos = Math.max(...datosFinancieros.ingresosPorDia.map(d => d.ingresos));
              const porcentaje = (dia.ingresos / maxIngresos * 100);
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-20 text-sm font-medium text-gray-700">
                    {dia.dia}
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" 
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ${dia.ingresos.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {dia.reservas} reservas
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Métodos de pago */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💳</span>
            Métodos de Pago
          </h2>
          
          <div className="space-y-4">
            {datosFinancieros.metodosPago.map((metodo, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {metodo.metodo}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {metodo.porcentaje}%
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${metodo.porcentaje}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{metodo.cantidad} transacciones</span>
                  <span>${metodo.ingresos.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horarios populares */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🕐</span>
          Horarios Más Populares
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {datosFinancieros.horariosPopulares.map((horario, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-800 mb-1">
                  {horario.hora}
                </div>
                <div className="text-sm text-blue-600 mb-2">
                  {horario.reservas} reservas
                </div>
                <div className="text-sm font-semibold text-blue-900">
                  ${horario.ingresos.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resumen y recomendaciones */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">💡</span>
          Insights y Recomendaciones
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Fortalezas</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Los viernes son tu día más rentable</li>
                <li>• La Cancha de Fútbol 1 genera el 36% de tus ingresos</li>
                <li>• El horario de 18:00-19:00 es el más demandado</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📈 Oportunidades</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Promocionar los martes para aumentar reservas</li>
                <li>• Optimizar precios en horarios de menor demanda</li>
                <li>• Incentivar el uso de transferencias (menor comisión)</li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Atención</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Tasa de cancelación del 15% (revisar políticas)</li>
                <li>• La Cancha de Básquet tiene pocas reservas</li>
                <li>• Los domingos tienen baja actividad</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">🎯 Acciones Sugeridas</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Crear promociones para días de baja demanda</li>
                <li>• Implementar descuentos por reservas anticipadas</li>
                <li>• Analizar la satisfacción del cliente</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanzasReportes;
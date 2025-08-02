import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  CurrencyDollarIcon,
  DocumentArrowDownIcon,
  TableCellsIcon,
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  ClockIcon,
  ChartBarIcon,
  LightBulbIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CogIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const FinanzasReportes = () => {
  const { user } = useAuth();
  const [periodo, setPeriodo] = useState('mes');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados para configuración de métodos de pago
  const [mostrarModalMetodosPago, setMostrarModalMetodosPago] = useState(false);
  const [metodosPagoConfig, setMetodosPagoConfig] = useState([
    {
      id: 1,
      nombre: 'Efectivo',
      activo: true,
      comision: 0,
      descuentoCliente: 0,
      descripcion: 'Pago en efectivo al momento de la reserva'
    },
    {
      id: 2,
      nombre: 'Tarjeta de Débito',
      activo: true,
      comision: 2.5,
      descuentoCliente: 0,
      descripcion: 'Pago con tarjeta de débito'
    },
    {
      id: 3,
      nombre: 'Tarjeta de Crédito',
      activo: true,
      comision: 3.5,
      descuentoCliente: 0,
      descripcion: 'Pago con tarjeta de crédito'
    },
    {
      id: 4,
      nombre: 'Transferencia Bancaria',
      activo: true,
      comision: 1.0,
      descuentoCliente: 5,
      descripcion: 'Transferencia bancaria con descuento'
    },
    {
      id: 5,
      nombre: 'Mercado Pago',
      activo: false,
      comision: 4.0,
      descuentoCliente: 0,
      descripcion: 'Pago a través de Mercado Pago'
    }
  ]);
  const [metodoEditando, setMetodoEditando] = useState(null);
  const [datosFinancieros, setDatosFinancieros] = useState(null);

  useEffect(() => {
    cargarDatosFinancieros();
  }, [periodo, fechaInicio, fechaFin]);

  const cargarDatosFinancieros = async () => {
    setLoading(true);
    try {
      // Aquí harías la llamada a la API real
      // const response = await fetch('/api/finanzas/reportes');
      // const data = await response.json();
      
      // Por ahora simulamos una respuesta vacía
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDatosFinancieros({
        resumen: {
          ingresosTotales: 0,
          reservasCompletadas: 0,
          reservasCanceladas: 0,
          promedioReserva: 0,
          crecimientoMensual: 0
        },
        ingresosPorCancha: [],
        ingresosPorDia: [],
        metodosPago: [],
        horariosPopulares: [],
        preciosPorHorario: []
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

  // Funciones para configuración de métodos de pago
  const abrirModalMetodosPago = () => {
    setMostrarModalMetodosPago(true);
  };

  const cerrarModalMetodosPago = () => {
    setMostrarModalMetodosPago(false);
    setMetodoEditando(null);
  };

  const toggleMetodoPago = (id) => {
    setMetodosPagoConfig(prev => 
      prev.map(metodo => 
        metodo.id === id ? { ...metodo, activo: !metodo.activo } : metodo
      )
    );
  };

  const editarMetodoPago = (metodo) => {
    setMetodoEditando({ ...metodo });
  };

  const guardarMetodoPago = () => {
    if (metodoEditando) {
      setMetodosPagoConfig(prev => 
        prev.map(metodo => 
          metodo.id === metodoEditando.id ? metodoEditando : metodo
        )
      );
      setMetodoEditando(null);
    }
  };

  const agregarNuevoMetodo = () => {
    const nuevoId = Math.max(...metodosPagoConfig.map(m => m.id)) + 1;
    const nuevoMetodo = {
      id: nuevoId,
      nombre: 'Nuevo Método',
      activo: true,
      comision: 0,
      descuentoCliente: 0,
      descripcion: 'Descripción del nuevo método de pago'
    };
    setMetodosPagoConfig(prev => [...prev, nuevoMetodo]);
    setMetodoEditando(nuevoMetodo);
  };

  const eliminarMetodoPago = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este método de pago?')) {
      setMetodosPagoConfig(prev => prev.filter(metodo => metodo.id !== id));
    }
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
              <CurrencyDollarIcon className="h-8 w-8 text-green-600 mr-2" />
              Finanzas y Reportes
            </h1>
            <p className="text-gray-600">Análisis financiero y reportes de tu club</p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => exportarReporte('PDF')}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Exportar PDF
            </button>
            <button
              onClick={() => exportarReporte('Excel')}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <TableCellsIcon className="h-5 w-5" />
              Exportar Excel
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
            <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
          </div>
          {datosFinancieros.resumen.crecimientoMensual > 0 && (
            <div className="mt-2">
              <span className="text-sm text-green-600">
                +{datosFinancieros.resumen.crecimientoMensual}% vs mes anterior
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Reservas Completadas</p>
              <p className="text-2xl font-bold text-blue-600">
                {datosFinancieros.resumen.reservasCompletadas}
              </p>
            </div>
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
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
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
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
            <ChartBarIcon className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tasa de Cancelación</p>
              <p className="text-2xl font-bold text-orange-600">
                {datosFinancieros.resumen.reservasCompletadas + datosFinancieros.resumen.reservasCanceladas > 0 
                  ? ((datosFinancieros.resumen.reservasCanceladas / (datosFinancieros.resumen.reservasCompletadas + datosFinancieros.resumen.reservasCanceladas)) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Ingresos por cancha */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <BuildingStorefrontIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Ingresos por Cancha
          </h2>
        </div>
        
        {datosFinancieros.ingresosPorCancha.length > 0 ? (
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
                  const participacion = datosFinancieros.resumen.ingresosTotales > 0 ? (cancha.ingresos / datosFinancieros.resumen.ingresosTotales * 100).toFixed(1) : 0;
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <BuildingStorefrontIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No hay datos de ingresos por cancha disponibles</p>
            <p className="text-sm">Los datos aparecerán aquí una vez que tengas reservas confirmadas</p>
          </div>
        )}
      </div>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingresos por día */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDaysIcon className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Ingresos por Día de la Semana
            </h2>
          </div>
          
          {datosFinancieros.ingresosPorDia.length > 0 ? (
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
          ) : (
            <div className="text-center py-8 text-gray-500">
              <CalendarDaysIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No hay datos de ingresos por día disponibles</p>
              <p className="text-sm">Los datos aparecerán aquí una vez que tengas reservas confirmadas</p>
            </div>
          )}
        </div>

        {/* Métodos de pago */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCardIcon className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                Análisis de Métodos de Pago
              </h2>
            </div>
            <button
              onClick={abrirModalMetodosPago}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <CogIcon className="h-4 w-4" />
              Configurar
            </button>
          </div>
          
          {datosFinancieros.metodosPago.length > 0 ? (
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
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${metodo.porcentaje}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Transacciones:</span>
                    <div className="font-semibold">{metodo.cantidad}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Ingresos Brutos:</span>
                    <div className="font-semibold">${metodo.ingresos.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Comisión:</span>
                    <div className="font-semibold text-red-600">{metodo.comision}%</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Ingresos Netos:</span>
                    <div className="font-semibold text-green-600">${metodo.ingresoNeto.toLocaleString()}</div>
                  </div>
                </div>
                
                {metodo.descuentoCliente > 0 && (
                  <div className="mt-2 text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    💡 Descuento al cliente: {metodo.descuentoCliente}% (incentiva este método de pago)
                  </div>
                )}
                </div>
              ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <CreditCardIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No hay datos de métodos de pago disponibles</p>
                <p className="text-sm">Los datos aparecerán aquí una vez que tengas reservas confirmadas</p>
              </div>
            )}
        </div>
      </div>

      {/* Horarios populares */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <ClockIcon className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Horarios Más Populares
          </h2>
        </div>
        
        {datosFinancieros.horariosPopulares.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {datosFinancieros.horariosPopulares.map((horario, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-800 mb-1">
                  {horario.hora}
                </div>
                <div className="text-xs text-blue-500 mb-1">
                  {horario.tipo} ({horario.ajustePrecio})
                </div>
                <div className="text-sm text-blue-600 mb-2">
                  {horario.reservas} reservas
                </div>
                <div className="text-sm font-semibold text-blue-900">
                  ${horario.ingresos.toLocaleString()}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  ${horario.precioFinal}/hora
                </div>
              </div>
              </div>
            ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <ClockIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>No hay datos de horarios populares disponibles</p>
              <p className="text-sm">Los datos aparecerán aquí una vez que tengas reservas confirmadas</p>
            </div>
          )}
      </div>

      {/* Análisis de Precios por Horario */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Análisis de Precios Diferenciados
          </h2>
        </div>
        
        {datosFinancieros.preciosPorHorario.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datosFinancieros.preciosPorHorario.map((precio, index) => (
              <div key={index} className={`p-6 rounded-lg border-2 ${
                precio.periodo === 'Horario Prime' ? 'border-yellow-300 bg-yellow-50' :
                precio.periodo === 'Horario Matutino' ? 'border-blue-300 bg-blue-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {precio.periodo}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3">
                    {precio.horario}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Precio Base:</span>
                      <span className="font-medium">${precio.precioBase}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Ajuste:</span>
                      <span className={`font-bold ${
                        precio.ajuste.includes('+') ? 'text-red-600' :
                        precio.ajuste.includes('-') ? 'text-green-600' :
                        'text-gray-600'
                      }`}>
                        {precio.ajuste}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="text-sm font-medium text-gray-700">Precio Final:</span>
                      <span className="text-lg font-bold text-blue-600">
                        ${precio.precioFinal}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Reservas</div>
                        <div className="font-semibold text-blue-600">{precio.reservas}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Ingresos</div>
                        <div className="font-semibold text-green-600">
                          ${precio.ingresos.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <ChartBarIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No hay datos de precios diferenciados disponibles</p>
            <p className="text-sm">Los datos aparecerán aquí una vez que configures precios por horario</p>
          </div>
        )}
      </div>

      {/* Resumen y recomendaciones */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <LightBulbIcon className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Insights y Recomendaciones
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Fortalezas</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                  {datosFinancieros.ingresosPorDia.length > 0 ? (
                    <>
                      <li>• Análisis de días más rentables disponible</li>
                      <li>• Seguimiento de rendimiento por cancha</li>
                      <li>• Optimización de horarios implementada</li>
                      <li>• Incentivos por método de pago configurados</li>
                    </>
                  ) : (
                    <>
                      <li>• Configura tus canchas para comenzar</li>
                      <li>• Define precios diferenciados por horario</li>
                      <li>• Establece métodos de pago disponibles</li>
                      <li>• Los insights aparecerán con las primeras reservas</li>
                    </>
                  )}
                </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowTrendingUpIcon className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Oportunidades</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                  {datosFinancieros.ingresosPorDia.length > 0 ? (
                    <>
                      <li>• Promocionar horarios de menor demanda</li>
                      <li>• Optimizar descuentos por método de pago</li>
                      <li>• Crear paquetes especiales para días específicos</li>
                      <li>• Implementar precios dinámicos según demanda</li>
                    </>
                  ) : (
                    <>
                      <li>• Configura precios diferenciados por horario</li>
                      <li>• Establece descuentos por método de pago</li>
                      <li>• Crea promociones para atraer clientes</li>
                      <li>• Analiza la demanda para optimizar precios</li>
                    </>
                  )}
                </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                <h3 className="font-semibold text-yellow-800">Atención</h3>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1">
                  {datosFinancieros.ingresosPorDia.length > 0 ? (
                    <>
                      <li>• Monitorear tasa de cancelaciones</li>
                      <li>• Revisar comisiones por método de pago</li>
                      <li>• Analizar rendimiento por cancha</li>
                      <li>• Identificar días de baja actividad</li>
                    </>
                  ) : (
                    <>
                      <li>• Establece políticas de cancelación claras</li>
                      <li>• Configura comisiones por método de pago</li>
                      <li>• Asegúrate de que todas las canchas estén activas</li>
                      <li>• Planifica estrategias para todos los días</li>
                    </>
                  )}
                </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRightIcon className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Acciones Sugeridas</h3>
              </div>
              <ul className="text-sm text-purple-700 space-y-1">
                  {datosFinancieros.ingresosPorDia.length > 0 ? (
                    <>
                      <li>• Ajustar precios según ocupación real</li>
                      <li>• Promocionar métodos de pago preferidos</li>
                      <li>• Crear tarifas especiales por cancha</li>
                      <li>• Implementar happy hours estratégicos</li>
                      <li>• Analizar costos vs beneficios de comisiones</li>
                    </>
                  ) : (
                    <>
                      <li>• Completa la configuración de precios</li>
                      <li>• Configura métodos de pago y descuentos</li>
                      <li>• Establece tarifas diferenciadas</li>
                      <li>• Planifica promociones especiales</li>
                      <li>• Revisa regularmente tu configuración</li>
                    </>
                  )}
                </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Configuración de Métodos de Pago */}
      {mostrarModalMetodosPago && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Configuración de Métodos de Pago</h2>
              <button
                onClick={cerrarModalMetodosPago}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <button
                onClick={agregarNuevoMetodo}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <PlusIcon className="h-4 w-4" />
                Agregar Nuevo Método
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {metodosPagoConfig.map((metodo) => (
                <div key={metodo.id} className={`border rounded-lg p-4 ${metodo.activo ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  {metodoEditando && metodoEditando.id === metodo.id ? (
                    // Modo edición
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Método
                          </label>
                          <input
                            type="text"
                            value={metodoEditando.nombre}
                            onChange={(e) => setMetodoEditando({...metodoEditando, nombre: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Comisión (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={metodoEditando.comision}
                            onChange={(e) => setMetodoEditando({...metodoEditando, comision: parseFloat(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descuento al Cliente (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={metodoEditando.descuentoCliente}
                            onChange={(e) => setMetodoEditando({...metodoEditando, descuentoCliente: parseFloat(e.target.value) || 0})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div className="flex items-center">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={metodoEditando.activo}
                              onChange={(e) => setMetodoEditando({...metodoEditando, activo: e.target.checked})}
                              className="mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Método Activo</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={metodoEditando.descripcion}
                          onChange={(e) => setMetodoEditando({...metodoEditando, descripcion: e.target.value})}
                          rows="2"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={guardarMetodoPago}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setMetodoEditando(null)}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Modo visualización
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{metodo.nombre}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            metodo.activo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {metodo.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{metodo.descripcion}</p>
                        <div className="flex gap-4 text-sm">
                          <span className="text-red-600">Comisión: {metodo.comision}%</span>
                          {metodo.descuentoCliente > 0 && (
                            <span className="text-green-600">Descuento: {metodo.descuentoCliente}%</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleMetodoPago(metodo.id)}
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            metodo.activo 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {metodo.activo ? 'Desactivar' : 'Activar'}
                        </button>
                        <button
                          onClick={() => editarMetodoPago(metodo)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => eliminarMetodoPago(metodo.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos para Métodos de Pago:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ofrece descuentos en métodos de pago con menor comisión para aumentar tu margen</li>
                <li>• Los métodos con comisión alta pueden justificarse si atraen más clientes</li>
                <li>• Considera promociones especiales para métodos de pago específicos</li>
                <li>• Revisa regularmente las comisiones de los procesadores de pago</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanzasReportes;
import { useState, useEffect } from 'react';

const PagosJugador = () => {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos'); // todos, completados, pendientes, fallidos
  const [estadisticas, setEstadisticas] = useState({
    totalGastado: 0,
    pagosPendientes: 0,
    ultimoMes: 0,
    promedioMensual: 0
  });

  useEffect(() => {
    cargarPagos();
  }, []);

  const cargarPagos = async () => {
    try {
      // Aquí harías la llamada a la API para obtener los pagos
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const pagosMock = [
        {
          id: 1,
          fecha: '2024-01-20',
          cancha: 'Cancha Central',
          monto: 2500,
          estado: 'completado',
          metodoPago: 'Tarjeta de Crédito',
          numeroTransaccion: 'TXN-001234',
          reservaId: 'RES-001'
        },
        {
          id: 2,
          fecha: '2024-01-18',
          cancha: 'Club Norte',
          monto: 3000,
          estado: 'completado',
          metodoPago: 'Mercado Pago',
          numeroTransaccion: 'TXN-001235',
          reservaId: 'RES-002'
        },
        {
          id: 3,
          fecha: '2024-01-15',
          cancha: 'Complejo Sur',
          monto: 2800,
          estado: 'pendiente',
          metodoPago: 'Transferencia',
          numeroTransaccion: 'TXN-001236',
          reservaId: 'RES-003'
        },
        {
          id: 4,
          fecha: '2024-01-10',
          cancha: 'Cancha Este',
          monto: 2200,
          estado: 'fallido',
          metodoPago: 'Tarjeta de Débito',
          numeroTransaccion: 'TXN-001237',
          reservaId: 'RES-004'
        },
        {
          id: 5,
          fecha: '2024-01-05',
          cancha: 'Club Oeste',
          monto: 3500,
          estado: 'completado',
          metodoPago: 'Efectivo',
          numeroTransaccion: 'TXN-001238',
          reservaId: 'RES-005'
        }
      ];

      setPagos(pagosMock);

      // Calcular estadísticas
      const completados = pagosMock.filter(p => p.estado === 'completado');
      const totalGastado = completados.reduce((sum, p) => sum + p.monto, 0);
      const pagosPendientes = pagosMock.filter(p => p.estado === 'pendiente').length;
      
      setEstadisticas({
        totalGastado,
        pagosPendientes,
        ultimoMes: totalGastado, // Simplificado para el ejemplo
        promedioMensual: Math.round(totalGastado / 3) // Asumiendo 3 meses
      });

    } catch (error) {
      console.error('Error al cargar pagos:', error);
    } finally {
      setLoading(false);
    }
  };

  const pagosFiltrados = pagos.filter(pago => {
    if (filtro === 'completados') return pago.estado === 'completado';
    if (filtro === 'pendientes') return pago.estado === 'pendiente';
    if (filtro === 'fallidos') return pago.estado === 'fallido';
    return true;
  });

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado':
        return 'bg-green-100 text-green-800';
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'fallido':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'completado':
        return '✅';
      case 'pendiente':
        return '⏳';
      case 'fallido':
        return '❌';
      default:
        return '❓';
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const descargarComprobante = (pago) => {
    // Aquí implementarías la descarga del comprobante
    console.log('Descargando comprobante para:', pago.numeroTransaccion);
  };

  const reintentarPago = (pago) => {
    // Aquí implementarías el reintento de pago
    console.log('Reintentando pago para:', pago.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-2">💳</span>
              Mis Pagos
            </h1>
            <p className="text-gray-600">
              Historial y gestión de tus pagos
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'todos'
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos ({pagos.length})
          </button>
          <button
            onClick={() => setFiltro('completados')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'completados'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Completados ({pagos.filter(p => p.estado === 'completado').length})
          </button>
          <button
            onClick={() => setFiltro('pendientes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'pendientes'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Pendientes ({pagos.filter(p => p.estado === 'pendiente').length})
          </button>
          <button
            onClick={() => setFiltro('fallidos')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filtro === 'fallidos'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Fallidos ({pagos.filter(p => p.estado === 'fallido').length})
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-emerald-600 mb-2">
            ${estadisticas.totalGastado.toLocaleString()}
          </div>
          <div className="text-gray-600">Total Gastado</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">
            {estadisticas.pagosPendientes}
          </div>
          <div className="text-gray-600">Pagos Pendientes</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            ${estadisticas.ultimoMes.toLocaleString()}
          </div>
          <div className="text-gray-600">Último Mes</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">
            ${estadisticas.promedioMensual.toLocaleString()}
          </div>
          <div className="text-gray-600">Promedio Mensual</div>
        </div>
      </div>

      {/* Lista de pagos */}
      <div className="space-y-4">
        {pagosFiltrados.map((pago) => (
          <div key={pago.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">💳</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {pago.cancha}
                  </h3>
                  <p className="text-gray-600">
                    {formatearFecha(pago.fecha)}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  ${pago.monto.toLocaleString()}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(pago.estado)}`}>
                  {getEstadoIcon(pago.estado)} {pago.estado.charAt(0).toUpperCase() + pago.estado.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div>
                <span className="font-medium text-gray-700">Método de Pago:</span>
                <p className="text-gray-600">{pago.metodoPago}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Nº Transacción:</span>
                <p className="text-gray-600 font-mono">{pago.numeroTransaccion}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Reserva:</span>
                <p className="text-gray-600 font-mono">{pago.reservaId}</p>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-end space-x-2">
              {pago.estado === 'completado' && (
                <button
                  onClick={() => descargarComprobante(pago)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  📄 Descargar Comprobante
                </button>
              )}
              
              {pago.estado === 'fallido' && (
                <button
                  onClick={() => reintentarPago(pago)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-sm"
                >
                  🔄 Reintentar Pago
                </button>
              )}
              
              {pago.estado === 'pendiente' && (
                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  ⏳ Verificar Estado
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {pagosFiltrados.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {filtro === 'todos' ? 'No tienes pagos registrados' :
             filtro === 'completados' ? 'No tienes pagos completados' :
             filtro === 'pendientes' ? 'No tienes pagos pendientes' :
             'No tienes pagos fallidos'}
          </h3>
          <p className="text-gray-600">
            {filtro === 'todos' ? 'Realiza tu primera reserva para ver tus pagos aquí' :
             'Los pagos aparecerán aquí cuando cambien de estado'}
          </p>
        </div>
      )}

      {/* Resumen mensual */}
      {pagos.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Resumen de Gastos
          </h2>
          
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📈</div>
              <p>Gráfico de gastos mensuales</p>
              <p className="text-sm">(Próximamente)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagosJugador;
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import GestionClub from './admin/GestionClub';
import GestionReservas from './admin/GestionReservas';
import FinanzasReportes from './admin/FinanzasReportes';
import MisCanchas from './MisCanchas';
import ConfiguracionHorarios from '../components/ConfiguracionHorarios';
import {
  ChartBarIcon,
  BuildingOfficeIcon,
  BuildingStorefrontIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ChartPieIcon,
  CreditCardIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  DocumentTextIcon,
  PhotoIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  CogIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const DashboardAdmin = () => {
  const { user } = useAuth();
  
  // Estados para el sidebar y navegación interna
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState('resumen');
  
  const [stats, setStats] = useState({
    totalCanchas: 0,
    canchasActivas: 0,
    reservasHoy: 0,
    ingresosMes: 0,
    reservasPendientes: 0
  });
  
  // Estados para onboarding
  const [onboardingData, setOnboardingData] = useState({
    hasClubInfo: false,
    hasCanchas: false,
    hasHorarios: false,
    hasPrecios: false,
    hasPagos: false,
    isLoading: true
  });

  const [showOnboardingManual, setShowOnboardingManual] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const menuItems = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'club', label: 'Información del Club' },
    { id: 'canchas', label: 'Mis Canchas' },
    { id: 'horarios', label: 'Horarios' },
    { id: 'reservas', label: 'Reservas' },
    { id: 'finanzas', label: 'Finanzas' },
    { id: 'reportes', label: 'Reportes' }
  ];

  // Función para renderizar el contenido según la sección activa
  const renderContent = () => {
    switch (activeSection) {
      case 'club':
        return <GestionClub />;
      case 'canchas':
        return <MisCanchas />;
      case 'reservas':
        return <GestionReservas />;
      case 'finanzas':
      case 'reportes':
        return <FinanzasReportes />;
      case 'horarios':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <ClockIcon className="h-6 w-6 mr-2 text-blue-600" />
                Configuración de Horarios
              </h1>
              <p className="text-gray-600 mb-6">
                Configura los horarios de disponibilidad para cada una de tus canchas
              </p>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <p className="text-blue-800">
                  💡 Para configurar horarios, ve a la sección "Mis Canchas" y selecciona "Configurar Horarios" en la cancha que desees.
                </p>
              </div>
            </div>
          </div>
        );
      default: // 'resumen'
        return renderDashboardContent();
    }
  };

  // Función para obtener clases de Tailwind según el color
  const getStepClasses = (color) => {
    const colorClasses = {
      blue: 'border-blue-200 bg-blue-50 hover:border-blue-400 cursor-pointer hover:scale-105',
      green: 'border-green-200 bg-green-50 hover:border-green-400 cursor-pointer hover:scale-105',
      purple: 'border-purple-200 bg-purple-50 hover:border-purple-400 cursor-pointer hover:scale-105',
      yellow: 'border-yellow-200 bg-yellow-50 hover:border-yellow-400 cursor-pointer hover:scale-105',
      indigo: 'border-indigo-200 bg-indigo-50 hover:border-indigo-400 cursor-pointer hover:scale-105'
    };
    return colorClasses[color] || 'border-gray-200 bg-gray-50 hover:border-gray-400 cursor-pointer hover:scale-105';
  };

  const getButtonClasses = (color) => {
    const buttonClasses = {
      blue: 'w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium',
      green: 'w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium',
      purple: 'w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium',
      yellow: 'w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors font-medium',
      indigo: 'w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors font-medium'
    };
    return buttonClasses[color] || 'w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors font-medium';
  };

  // Variables del onboarding (definidas antes de renderDashboardContent)
  const needsOnboarding = !onboardingData.hasCanchas || showOnboardingManual;

  const onboardingSteps = [
    {
      id: 'club',
      title: 'Información del Club',
      description: 'Completa los datos básicos de tu club: nombre, dirección, teléfono y descripción',
      icon: BuildingOfficeIcon,
      completed: onboardingData.hasClubInfo,
      action: () => setActiveSection('club'),
      color: 'blue'
    },
    {
      id: 'canchas',
      title: 'Crear Canchas',
      description: 'Agrega tus canchas con fotos, descripción y características',
      icon: BuildingStorefrontIcon,
      completed: onboardingData.hasCanchas,
      action: () => setActiveSection('canchas'),
      color: 'green',
      disabled: !onboardingData.hasClubInfo
    },
    {
      id: 'horarios',
      title: 'Configurar Horarios',
      description: 'Define horarios de apertura, cierre y disponibilidad por cancha',
      icon: ClockIcon,
      completed: onboardingData.hasHorarios,
      action: () => setActiveSection('horarios'),
      color: 'purple',
      disabled: !onboardingData.hasCanchas
    },
    {
      id: 'precios',
      title: 'Establecer Precios',
      description: 'Define precios por cancha, horario y tipo de reserva',
      icon: CurrencyDollarIcon,
      completed: onboardingData.hasPrecios,
      action: () => setActiveSection('finanzas'),
      color: 'yellow',
      disabled: !onboardingData.hasHorarios
    },
    {
      id: 'pagos',
      title: 'Medios de Pago',
      description: 'Configura Stripe para recibir pagos online de forma segura',
      icon: CreditCardIcon,
      completed: onboardingData.hasPagos,
      action: () => setActiveSection('finanzas'),
      color: 'indigo',
      disabled: !onboardingData.hasPrecios
    }
  ];

  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / onboardingSteps.length) * 100;

  // Función para renderizar el contenido del dashboard principal
  const renderDashboardContent = () => {
    return (
      <div className="space-y-8">
        {needsOnboarding ? (
          // Vista de Onboarding para usuarios nuevos
          <>
            {/* Header de Bienvenida */}
            <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-700 text-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <RocketLaunchIcon className="h-8 w-8 mr-3" />
                    ¡Configura tu Club en PlayZone!
                  </h1>
                  <p className="text-emerald-100 mb-4">
                    {showOnboardingManual ? 
                      `Revisa y completa la configuración de tu club, ${user?.nombre}. Puedes actualizar cualquier paso que necesites.` :
                      `Hola ${user?.nombre}, necesitas configurar tus canchas y horarios para empezar a recibir reservas. Te guiaremos paso a paso para que tengas todo listo en pocos minutos.`
                    }
                  </p>
                </div>
                {showOnboardingManual && (
                  <button
                    onClick={() => setShowOnboardingManual(false)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center ml-4"
                  >
                    ✕ Cerrar
                  </button>
                )}
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progreso de configuración</span>
                  <span className="text-sm font-bold">{completedSteps}/{onboardingSteps.length}</span>
                </div>
                <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
                  <div 
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-emerald-100 mt-2">
                  {completedSteps === 0 ? 'Comienza configurando la información de tu club' :
                   completedSteps < onboardingSteps.length ? 'Continúa con el siguiente paso' :
                   '¡Configuración completa! Ya puedes recibir reservas'}
                </p>
              </div>
            </div>

            {/* Pasos de Onboarding */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <RocketLaunchIcon className="h-6 w-6 mr-3 text-blue-600" />
                Configuración Inicial
              </h2>
              <p className="text-gray-600 mb-8">
                Sigue estos pasos para configurar tu club y empezar a recibir reservas. Cada paso te llevará a la sección correspondiente.
              </p>
              
              {/* Mensaje de felicitación si completó todos los pasos */}
              {completedSteps === onboardingSteps.length && (
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                    <div>
                      <h3 className="text-lg font-bold text-green-800">¡Felicitaciones!</h3>
                      <p className="text-green-700">
                        Has completado la configuración inicial. Tu club ya está listo para recibir reservas.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Ver Dashboard Completo
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {onboardingSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`relative p-6 rounded-lg border-2 transition-all duration-300 ${
                      step.completed
                        ? 'border-green-500 bg-green-50'
                        : step.disabled
                        ? 'border-gray-200 bg-gray-50 opacity-50'
                        : getStepClasses(step.color)
                    }`}
                    onClick={!step.disabled ? step.action : undefined}
                  >
                    {step.completed && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        ✓
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="mb-3 flex justify-center">
                        <step.icon className="h-12 w-12 text-gray-600" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {step.description}
                      </p>
                      
                      {!step.completed && !step.disabled && (
                        <button
                          onClick={step.action}
                          className={getButtonClasses(step.color)}
                        >
                          Configurar
                        </button>
                      )}
                      
                      {step.completed && (
                        <div className="text-green-600 font-medium">
                          ✅ Completado
                        </div>
                      )}
                      
                      {step.disabled && (
                        <div className="text-gray-400 text-sm">
                          Completa el paso anterior
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consejos y Ayuda */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                <LightBulbIcon className="h-5 w-5 mr-2 text-blue-600" />
                Consejos para una configuración exitosa
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="flex items-start space-x-2">
                  <DocumentTextIcon className="h-5 w-5 mt-0.5 text-blue-600" />
                  <p><strong>Información completa:</strong> Incluye dirección exacta, teléfono y descripción detallada de tu club</p>
                </div>
                <div className="flex items-start space-x-2">
                  <PhotoIcon className="h-5 w-5 mt-0.5 text-blue-600" />
                  <p><strong>Fotos de calidad:</strong> Sube imágenes claras y bien iluminadas de cada cancha</p>
                </div>
                <div className="flex items-start space-x-2">
                  <ClockIcon className="h-5 w-5 mt-0.5 text-blue-600" />
                  <p><strong>Horarios realistas:</strong> Define horarios que puedas cumplir consistentemente</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CurrencyDollarIcon className="h-5 w-5 mt-0.5 text-blue-600" />
                  <p><strong>Precios competitivos:</strong> Investiga los precios de la zona para ser competitivo</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>💡 Tip:</strong> Una vez completada la configuración, tu club aparecerá en las búsquedas de los jugadores y podrás empezar a recibir reservas inmediatamente.
                </p>
              </div>
            </div>
          </>
        ) : (
          // Vista normal del dashboard para usuarios configurados
          <>
            {/* Header de Bienvenida */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2 flex items-center">
                    <ChartBarIcon className="h-8 w-8 mr-3" />
                    Panel de Administración
                  </h1>
                  <p className="text-blue-100">
                    Gestiona tu club y canchas desde aquí, {user?.nombre}
                  </p>
                </div>
                <button
                  onClick={() => setShowOnboardingManual(true)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <RocketLaunchIcon className="h-5 w-5 mr-2" />
                  Configuración Inicial
                </button>
              </div>
            </div>

            {/* Estadísticas Principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {stats.totalCanchas}
                    </div>
                    <div className="text-gray-600">Total Canchas</div>
                  </div>
                  <BuildingStorefrontIcon className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {stats.canchasActivas}
                    </div>
                    <div className="text-gray-600">Canchas Activas</div>
                  </div>
                  <CheckCircleIcon className="h-12 w-12 text-green-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {stats.reservasHoy}
                    </div>
                    <div className="text-gray-600">Reservas Hoy</div>
                  </div>
                  <CalendarDaysIcon className="h-12 w-12 text-orange-500" />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      ${stats.ingresosMes.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Ingresos del Mes</div>
                  </div>
                  <CurrencyDollarIcon className="h-12 w-12 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Alertas y Notificaciones */}
            {stats.reservasPendientes > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-yellow-400 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">
                      Tienes {stats.reservasPendientes} reservas pendientes de confirmación
                    </p>
                    <p className="text-yellow-700 text-sm">
                      Revisa la sección de reservas para gestionarlas
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Acciones Rápidas */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <BoltIcon className="h-6 w-6 mr-2 text-gray-600" />
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveSection('canchas')}
                  className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <BuildingStorefrontIcon className="h-6 w-6 mr-2" />
                  <span className="font-medium">Agregar Cancha</span>
                </button>
                <button 
                  onClick={() => setActiveSection('horarios')}
                  className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                >
                  <ClockIcon className="h-6 w-6 mr-2" />
                  <span className="font-medium">Config. Horarios</span>
                </button>
                <button 
                  onClick={() => setActiveSection('reportes')}
                  className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
                >
                  <ChartPieIcon className="h-6 w-6 mr-2" />
                  <span className="font-medium">Ver Reportes</span>
                </button>
                <button 
                  onClick={() => setActiveSection('finanzas')}
                  className="bg-orange-500 text-white p-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  <CreditCardIcon className="h-6 w-6 mr-2" />
                  <span className="font-medium">Gestionar Pagos</span>
                </button>
              </div>
            </div>

            {/* Gráfico de Reservas (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Reservas de la Semana
                </h3>
                <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ChartBarIcon className="h-16 w-16 mx-auto mb-2" />
                    <p>Gráfico de reservas</p>
                    <p className="text-sm">(Próximamente)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Canchas Más Populares
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cancha Central</p>
                      <p className="text-sm text-gray-600">85% ocupación</p>
                    </div>
                    <TrophyIcon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cancha Norte</p>
                      <p className="text-sm text-gray-600">72% ocupación</p>
                    </div>
                    <TrophyIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Cancha Sur</p>
                      <p className="text-sm text-gray-600">68% ocupación</p>
                    </div>
                    <TrophyIcon className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Actividad Reciente */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <ChartPieIcon className="h-6 w-6 mr-2 text-gray-600" />
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="font-medium">Pago recibido</p>
                    <p className="text-sm text-gray-600">$2,500 - Reserva Cancha Central</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">Hace 1 hora</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="font-medium">Nueva reserva</p>
                    <p className="text-sm text-gray-600">Cancha Norte - Mañana 18:00</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">Hace 2 horas</div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CogIcon className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="font-medium">Horarios actualizados</p>
                    <p className="text-sm text-gray-600">Cancha Sur - Nuevos turnos disponibles</p>
                  </div>
                  <div className="ml-auto text-xs text-gray-500">Hace 1 día</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    cargarEstadisticas();
    verificarOnboarding();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      // Aquí harías las llamadas a la API para obtener las estadísticas
      // Por ahora usamos datos de ejemplo
      setStats({
        totalCanchas: 0, // Cambiado a 0 para simular usuario nuevo
        canchasActivas: 0,
        reservasHoy: 0,
        ingresosMes: 0,
        reservasPendientes: 0
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const verificarOnboarding = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setOnboardingData(prev => ({ ...prev, isLoading: false }));
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // 1. Verificar si tiene canchas
      const canchasResponse = await fetch('http://localhost:8082/api/configuracion-horarios/mis-canchas', {
        headers
      });
      
      let hasCanchas = false;
      let hasConfiguraciones = false;
      let canchasData = [];

      console.log('🔍 Verificando onboarding...');
      console.log('📡 Response status:', canchasResponse.status);

      if (canchasResponse.ok) {
        const canchasResult = await canchasResponse.json();
        console.log('📊 Canchas result:', canchasResult);
        canchasData = canchasResult.canchas || [];
        hasCanchas = canchasData.length > 0;
        console.log('🏟️ Tiene canchas:', hasCanchas, '- Total:', canchasData.length);
        
        // Verificar si las canchas tienen configuraciones de horarios
        hasConfiguraciones = canchasData.some(cancha => 
          cancha.configuracionHorario && 
          cancha.configuracionHorario.horaApertura && 
          cancha.configuracionHorario.horaCierre
        );
      } else {
        console.log('❌ Error en API canchas:', canchasResponse.status);
      }

      // 2. Verificar si tiene reservas
      const reservasResponse = await fetch('http://localhost:8082/api/reservas', {
        headers
      });
      
      let hasReservas = false;
      if (reservasResponse.ok) {
        const reservasResult = await reservasResponse.json();
        hasReservas = Array.isArray(reservasResult) && reservasResult.length > 0;
      }

      // 3. Verificar información básica del club
      // Consideramos que tiene info del club si está logueado y tiene nombre
      const hasClubInfo = !!user?.nombre && !!user?.email;

      // 4. Verificar si tiene precios configurados
      // Si tiene canchas con configuraciones, asumimos que tienen precios
      const hasPrecios = hasCanchas && hasConfiguraciones;

      // Actualizar estadísticas reales
      setStats({
        totalCanchas: canchasData.length,
        canchasActivas: canchasData.filter(c => c.disponible !== false).length,
        reservasHoy: 0, // TODO: Implementar filtro por fecha
        ingresosMes: 0, // TODO: Implementar cálculo de ingresos
        reservasPendientes: 0 // TODO: Implementar filtro por estado
      });

      // Actualizar estado del onboarding
      const newOnboardingData = {
        hasClubInfo,
        hasCanchas,
        hasHorarios: hasConfiguraciones,
        hasPrecios,
        hasPagos: false, // TODO: Verificar configuración de Stripe
        isLoading: false
      };

      console.log('🎯 Estado final del onboarding:', newOnboardingData);
      console.log('🚀 Necesita onboarding:', !hasCanchas);

      setOnboardingData(newOnboardingData);

    } catch (error) {
      console.error('Error al verificar onboarding:', error);
      // En caso de error, mostrar onboarding por defecto para usuarios sin canchas
      setOnboardingData({
        hasClubInfo: !!user?.nombre,
        hasCanchas: false,
        hasHorarios: false,
        hasPrecios: false,
        hasPagos: false,
        isLoading: false
      });
      
      // También resetear stats en caso de error
      setStats({
        totalCanchas: 0,
        canchasActivas: 0,
        reservasHoy: 0,
        ingresosMes: 0,
        reservasPendientes: 0
      });
    }
  };



  if (onboardingData.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar 
        menuItems={menuItems} 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        user={user}
        isExpanded={sidebarExpanded}
        onToggle={toggleSidebar}
      />
      
      {/* Contenido Principal */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
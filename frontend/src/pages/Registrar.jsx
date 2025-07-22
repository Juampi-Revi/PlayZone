import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const deportesDisponibles = ['Pádel', 'Tenis', 'Fútbol', 'Básquet', 'Squash', 'Voleibol', 'Bádminton'];

export default function Registrar() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState('jugador');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formJugador, setFormJugador] = useState({ nombre: '', email: '', password: '' });
  const [formClub, setFormClub] = useState({
    nombre: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    deportes: [],
    descripcion: ''
  });

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setError('');
  };

  const handleInputChange = (e, isClub = false) => {
    const { name, value } = e.target;
    if (isClub) {
      setFormClub(prev => ({ ...prev, [name]: value }));
    } else {
      setFormJugador(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDeporteChange = (deporte) => {
    setFormClub(prev => ({
      ...prev,
      deportes: prev.deportes.includes(deporte)
        ? prev.deportes.filter(d => d !== deporte)
        : [...prev.deportes, deporte]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (tipo === 'jugador') {
        const res = await register(formJugador.nombre, formJugador.email, formJugador.password, 'jugador');
        if (res.success) {
          navigate('/');
        } else {
          setError(res.message || 'Error al registrar');
        }
      } else {
        // Para club, concatenar los deportes seleccionados en un string (opcional, para el backend)
        const res = await register(
          formClub.nombre,
          formClub.email,
          formClub.password,
          'club'
        );
        // Aquí podrías hacer una llamada adicional para guardar los datos extendidos del club si lo deseas
        if (res.success) {
          navigate('/');
        } else {
          setError(res.message || 'Error al registrar');
        }
      }
    } catch (err) {
      setError('Error de red o del servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h2>
          <p className="text-gray-600 mb-4">Elige tu tipo de usuario y completa el formulario</p>
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-semibold border ${tipo === 'jugador' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setTipo('jugador')}
              type="button"
            >
              Soy Jugador
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-semibold border ${tipo === 'club' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => setTipo('club')}
              type="button"
            >
              Soy Club
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {tipo === 'jugador' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formJugador.nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formJugador.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formJugador.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Club</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formClub.nombre}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Club Deportivo Central"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formClub.email}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="contacto@club.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formClub.password}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formClub.telefono}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: +54 11 1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formClub.direccion}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Av. Libertador 1234, Buenos Aires"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deportes</label>
                  <div className="flex flex-wrap gap-2">
                    {deportesDisponibles.map(dep => (
                      <button
                        type="button"
                        key={dep}
                        className={`px-3 py-1 rounded-full border ${formClub.deportes.includes(dep) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600'}`}
                        onClick={() => handleDeporteChange(dep)}
                      >
                        {dep}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formClub.descripcion}
                    onChange={e => handleInputChange(e, true)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe tu club, instalaciones, servicios, etc."
                    rows={3}
                  />
                </div>
              </>
            )}
            {error && <div className="text-red-600 text-sm text-center font-semibold">{error}</div>}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Registrando...' : 'Registrarme'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 
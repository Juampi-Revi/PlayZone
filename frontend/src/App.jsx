import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAuth } from './context/AuthContext';
import AdminPanel from './pages/AdminPanel';
import AgregarCancha from './pages/AgregarProducto';
import BuscarCanchas from './pages/BuscarCanchas';
import DetalleCancha from './pages/DetalleCancha';
import Home from './pages/Home';
import ListadoCanchas from './pages/ListadoProductos';
import Login from './pages/Login';
import MisReservas from './pages/MisReservas';
import Registrar from './pages/Registrar';

function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.tipo.toLowerCase())) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canchas" element={<BuscarCanchas />} />
            <Route path="/buscar" element={<BuscarCanchas />} />
            <Route path="/detalle/:id" element={<DetalleCancha />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            {/* Rutas protegidas */}
            <Route path="/reservas" element={
              <PrivateRoute allowedRoles={['jugador']}>
                <MisReservas />
              </PrivateRoute>
            } />
            <Route path="/administracion" element={
              <PrivateRoute allowedRoles={['club']}>
                <AdminPanel />
              </PrivateRoute>
            } />
            <Route path="/administracion/agregar" element={
              <PrivateRoute allowedRoles={['club']}>
                <AgregarCancha />
              </PrivateRoute>
            } />
            <Route path="/administracion/listado" element={
              <PrivateRoute allowedRoles={['club']}>
                <ListadoCanchas />
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

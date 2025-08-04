import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import AdminPanel from './pages/AdminPanel';
import AgregarCancha from './pages/AgregarCancha';
import BuscarCanchas from './pages/BuscarCanchas';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardJugador from './pages/DashboardJugador';
import DetalleCancha from './pages/DetalleCancha';
import Home from './pages/Home';
import ListadoCanchas from './pages/ListadoCanchas';
import Login from './pages/Login';
import MisCanchas from './pages/MisCanchas';
import MisReservas from './pages/MisReservas';
import NotFound from './pages/NotFound';
import PagarReserva from './pages/PagarReserva';
import Registrar from './pages/Registrar';
import GestionClub from './pages/admin/GestionClub';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/canchas" element={<BuscarCanchas />} />
            <Route path="/detalle/:id" element={<DetalleCancha />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            
            {/* Protected routes for players */}
            <Route 
              path="/reservas" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <MisReservas />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/pagar/:reservaId" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <PagarReserva />
                </PrivateRoute>
              } 
            />
            
            {/* Protected routes for clubs */}
            <Route 
              path="/administracion" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <AdminPanel />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/administracion/agregar" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <AgregarCancha />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/administracion/listado" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <ListadoCanchas />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/mis-canchas" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <MisCanchas />
                </PrivateRoute>
              } 
            />
            
            {/* Unified Dashboard for both roles */}
            <Route 
              path="/dashboard/jugador" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/jugador/perfil" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/jugador/favoritos" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/jugador/pagos" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/jugador/partidos" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/jugador/reservas" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <DashboardJugador />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard-admin" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <DashboardAdmin />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard/admin/club" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <GestionClub />
                </PrivateRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

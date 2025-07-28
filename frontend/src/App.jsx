import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import BuscarCanchas from './pages/BuscarCanchas';
import DetalleCancha from './pages/DetalleCancha';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import MisReservas from './pages/MisReservas';
import PagarReserva from './pages/PagarReserva';
import AdminPanel from './pages/AdminPanel';
import AgregarCancha from './pages/AgregarCancha';
import ListadoCanchas from './pages/ListadoCanchas';
import MisCanchas from './pages/MisCanchas';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';

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
              path="/dashboard-jugador" 
              element={
                <PrivateRoute allowedRoles={['JUGADOR']}>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/dashboard-admin" 
              element={
                <PrivateRoute allowedRoles={['CLUB']}>
                  <Dashboard />
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

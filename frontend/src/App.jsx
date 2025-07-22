import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import AgregarCancha from './pages/AgregarProducto';
import BuscarCanchas from './pages/BuscarCanchas';
import DetalleCancha from './pages/DetalleCancha';
import Home from './pages/Home';
import ListadoCanchas from './pages/ListadoProductos';
import Login from './pages/Login';
import MisReservas from './pages/MisReservas';
import RegistrarClub from './pages/RegistrarClub';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/canchas" element={<BuscarCanchas />} />
            <Route path="/detalle/:id" element={<DetalleCancha />} />
            <Route path="/reservas" element={<MisReservas />} />
            <Route path="/registrar-club" element={<RegistrarClub />} />
            <Route path="/login" element={<Login />} />
            <Route path="/administracion" element={<AdminPanel />} />
            <Route path="/administracion/agregar" element={<AgregarCancha />} />
            <Route path="/administracion/listado" element={<ListadoCanchas />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

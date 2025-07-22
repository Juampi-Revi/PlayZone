import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import AdminPanel from './pages/AdminPanel';
import AgregarProducto from './pages/AgregarProducto';
import DetalleCancha from './pages/DetalleCancha';
import Home from './pages/Home';
import ListadoProductos from './pages/ListadoProductos';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalle/:id" element={<DetalleCancha />} />
            <Route path="/administracion" element={<AdminPanel />} />
            <Route path="/administracion/agregar" element={<AgregarProducto />} />
            <Route path="/administracion/listado" element={<ListadoProductos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

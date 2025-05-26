import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Animales from './pages/Animales';
import Noticias from './pages/Noticias';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';
import SobreNosotros from './pages/SobreNosotros';
import Footer from './HomeComponents/Footer';
import Navbar from './HomeComponents/Navbar';
import DetalleAnimal from "./pages/DetalleAnimal";
import DetalleNoticias from "./pages/DetalleNoticias";
import Perfil from "./pages/Perfil";
import Adoptar from "./pages/Adoptar";
import AdopcionEnviada from "./pages/AdopcionEnviada";
import ResetPassword from "./pages/ResetPassword";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ScrollToTop from './contexts/ScrollToTop';
import { useLoading } from './contexts/LoadingContext';
import GlobalLoader from './LoadingComponents/GlobalLoader';
import { api } from './services/loginService';
import ForgotPassword from './pages/ForgotPassword';
// Guard para rutas privadas
function RequireAuth() {
  const [allowed, setAllowed] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        // Intentamos refrescar el token usando la cookie
        await api.post('/token/refresh/');
        setAllowed(true);
      } catch {
        setAllowed(false);
      }
    })();
  }, []);

  if (allowed === null) {
    // Mientras comprobamos la cookie
    return <p>Cargando sesión…</p>;
  }

  return allowed ? <Outlet /> : <Navigate to="/login" replace />;
}



function AppContent() {
  const { loading } = useLoading();

  useEffect(() => {
    if (loading) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [loading]);

  return (
    <>
      <GlobalLoader />
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
        <ScrollToTop />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/animales" element={<Animales />} />
            <Route path="/animales/:id" element={<DetalleAnimal />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/noticias/:id" element={<DetalleNoticias />} />
            <Route path="/sobrenosotros" element={<SobreNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:uidb64/:token" element={<ResetPassword />} />
            {/* Agrupamos rutas protegidas bajo el guard */}
            <Route element={<RequireAuth />}>
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/adoptar/:id" element={<Adoptar />} />
              <Route path="/adopcionEnviada" element={<AdopcionEnviada />} />
              
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default AppContent;
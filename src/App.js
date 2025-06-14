import React, { useEffect } from 'react';
// Importación de estilos generales y de Bootstrap
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Importación de componentes de páginas y componentes reutilizables
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
import ForgotPassword from './pages/ForgotPassword';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import TerminosYCondiciones from './pages/TerminosYCondiciones';

// Importación de utilidades y contextos
import ScrollToTop from './contexts/ScrollToTop';
import { useLoading } from './contexts/LoadingContext';
import GlobalLoader from './LoadingComponents/GlobalLoader';
import { api } from './services/loginService';

// --- Guard para rutas privadas ---
// Este componente verifica si el usuario está autenticado para acceder a rutas protegidas.
function RequireAuth() {
  // Estado local para saber si se permite o no el acceso
  const [allowed, setAllowed] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        // Intenta refrescar el token de sesión usando la cookie almacenada
        await api.post('/token/refresh/');
        setAllowed(true);  // Si tiene éxito, permite acceso
      } catch {
        setAllowed(false); // Si falla, deniega acceso
      }
    })();
  }, []);

  if (allowed === null) {
    // Mientras se verifica el estado de la sesión, muestra un mensaje de carga
    return <p>Cargando sesión…</p>;
  }

  // Si está permitido, renderiza las rutas hijas, si no, redirige a login
  return allowed ? <Outlet /> : <Navigate to="/login" replace />;
}

// --- Componente principal del contenido de la app ---
function AppContent() {
  // Se usa el contexto para saber si hay un proceso de carga global
  const { loading } = useLoading();

  useEffect(() => {
    // Si está cargando, se desactivan las animaciones en el body para evitar flickers
    if (loading) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }, [loading]);

  return (
    <>
      {/* Componente para mostrar un loader global en la app */}
      <GlobalLoader />
      <div className="d-flex flex-column min-vh-100">
        {/* Barra de navegación fija en la parte superior */}
        <Navbar />
        <main className="flex-grow-1">
          {/* Componente para que la página haga scroll al top en cada cambio de ruta */}
          <ScrollToTop />

          {/* Definición de rutas con react-router-dom */}
          <Routes>
            {/* Rutas públicas sin autenticación */}
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
            <Route path="/privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos" element={<TerminosYCondiciones />} />

            {/* Rutas protegidas que requieren autenticación */}
            <Route element={<RequireAuth />}>
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/adoptar/:id" element={<Adoptar />} />
              <Route path="/adopcionEnviada" element={<AdopcionEnviada />} />
            </Route>

            {/* Ruta catch-all para páginas no encontradas */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Pie de página fijo abajo */}
        <Footer />
      </div>
    </>
  );
}

export default AppContent;

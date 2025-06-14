import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from 'react-bootstrap-icons';  // Icono para el perfil
import './Navbar.css';

const Navbar = () => {
  // Estado para controlar si el menú está colapsado (oculto) o desplegado
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Función para alternar el estado del menú
  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    // Barra de navegación fija arriba, con fondo blanco y padding
    <nav className="navbar navbar-expand-xxl bg-white fixed-top py-2 px-4">
      <div className="container position-relative slide-down-fade">

        {/* Barra superior visible solo en dispositivos móviles (menos de XXL) */}
        <div className="d-flex d-xxl-none w-100 align-items-center justify-content-between slide-down-fade">
          
          {/* Botón hamburguesa para abrir/cerrar el menú en móvil */}
          <button
            className={`navbar-toggler custom-toggler ${isCollapsed ? '' : 'open'}`}  // Cambia clase si está abierto
            type="button"
            onClick={toggleNavbar}  // Alterna el menú al hacer click
            aria-controls="navbarNav"  // Para accesibilidad, indica qué controla
            aria-expanded={!isCollapsed}  // Estado actual (true si abierto)
            aria-label="Toggle navigation"  // Texto accesible para screen readers
          >
          </button>

          {/* Logo/título centrado en móvil, link a página principal */}
          <Link to="/" className="navbar-brand fw-medium mb-0 mobile-title ">
            ANIMALISTES MASQUEFA
          </Link>

          {/* Espacio vacío para balancear el layout (igual ancho que botón hamburguesa) */}
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Título centrado para escritorio XXL, con animación y posición absoluta */}
        <div className="position-absolute top-50 start-50 translate-middle text-center d-none d-xxl-block">
          <Link to="/" className="navbar-brand fw-medium mb-0 fs-4 slide-down-fade">
            ANIMALISTES MASQUEFA
          </Link>
        </div>

        {/* Menú desplegable, colapsable según estado isCollapsed */}
        <div className={`collapse navbar-collapse animated-slide ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <div className="d-xxl-flex justify-content-between w-100 align-items-center">
            
            {/* Links de la izquierda: Animales y Noticias */}
            <div className="d-flex gap-3 flex-column flex-xxl-row mt-3 mt-xxl-0">
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/animales">ANIMALES</Link>
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/noticias">NOTICIAS</Link>
            </div>

            {/* Links de la derecha: Sobre Nosotros, Contacto y Perfil (icono) */}
            <div className="d-flex gap-3 flex-column flex-xxl-row align-items-xxl-center mt-3 mt-xxl-0">
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/sobrenosotros">SOBRE NOSOTROS</Link>
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/contacto">CONTACTO</Link>
              {/* Link con icono de persona para perfil */}
              <Link className="nav-link text-black slide-down-fade" to="/perfil">
                <Person size={28} className="slide-down-fade" />
              </Link> 
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

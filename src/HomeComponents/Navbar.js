import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Person } from 'react-bootstrap-icons';
import './Navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className="navbar navbar-expand-xxl bg-white fixed-top py-2 px-4">
      <div className="container position-relative slide-down-fade">

        {/* Fila superior (móvil) con hamburguesa + título centrado */}
        <div className="d-flex d-xxl-none w-100 align-items-center justify-content-between slide-down-fade">
          <button
            className={`navbar-toggler custom-toggler ${isCollapsed ? '' : 'open'}`}
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
          </button>

          {/* Texto ajustado para móvil con animación */}
          <Link to="/" className="navbar-brand fw-medium mb-0 mobile-title ">
            ANIMALISTES MASQUEFA
          </Link>

          {/* Espacio invisible para equilibrar */}
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Escritorio: Título centrado con animación */}
        <div className="position-absolute top-50 start-50 translate-middle text-center d-none d-xxl-block">
          <Link to="/" className="navbar-brand fw-medium mb-0 fs-4 slide-down-fade">
            ANIMALISTES MASQUEFA
          </Link>
        </div>

        {/* Menú */}
        <div className={`collapse navbar-collapse animated-slide ${isCollapsed ? '' : 'show'}`} id="navbarNav">
          <div className="d-xxl-flex justify-content-between w-100 align-items-center">
            {/* Izquierda */}
            <div className="d-flex gap-3 flex-column flex-xxl-row mt-3 mt-xxl-0">
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/animales">ANIMALES</Link>
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/noticias">NOTICIAS</Link>
            </div>
            {/* Derecha */}
            <div className="d-flex gap-3 flex-column flex-xxl-row align-items-xxl-center mt-3 mt-xxl-0">
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/sobrenosotros">SOBRE NOSOTROS</Link>
              <Link className="nav-link text-black fw-medium fs-5 slide-down-fade" to="/contacto">CONTACTO</Link>
              <Link className="nav-link text-black slide-down-fade" to="/perfil"><Person size={28} className="slide-down-fade" /></Link> 
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

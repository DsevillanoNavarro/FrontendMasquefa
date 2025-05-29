// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="bg-white text-dark pt-5 pb-3 border-top">
      <div className="container">
        <div className="row">
          {/* Columna izquierda: Título y lema */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">ANIMALISTES</h5>
            <h6 className="fw-bold">MASQUEFA</h6>
            <p className="mb-0">Juntos salvamos</p>
            <p>vidas.</p>
          </div>

          {/* Columna central: Navegación */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">NAVEGACIÓN</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-decoration-none text-dark">Home</Link></li>
              <li><Link to="/animales" className="text-decoration-none text-dark">Animales</Link></li>
              <li><Link to="/noticias" className="text-decoration-none text-dark">Noticias</Link></li>
              <li><Link to="/contacto" className="text-decoration-none text-dark">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna derecha: Iconos sociales funcionales */}
          <div className="col-md-4 mb-4 d-flex justify-content-md-end align-items-start gap-3">
            <a href="https://www.facebook.com/AnimalistesMasquefa" target="_blank" rel="noopener noreferrer" className="text-dark">
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a href="https://www.instagram.com/animalistesmasquefa" target="_blank" rel="noopener noreferrer" className="text-dark">
              <i className="bi bi-instagram fs-5"></i>
            </a>
            <Link to="/contacto" className="text-decoration-none text-dark">
              <i className="bi bi-envelope fs-5 text-dark"></i>
            </Link>
          </div>
        </div>

        {/* Pie inferior */}
        <div className="text-center mt-3">
          <small>Todos los derechos reservados a @AnimalesMasquefa</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

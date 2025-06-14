// src/components/Footer.jsx
import React from "react";               // Importa React para crear componentes
import { Link } from "react-router-dom"; // Importa Link para navegación interna sin recargar página

// Componente funcional Footer que representa el pie de página del sitio
const Footer = () => {
  return (
    // Elemento footer con clases Bootstrap para estilos de fondo, texto, padding y borde superior
    <footer className="bg-white text-dark pt-5 pb-3 border-top">
      <div className="container"> {/* Contenedor Bootstrap para centrar y limitar ancho */}
        <div className="row">     {/* Fila Bootstrap para dividir columnas */}

          {/* Columna izquierda: Título y lema */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">ANIMALISTES</h5> {/* Título principal en negrita */}
            <h6 className="fw-bold">MASQUEFA</h6>   {/* Subtítulo en negrita */}
            <p className="mb-0">Juntos salvamos</p> {/* Primer parte del lema sin margen inferior */}
            <p>vidas.</p>                           {/* Segunda parte del lema */}
          </div>

          {/* Columna central: Navegación */}
          <div className="col-md-4 mb-4">
            <h6 className="fw-bold">NAVEGACIÓN</h6> {/* Título sección navegación */}
            <ul className="list-unstyled">         {/* Lista sin estilos de lista */}
              {/* Links internos con estilos para eliminar subrayado y mantener texto oscuro */}
              <li><Link to="/" className="text-decoration-none text-dark">Home</Link></li>
              <li><Link to="/animales" className="text-decoration-none text-dark">Animales</Link></li>
              <li><Link to="/noticias" className="text-decoration-none text-dark">Noticias</Link></li>
              <li><Link to="/contacto" className="text-decoration-none text-dark">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna derecha: Iconos sociales funcionales */}
          <div className="col-md-4 mb-4 d-flex justify-content-md-end align-items-start gap-3">
            {/* Enlaces externos a redes sociales con target _blank para abrir en pestaña nueva
                y rel para seguridad */}
            <a
              href="https://www.facebook.com/AnimalistesMasquefa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              {/* Icono Facebook usando clases de Bootstrap Icons con tamaño fs-5 */}
              <i className="bi bi-facebook fs-5"></i>
            </a>
            <a
              href="https://www.instagram.com/animalistesmasquefa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              {/* Icono Instagram */}
              <i className="bi bi-instagram fs-5"></i>
            </a>
            {/* Link interno para ir a contacto con icono de sobre */}
            <Link to="/contacto" className="text-decoration-none text-dark">
              <i className="bi bi-envelope fs-5 text-dark"></i>
            </Link>
          </div>
        </div>

        {/* Pie inferior con texto centrado y margen superior */}
        <div className="text-center mt-3">
          <small>Todos los derechos reservados a @AnimalistesMasquefa</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer; // Exporta el componente para usarlo en otras partes de la app

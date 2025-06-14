// src/components/Hero.jsx
import React from "react";                         // Importamos React para crear el componente
import { Link } from "react-router-dom";          // Importamos Link para navegación interna sin recargar
import "./HomeImage.css";                          // Importamos estilos específicos para esta sección Hero

const Hero = () => {
  return (
    // Contenedor principal con clase para animación y estilo de sección hero
    <div className="hero-section slide-down-fade">
      {/* Contenedor bootstrap centrado, con texto en blanco y clase personalizada para fondo imagen */}
      <div className="container text-white imgHome">
        {/* Fila para controlar alineación del contenido */}
        <div className="row justify-content-left">
          {/* Columna que ocupa todo el ancho en pantallas md y más, texto alineado a la izquierda en md+ y centrado en móvil */}
          <div className="col-md-12 text-md-start text-center hero-text-wrapper">
            {/* Título principal con salto de línea, animación y margen inferior */}
            <h1 className="hero-title slide-down-fade mb-3">
              DALE UN<br />HOGAR
            </h1>
            {/* Botón que navega a la página de gatos rescatados, con animación y estilos personalizados */}
            <Link to="/animales" className="btn custom-btn mt-2 btn-lg slide-down-fade">
              Ver Nuestros Gatos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;  // Exportamos el componente para usarlo en otras partes de la app

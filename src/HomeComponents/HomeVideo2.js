import React from 'react';
import { Link } from 'react-router-dom';          // Para enlaces internos entre páginas
import Lottie from 'lottie-react';                // Para animaciones Lottie
import MiniCat from '../Lottie/MiniCat.json';    // Archivo JSON con animación de un mini gato

const GatosComponent = () => {
  return (
    // Contenedor principal con posición relativa para manejar superposiciones,
    // texto en color blanco, altura completa y sin scroll
    <div className="position-relative text-white" style={{ height: '100vh', overflow: 'hidden' }}>
      
      {/* Contenedor para centrar la animación en la parte superior con padding vertical */}
      <div className="text-center py-3">
        {/* Contenedor del Lottie con tamaño fijo y centrado */}
        <div style={{ width: 40, height: 55, margin: '0 auto' }}>
          {/* Animación de mini gato, en loop infinito */}
          <Lottie animationData={MiniCat} loop={true} />
        </div>
      </div>

      {/* Contenedor para el video de fondo, posición relativa para controlar capas */}
      <div className="video-wrapper position-relative w-100 h-100">
        
        {/* Capa superpuesta semitransparente oscura para mejorar la legibilidad del texto */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1 }}
        ></div>

        {/* Video en segundo plano, ocupa todo el ancho y alto, con objeto cubriendo el área */}
        <video
          className="position-relative w-100 h-100"
          style={{ objectFit: 'cover', zIndex: 0 }}
          autoPlay
          loop
          muted
        >
          {/* Fuente del video en formato mp4 */}
          <source src="https://videos.pexels.com/video-files/30280433/12980124_1920_1080_50fps.mp4" type="video/mp4" />
          {/* Mensaje alternativo si el navegador no soporta video */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Contenedor del texto en la parte inferior izquierda, con padding y ancho máximo */}
      <div
        className="position-absolute bottom-0 start-0 p-5 text-start"
        style={{ maxWidth: '500px', zIndex: 2, marginLeft: '8.2%' }}
      >
        {/* Título con fuente y tamaño personalizado */}
        <h1 style={{ fontFamily: 'Afacad, sans-serif', fontSize: '3rem' }}>Nuestras Noticias</h1>
        
        {/* Párrafo descriptivo con fuente y tamaño específico */}
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem' }}>
          Mantente al día con las últimas historias, eventos y logros de nuestra asociación.
          ¡Infórmate y sé parte del cambio!
        </p>

        {/* Enlace tipo botón para navegar a la sección de noticias, con estilos personalizados */}
        <Link
          to="/noticias"
          className="text-white fw-bold d-inline-block mt-2"
          style={{ fontFamily: 'Poppins, sans-serif', textDecoration: 'none', fontSize: '1.1rem' }}
        >
          Ver Noticias 
          {/* Flecha decorativa escalada horizontalmente */}
          <span style={{ display: 'inline-block', transform: 'scaleX(1.5)', marginLeft: '8px' }}>→</span>
        </Link>
      </div>
    </div>
  );
};

export default GatosComponent;

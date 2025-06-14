// src/components/GatosComponent.jsx
import React from 'react';
import { Link } from 'react-router-dom';           // Para navegación interna entre páginas
import Lottie from 'lottie-react';                 // Para animaciones Lottie
import MiniCat from '../Lottie/MiniCat.json';     // Animación JSON importada

const GatosComponent = () => {
  return (
    // Contenedor principal con posición relativa para superponer elementos y fondo de altura completa
    <div className="position-relative text-white" style={{ height: '100vh', overflow: 'hidden' }}>
      
      {/* Contenedor para la animación Lottie centrada con padding vertical */}
      <div className="text-center py-3">
        <div style={{ width: 40, height: 55, margin: '0 auto' }}>
          {/* Animación Lottie del mini gato, en bucle infinito */}
          <Lottie animationData={MiniCat} loop={true} />
        </div>
      </div>

      {/* Contenedor para el video de fondo, con posición relativa para control de capas */}
      <div className="video-wrapper position-relative w-100 h-100">
        {/* Capa superpuesta semitransparente para oscurecer el video y mejorar legibilidad del texto */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1 }}
        ></div>

        {/* Video de fondo que cubre todo el área disponible, con objeto cubriendo el contenedor */}
        <video
          className="position-relative w-100 h-100"
          style={{ objectFit: 'cover', zIndex: 0 }}
          autoPlay
          loop
          muted
        >
          {/* Fuente del video en formato mp4 */}
          <source src="https://videos.pexels.com/video-files/6543595/6543595-uhd_2732_1318_30fps.mp4" type="video/mp4" />
          {/* Mensaje alternativo para navegadores que no soportan video */}
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Contenedor del texto con posición absoluta en la parte inferior izquierda, con padding y límites de ancho */}
      <div className="position-absolute bottom-0 start-0 p-5 text-start" style={{ maxWidth: '500px', zIndex: 2, marginLeft:'8.2%' }}>
        
        {/* Título con fuente personalizada y tamaño grande */}
        <h1 style={{ fontFamily: 'Afacad, sans-serif', fontSize: '3rem' }}>Únete a Nosotros</h1>
        
        {/* Párrafo descriptivo con fuente y tamaño específico */}
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem' }}>
          Ayuda a cambiar vidas. Adopta, sé voluntario o dona.<br />
          ¡Juntos hacemos la diferencia!
        </p>

        {/* Enlace tipo botón que dirige a la página de animales, con estilo personalizado */}
        <Link
          to="/animales"
          className="text-white fw-bold d-inline-block mt-2"
          style={{ fontFamily: 'Poppins, sans-serif', textDecoration: 'none', fontSize: '1.1rem' }}
        >
          Ver Nuestros Gatos 
          {/* Flecha decorativa con escalado horizontal y margen izquierdo */}
          <span style={{ display: 'inline-block', transform: 'scaleX(1.5)', marginLeft: '8px' }}>→</span>
        </Link>
      </div>
    </div>
  );
};

export default GatosComponent;

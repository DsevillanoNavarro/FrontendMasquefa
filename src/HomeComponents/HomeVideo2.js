import React from 'react';
import Lottie from 'lottie-react';
import MiniCat from '../Lottie/MiniCat.json';

const GatosComponent = () => {
  return (
    <div className="position-relative text-white" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="text-center py-3">
      </div>

      <div className="video-wrapper position-relative w-100 h-100">
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', zIndex: 1 }}
        ></div>

        <video
          className="position-relative w-100 h-100"
          style={{ objectFit: 'cover', zIndex: 0 }}
          autoPlay
          loop
          muted
        >
          <source src="https://videos.pexels.com/video-files/30280433/12980124_1920_1080_50fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="position-absolute bottom-0 start-0 p-5 text-start" style={{ maxWidth: '500px', zIndex: 2, marginLeft:'8.2%'}}>
        <h1 style={{ fontFamily: 'Afacad, sans-serif', fontSize: '3rem' }}>Nuestros voluntarios</h1>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.25rem' }}>
        Descubre a las personas que hacen posible este sueño. Con su dedicación, ayudan a cambiar vidas cada día. ¡Únete y marca la diferencia!
        </p>
        <a
          href="#"
          className="text-white fw-bold d-inline-block mt-2"
          style={{ fontFamily: 'Poppins, sans-serif', textDecoration: 'none', fontSize: '1.1rem' }}
        >
          Ver Nuestros Voluntarios <span style={{ display: 'inline-block', transform: 'scaleX(1.5)', marginLeft: '8px' }}>→</span>
        </a>
      </div>
    </div>
  );
};

export default GatosComponent;

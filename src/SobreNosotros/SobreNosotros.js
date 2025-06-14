import React from 'react';
// Importa estilos CSS de Bootstrap para estilos base y responsivos
import 'bootstrap/dist/css/bootstrap.min.css';
// Importa los estilos específicos para este componente
import './SobreNosotros.css';

const SobreNosotros = () => {
  return (
    // Sección principal con clases Bootstrap y clase personalizada 'sobre-nosotros'
    <section className="container py-5 sobre-nosotros">

      {/* Primera fila centrada con animación de aparición gradual */}
      <div className="row justify-content-center fade-in">
        <div className="col-lg-10 text-center">
          {/* Título principal */}
          <h1 className="display-5 fw-bold mb-4">SOBRE NOSOTROS</h1>
          
          {/* Párrafo descriptivo principal sobre la asociación */}
          <p className="lead mb-4">
            Animalistes Masquefa somos una asociación sin ánimo de lucro formada por un grupo de voluntarias y voluntarios. Esta organización se creó como un proyecto social que tenía como objetivo velar y controlar las colonias de gatos de nuestro pueblo, luchando contra el abandono y el maltrato animal. Nuestros esfuerzos van orientados a conseguir y mantener una convivencia equilibrada entre humanos y felinos, intentando controlar las colonias de gatos mediante una alimentación controlada y un proceso de esterilización (aplicando el método CES: Captura, Esterilización y Suelta).
          </p>
          
          {/* Segundo párrafo explicando la labor voluntaria */}
          <p className="lead">
            Como en toda asociación sin ánimo de lucro, las personas que gestionan la organización, lo hacen (valga la redundancia) de forma voluntaria, sin retribución económica de ningún tipo. Somos gente comprometida con los animales que trabajamos por el bien de los mismos.
          </p>
        </div>
      </div>

      {/* Segunda fila con mapa embebido y animación fade-in */}
      <div className="row justify-content-center mt-5 fade-in">
        <div className="col-lg-10">
          {/* Contenedor responsive para el iframe del mapa */}
          <div className="map-responsive rounded-4 shadow">
            {/* Mapa embebido de Google Maps con ubicación de Animalistes Masquefa */}
            <iframe
              title="Ubicación Animalistes Masquefa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2991.573847833538!2d1.8106568761752735!3d41.50718359124304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a496b411a887eb%3A0x5e4a084ce84024c4!2sMasquefa%2C%20Barcelona!5e0!3m2!1ses!2ses!4v1714416800000!5m2!1ses!2ses"
              width="100%"           // El ancho del iframe ocupa el 100% del contenedor padre
              height="450"           // Altura fija del mapa
              style={{ border: 0 }}  // Sin borde alrededor del iframe
              allowFullScreen=""     // Permite que el mapa se vea a pantalla completa si se solicita
              loading="lazy"         // Carga perezosa para mejorar rendimiento
              referrerPolicy="no-referrer-when-downgrade" // Política de referencia para seguridad
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SobreNosotros;

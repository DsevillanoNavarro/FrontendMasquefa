import Lottie from "lottie-react";  // Importa el componente para animaciones Lottie
import cat from "../Lottie/404Cat.json";  // Archivo JSON con animación del gato para error 404

export default function NotFound() {
  return (
    // Contenedor principal centrado y con flexbox, ocupa mínimo 80% de la altura de la ventana
    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center min-vh-80 bg-white">

      {/* Contenedor para la animación del gato */}
      <div className="text-center text-md-start me-md-4 mb-4 mb-md-0">
        <div
          className="mx-auto"
          style={{
            width: '100%',
            maxWidth: '500px',  // Limita el tamaño máximo para pantallas grandes
            height: 'auto',
          }}
        >
          {/* Componente Lottie que reproduce la animación del gato en bucle */}
          <Lottie
            className="slide-down-fade"  // Clase para animación CSS opcional
            animationData={cat}  // Animación cargada desde el JSON importado
            loop={true}  // Repetición infinita
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '500px',
              maxHeight: '500px',
            }}
          />
        </div>
      </div>

      {/* Contenedor para el texto del error */}
      <div className="text-center text-md-start">
        {/* Título del error 404, con estilo rojo y fuente personalizada */}
        <h1
          className="text-danger fw-bold mb-1 slide-down-fade"
          style={{ fontSize: '32px', fontFamily: 'Afacad, sans-serif', marginTop: 0 }}
        >
          ERROR 404
        </h1>

        {/* Texto descriptivo del error, con fuente y estilo seminegrita */}
        <p
          className="text-dark fw-semibold mb-0 slide-down-fade"
          style={{ fontSize: '16px', fontFamily: 'Montserrat, sans-serif', marginBottom: 0 }}
        >
          NO HEMOS PODIDO ENCONTRAR LA PÁGINA
        </p>
      </div>
    </div>
  );
}

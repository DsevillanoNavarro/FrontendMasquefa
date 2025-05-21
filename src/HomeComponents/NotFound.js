import Lottie from "lottie-react";
import cat from "../Lottie/404Cat.json";

export default function NotFound() {
  return (
    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-center min-vh-80 bg-white">
      {/* Gato animado */}
      <div className="text-center text-md-start me-md-4 mb-4 mb-md-0">
        <div
          className="mx-auto"
          style={{
            width: '100%',
            maxWidth: '500px',
            height: 'auto',
          }}
        >
          <Lottie
          className="slide-down-fade"
            animationData={cat}
            loop={true}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '500px',
              maxHeight: '500px',
            }}
          />
        </div>
      </div>

      {/* Texto del error */}
      <div className="text-center text-md-start">
        <h1
          className="text-danger fw-bold mb-1 slide-down-fade"
          style={{ fontSize: '32px', fontFamily: 'Afacad, sans-serif', marginTop: 0 }}
        >
          ERROR 404
        </h1>
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

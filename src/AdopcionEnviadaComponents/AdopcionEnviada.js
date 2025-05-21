import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import cat from "../Lottie/CatCheck.json";
import "./AdopcionEnviada.css";

/**
 * Componente que muestra la confirmación de adopción enviada.
 * Usa animación Lottie y muestra los datos del animal.
 */
const ConfirmacionAdopcion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const animal = location.state?.animal;

  if (!animal) {
    // Si no hay datos del animal, redirige al listado
    navigate("/animales", { replace: true });
    return null;
  }

  return (
    <div className="container Confirmation mt-5 pt-5 text-center slide-down-fade">
      <h2>¡Solicitud de adopción enviada!</h2>
      <p>Gracias por enviar tu solicitud para adoptar a <strong>{animal.nombre}</strong>.</p>

      <div className="animation-wrapper">
        <Lottie
          className="slide-down-fade"
          animationData={cat}
          loop={true}
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
            maxHeight: '500px',
            margin: '0 auto'
          }}
        />
      </div>

      <button
        className="custom-btn mt-4"
        onClick={() => navigate("/animales")}
      >
        Volver al listado de animales
      </button>
    </div>
  );
};

export default ConfirmacionAdopcion;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Hooks para navegación y acceso al estado de la ruta
import Lottie from "lottie-react"; // Librería para animaciones Lottie
import cat from "../Lottie/CatCheck.json"; // Archivo JSON de animación Lottie
import "./AdopcionEnviada.css"; // Estilos específicos para este componente

/**
 * Componente que muestra la confirmación de que la solicitud de adopción fue enviada correctamente.
 * Muestra el nombre del animal adoptado y una animación Lottie de confirmación.
 */
const ConfirmacionAdopcion = () => {
  const navigate = useNavigate(); // Hook para navegación programática
  const location = useLocation(); // Hook para acceder al estado enviado por la navegación previa
  const animal = location.state?.animal; // Obtiene el animal pasado en el estado de navegación

  // Si no hay datos del animal (por ejemplo, si se accede directamente a esta ruta),
  // redirige al usuario a la lista de animales para evitar error o pantalla vacía
  if (!animal) {
    navigate("/animales", { replace: true });
    return null; // No renderiza nada mientras se redirige
  }

  return (
    <div className="container Confirmation mt-5 pt-5 text-center slide-down-fade">
      {/* Mensaje de confirmación */}
      <h2>¡Solicitud de adopción enviada!</h2>
      <p>
        Gracias por enviar tu solicitud para adoptar a <strong>{animal.nombre}</strong>.
      </p>

      {/* Contenedor para la animación Lottie */}
      <div className="animation-wrapper">
        <Lottie
          className="slide-down-fade"
          animationData={cat} // Archivo de animación Lottie
          loop={true} // Reproduce la animación en loop
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
            maxHeight: '500px',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Botón para volver al listado de animales */}
      <button
        className="custom-btn mt-4 mb-5"
        onClick={() => navigate("/animales")}
      >
        Volver al listado de animales
      </button>
    </div>
  );
};

export default ConfirmacionAdopcion;

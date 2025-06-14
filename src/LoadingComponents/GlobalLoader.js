import React from "react";
// Importa el hook personalizado para controlar el estado de carga global
import { useLoading } from "../contexts/LoadingContext";
// Importa el componente para animaciones Lottie
import Lottie from "lottie-react";
// Importa la animación JSON del gato para mostrar durante la carga
import loadingCatAnimation from "../Lottie/LoadingCat.json";
// Importa el componente Navbar para mostrar durante la carga
import Navbar from '../HomeComponents/Navbar';
// Importa estilos CSS específicos para el loader global
import "./GlobalLoader.css";

const GlobalLoader = () => {
  // Obtiene el estado "loading" del contexto global de carga
  const { loading } = useLoading();

  // Si no está cargando, no renderiza nada (null)
  if (!loading) return null;

  // Si está cargando, muestra la pantalla de carga con Navbar y animación Lottie
  return (
    <div className="loading-screen">
      {/* Navbar visible incluso durante la carga */}
      <Navbar/>
      {/* Animación del gato en bucle, con tamaño fijo */}
      <Lottie
        animationData={loadingCatAnimation}
        loop={true}
        autoplay
        style={{ width: 200, height: 200 }}
      />
    </div>
  );
};

export default GlobalLoader;

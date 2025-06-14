// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Componente que se encarga de hacer scroll al tope de la página
// cada vez que cambia la ruta (pathname)
const ScrollToTop = () => {
  // Obtener el pathname actual de la URL (ruta)
  const { pathname } = useLocation();

  // Cada vez que pathname cambia, ejecuta el efecto para hacer scroll arriba
  useEffect(() => {
    // Mueve la ventana a la posición 0,0 (arriba de la página)
    window.scrollTo(0, 0);
  }, [pathname]); // Dependencia: se ejecuta solo cuando cambia el pathname

  // No renderiza nada en pantalla
  return null;
};

export default ScrollToTop;

// Importamos React y hooks necesarios
import React, { useEffect, useState } from 'react';
// Importamos Navigate para redirección condicional
import { Navigate } from 'react-router-dom';
// Importamos el contexto de autenticación
import { useAuth } from '../contexts/AuthContext';
// Importamos la instancia de axios con cookies configuradas
import { api } from '../services/loginService';

/**
 * Componente de ruta protegida.
 * Verifica si el usuario tiene una sesión válida antes de renderizar el contenido protegido.
 * Si no está autenticado, redirige al login.
 */
const PrivateRoute = ({ element }) => {
  const { isAuthenticated, logout } = useAuth(); // Extraemos estado de autenticación y función de logout
  const [checkingAuth, setCheckingAuth] = useState(true); // Estado de carga inicial
  const [isValid, setIsValid] = useState(false); // Validez del token de sesión

  useEffect(() => {
    /**
     * Función que intenta refrescar el token.
     * Si falla, se asume que la sesión ha expirado y se fuerza logout.
     */
    const checkAuth = async () => {
      try {
        await api.post('/api/token/refresh/'); // Intenta refrescar el token
        setIsValid(true); // Si tiene éxito, marcamos como válido
      } catch {
        setIsValid(false); // Si falla, marcamos como inválido
        logout(); // Ejecutamos logout para limpiar sesión y cookies
      } finally {
        setCheckingAuth(false); // Finaliza la verificación
      }
    };

    checkAuth(); // Ejecutamos la verificación al montar el componente
  }, [logout]);

  // Mientras se verifica la autenticación, mostramos un mensaje de carga
  if (checkingAuth || isAuthenticated === null) {
    return <p>Cargando autenticación…</p>;
  }

  // Si el token no es válido o no está autenticado, redirigimos al login
  if (!isValid || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si todo es válido, se renderiza el componente protegido
  return element;
};

export default PrivateRoute;

// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/loginService'; // Servicio para llamadas al backend relacionadas con login/logout
import { useNavigate } from 'react-router-dom'; // Hook para navegación programática
import { useLoading } from './LoadingContext'; // Contexto para manejar el estado de loading global

// Crear el contexto de autenticación
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estado para controlar si el usuario está autenticado (true/false) o aún no se sabe (null)
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const navigate = useNavigate(); // Hook para redirigir páginas
  const { setLoading } = useLoading(); // Función para mostrar/ocultar loading

  // Efecto que corre una sola vez al montar el componente para verificar sesión existente
  useEffect(() => {
    (async () => {
      setLoading(true); // Mostrar loading mientras se verifica la sesión
      try {
        // Intentar refrescar el token (verifica si hay sesión activa)
        await api.post('/token/refresh/');
        setIsAuthenticated(true); // Si responde bien, usuario autenticado
      } catch {
        setIsAuthenticated(false); // Si falla, no autenticado
      } finally {
        setLoading(false); // Ocultar loading al finalizar verificación
      }
    })();
  }, []);

  // Función para iniciar sesión con usuario y contraseña
  const login = async (username, password) => {
    setLoading(true); // Mostrar loading al iniciar login
    try {
      // Solicitar token al backend con las credenciales
      await api.post('/token/', { username, password });
      setIsAuthenticated(true); // Actualizar estado a autenticado
      navigate('/', { replace: true }); // Redirigir a la página principal
    } finally {
      setLoading(false); // Ocultar loading cuando termine login
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      // Solicitar al backend cerrar sesión y borrar cookies/token
      await api.post('/logout/');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    } finally {
      setIsAuthenticated(false); // Actualizar estado a no autenticado
      navigate('/', { replace: true }); // Redirigir a página principal tras logout
    }
  };

  // Proveer el contexto con el estado y funciones para login y logout
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación en cualquier componente
export const useAuth = () => React.useContext(AuthContext);

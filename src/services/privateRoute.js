// src/services/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/loginService';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, logout } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.post('/api/token/refresh/');
        setIsValid(true);
      } catch {
        setIsValid(false);
        logout(); // borra cookies y redirige
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [logout]);

  if (checkingAuth || isAuthenticated === null) {
    return <p>Cargando autenticación…</p>;
  }

  if (!isValid || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;

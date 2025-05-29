// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ResetPassword.css';
import { api } from '../services/loginService'; // Usa instancia con baseURL

export default function ResetPassword() {
  const { uidb64, token } = useParams();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await api.post('/password-reset-confirm/', {
        uidb64,
        token,
        new_password: password
      });
      setMessage(res.data.detail || 'Contraseña cambiada correctamente.');
    } catch (err) {
      setError(err.response?.data?.detail || 'Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container slide-down-fade">
      <h2 className="login-title">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="login-input"
          placeholder="Nueva contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <button
          type="submit"
          className="login-btn"
          disabled={loading || password.length < 8}
        >
          {loading ? 'Enviando...' : 'Cambiar contraseña'}
        </button>
      </form>
      {error && <p className="alert-message alert-success">{error}</p>}
      {message && <p className="alert-message alert-error">{message}</p>}
      <div className="login-links">
        <a href="/login" className="login-link">
          ¿Recordaste tu contraseña? Inicia sesión
        </a>
      </div>
    </div>
  );
}

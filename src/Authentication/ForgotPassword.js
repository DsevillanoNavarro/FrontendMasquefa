import React, { useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/password-reset/`, { email });
      setEnviado(true);
    } catch (err) {
      setError('No se pudo enviar el email. Verifica que sea correcto.');
    }
  };

  return (
    <div className="forgot-container slide-down-fade">
      <h1 className="forgot-title">¿Olvidaste tu contraseña?</h1>
      {enviado ? (
        <p className="forgot-success">
          📧 Si el email está registrado, recibirás instrucciones para restablecer tu contraseña.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="forgot-btn">Enviar</button>
        </form>
      )}
      {error && <p className="forgot-error">{error}</p>}
      <div className="forgot-links">
        <a href="/login" className="forgot-link">Volver al inicio de sesión</a>
      </div>
    </div>
  );
}

export default ForgotPassword;

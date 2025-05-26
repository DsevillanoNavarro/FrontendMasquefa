/* src/components/Login.jsx */
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' }); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    if (!form.username.trim() || form.username.length < 3) {
      errors.username = 'El usuario debe tener al menos 3 caracteres.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setError('');
    try {
      await login(form.username, form.password);
      navigate('/perfil');
    } catch (err) {
      setFailedAttempts((prev) => prev + 1);
      const msg = err.response?.data?.detail || 'Error desconocido';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container login-container slide-down-fade">
      <h2 className="login-title">Iniciar Sesión</h2>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
        required
        className="login-input"
      />
      {formErrors.username && <p className="login-error">{formErrors.username}</p>}

      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
        className="login-input"
      />
      {formErrors.password && <p className="login-error">{formErrors.password}</p>}

      <button
        type="submit"
        disabled={failedAttempts >= 3}
        className="login-btn"
      >
        Entrar
      </button>

      {error && <p className="login-error">{error}</p>}

      <div className="login-links">
        <p>
          <Link to="/forgotPassword" className="login-link">
            ¿Se te ha olvidado tu contraseña?
          </Link>
        </p>
        <p>
          <Link to="/Registro" className="login-link">
            ¿No tienes una cuenta? Regístrate aquí
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;

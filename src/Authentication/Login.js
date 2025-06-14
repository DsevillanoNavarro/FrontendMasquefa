/* src/components/Login.jsx */
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Contexto de autenticación para login
import './Login.css'; // Estilos específicos para el componente
import { Link, useNavigate } from 'react-router-dom'; // Navegación y enlaces entre rutas

const Login = () => {
  // Estado para almacenar los valores del formulario (usuario y contraseña)
  const [form, setForm] = useState({ username: '', password: '' });
  // Estado para almacenar errores de validación específicos de campos
  const [formErrors, setFormErrors] = useState({});
  // Estado para errores generales (por ejemplo, error en la API)
  const [error, setError] = useState('');
  // Estado para contar intentos fallidos de login y deshabilitar botón tras 3 intentos
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Obtener la función login del contexto de autenticación
  const { login } = useAuth();
  // Hook para redirigir programáticamente tras login exitoso
  const navigate = useNavigate();

  // Función para actualizar el estado del formulario y limpiar errores de campo al escribir
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    let errors = {};

    // Validar que el usuario tenga al menos 3 caracteres y no esté vacío
    if (!form.username.trim() || form.username.length < 3) {
      errors.username = 'El usuario debe tener al menos 3 caracteres.';
    }

    // Si hay errores, actualizar estado y salir sin continuar
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Limpiar errores previos
    setFormErrors({});
    setError('');

    try {
      // Intentar loguear con los datos del formulario
      await login(form.username, form.password);
      // Si tiene éxito, redirigir a la página de perfil
      navigate('/perfil');
    } catch (err) {
      // Si falla el login, aumentar contador de intentos fallidos
      setFailedAttempts((prev) => prev + 1);
      // Mostrar mensaje de error específico devuelto por la API o mensaje genérico
      const msg = err.response?.data?.detail || 'Error desconocido';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container login-container slide-down-fade">
      <h2 className="login-title">Iniciar Sesión</h2>

      {/* Input para el nombre de usuario */}
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
        required
        className="login-input"
      />
      {/* Mostrar error específico si existe */}
      {formErrors.username && <p className="alert-message alert-error">{formErrors.username}</p>}

      {/* Input para la contraseña */}
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
        className="login-input"
      />
      {/* Mostrar error específico si existe */}
      {formErrors.password && <p className="alert-message alert-error">{formErrors.password}</p>}

      {/* Botón para enviar el formulario, se deshabilita tras 3 intentos fallidos */}
      <button
        type="submit"
        disabled={failedAttempts >= 3}
        className="login-btn"
      >
        Entrar
      </button>

      {/* Mostrar mensaje de error general si existe */}
      {error && <p className="alert-message alert-error">{error}</p>}

      {/* Enlaces para recuperar contraseña y para registrarse */}
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

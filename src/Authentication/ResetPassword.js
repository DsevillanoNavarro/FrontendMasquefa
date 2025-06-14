import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ResetPassword.css';
import { api } from '../services/loginService';

export default function ResetPassword() {
  // Obtenemos los parámetros uidb64 y token de la URL usando useParams de react-router
  const { uidb64, token } = useParams();

  // Estado para almacenar la nueva contraseña ingresada por el usuario
  const [password, setPassword] = useState('');
  // Estado para controlar si la petición está en proceso de carga (loading)
  const [loading, setLoading] = useState(false);
  // Estado para mostrar mensajes de éxito o error
  const [mensaje, setMensaje] = useState('');
  // Estado para definir el tipo de mensaje, puede ser 'success' o 'error'
  const [tipoMensaje, setTipoMensaje] = useState('');

  /**
   * Función para validar la contraseña según criterios:
   * - largo: mínimo 8 caracteres
   * - mayuscula: contiene al menos una letra mayúscula
   * - numero: contiene al menos un número
   * Retorna un objeto con el resultado de cada validación (true/false)
   */
  const validarPassword = (password) => ({
    largo: password.length >= 8,
    mayuscula: /[A-Z]/.test(password),
    numero: /\d/.test(password)
  });

  // Obtenemos las validaciones actualizadas para la contraseña ingresada
  const validaciones = validarPassword(password);

  /**
   * Función que se ejecuta al enviar el formulario
   * - Previene la recarga de página (e.preventDefault)
   * - Limpia mensajes previos
   * - Muestra indicador de carga
   * - Envía petición POST a la API para confirmar el cambio de contraseña
   * - Muestra mensajes según respuesta o error
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setTipoMensaje('');
    setLoading(true);

    try {
      // Petición POST al endpoint /password-reset-confirm/ con los datos necesarios
      const res = await api.post('/password-reset-confirm/', {
        uidb64,
        token,
        new_password: password
      });
      // Si la respuesta tiene un mensaje de detalle, mostrarlo, sino un mensaje por defecto
      setMensaje(res.data.detail || 'Contraseña cambiada correctamente.');
      setTipoMensaje('success');
    } catch (err) {
      // En caso de error, mostrar mensaje de error recibido o uno genérico
      const detalle = err.response?.data?.detail || 'Error inesperado';
      setMensaje(detalle);
      setTipoMensaje('error');
    } finally {
      // Ocultar indicador de carga independientemente del resultado
      setLoading(false);
    }
  };

  return (
    <div className="login-container slide-down-fade">
      {/* Título de la página */}
      <h2 className="login-title">Restablecer contraseña</h2>

      {/* Mostrar mensaje de error o éxito solo si existe */}
      {mensaje && (
        <p className={`alert-message ${tipoMensaje === 'error' ? 'alert-error' : 'alert-success'}`}>
          {mensaje}
        </p>
      )}

      {/* Si el cambio fue exitoso, mostrar enlace para iniciar sesión */}
      {tipoMensaje === 'success' ? (
        <div className="login-links">
          <Link to="/login" className="login-link">
            👉 Inicia sesión ahora
          </Link>
        </div>
      ) : (
        /* Si no hay éxito aún, mostrar el formulario para ingresar nueva contraseña */
        <form onSubmit={handleSubmit}>
          {/* Input para la nueva contraseña */}
          <input
            type="password"
            className="login-input"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password
            required
          />

          {/* Lista con los criterios de validación y si se cumplen o no */}
          <ul className="password-checklist">
            <li className={validaciones.largo ? 'valid' : 'invalid'}>
              {validaciones.largo ? '✅' : '❌'} Al menos 8 caracteres
            </li>
            <li className={validaciones.mayuscula ? 'valid' : 'invalid'}>
              {validaciones.mayuscula ? '✅' : '❌'} Al menos una letra mayúscula
            </li>
            <li className={validaciones.numero ? 'valid' : 'invalid'}>
              {validaciones.numero ? '✅' : '❌'} Al menos un número
            </li>
          </ul>

          {/* Botón para enviar el formulario, deshabilitado si está cargando o si alguna validación no pasa */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading || !Object.values(validaciones).every(Boolean)}
          >
            {/* Texto cambia según estado de carga */}
            {loading ? 'Enviando...' : 'Cambiar contraseña'}
          </button>
        </form>
      )}

      {/* Enlace para volver a login si recordó su contraseña */}
      <div className="login-links">
        <Link to="/login" className="login-link">
          ¿Recordaste tu contraseña? Inicia sesión
        </Link>
      </div>
    </div>
  );
}

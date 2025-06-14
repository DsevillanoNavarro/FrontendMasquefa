import React, { useState } from 'react';
import './ForgotPassword.css'; // Estilos específicos para este componente
import axios from 'axios'; // Cliente HTTP para hacer peticiones a la API

function ForgotPassword() {
  // Estado para almacenar el email introducido por el usuario
  const [email, setEmail] = useState('');
  // Estado para saber si el correo se envió correctamente
  const [enviado, setEnviado] = useState(false);
  // Estado para almacenar y mostrar mensajes de error
  const [error, setError] = useState('');

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recargar la página al enviar
    setError(''); // Limpiar cualquier error previo

    try {
      // Petición POST a la API para solicitar restablecimiento de contraseña
      await axios.post(`${process.env.REACT_APP_API_URL}/password-reset/`, { email });
      // Si la petición es exitosa, indicamos que el email fue enviado
      setEnviado(true);
    } catch (err) {
      // Si ocurre un error, mostramos mensaje indicando que no se pudo enviar
      setError('No se pudo enviar el email. Verifica que sea correcto.');
    }
  };

  return (
    <div className="forgot-container slide-down-fade">
      <h1 className="forgot-title">¿Olvidaste tu contraseña?</h1>

      {enviado ? (
        // Mensaje de éxito que se muestra después de enviar el email
        <p className="alert-message alert-success">
          📧 Si el email está registrado, recibirás instrucciones para restablecer tu contraseña.
        </p>
      ) : (
        // Formulario para introducir el email y enviar solicitud de restablecimiento
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="forgot-input"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza estado con el email ingresado
            required // Campo obligatorio
          />
          <button type="submit" className="forgot-btn">Enviar</button>
        </form>
      )}

      {/* Mostrar mensaje de error si existe */}
      {error && <p className="alert-message alert-error">{error}</p>}

      {/* Link para volver a la página de inicio de sesión */}
      <div className="forgot-links">
        <a href="/login" className="forgot-link">Volver al inicio de sesión</a>
      </div>
    </div>
  );
}

export default ForgotPassword;

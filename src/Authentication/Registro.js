import React, { useState } from 'react';
// Hook para redireccionar programáticamente en React Router
import { useNavigate } from 'react-router-dom';
// Servicio para manejar la creación de usuarios (peticiones a backend)
import UsuarioService from '../services/usuarioService';
import './Registro.css';

const UsuarioForm = () => {
  // Estado para guardar los valores del formulario
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    receive_news: false,  // checkbox para recibir noticias
    accept_terms: false   // checkbox para aceptar términos
  });

  // Estado para errores generales (no específicos de campo)
  const [error, setError] = useState('');
  // Estado para errores específicos de cada campo (validación)
  const [formErrors, setFormErrors] = useState({});
  // Estado para mostrar mensaje de éxito al enviar el formulario
  const [successMessage, setSuccessMessage] = useState("");
  // Hook para redirigir después del registro exitoso
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualiza el estado del formulario según cambios en los inputs
  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      // Si es checkbox, usamos checked, sino usamos value normal
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Función para validar los datos del formulario y devolver errores
  const validar = () => {
    const errors = {};

    // Validar nombre de usuario
    if (!form.username.trim()) {
      errors.username = 'Debes introducir un nombre de usuario.';
    } else if (form.username.length < 3) {
      errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
    } else if (/\s/.test(form.username)) {
      errors.username = 'El nombre de usuario no puede contener espacios.';
    }

    // Validar nombre
    if (!form.first_name.trim()) {
      errors.first_name = 'El nombre es obligatorio.';
    }

    // Validar apellido
    if (!form.last_name.trim()) {
      errors.last_name = 'El apellido es obligatorio.';
    }

    // Validar email
    if (!form.email.trim()) {
      errors.email = 'Debes introducir un correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Introduce un correo electrónico válido (ej. usuario@ejemplo.com).';
    }

    // Validar contraseña
    if (!form.password) {
      errors.password = 'Debes introducir una contraseña.';
    } else {
      const pass = form.password;
      if (pass.length < 8) {
        errors.password = 'La contraseña debe tener al menos 8 caracteres.';
      } else if (!/[A-Z]/.test(pass)) {
        errors.password = 'La contraseña debe incluir al menos una letra mayúscula.';
      } else if (!/\d/.test(pass)) {
        errors.password = 'La contraseña debe incluir al menos un número.';
      }
    }

    // Validar aceptación de términos
    if (!form.accept_terms) {
      errors.accept_terms = 'Debes aceptar los términos y condiciones para continuar.';
    }

    return errors;
  };

  // Función que maneja el envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();  // evitar recarga de página
    setError('');        // limpiar errores generales
    setIsSubmitting(true);
    // Ejecutar validación
    const errores = validar();
    setFormErrors(errores); // actualizar errores de validación

    // Si hay errores, no continuar con envío
    if (Object.keys(errores).length > 0) return;

    // Construir FormData para enviar en formato multipart/form-data
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      // No enviamos accept_terms al backend, solo el resto
      if (key !== 'accept_terms') {
        formData.append(nameConversion(key), value);
      }
    });

    try {
      // Llamada al servicio para crear usuario
      await UsuarioService.createUsuario(formData);
      // Mensaje de éxito y aviso de redirección
      setSuccessMessage("Registro exitoso. Serás redirigido al login en unos segundos...");

      // Redirigir al login después de 3 segundos
      setTimeout(() => {
        navigate("/login");
        setIsSubmitting(false);
      }, 1500);

    } catch (err) {
      // Si hay respuesta con errores del backend, procesarlos para mostrarlos
      if (err.response?.data) {
        setIsSubmitting(false);
        const data = err.response.data;
        const fieldErrors = {};

        // Mapear errores recibidos para mostrarlos en inputs correspondientes
        Object.entries(data).forEach(([campo, mensajes]) => {
          if (Array.isArray(mensajes)) {
            fieldErrors[campo] = mensajes[0];  // Mostrar solo el primer error
          } else {
            fieldErrors[campo] = mensajes;
          }
        });

        setFormErrors(fieldErrors);

      } else {
        // Error genérico si no hay respuesta detallada
        setError("No se pudo completar el registro. Verifica los datos ingresados o intenta más tarde.");
      }
    }
  };

  // Función auxiliar para convertir nombres de campos a los esperados por el backend
  const nameConversion = key => {
    return key === 'receive_news' ? 'recibir_novedades' : key;
  };

  

  return (
    <form onSubmit={handleSubmit} className="container login-container slide-down-fade">
      <h2 className="login-title">Crear Usuario</h2>

      {/* Campo usuario */}
      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
        required
        className="login-input"
      />
      {/* Mostrar error de usuario si existe */}
      {formErrors.username && <p className="alert-message alert-error">{formErrors.username}</p>}

      {/* Campo nombre */}
      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="Nombre"
        className="login-input"
      />
      {formErrors.first_name && <p className="alert-message alert-error">{formErrors.first_name}</p>}

      {/* Campo apellido */}
      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Apellido"
        className="login-input"
      />
      {formErrors.last_name && <p className="alert-message alert-error">{formErrors.last_name}</p>}

      {/* Campo email */}
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        required
        className="login-input"
      />
      {formErrors.email && <p className="alert-message alert-error">{formErrors.email}</p>}

      {/* Campo contraseña */}
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
        className="login-input"
      />
      {formErrors.password && <p className="alert-message alert-error">{formErrors.password}</p>}

      {/* Checkbox recibir noticias */}
      <div className="login-checkbox">
        <label>
          <input
            type="checkbox"
            name="receive_news"
            checked={form.receive_news}
            onChange={handleChange}
          />{' '}
          Deseo recibir noticias de la protectora
        </label>

        {/* Checkbox aceptar términos */}
        <div className="login-checkbox">
          <label>
            <input
              type="checkbox"
              name="accept_terms"
              checked={form.accept_terms}
              onChange={handleChange}
            />{' '}
            Acepto la <a href="/privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</a> y los <a href="/terminos" target="_blank" rel="noopener noreferrer">términos de uso</a>.
          </label>
        </div>

        {/* Error en aceptación de términos */}
        {formErrors.accept_terms && (
          <p className="alert-message alert-error">{formErrors.accept_terms}</p>
        )}
      </div>

      {/* Botón para enviar formulario */}
      <button type="submit" className="login-btn" disabled={isSubmitting}>
        {isSubmitting ? "Registrando..." : "Registrar"}
      </button>

      {/* Mensaje de éxito */}
      {successMessage && (
        <p className="alert-message alert-success">{successMessage}</p>
      )}

      {/* Mensaje de error general */}
      {error && <p className="alert-message alert-error">{error}</p>}

      {/* Enlaces para ir a login */}
      <div className="login-links">
        <p><a href="/login" className="login-link">¿Ya tienes cuenta? Inicia Sesión</a></p>
      </div>
    </form>
  );
};

export default UsuarioForm;

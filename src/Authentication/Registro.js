import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UsuarioService from '../services/usuarioService';
import './Registro.css';

const UsuarioForm = () => {
  const [form, setForm] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    receive_news: false,
    accept_terms: false
    
  });

  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validar = () => {
    const errors = {};
  
    // Nombre de usuario
    if (!form.username.trim()) {
      errors.username = 'Debes introducir un nombre de usuario.';
    } else if (form.username.length < 3) {
      errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.';
    } else if (/\s/.test(form.username)) {
      errors.username = 'El nombre de usuario no puede contener espacios.';
    }
  
    // Nombre
    if (!form.first_name.trim()) {
      errors.first_name = 'El nombre es obligatorio.';
    }
  
    // Apellido
    if (!form.last_name.trim()) {
      errors.last_name = 'El apellido es obligatorio.';
    }
  
    // Correo electrónico
    if (!form.email.trim()) {
      errors.email = 'Debes introducir un correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Introduce un correo electrónico válido (ej. usuario@ejemplo.com).';
    }
  
    // Contraseña
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
  
    // Aceptar términos
    if (!form.accept_terms) {
      errors.accept_terms = 'Debes aceptar los términos y condiciones para continuar.';
    }
  
    return errors;
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const errores = validar();
    setFormErrors(errores);

    if (Object.keys(errores).length > 0) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'accept_terms') {
        formData.append(nameConversion(key), value);
      }
    });
    

    try {
      await UsuarioService.createUsuario(formData);
      setSuccessMessage("Registro exitoso. Serás redirigido al login en unos segundos...");
  
      setTimeout(() => {
        navigate("/login");
      }, 3000); // redirige después de 3 segundos
    
    } catch (err) {
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "No se pudo completar el registro. Verifica los datos ingresados o intenta más tarde.";
      setError(backendMessage);
    }
  };

  const nameConversion = key => {
    return key === 'receive_news' ? 'recibir_novedades' : key;
  };

  return (
    <form onSubmit={handleSubmit} className="container login-container slide-down-fade">
      <h2 className="login-title">Crear Usuario</h2>

      <input
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Usuario"
        required
        className="login-input"
      />
      {formErrors.username && <p className="alert-message alert-error">{formErrors.username}</p>}

      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="Nombre"
        className="login-input"
      />
      {formErrors.first_name && <p className="alert-message alert-error">{formErrors.first_name}</p>}


      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Apellido"
        className="login-input"
      />
      {formErrors.last_name && <p className="alert-message alert-error">{formErrors.last_name}</p>}


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
        {formErrors.accept_terms && (
          <p className="alert-message alert-error">{formErrors.accept_terms}</p>
        )}
      </div>

      <button type="submit" className="login-btn">
        Registrar
      </button>

      {successMessage && (
  <p className="alert-message alert-success">{successMessage}</p>
)}
{error && <p className="alert-message alert-error">{error}</p>}


      <div className="login-links">
        <p><a href="/login" className="login-link">¿Ya tienes cuenta? Inicia Sesión</a></p>
      </div>
    </form>
  );
};

export default UsuarioForm;

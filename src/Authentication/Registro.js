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
    receive_news: false
  });

  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
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
  
    if (!form.username.trim() || form.username.length < 3) {
      errors.username = 'El usuario debe tener al menos 3 caracteres.';
    }
  
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Introduce un correo válido.';
    }
  
    if (
      !form.password ||
      form.password.length < 8 ||
      !/[A-Z]/.test(form.password) ||
      !/\d/.test(form.password)
    ) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
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
    Object.entries(form).forEach(([key, value]) =>
      formData.append(nameConversion(key), value)
    );

    try {
      await UsuarioService.createUsuario(formData);
      navigate('/perfil');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Error al crear usuario');
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
      {formErrors.username && <p className="login-error">{formErrors.username}</p>}

      <input
        type="text"
        name="first_name"
        value={form.first_name}
        onChange={handleChange}
        placeholder="Nombre"
        className="login-input"
      />

      <input
        type="text"
        name="last_name"
        value={form.last_name}
        onChange={handleChange}
        placeholder="Apellido"
        className="login-input"
      />

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Correo electrónico"
        required
        className="login-input"
      />
      {formErrors.email && <p className="login-error">{formErrors.email}</p>}

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
      </div>

      <button type="submit" className="login-btn">
        Registrar
      </button>

      {error && <p className="login-error">{error}</p>}

      <div className="login-links">
        <p><a href="/login" className="login-link">¿Ya tienes cuenta? Inicia Sesión</a></p>
      </div>
    </form>
  );
};

export default UsuarioForm;

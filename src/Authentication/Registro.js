/* UsuarioForm.jsx */
import React, { useState } from 'react';
import UsuarioService from '../services/usuarioService';
import './Registro.css';

const UsuarioForm = () => {
  const [form, setForm] = useState({ username: '', first_name: '', last_name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    try {
      await UsuarioService.createUsuario(formData);
      // Opcional: redirigir al login o mostrar mensaje
      alert('Usuario creado correctamente');
      setForm({ username: '', first_name: '', last_name: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Error al crear usuario');
    }
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
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Contraseña"
        required
        className="login-input"
      />
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
// src/ContactoComponents/Contacto.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacto.css';
import axios from 'axios';

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio.';
    if (!form.email.trim() || !form.email.includes('@')) return 'Correo electrónico inválido.';
    if (!form.asunto.trim()) return 'El asunto es obligatorio.';
    if (!form.mensaje.trim() || form.mensaje.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validarFormulario();

    if (error) {
      setTipoMensaje('error');
      setMensaje(`❌ ${error}`);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/contacto/`, form);
      setTipoMensaje('success');
      setMensaje('✅ ¡Gracias por contactarnos! Te responderemos pronto.');
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      console.error(err);
      setTipoMensaje('error');
      setMensaje('❌ Hubo un error al enviar el mensaje.');
    }

    setTimeout(() => setMensaje(''), 4000);
  };

  return (
    <section className="container py-5 contacto fade-in">
      <h1 className="text-center display-4 fw-bold mb-5">CONTÁCTANOS</h1>
      <div className="row justify-content-between align-items-start">
        {/* Parte izquierda mejorada */}
        <div className="col-md-5 mb-4">
          <h5 className="fw-semibold mb-3">¿Quieres unirte a nosotros?</h5>
          <p className="mb-1 text-muted">📧 Correo electrónico</p>
          <a href="mailto:masquefaanimalistes@gmail.com" className="text-dark fw-medium">
            masquefaanimalistes@gmail.com
          </a>

          <p className="mt-4 mb-1 text-muted">📍 Dirección</p>
          <p>Carrer Major 12, Masquefa, Barcelona</p>

          <p className="mb-1 text-muted">📞 Teléfono</p>
          <p>+34 600 123 456</p>

          <p className="mb-1 text-muted">🔗 Redes sociales</p>
          <a href="https://www.instagram.com/animalistesmasquefa" target="_blank" rel="noreferrer">Instagram</a><br />
          <a href="https://www.facebook.com/AnimalistesMasquefa" target="_blank" rel="noreferrer">Facebook</a>
        </div>

        {/* Formulario */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="asunto" className="form-label">Asunto</label>
              <input
                type="text"
                name="asunto"
                className="form-control"
                value={form.asunto}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                name="mensaje"
                rows="4"
                className="form-control"
                value={form.mensaje}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Enviar</button>

            {/* Mensaje de validación o envío */}
            {mensaje && (
              <div className={`alert-message mt-3 ${tipoMensaje === 'success' ? 'alert-success' : 'alert-error'}`}>
                {mensaje.replace('✅', '').replace('❌', '').trim()}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;

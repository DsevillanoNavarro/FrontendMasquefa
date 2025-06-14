// src/ContactoComponents/Contacto.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import './Contacto.css'; // Estilos propios del componente
import axios from 'axios'; // Cliente HTTP para hacer peticiones

const Contacto = () => {
  // Estado para almacenar los valores del formulario
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  // Estado para mostrar mensajes al usuario (error o éxito)
  const [mensaje, setMensaje] = useState('');
  // Estado para indicar si el mensaje es de éxito o error, afecta estilos
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'success' o 'error'

  // Actualiza el estado del formulario al cambiar cualquier campo
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Valida los datos del formulario y devuelve un mensaje de error o null si está bien
  const validarFormulario = () => {
    if (!form.nombre.trim()) return 'El nombre es obligatorio.';
    if (!form.email.trim() || !form.email.includes('@')) return 'Correo electrónico inválido.';
    if (!form.asunto.trim()) return 'El asunto es obligatorio.';
    if (!form.mensaje.trim() || form.mensaje.length < 10) return 'El mensaje debe tener al menos 10 caracteres.';
    return null; // No hay errores
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar

    // Validamos el formulario antes de enviar
    const error = validarFormulario();

    if (error) {
      // Si hay error, actualizamos estado para mostrar mensaje de error
      setTipoMensaje('error');
      setMensaje(`❌ ${error}`);
      return;
    }

    try {
      // Intentamos enviar el formulario vía POST a la API de contacto
      await axios.post(`${process.env.REACT_APP_API_URL}/contacto/`, form);

      // Si la petición es exitosa, mostramos mensaje de éxito
      setTipoMensaje('success');
      setMensaje('✅ ¡Gracias por contactarnos! Te responderemos pronto.');

      // Limpiamos el formulario
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      // Si hay un error en la petición, mostramos mensaje de error
      console.error(err);
      setTipoMensaje('error');
      setMensaje('❌ Hubo un error al enviar el mensaje.');
    }

    // Después de 4 segundos, borramos el mensaje automáticamente
    setTimeout(() => setMensaje(''), 4000);
  };

  return (
    <section className="container py-5 contacto fade-in">
      <h1 className="text-center display-4 fw-bold mb-5">CONTÁCTANOS</h1>
      <div className="row justify-content-between align-items-start">

        {/* Parte izquierda con información de contacto estática */}
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

        {/* Formulario de contacto */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>

            {/* Campo Nombre */}
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

            {/* Campo Email */}
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

            {/* Campo Asunto */}
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

            {/* Campo Mensaje */}
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

            {/* Botón de envío */}
            <button type="submit" className="btn btn-dark w-100">Enviar</button>

            {/* Mostrar mensaje de validación o resultado del envío */}
            {mensaje && (
              <div className={`alert-message mt-3 ${tipoMensaje === 'success' ? 'alert-success' : 'alert-error'}`}>
                {/* Eliminamos los iconos antes de mostrar el texto */}
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

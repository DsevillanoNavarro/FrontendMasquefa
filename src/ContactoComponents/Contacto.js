import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Contacto.css';

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {

    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio.");
      return;
    }
    if (!form.mensaje.trim() || form.mensaje.length < 10) {
      alert("El mensaje debe tener al menos 10 caracteres.");
      return;
    }
    
    e.preventDefault();
    console.log('Formulario enviado:', form);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setForm({ nombre: '', mensaje: '' });

    

  };

  return (
    <section className="container py-5 contacto fade-in">
      <h1 className="text-center display-4 fw-bold mb-5">CONTÁCTANOS</h1>
      <div className="row justify-content-between align-items-start">
        {/* Lado izquierdo: Información */}
        <div className="col-md-5 mb-4">
          <h5 className="fw-semibold mb-3">¿Quieres unirte a nosotros?</h5>
          <p className="mb-2 text-muted">MAIL</p>
          <a href="mailto:masquefaanimalistes@gmail.com" className="text-dark fw-medium">
            masquefaanimalistes@gmail.com
          </a>
        </div>

        {/* Lado derecho: Formulario */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                placeholder="Jane Smith"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                className="form-control"
                placeholder="Pon aquí tu mensaje"
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-dark w-100">Registrarse</button>
            {enviado && <div className="alert alert-success mt-3">¡Gracias por contactarnos!</div>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;

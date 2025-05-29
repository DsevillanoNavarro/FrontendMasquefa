import React from 'react';
import { Link } from 'react-router-dom';
import './HomeForm.css';

const FormularioNoticias = () => {
  return (
    <div className="container text-center py-5 HomeNoticiasContainer">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="gallery-title">REGÍSTRATE</h2>
          <img src="gifMasquefa.webp" alt="Gato Masquefa" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <p className="texto-poppins text-center txtRegistrarse">
            Regístrate y activa nuestras notificaciones para recibir nuestras noticias
          </p>
          <Link to="/registro" className="btn boton-oscuro px-5 py-2 fw-semibold">
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticias;

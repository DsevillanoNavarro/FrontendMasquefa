import React from 'react';
import './HomeForm.css';

const FormularioNoticias = () => {
  return (
    <div className="container text-center py-5 HomeNoticiasContainer">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="gallery-title">REGISTRATE</h2>
          <img src="gifMasquefa.webp" alt="Gato Masquefa" className="img-fluid" />
        </div>
        <div className="col-md-6">
          <p className="texto-poppins text-center txtRegistrarse">Registrate Y Activa Nuestras Notificaciones Para Recibir Nuestras Noticias</p>
          <button className="btn boton-oscuro px-5 py-2 fw-semibold">Registrarme</button>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticias;

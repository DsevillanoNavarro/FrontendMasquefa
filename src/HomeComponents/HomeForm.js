import React from 'react';                    // Importamos React para definir el componente
import { Link } from 'react-router-dom';    // Importamos Link para navegación interna sin recargar
import './HomeForm.css';                     // Importamos estilos específicos para este componente

const FormularioNoticias = () => {
  return (
    // Contenedor principal centrado, con padding vertical y clase personalizada para estilos
    <div className="container text-center py-5 HomeNoticiasContainer">
      {/* Fila para organizar contenido en dos columnas alineadas verticalmente */}
      <div className="row align-items-center">
        
        {/* Columna izquierda: Título y imagen */}
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="gallery-title">REGÍSTRATE</h2>   {/* Título destacado */}
          {/* Imagen responsiva con gif */}
          <img src="gifMasquefa.webp" alt="Gato Masquefa" className="img-fluid" />
        </div>

        {/* Columna derecha: Texto descriptivo y botón para registrarse */}
        <div className="col-md-6">
          <p className="texto-poppins text-center txtRegistrarse">
            Regístrate y activa nuestras notificaciones para recibir nuestras noticias
          </p>
          {/* Botón que redirige a la página de registro, con estilos personalizados */}
          <Link to="/registro" className="btn boton-oscuro px-5 py-2 fw-semibold">
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormularioNoticias;  // Exportamos el componente para usarlo en la aplicación

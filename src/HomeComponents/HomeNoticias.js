import React, { useEffect, useState } from "react";    // Importamos React, useEffect para ciclo de vida y useState para estado local
import { useNavigate } from "react-router-dom";        // Importamos useNavigate para navegación programática
import noticiaService from "../services/noticiaService"; // Servicio para obtener datos de noticias desde backend o API
import "./HomeNoticias.css";                            // Estilos específicos para este componente

const NoticiasRecientes = () => {
  const [noticias, setNoticias] = useState([]);       // Estado local para almacenar las noticias
  const navigate = useNavigate();                       // Hook para navegar entre rutas
  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 
  // useEffect para cargar las noticias una sola vez al montar el componente
  useEffect(() => {
    noticiaService.getNoticias().then((res) => {      // Llamada al servicio para obtener noticias
      // Tomamos las últimas 3 noticias y las invertimos para mostrar las más recientes primero
      const ultimasNoticias = res.data.slice(-3).reverse();
      setNoticias(ultimasNoticias);                    // Actualizamos el estado con las noticias procesadas
    });
  }, []);                                              // Dependencias vacías: solo se ejecuta al montar

  return (
    <div className="container HomeNoticiasContainer news-gallery py-4">
      <h2 className="gallery-title">ÚLTIMAS NOTICIAS</h2>
      <div className="row gx-4 justify-content-center">
        {/* Iteramos sobre las noticias para renderizar cada tarjeta */}
        {noticias.map((noticia) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={noticia.id}>
            <div className="card noticia-card border-0">
              {/* Contenedor para la imagen de la noticia */}
              <div className="noticia-image-container short-height">
                <img
                  src={`${cloudinaryBaseUrl}/${noticia.imagen}`}
                  alt={noticia.titulo}                      // Texto alternativo accesible
                  className="card-img-top noticia-image"
                />
                {/* Overlay con botón para navegar al detalle de la noticia */}
                <div className="overlay">
                  <button
                    className="adopt-btn"
                    onClick={() => navigate(`/noticias/${noticia.id}`)} // Navega a la página del detalle
                  >
                    Leer más
                  </button>
                </div>
              </div>
              {/* Cuerpo de la tarjeta con título y resumen */}
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start noticia-title">
                  <span
                    className="noticia-link"
                    onClick={() => navigate(`/noticias/${noticia.id}`)} // También navega al detalle si se clica el título
                    style={{ cursor: 'pointer' }}                      // Cursor cambia para indicar que es clicable
                  >
                    {/* Mostrar título truncado a 50 caracteres con "..." si es largo */}
                    {noticia.titulo.length > 50
                      ? noticia.titulo.slice(0, 50) + "..."
                      : noticia.titulo}
                  </span>
                </h6>
                {/* Resumen de la noticia truncado a 80 caracteres con "..." */}
                <p className="card-text noticia-summary">
                  {noticia.contenido.slice(0, 80)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticiasRecientes;  // Exportamos el componente para usarlo en la app

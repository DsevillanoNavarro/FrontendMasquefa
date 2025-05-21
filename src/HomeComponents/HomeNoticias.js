import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import noticiaService from "../services/noticiaService";
import "./HomeNoticias.css";

const NoticiasRecientes = () => {
  const [noticias, setNoticias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    noticiaService.getNoticias().then((res) => {
      const ultimasNoticias = res.data.slice(-3).reverse();
      setNoticias(ultimasNoticias);
    });
  }, []);

  return (
    <div className="container HomeNoticiasContainer news-gallery py-4">
      <h2 className="gallery-title">ÚLTIMAS NOTICIAS</h2>
      <div className="row gx-4 justify-content-center">
        {noticias.map((noticia) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={noticia.id}>
            <div className="card noticia-card border-0">
              <div className="noticia-image-container short-height">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="card-img-top noticia-image"
                />
                <div className="overlay">
                  <button
                    className="adopt-btn"
                    onClick={() => navigate(`/noticias/${noticia.id}`)}
                  >
                    Leer más
                  </button>
                </div>
              </div>
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start noticia-title">
                  <span
                    className="noticia-link"
                    onClick={() => navigate(`/noticias/${noticia.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {noticia.titulo.length > 50
                      ? noticia.titulo.slice(0, 50) + "..."
                      : noticia.titulo}
                  </span>
                </h6>
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

export default NoticiasRecientes;

import React, { useEffect, useState, useMemo } from "react";
import noticiaService from "../services/noticiaService";
import { useLoading } from "../contexts/LoadingContext"; // Igual que en CatGallery
import "./NoticiasListado.css";

const NoticiasRecientes = () => {
  const [noticias, setNoticias] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [ordenFecha, setOrdenFecha] = useState("desc");
  const noticiasPorPagina = 6;

  const { loading, setLoading } = useLoading(); // Mismo hook

  useEffect(() => {
    setLoading(true);
    document.body.classList.add("no-animations");

    noticiaService
      .getNoticias()
      .then((res) => {
        setNoticias(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar noticias:", err);
      })
      .finally(() => {
        setLoading(false);
        document.body.classList.remove("no-animations");
      });
  }, [setLoading]);

  const noticiasOrdenadas = useMemo(() => {
    const copia = [...noticias];
    return copia.sort((a, b) => {
      const fechaA = new Date(a.fecha_creacion);
      const fechaB = new Date(b.fecha_creacion);
      return ordenFecha === "desc" ? fechaB - fechaA : fechaA - fechaB;
    });
  }, [noticias, ordenFecha]);

  const indexInicio = (paginaActual - 1) * noticiasPorPagina;
  const noticiasPaginadas = noticiasOrdenadas.slice(indexInicio, indexInicio + noticiasPorPagina);
  const totalPaginas = Math.ceil(noticiasOrdenadas.length / noticiasPorPagina);

  return (
    <div className="container HomeNoticiasContainer news-gallery py-4 ">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap ">
        <h2 className="gallery-title mb-3 mb-md-0">ÚLTIMAS NOTICIAS</h2>
        <select
          className="custom-select"
          value={ordenFecha}
          onChange={(e) => {
            setOrdenFecha(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguas</option>
        </select>
      </div>

      <div className="row gx-4 justify-content-center fade-in">
        {noticiasPaginadas.map((noticia, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
            <div className="card noticia-card border-0">
              <div className="noticia-image-container short-height">
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="card-img-top noticia-image"
                />
                <div className="overlay">
                  <a href={`/noticias/${noticia.id}`}>
                    <button className="adopt-btn">Leer más</button>
                  </a>
                </div>
              </div>
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start noticia-title">
                  <a href={`/noticias/${noticia.id}`} className="noticia-link">
                    {noticia.titulo.length > 50
                      ? noticia.titulo.slice(0, 50) + "..."
                      : noticia.titulo}
                  </a>
                </h6>
                <p className="card-text noticia-summary">
                  {noticia.contenido.slice(0, 80)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="d-flex justify-content-center mt-4">
        <ul className="custom-pagination">
          {[...Array(totalPaginas)].map((_, i) => (
            <li
              key={i}
              className={`page-number ${paginaActual === i + 1 ? "active" : ""}`}
              onClick={() => setPaginaActual(i + 1)}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NoticiasRecientes;

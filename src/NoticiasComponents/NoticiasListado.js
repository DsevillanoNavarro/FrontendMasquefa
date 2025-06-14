import React, { useEffect, useState, useMemo } from "react";
// Servicio para obtener noticias (API o datos externos)
import noticiaService from "../services/noticiaService";
// Contexto global para manejar estado de carga
import { useLoading } from "../contexts/LoadingContext";
// Estilos específicos para este componente
import "./NoticiasListado.css";

const NoticiasRecientes = () => {
  // Estado para almacenar todas las noticias
  const [noticias, setNoticias] = useState([]);
  // Estado para la página actual de la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  // Estado para el orden de fecha (descendente o ascendente)
  const [ordenFecha, setOrdenFecha] = useState("desc");
  // Estado para el texto de búsqueda
  const [busqueda, setBusqueda] = useState("");
  // Número de noticias a mostrar por página
  const noticiasPorPagina = 6;

  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 

  // Accede al estado y función para cambiar el estado de carga global
  const { loading, setLoading } = useLoading();

  // useEffect que se ejecuta al montar el componente para cargar las noticias
  useEffect(() => {
    setLoading(true); // Activa el estado de carga global
    // Añade clase para desactivar animaciones mientras carga
    document.body.classList.add("no-animations");

    // Llama al servicio para obtener noticias
    noticiaService
      .getNoticias()
      .then((res) => {
        // Guarda las noticias recibidas en el estado
        setNoticias(res.data);
      })
      .catch((err) => {
        // Muestra error en consola si falla la petición
        console.error("Error al cargar noticias:", err);
      })
      .finally(() => {
        // Termina la carga y quita clase para animaciones
        setLoading(false);
        document.body.classList.remove("no-animations");
      });
  }, [setLoading]); // Solo se ejecuta al montar

  // Filtra las noticias según texto de búsqueda en título o contenido, usando useMemo para optimizar
  const noticiasFiltradas = useMemo(() => {
    return noticias.filter((n) =>
      n.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.contenido.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [noticias, busqueda]);

  // Ordena las noticias filtradas por fecha, ascendente o descendente según estado ordenFecha
  const noticiasOrdenadas = useMemo(() => {
    const copia = [...noticiasFiltradas]; // Copia para no mutar el estado

    return copia.sort((a, b) => {
      // Convierte las fechas a milisegundos para comparar
      const fechaA = new Date(a.fecha_publicacion).getTime() || 0;
      const fechaB = new Date(b.fecha_publicacion).getTime() || 0;

      // Ordena según ordenFecha
      if (ordenFecha === "desc") {
        return fechaB - fechaA; // De más reciente a más antigua
      } else {
        return fechaA - fechaB; // De más antigua a más reciente
      }
    });
  }, [noticiasFiltradas, ordenFecha]);

  // Calcula el índice inicial de noticias para la página actual
  const indexInicio = (paginaActual - 1) * noticiasPorPagina;
  // Corta el array ordenado para obtener solo las noticias de la página actual
  const noticiasPaginadas = noticiasOrdenadas.slice(indexInicio, indexInicio + noticiasPorPagina);
  // Calcula el total de páginas para la paginación
  const totalPaginas = Math.ceil(noticiasOrdenadas.length / noticiasPorPagina);

  return (
    <div className="container HomeNoticiasContainer news-gallery py-4">
      {/* Encabezado y selector de orden */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="gallery-title mb-3 mb-md-0">ÚLTIMAS NOTICIAS</h2>
        <select
          className="custom-select"
          value={ordenFecha}
          onChange={(e) => {
            setOrdenFecha(e.target.value);
            setPaginaActual(1); // Reinicia a la primera página al cambiar orden
          }}
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguas</option>
        </select>
      </div>

      {/* Campo para buscar noticias */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título o contenido..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Reinicia a la primera página al cambiar búsqueda
          }}
        />
      </div>

      {/* Listado de noticias paginadas */}
      <div className="row gx-4 justify-content-center fade-in">
        {noticiasPaginadas.map((noticia, index) => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
            <div className="card noticia-card border-0">
              <div className="noticia-image-container short-height">
                <img
                  src={`${cloudinaryBaseUrl}/${noticia.imagen}`}
                  alt={noticia.titulo}
                  className="card-img-top noticia-image"
                />
                {/* Overlay con botón para leer más */}
                <div className="overlay">
                  <a href={`/noticias/${noticia.id}`}>
                    <button className="adopt-btn">Leer más</button>
                  </a>
                </div>
              </div>
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start noticia-title">
                  <a href={`/noticias/${noticia.id}`} className="noticia-link">
                    {/* Título recortado si es muy largo */}
                    {noticia.titulo.length > 50
                      ? noticia.titulo.slice(0, 50) + "..."
                      : noticia.titulo}
                  </a>
                </h6>
                {/* Resumen del contenido recortado */}
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
              onClick={() => setPaginaActual(i + 1)} // Cambia página al hacer clic
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

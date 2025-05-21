import React, { useEffect, useState } from "react";
import animalService from "../services/animalService";
import { useLoading } from "../contexts/LoadingContext"; // Importa el contexto
import "bootstrap/dist/css/bootstrap.min.css";
import "./AnimalesListado.css";
import { useNavigate } from "react-router-dom";

const calcularEdad = (fechaNacimiento) => {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  return edad;
};

const CatGallery = () => {
  const [gatos, setGatos] = useState([]);
  const [filtroEdad, setFiltroEdad] = useState("Todos");
  const [paginaActual, setPaginaActual] = useState(1);
  const navigate = useNavigate();
  const gatosPorPagina = 12;

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    document.body.classList.add("no-animations");

    animalService
      .getAnimales()
      .then((response) => {
        const ordenados = response.data.sort((a, b) => b.id - a.id);
        setGatos(ordenados);
      })
      .catch((error) => {
        console.error("Error al cargar animales:", error);
      })
      .finally(() => {
        setLoading(false);
        document.body.classList.remove("no-animations");
      });
  }, [setLoading]);

  const gatosFiltrados = gatos
    .filter((gato) => {
      const edad = calcularEdad(gato.fecha_nacimiento);
      if (filtroEdad === "Todos") return true;
      if (filtroEdad === "Cachorro") return edad < 1;
      if (filtroEdad === "Adulto") return edad >= 1 && edad < 8;
      if (filtroEdad === "Senior") return edad >= 8;
      return true;
    })
    .sort((a, b) => {
      const edadA = calcularEdad(a.fecha_nacimiento);
      const edadB = calcularEdad(b.fecha_nacimiento);
      return edadA - edadB;
    });

  const indexInicio = (paginaActual - 1) * gatosPorPagina;
  const gatosPaginados = gatosFiltrados.slice(indexInicio, indexInicio + gatosPorPagina);
  const totalPaginas = Math.ceil(gatosFiltrados.length / gatosPorPagina);

  return (
    <div className="container HomeCatsContainer cat-gallery py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="gallery-title mb-3 mb-md-0">ÚLTIMOS GATOS RESCATADOS</h2>
        <div className="custom-select-wrapper">
          <select
            className="custom-select"
            value={filtroEdad}
            onChange={(e) => {
              setFiltroEdad(e.target.value);
              setPaginaActual(1);
            }}
          >
            <option value="Todos">Todas las edades</option>
            <option value="Cachorro">Cachorros (&lt; 1 año)</option>
            <option value="Adulto">Adultos (1-7 años)</option>
            <option value="Senior">Mayores (8+ años)</option>
          </select>
        </div>
      </div>

      <div className="row gx-4 justify-content-center fade-in">
      {gatosPaginados.map((gato) => (
        <div className="col-6 col-md-2 mb-4" key={gato.id}>
          <div className="card cat-card border-0">
            <div className="cat-image-container">
              <img
                src={gato.imagen}
                alt={gato.nombre}
                className="card-img-top cat-image"
              />
              <div className="overlay">
                <button
                  className="adopt-btn"
                  onClick={() => navigate(`/animales/${gato.id}`)}
                >
                  Adóptalo
                </button>
              </div>
            </div>
            <div className="card-body px-0 pt-2">
              <h6 className="card-title text-start cat-name">{gato.nombre}</h6>
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

export default CatGallery;

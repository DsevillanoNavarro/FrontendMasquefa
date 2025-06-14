import React, { useEffect, useState } from "react";
import animalService from "../services/animalService"; // Servicio para obtener datos de animales desde la API
import { useLoading } from "../contexts/LoadingContext"; // Contexto para controlar estado global de carga
import "bootstrap/dist/css/bootstrap.min.css"; // Estilos Bootstrap
import "./AnimalesListado.css"; // Estilos personalizados para este componente
import { useNavigate } from "react-router-dom"; // Hook para navegación programática

// Función para calcular la edad aproximada en años a partir de la fecha de nacimiento
const calcularEdad = (fechaNacimiento) => {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  return edad;
};

const CatGallery = () => {
  // Estado para almacenar la lista completa de gatos obtenidos de la API
  const [gatos, setGatos] = useState([]);
  // Estado para controlar el filtro de edad seleccionado (Todos, Cachorro, Adulto, Senior)
  const [filtroEdad, setFiltroEdad] = useState("Todos");
  // Estado para controlar la página actual en la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  // Hook para redirigir a otra ruta cuando el usuario haga clic en un gato
  const navigate = useNavigate();
  // Número de gatos que se muestran por página
  const gatosPorPagina = 12;

  // Desestructuramos el contexto de carga para activar/desactivar el spinner global
  const { loading, setLoading } = useLoading();

  // useEffect que se ejecuta una sola vez al montar el componente para obtener los datos
  useEffect(() => {
    setLoading(true); // Activar indicador global de carga
    document.body.classList.add("no-animations"); // Evitar animaciones mientras carga

    // Llamada al servicio para obtener todos los animales
    animalService
      .getAnimales()
      .then((response) => {
        // Ordenar los gatos por id descendente para mostrar los más recientes primero
        const ordenados = response.data.sort((a, b) => b.id - a.id);
        setGatos(ordenados); // Guardar en el estado
      })
      .catch((error) => {
        // En caso de error, mostrarlo en consola (podría mejorarse con mensaje para usuario)
        console.error("Error al cargar animales:", error);
      })
      .finally(() => {
        setLoading(false); // Desactivar indicador de carga
        document.body.classList.remove("no-animations"); // Permitir animaciones nuevamente
      });
  }, [setLoading]);

  // Filtrar la lista de gatos según el filtro de edad seleccionado
  const gatosFiltrados = gatos
    .filter((gato) => {
      const edad = calcularEdad(gato.fecha_nacimiento);
      if (filtroEdad === "Todos") return true; // Mostrar todos
      if (filtroEdad === "Cachorro") return edad < 1; // Menores de 1 año
      if (filtroEdad === "Adulto") return edad >= 1 && edad < 8; // Entre 1 y 7 años
      if (filtroEdad === "Senior") return edad >= 8; // 8 años o más
      return true;
    })
    // Ordenar los filtrados por edad descendente (mayores primero)
    .sort((a, b) => {
      const edadA = calcularEdad(a.fecha_nacimiento);
      const edadB = calcularEdad(b.fecha_nacimiento);
      return edadB - edadA; 
    });

  // Calcular el índice inicial para paginar la lista según la página actual
  const indexInicio = (paginaActual - 1) * gatosPorPagina;
  // Extraer solo los gatos que se mostrarán en la página actual
  const gatosPaginados = gatosFiltrados.slice(indexInicio, indexInicio + gatosPorPagina);
  // Calcular el total de páginas disponibles según cantidad y gatos por página
  const totalPaginas = Math.ceil(gatosFiltrados.length / gatosPorPagina);

  return (
    <div className="container HomeCatsContainer cat-gallery py-4">
      {/* Contenedor superior con título y filtro */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <h2 className="gallery-title mb-3 mb-md-0">ÚLTIMOS GATOS RESCATADOS</h2>
        {/* Selector para filtrar por edad */}
        <div className="custom-select-wrapper">
          <select
            className="custom-select"
            value={filtroEdad}
            onChange={(e) => {
              setFiltroEdad(e.target.value); // Actualizar filtro
              setPaginaActual(1); // Volver a página 1 al cambiar filtro
            }}
          >
            <option value="Todos">Todas las edades</option>
            <option value="Cachorro">Cachorros (&lt; 1 año)</option>
            <option value="Adulto">Adultos (1-7 años)</option>
            <option value="Senior">Mayores (8+ años)</option>
          </select>
        </div>
      </div>

      {/* Contenedor de tarjetas con los gatos paginados */}
      <div className="row gx-4 justify-content-center fade-in">
        {gatosPaginados.map((gato) => (
          <div className="col-6 col-md-2 mb-4" key={gato.id}>
            <div className="card cat-card border-0">
              <div className="cat-image-container">
                {/* Imagen del gato */}
                <img
                  src={gato.imagen}
                  alt={gato.nombre}
                  className="card-img-top cat-image"
                />
                {/* Overlay con botón para ir a la página de adopción */}
                <div className="overlay">
                  <button
                    className="adopt-btn"
                    onClick={() => navigate(`/animales/${gato.id}`)}
                  >
                    Adóptalo
                  </button>
                </div>
              </div>
              {/* Nombre del gato debajo de la imagen */}
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start cat-name">{gato.nombre}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación: mostrar números de página para navegar */}
      <div className="d-flex justify-content-center mt-4">
        <ul className="custom-pagination">
          {[...Array(totalPaginas)].map((_, i) => (
            <li
              key={i}
              className={`page-number ${paginaActual === i + 1 ? "active" : ""}`}
              onClick={() => setPaginaActual(i + 1)} // Cambiar página al hacer clic
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

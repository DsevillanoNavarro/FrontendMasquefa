import React, { useEffect, useState } from "react";        // Importamos React y hooks useEffect y useState
import { useNavigate } from "react-router-dom";            // Importamos useNavigate para navegación programática
import animalService from "../services/animalService";     // Servicio para obtener datos de animales
import { useLoading } from "../contexts/LoadingContext";   // Contexto para manejar estado de carga global
import "bootstrap/dist/css/bootstrap.min.css";             // Estilos Bootstrap
import "./HomeCats.css";                                    // Estilos propios para este componente

const CatGallery = () => {
  // Estado local para almacenar la lista de gatos
  const [gatos, setGatos] = useState([]);
  
  // Obtenemos el estado loading y la función para cambiarlo desde el contexto global
  const { loading, setLoading } = useLoading();
  
  // Inicializamos navigate para poder navegar programáticamente a otras rutas
  const navigate = useNavigate();

  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 

  // useEffect para cargar los datos cuando el componente se monta
  useEffect(() => {
    setLoading(true);  // Indicamos que estamos cargando datos

    // Llamamos al servicio para obtener la lista de animales
    animalService.getAnimales().then((response) => {
      // Ordenamos los animales por id descendente (de más nuevo a más viejo)
      const ordenados = response.data.sort((a, b) => b.id - a.id);
      
      // Tomamos los primeros 4 animales más recientes
      const ultimos4 = ordenados.slice(0, 4);
      
      // Actualizamos el estado con estos 4 gatos
      setGatos(ultimos4);
      
      setLoading(false); // Indicamos que la carga ha finalizado
    });
  }, [setLoading]); // Se ejecuta solo una vez al montar el componente (setLoading no cambia)

  return (
    // Contenedor principal con clases de Bootstrap y CSS personalizado
    <div className="container HomeCatsContainer cat-gallery py-4">
      {/* Título de la galería */}
      <h2 className="gallery-title">ÚLTIMOS GATOS RESCATADOS</h2>
      
      {/* Fila Bootstrap para las tarjetas de gatos */}
      <div className="row gx-4 justify-content-center">
        {/* Recorremos la lista de gatos y mostramos cada uno */}
        {gatos.map((gato) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={gato.id}>
            {/* Tarjeta individual sin borde */}
            <div className="card cat-card border-0">
              {/* Contenedor de la imagen del gato */}
              <div className="cat-image-container">
                {/* Imagen del gato con alt para accesibilidad */}
                <img
                  src={`${cloudinaryBaseUrl}/${gato.imagen}`}
                  alt={gato.nombre}
                  className="card-img-top cat-image"
                />
                {/* Capa overlay con botón para adoptar */}
                <div className="overlay">
                  <button
                    className="adopt-btn"
                    // Al hacer click, navegamos a la página de detalle del gato según su id
                    onClick={() => navigate(`/animales/${gato.id}`)}
                  >
                    Adóptalo
                  </button>
                </div>
              </div>
              {/* Cuerpo de la tarjeta con el nombre del gato */}
              <div className="card-body px-0 pt-2">
                <h6 className="card-title text-start cat-name">{gato.nombre}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatGallery;  // Exportamos el componente para usarlo en la app

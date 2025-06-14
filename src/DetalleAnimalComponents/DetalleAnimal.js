import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import animalService from "../services/animalService";
import { useLoading } from "../contexts/LoadingContext";   // Importa el contexto para mostrar el loading global
import "./DetalleAnimal.css";

// Función para calcular la edad del animal a partir de su fecha de nacimiento
const calcularEdad = (fechaNacimiento) => {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  return hoy.getFullYear() - nacimiento.getFullYear();
};

const AnimalDetail = () => {
  // Obtiene el parámetro 'id' de la URL para saber qué animal cargar
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Obtiene el estado loading y función para actualizarlo desde el contexto global
  const { loading, setLoading } = useLoading();
  
  // Estado local para guardar los datos del animal
  const [animal, setAnimal] = useState(null);
  
  useEffect(() => {
    setLoading(true); // Inicia la animación de carga global
    animalService
      .getAnimal(id) // Llama al servicio para obtener los datos del animal con el id dado
      .then((res) => setAnimal(res.data)) // Guarda los datos en el estado local
      .catch(console.error) // Muestra error en consola si falla la petición
      .finally(() => {
        setLoading(false); // Detiene la animación de carga
      });
  }, [id, setLoading]); // Se ejecuta cuando cambia el id o la función setLoading
  
  // Si loading está activo, no muestra nada porque el spinner global ya aparece
  if (loading) return null;
  
  // Si no se encontró el animal, redirige a página 404
  if (!animal) {
    navigate("/404", { replace: true });
    return null;
  }
  
  // Función que redirige a la página de adopción, pasando los datos del animal por estado
  const handleAdoptar = () => {
    navigate(`/adoptar/${animal.id}`, { state: { animal } });
  };

  return (
    <div className="container AnimalDetail mt-5 pt-5 slide-down-fade">
      <div className="row align-items-start">
        {/* Columna con la imagen del animal */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="img-fluid"
          />
        </div>
        
        {/* Columna con información y botón */}
        <div className="col-12 col-md-6">
          <h1 className="detail-title">{animal.nombre}</h1>
          <p className="detail-desc">
            <strong>Edad:</strong> {calcularEdad(animal.fecha_nacimiento)} años
          </p>
          <p className="detail-desc">
            <strong>Fecha de nacimiento:</strong>{" "}
            {new Date(animal.fecha_nacimiento).toLocaleDateString('es-ES')}
          </p>
          <p className="detail-desc">
            <strong>Situación:</strong> {animal.situacion}
          </p>
          {/* Botón para iniciar proceso de adopción */}
          <button className="custom-btn" onClick={handleAdoptar}>
            Adóptalo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;

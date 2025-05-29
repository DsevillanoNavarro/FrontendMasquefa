import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import animalService from "../services/animalService";
import { useLoading } from "../contexts/LoadingContext";   // <-- importamos
import "./DetalleAnimal.css";

const calcularEdad = (fechaNacimiento) => {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  return hoy.getFullYear() - nacimiento.getFullYear();
};

const AnimalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();          // <-- usamos el contexto
  const [animal, setAnimal] = useState(null);
  

  useEffect(() => {
    // arranca loading
    setLoading(true);
    animalService
      .getAnimal(id)
      .then((res) => setAnimal(res.data))
      .catch(console.error)
      .finally(() => {
        // paramos loading
        setLoading(false);
      });
  }, [id, setLoading]);

  // Si loading está activo, devolvemos null porque el spinner global
  // lo estará mostrando ya. También podrías devolver un texto o 
  // componente propio si lo prefieres:
  if (loading) return null;

  // En caso de que no haya animal:
  if (!animal) {
    navigate("/404", { replace: true });
    return null;
  }

  const handleAdoptar = () => {
    // Redirecciona al formulario de adopción, pasando el animal por estado
    navigate(`/adoptar/${animal.id}`, { state: { animal } });
  };

  return (
    <div className="container AnimalDetail mt-5 pt-5 slide-down-fade">
      <div className="row align-items-start">
        {/* Imagen */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={animal.imagen}
            alt={animal.nombre}
            className="img-fluid"
          />
        </div>
        {/* Texto y botón */}
        <div className="col-12 col-md-6">
          <h1 className="detail-title">{animal.nombre}</h1>
          <p className="detail-desc">
            <strong>Edad:</strong> {calcularEdad(animal.fecha_nacimiento)} años
          </p>
          <p className="detail-desc">
            <strong>Fecha de nacimiento:</strong>{" "}
            {new Date(animal.fecha_nacimiento).toLocaleDateString()}
          </p>
          <p className="detail-desc">
            <strong>Situación:</strong> {animal.situacion}
          </p>
          <button className="custom-btn" onClick={handleAdoptar}>
            Adóptalo
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetail;

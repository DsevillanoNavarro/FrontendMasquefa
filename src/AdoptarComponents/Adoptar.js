import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import animalService from "../services/animalService";
import adopcionService from "../services/adopcionService";
import { useCurrentUser } from "../services/profileService";
import "./Adoptar.css";

/**
 * Componente de formulario de adopción para un animal específico.
 * Recupera datos del animal desde location.state o la API
 * y del usuario autenticado con useCurrentUser().
 */
const Adoptar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialAnimal = location.state?.animal;
  const [animal, setAnimal] = useState(initialAnimal || null);
  const [pdfFile, setPdfFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Cargar usuario autenticado
  const { user, loading: userLoading, error: userError } = useCurrentUser();

  // Si no vino el animal por state, lo cargamos de la API
  useEffect(() => {
    if (!animal) {
      animalService
        .getAnimal(id)
        .then((res) => setAnimal(res.data))
        .catch(() => navigate("/404", { replace: true }));
    }
  }, [animal, id, navigate]);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      setError("Selecciona un PDF con tu solicitud.");
      return;
    }
    if (!user) {
      setError("Debes iniciar sesión para poder adoptar.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await adopcionService.crearAdopcion({
        animal: animal.id,
        usuario: user.id,
        contenidoFile: pdfFile,
      });
      // Redirigir a página de confirmación de adopción enviada
      navigate("/adopcionEnviada", { state: { animal } });
    } catch (err) {
      console.error(err);
      setError("Error al enviar solicitud.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!animal || userLoading) return null;
  if (userError) return <p>Error cargando usuario.</p>;

  return (
    <div className="container AdoptForm mt-5 pt-5">
      <h2>Adoptar a {animal.nombre}</h2>
      <img src={animal.imagen} alt={animal.nombre} className="img-fluid mb-3" />
      <p>
        <strong>Edad:</strong> {new Date().getFullYear() - new Date(animal.fecha_nacimiento).getFullYear()} años
      </p>
      <p>
        <strong>Fecha de nacimiento:</strong>{" "}
        {new Date(animal.fecha_nacimiento).toLocaleDateString()}
      </p>
      <p>
        <strong>Situación:</strong> {animal.situacion}
      </p>
      <hr />
      <p>Por favor, sube tu solicitud en PDF:</p>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={submitting}
      />
      {error && <p className="text-danger mt-2">{error}</p>}
      <button
        className="custom-btn mt-3"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Enviando..." : "Enviar solicitud de adopción"}
      </button>
    </div>
  );
};

export default Adoptar;
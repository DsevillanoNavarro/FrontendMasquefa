import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import animalService from "../services/animalService";
import adopcionService from "../services/adopcionService";
import { useCurrentUser } from "../services/profileService";
import "./Adoptar.css";

const Adoptar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialAnimal = location.state?.animal;
  const [animal, setAnimal] = useState(initialAnimal || null);
  const [pdfFile, setPdfFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { user, loading: userLoading, error: userError } = useCurrentUser();

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
      setError("Debes subir el documento en PDF.");
      return;
    }
    if (pdfFile.type !== "application/pdf") {
      setError("El archivo debe ser un PDF válido.");
      return;
    }
    if (pdfFile.size > 2 * 1024 * 1024) {
      setError("El archivo PDF no debe superar los 2MB.");
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
      navigate("/adopcionEnviada", { state: { animal } });
    } catch (err) {
      console.error(err);
      const backendMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Error al enviar solicitud.";
      setError(backendMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (!animal || userLoading) return null;
  if (userError) return <p>Error cargando usuario.</p>;

  return (
    <div className="adoptar-wrapper">
      <div className="adoptar-grid">
        <div className="adoptar-left">
          <img src={animal.imagen} alt={animal.nombre} className="adoptar-img" />
          <div className="adoptar-info">
            <h2>{animal.nombre}</h2>
            <p><strong>Edad:</strong> {new Date().getFullYear() - new Date(animal.fecha_nacimiento).getFullYear()} años</p>
            <p><strong>Nacimiento:</strong> {new Date(animal.fecha_nacimiento).toLocaleDateString()}</p>
            <p><strong>Situación:</strong> {animal.situacion}</p>
          </div>
        </div>

        <div className="adoptar-right">
          <h3>Solicita la adopción</h3>
          <div className="info-adopcion mb-4">
            <h4>¿Estás pensando en adoptar?</h4>
            <p>
              Adoptar no solo es dar un hogar, es ofrecer una nueva vida. Nuestros animales han pasado por mucho,
              y buscamos familias responsables, comprometidas y amorosas que les den el cuidado que merecen.
            </p>

            <h5 className="mt-3">Requisitos para adoptar:</h5>
            <ul className="adopcion-requisitos">
              <li>Ser mayor de edad (+18 años).</li>
              <li>Completar y enviar el formulario de adopción en formato PDF.</li>
              <li>Tener disponibilidad para una entrevista (virtual o presencial).</li>
              <li>Contar con un entorno adecuado y seguro para el animal.</li>
              <li>Compromiso a largo plazo: una adopción es para toda la vida.</li>
            </ul>

            <p className="adopcion-footer mt-3">
              Si cumples con estos requisitos, estarás listo para dar el siguiente paso. ¡Gracias por considerar la adopción!
            </p>
          </div>
          <a href="/formulario_adopcion.pdf" download className="download-link">
            📄 Descargar formulario PDF
          </a>

          <div className="file-upload mt-3">
              <label htmlFor="formularioPdf" className="form-label">Subir formulario completado:</label>

              <label htmlFor="formularioPdf" className="custom-file-label">
                📎 Seleccionar archivo PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={submitting}
                className="hidden-input"
                id="formularioPdf"
              />

              {pdfFile ? (
                <p className="archivo-nombre">Archivo seleccionado: {pdfFile.name}</p>
              ) : (
                <p className="archivo-nombre muted">Ningún archivo seleccionado</p>
              )}
            </div>

          {error && <p className="text-danger mt-2">{error}</p>}

          <button
            className="custom-btn mt-3"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Enviando..." : "Enviar solicitud"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adoptar;

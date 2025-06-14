import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import animalService from "../services/animalService"; // Servicio para obtener datos de animales
import adopcionService from "../services/adopcionService"; // Servicio para enviar solicitudes de adopción
import { useCurrentUser } from "../services/profileService"; // Hook para obtener datos del usuario actual
import "./Adoptar.css"; // Estilos específicos para este componente

const Adoptar = () => {
  // Obtener el ID del animal de la URL mediante useParams
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegación programática
  const location = useLocation(); // Para acceder al estado pasado desde la navegación
  
  // Inicializar el estado del animal con el valor pasado por location.state o null
  const initialAnimal = location.state?.animal;
  const [animal, setAnimal] = useState(initialAnimal || null);

  // Estado para almacenar el archivo PDF subido
  const [pdfFile, setPdfFile] = useState(null);
  // Estado para controlar el envío del formulario
  const [submitting, setSubmitting] = useState(false);
  // Estado para mostrar errores al usuario
  const [error, setError] = useState(null);
  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 
  // Hook personalizado para obtener usuario actual y su estado de carga o error
  const { user, loading: userLoading, error: userError } = useCurrentUser();

  // useEffect para cargar los datos del animal si no están disponibles al inicio
  useEffect(() => {
    if (!animal) {
      animalService
        .getAnimal(id) // Solicita los datos del animal por ID
        .then((res) => setAnimal(res.data)) // Guarda los datos en el estado
        .catch(() => navigate("/404", { replace: true })); // Si falla, redirige a página 404
    }
  }, [animal, id, navigate]);

  // Maneja el cambio de archivo en el input file
  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]); // Guarda el archivo seleccionado en el estado
  };

  // Función que se ejecuta al enviar la solicitud de adopción
  const handleSubmit = async () => {
    // Validaciones antes de enviar
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
  
    setSubmitting(true); // Marca que se está enviando el formulario
    setError(null); // Limpia errores previos
  
    try {
      // Envía la solicitud de adopción al backend
      await adopcionService.crearAdopcion({
        animal: animal.id,
        usuario: user.id,
        contenidoFile: pdfFile,
      });
      // Navega a página de confirmación tras enviar la solicitud
      navigate("/adopcionEnviada", { state: { animal } });
    } catch (err) {
      // Extrae mensaje de error desde la respuesta del backend o usa mensaje por defecto
      const backendMessage =
        err.response?.data?.message ||
        err.response?.data?.detail ||
        err.response?.data?.error ||
        "Ya has enviado una solicitud para este animal.";
    
      setError(backendMessage); // Muestra el error al usuario
    } finally {
      setSubmitting(false); // Reactiva el botón para evitar bloqueo permanente
    }
  };
  
  // Si no hay datos de animal o usuario, no renderiza nada (podría añadirse spinner)
  if (!animal || userLoading) return null;

  // Si hubo error cargando usuario, muestra mensaje
  if (userError) return <p>Error cargando usuario.</p>;

  return (
    <div className="adoptar-wrapper">
      <div className="adoptar-grid">
        {/* Parte izquierda con información e imagen del animal */}
        <div className="adoptar-left">
          <img src={`${cloudinaryBaseUrl}/${animal.imagen}`} alt={animal.nombre} className="adoptar-img" />
          <div className="adoptar-info">
            <h2>{animal.nombre}</h2>
            <p><strong>Edad:</strong> {new Date().getFullYear() - new Date(animal.fecha_nacimiento).getFullYear()} años</p>
            <p><strong>Nacimiento:</strong> {new Date(animal.fecha_nacimiento).toLocaleDateString('es-ES')}</p>
            <p><strong>Situación:</strong> {animal.situacion}</p>
          </div>
        </div>

        {/* Parte derecha con el formulario para enviar solicitud de adopción */}
        <div className="adoptar-right">
          <h3>Solicita la adopción</h3>

          {/* Información y requisitos para adoptar */}
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

          {/* Enlace para descargar el formulario en PDF */}
          <a href="/formulario_adopcion.pdf" download className="download-link">
            📄 Descargar formulario PDF
          </a>

          {/* Input para subir el formulario completado */}
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

            {/* Mostrar nombre del archivo seleccionado o mensaje por defecto */}
            {pdfFile ? (
              <p className="archivo-nombre">Archivo seleccionado: {pdfFile.name}</p>
            ) : (
              <p className="archivo-nombre muted">Ningún archivo seleccionado</p>
            )}
          </div>

          {/* Mostrar mensaje de error si lo hay */}
          {error && <p className="alert-message alert-error">{error}</p>}

          {/* Botón para enviar solicitud, deshabilitado mientras se envía */}
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

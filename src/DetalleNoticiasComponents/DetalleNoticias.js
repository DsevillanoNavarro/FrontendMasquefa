import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";    // Contexto para controlar el spinner global
import { useAuth } from "../contexts/AuthContext";          // Contexto para autenticación y token
import noticiaService from "../services/noticiaService";    // Servicio para obtener noticias
import comentarioService from "../services/comentarioService"; // Servicio para manejar comentarios
import "./DetalleNoticias.css";

const DetalleNoticias = () => {
  // Obtenemos el ID de la noticia desde la URL
  const { id } = useParams();
  // Función para activar/desactivar loading global
  const { setLoading } = useLoading();
  // Datos de autenticación del usuario (estado y token)
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 
  // Estados locales para la noticia, comentarios, paginación, formularios y mensajes
  const [noticia, setNoticia] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentariosLoading, setComentariosLoading] = useState(false);
  const [comentarioError, setComentarioError] = useState(null);
  const [comentarioSuccess, setComentarioSuccess] = useState(null);
  const [responderA, setResponderA] = useState(null); // ID del comentario al que se está respondiendo
  const [respuestaTexto, setRespuestaTexto] = useState("");
  const [comentarioBtnDisabled, setComentarioBtnDisabled] = useState(false);
  // Efecto para cargar la noticia al cambiar el id
  useEffect(() => {
    setLoading(true); // activamos loading global
    noticiaService
      .getNoticia(id) // llamada al API para obtener noticia
      .then((res) => setNoticia(res.data)) // guardamos noticia en estado
      .catch(console.error) // mostramos error en consola si falla
      .finally(() => setLoading(false)); // desactivamos loading
  }, [id, setLoading]);

  // Efecto para cargar comentarios de la noticia
  useEffect(() => {
    if (!id || !isAuthenticated) return; // <-- añade la condición aquí
    setComentariosLoading(true);
    comentarioService
      .getComentariosPorNoticia(id)
      .then((comments) => {
        setComentarios(Array.isArray(comments) ? comments : []);
      })
      .catch((err) => {
        console.error(err);
        setComentarioError("Error al cargar comentarios");
      })
      .finally(() => setComentariosLoading(false));
  }, [id, isAuthenticated]);

  // Redirige a login si el usuario no está autenticado
  const handleLoginRedirect = () => {
    navigate("/login");
  };

  // Función para publicar un comentario nuevo
  const handlePublicarComentario = async () => {
    if (!nuevoComentario.trim() || nuevoComentario.length < 5) {
      setComentarioError("El comentario debe tener al menos 5 caracteres.");
      return;
    }

    setComentarioError(null);
    setComentarioSuccess(null);
    setComentarioBtnDisabled(true); // Deshabilita el botón inmediatamente

    try {
      const comentarioData = {
        noticia: id,
        contenido: nuevoComentario.trim(),
      };

      const newComment = await comentarioService.crearComentario(comentarioData, token);
      setComentarios((prev) => [newComment, ...prev]);
      setNuevoComentario("");
      setComentarioSuccess("Comentario publicado correctamente.");
    } catch (error) {
      console.error("Error al publicar comentario:", error.response?.data || error.message);
      const mensaje =
        error.response?.status === 429
          ? "Debes esperar 1 minuto entre comentarios."
          : error.response?.data?.non_field_errors?.join(", ") ||
            error.response?.data?.detail ||
            JSON.stringify(error.response?.data) ||
            "Error al publicar comentario";
      setComentarioError(mensaje);
    } finally {
      // Habilita el botón después de 1.5 segundos
      setTimeout(() => {
        setComentarioBtnDisabled(false);
      }, 1500);
    }
  };


  // Función para publicar una respuesta a un comentario existente
  const handleResponder = async (parentId) => {
    if (!respuestaTexto.trim() || respuestaTexto.length < 5) {
      setComentarioError("La respuesta debe tener al menos 5 caracteres.");
      return;
    }

    setComentarioError(null);
    setComentarioSuccess(null);

    try {
      const comentarioData = {
        noticia: id,
        contenido: respuestaTexto.trim(),
        parent: parentId, // indicamos que es una respuesta al comentario padre
      };

      // Creamos la respuesta mediante API
      const newReply = await comentarioService.crearComentario(comentarioData, token);
      // Añadimos la respuesta a la lista de comentarios
      setComentarios((prev) => [...prev, newReply]);
      setRespuestaTexto("");
      setResponderA(null);
      setComentarioSuccess("Respuesta publicada correctamente.");
    } catch (err) {
      console.error("Error al responder comentario:", err.response?.data || err.message);
      const mensaje =
        err.response?.status === 429
          ? "Debes esperar 1 minuto entre comentarios."
          : err.response?.data?.non_field_errors?.join(", ") ||
            err.response?.data?.detail ||
            JSON.stringify(err.response?.data) ||
            "Error al responder comentario";
      setComentarioError(mensaje);
    }
  };

  // Renderizado recursivo para mostrar comentarios y respuestas anidadas
  const renderComentarios = (lista, parentId = null, nivel = 0) =>
    lista
      .filter((c) => c.parent === parentId) // solo los que tengan el parentId indicado
      .map((comentario) => (
        <div
          key={comentario.id}
          className="mb-3 pb-2"
          style={{ marginLeft: Math.min(nivel, 3) * 20 }} // sangría según nivel de anidación (máximo 3)
        >
          <div className="border-start ps-3 d-flex align-items-start gap-2">
            {comentario.usuario_foto ? (
              <img
                src={`${comentario.usuario_foto}`}
                alt={comentario.usuario_username}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                }}
              />
            )}
            <div className="comentario-contenido-box">
              <strong>{comentario.usuario_username}</strong>{" "}
              <small className="text-muted">
                - {new Date(comentario.fecha_hora).toLocaleString()}
              </small>
              <p className="comentario-texto">{comentario.contenido}</p>

              {/* Botón para responder si el usuario está autenticado */}
              {isAuthenticated && (
                <button
                  className="btn btn-sm btn-outline-secondary mb-2"
                  onClick={() =>
                    setResponderA(responderA === comentario.id ? null : comentario.id)
                  }
                >
                  {responderA === comentario.id ? "Cancelar" : "Responder"}
                </button>
              )}

              {/* Formulario para responder si está activo */}
              {responderA === comentario.id && (
                <div className="mb-3">
                  <textarea
                    className="form-control mb-2"
                    placeholder="Escribe tu respuesta..."
                    rows="2"
                    value={respuestaTexto}
                    onChange={(e) => setRespuestaTexto(e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleResponder(comentario.id)}
                  >
                    Enviar respuesta
                  </button>
                </div>
              )}

              {/* Renderizamos recursivamente respuestas hijas */}
              {renderComentarios(lista, comentario.id, nivel + 1)}
            </div>
          </div>
        </div>
      ));

  // Si no hay noticia cargada, no renderiza nada
  if (!noticia) return null;

  return (
    <div className="container NoticiaDetail mt-5 pt-5 slide-down-fade">
      <div className="row align-items-start">
        {/* Imagen y título con fecha de la noticia */}
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={`${cloudinaryBaseUrl}/${noticia.imagen}`}
            alt={noticia.titulo}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-12 col-md-6">
          <h1 className="detail-title">{noticia.titulo}</h1>
          <p className="detail-date">
            {new Date(noticia.fecha_publicacion).toLocaleDateString('es-ES')}
          </p>
          <div className="detail-content">
            {/* Divide el contenido en párrafos usando doble salto de línea */}
            {noticia.contenido.split("\n\n").map((parr, i) => (
              <p key={i}>{parr}</p>
            ))}
          </div>
        </div>
      </div>

      {isAuthenticated ? (
          <section className="comentarios mt-5">
            <h3>Comentarios</h3>

            {/* Formulario para nuevo comentario */}
            <textarea
              className="form-control mb-3"
              placeholder="Escribe tu comentario..."
              rows="3"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button
              className="btn btn-primary mb-3"
              onClick={handlePublicarComentario}
              disabled={comentarioBtnDisabled}
            >
              Publicar comentario
            </button>

            {/* Mostrar errores o éxito en comentarios */}
            {comentarioError && <div className="alert alert-danger">{comentarioError}</div>}
            {comentarioSuccess && <div className="alert alert-success">{comentarioSuccess}</div>}

            {/* Spinner local de carga comentarios */}
            {comentariosLoading ? (
              <div>Cargando comentarios...</div>
            ) : (
              <>
                {comentarios.length > 0 ? (
                  renderComentarios(comentarios)
                ) : (
                  <p>No hay comentarios aún.</p>
                )}
              </>
            )}
          </section>
        ) : (
          <p className="mt-5">
            <button className="iniciar-sesion-btn" onClick={handleLoginRedirect}>
              Inicia sesión para comentar
            </button>
          </p>
        )}
    </div>
  );
};

export default DetalleNoticias;

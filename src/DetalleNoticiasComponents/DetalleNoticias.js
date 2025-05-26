import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";
import { useAuth } from "../contexts/AuthContext";
import noticiaService from "../services/noticiaService";
import comentarioService from "../services/comentarioService";
import "./DetalleNoticias.css";

const DetalleNoticias = () => {
  const { id } = useParams();
  const { setLoading } = useLoading();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  const [noticia, setNoticia] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [comentariosVisibles, setComentariosVisibles] = useState(5); // paginación
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentariosLoading, setComentariosLoading] = useState(false);
  const [comentarioError, setComentarioError] = useState(null);
  const [comentarioSuccess, setComentarioSuccess] = useState(null);
  const [responderA, setResponderA] = useState(null);
  const [respuestaTexto, setRespuestaTexto] = useState("");

  useEffect(() => {
    setLoading(true);
    noticiaService
      .getNoticia(id)
      .then((res) => setNoticia(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  useEffect(() => {
    if (!id) return;
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
  }, [id]);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handlePublicarComentario = async () => {

    if (!nuevoComentario.trim() || nuevoComentario.length < 5) {
      setComentarioError("El comentario debe tener al menos 5 caracteres.");
      return;
    }
    
    if (!nuevoComentario.trim()) return;
    setComentarioError(null);
    setComentarioSuccess(null);
    
    
    
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
    }
  };

  const handleResponder = async (parentId) => {

    if (!respuestaTexto.trim() || respuestaTexto.length < 5) {
      setComentarioError("La respuesta debe tener al menos 5 caracteres.");
      return;
    }

    if (!respuestaTexto.trim()) return;
    setComentarioError(null);
    setComentarioSuccess(null);

    try {
      const comentarioData = {
        noticia: id,
        contenido: respuestaTexto.trim(),
        parent: parentId,
      };

      const newReply = await comentarioService.crearComentario(comentarioData, token);
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

  const renderComentarios = (lista, parentId = null, nivel = 0) =>
    lista
      .filter((c) => c.parent === parentId)
      .map((comentario) => (
        <div
          key={comentario.id}
          className="mb-3 pb-2"
          style={{ marginLeft: nivel * 20 }}
        >
          <div className="border-start ps-3 d-flex align-items-start gap-2">
            {comentario.usuario_foto ? (
              <img
                src={comentario.usuario_foto}
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
            <div>
              <strong>{comentario.usuario_username}</strong>{" "}
              <small className="text-muted">
                - {new Date(comentario.fecha_hora).toLocaleString()}
              </small>
              <p>{comentario.contenido}</p>
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
              {renderComentarios(lista, comentario.id, nivel + 1)}
            </div>
          </div>
        </div>
      ));
  

  if (!noticia) return null;

  return (
    <div className="container NoticiaDetail mt-5 pt-5 slide-down-fade">
      <div className="row align-items-start">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <img
            src={noticia.imagen}
            alt={noticia.titulo}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-12 col-md-6">
          <h1 className="detail-title">{noticia.titulo}</h1>
          <p className="detail-date">
            {new Date(noticia.fecha_publicacion).toLocaleDateString()}
          </p>
          <div className="detail-content">
            {noticia.contenido.split("\n\n").map((parr, i) => (
              <p key={i}>{parr}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="comments-section mt-5">
        <h3>Comentarios</h3>
        {comentarioSuccess && (
          <div className="alert alert-success">{comentarioSuccess}</div>
        )}
        {comentarioError && (
          <div className="alert alert-danger">{comentarioError}</div>
        )}
        {isAuthenticated ? (
          <>
            <textarea
              className="form-control mb-2"
              placeholder="Escribe un comentario..."
              rows="3"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button
              className="btn btn-primary mb-3"
              onClick={handlePublicarComentario}
            >
              Publicar
            </button>
            {comentariosLoading ? (
              <p>Cargando comentarios...</p>
            ) : comentarios.length === 0 ? (
              <p>No hay comentarios aún.</p>
            ) : (
              <>
                {renderComentarios(comentarios)}
                {comentariosVisibles < comentarios.length && (
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setComentariosVisibles((prev) => prev + 5)}
                    >
                      Ver más comentarios
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className="alert alert-info mt-3">
            Debes estar logueado para ver o escribir comentarios.
            <br />
            <button
              className="btn btn-outline-primary mt-2"
              onClick={handleLoginRedirect}
            >
              Iniciar sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleNoticias;

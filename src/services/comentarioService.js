import axios from "axios";
import { fetchCurrentUser } from "./profileService"; // Para saber quién es el usuario actual

const API_URL = `${process.env.REACT_APP_API_URL}/comentarios/`;

/**
 * Obtener todos los comentarios (filtrados por noticia si se especifica)
 */
const getComentarios = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    withCredentials: true,
  });

  const data = Array.isArray(response.data)
    ? response.data
    : response.data.results || response.data;

  return data;
};

/**
 * Obtener comentarios de una noticia concreta (usando filtro del backend)
 */
const getComentariosPorNoticia = async (noticiaId) => {
  if (!noticiaId) throw new Error("ID de noticia requerido");
  return await getComentarios({ noticia: noticiaId });
};

/**
 * Obtener comentarios del usuario actual (filtrando en frontend)
 */
const getComentariosPorUsuario = async () => {
  const usuario = await fetchCurrentUser(); // ← asegúrate de que esto devuelve el usuario logueado
  const allComentarios = await getComentarios(); // trae todos (solo si el backend lo permite)

  // Filtrar localmente por el usuario autenticado
  return allComentarios.filter(
    (comentario) => comentario.usuario === usuario.id
  );
};

const crearComentario = async (comentarioData, token) => {
  const response = await axios.post(API_URL, comentarioData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const actualizarComentario = async (id, comentarioData) => {
  const response = await axios.patch(`${API_URL}${id}/`, comentarioData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

const eliminarComentario = async (id) => {
  await axios.delete(`${API_URL}${id}/`, { withCredentials: true });
};

export default {
  getComentarios,
  getComentariosPorNoticia,
  getComentariosPorUsuario,
  crearComentario,
  actualizarComentario,
  eliminarComentario,
};

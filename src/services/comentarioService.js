// src/services/comentarioService.js
import axios from "axios";
import { fetchCurrentUser } from "./profileService";  // Importar para obtener username

const API_URL = `${process.env.REACT_APP_API_URL}/comentarios/`;

/**
 * Obtener todos los comentarios (opcionalmente filtrando por noticia o usuario)
 * @param {Object} filters
 * @returns {Promise<Array>} Lista de comentarios
 */
const getComentarios = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    withCredentials: true,
  });
  // Ajuste para paginación de DRF o respuesta directa
  const data = Array.isArray(response.data)
    ? response.data
    : response.data.results || response.data;
  return data;
};

/**
 * Obtener comentarios de un usuario autenticado (usa el username obtenido del perfil)
 * @returns {Promise<Array>} Comentarios filtrados
 */
const getComentariosPorUsuario = async (usuarioId) => {
  try {
    let comments = await getComentarios({ usuario: usuarioId });
    if (comments.some(c => c.usuario !== usuarioId)) {
      const all = await getComentarios();
      return all.filter(c => c.usuario === usuarioId);
    }
    return comments;
  } catch {
    const all = await getComentarios();
    return all.filter(c => c.usuario === usuarioId);
  }
};


/**
 * Obtener comentarios de una noticia concreta
 */
const getComentariosPorNoticia = async (noticiaId) => {
  const all = await getComentarios();
  return all.filter(c => String(c.noticia) === String(noticiaId));
};


/**
 * Crear un nuevo comentario
 */
const crearComentario = async (comentarioData, token) => {
  const response = await axios.post(API_URL, comentarioData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // asegúrate de pasar el token aquí
    },
    withCredentials: true,
  });
  return response.data;
};

/**
 * Actualizar un comentario existente
 */
const actualizarComentario = async (id, comentarioData) => {
  const response = await axios.patch(`${API_URL}${id}/`, comentarioData, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
};

/**
 * Eliminar un comentario
 */
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
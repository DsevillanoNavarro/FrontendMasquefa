// src/services/adopcionService.js
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/adopciones/`;

// Obtener todas las adopciones (opcionalmente filtrando por animal o usuario)
const getAdopciones = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await axios.get(`${API_URL}?${params.toString()}`, {
    withCredentials: true,
  });
  // Ajuste para paginación de DRF o respuesta directa
  return Array.isArray(response.data)
    ? response.data
    : response.data.results || response.data;
};

// Obtener adopciones de un animal concreto
const getAdopcionesPorAnimal = async (animalId) => {
  return getAdopciones({ animal: animalId });
};

// Obtener adopciones de un usuario concreto
// Si el backend no respeta filtro de query, aplicamos filtro en frontend
const getAdopcionesPorUsuario = async (usuarioId) => {
  return getAdopciones({ usuario: usuarioId });
};

// Crear una nueva adopción (incluye subida de PDF)
const crearAdopcion = async ({ animal, usuario, contenidoFile }) => {
  const formData = new FormData();
  formData.append("animal_id", animal);
  formData.append("usuario", usuario);
  formData.append("contenido", contenidoFile);

  const response = await axios.post(API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
};

// Actualizar solo estado de adopción (PATCH JSON)
const actualizarEstadoAdopcion = async (adopcionId, nuevoEstado) => {
  const response = await axios.patch(
    `${API_URL}${adopcionId}/`,
    { aceptada: nuevoEstado },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response.data;
};

// Actualizar adopción con posible PDF nuevo (PATCH multipart/form-data)
const actualizarAdopcionConPdf = async (adopcionId, formData) => {
  const response = await axios.patch(
    `${API_URL}${adopcionId}/`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
};

// Eliminar una adopción
const eliminarAdopcion = async (adopcionId) => {
  const response = await axios.delete(`${API_URL}${adopcionId}/`, {
    withCredentials: true,
  });
  return response.data;
};

export default {
  getAdopciones,
  getAdopcionesPorAnimal,
  getAdopcionesPorUsuario,
  crearAdopcion,
  actualizarEstadoAdopcion,
  actualizarAdopcionConPdf,
  eliminarAdopcion,
};
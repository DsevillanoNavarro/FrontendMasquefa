// Importamos axios para realizar peticiones HTTP
import axios from 'axios';

// Definimos la URL base para acceder al endpoint de noticias
const API_URL = `${process.env.REACT_APP_API_URL}/noticias/`;  // URL de tu API

/**
 * Obtener todas las noticias disponibles.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
const getNoticias = () => {
  return axios.get(API_URL);
};

/**
 * Obtener una noticia específica por su ID.
 * @param {string|number} id - ID de la noticia a obtener.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
const getNoticia = (id) => {
  return axios.get(`${API_URL}${id}/`);  // Accede a /noticias/{id}/
};

/**
 * Crear una nueva noticia.
 * Se utiliza FormData para poder incluir una imagen (opcional).
 * @param {FormData} noticiaData - FormData con los datos de la noticia.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
const createNoticia = (noticiaData) => {
  const formData = new FormData();

  // Añadimos los campos obligatorios
  formData.append('titulo', noticiaData.get("titulo"));
  formData.append('contenido', noticiaData.get("contenido"));
  formData.append('fecha_publicacion', noticiaData.get("fecha_publicacion"));

  // Si hay una imagen, también la añadimos
  if (noticiaData.get("imagen")) {
    formData.append('imagen', noticiaData.get("imagen"));  // archivo de imagen
  }

  // Realizamos la petición POST sin establecer Content-Type manualmente (el navegador lo hace)
  return axios.post(API_URL, formData);
};

/**
 * Actualizar una noticia existente.
 * También permite incluir una imagen opcionalmente.
 * @param {string|number} id - ID de la noticia a actualizar.
 * @param {FormData} noticiaData - FormData con los datos actualizados.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
const updateNoticia = (id, noticiaData) => {
  const formData = new FormData();

  // Campos a actualizar
  formData.append('titulo', noticiaData.get("titulo"));
  formData.append('contenido', noticiaData.get("contenido"));
  formData.append('fecha_publicacion', noticiaData.get("fecha_publicacion"));

  // Adjuntamos imagen solo si se proporciona
  if (noticiaData.get("imagen")) {
    formData.append('imagen', noticiaData.get("imagen"));
  }

  // Enviamos la petición PUT con cabecera multipart/form-data
  return axios.put(`${API_URL}${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Necesario para FormData
    },
  });
};

/**
 * Eliminar una noticia por su ID.
 * @param {string|number} id - ID de la noticia a eliminar.
 * @returns {Promise} Promesa con la respuesta de la API.
 */
const deleteNoticia = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

// Exportamos todas las funciones como un único objeto para facilitar su importación
export default {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/noticias/`;  // URL de tu API

// Función para obtener todas las noticias
const getNoticias = () => {
  return axios.get(API_URL);
};

// Función para obtener una noticia por su ID
const getNoticia = (id) => {
  return axios.get(`${API_URL}${id}/`);  // Suponiendo que la API usa el formato /api/noticias/{id}/
};

// Función para crear una noticia
const createNoticia = (noticiaData) => {
  const formData = new FormData();
  formData.append('titulo', noticiaData.get("titulo"));
  formData.append('contenido', noticiaData.get("contenido"));
  formData.append('fecha_publicacion', noticiaData.get("fecha_publicacion"));

  // Si existe una imagen, la agregamos también
  if (noticiaData.get("imagen")) {
    formData.append('imagen', noticiaData.get("imagen"));  // Suponiendo que noticiaData.imagen es un archivo
  }

  // Enviar el FormData, sin especificar Content-Type, ya que el navegador lo maneja automáticamente
  return axios.post(API_URL, formData);
};

// Función para actualizar una noticia
const updateNoticia = (id, noticiaData) => {
  const formData = new FormData();
  // Agregar los datos de la noticia
  formData.append('titulo', noticiaData.get("titulo"));
  formData.append('contenido', noticiaData.get("contenido"));
  formData.append('fecha_publicacion', noticiaData.get("fecha_publicacion"));

  // Si hay una imagen, agregarla al FormData
  if (noticiaData.get("imagen")) {
    formData.append('imagen', noticiaData.get("imagen"));
  }

  // Realizar la solicitud PUT con los datos
  return axios.put(`${API_URL}${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',  // Esto es importante para enviar los datos correctamente
    },
  });
};

// Función para eliminar una noticia
const deleteNoticia = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

export default {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};
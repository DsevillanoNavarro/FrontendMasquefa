import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/usuarios/`;

// Obtener todos los usuarios
const getUsuarios = () => {
  return axios.get(API_URL);
};

// Obtener un usuario por ID
const getUsuario = (id) => {
  return axios.get(`${API_URL}${id}/`);
};

// Crear un nuevo usuario
const createUsuario = (usuarioData) => {
  const formData = new FormData();
  formData.append('username', usuarioData.get('username'));
  formData.append('first_name', usuarioData.get('first_name'));
  formData.append('last_name', usuarioData.get('last_name'));
  formData.append('email', usuarioData.get('email'));
  formData.append('password', usuarioData.get('password'));
  formData.append('recibir_novedades', usuarioData.get('recibir_novedades') === 'true' || usuarioData.get('recibir_novedades') === true ? 'true' : 'false');

  return axios.post(API_URL, formData);
};

// Actualizar un usuario existente
const updateUsuario = (id, formData) => {
  return axios.patch(`${API_URL}${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


// Eliminar un usuario
const deleteUsuario = (id) => {
  return axios.delete(`${API_URL}${id}/`);
};

export default {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};

// src/services/animalService.js

// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// Definimos la URL base de la API para los animales
const API_URL = `${process.env.REACT_APP_API_URL}/animales/`;

/**
 * Obtener todos los animales registrados en el sistema.
 * @returns {Promise} Respuesta completa de axios (puedes acceder con .data)
 */
const getAnimales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener los animales:", error);
    throw error; // Propagamos el error para que lo maneje el componente que llama
  }
};

/**
 * Obtener la información de un animal por su ID.
 * @param {string|number} id - ID del animal
 * @returns {Promise} Respuesta completa de axios
 */
const getAnimal = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response;
  } catch (error) {
    console.error(`Error al obtener el animal con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Crear un nuevo animal, incluyendo imagen si se proporciona.
 * Se usa FormData porque puede incluir archivos (como imágenes).
 * @param {FormData} animalData - FormData con los datos del animal
 * @returns {Promise} Respuesta de axios
 */
const createAnimal = async (animalData) => {
  const formData = new FormData();

  // Agregamos los campos al FormData
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

  // Si hay una imagen incluida, también la añadimos
  if (animalData.get("imagen")) {
    formData.append('imagen', animalData.get("imagen"));
  }

  try {
    const response = await axios.post(API_URL, formData);
    return response;
  } catch (error) {
    console.error("Error al crear el animal:", error);
    throw error;
  }
};

/**
 * Actualizar los datos de un animal existente por su ID.
 * También acepta imagen si se proporciona.
 * @param {string|number} id - ID del animal
 * @param {FormData} animalData - FormData con los datos actualizados
 * @returns {Promise} Respuesta de axios
 */
const updateAnimal = async (id, animalData) => {
  const formData = new FormData();

  // Agregamos los campos al FormData
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

  // Añadir imagen solo si se proporciona una nueva
  if (animalData.get("imagen")) {
    formData.append('imagen', animalData.get("imagen"));
  }

  try {
    const response = await axios.put(`${API_URL}${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el animal con ID ${id}:`, error);
    throw error;
  }
};

/**
 * Eliminar un animal del sistema por su ID.
 * @param {string|number} id - ID del animal
 * @returns {Promise} Respuesta de axios
 */
const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response;
  } catch (error) {
    console.error(`Error al eliminar el animal con ID ${id}:`, error);
    throw error;
  }
};

// Exportamos todas las funciones como un objeto para su uso en otros archivos
export default {
  getAnimales,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};

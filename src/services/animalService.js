// src/services/animalService.js
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/animales/`;

// Obtener todos los animales
const getAnimales = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error al obtener los animales:", error);
    throw error;
  }
};

// Obtener un animal por ID
const getAnimal = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response;
  } catch (error) {
    console.error(`Error al obtener el animal con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo animal
const createAnimal = async (animalData) => {
  const formData = new FormData();
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

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

// Actualizar un animal existente
const updateAnimal = async (id, animalData) => {
  const formData = new FormData();
  formData.append('nombre', animalData.get("nombre"));
  formData.append('fecha_nacimiento', animalData.get("fecha_nacimiento"));
  formData.append('situacion', animalData.get("situacion"));

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

// Eliminar un animal por ID
const deleteAnimal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}/`);
    return response;
  } catch (error) {
    console.error(`Error al eliminar el animal con ID ${id}:`, error);
    throw error;
  }
};

// Exportar funciones
export default {
  getAnimales,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};

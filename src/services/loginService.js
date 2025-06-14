// src/services/loginService.js

// Importamos axios para hacer peticiones HTTP
import axios from 'axios';

// Creamos una instancia personalizada de axios con configuración predeterminada
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL base definida en variables de entorno
  withCredentials: true, // Importante para enviar y recibir cookies (como la sesión o el token refresh)
});

/**
 * Inicia sesión enviando las credenciales al backend.
 * Este endpoint debería establecer cookies (como el refresh token).
 * @param {string} username - Nombre de usuario
 * @param {string} password - Contraseña
 * @returns {Promise<Object>} Respuesta del servidor, normalmente con detalle del login
 */
const loginService = async (username, password) => {
  // Llama al endpoint que autentica y devuelve los tokens/cookies
  const response = await api.post('/api/token/', { username, password });
  return response.data; // { detail: 'Login exitoso' } u otros datos según tu API
};

/**
 * Refresca el token de acceso utilizando la cookie del refresh token.
 * Este endpoint requiere que el token de refresh esté presente como cookie.
 * @returns {Promise<Object>} Nuevo token de acceso
 */
const refreshToken = async () => {
  const response = await api.post('/api/token/refresh/');
  return response.data;
};

/**
 * Cierra la sesión del usuario.
 * Si bien técnicamente basta con eliminar cookies en el cliente,
 * se puede tener un endpoint en el servidor para invalidarlas explícitamente.
 * @returns {Promise<void>}
 */
const logoutService = async () => {
  // Esto es opcional: podrías simplemente borrar cookies del lado cliente
  await api.post('/api/logout/'); // Este endpoint es personalizado, no existe por defecto
};

// Exportamos las funciones de login como un objeto para uso externo
export default { loginService, refreshToken, logoutService };

// También exportamos la instancia de axios por si se necesita en otras partes
export { api };

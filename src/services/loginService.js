// src/services/loginService.js
import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  withCredentials: true, // ¡muy importante para enviar/recibir cookies!
});

const loginService = async (username, password) => {
  // Llama a tu endpoint que fija las cookies
  const response = await api.post('/api/token/', { username, password });
  return response.data; // { detail: 'Login exitoso' }
};

const refreshToken = async () => {
  const response = await api.post('/api/token/refresh/');
  return response.data;
};

const logoutService = async () => {
  // Para “logout” simplemente descartas cookies del lado cliente:
  // No hay endpoint por defecto; podrías crear uno que borre cookies server-side.
  await api.post('/api/logout/'); // opcional
};

export default { loginService, refreshToken, logoutService };
export { api };

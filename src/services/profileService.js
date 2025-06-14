// Importamos hooks de React para manejar estado y efectos secundarios
import { useState, useEffect } from 'react';
// Importamos axios para realizar peticiones HTTP
import axios from 'axios';

// Creamos una instancia de Axios configurada con la baseURL y cookies activadas
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`, // URL base tomada del entorno (.env)
  withCredentials: true, // Permite enviar cookies (por ejemplo, tokens de sesión)
});

/**
 * Servicio: fetchCurrentUser
 * Realiza una petición GET para obtener la información del usuario autenticado.
 * @returns {Promise<Object>} Un objeto con los datos del usuario.
 */
export function fetchCurrentUser() {
  return api.get('me/') // Llama al endpoint "me/" que retorna el usuario logueado
    .then(res => {
      const user = res.data;
      // Convertimos explícitamente 'recibir_novedades' a booleano por seguridad
      user.recibir_novedades = user.recibir_novedades === true || user.recibir_novedades === 'true';
      return user;
    });
}

/**
 * Servicio: eliminarCuenta
 * Envía una solicitud DELETE al backend para eliminar la cuenta del usuario actual.
 * @returns {Promise<void>}
 */
export function eliminarCuenta() {
  return api.delete('usuarios/eliminar/'); // Asume que este endpoint elimina al usuario autenticado
}

/**
 * Hook personalizado: useCurrentUser
 * Encapsula la lógica para obtener el usuario actual y manejar los estados de carga y error.
 * Se puede usar en cualquier componente para acceder fácilmente al usuario.
 */
export function useCurrentUser() {
  const [user, setUser] = useState(null);     // Estado para el usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null);     // Estado de error

  // Ejecutamos fetchCurrentUser al montar el componente
  useEffect(() => {
    let mounted = true; // Control para evitar actualizar el estado si el componente fue desmontado

    fetchCurrentUser()
      .then(data => {
        if (mounted) setUser(data); // Si sigue montado, actualizamos el usuario
      })
      .catch(err => {
        if (mounted) setError(err); // Si hay error, lo guardamos
      })
      .finally(() => {
        if (mounted) setLoading(false); // Terminamos el estado de carga
      });

    return () => {
      mounted = false; // Limpiamos al desmontar el componente
    };
  }, []); // Solo se ejecuta una vez al montar

  // Retornamos el estado actual del usuario, carga y error
  return { user, loading, error };
}

import React from 'react';
// Importamos el hook useAuth desde el contexto de autenticación para usar la función logout
import { useAuth } from '../contexts/AuthContext'; // Ajusta el path si es necesario

const LogoutButton = () => {
    // Extraemos la función logout del contexto de autenticación
    const { logout } = useAuth();

    return (
        // Botón que ejecuta la función logout al hacer clic
        <button onClick={logout}>
            Cerrar sesión
        </button>
    );
};

// Exportamos el componente para usarlo en otras partes de la app
export default LogoutButton;

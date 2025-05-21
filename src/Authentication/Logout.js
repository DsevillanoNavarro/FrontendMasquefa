import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // Ajusta el path si es necesario

const LogoutButton = () => {
    const { logout } = useAuth();

    return (
        <button onClick={logout}>
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;

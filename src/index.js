import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa el cliente moderno de ReactDOM para React 18+
import { BrowserRouter } from 'react-router-dom'; // Para manejar rutas en la app
import App from './App'; // Componente principal de la aplicación
import { AuthProvider } from './contexts/AuthContext'; // Contexto para manejar autenticación
import { LoadingProvider } from './contexts/LoadingContext'; // Contexto para manejar estado global de carga (loading)

// Crea el root para renderizar la app en el div con id 'root' del HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // BrowserRouter envuelve la app para permitir navegación con rutas URL
  <BrowserRouter>
    {/* LoadingProvider envuelve la app para compartir el estado de carga en toda la aplicación */}
    <LoadingProvider>
      {/* AuthProvider envuelve la app para compartir el estado de autenticación */}
      <AuthProvider>
        {/* Componente principal donde están definidas las rutas y lógica de la app */}
        <App />
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);

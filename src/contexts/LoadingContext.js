import { createContext, useContext, useState } from "react";

// Crear un contexto para manejar el estado global de "loading"
const LoadingContext = createContext();

// Hook personalizado para que cualquier componente pueda acceder al contexto fácilmente
export const useLoading = () => useContext(LoadingContext);

// Componente proveedor que envuelve la aplicación o parte de ella
// Provee el estado 'loading' y la función para actualizarlo 'setLoading'
export const LoadingProvider = ({ children }) => {
  // Estado local que indica si hay alguna operación en proceso (true = cargando, false = no)
  const [loading, setLoading] = useState(false);

  return (
    // Proveer el contexto con el estado y función para modificarlo
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';  // Importamos Routes y Route
import AnimalService from '../services/animalService';  // Importamos el servicio
import AnimalEdit from './EditarAnimales';  // Importamos el componente de edición

function App() {
  const [animales, setAnimales] = useState([]);

  // Obtener lista de animales al cargar el componente
  useEffect(() => {
    AnimalService.getAnimales()  // Usamos el servicio para obtener los animales
      .then(response => setAnimales(response.data))
      .catch(error => console.error(error));
  }, []);

  // Función para eliminar un animal usando animalService
  const handleDelete = (id) => {
    AnimalService.deleteAnimal(id)  // Usamos el servicio para eliminar
      .then(() => {
        setAnimales(animales.filter(animal => animal.id !== id));  // Filtrar el animal eliminado de la lista
      })
      .catch(error => console.error('Error al eliminar el animal', error));
  };

  return (
    <div>
      <h1>Lista de Animales</h1>
      <Routes>
        {/* Ruta para la lista de animales */}
        <Route path="/" element={
          <ul>
            {animales.map(animal => (
              <li key={animal.id}>
                <h3>{animal.nombre}</h3>
                <p>Edad: {animal.edad}</p>
                <p>{animal.situacion}</p>
                {animal.imagen && <img src={animal.imagen} alt={animal.nombre} width="150" />}
                <button onClick={() => handleDelete(animal.id)}>Eliminar</button> {/* Botón de eliminar */}
                {/* Enlace a la página de edición */}
                <Link to={`/editar/${animal.id}`}>
                  <button>Editar</button>
                </Link>
              </li>
            ))}
          </ul>
        } />

        {/* Ruta para la página de edición */}
        <Route path="/editar/:id" element={<AnimalEdit />} />
      </Routes>
    </div>
  );
}

export default App;

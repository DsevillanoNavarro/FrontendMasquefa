import React, { useState } from 'react';
import AnimalService from '../services/animalService';

const AnimalForm = ({ onSubmit }) => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [situacion, setSituacion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();  // Evitar que la página se recargue al enviar el formulario

    // Crear un objeto FormData para enviar los datos
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('fecha_nacimiento', fechaNacimiento);
    formData.append('situacion', situacion);
    if (imagen) formData.append('imagen', imagen);

    // Llamar al servicio para crear un nuevo animal
    AnimalService.createAnimal(formData)
      .then((response) => {
        console.log('Animal creado:', response.data);
        onSubmit(); // Llamamos a onSubmit para que actualice la lista de animales
      })
      .catch((error) => {
        console.error('Error al crear el animal:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear un Nuevo Animal</h2>
      
      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      
      <label>Fecha de Nacimiento:</label>
      <input
        type="date"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        required
      />
      
      <label>Situación:</label>
      <textarea
        value={situacion}
        onChange={(e) => setSituacion(e.target.value)}
        required
      />
      
      <label>Imagen:</label>
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
      />
      
      <button type="submit">Crear Animal</button>
    </form>
  );
};

export default AnimalForm;

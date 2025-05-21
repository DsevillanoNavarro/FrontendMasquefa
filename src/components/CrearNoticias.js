import React, { useState } from 'react';
import NoticiaService from '../services/noticiaService'; // Asegúrate de que la ruta sea correcta

const NoticiaForm = ({ onSubmit }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [fechaPublicacion, setFechaPublicacion] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();  // Evitar que la página se recargue al enviar el formulario

    // Crear un objeto FormData para enviar los datos
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('contenido', contenido);
    formData.append('fecha_publicacion', fechaPublicacion);
    if (imagen) formData.append('imagen', imagen);

    // Llamar al servicio para crear una nueva noticia
    NoticiaService.createNoticia(formData)
      .then((response) => {
        console.log('Noticia creada:', response.data);
        onSubmit(); // Llamamos a onSubmit para que actualice la lista de noticias
      })
      .catch((error) => {
        console.error('Error al crear la noticia:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear una Nueva Noticia</h2>
      
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      
      <label>Contenido:</label>
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        required
      />
      
      <label>Fecha de Publicación:</label>
      <input
        type="date"
        value={fechaPublicacion}
        onChange={(e) => setFechaPublicacion(e.target.value)}
        required
      />
      
      <label>Imagen:</label>
      <input
        type="file"
        onChange={(e) => setImagen(e.target.files[0])}
      />
      
      <button type="submit">Crear Noticia</button>
    </form>
  );
};

export default NoticiaForm;
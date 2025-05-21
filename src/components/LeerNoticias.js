import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';  // Importamos Routes y Route
import NoticiaService from '../services/noticiaService';  // Importamos el servicio

function NoticiasList() {
  const [noticias, setNoticias] = useState([]);

  // Obtener lista de noticias al cargar el componente
  useEffect(() => {
    NoticiaService.getNoticias()  // Usamos el servicio para obtener las noticias
      .then(response => setNoticias(response.data))
      .catch(error => console.error(error));
  }, []);

  // Función para eliminar una noticia usando noticiaService
  const handleDelete = (id) => {
    NoticiaService.deleteNoticia(id)  // Usamos el servicio para eliminar
      .then(() => {
        setNoticias(noticias.filter(noticia => noticia.id !== id));  // Filtrar la noticia eliminada de la lista
      })
      .catch(error => console.error('Error al eliminar la noticia', error));
  };

  return (
    <div>
      <h1>Lista de Noticias</h1>
      <Routes>
        {/* Ruta para la lista de noticias */}
        <Route path="/" element={
          <ul>
            {noticias.map(noticia => (
              <li key={noticia.id}>
                <h3>{noticia.titulo}</h3>
                <p>{noticia.contenido}</p>
                <p>Fecha de Publicación: {noticia.fecha_publicacion}</p>
                {noticia.imagen && <img src={noticia.imagen} alt={noticia.titulo} width="150" />}
                <button onClick={() => handleDelete(noticia.id)}>Eliminar</button> {/* Botón de eliminar */}
                {/* Enlace a la página de edición */}
                
              </li>
            ))}
          </ul>
        } />
      </Routes>
    </div>
  );
}

export default NoticiasList;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnimalService from '../services/animalService';

const formatDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function AnimalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    nombre: '',
    edad: '',
    situacion: '',
    fecha_nacimiento: '',
    imagen: null,
  });

  useEffect(() => {
    AnimalService.getAnimal(id)
      .then(({ data }) => {
        if (data) {
          setAnimal({ ...data, fecha_nacimiento: formatDate(data.fecha_nacimiento) });
        }
      })
      .catch(console.error);
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', animal.nombre);
    formData.append('fecha_nacimiento', animal.fecha_nacimiento);
    formData.append('situacion', animal.situacion);
    if (animal.imagen) formData.append('imagen', animal.imagen);

    AnimalService.updateAnimal(id, formData)
      .then(() => navigate('/'))
      .catch(console.error);
  };

  const handleImageChange = (e) => {
    setAnimal({ ...animal, imagen: e.target.files[0] });
  };

  return (
    <div>
      <h1>Editar Animal</h1>
      <form onSubmit={handleEdit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={animal.nombre}
            onChange={(e) => setAnimal({ ...animal, nombre: e.target.value })}
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={animal.fecha_nacimiento}
            onChange={(e) => setAnimal({ ...animal, fecha_nacimiento: e.target.value })}
          />
        </div>
        <div>
          <label>Situación:</label>
          <textarea
            value={animal.situacion}
            onChange={(e) => setAnimal({ ...animal, situacion: e.target.value })}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <button type="submit">Guardar Cambios</button>
        </div>
      </form>
    </div>
  );
}

export default AnimalEdit;

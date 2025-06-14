// Componente Modal funcional que maneja diferentes tipos de diálogos modales (editar, eliminar) para adopciones, comentarios y cuentas.

// Importación de React y hooks, PropTypes para validación de props, y estilos CSS.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export default function Modal({ isOpen, onClose, type, item, onSave, onDelete }) {
  // Estado local para manejar los datos del formulario: estado, archivo PDF y texto (comentario).
  const [form, setForm] = useState({ estado: '', pdf: null, texto: '' });

  // useEffect que se ejecuta cada vez que el modal se abre o cambian el tipo y el item.
  // Inicializa el formulario según el tipo de modal y el contenido del item.
  useEffect(() => {
    if (!isOpen || !item) return; // Si el modal está cerrado o no hay item, no hace nada.

    if (type === 'editAdopcion') {
      // Para editar adopción, limpia los campos pdf y texto.
      setForm({ pdf: null, texto: '' });
    } else if (type === 'editComentario') {
      // Para editar comentario, inicializa el texto con el contenido actual del comentario.
      setForm({ estado: '', pdf: null, texto: item.contenido || '' });
    }
  }, [isOpen, type, item]);

  // Si el modal no está abierto, no renderiza nada.
  if (!isOpen) return null;

  // Cierra el modal si se hace click fuera del contenedor (en el backdrop).
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  // Maneja cambios en los inputs del formulario.
  // Para input tipo file actualiza el pdf, para otros campos actualiza el valor correspondiente.
  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'pdf') setForm(f => ({ ...f, pdf: files[0] }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  // Llama a la función onSave pasada como prop con los datos actuales del formulario.
  const handleSave = () => onSave(type, item, form);
  // Llama a la función onDelete para eliminar según tipo e item.
  const handleDelete = () => onDelete(type, item);

  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 

  return (
    <div className="modal-wrapper" onClick={handleBackdropClick}>
      <div
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Header del modal con título dinámico según el tipo */}
        <header className="modal-header-container">
          <h2 id="modal-title">
            {type === 'editAdopcion' && 'Editar adopción'}
            {type === 'deleteAdopcion' && 'Eliminar adopción'}
            {type === 'editComentario' && 'Editar comentario'}
            {type === 'deleteComentario' && 'Eliminar comentario'}
            {type === 'deleteCuenta' && 'Eliminar cuenta'}
          </h2>
          {/* Botón para cerrar el modal */}
          <button className="modal-close-button" onClick={onClose} aria-label="Cerrar modal">
            ×
          </button>
        </header>

        {/* Cuerpo del modal, cambia según el tipo de modal */}
        <div className="modal-body">
          {/* Editar adopción: muestra PDF actual si existe y permite reemplazarlo */}
          {type === 'editAdopcion' && (
            <>
              {item.contenido && (
                <iframe src={`${item.contenido}`} title="PDF actual" width="100%" height="300" />
              )}
              <label>
                Reemplazar PDF:
                <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} />
              </label>
            </>
          )}

          {/* Confirmación para eliminar adopción */}
          {type === 'deleteAdopcion' && <p>¿Seguro que quieres eliminar esta adopción?</p>}

          {/* Editar comentario: muestra contexto (comentario padre y noticia relacionada) y textarea para editar texto */}
          {type === 'editComentario' && (
            <>
              {item.parent_contenido && (
                <p className="text-muted" style={{ marginBottom: '10px' }}>
                  En respuesta a:{" "}
                  <em>
                    {item.parent_contenido.length > 50
                      ? item.parent_contenido.slice(0, 50).trim() + '…'
                      : item.parent_contenido}
                  </em>
                </p>
              )}
              {item.noticia_titulo && item.noticia_id && (
                <p className="text-muted" style={{ marginBottom: '10px' }}>
                  En la noticia:{" "}
                  <a
                    href={`/noticias/${item.noticia_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 'bold', color: '#007bff', textDecoration: 'none' }}
                  >
                    {item.noticia_titulo}
                  </a>
                </p>
              )}
              <label>
                Comentario:
                <textarea name="texto" value={form.texto} onChange={handleChange} rows={4} />
              </label>
            </>
          )}

          {/* Confirmación para eliminar comentario */}
          {type === 'deleteComentario' && <p>¿Seguro que quieres eliminar este comentario?</p>}

          {/* Confirmación para eliminar cuenta */}
          {type === 'deleteCuenta' && (
            <p>¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible.</p>
          )}
        </div>

        {/* Footer con botones Cancelar, Guardar o Eliminar según tipo */}
        <footer className="modal-footer">
          <button onClick={onClose}>Cancelar</button>

          {/* Botón Guardar solo visible para modales de edición */}
          {type.startsWith('edit') && (
            <button
              onClick={handleSave}
              disabled={
                // Deshabilita el botón guardar si:
                // - editAdopcion: no se ha seleccionado un nuevo PDF
                // - editComentario: el texto no ha cambiado respecto al original
                (type === 'editAdopcion' && !form.pdf) ||
                (type === 'editComentario' && form.texto.trim() === item.contenido.trim())
              }
            >
              Guardar
            </button>
          )}

          {/* Botón Eliminar para modales de eliminación */}
          {type.startsWith('delete') && (
            <button onClick={handleDelete}>
              {type === 'deleteCuenta' ? 'Eliminar cuenta' : 'Eliminar'}
            </button>
          )}
        </footer>
      </div>
    </div>
  );
}

// Validación de tipos de props para mejor control y advertencias en desarrollo.
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Si el modal está abierto o cerrado
  onClose: PropTypes.func.isRequired, // Función para cerrar el modal
  type: PropTypes.oneOf([
    'editAdopcion',
    'deleteAdopcion',
    'editComentario',
    'deleteComentario',
    'deleteCuenta' // Tipos permitidos para el modal
  ]),
  item: PropTypes.object, // Objeto con los datos de la adopción, comentario o cuenta
  onSave: PropTypes.func, // Función para guardar cambios
  onDelete: PropTypes.func // Función para eliminar
};

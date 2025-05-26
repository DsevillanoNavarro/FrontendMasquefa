// src/components/Modal.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export default function Modal({ isOpen, onClose, type, item, onSave, onDelete }) {
  const [form, setForm] = useState({ estado: '', pdf: null, texto: '' });

  useEffect(() => {
    if (!isOpen || !item) return;
    if (type === 'editAdopcion') {
      setForm({pdf: null, texto: '' });
    } else if (type === 'editComentario') {
      setForm({ estado: '', pdf: null, texto: item.contenido || '' });
    }
  }, [isOpen, type, item]);

  if (!isOpen) return null;

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'pdf') setForm(f => ({ ...f, pdf: files[0] }));
    else setForm(f => ({ ...f, [name]: value }));
  };

  const handleSave = () => onSave(type, item, form);
  const handleDelete = () => onDelete(type, item);

  return (
    <div className="modal-wrapper" onClick={handleBackdropClick}>
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-header-container">
          <h2 id="modal-title">
            {type === 'editAdopcion' && 'Editar adopción'}
            {type === 'deleteAdopcion' && 'Eliminar adopción'}
            {type === 'editComentario' && 'Editar comentario'}
            {type === 'deleteComentario' && 'Eliminar comentario'}
          </h2>
          <button className="modal-close-button" onClick={onClose} aria-label="Cerrar modal">×</button>
        </header>

        <div className="modal-body">
          {(type === 'editAdopcion' && (
            <>
              {item.contenido && (
                <iframe
                  src={`${item.contenido}`}
                  title="PDF actual"
                  width="100%"
                  height="300"
                />
              )}
              <label>
                Reemplazar PDF:
                <input type="file" name="pdf" accept="application/pdf" onChange={handleChange} />
              </label>
            </>
          )) ||
          (type === 'deleteAdopcion' && (
            <p>¿Seguro que quieres eliminar esta adopción?</p>
          )) ||
          (type === 'editComentario' && (
            <>
              {item.parent_contenido && (
                <p className="text-muted" style={{ marginBottom: '10px' }}>
                  En respuesta a: <em>"{item.parent_contenido}"</em>
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
          )) ||
          (type === 'deleteComentario' && (
            <p>¿Seguro que quieres eliminar este comentario?</p>
          ))}
        </div>

        <footer className="modal-footer">
          <button onClick={onClose}>Cancelar</button>
          {(type.startsWith('edit') && <button onClick={handleSave}>Guardar</button>) ||
           (type.startsWith('delete') && <button onClick={handleDelete}>Eliminar</button>)}
        </footer>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['editAdopcion','deleteAdopcion','editComentario','deleteComentario']),
  item: PropTypes.object,
  onSave: PropTypes.func,
  onDelete: PropTypes.func
};

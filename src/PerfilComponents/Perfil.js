// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
// Hook personalizado para obtener el usuario actual y estado de carga/error
import { useCurrentUser } from '../services/profileService';
// Servicios para manejar adopciones, comentarios, animales y usuario
import adopcionService from '../services/adopcionService';
import comentarioService from '../services/comentarioService';
import animalService from '../services/animalService';
import usuarioService from '../services/usuarioService';
// Componente Modal para editar o eliminar items
import Modal from './Modal';
// Estilos específicos del perfil
import './Perfil.css';
// Iconos para editar y borrar
import { Pencil, Trash } from 'react-bootstrap-icons';
// Contexto para autenticación
import { useAuth } from '../contexts/AuthContext';
// Contexto para loading global
import { useLoading } from '../contexts/LoadingContext';
// Función para eliminar cuenta
import { eliminarCuenta } from '../services/profileService';
// Hook para navegación programática
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  // Obtener datos del usuario actual, y estados de carga y error
  const { user, loading, error } = useCurrentUser();
  const { logout } = useAuth();

  // Estado para controlar la pestaña activa ('adopciones' o 'comentarios')
  const [activeTab, setActiveTab] = useState('adopciones');
  // Estado para almacenar adopciones y comentarios del usuario
  const [adopciones, setAdopciones] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  // Estados para manejo de carga y errores de los datos secundarios
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);
  // Mensaje para mostrar alertas o errores al usuario
  const [mensaje, setMensaje] = useState('');
  // Hook para navegación
  const navigate = useNavigate();
  // Setter para el loading global de la app
  const { setLoading: setGlobalLoading } = useLoading();
  // Estado para controlar configuración del modal (si está abierto, tipo y item)
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, item: null });
  // URL base de Cloudinary para cargar imágenes
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dznk2nvh5"; 
  // Sincronizar el loading global con el loading del usuario actual
  useEffect(() => {
    setGlobalLoading(loading);
  }, [loading, setGlobalLoading]);

  // Al cargar el usuario, traer adopciones y comentarios relacionados
  useEffect(() => {
    if (!user) return; // Si no hay usuario, no cargar
    setLoadingData(true); // Indicamos que estamos cargando datos

    // Pedir ambas listas (adopciones y comentarios) en paralelo
    Promise.all([
      adopcionService.getAdopcionesPorUsuario(user.id),
      comentarioService.getComentariosPorUsuario(user.id)
    ])
      .then(async ([ads, coms]) => {
        // Guardar adopciones y comentarios en estado
        setAdopciones(ads);
        // Algunos servicios devuelven la data en 'data' o directamente en el arreglo
        setComentarios(Array.isArray(coms) ? coms : coms.data);
      })
      .catch(() => setDataError('Error al cargar datos')) // Capturar errores
      .finally(() => setLoadingData(false)); // Termina la carga
  }, [user]);

  // Manejador para cambiar la foto de perfil
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      setMensaje('❌ Solo se permiten imágenes.');
      setTimeout(() => setMensaje(''), 4000);
      return;
    }

    // Validar que no supere los 5MB
    if (file.size > 5 * 1024 * 1024) {
      setMensaje('❌ La imagen no puede pesar más de 5MB.');
      setTimeout(() => setMensaje(''), 4000);
      return;
    }

    // Crear objeto FormData para enviar el archivo al backend
    const formData = new FormData();
    formData.append("foto_perfil", file);

    try {
      // Llamar servicio para actualizar la foto de perfil
      await usuarioService.updateUsuario(user.id, formData);
      setMensaje('✅ Imagen actualizada correctamente.');
      setTimeout(() => {
        setMensaje('');
        window.location.reload(); // Recargar la página para reflejar cambios
      }, 2000);
    } catch (err) {
      console.error("Error al actualizar la imagen:", err);
      setMensaje('❌ Error al subir la imagen.');
      setTimeout(() => setMensaje(''), 4000);
    }
  };

  // Abrir modal, definiendo tipo y item (adopción o comentario)
  const openModal = (type, item) => setModalConfig({ isOpen: true, type, item });
  // Cerrar modal
  const closeModal = () => setModalConfig({ isOpen: false, type: null, item: null });

  // Guardar cambios hechos en el modal
  const handleModalSave = (type, item, form) => {
    if (type === 'editAdopcion') {
      // Para editar adopción con archivo PDF opcional
      const formData = new FormData();
      if (form.pdf) formData.append('contenido', form.pdf);

      adopcionService.actualizarAdopcionConPdf(item.id, formData)
        .then(u => {
          // Actualizar adopciones en estado con los datos nuevos
          setAdopciones(curr =>
            curr.map(a => a.id === u.id ? { ...a, contenido: u.contenido } : a)
          );
          setMensaje('✅ Adopción actualizada correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al actualizar la adopción.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'editComentario') {
      // Para editar comentario
      comentarioService.actualizarComentario(item.id, { contenido: form.texto })
        .then(() => {
          // Actualizar comentarios en estado con nuevo contenido
          setComentarios(curr =>
            curr.map(c => c.id === item.id ? { ...c, contenido: form.texto } : c)
          );
          setMensaje('✅ Comentario actualizado correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al actualizar el comentario.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }
  };

  // Eliminar adopción, comentario o cuenta, según tipo
  const handleModalDelete = (type, item) => {
    if (type === 'deleteAdopcion') {
      adopcionService.eliminarAdopcion(item.id)
        .then(() => {
          // Filtrar la adopción eliminada del estado
          setAdopciones(curr => curr.filter(a => a.id !== item.id));
          setMensaje('✅ Adopción eliminada correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar la adopción.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'deleteComentario') {
      comentarioService.eliminarComentario(item.id)
        .then(() => {
          // Filtrar comentario eliminado del estado
          setComentarios(curr => curr.filter(c => c.id !== item.id));
          setMensaje('✅ Comentario eliminado correctamente.');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar el comentario.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }

    if (type === 'deleteCuenta') {
      // Eliminar cuenta, cerrar sesión y redirigir a inicio
      eliminarCuenta()
        .then(() => {
          logout();
          navigate('/');
        })
        .catch(() => {
          setMensaje('❌ Error al eliminar la cuenta.');
        })
        .finally(() => {
          closeModal();
          setTimeout(() => setMensaje(''), 4000);
        });
    }
  };

  // Mostrar mensajes mientras se carga o si hay errores
  if (loading) return <p>Cargando perfil…</p>;
  if (error) return <p>Error al cargar perfil.</p>;
  if (!user) return <p>No estás autenticado.</p>;

  return (
    <div className="profile-container profile">
      <h1>Mi Perfil</h1>

      {/* Sección principal con foto de perfil y datos de usuario */}
      <div className="profile-info-row">
        <div className="profile-picture-container">
          {/* Label para disparar input file (editable) */}
          <label htmlFor="foto_perfil" className="profile-picture-label">
            <img
             src={`${cloudinaryBaseUrl}/${user.foto_perfil}`} // Foto de perfil
              alt="Foto de perfil"
              className="profile-picture-img"
            />
            <div className="profile-picture-overlay">Editar</div>
          </label>
          <input
            type="file"
            id="foto_perfil"
            accept="image/*"
            onChange={handleFileChange} // Maneja la carga de nueva foto
            className="profile-picture-input"
          />
        </div>

        {/* Datos del usuario */}
        <div className="profile-user-data">
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
          <p><strong>Email:</strong> {user.email}</p>

          {/* Botón para eliminar la cuenta */}
          <button onClick={() => openModal('deleteCuenta', {})} className="profile-delete-link">
            Eliminar cuenta
          </button>
        </div>
      </div>

      {/* Botones para cerrar sesión y, si es staff, enlace al panel admin */}
      <div className="d-flex flex-column flex-md-row gap-3 mt-3">
        <button className="custom-btn logout" onClick={logout}>Cerrar sesión</button>
        {user.is_staff && (
          <a
            href={`${process.env.REACT_APP_BACK_URL}/admin/`}
            target="_blank"
            rel="noopener noreferrer"
            className="custom-btn admin"
          >
            Panel de administración
          </a>
        )}
      </div>

      {/* Pestañas para alternar entre adopciones y comentarios */}
      <div className="profile-tabs">
        {['adopciones', 'comentarios'].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'profile-tab-active' : 'profile-tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Mensajes de éxito o error */}
      {mensaje && (
        <div className={`alert-message ${mensaje.startsWith('✅') ? 'alert-success' : 'alert-error'}`}>
          {/* Limpiamos los símbolos de check o cruz para mostrar solo el texto */}
          {mensaje.replace('✅', '').replace('❌', '').trim()}
        </div>
      )}

      {/* Contenido según pestaña activa */}
      <div className="profile-tab-content">
        {/* Mostrar mensaje de carga o error */}
        {loadingData && <p>Cargando datos…</p>}
        {dataError && <p>{dataError}</p>}

        {/* Mostrar adopciones si está activa esa pestaña */}
        {!loadingData && !dataError && activeTab === 'adopciones' && (
          <div className="profile-card-grid">
            {adopciones.map(a => (
              <div key={a.id} className="profile-card">
                <img src={`${cloudinaryBaseUrl}/${a.animal?.imagen || ''}`} alt={a.animal?.nombre} className="profile-card-img" />
                <div className="profile-card-body">
                  <h3>{a.animal?.nombre || '—'}</h3>
                  <p>Estado: <span>{a.aceptada}</span></p>
                  {/* Botones para editar y eliminar adopción */}
                  <button onClick={() => openModal('editAdopcion', a)}><Pencil size={16} /></button>
                  <button onClick={() => openModal('deleteAdopcion', a)}><Trash size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mostrar comentarios si está activa esa pestaña */}
        {!loadingData && !dataError && activeTab === 'comentarios' && (
          <div className="profile-card-grid">
            {comentarios.map(c => (
              <div key={c.id} className="profile-card">
                <div className="profile-card-body">
                  <p>{c.contenido || c.text}</p>
                  <small>{new Date(c.fecha_hora || c.created_at).toLocaleString()}</small>
                  {/* Botones para editar y eliminar comentario */}
                  <button onClick={() => openModal('editComentario', c)} className="icon-button">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => openModal('deleteComentario', c)} className="icon-button">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para edición y eliminación */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        item={modalConfig.item}
        onSave={handleModalSave}
        onDelete={handleModalDelete}
      />
    </div>
  );
}

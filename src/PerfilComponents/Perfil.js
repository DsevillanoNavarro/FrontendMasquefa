// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../services/profileService';
import adopcionService from '../services/adopcionService';
import comentarioService from '../services/comentarioService';
import animalService from '../services/animalService';
import Modal from './Modal';
import './Perfil.css';
import { Pencil, Trash } from 'react-bootstrap-icons';
import { useAuth } from '../contexts/AuthContext'; // 👈 importamos logout
import usuarioService from '../services/usuarioService';

export default function Profile() {
  const { user, loading, error } = useCurrentUser();
  const { logout } = useAuth(); // 👈 usamos logout
  const [activeTab, setActiveTab] = useState('adopciones');
  const [adopciones, setAdopciones] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [dataError, setDataError] = useState(null);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, item: null });

  useEffect(() => {
    if (!user) return;
    setLoadingData(true);
    Promise.all([
      adopcionService.getAdopcionesPorUsuario(user.id),
      comentarioService.getComentariosPorUsuario(user.id)
    ])
      .then(async ([ads, coms]) => {
        const enriched = await Promise.all(
          ads.map(async a => {
            try {
              const { data } = await animalService.getAnimal(a.animal);
              return { ...a, animal: data };
            } catch {
              return { ...a, animal: null };
            }
          })
        );
        setAdopciones(enriched);
        setComentarios(Array.isArray(coms) ? coms : coms.data);
      })
      .catch(() => setDataError('Error al cargar datos'))
      .finally(() => setLoadingData(false));
  }, [user]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten imágenes.");
      return;
    }
  
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede pesar más de 5MB.");
      return;
    }
  
    const formData = new FormData();
    formData.append("foto_perfil", file);
  
    try {
      await usuarioService.updateUsuario(user.id, formData);
      alert("Imagen actualizada. Recargando perfil...");
      window.location.reload();
    } catch (err) {
      console.error("Error al actualizar la imagen:", err);
      alert("Error al subir la imagen.");
    }
  };
  
  const openModal = (type, item) => setModalConfig({ isOpen: true, type, item });
  const closeModal = () => setModalConfig({ isOpen: false, type: null, item: null });
  
  const handleModalSave = (type, item, form) => {
    if (type === 'editAdopcion') {
      const formData = new FormData();
      formData.append('aceptada', form.estado);
      if (form.pdf) formData.append('contenido', form.pdf);
      adopcionService.actualizarAdopcionConPdf(item.id, formData)
        .then(u => setAdopciones(curr => curr.map(a => a.id === u.id ? { ...a, aceptada: u.aceptada, contenido: u.contenido } : a)))
        .finally(closeModal);
    }
    if (type === 'editComentario') {
      comentarioService.actualizarComentario(item.id, { contenido: form.texto })
        .then(() => setComentarios(curr => curr.map(c => c.id === item.id ? { ...c, contenido: form.texto } : c)))
        .finally(closeModal);
    }
  };

  const handleModalDelete = (type, item) => {
    if (type === 'deleteAdopcion') {
      adopcionService.eliminarAdopcion(item.id)
        .then(() => setAdopciones(curr => curr.filter(a => a.id !== item.id)))
        .finally(closeModal);
    }
    if (type === 'deleteComentario') {
      comentarioService.eliminarComentario(item.id)
        .then(() => setComentarios(curr => curr.filter(c => c.id !== item.id)))
        .finally(closeModal);
    }
  };

  if (loading) return <p>Cargando perfil…</p>;
  if (error) return <p>Error al cargar perfil.</p>;
  if (!user) return <p>No estás autenticado.</p>;

  return (
    <div className="profile-container profile">
      <h1>Mi Perfil</h1>

      {/* Info usuario */}
      <div className="profile-info-row">
          <div className="profile-picture-container">
            <label htmlFor="foto_perfil" className="profile-picture-label">
              <img
                src={`${process.env.REACT_APP_BACK_URL}${user.foto_perfil}`}
                alt="Foto de perfil"
                className="profile-picture-img"
              />
              <div className="profile-picture-overlay">Editar</div>
            </label>
            <input
              type="file"
              id="foto_perfil"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-picture-input"
            />
          </div>

          <div className="profile-user-data">
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row gap-3 mt-3">
              <button className="custom-btn logout" onClick={logout}>
                Cerrar sesión
              </button>
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

      {/* Tabs */}
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

      {/* Contenido pestaña */}
      <div className="profile-tab-content">
        {loadingData && <p>Cargando datos…</p>}
        {dataError && <p>{dataError}</p>}
        {!loadingData && !dataError && activeTab === 'adopciones' && (
          <div className="profile-card-grid">
            {adopciones.map(a => (
              <div key={a.id} className="profile-card">
                <img src={a.animal?.imagen || ''} alt={a.animal?.nombre} className="profile-card-img" />
                <div className="profile-card-body">
                  <h3>{a.animal?.nombre || '—'}</h3>
                  <p>Estado: <span>{a.aceptada}</span></p>
                  <button onClick={() => openModal('editAdopcion', a)}><Pencil size={16} /></button>
                  <button onClick={() => openModal('deleteAdopcion', a)}><Trash size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loadingData && !dataError && activeTab === 'comentarios' && (
          <div className="profile-card-grid">
            {comentarios.map(c => (
              <div key={c.id} className="profile-card">
                <div className="profile-card-body">
                  <p>{c.contenido || c.text}</p>
                  <small>{new Date(c.fecha_hora || c.created_at).toLocaleString()}</small>
                  <button
                    aria-label="Editar"
                    onClick={() => openModal('editComentario', c)}
                    className="icon-button"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    aria-label="Eliminar"
                    onClick={() => openModal('deleteComentario', c)}
                    className="icon-button"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

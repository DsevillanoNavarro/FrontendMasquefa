import React from 'react';

const PoliticaCookies = () => {
  return (
    <div className="container login-container slide-down-fade" style={{ maxWidth: "800px", padding: "2rem" }}>
      <h2 className="login-title">Política de Cookies</h2>
      <p><strong>Última actualización:</strong> octubre 2025</p>

      <p>
        En <strong>Animales Masquefa</strong> utilizamos cookies propias y de terceros para mejorar la experiencia de usuario,
        analizar la navegación y ofrecer contenidos adaptados a tus intereses.  
        Esta política explica qué son las cookies, cómo las usamos y cómo puedes gestionarlas.
      </p>

      <h3>1. ¿Qué son las cookies?</h3>
      <p>
        Las cookies son pequeños archivos de texto que los sitios web almacenan en tu dispositivo (ordenador, móvil o tablet) al navegar.
        Sirven para recordar información sobre tus preferencias, sesión o actividad.
      </p>

      <h3>2. Tipos de cookies que utilizamos</h3>
      <ul>
        <li><strong>Cookies técnicas:</strong> necesarias para el funcionamiento básico de la web. Permiten iniciar sesión, enviar formularios o recordar preferencias.</li>
        <li><strong>Cookies de análisis:</strong> nos ayudan a entender cómo los usuarios interactúan con la web, por ejemplo, a través de Google Analytics.</li>
        <li><strong>Cookies de personalización:</strong> permiten adaptar la experiencia según tus preferencias (por ejemplo, idioma o tema visual).</li>
        <li><strong>Cookies de terceros:</strong> pueden instalarse desde servicios externos integrados en la web, como YouTube, Instagram o redes sociales.</li>
      </ul>

      <h3>3. Base legal del uso de cookies</h3>
      <p>
        El uso de cookies analíticas y de personalización se basa en tu <strong>consentimiento expreso</strong>,
        que otorgas al aceptar el banner o pop-up inicial.  
        Puedes modificar o retirar ese consentimiento en cualquier momento.
      </p>

      <h3>4. Cómo gestionar o eliminar cookies</h3>
      <p>
        Puedes permitir, bloquear o eliminar las cookies instaladas en tu equipo configurando las opciones de tu navegador.
        A continuación, te dejamos enlaces con instrucciones para los navegadores más comunes:
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=es" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h3>5. Cookies utilizadas en esta web</h3>
      <p>Actualmente, el sitio puede utilizar las siguientes cookies:</p>
      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>Tipo</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sessionid</td>
            <td>Técnica</td>
            <td>Mantiene la sesión de usuario iniciada</td>
            <td>Sesión</td>
          </tr>
          <tr>
            <td>csrftoken</td>
            <td>Seguridad</td>
            <td>Previene ataques de tipo CSRF</td>
            <td>1 año</td>
          </tr>
          <tr>
            <td>_ga / _gid</td>
            <td>Analítica</td>
            <td>Google Analytics, mide interacción de usuarios</td>
            <td>2 años</td>
          </tr>
        </tbody>
      </table>

      <h3>6. Consentimiento</h3>
      <p>
        Al navegar por esta web y aceptar el aviso de cookies, consientes el uso de las cookies descritas, salvo que hayas modificado la configuración de tu navegador para rechazarlas.
      </p>

      <h3>7. Actualizaciones de esta política</h3>
      <p>
        Esta Política de Cookies puede modificarse para adaptarse a nuevas normativas o cambios en la configuración del sitio.
        Te recomendamos revisarla periódicamente.
      </p>

      <h3>8. Más información</h3>
      <p>
        Puedes obtener más información sobre cómo tratamos tus datos personales en nuestra <a href="/politica-privacidad">Política de Privacidad</a>.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" className="login-link">← Volver al inicio</a>
      </div>
    </div>
  );
};

export default PoliticaCookies;
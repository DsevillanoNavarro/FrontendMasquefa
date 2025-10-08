import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="container login-container slide-down-fade" style={{ maxWidth: "800px", padding: "2rem" }}>
      <h2 className="login-title">Política de Privacidad</h2>
      <p><strong>Última actualización:</strong> octubre 2025</p>

      <p>
        En <strong>Animales Masquefa</strong> nos tomamos muy en serio la privacidad de tus datos personales. Esta Política cumple con el 
        Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD) y explica cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h3>1. Responsable del tratamiento</h3>
      <p>
        <strong>Nombre:</strong> Animales Masquefa<br />
        <strong>Email de contacto:</strong> <a href="mailto:animalistesmasquefa@gmail.com">animalistesmasquefa@gmail.com</a><br />
        <strong>Finalidad:</strong> gestión de adopciones y comunicación con usuarios interesados en la protección animal.
      </p>

      <h3>2. Datos que recogemos</h3>
      <p>Podemos recopilar los siguientes datos personales:</p>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Correo electrónico</li>
        <li>Datos de contacto y preferencias</li>
        <li>Información sobre solicitudes de adopción</li>
        <li>Datos técnicos de navegación (cookies, IP, navegador, etc.)</li>
      </ul>

      <h3>3. Finalidad y base legal</h3>
      <p>Tratamos tus datos con las siguientes finalidades:</p>
      <ul>
        <li>Gestionar tu cuenta y tus solicitudes de adopción.</li>
        <li>Comunicaciones relacionadas con tu actividad en la plataforma.</li>
        <li>Envío de noticias o boletines (si lo autorizas).</li>
        <li>Mejorar la seguridad y la funcionalidad de la web.</li>
      </ul>
      <p>La base legal es tu consentimiento explícito y la ejecución del servicio solicitado.</p>

      <h3>4. Conservación de los datos</h3>
      <p>
        Conservaremos tus datos mientras mantengas tu cuenta activa o mientras sea necesario para cumplir con las finalidades indicadas. 
        Una vez cancelada la cuenta, los datos se eliminarán o se anonimizarán conforme a la ley.
      </p>

      <h3>5. Derechos del usuario</h3>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un 
        correo a <a href="mailto:animalistesmasquefa@gmail.com">animalistesmasquefa@gmail.com</a>.  
        También tienes derecho a presentar una reclamación ante la <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.
      </p>

      <h3>6. Cesión y transferencia de datos</h3>
      <p>
        No compartimos tus datos personales con terceros, salvo obligación legal o proveedores que actúen como encargados del tratamiento (por ejemplo, hosting o servicios de correo electrónico), siempre bajo contrato conforme al RGPD.
      </p>

      <h3>7. Seguridad de los datos</h3>
      <p>
        Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida o destrucción.
      </p>

      <h3>8. Cookies</h3>
      <p>
        Esta web utiliza cookies técnicas y analíticas. Puedes consultar información detallada en nuestra <a href="/politica-cookies">Política de Cookies</a>.
      </p>

      <h3>9. Modificaciones de la política</h3>
      <p>
        Podemos actualizar esta política cuando sea necesario. La versión vigente estará siempre disponible en esta página.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <a href="/" className="login-link">← Volver al inicio</a>
      </div>
    </div>
  );
};

export default PoliticaPrivacidad;

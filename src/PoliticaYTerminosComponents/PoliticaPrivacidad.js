import React from 'react';

// Componente funcional que muestra la página de Política de Privacidad
const PoliticaPrivacidad = () => {
  return (
    // Contenedor principal con clases para estilos y animación, ancho máximo y padding personalizados
    <div className="container login-container slide-down-fade" style={{ maxWidth: "800px", padding: "2rem" }}>
      
      {/* Título principal */}
      <h2 className="login-title">Política de Privacidad</h2>

      {/* Fecha de última actualización */}
      <p><strong>Última actualización:</strong> mayo 2025</p>

      {/* Introducción a la política de privacidad */}
      <p>
        En esta aplicación nos tomamos muy en serio la privacidad de tus datos. Esta política describe cómo recopilamos, utilizamos y protegemos tu información personal.
      </p>

      {/* Sección 1: Datos que recogemos */}
      <h3>1. Datos que Recogemos</h3>
      <p>
        Durante el registro o uso de la aplicación, podemos solicitar los siguientes datos:
      </p>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Nombre de usuario</li>
        <li>Correo electrónico</li>
        <li>Preferencia para recibir noticias</li>
        <li>Información relacionada con solicitudes de adopción</li>
      </ul>

      {/* Sección 2: Finalidad del tratamiento de datos */}
      <h3>2. Finalidad del Tratamiento</h3>
      <p>Usamos tus datos únicamente para:</p>
      <ul>
        <li>Gestionar el acceso a tu cuenta</li>
        <li>Procesar solicitudes de adopción</li>
        <li>Enviar comunicaciones relacionadas con el servicio</li>
        <li>Informarte de noticias si lo has solicitado</li>
      </ul>

      {/* Sección 3: Base legal para el tratamiento de datos */}
      <h3>3. Base Legal</h3>
      <p>
        Recopilamos datos sobre la base de tu consentimiento explícito, que otorgas al aceptar esta política durante el registro.
      </p>

      {/* Sección 4: Conservación de los datos */}
      <h3>4. Conservación de los Datos</h3>
      <p>
        Conservamos tus datos mientras tengas una cuenta activa o mientras sean necesarios para cumplir con las finalidades indicadas.
      </p>

      {/* Sección 5: Derechos del usuario */}
      <h3>5. Derechos del Usuario</h3>
      <p>
        Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación y oposición enviando un correo a <a href="mailto:animalistesmasquefabusiness@gmail.com">animalistesmasquefabusiness@gmail.com</a>.
      </p>

      {/* Sección 6: Seguridad de los datos */}
      <h3>6. Seguridad</h3>
      <p>
        Aplicamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados.
      </p>

      {/* Sección 7: Información de contacto */}
      <h3>7. Contacto</h3>
      <p>Para cualquier consulta relacionada con tu privacidad, escríbenos a <a href="mailto:animalistesmasquefabusiness@gmail.com">animalistesmasquefabusiness@gmail.com</a>.</p>

      {/* Enlace para volver a la página de registro, con margen superior para separación */}
      <div style={{ marginTop: '2rem' }}>
        <a href="/registro" className="login-link">← Volver al registro</a>
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otras partes de la app
export default PoliticaPrivacidad;

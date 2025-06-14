import React from 'react';

// Componente funcional que muestra la página de Términos y Condiciones de Uso
const TerminosYCondiciones = () => {
  return (
    // Contenedor principal con clases para estilos y animación, con ancho máximo y padding personalizados
    <div className="container login-container slide-down-fade" style={{ maxWidth: "800px", padding: "2rem" }}>
      
      {/* Título principal */}
      <h2 className="login-title">Términos y Condiciones de Uso</h2>

      {/* Fecha de última actualización */}
      <p><strong>Última actualización:</strong> mayo 2025</p>

      {/* Introducción general a los términos */}
      <p>
        Al registrarte y utilizar esta aplicación, aceptas los siguientes términos. Si no estás de acuerdo, por favor no utilices la plataforma.
      </p>

      {/* Sección 1: Descripción del servicio */}
      <h3>1. Descripción del Servicio</h3>
      <p>
        Esta plataforma permite la gestión de adopciones de animales, así como el seguimiento de noticias relacionadas con la protectora.
      </p>

      {/* Sección 2: Requisitos para el registro */}
      <h3>2. Requisitos para el Registro</h3>
      <p>
        Solo pueden registrarse personas mayores de edad que proporcionen información veraz y completa.
      </p>

      {/* Sección 3: Obligaciones del usuario */}
      <h3>3. Obligaciones del Usuario</h3>
      <ul>
        <li>No realizar adopciones falsas o con fines fraudulentos.</li>
        <li>Respetar a otros usuarios y al personal de la protectora.</li>
        <li>Actualizar sus datos si hay cambios.</li>
      </ul>

      {/* Sección 4: Suspensión de cuentas */}
      <h3>4. Suspensión de Cuentas</h3>
      <p>
        Nos reservamos el derecho de suspender cuentas que incumplan estos términos o que realicen un uso inadecuado de la aplicación.
      </p>

      {/* Sección 5: Propiedad intelectual */}
      <h3>5. Propiedad Intelectual</h3>
      <p>
        Todos los contenidos, salvo los proporcionados por usuarios, son propiedad de la organización. Está prohibida su reproducción sin permiso.
      </p>

      {/* Sección 6: Cambios en los términos */}
      <h3>6. Cambios en los Términos</h3>
      <p>
        Estos términos pueden actualizarse en el futuro. Se notificará a los usuarios cuando sea relevante.
      </p>

      {/* Información de contacto para dudas o consultas */}
      <p>
        Para cualquier duda, contacta a <a href="mailto:animalistesmasquefabusiness@gmail.com">animalistesmasquefabusiness@gmail.com</a>.
      </p>

      {/* Enlace para volver a la página de registro, con margen superior para separación */}
      <div style={{ marginTop: '2rem' }}>
        <a href="/registro" className="login-link">← Volver al registro</a>
      </div>
    </div>
  );
};

// Exporta el componente para uso en otras partes de la aplicación
export default TerminosYCondiciones;

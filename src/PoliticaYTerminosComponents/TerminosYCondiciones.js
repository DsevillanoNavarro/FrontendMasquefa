import React from 'react';

const TerminosYCondiciones = () => {
  return (
    <div className="container login-container slide-down-fade" style={{ maxWidth: "800px", padding: "2rem" }}>
      <h2 className="login-title">Términos y Condiciones de Uso</h2>

      <p><strong>Última actualización:</strong> mayo 2025</p>

      <p>
        Al registrarte y utilizar esta aplicación, aceptas los siguientes términos. Si no estás de acuerdo, por favor no utilices la plataforma.
      </p>

      <h3>1. Descripción del Servicio</h3>
      <p>
        Esta plataforma permite la gestión de adopciones de animales, así como el seguimiento de noticias relacionadas con la protectora.
      </p>

      <h3>2. Requisitos para el Registro</h3>
      <p>
        Solo pueden registrarse personas mayores de edad que proporcionen información veraz y completa.
      </p>

      <h3>3. Obligaciones del Usuario</h3>
      <ul>
        <li>No realizar adopciones falsas o con fines fraudulentos.</li>
        <li>Respetar a otros usuarios y al personal de la protectora.</li>
        <li>Actualizar sus datos si hay cambios.</li>
      </ul>

      <h3>4. Suspensión de Cuentas</h3>
      <p>
        Nos reservamos el derecho de suspender cuentas que incumplan estos términos o que realicen un uso inadecuado de la aplicación.
      </p>

      <h3>5. Propiedad Intelectual</h3>
      <p>
        Todos los contenidos, salvo los proporcionados por usuarios, son propiedad de la organización. Está prohibida su reproducción sin permiso.
      </p>

      <h3>6. Cambios en los Términos</h3>
      <p>
        Estos términos pueden actualizarse en el futuro. Se notificará a los usuarios cuando sea relevante.
      </p>

      <p>
        Para cualquier duda, contacta a <a href="mailto:animalistesmasquefabusiness@gmail.com">animalistesmasquefabusiness@gmail.com</a>.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <a href="/registro" className="login-link">← Volver al registro</a>
      </div>
    </div>
  );
};

export default TerminosYCondiciones;

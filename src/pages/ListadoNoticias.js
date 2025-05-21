// src/pages/Home.js
import React from 'react';
import LeerNoticias from '../components/LeerNoticias.js'; 
import CrearNoticias from '../components/CrearNoticias.js'; 
function Home() {
  return (
    <div>
        <LeerNoticias/>
        <CrearNoticias/>
    </div>
  );
}

export default Home;
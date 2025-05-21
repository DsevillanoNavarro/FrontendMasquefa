// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import DetalleNoticias from '../DetalleNoticiasComponents/DetalleNoticias';
function Home() {
  return (
    <div>
      <DetalleNoticias/>
    </div>
  );
}

export default Home;